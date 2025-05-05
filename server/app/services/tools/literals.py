from typing import Dict, List, Optional, Any
from pydantic import BaseModel

    


class Tool(BaseModel):
    name: str
    description: str
    parameters: dict
    return_type: str

class ToolResponse(BaseModel):
    tool_name: str
    tool_input: str
    tool_output: str

class ToolUsage(BaseModel):
    tool_name: str
    tool_input: str
    tool_output: str
    tool_cost: float
    tool_tokens: int
    tool_time: float 



class Pricing(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    input_cost: float
    output_cost: float
    total_cost: float

class Usage(BaseModel):
    model: str
    provider: str
    pricing: Pricing
    
class Response(BaseModel):
    response: dict
    usage: Optional[Usage] = None
    
class TokenUsage(BaseModel):
    model: str
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int

