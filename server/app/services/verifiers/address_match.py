from ..ai_clients.literals import Response, Usage, Pricing
from ..ai_clients.azure_openai import AzureOpenAIModel
from dotenv import load_dotenv
import os

load_dotenv()

client = AzureOpenAIModel(
    azure_api_key=os.getenv("API_Key"),
    azure_endpoint=os.getenv("End_point"),
    azure_api_version=os.getenv("API_version"),
    parameters={"temperature": 0.1, "model": "gpt-4o"},
)
functions = [
    {
        "name": "is_address_name_match_with",
        "description": "Verify if the provided address matches the bank's address.",
        "parameters": {
            "type": "object",
            "properties": {
                "matched_name": {
                    "type": "object",
                    "description": "Whether the name matches the bank's address.",
                    "properties": {
                        "comments": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "comment": {
                                        "type": "string",
                                        "description": "A comment on the address match."
                                    },
                                    "sentiment": {
                                        "type": "string",
                                        "enum": ["positive", "negative", "neutral"],
                                        "description": "The sentiment of the comment."
                                    }
                                },
                                "required": ["comment"]
                            },
                            "description": "Comments on the address match, these are going to be some keywords in few words."
                        }
                    },
                    "required": ["comments"]
                },
                "matched_address": {
                    "type": "object",
                    "description": "Whether the address matches the bank's address.",
                    "properties": {
                        "comments": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "comment": {
                                        "type": "string",
                                        "description": "A comment on the address match."
                                    },
                                    "sentiment": {
                                        "type": "string",
                                        "enum": ["positive", "negative", "neutral"],
                                        "description": "The sentiment of the comment."
                                    }
                                },
                                "required": ["comment"]
                            },
                            "description": "Comments on the address match, these are going to be some keywords in few words."
                        }
                    },
                    "required": ["comments"]
                },
                "credit_report": {
                    "type": "object",
                    "description": "Whether the other details matches the Credit Report.",
                    "properties": {
                        "comments": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "comment": {
                                        "type": "string",
                                        "description": "A comment on the  match."
                                    },
                                    "sentiment": {
                                        "type": "string",
                                        "enum": ["positive", "negative", "neutral"],
                                        "description": "The sentiment of the comment."
                                    }
                                },
                                "required": ["comment"]
                            },
                            "description": "Comments on the address match, these are going to be some keywords in few words."
                        }
                    },
                    "required": ["comments"]
                }
            },
            "required": ["matched_name", "matched_address"]
        }
    }
]

def is_address_name_match_with(bank_statement_info=None, id_proof_info=None, credit_report_info=None):
    system_persona = """You are a highly skilled address verification agent. Your primary goal is to verify if the provided address matches the bank's address. You will provide your output as a structured response. Extract only the matching status."""

    prompt = f"""Address in Bank Statement:  {bank_statement_info}
    Address in ID: {id_proof_info}  Info in Credit Report: {credit_report_info}"""

    response = client.generate_text(
        system_persona=system_persona,
        prompt=prompt,
        functions=functions,
        function_call={"name": "is_address_name_match_with"},
    )
    return response


# if __name__ == "__main__":
#     print('Response: ',
