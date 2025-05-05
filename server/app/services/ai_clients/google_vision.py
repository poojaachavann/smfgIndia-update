import base64
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
try:
    from .literals import Response,Usage,Pricing,TokenUsage
    from .costing import PricingCalculator
    
except:
    from .costing import PricingCalculator
    from .literals import Response,Usage,Pricing,TokenUsage
        

calculator = PricingCalculator()

class GeminiAIModel:
    def __init__(
        self,
        api_key=None
        if os.environ.get("GEMINI_API_KEY") is None
        else os.environ.get("GEMINI_API_KEY"),
    ):
        self.api_key = api_key
        if api_key is None:
            raise Exception("GEMINI_API_KEY not found in environment variables")
        else:
            print("GEMINI_API_KEY found in environment variables", api_key)
        self.client = genai.Client(api_key=api_key)

        self.default_model = "gemini-1.5-flash"
        self.default_generate_content_config = types.GenerateContentConfig(
            temperature=1,
            top_p=0.95,
            top_k=40,
            max_output_tokens=8192,
            response_mime_type="text/plain",
        )

    def generate(
        self,
        model,
        prompt,
        generate_content_config=None,
        chat_history=None,
        files=None,
        stream=False,
    ):
        model = self.default_model if model is None else model
        contents = []
        if files is not None:
            # print('Files:',files)
            files = [self.client.files.upload(file=file) for file in files]
            contents += [ types.Content(
                role="user",
                parts=[
                    types.Part.from_uri(
                        file_uri=files[0].uri,
                        mime_type=files[0].mime_type,
                    ),
                ],
            )] 
            
        contents += [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=str(prompt)),
                ],
            ),
        ]
        if chat_history is not None:
            contents = chat_history + contents
            generate_content_config = (
                self.default_generate_content_config
                if generate_content_config is None
                else generate_content_config
            )

        if not stream:
            response = self.client.models.generate_content(
                model=model,
                contents=contents,
                config=generate_content_config,
            )
            # print(response)
            token_usage = {
                "model": response.model_version,
                "prompt_tokens": response.usage_metadata.prompt_token_count,
                "completion_tokens": response.usage_metadata.candidates_token_count,
                "total_tokens": response.usage_metadata.total_token_count,
            }
            # print(token_usage)
            pricing = calculator.get_pricing(token_usage=TokenUsage(**token_usage))
            
            # print('Pricing:',pricing)
            
            yield Response(response=response.text, usage=Usage(**{"model": model, "provider": "google", "pricing": pricing}))
            
        else:
            # print('Streaming Response')
            for chunk in self.client.models.generate_content_stream(
                model=model,
                contents=contents,
                config=generate_content_config,
            ):
                yield chunk.text
            # print('Non Streaming Response')

        # return self.client.models.generate_content_stream(
        #     model=model,
        #     contents=contents,
        #     config=generate_content_config,
        # )


# if __name__ == "__main__":
# from llm_clients.google_text_gen import GeminiAIModel

if __name__ == "__main__":
    client = GeminiAIModel()
    response = client.generate(
        model="gemini-1.5-pro",
        prompt="""Hie""",
        stream=False,
        # files=[
        #     r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\corient\BankStatementAnalyser\data\statements\images\abu2.png"
        # ],
        generate_content_config=types.GenerateContentConfig(
            temperature=0.0,
            top_p=0.3,
            top_k=40,
            max_output_tokens=8192,
            response_mime_type="text/plain",system_instruction=[
                types.Part.from_text(
                    text="""
            """
                ),
            ],
        ),
    )
    print("Generated Iterable:", response)

    for data in response:
        print(data, end="")

