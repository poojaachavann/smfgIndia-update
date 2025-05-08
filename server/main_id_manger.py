#  image parser
from app.services.ocrExtreme.image_parser import (
    extract_text_from_images,
    ExtractionConfig,
)
from app.services.ocrExtreme.statement_parser import (
    parse_statement_pages,
    ParsingConfig,
)
from app.services.verifiers.personal_address_info_presence import validate_document
 
import asyncio
from app.utils.read_write import write_json
from app import PDFToImagesConverter
import os
from app.services.ai_clients import AzureOpenAIVisionModel, AzureOpenAIModel
 
from dotenv import load_dotenv
import asyncio
from openai import AsyncAzureOpenAI
from app.services.face_detection.yolo_face_extractor import save_faces,save_top_faces
import io
import sys
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
 
personal_start = "[$SEP-PERSONAL-INFO-START]"
personal_end = "[$SEP-PERSONAL-INFO-END]"
 
confidence_start = "[$SEP-CONFIDENCE-START]"
confidence_end = "[$SEP-CONFIDENCE-END]"
 
photo_start = "[$SEP-PHOTO-START]"
photo_end = "[$SEP-PHOTO-END]"
 
photo_quality_start = "[$SEP-PHOTO-Quality-START]"
photo_quality_end = "[$SEP-PHOTO-Quality-END]"
 
 
load_dotenv()
client = AzureOpenAIVisionModel(
    azure_api_key=os.getenv("API_Key"),
    azure_endpoint=os.getenv("End_point"),
    azure_api_version="2024-12-01-preview",
    engine="gpt-4-turbo-vision",
    parameters={"temperature": 0.1, "max_tokens": 4000},
    async_client=True,
)
 
 
def extract_id_proof(text_of_id_proof_pages, images):
    combined_id_proof_text_corpus = "\n".join(text_of_id_proof_pages)
 
    system_prompt = f"""You are a forensic document analysis AI specializing in global ID validation. Follow these protocols:
 
    {personal_start}
    1. Full Name: [First/Middle/Last; preserve diacritics]
    2. Date of Birth: [DD-MM-YYYY; convert all formats]
    3. ID Number: [Prioritize machine-readable zone]
    4. Address: [Street;City;State;Zip;Country concatenation]
    5. Gender: [M/F/X/Null per document markings]
    6. Issue Date: [DD-MM-YYYY with issuing context]
    7. Expiry Date: [DD-MM-YYYY with validity conditions]
    8. Authority: [Issuer + jurisdiction + agency code]
    {personal_end}
 
    {confidence_start}
    0.8
    {confidence_end}
 
    {photo_start}
    Presence: [Yes/No/Unclear]
    {photo_end}
 
    {photo_quality_start}
    0.2
    {photo_quality_end}
 
    Validation Protocol:
 
    A. Multi-instance Resolution:
    1. Name Variants: Combine with "aka" for alt names
    2. Address History: Chronological ";" separation
    3. ID Versions: Version codes for updated documents
    4. Etc. Important things.
 
    B. Security Verification:
    1. Physical: Holograms/UV/Intaglio printing
    2. Digital: QR signatures/Chip presence
    3. Cryptographic: Public key validation status
 
    C. Anomaly Handling:
    1. Partial Matches: Flag with confidence penalties
    2. Expired Documents: Note validity period exceptions
    3. Cross-border Features: ISO 3166-1 code mapping
 
    D. Confidence Calculus:
    95-100: Forensic match + live feature verification
    80-94: Visual match + 2 security features
    65-79: Partial visual + 1 security feature
    50-64: Text-only + security alerts
    <50: Suspected forgery pattern
    confidence value is going to be integer btw 0-1
 
    Output Requirements:
    1. Maintain original document structure hierarchy.
    2. Preserve non-Latin characters exactly.
    3. Encode damaged fields as "[Illegible:Position]".
    4. Output ONLY delimited blocks with atomic values.
    5. Photo qulaity is gona be floating point number btw 0-1.
    """
 
    prompt = f"""OCR Extracted Text from these images given to you {combined_id_proof_text_corpus}"""
    response = asyncio.run(
        client.async_extract_text(
            system_persona=system_prompt, prompt_persona=prompt, images_paths=images
        )
    )
    print("Response: 95 ", response)
    # for idx, res in enumerate([response], start=1):
    # data = json.loads(res.response)
    raw = response.response
    # print("Raw Text:",idx, raw)
 
    # Extract personal block
 
    if personal_start in raw and personal_end in raw:
        personal_info_block = (
            raw.split(personal_start, 1)[1].split(personal_end, 1)[0].strip()
        )
    else:
        personal_info_block = "Not Present"
    print("Personal Info: ", personal_info_block)
 
    if confidence_start in raw and confidence_end in raw:
        confidence_block = (
            raw.split(confidence_start, 1)[1].split(confidence_end, 1)[0].strip()
        )
    else:
        confidence_block = "Not Present"
 
    print("Confidence Info: ", confidence_block)
    # # Extract credit report block
    if photo_start in raw and photo_end in raw:
        photo_block = raw.split(photo_start, 1)[1].split(photo_end, 1)[0].strip()
    else:
        photo_block = "Not Present"
    print("Photo block", photo_block)
 
    if photo_quality_start in raw and photo_quality_end in raw:
        photo_quality_block = (
            raw.split(photo_quality_start, 1)[1].split(photo_quality_end, 1)[0].strip()
        )
 
    else:
        photo_quality_block = "Not Present"
    print("Photo quality ", photo_quality_block)
 
    return {
        "personal_info": personal_info_block,
        "photo": photo_block,
        "photo_quality": photo_quality_block,
        "confidence": confidence_block,
    }
 
 
def main(file_paths=[], out_dir="assets", uuid=None, process_id=None):
    base_path = os.path.join(os.getcwd(), out_dir, f"uid-{uuid}", f"pid-{process_id}")
    images_dir = os.path.join(base_path, "images")
    json_dir = os.path.join(base_path)
 
    # Ensure directories exist
    for d in [base_path, images_dir, json_dir]:
        os.makedirs(d, exist_ok=True)
 
    converter = PDFToImagesConverter(temp_image_prefix="id_proof")
 
    images_paths = []
    for file_path in file_paths:
        image_paths = converter.convert(file_path, images_dir)
        images_paths.extend(image_paths)
    print("Image Paths:", image_paths)
 
    extraction_config_1 = ExtractionConfig(model="azure-hub-vision")
 
    extracted = asyncio.run(
        extract_text_from_images(images_paths, extraction_config=extraction_config_1)
    )
    print("Extracted :", extracted)
    extracted_texts = [response.response["text"] for response in extracted]
    confidences = [res.response["confidence"] for res in extracted]
    overall_confidence = sum(confidences) / len(confidences)
   
    # extraction_config_2 = ExtractionConfig(model='azure_openai_vision',system_persona="You are A adhaar document Validator agent")
    results = {'extraction': {'pages': [],'overall_confidence': 0.0,'reason': {'info': '', 'level': ''}}}
   
    extraction_results = extract_id_proof(extracted_texts, images_paths)
   
    results['extraction']['pages'] = extraction_results
    results['extraction']['overall_confidence'] = overall_confidence
   
    if overall_confidence < 0.85:
        print(f"Low overall confidence: {overall_confidence}")
        reason = {
            "info": "Low confidence in OCR results. Please review and verify.",
            "level": "error",
        }
    elif overall_confidence < 0.95:
        print(f"⚠️ Moderately low overall confidence: {overall_confidence}")
        reason = {
            "info": "Moderately low confidence in OCR results. Please review and verify.",
            "level": "warning",
        }
    else:
        reason = {"info": "High confidence in OCR results.", "level": "success"}
 
    results['extraction']['reason'] = reason
   
    json_path = os.path.join(json_dir, "id_proof-combined_manifest.json")
    outputs = save_top_faces(image_paths=image_paths,output_dir=images_dir,top_k=1)
 
    results['extraction']['faces'] = outputs
   
    validation_result = validate_document(results['extraction']['pages']['personal_info'], document_type="id_proof")
   
    results['validation_result'] = validation_result
    write_json(results,json_path)
   
    print("Validation Results :", extraction_results)
   
   
if __name__ == "__main__":
    from argparse import ArgumentParser
    parser = ArgumentParser(description="Process ID proofs")
    parser.add_argument("--file_path", required=True, help="Path to the PDF file",nargs="+")
    parser.add_argument("--out_dir", default="assets", help="Base output directory")
    parser.add_argument("--uuid", default="user1", help="User ID")
    parser.add_argument("--process_id", default="process1", help="Process ID")
    args = parser.parse_args()
   
    main(
       args.file_path,
        args.out_dir,
        args.uuid,
        args.process_id,
    )
 
 