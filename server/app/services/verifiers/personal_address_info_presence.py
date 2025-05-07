import json
from typing import Dict, List, Literal, Optional
from pydantic import BaseModel, Field, ValidationError
from enum import Enum
from ..ai_clients.literals import Response, Usage, Pricing
from ..ai_clients.azure_openai import AzureOpenAIModel
from dotenv import load_dotenv
import os
import logging as logger

client = AzureOpenAIModel(
    azure_api_key=os.getenv("API_Key"),
    azure_endpoint=os.getenv("End_point"),
    azure_api_version=os.getenv("API_version"),
    parameters={"temperature": 0.1, "model": "gpt-4o"},
)


# ========== Unified Data Models ==========
class DocumentType(str, Enum):
    BANK_STATEMENT = "bank_statement"
    DRIVING_LICENCE = "driving_licence"
    NATIONAL_ID = "national_id"
    PASSPORT = "passport"
    UTILITY_BILL = "utility_bill"
    CREDIT_REPORT = "credit_report"
    ID_PROOF = "id_proof"
    ADHAAR_CARD = "adhaar_card"


class ComponentType(str, Enum):
    # ===== Core Identification =====
    FULL_NAME = "full_name"
    DATE_OF_BIRTH = "date_of_birth"
    GENDER = "gender"
    NATIONALITY = "nationality"
    PHOTOGRAPH = "photograph"
    SIGNATURE = "signature"
    BIOMETRIC_DATA = "biometric_data"

    # ===== Government Identifiers =====
    SOCIAL_SECURITY_NUM = "social_security_num"
    PASSPORT_NUM = "passport_num"
    DRIVING_LICENSE_NUM = "driving_license_num"
    NATIONAL_ID_NUM = "national_id_num"
    TAX_ID_NUM = "tax_id_num"
    AADHAAR_NUM = "aadhaar_num"
    PAN_NUM = "pan_num"
    VISA_NUM = "visa_num"

    # ===== Address Components =====
    FULL_ADDRESS = "full_address"
    STREET_ADDRESS = "street_address"
    CITY_DISTRICT = "city_district"
    STATE_PROVINCE = "state_province"
    POSTAL_CODE = "postal_code"
    COUNTRY = "country"
    PO_BOX = "po_box"

    # ===== Contact Information =====
    PHONE_NUMBER = "phone_number"
    EMAIL_ADDRESS = "email_address"

    # ===== Document Metadata =====
    DOCUMENT_NUM = "document_num"
    ISSUE_DATE = "issue_date"
    EXPIRY_DATE = "expiry_date"
    ISSUING_AUTHORITY = "issuing_authority"
    DOCUMENT_CATEGORY = "document_category"

    # ===== Financial Components =====
    ACCOUNT_NUM = "account_num"
    ROUTING_NUM = "routing_num"
    IBAN_CODE = "iban_code"
    SWIFT_CODE = "swift_code"
    CREDIT_SCORE = "credit_score"

    # ===== Specialized Fields =====
    VEHICLE_REG_NUM = "vehicle_reg_num"
    EMPLOYER_INFO = "employer_info"
    OCCUPATION = "occupation"
    MARITAL_STATUS = "marital_status"
    RESIDENT_STATUS = "resident_status"


class ComponentValidation(BaseModel):
    component: ComponentType
    present: bool
    confidence: float = Field(ge=0, le=1)
    extracted_value: Optional[str] = Field(None, max_length=100)
    validation_rules: List[str] = Field(default_factory=list)


class ValidationResult(BaseModel):
    document_type: DocumentType
    overall_status: Literal["valid", "invalid", "needs_review"]
    address_status: Literal["present", "not_present", "partial"]
    personal_info_status: Literal["present", "not_present", "partial"]
    components: List[ComponentValidation]
    validation_rules_applied: List[str]
    overall_confidence: float = Field(ge=0, le=1)


# ========== Unified Validation Schema ==========

response_schema_combined = [
    {
        "name": "validate_document",
        "description": "Combined validation of address and personal information in documents",
        "parameters": {
            "type": "object",
            "properties": {
                # "overall_status": {
                #     "type": "string",
                #     "enum": ["valid", "invalid", "needs_review"],
                # },
                "address_status": {
                    "type": "string",
                    "enum": ["present", "not_present", "partial"],
                },
                "personal_info_status": {
                    "type": "string",
                    "enum": ["present", "not_present", "partial"],
                },
                "components": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "component": {
                                "type": "string",
                                "enum": [c.value for c in ComponentType],
                            },
                            "present": {"type": "boolean"},
                            "confidence": {"type": "number"},
                            "value": {"type": ["string", "null"]},
                            # "validation_rules": {
                            #     "type": "array",
                            #     "items": {"type": "string"},
                            # },
                        },
                        "required": ["component", "present", "confidence"],
                    },
                },
                # "validation_rules": {"type": "array", "items": {"type": "string"}},
                "overall_confidence": {"type": "number"},
            },
            "required": [
                "overall_status",
                "address_status",
                "personal_info_status",
                "components",
            ],
        },
    }
]


# ========== Unified Validation Function ==========
def validate_document(
    text: str,
    document_type: DocumentType,
) -> Dict:
    """
    Unified validator for documents containing address and/or personal information
    """
    # Input validation
    if not text.strip():
        raise ValueError("Document text cannot be empty")
    document_type = DocumentType(document_type)

    # Document requirements mapping
    # DOCUMENT_REQUIREMENTS = {
    #     DocumentType.BANK_STATEMENT: {
    #         "address": [ComponentType.FULL_ADDRESS, ComponentType.CITY],
    #         "personal_info": [ComponentType.FULL_NAME],
    #     },
    #     DocumentType.DRIVING_LICENCE: {
    #         "address": [ComponentType.STREET, ComponentType.CITY],
    #         "personal_info": [
    #             ComponentType.FULL_NAME,
    #             ComponentType.DOB,
    #             ComponentType.GOVERNMENT_ID,
    #         ],
    #     },
    #     DocumentType.PASSPORT: {
    #         "personal_info": [
    #             ComponentType.FULL_NAME,
    #             ComponentType.NATIONALITY,
    #             ComponentType.GOVERNMENT_ID,
    #             ComponentType.PHOTOGRAPH,
    #         ]
    #     },

    # }

    # System instructions
    system_persona = f"""Document validation expert. Perform:
1. Identify document type: {document_type.value}
3. Validate both address and personal info elements
4. Apply format validation for IDs, dates, codes
5. Return separate statuses for address and personal info
6. Calculate overall confidence score

For Bank Statement include only:
- Name, Area/City/Village/Town/District, State, Pincode

For ID Proof include only:
- Name, Area/City/Village/Town/District, State, Pincode, DOB, ID Number, Expiry Date, Issue Date, Nationality, Gender, Photograph

Critical Validation Rules:
- List each component type ONLY ONCE, even if multiple instances exist
- Combine values for repeated components into single entry
- Use highest confidence score from duplicates
- Include ALL unique values separated by semicolons
- Strictly exclude any redundant components

Confidence Guidelines:
< 0.85: Low confidence - flag for review
0.85-0.95: Moderate confidence - recommend verification
≥ 0.95: High confidence - likely accurate

Final Output Must:
- Contain only document-type relevant components 
- Maintain unique component entries
- Aggregate multiple values intelligently
- Preserve most accurate information

Components:
    # ===== Core Identification =====
    FULL_NAME = "full_name"
    DATE_OF_BIRTH = "date_of_birth"
    GENDER = "gender"
    NATIONALITY = "nationality"
    PHOTOGRAPH = "photograph"
    SIGNATURE = "signature"
    BIOMETRIC_DATA = "biometric_data"
    
    # ===== Government Identifiers =====
    SOCIAL_SECURITY_NUM = "social_security_num"
    PASSPORT_NUM = "passport_num"
    DRIVING_LICENSE_NUM = "driving_license_num"
    NATIONAL_ID_NUM = "national_id_num"
    TAX_ID_NUM = "tax_id_num"
    AADHAAR_NUM = "aadhaar_num"
    PAN_NUM = "pan_num"
    VISA_NUM = "visa_num"
    
    # ===== Address Components =====
    FULL_ADDRESS = "full_address"
    STREET_ADDRESS = "street_address"
    CITY_DISTRICT = "city_district"
    STATE_PROVINCE = "state_province"
    POSTAL_CODE = "postal_code"
    COUNTRY = "country"
    PO_BOX = "po_box"
    
    # ===== Contact Information =====
    PHONE_NUMBER = "phone_number"
    EMAIL_ADDRESS = "email_address"
    
    # ===== Document Metadata =====
    DOCUMENT_NUM = "document_num"
    ISSUE_DATE = "issue_date"
    EXPIRY_DATE = "expiry_date"
    ISSUING_AUTHORITY = "issuing_authority"
    DOCUMENT_CATEGORY = "document_category"
    
    # ===== Financial Components =====
    ACCOUNT_NUM = "account_num"
    ROUTING_NUM = "routing_num"
    IBAN_CODE = "iban_code"
    SWIFT_CODE = "swift_code"
    CREDIT_SCORE = "credit_score"
    
    # ===== Specialized Fields =====
    VEHICLE_REG_NUM = "vehicle_reg_num"
    EMPLOYER_INFO = "employer_info"
    OCCUPATION = "occupation"
    MARITAL_STATUS = "marital_status"
    RESIDENT_STATUS = "resident_status"

"""



    prompt = f"""
    Document Type: {document_type.value.replace("_", " ").title()}
    
    Content: {text}  # Truncate for model context limits
    """

    # try:
    response = client.generate_text(
        system_persona=system_persona,
        prompt=prompt,
        functions=response_schema_combined,
        function_call={"name": "validate_document"},
    )

    # Post-processing
    response = json.loads(response.model_dump()["response"])
    response["document_type"] = document_type.value
    response["overall_confidence"] = calculate_overall_confidence(
        response["components"]
    )

    reason = {}
    if response["overall_confidence"] < 0.85:
        reason = {
            "info": "Please review and verify. Information might be missing or inaccurate.",
            "level": "error",
        }
    elif response["overall_confidence"] < 0.95:
        reason = {
            "info": "Please review and verify. Information might be partially missing or inaccurate.",
            "level": "warning",
        }
    else:
        reason = {"info": "Information is likely accurate.", "level": "success"}
    response["reason"] = reason
    return response

    # except ValidationError as e:
    #     logger.error(f"Validation error: {str(e)}")
    #     return {"error": "Invalid response structure", "details": str(e)}
    # except Exception as e:
    #     logger.error(f"API Error: {str(e)}")
    #     return {"error": "Validation failed", "details": str(e)}


def calculate_overall_confidence(components: List[Dict]) -> float:
    """Calculate weighted confidence score"""
    if not components:
        return 0.0

    total = sum(c["confidence"] for c in components)
    return total/len(components)


# ========== Example Usage ==========
if __name__ == "__main__":
    dl_text = """
    INDIAN DRIVING LICENCE
    Name: Ravi Shankar
    DOB: 1990-05-15
    Address: 12 Gandhi Road, Mumbai
    DL No: MH-1419900515123
    Valid Until: 2030-05-15
    """

    result = validate_document(
        text=dl_text, document_type=DocumentType.DRIVING_LICENCE, country_code="IN"
    )

    print(result)
