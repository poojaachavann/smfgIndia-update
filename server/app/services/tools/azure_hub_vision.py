import os
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
from rich import print
load_dotenv()
from io import BytesIO

try:
    from ..ai_clients.costing import (
        Usage,
        Pricing,
        TokenUsage,
        PricingCalculator,
    )
    from ..ai_clients.literals import Response
except:
    from costing import (
        Usage,
        Pricing,
        TokenUsage,
        PricingCalculator,
    )
    from literals import Response
# from .literals import Response
# Set the values of your computer vision endpoint and computer vision key
# as environment variables:

costing_json_path = os.getenv("costing_json_path")

calculator = PricingCalculator(costing_json_path)


try:
    endpoint = os.environ["VISION_ENDPOINT"]
    key = os.environ["VISION_KEY"]
except KeyError:
    print("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'")
    print("Set them before running this sample.")
    exit()

# Create an Image Analysis client
client = ImageAnalysisClient(endpoint=endpoint, credential=AzureKeyCredential(key))


def azure_image_parser(image_path: str):
    result = client.analyze(
        image_data=BytesIO(open(image_path, "rb").read()),
        visual_features=[VisualFeatures.READ],
        gender_neutral_caption=True,  # Optional (default is False)
    )
    # print("Results:", )
    # import json 
    # json_data = (json.dumps(result.as_dict(), indent=2))
    # save to json file
    # with open(f"result-{image_path.split('/')[-1]}.json", "w") as f:
    #     f.write(json_data)

    if result.caption is not None:
        print(f"   '{result.caption.text}', Confidence {result.caption.confidence:.4f}")

    lines = []
    for line in result.as_dict()["readResult"]["blocks"][0]["lines"]:
        # print(f"   Line: '{line.text}', Bounding box {line.bounding_polygon}")
        line_metadata = {'text':'','confidence':0.0}
        for word in line["words"]:
            line_metadata['text'] += " " + word['text']
            line_metadata['confidence'] += word['confidence']/len(line["words"])
        lines.append(line_metadata)
    text = "".join([line['text'] for line in lines])
    confidence = sum([line['confidence'] for line in lines])/len(lines)
    # token_usage = TokenUsage(
    #     **{
    #         "model": "azure/ai-vision",
    #         "prompt_tokens": 0,
    #         "completion_tokens": 0,
    #         "total_tokens": 0,
    #     }
    # )
    # # pricing = calculator.get_pricing(token_usage=token_usage)
    # print('Pricing',pricing)
    # usage = Usage( model="ai-vision", provider="azure", pricing= pricing)
    return Response(
        response={'text':text,'confidence':confidence},
        usage=Usage( 
            model="ai-vision",
            provider="azure",
            pricing=Pricing(
                total_cost=0.0015,
                total_tokens=2,
                prompt_tokens=1,
                completion_tokens=0,
                input_cost=0.0015,
                output_cost=0.0,
            ),
        ),
    )
    # return lines
    # return Response(response=lines, usage=Usage(model="ai-vision", provider="azure", pricing=Pricing(total_cost=0.0015, total_tokens=2, prompt_tokens=1, completion_tokens=0, input_cost=0.0015, output_cost=0.0)))


if __name__ == "__main__":
    print(
        azure_image_parser(
            r"./image.png"
        )
    )
