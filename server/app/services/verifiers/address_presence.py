from ..ai_clients.literals import Response, Usage, Pricing
from ..ai_clients.azure_openai import AzureOpenAIModel
from dotenv import load_dotenv
import os

# load_dotenv()

client = AzureOpenAIModel(
    azure_api_key=os.getenv("API_Key"),
    azure_endpoint=os.getenv("End_point"),
    azure_api_version=os.getenv("API_version"),
    parameters={"temperature": 0.1, "model": "gpt-4o"},
)
# response_schema_function_address_presence = [
#     {
#         "name": "is_address_present",
#         "description": "Verify if the provided address is present in the bank statement.",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "status": {
#                     "type": "string",
#                     "enum": [
#                         "present",
#                         "not_present",
#                         "ambiguous",
#                     ],
#                     "description": "The status of the address presence.",
#                 },
#                 "comments": {
#                     "type": "array",
#                     "items": {
#                         "type": "object",
#                         "properties": {
#                             "comment": {
#                                 "type": "string",
#                                 "description": "A comment on the address presence.",
#                             },
#                             "sentiment": {
#                                 "type": "string",
#                                 "enum": ["positive", "negative", "neutral"],
#                                 "description": "The sentiment of the comment.",
#                             },
#                         },
#                         "required": ["comment"],
#                     },
#                     "description": "Comments on the address presence, these are going to be some keywords in few words.",
#                 },

#             },
#         },
#     }
# ]
# response_schema_function_personal_info_presence = [
#     {
#         "name": "is_personal_info_present",
#         "description": "Verify if the provided personal information is present in the bank statement.",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "status": {
#                     "type": "string",
#                     "enum": [
#                         "present",
#                         "not_present",
#                         "ambiguous",
#                     ],
#                     "description": "The status of the personal information presence.",
#                 }
#             },
#         },
#     }
# ]


# def is_address_present(
#     text="",
#     document_type="bank_statement|id_proof|credit_report",
# ):
#     system_persona = """You are a highly skilled address verification agent. Your primary goal is to verify if the provided address is present in the Document. You will provide your output as a structured response. Extract only the presence status.
    
#     Address going to contain:
#     - Name, Area/City/Village/Town/District, State,  Pincode
    
#     Give proper reason for your decision of 'status' in comments.
#     """
#     temp = {
#         "bank_statement": "Extraction is done from Bank Statement",
#         "id_proof": "Extraction is done from ID Proof",
#         "credit_report": "Extraction is done from Credit Report",
#     }

#     prompt = f"""Extracted Address: {text}\n {document_type.replace("_", " ").capitalize()}: {temp[document_type]}"""
#     print(prompt)

#     response = client.generate_text(
#         system_persona=system_persona,
#         prompt=prompt,
#         functions=response_schema_function_address_presence,
#         function_call={"name": "is_address_present"},
#     )
#     return response


from typing import Dict, List, Literal
from pydantic import BaseModel, Field, ValidationError
from enum import Enum
import logging as logger
# ... (keep previous imports)

# ========== Enhanced Data Models ==========
class AddressComponent(str, Enum):
    NAME = "name"
    AREA = "area"
    CITY = "city"
    STATE = "state"
    PINCODE = "pincode"

class ComponentValidation(BaseModel):
    component: AddressComponent
    present: bool
    found_value: str = Field(default="", max_length=100)

class AddressValidationResult(BaseModel):
    status: Literal["present", "not_present", "ambiguous"]
    valid_components: List[ComponentValidation]
    missing_components: List[AddressComponent]
    confidence: float = Field(ge=0, le=1)
    document_type: Literal["bank_statement", "id_proof", "credit_report"]

# ========== Enhanced Validation Schema ==========
response_schema_function_address_presence = [
    {
        "name": "is_address_present",
        "description": "Verify address presence with component-level validation",
        "parameters": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "string",
                    "enum": ["present", "not_present", "ambiguous"],
                    "description": "Overall validation status based on component checks",
                },
                "components": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "component": {
                                "type": "string",
                                "enum": [c.value for c in AddressComponent],
                            },
                            "present": {"type": "boolean"},
                            "value": {"type": "string"},
                        },
                        "required": ["component", "present"],
                    },
                },
                "confidence": {
                    "type": "number",
                    "description": "Validation confidence score between 0-1",
                },
            },
            "required": ["status", "components", "confidence"],
        },
    }
]

# ========== Enhanced Validation Function ==========
def is_address_present(
    text: str,
    document_type: Literal["bank_statement", "id_proof", "credit_report"],
) -> Dict:
    """
    Validates address presence with component-level checks
    Returns:
        - status: Overall validation status
        - components: Detailed validation per address part
        - confidence: Validation confidence score
    """
    
    # Input validation
    if not text.strip():
        raise ValueError("Text cannot be empty")
    
    if document_type not in ["bank_statement", "id_proof", "credit_report"]:
        raise ValueError("Invalid document type")

    # Enhanced system instructions
    system_persona = """You are an address validation specialist. Perform these steps:
    1. Analyze the text for address components:
       - Name (personal/organization)
       - Area/City/Village/Town/District
       - State
       - Pincode (6 digits)
    2. For each component:
       - Verify presence
       - Extract value
       - Note partial matches
    3. Determine overall status:
       - present: All components found
       - ambiguous: 1-2 components missing
       - not_present: >2 components missing
    4. Assign confidence score (0-1) based on match quality
    """

    # Contextual prompt based on document type
    doc_context = {
        "bank_statement": "Typically contains name and mailing address",
        "id_proof": "Requires complete address with pincode",
        "credit_report": "May contain multiple historical addresses",
    }.get(document_type, "")

    prompt = f"""
    Document Type: {document_type.replace('_', ' ').title()}
    Context: {doc_context}
    Text Content: {text}  # Limit input size
    """

    # try:
    response : Response = client.generate_text(
        system_persona=system_persona,
        prompt=prompt,
        functions=response_schema_function_address_presence,
        function_call={"name": "is_address_present"},
    )
    # print(response)
    # import json
    # # Validate AI response structure
    # validated = AddressValidationResult.parse_obj({
    #     **json.loads(response.model_dump()['response']),
    #     "document_type": document_type
    # })
    
    return response
        
    # except ValidationError as e:
    #     logger.error(f"Validation error: {e}")
    #     return {"error": "Invalid response structure", "details": str(e)}
    # except Exception as e:
    #     logger.error(f"API Error: {e}")
    #     return {"error": "Validation failed", "details": str(e)}