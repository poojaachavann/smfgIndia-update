from PIL import Image
# @retry_async(delay=2.17, backoff=2)
import asyncio
import logging
from ..ai_clients import AzureOpenAIVisionModel
from ..tools.azure_hub_vision import azure_image_parser
from ..ai_clients.google_vision import GeminiAIModel
from ..ai_clients.azure_openai import AzureOpenAIModel
from .utils.retry_utils import retry_async
from ..ai_clients.literals import Response, Usage, Pricing
from ..tools import azure_bank_statement_extraction

# try:
#     from .ai_clients_v2.azure_openai_vision import AzureOpenAIVisionModel
#     from .ai_clients_v2.azure_hub_vision import azure_image_parser
#     from .ai_clients_v2.google_vision import GeminiAIModel
#     from .ai_clients_v2.azure_openai import AzureOpenAIModel
#     from .utils.retry_utils import retry_async
#     from .ai_clients_v2.literals import Response, Usage, Pricing
# except:
#     from ai_clients_v2.azure_openai_vision import AzureOpenAIVisionModel
#     from ai_clients_v2.azure_hub_vision import azure_image_parser
#     from ai_clients_v2.google_vision import GeminiAIModel
#     from ai_clients_v2.azure_openai import AzureOpenAIModel
#     from utils.retry_utils import retry_async
#     from ai_clients_v2.literals import Response, Usage, Pricing

from google.genai import types

# from ...services.ai_clients.google_vision2 import GeminiAIModel
import os
from pydantic import BaseModel
import re

azure_api_key = os.getenv("API_Key")
azure_endpoint = os.getenv("End_point")
azure_api_version = os.getenv("API_version")

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

client_vision = AzureOpenAIVisionModel(
    azure_api_key=azure_api_key,
    azure_endpoint=azure_endpoint,
    azure_api_version=azure_api_version,
    engine="gpt-4-turbo-vision",
    parameters={
        # "temperature": 0.1,
        # "max_tokens": 4000,
        # "top_p": 0.95,
        # "seed": 42,
        # "top_k": 40,
    },
    async_client=True,
)


class ExtractionConfig(BaseModel):
    provider: str = "azure"
    model: str = "azure_vision"
    system_persona: str = ''
    prompt_persona: str = ''


class Hallucination(Exception):
    pass


def response_validator(response: str) -> bool:
    resp = re.search(r"\n{15,}", response)
    if resp:
        raise Hallucination("Response contains multiple \n\n\n together.")
    return True


google_client = GeminiAIModel()


@retry_async(delay=3, backoff=2.17, retries=5)
async def extract_text_from_image(
    image_path: str = None,
    extraction_config: ExtractionConfig = None,
) -> Response:
    print("Extracting text from image, Path:",image_path)
    prompt_persona = "Extract the following information from the bank statement image, Please Ensure You dont just give output of \n\n in responses"
    if (
        extraction_config.system_persona is None
        or extraction_config.system_persona == ""
    ):
        system_persona = """'''**Task:**  
# Restructure transaction data from a bank statement (image/PDF) into a **CSV-formatted table** with standardized fields, account information, and transaction tagging.  

# ---

# ### **Key Requirements**  
# 1. **Extract Transactions Only**: Ignore headers, summaries, footers, and promotions.  
# 2. **Account Information** (if directly available):  
#    - **Holder Name**  
#    - **Account Number**  
#    - If missing, use Not Present.  
# 3. **Output Structure**:  
#    - A text block with account details.  
#    - A CSV-formatted transaction table separated by [$SEP].  

# ---

# ### **Fields & Rules**  
# | Field         | Rules                                                                                                                                                                                                 |
# |---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
# | **Date**      | Format as DD Mon YY (e.g., 05 Nov 23).                                                                                                                             |
# | **Type**      | Derive **Credit**/**Debit** using Balance Before (BB) and Balance After (BA):<br>- **Credit** if BA > BB<br>- **Debit** if BA < BB<br>- Leave blank if BB/BA missing or ambiguous.                  |
# | **Description** | Clean text: Remove IDs, branch codes, and redundant details.<br>- Example: UPI/024421993618/YASWANT SINGH → UPI/YASWANT SINGH<br>- Example: INTERNET TRANSFER 401228 → INTERNET TRANSFER.  |
# | **Amount**    | Positive value, two decimals. Strip currency symbols (₹, $) and commas (e.g., ₹1,000.50 → 1000.50).                                                                 |
# | **Balance**   | Post-transaction balance (two decimals). Preserve negative signs (e.g., (500.00) → -500.00).                                                                       |
# | **Tags**      | Assign tags from predefined lists (see below) based on **Description** and **Type**. Use Miscellaneous Expense (Debit) or Other Income (Credit) if no match. Enclose multiple tags in quotes (e.g., "Tag1, Tag2"). |  

# ---

# ### **Predefined Tags**  
# **Income**  
# Salary, Bonus / Incentive, Business Income, Interest Income, Dividend Income, Rent Received, Refund / Reversal, Investment Proceeds  

# **Expense**  
# EMI / Loan Repayment, Credit Card Payment, Rent Payment, Utilities, Groceries, Shopping, Fuel, Healthcare / Pharmacy, Insurance Premium, Tax Payment, Education / Tuition, Travel / Transport, Entertainment / Dining Out, Subscription, Fees & Charges, Penalty / Overdraft Fee  

# **Transfers & Cash**  
# Internal Transfer, External Transfer, P2P Transfer, Cash Deposit, Cash Withdrawal  

# **Cheque & Misc**  
# Cheque Issued, Cheque Deposit, Cheque Bounce, Miscellaneous Expense, Other Income  

# ---

# ### **Output Format**  
# 
text  
# Account Information:  
#     Holder Name: [Name / Not Present]  
#     Holder Account Number: [Number / Not Present]  
#     Opening Balance: [Amount / N/A]  
#     Closing Balance: [Amount / N/A]  
# [$SEP]  
# Date,Type,Description,Amount,Balance,Tags  
# 26 Oct 15,Credit,SAVINGS APPLETON J,100.00,6308.15,Interest Income  
# 08 Nov 15,Credit,NET INTEREST,0.31,6308.46,"Interest Income, Other Income"  
#
  

# #### **CSV Rules**  
# - Use N/A for missing fields.  
# - **Tags**:  
#   - Single tag → Tag  
#   - Multiple tags → "Tag1, Tag2"  
# - Exclude non-transaction rows (e.g., "Balance Brought Forward").  
# - If a page has no transactions, output:  
#   
text  
#   Unrelevant Information Present in this page  
#
  

# ---

# ### **OCR & Balance Handling**  
# 1. **OCR Errors**:  
#    - Replace O with 0 in numeric strings (e.g., 1O00.00 → 1000.00).  
#    - Normalize decimal/thousands separators (e.g., 1.000,00 → 1000.00).  
# 2. **Negative Balances**:  
#    - Parentheses (500.00) → -500.00.  
#    - Leading - → Retain (e.g., -123.45).  

# ---

# ### **Examples**  
# **Input (OCR Text):**  
# 
# Account Holder: JOHN DOE | Acc No: 123456789  
# Balance Brought Forward: ₹10,000.00  
# 05 Nov 23 | UPI/9823612345/PAYTM | Balance After: 12,000.00  
# 10 Nov 23 | ATM WDL/4567 | Balance After: 9,500.00  
#
  

# **Output:**  
# 
text  
# Account Information:  
#     Holder Name: JOHN DOE  
#     Holder Account Number: 123456789  
#     Opening Balance: 10000.00  
#     Closing Balance: N/A  
# [$SEP]  
# Date,Type,Description,Amount,Balance,Tags  
# 05 Nov 23,Credit,UPI/PAYTM,2000.00,12000.00,P2P Transfer  
# 10 Nov 23,Debit,ATM WDL,2500.00,9500.00,Cash Withdrawal  
#

#  '''"""
    
    
    else:
        system_persona = extraction_config.system_persona
    if (
        extraction_config.prompt_persona is not None
        and extraction_config.prompt_persona != ""
    ):
        prompt_persona = extraction_config.prompt_persona
    provider = extraction_config.provider

    logging.info("\n Extracting text from image, Path: {} \n".format(image_path))
    if provider == "azure":
        if extraction_config.model == "azure_openai_vision":
            client_vision = AzureOpenAIVisionModel(
                azure_api_key=azure_api_key,
                azure_endpoint=azure_endpoint,
                azure_api_version=azure_api_version,
                engine="gpt-4o",
                parameters={
                    "temperature": 0.1,
                    "max_tokens": 8000,
                    "top_p": 0.95,
                    "seed": 42,
                    # "top_k": 40,
                },
                async_client=False,
            )
            
            print("Using Azure OpenAI Vision Model")
            # print("inputs", prompt_persona, system_persona, image_path,response_schema)
            response_and_usage = client_vision.extract_text(
                prompt_persona=prompt_persona,
                system_persona=system_persona,
                image_path=image_path,
                functions=response_schema,
                function_call={"name": "text_extraction"},
                
            )

        elif extraction_config.model == "azure-hub-vision":
            response_and_usage = azure_image_parser(image_path=image_path)
            return response_and_usage
        elif extraction_config.model == "ai-document-intelligence":

            client = await azure_bank_statement_extraction.get_document_client()
            with Image.open(image_path) as img:
                compressed = await (
                      azure_bank_statement_extraction.compress_image_to_target_size(img)
                )
                response_and_usage = (
                    await azure_bank_statement_extraction.analyze_image(
                        compressed, client
                    )
                )
            return response_and_usage

    elif provider == "google":
        generation_content_config = types.GenerateContentConfig(
            temperature=0.0,
            top_p=0.95,
            top_k=100,
            max_output_tokens=8192,
            response_mime_type="text/plain",
            system_instruction=system_persona,
            seed=42,
        )
        # print("Image Path:",image_path)
        response_and_usage = next(
            google_client.generate(
                model="gemini-1.5-flash",
                prompt=prompt_persona,
                generate_content_config=generation_content_config,
                files=[image_path],
            )
        )
        # Raise Exception if respnse_and_usage.response consist multiple \n\n\n together.

        response_validator(response_and_usage.response)

    return response_and_usage


async def extract_text_from_images(
    image_paths: list[str] = None, extraction_config: ExtractionConfig = None
) -> list[Response]:
    tasks = [
        extract_text_from_image(
            image_path=image_path, extraction_config=extraction_config
        )
        for image_path in image_paths
    ]
    return await asyncio.gather(*tasks)


if __name__ == "__main__":
    # google.genai.errors.ServerError

    results = asyncio.run(
        extract_text_from_image(
            r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\data\8134139_Abu_page_2.png",
            extraction_config=ExtractionConfig(
                provider="azure",
                model="ai-document-intelligence",
                system_persona="",
                prompt_persona="",
            ),
        )
    )
    print('Results',results)
    
