import asyncio
import logging
from ..ai_clients.azure_openai_vision import AzureOpenAIVisionModel
from ..ai_clients.azure_openai import AzureOpenAIModel
from google.genai import types
from ..ai_clients.google_vision import GeminiAIModel

# from ...servicesai_clients_v2.google_vision2 import GeminiAIModel
import os
from .utils.read_write import *
from .utils.retry_utils import *

from ..ai_clients.literals import Response, Usage, Pricing
from pydantic import BaseModel
from typing import List, Dict, Optional, Any, Union

azure_api_key = os.getenv("API_Key")
azure_endpoint = os.getenv("End_point")
azure_api_version = os.getenv("API_version")


class ParsingConfig(BaseModel):
    provider: str = "azure"
    model: str = "azure_vision"
    system_persona: str = ''
    prompt_persona: str = ''


client_vision = AzureOpenAIModel(
    azure_api_key=azure_api_key,
    azure_endpoint=azure_endpoint,
    azure_api_version=azure_api_version,
    parameters={
        "temperature": 0.1,
        "model": "gpt-4o",
        "max_tokens": 4000,
        "top_p": 0.95,
        "seed": 42,
        # "top_k": 40,
    },
    async_client=True,
)

# response schema consist dict one key is text output and other is extractin confidence
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
        },
    }
]

google_client = GeminiAIModel()


@retry_async(delay=3, backoff=2.17, retries=5)
async def parse_statement_page(
    page: str = None,
    parsing_config: ParsingConfig = None,
) -> Response:
    print("parsing text from image, Path:")
    prompt_persona = f"Restructure and Fromat the following Text from the bank statement page Extracted through OCR, ```{page}```"
    # if task == 'structure':
    if parsing_config.system_persona is None or parsing_config.system_persona == "":
        system_persona = """    
        **Task:** Re-Structure transaction data from a bank statement (image/PDF) and output a structured Markdown table.  

        **Focus:**  
        - **Transactions only** (ignore summaries, headers, footers, promotions).  
        - **Account info** (if available): Holder Name, Account Number. Please Do not consider Holder Name and Account Number from Transactions Description. Take it if it is directly given in the statement. if not present in the statement then write it as `Not Present`.

        **Required Fields:**  
        | Field        | Rules |  
        |--------------|-------|  
        | **Date**     | DD Mon YY (or similar; standardize variations). |  
        | **Type**     | **Debit/Credit logic for classification of transactions:**  
        1. **If "Balance Before" (BB) and "Balance After" (BA) are provided:**  
            - If BA  is greater than BB then it is **Credit** (↑ balance).  
            - If BA is less than BB then it is **Debit** (↓ balance).  
        
            **Type Constraint:** Do not infer transaction type from `Descriptions`. Only use the rules above because descriptions can be misleading. e.g. 
            | 24 Sep 15| Credit | SAVINGS xxxxx J| 100.00  | 5079.94  |
            | 06 Oct 15| Credit  | 401228 81249894 INTERNET TRANSFER| 1200.00  | 6279.94  |
            we can see by the description it is internet transfer (seems debit) but it is credit transaction by the new balance and rule specified above. 
            
        3. **If ambiguous:** Leave blank. 
            | **Description** | Short, clean (e.g., "ATM WDL" instead of "ATM withdrawal at XYZ branch"). |  
            | **Amount**   | Positive amount value, 2 decimal places (ignore ₹/$/ etc. symbols). |  
            | **Balance**  | Positive/Negative, post-transaction balance (ignore "Balance Forward", "Carry Forward"). | 

        Note: Each and every transaction should be extracted from the image even if it is not clear. 
        

        
        
        
        **Output Format:**  
        ```markdown
        Account Information:  
            Holder Name: [Name]  
            Holder Account Number: [Number] 
            Opening Balance: [Opening Balance] 
            Closing Balance: [Closing Balance]  
        Address: [Address]
    | Date     | Type   | Description       | Amount  | Balance  |
    |----------|--------|-------------------|---------|----------|
    | 26 Oct 15| Credit | SAVINGS APPLETON J | 100.00  | 6308.15  |
    | 08 Nov 15| Credit | NET INTEREST       | 0.31    | 6308.46  |
    | [Date or N/A]| Credit/Debit or N/A | Description or N/A |   Amount or N/A  | Balance or N/A      |

N/A : Not Available
   
    **Constraints**  
        - Don't consider `Balance Brought Forward`, `Balance Carried forward` as Transactions So Not include it in the table. But Balance Carried Forward should be considered for Balance and consistency check. 
        - If any page Consist Unrelevant Information then just Output string "Unrelevant Information Present in this page".
        - When their is Missing Fields then write it as `N/A` in transaction (rows) table.
        - Dont mention confidence of extraction in output.
    """
    else:
        system_persona = parsing_config.system_persona
    provider = parsing_config.provider
    print('System Persona: ',system_persona[:10],'.........',system_persona[-10:])
    # Extraction Confidence is integer 0-9 higher the number higher the confidence vise versa.
    # -  0-3 if Quality of Image is low.
    # -  4-6 if Quality of Image is medium means errors are possible.
    # -  7-9 if Quality of Image is high.


    logging.info("\n Structuring text from image, Path:")
    
    if provider == "azure":
        response_and_usage = await client_vision.generate_text_async(
            prompt=prompt_persona,
            system_persona=system_persona,
            functions=response_schema,
            function_call="auto",
            # image_path=image_path
        )

    elif provider == "google":
        generation_content_config = types.GenerateContentConfig(
            temperature=0.05,
            top_p=0.95,
            top_k=40,
            max_output_tokens=8192,
            response_mime_type="application/json",
            system_instruction=system_persona,
            seed=42,
            tools=[types.Tool.from_function(function=response_schema[0])]
        )
        # print("Image Path:",image_path)
        response_and_usage = next(
            google_client.generate(
                model="gemini-1.5-flash",
                prompt=prompt_persona,
                generate_content_config=generation_content_config,
                # files=[image_path]
            )
        )
        # print(response_and_usage)
    return response_and_usage


async def parse_statement_pages(
    pages: list[str] = None, parsing_config: ParsingConfig = None
) -> list[Response]:
    tasks = [
        parse_statement_page(page=page, parsing_config=parsing_config) for page in pages
    ]
    return await asyncio.gather(*tasks)


# if __name__ == "__main__":

# google.genai.errors.ServerError
