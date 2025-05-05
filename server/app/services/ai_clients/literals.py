
from typing import Dict, List, Optional, Any,Union
from pydantic import BaseModel

    

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
    response: Union[str,dict]
    usage: Optional[Usage] = None
    
class TokenUsage(BaseModel):
    model: Optional[str]
    
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
