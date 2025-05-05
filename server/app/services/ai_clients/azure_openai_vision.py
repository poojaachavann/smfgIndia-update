import os
import logging
import mimetypes
import base64
import json
from typing import Any, Dict, List, Optional
from openai import AzureOpenAI, AsyncAzureOpenAI

try:
    from .literals import Response, Pricing, Usage
except:
    from literals import Response, Pricing, Usage
from rich import print

logger = logging.getLogger(__name__)


class AzureOpenAIVisionModel:
    """A class for interacting with Azure OpenAI's vision models for image text extraction."""

    def __init__(
        self,
        azure_api_key: str,
        engine: str,
        azure_api_version: str,
        parameters: Optional[Dict[str, Any]] = None,
        azure_endpoint: Optional[str] = None,
        async_client: bool = False,
    ):
        """
        Initialize the Azure OpenAI vision model client.

        :param azure_api_key: Azure OpenAI API key
        :param engine: Deployment name/engine to use
        :param azure_api_version: API version
        :param parameters: Additional parameters for API calls
        :param azure_endpoint: Azure endpoint URL
        :param async_client: Whether to use async client
        """
        self.parameters = parameters or {}
        self.engine = engine
        self.async_client = async_client
        self.response = None
        self.usage = None

        client_args = {
            "azure_endpoint": azure_endpoint,
            "api_key": azure_api_key,
            "api_version": azure_api_version,
        }

        if async_client:
            self.client = AsyncAzureOpenAI(**client_args)
        else:
            self.client = AzureOpenAI(**client_args)

    @staticmethod
    def _guess_mime_type(file_path: str) -> str:
        """Guess MIME type with fallback to image/jpeg."""
        mime_type, _ = mimetypes.guess_type(file_path)
        return mime_type or "image/jpeg"

    @staticmethod
    def _read_image(file_path: str) -> bytes:
        """Read image file with error handling."""
        try:
            with open(file_path, "rb") as f:
                return f.read()
        except Exception as e:
            logger.error(f"Error reading image file: {str(e)}")
            raise

    @staticmethod
    def _encode_base64(data: bytes) -> str:
        """Encode binary data to base64 string."""
        return base64.b64encode(data).decode("utf-8")

    def _prepare_messages(
        self,
        system_persona: Optional[str],
        prompt_persona: Optional[str],
        image_path: str,
        messages: Optional[List[dict]],
    ) -> List[dict]:
        """Prepare messages structure for the API request."""
        if messages:
            return messages

        if not system_persona or not prompt_persona:
            raise ValueError(
                "System and prompt personas are required when messages are not provided"
            )

        mime_type = self._guess_mime_type(image_path)
        image_data = self._read_image(image_path)
        base64_image = self._encode_base64(image_data)

        return [
            {"role": "system", "content": system_persona},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt_persona},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{base64_image}",
                            "detail": "high",  # Can be "low", "high", or "auto"
                        },
                    },
                ],
            },
        ]

    def extract_text(
        self,
        prompt_persona: Optional[str] = None,
        system_persona: Optional[str] = None,
        image_path: Optional[str] = None,
        messages: Optional[List[dict]] = None,
        functions: Optional[List[Dict[str, Any]]] = None,
        function_call: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Synchronously extract text from an image."""
        if self.async_client:
            raise RuntimeError("Sync method called with async client configured")

        messages = self._prepare_messages(
            system_persona, prompt_persona, image_path, messages
        )

        try:
            response = self.client.chat.completions.create(
                model=self.engine,
                messages=messages,
                **self.parameters,
                functions=functions,
                function_call=function_call,
            )
        except Exception as e:
            logger.error(f"Text extraction failed: {str(e)}")
            raise

        return Response(**self._process_response(response))

    async def async_extract_text(
        self,
        prompt_persona: Optional[str] = None,
        system_persona: Optional[str] = None,
        image_path: Optional[str] = None,
        messages: Optional[List[dict]] = None,
        functions: Optional[List[Dict[str, Any]]] = None,
        function_call: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Asynchronously extract text from an image."""
        if not self.async_client:
            raise RuntimeError("Async method called with sync client configured")

        messages = self._prepare_messages(
            system_persona, prompt_persona, image_path, messages
        )

        try:
            response = await self.client.chat.completions.create(
                model=self.engine,
                messages=messages,
                functions=functions,
                function_call=function_call,
                **self.parameters,
            )
        except Exception as e:
            logger.error(f"Async text extraction failed: {str(e)}")
            raise

        return Response(**self._process_response(response))

    def _process_response(self, response: Any) -> Dict[str, Any]:
        """Process and validate the API response."""
        self.response = response

        if not response.choices:
            raise ValueError("No choices in API response")

        message = response.choices[0].message

        try:
            self.usage = self.get_pricing(model=response.model)
        except Exception as e:
            logger.warning(f"Could not calculate pricing: {str(e)}")
            self.usage = None

        # Handle function call response
        if message.function_call is not None:
            return {"response": message.function_call.arguments, "usage": self.usage}

        return {"response": message.content, "usage": self.usage}

    def get_pricing(
        self,
        costing_json_path: Optional[str] = None,
        provider: str = "azure",
        model: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Calculate pricing based on token usage."""
        if not self.response:
            raise ValueError("No response available for pricing calculation")

        try:
            pricing = self._load_pricing_data(costing_json_path)
        except Exception as e:
            logger.error(f"Failed to load pricing data: {str(e)}")
            return {}

        model_name = model or self.response.model
        pricing_key = f"{provider}/{model_name}"

        try:
            details = pricing[pricing_key]
        except KeyError:
            logger.warning(f"Pricing details not found for {pricing_key}")
            return {}

        input_cost = details["input_cost_per_token"] * self.response.usage.prompt_tokens
        output_cost = (
            details["output_cost_per_token"] * self.response.usage.completion_tokens
        )

        return {
            "model": model_name,
            "provider": provider,
            "pricing": {
                "prompt_tokens": self.response.usage.prompt_tokens,
                "completion_tokens": self.response.usage.completion_tokens,
                "total_tokens": self.response.usage.total_tokens,
                "input_cost": input_cost,
                "output_cost": output_cost,
                "total_cost": input_cost + output_cost,
            },
        }

    def _load_pricing_data(self, costing_json_path: Optional[str]) -> Dict:
        """Load pricing data from file or remote source."""
        if costing_json_path and os.path.exists(costing_json_path):
            logger.info(f"Loading pricing from {costing_json_path}")
            with open(costing_json_path) as f:
                return json.load(f)

        logger.info("Loading pricing from default GitHub source")
        import requests

        response = requests.get(
            "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json"
        )
        response.raise_for_status()
        return response.json()


if __name__ == "__main__":
    from dotenv import load_dotenv
    import asyncio
    from openai import AsyncAzureOpenAI

    load_dotenv()
    client = AzureOpenAIVisionModel(
        azure_api_key=os.getenv("API_Key"),
        azure_endpoint=os.getenv("End_point"),
        azure_api_version="2024-05-01-preview",
        engine="gpt-4o",
        parameters={"temperature": 0.1, "max_tokens": 4000},
        async_client=False,
    )
    response_schema = [
        {
            "name": "text_extraction",
            "description": "Extract the following information from the bank statement image, Please Ensure You dont just give output of \n\n in responses",
            "parameters": {
                "type": "object",
                "properties": {
                    "text": {
                        "type": "string",
                        "description": "The extracted text from the image",
                    },
                    "confidence": {
                        "type": "integer",
                        "description": "The confidence of the extraction",
                    },
                },
                "required": ["text", "confidence"],
            },
        }
    ]
    response = client.extract_text(
        prompt_persona="""Restructure and Fromat the following Text from the bank statement page Extracted through OCR, """,
        system_persona="""You are a highly skilled OCR Agent specializing in extracting bank statements. Your primary goal is to extract the following information from the bank statement image.""",
        image_path=r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\image.png",
        functions=response_schema,
        function_call={"name": "text_extraction"},
    )
    print(response)

    # print(response.response)
    # print(response.usage)
