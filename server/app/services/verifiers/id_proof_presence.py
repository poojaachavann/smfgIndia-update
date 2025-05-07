# from typing import Dict, List, Literal
# from pydantic import BaseModel, Field, ValidationError
# from enum import Enum
# import logging as logger
# # ========== Data Models ==========
# class PersonalInfoComponent(str, Enum):
#     FULL_NAME = "full_name"
#     DOB = "date_of_birth"
#     GOVERNMENT_ID = "government_id"
#     PHOTO = "photograph"
#     SIGNATURE = "signature"
#     NATIONALITY = "nationality"
#     GENDER = "gender"
#     ISSUE_DATE = "issue_date"
#     EXPIRY_DATE = "expiry_date"

# class DocumentType(str, Enum):
#     DRIVING_LICENCE = "driving_licence"
#     NATIONAL_ID = "national_id"
#     PASSPORT = "passport"
#     VOTER_ID = "voter_id"
#     PAN_CARD = "pan_card"

# class ComponentValidation(BaseModel):
#     component: PersonalInfoComponent
#     present: bool
#     confidence: float = Field(ge=0, le=1)
#     extracted_value: str = Field(default="", max_length=100)

# class PersonalInfoValidationResult(BaseModel):
#     status: Literal["present", "not_present", "ambiguous"]
#     components: List[ComponentValidation]
#     document_type: DocumentType
#     validation_rules_applied: List[str]

# # ========== Validation Schema ==========
# response_schema_personal_info = [
#     {
#         "name": "validate_personal_info",
#         "description": "Validate personal information in government-issued documents",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "status": {
#                     "type": "string",
#                     "enum": ["present", "not_present", "ambiguous"],
#                     "description": "Overall validation status based on document requirements"
#                 },
#                 "components": {
#                     "type": "array",
#                     "items": {
#                         "type": "object",
#                         "properties": {
#                             "component": {
#                                 "type": "string",
#                                 "enum": [c.value for c in PersonalInfoComponent]
#                             },
#                             "present": {"type": "boolean"},
#                             "confidence": {"type": "number"},
#                             "value": {"type": "string"}
#                         },
#                         "required": ["component", "present", "confidence"]
#                     }
#                 },
#                 "validation_rules": {
#                     "type": "array",
#                     "items": {"type": "string"},
#                     "description": "List of validation rules applied"
#                 }
#             },
#             "required": ["status", "components", "validation_rules"]
#         }
#     }
# ]

# # ========== Validation Function ==========
# def validate_personal_info(
#     text: str,
#     document_type: DocumentType,
#     country_code: str = "IN"
# ) -> Dict:
#     """
#     Validates personal information in government-issued documents
#     Args:
#         text: Extracted text from document
#         document_type: Type of document being validated
#         country_code: ISO country code for region-specific rules
#     Returns:
#         Validation result with component-level details
#     """
#     # Input validation
#     if not text.strip():
#         raise ValueError("Document text cannot be empty")
    
#     # Document-specific requirements
#     DOCUMENT_REQUIREMENTS = {
#         DocumentType.DRIVING_LICENCE: [
#             PersonalInfoComponent.FULL_NAME,
#             PersonalInfoComponent.DOB,
#             PersonalInfoComponent.GOVERNMENT_ID,
#             PersonalInfoComponent.EXPIRY_DATE
#         ],
#         DocumentType.PASSPORT: [
#             PersonalInfoComponent.FULL_NAME,
#             PersonalInfoComponent.NATIONALITY,
#             PersonalInfoComponent.PHOTO,
#             PersonalInfoComponent.GOVERNMENT_ID
#         ]
#     }

#     # System instructions
#     system_persona = f"""You are a document validation specialist. Perform these steps:
#     1. Identify document type: {document_type.value.replace('_', ' ').title()}
#     2. Check for required components based on {country_code} regulations
#     3. Validate format for each component:
#        - Government IDs: Validate pattern matching
#        - Dates: Check DD/MM/YYYY or ISO format
#        - Photograph: Check for photo indicators
#     4. Apply region-specific validation rules
#     5. Return confidence scores for each component
#     """

#     prompt = f"""
#     Document Type: {document_type.value.replace('_', ' ').title()}
#     Country Code: {country_code}
#     Extracted Text: {text[:3000]}
#     """

#     try:
#         response = client.generate_text(
#             system_persona=system_persona,
#             prompt=prompt,
#             functions=response_schema_personal_info,
#             function_call={"name": "validate_personal_info"}
#         )

#         # Add document type to response
#         response["document_type"] = document_type.value

#         # Validate response structure
#         validated = PersonalInfoValidationResult.parse_obj(response)
#         return validated.dict()

#     except ValidationError as e:
#         logger.error(f"Validation error: {str(e)}")
#         return {"error": "Invalid response structure", "details": str(e)}
#     except Exception as e:
#         logger.error(f"API Error: {str(e)}")
#         return {"error": "Validation failed", "details": str(e)}

# # ========== Example Usage ==========
# if __name__ == "__main__":
#     sample_text = """
#     INDIAN DRIVING LICENCE
#     Name: Rajesh Kumar
#     DOB: 15/08/1985
#     DL No: DL-0420110151766
#     Valid Until: 15/08/2030
#     """

#     result = validate_personal_info(
#         text=sample_text,
#         document_type=DocumentType.DRIVING_LICENCE,
#         country_code="IN"
#     )

#     print(result)