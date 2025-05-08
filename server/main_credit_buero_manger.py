"""Main processing script for bank statements."""
 
import os
import json
import asyncio
from app.services.ai_clients.azure_openai import AzureOpenAIModel
from app import (
    extract_text_from_images,
    ExtractionConfig,
    PDFToImagesConverter,
)
from app.services.verifiers.personal_address_info_presence import validate_document
 
p_start = "[$SEP-PERSONAL-START]"
p_end = "[$SEP-PERSONAL-END]"
c_start = "[$SEP-CREDIT_REPORT-START]"
c_end = "[$SEP-CREDIT_REPORT-END]"
conf_start = "[$SEP-CONFIDENCE-START]"
conf_end = "[$SEP-CONFIDENCE-END]"
 
 
def main(file_path=None, out_dir="assets", uuid=None, process_id=None):
    # Build output directories
    base_path = os.path.join(os.getcwd(), out_dir, f"uid-{uuid}", f"pid-{process_id}")
    images_dir = os.path.join(base_path, "images")
    json_dir = os.path.join(base_path, "json")
 
    # Ensure directories exist
    for d in [base_path, images_dir, json_dir]:
        os.makedirs(d, exist_ok=True)
 
    # Convert PDF to images
    converter = PDFToImagesConverter(temp_image_prefix="credit_report")
    image_paths = converter.convert(file_path, images_dir)
    print("Image Paths:", image_paths)
 
    # Extract text from images
    extraction_config = ExtractionConfig(
        model="azure_openai_vision",
        system_persona=f"""
You are an expert OCR Agent specialized in extracting structured data from credit bureau report images or PDFs. Your job is to split the report into two clearly delimited sections—**Personal & Account Information** and **Credit Report Details**—using keyword-driven separators.
 
{p_start}
**Personal & Account Information**  
– Extract fields matching (case-insensitive) keywords:  
  • Name  
  • Date of Birth / DOB  
  • PAN / Tax ID  
  • Address  
  • Contact / Phone / Email  
  • Report Date  
 
For each, output `Field Name: Value`. If absent or unparseable, output `Field Name: Not Present`.  
{p_end}
 
---
 
{conf_start}
**Credit Report Details**  
– Detect and extract blocks keyed by these headings or keywords (case-insensitive):  
  • “Credit Score” / “Score”  
  • “Account Summary” / “Account Type”  
  • “Outstanding Balance” / “Current Balance”  
  • “Credit Limit”  
  • “Payment History” / “Delinquencies”  
  • “Inquiries” / “Enquiries”  
  • “Public Records” / “Collections”  
{conf_end}
Under each detected heading, capture the text lines until the next heading or end of page. Preserve numeric values (strip symbols, normalize separators, convert parentheses to negative). If a section isn’t found, output that heading followed by `: Not Present`.
 
example Output format :
```
{p_start}
Name: John Doe
Date of Birth / DOB: 15-Jul-1985
PAN / Tax ID: ABCDE1234F
Address: 204, Sai Apartments, MG Road, Mumbai 400001
Contact / Phone / Email: 912234567890, john.doe@example.com
{p_end}
 
{c_start}
[Encloses information related to credit here.]
{c_end}
 
{conf_start}
0.23
{conf_end}
 
---
 
**Edge Rules:**  
- Ignore page footers/headers like “Page X of Y” or “Confidential.”  
- If no data falls under a given heading, still emit the heading with `Not Present`.  
- Return only the two delimited blocks, in plain text, preserving line breaks.  
- Enclose the two blocks between `{p_start}` and `{p_end}` for personal info, and `{c_start}` and `{c_end}` for credit report details.
- Enclouse Confidence in `{conf_start}` and `{conf_end}` Confidence is a number between 0 and 1. 0 means low confidence and 1 means high confidence.
 
""",
    )
    extracted = asyncio.run(extract_text_from_images(image_paths, extraction_config))
 
    # Markers
 
    json_manifest = []
    account_infos = []
    confidences = []
 
    for idx, res in enumerate(extracted, start=1):
        # data = json.loads(res.response)
        raw = res.response
        print("Raw Text:", idx, raw)
 
        # Extract personal block
        if p_start in raw and p_end in raw:
            personal_info_block = raw.split(p_start, 1)[1].split(p_end, 1)[0].strip()
        else:
            personal_info_block = "Not Present"
 
        # Extract credit report block
        if c_start in raw and c_end in raw:
            credit_report_block = raw.split(c_start, 1)[1].split(c_end, 1)[0].strip()
        else:
            credit_report_block = "Not Present"
 
        # Extract confidence block
        if conf_start in raw and conf_end in raw:
            confidence_str = (
                raw.split(conf_start, 1)[1]
                .split(conf_end, 1)[0]
                .strip()
                .strip("\n")
                .strip()
            )
            # print("Confidence Block:", confidence_str)
            try:
                confidence_val = float(confidence_str)
            except ValueError:
                data = None
                confidence_val = data.get("confidence", 0.0)
        else:
            confidence_val = -1
            # confidence_val = data.get("confidence", 0.0)
 
        # Collect
        account_infos.append(personal_info_block)
        confidences.append(confidence_val)
 
        page_entry = {
            "page": idx,
            "personal_info": personal_info_block,
            "credit_report": credit_report_block,
            "page_confidence": confidence_val,
        }
        json_manifest.append(page_entry)
        # Save per-page JSON
        json_path = os.path.join(json_dir, f"credit_report-page_{idx}.json")
 
        with open(json_path, "w", encoding="utf-8") as jf:
            json.dump(page_entry, jf, ensure_ascii=False, indent=2)
 
    # Validate and summarize
    overall_confidence = sum(confidences) / len(confidences) if confidences else 0.0
    validation_result = validate_document(
        "\n\n".join(account_infos), document_type="credit_report"
    )
 
    reason = {
        "info": "High confidence in OCR results."
        if overall_confidence >= 0.95
        else (
            "Moderately low confidence in OCR results. Please review and verify."
            if overall_confidence >= 0.85
            else "Low confidence in OCR results. Please review and verify."
        ),
        "level": "success"
        if overall_confidence >= 0.95
        else ("warning" if overall_confidence >= 0.85 else "error"),
    }
 
    combined_manifest = {
        "extraction": {
            "overall_confidence": overall_confidence,
            "pages": json_manifest,
            "reason": reason,
        },
        "validation_result": validation_result,
    }
    combined_json_path = os.path.join(base_path, "credit_report-combined_manifest.json")
    with open(combined_json_path, "w", encoding="utf-8") as jf:
        json.dump(combined_manifest, jf, ensure_ascii=False, indent=2)
 
    print(f"JSON manifests saved in: {json_dir}")
 
 
if __name__ == "__main__":
    from argparse import ArgumentParser
 
    parser = ArgumentParser(
        description="Process credit reports and output JSON manifests"
    )
    parser.add_argument("--file_path", required=True, help="Path to the PDF file")
    parser.add_argument("--out_dir", default="assets", help="Base output directory")
    parser.add_argument("--uuid", default="user1", help="User ID")
    parser.add_argument("--process_id", default="process1", help="Process ID")
    args = parser.parse_args()
    main(args.file_path, args.out_dir, args.uuid, args.process_id)
 
 