# """Main processing script for bank statements."""

# import os
# import json
# import asyncio
# import pandas as pd
# from io import StringIO
# from app.services.ai_clients.azure_openai import AzureOpenAIModel
# from app import (
#     extract_text_from_images,
#     ExtractionConfig,
#     parse_statement_pages,
#     ParsingConfig,
#     PDFToImagesConverter,
# )

# from app.services.verifiers.personal_address_info_presence import validate_document



# # def verify_account_info(account_info):
# #     verify the wheather the address present in the bank statement


# # Main processing function
# def main(file_path=None, out_dir="assets", uuid=None, process_id=None):
#     # Build output directories
#     base_path = os.path.join(os.getcwd(), out_dir, f"uid-{uuid}", f"pid-{process_id}")
#     images_dir = os.path.join(base_path, "images")
#     json_dir = os.path.join(base_path, "json")
#     page_csv_dir = os.path.join(base_path, "page_csv")
#     combined_csv_path = os.path.join(base_path, "combined_transactions.csv")

#     # Ensure directories exist
#     for d in [base_path, images_dir, json_dir, page_csv_dir]:
#         os.makedirs(d, exist_ok=True)

#     # Convert PDF to images
#     converter = PDFToImagesConverter(temp_image_prefix="credit_report")
#     image_paths = converter.convert(file_path, images_dir)[:1]
#     print("Image Paths:", image_paths)

#     # Extract text from images
#     extraction_config = ExtractionConfig(model="azure_openai_vision",system_persona="""
# You are an expert OCR Agent specialized in extracting structured data from credit bureau report images or PDFs. Your job is to split the report into two clearly delimited sections—**Personal & Account Information** and **Credit Report Details**—using keyword-driven separators.



# [$SEPPERSONAL-START]
# **Personal & Account Information**  
# – Extract fields matching (case-insensitive) keywords:  
#   • Name  
#   • Date of Birth / DOB  
#   • PAN / Tax ID  
#   • Address  
#   • Contact / Phone / Email  
#   • Report Date  
  
# For each, output `Field Name: Value`. If absent or unparseable, output `Field Name: Not Present`.  
# [$SEPPERSONAL-END]

# ---

# [$CREDIT_REPORT-START]
# **Credit Report Details**  
# – Detect and extract blocks keyed by these headings or keywords (case-insensitive):  
#   • “Credit Score” / “Score”  
#   • “Account Summary” / “Account Type”  
#   • “Outstanding Balance” / “Current Balance”  
#   • “Credit Limit”  
#   • “Payment History” / “Delinquencies”  
#   • “Inquiries” / “Enquiries”  
#   • “Public Records” / “Collections”  
  
# Under each detected heading, capture the text lines until the next heading or end of page. Preserve numeric values (strip symbols, normalize separators, convert parentheses to negative). If a section isn’t found, output that heading followed by `: Not Present`.

# example Output format :
# ```
# Name: John Doe
# Date of Birth / DOB: 15-Jul-1985
# PAN / Tax ID: ABCDE1234F
# Address: 204, Sai Apartments, MG Road, Mumbai 400001
# Contact / Phone / Email: 912234567890, john.doe@example.com
# Report Date: 28-May-2024

# [$SEP-CREDIT_REPORT-START]
# Credit Score: 750
# Account Summary:
#   • Credit Card – Active – Balance ₹12,345
#   • Home Loan – Closed – Balance ₹0
# Payment History:
#   • Jan ’25: On Time
#   • Feb ’25: 30 Days Late
# Inquiries: 2 (Mar ’25, Apr ’25)
# Public Records: None
# [$SEP-CREDIT_REPORT-END]

# [$SEP-CONFIDENCE-START]
# 0.23
# [$SEP-CONFIDENCE-END]


# ---

# **Edge Rules:**  
# - Ignore page footers/headers like “Page X of Y” or “Confidential.”  
# - If no data falls under a given heading, still emit the heading with `Not Present`.  
# - Return only the two delimited blocks, in plain text, preserving line breaks.  
# - Enclose the two blocks between `[$SEPPERSONAL-START]` and `[$SEPPERSONAL-END]` for personal info, and `[$SEP-CREDIT_REPORT-START]` and `[$SEP-CREDIT_REPORT-END]` for credit report details.
# - Confidence is a number between 0 and 1. 0 means low confidence and 1 means high confidence.
# """)
#     # extracted = asyncio.run(extract_text_from_images(image_paths, extraction_config))

#     # print("Extracted Text:", extracted)

    
#     # pages_texts = [res.response for res in extracted]
    
#     pages_texts = ['[$SEPPERSONAL-START]\n**Personal & Account Information**  \nName: John Doe, John Q. Doe  \nDate of Birth / DOB: 01/01/1988  \nPAN / Tax ID: Not Present  \nAddress: 123 Oak St. Anytown, WI, 11111; 111 Miller St. Hometown, WI, 33333; 333 1st St. Townville, MN, 22222  \nContact / Phone / Email: 555-555-5555, 555-123-4567  \nReport Date: 5/10/2018  \n[$SEPPERSONAL-END]\n\n---\n\n[$SEP-CREDIT_REPORT-START]\nCredit Score: Not Present  \nAccount Summary: Not Present  \nOutstanding Balance: Not Present  \nCredit Limit: Not Present  \nPayment History: Not Present  \nInquiries: Not Present  \nPublic Records:  \n  • Regional Federal Court Docket # XYZ789  \n  • Account Number: ***9514  \n  • Type: Chapter 7 Bankruptcy  \n  • Status: Filed  \n  • Date Reported: 04/2013  \n  • Closing Date: 07/2013  \n  • Filed as: Individual Account  \n  • Liability: 35000  \n  • Exempt Amount: 5000  \n  • Asset Amount: 10000  \n  • Paid: 2000  \n[$SEP-CREDIT_REPORT-END]\n\n[$SEP-CONFIDENCE-START]\n0.85\n[$SEP-CONFIDENCE-END]']
#     # confidences = [json.loads(res.response)["confidence"] for res in extracted]
#     # overall_confidence = sum(confidences) / len(confidences)
#     # print("Texts:", texts)
#     # parsed = asyncio.run(
#     #     parse_statement_pages(pages=texts, parsing_config=parsing_config)
#     # )

#     print("Pages Texts:", pages_texts)
    
#     # Prepare accumulators
#     json_manifest = []
#     account_infos = []
#     confidences = []
#     # Delimiters for transactions block
#     start_marker_credit_report = "[$SEP-CREDIT_REPORT-START]"
#     end_marker_credit_report = "[$SEP-CREDIT_REPORT-END]"

#     start_marker_personal = "[$SEPPERSONAL-START]"
#     end_marker_personal = "[$SEPPERSONAL-END]"
    
#     start_marker_confidence = "[$SEP-CONFIDENCE-START]"
#     end_marker_confidence = "[$SEP-CONFIDENCE-END]"
    
#     for idx, page in enumerate(pages_texts, start=1):
#         raw = page.strip("`").strip()
#         # print('Parsed: ',raw)
#         # Split account info and transactions by custom markers
#         if start_marker_credit_report in raw and end_marker_credit_report in raw:
#             pre, rest = raw.split(start_marker_credit_report, 1)
#             account_info = pre.strip()
#             credit_report_block = rest.split(end_marker_credit_report, 1)[0].strip()
#             print("Credit Report Block:", credit_report_block)
#         else :
#             credit_report_block = 'Not Present'

#         if start_marker_personal in raw and end_marker_personal in raw:
#             pre,rest = raw.split(start_marker_personal, 1)
#             account_info = pre.strip()
#             personal_info_block = rest.split(end_marker_personal, 1)[0].strip()
#             print("Personal Info Block:", personal_info_block)
#         else:
#             personal_info_block = 'Not Present'
            
#         if start_marker_confidence in raw and end_marker_confidence in raw:
#             pre,rest = raw.split(start_marker_confidence, 1)
#             personal_info_block = pre.strip()
#             confidence_block = rest.split(end_marker_confidence, 1)[0].strip()
#             print("Confidence Block:", confidence_block)
            
#         else:
#             confidence_block = 'Not Present'

#         # Determine if transaction CSV exists
#         account_infos.append(personal_info_block)
#         confidences.append(float(confidence_block.strip('\n')))
        
        
#         page_entry = {
#                 "page": idx,
#                 "account_info": personal_info_block,
#                 "credit_report": credit_report_block,
#                 "page_confidence": float(confidence_block.strip('\n')),
#             }
            
#         # Record JSON manifest
#         json_manifest.append(page_entry)
#         json_path = os.path.join(json_dir, f"credit_report-page_{idx}.json")
#         with open(json_path, "w", encoding="utf-8") as jf:
#             json.dump(page_entry, jf, ensure_ascii=False, indent=2)

#     validation_result = validate_document('\n\n'.join(account_infos), document_type="credit_report")
#     overall_confidence = sum(confidences) / len(confidences)
#     if overall_confidence < 0.85:
#         print(f"Low overall confidence: {overall_confidence}")
#         reason = {
#             "info": "Low confidence in OCR results. Please review and verify.",
#             "level": "error",
#         }
#     elif overall_confidence < 0.95:
#         print(f"⚠️ Moderately low overall confidence: {overall_confidence}")
#         reason = {
#             "info": "Moderately low confidence in OCR results. Please review and verify.",
#             "level": "warning",
#         }
#     else:
#         reason = {"info": "High confidence in OCR results.", "level": "success"}

#     # Validate account info

#     # Save combined JSON manifest
#     combined_json_manifest = {
#         "extraction": {
#             "overall_confidence": overall_confidence,
#             "pages": json_manifest,
#             "combined_csv_path": combined_csv_path,
#             "reason": reason,
#         },
#         "validation_result": validation_result,
#     }
#     combined_json_path = os.path.join(base_path, "credit_report-combined_manifest.json")
#     with open(combined_json_path, "w", encoding="utf-8") as jf:
#         json.dump(combined_json_manifest, jf, ensure_ascii=False, indent=2)

#     # Save combined CSV

#     print(f"JSON manifests saved in: {json_dir}")
#     print(f"Page CSVs saved in: {page_csv_dir}")


# # CLI entrypoint
# if __name__ == "__main__":
#     from argparse import ArgumentParser

#     parser = ArgumentParser(description="Process bank statements")
#     parser.add_argument("--file_path", required=True, help="Path to the PDF file")
#     parser.add_argument("--out_dir", default="assets", help="Base output directory")
#     parser.add_argument("--uuid", default="user1", help="User ID")
#     parser.add_argument("--process_id", default="process1", help="Process ID")
#     args = parser.parse_args()
#     main(args.file_path, args.out_dir, args.uuid, args.process_id)

#     # & C:/Users/akliv/.pyenv/pyenv-win/versions/3.12.8/python.exe "C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\v2\main_bank_statement_manger.py" --file_path "C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\data\statements\pdfs\8241318_Santosh.pdf" --uuid 'testing' --process_id "santosh"



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
import io
import sys
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')

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
Report Date: 28-May-2024
Credit Score: 750
Account Summary:
  • Credit Card – Active – Balance ₹12,345
  • Home Loan – Closed – Balance ₹0
Payment History:
  • Jan ’25: On Time
  • Feb ’25: 30 Days Late
Inquiries: 2 (Mar ’25, Apr ’25)
Public Records: None
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

"""
    )
    extracted = asyncio.run(extract_text_from_images(image_paths, extraction_config))

    # Markers


    json_manifest = []
    account_infos = []
    confidences = []

    for idx, res in enumerate(extracted, start=1):
        # data = json.loads(res.response)
        raw = res.response
        print("Raw Text:",idx, raw)

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
            confidence_str = raw.split(conf_start, 1)[1].split(conf_end, 1)[0].strip().strip("\n").strip()
            # print("Confidence Block:", confidence_str)
            try:
                confidence_val = float(confidence_str)
            except ValueError:
                data = None
                confidence_val = data.get("confidence", 0.0)
        else:
            confidence_val=-1
            # confidence_val = data.get("confidence", 0.0)

        # Collect
        account_infos.append(personal_info_block)
        confidences.append(confidence_val)

        page_entry = {
            "page": idx,
            "personal_info": personal_info_block,
            "credit_report": credit_report_block,
            "page_confidence": confidence_val
        }
        json_manifest.append(page_entry)

        # Save per-page JSON
        json_path = os.path.join(json_dir, f"credit_report-page_{idx}.json")
        with open(json_path, "w", encoding="utf-8") as jf:
            json.dump(page_entry, jf, ensure_ascii=False, indent=2)

    # Validate and summarize
    overall_confidence = sum(confidences) / len(confidences) if confidences else 0.0
    validation_result = validate_document("\n\n".join(account_infos), document_type="credit_report")

    reason = {
        "info": "High confidence in OCR results." if overall_confidence >= 0.95 else (
            "Moderately low confidence in OCR results. Please review and verify." if overall_confidence >= 0.85 else
            "Low confidence in OCR results. Please review and verify."),
        "level": "success" if overall_confidence >= 0.95 else ("warning" if overall_confidence >= 0.85 else "error")
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
    parser = ArgumentParser(description="Process credit reports and output JSON manifests")
    parser.add_argument("--file_path", required=True, help="Path to the PDF file")
    parser.add_argument("--out_dir", default="assets", help="Base output directory")
    parser.add_argument("--uuid", default="user1", help="User ID")
    parser.add_argument("--process_id", default="process1", help="Process ID")
    args = parser.parse_args()
    main(args.file_path, args.out_dir, args.uuid, args.process_id)
