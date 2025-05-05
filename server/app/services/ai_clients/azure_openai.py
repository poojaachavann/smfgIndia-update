import os
import logging
from typing import Any, Dict, List, Optional, Union
from openai import AzureOpenAI, AsyncAzureOpenAI
import json
from rich import print

try:
    from .literals import Response,Pricing,Usage
    from .costing import PricingCalculator,Costing
except:
    from literals import Response,Pricing,Usage
    from costing import PricingCalculator,Costing
# from .literals import Response,Pricing,Usage

logger = logging.getLogger(__name__)


class AzureOpenAIModel:
    """A class to interact with Azure OpenAI's API for text and image generation."""

    def __init__(
        self,
        azure_api_key: str,
        azure_api_version: str,
        azure_deployment: str = None,
        parameters: Dict[str, Any] = None,
        azure_endpoint: str = None,
        async_client: bool = False,
        
        **kwargs,
    ):
        """
        Initialize Azure OpenAI client.

        :param azure_api_key: Azure OpenAI API key
        :param azure_api_version: API version
        :param parameters: Dictionary of parameters for API calls
        :param azure_endpoint: Azure endpoint URL
        :param async_client: Whether to use async client
        """
        self.parameters = parameters or {}
        print('Parameters:',kwargs)
        client_args = {
            "api_key": azure_api_key,
            "api_version": azure_api_version,
            "azure_endpoint": azure_endpoint,
            "azure_deployment": azure_deployment,
        }
        print('Client Args:',client_args)
        self.client = (
            AsyncAzureOpenAI(**client_args)
            if async_client
            else AzureOpenAI(**client_args)
        )
        self.api_key = azure_api_key
        self.response = None

    def _prepare_messages(
        self,
        system_persona: Optional[str],
        prompt: Optional[str],
        messages: Optional[List[dict]],
    ) -> List[dict]:
        """Prepare messages list from components or validate existing messages."""
        if messages is None:
            if system_persona is None or prompt is None:
                raise ValueError(
                    "Either messages or system_persona and prompt must be provided"
                )
            return [
                {"role": "system", "content": system_persona},
                {"role": "user", "content": prompt},
            ]
        return messages

    def _process_response(
        self, response: Any, functions: Optional[List[Dict[str, Any]]]
    ) -> Dict[str, Any]:
        """Process API response and extract relevant data."""
        self.response = response
        message = response.choices[0].message

        # Handle function call response
        if functions and message.function_call:
            response_data = message.function_call.arguments
        else:
            response_data = message.content

        return {"response": response_data, "usage": self.get_pricing()}

    def generate_text(
        self,
        task_id: Optional[str] = None,  # Kept for interface compatibility
        system_persona: Optional[str] = None,
        prompt: Optional[str] = None,
        messages: Optional[List[dict]] = None,
        functions: Optional[List[Dict[str, Any]]] = None,
        function_call: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Generate text using Azure OpenAI's chat completion API."""
        messages = self._prepare_messages(system_persona, prompt, messages)

        response = self.client.chat.completions.create(
            messages=messages,
            functions=functions,
            function_call=function_call,
            **self.parameters,
        )
        # print('Response:',response)

        return Response(**self._process_response(response, functions))

    async def generate_text_async(
        self,
        task_id: Optional[str] = None,
        system_persona: Optional[str] = None,
        prompt: Optional[str] = None,
        messages: Optional[List[dict]] = None,
        functions: Optional[List[Dict[str, Any]]] = None,
        function_call: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Generate text asynchronously using Azure OpenAI's API."""
        messages = self._prepare_messages(system_persona, prompt, messages)

        response = await self.client.chat.completions.create(
            messages=messages,
            functions=functions,
            function_call=function_call,
            **self.parameters,
        )
        # print('Response:',response)
        return Response(**self._process_response(response, functions))

    def generate_image(
        self,
        task_id: str,
        prompt: str,
        resource_box,
    ) :
        """Generate image using Azure OpenAI's DALL-E API."""
        valid_params = {"model", "n", "size", "quality", "response_format", "style"}
        filtered_params = {
            k: v for k, v in self.parameters.items() if k in valid_params
        }

        if "model" not in filtered_params:
            raise ValueError("The 'model' parameter is required for image generation")

        try:
            response = self.client.images.generate(prompt=prompt, **filtered_params)
        except Exception as e:
            logger.error(f"Image generation failed: {str(e)}")
            raise

        if not response.data:
            raise ValueError("No images were generated")

        return resource_box.save_from_url(url=response.data[0].url, subfolder=task_id)

    def get_pricing(
        self,
        costing_json_path: Optional[str] = None,
        provider: str = "azure",
    ) -> Optional[Dict[str, Any]]:
        """Calculate pricing based on current response."""
        if self.response is None:
            logger.warning("No response available to calculate pricing")
            return None

        # Load pricing data
        try:
            if costing_json_path and os.path.exists(costing_json_path):
                with open(costing_json_path) as f:
                    pricing = json.load(f)
                logger.info(f"Loaded pricing from {costing_json_path}")
            else:
                pricing_url = "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json"
                logger.info(f"Loading pricing from {pricing_url}")
                import requests

                response = requests.get(pricing_url)
                response.raise_for_status()
                pricing = response.json()
        except Exception as e:
            logger.error(f"Failed to load pricing data: {str(e)}")
            return None

        # Get model details
        model_name = self.response.model
        pricing_key = f"{provider}/{model_name}"

        try:
            details = pricing[pricing_key]
        except KeyError:
            logger.warning(f"Pricing details not found for {pricing_key}")
            return None

        # Calculate costs
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


if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()
    client = AzureOpenAIModel(
        azure_api_key=os.getenv("API_Key"),
        azure_endpoint=os.getenv("End_point"),
        azure_api_version=os.getenv("API_version"),
        parameters={"temperature": 0.1, "model": "gpt-4-turbo-vision"},
    )
    print(
        client.generate_text(
            system_persona="You are a helpful assistant",
            prompt="What is (a+b)^2, ask followup question after main answer.",
            functions=[
                {
                    "name": "chat_with_user",
                    "description": "chat with user with multiple messages.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "messages": {
                                "type": "array",
                                "description": "List of messages.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "content": {
                                            "type": "string",
                                            "description": "Content of the message.",
                                        },
                                    },
                                    "required": ["content"],
                                },
                            }
                        },
                        "required": ["location"],
                    },
                },
                {
                    "name": "followup_questions",
                    "description": "chat with user with multiple followup messages.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "messages": {
                                "type": "array",
                                "description": "List of messages.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "content": {
                                            "type": "string",
                                            "description": "Content of the message.",
                                        },
                                    },
                                    "required": ["content"],
                                },
                            }
                        },
                        "required": ["location"],
                    },
                }
            ],
        )
    )
