import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO
import os
import json
import cv2
import numpy as np
from dotenv import load_dotenv
from azure.core.credentials import AzureKeyCredential
# from azure.ai.documentintelligence import DocumentIntelligenceClient
# async client
from azure.ai.documentintelligence.aio import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest
import seaborn as sns
try:
    from .literals import Response, Usage, Pricing
except ImportError:
    from literals import Response, Usage, Pricing

# Load environment variables
load_dotenv()
endpoint = os.getenv("BANKSTATEMENT_VISION_ENDPOINT")
key = os.getenv("BANKSTATEMENT_API_KEY")
model_id = os.getenv("BANKSTATEMENT_MODEL_ID", "prebuilt-bankStatement.us")

if not endpoint or not key:
    raise EnvironmentError(
        "Missing BANKSTATEMENT_VISION_ENDPOINT or BANKSTATEMENT_API_KEY in .env"
    )

async def get_document_client():
    return DocumentIntelligenceClient(
        endpoint=endpoint, 
        credential=AzureKeyCredential(key)
    )

async def compress_image_to_target_size(
    image: Image.Image, 
    target_size_mb: float = 4.0, 
    step: int = 2, 
    min_quality: int = 20
) -> BytesIO:
    # Convert RGBA to RGB to avoid JPEG save issues
    if image.mode in ('RGBA', 'LA'):
        img = Image.new("RGB", image.size, (255, 255, 255))
        img.paste(image, mask=image.split()[-1])  # Remove alpha channel
    else:
        img = image.convert("RGB")  # Ensure RGB mode

    target_bytes = target_size_mb * 1024 * 1024
    buffer = BytesIO()

    # Initial quality check
    img.save(buffer, format="JPEG", optimize=True, quality=95)
    if buffer.tell() <= target_bytes:
        buffer.seek(0)
        return buffer

    # Binary search for optimal quality
    low, high = min_quality, 100
    best_buffer = None
    while low <= high:
        mid = (low + high) // 2
        buffer = BytesIO()
        img.save(buffer, format="JPEG", optimize=True, quality=mid)
        size = buffer.tell()
        
        if size <= target_bytes:
            best_buffer = buffer
            low = mid + 1
        else:
            high = mid - 1

    if best_buffer:
        best_buffer.seek(0)
        return best_buffer
    raise ValueError("Image compression failed to meet target size")

async def _parse_response(results_dict):
    words_confidences = [
        word for page in results_dict["pages"] 
        for word in page["words"]
    ]
    words_confidences = [
        word["confidence"]  for word in words_confidences
    ]
    # print('Words Confidence',words_confidences,"_parse_response")
    # words_confidences.sort(key=lambda x: x.get("confidence", 0), reverse=True)
    return Response(
        response={
            "raw": results_dict,
            "text": results_dict["content"],
            "words_confidences": words_confidences,
            "confidence": sum( words_confidences) / len(words_confidences),
        },
        usage=Usage(
            model="ai-document-intelligence",
            provider="azure",
            pricing=Pricing(
                total_cost=0.01,
                total_tokens=2,
                prompt_tokens=1,
                completion_tokens=1,
                input_cost=0.0010,
                output_cost=0.0,
            ),
        ),
    )

async def analyze_image(stream: BytesIO, client: DocumentIntelligenceClient) -> Response:
    poller = await client.begin_analyze_document(
        model_id=model_id,
        analyze_request=AnalyzeDocumentRequest(bytes_source=stream.getvalue()),
    )
    results = await poller.result()    
    return  await _parse_response(results.as_dict())

def annotate_image(image_path: str, ocr_data: dict, output_path: str):
    image = cv2.imread(image_path)
    for word in (w for p in ocr_data.get("pages", []) for w in p.get("words", [])):
        if len(poly := word.get("polygon", [])) != 8:
            continue
        pts = np.array(poly, dtype=np.int32).reshape(4, 2)
        cv2.polylines(image, [pts], True, (0, 255, 0), 1)
        cv2.putText(
            image, 
            word.get("content", ""), 
            tuple(pts[0]), 
            cv2.FONT_HERSHEY_SIMPLEX, 
            0.3, 
            (0, 0, 255), 
            1
        )
    cv2.imwrite(output_path, image)
    
def _confidence_analysis(confidences_list:list,fig_path:str="confidence_analysis.png"):
    # print("Confidence Analysis",confidences_list)
    fig = plt.figure()
    sns.histplot(confidences_list,bins=100,  kde=True)
    plt.title("Confidence Distribution")
    plt.xlabel("Confidence")
    plt.ylabel("Frequency")
    plt.savefig(fig_path)
    
    
    

async def main(
    input_image_path: str,
    json_output_path: str = "ocr_results.json",
    annotated_output_path: str = "annotated_image.jpg",
    show_annotations=True,
    confidence_analysis=True,
):
    client = get_document_client()
    with Image.open(input_image_path) as img:
        compressed = await compress_image_to_target_size(img)
        ocr_results = await analyze_image(compressed, client)
    
    if show_annotations:
        annotate_image(input_image_path, ocr_results.response['raw'], annotated_output_path)
    if confidence_analysis:
        _confidence_analysis(ocr_results.response['words_confidences'],)
    
    
    with open(json_output_path, "w") as jf:
        json.dump(ocr_results.model_dump(), jf, indent=2)

if __name__ == "__main__":
    import argparse
    import asyncio

    parser = argparse.ArgumentParser(description="OCR pipeline for bank statements")
    parser.add_argument("--image", required=True, help="Input image path")
    parser.add_argument("--json_out", default="ocr_results.json", help="JSON output path")
    parser.add_argument("--img_out", default="annotated_image.jpg", help="Annotated image path")
    args = parser.parse_args()
    
    asyncio.run(main(args.image, args.json_out, args.img_out))