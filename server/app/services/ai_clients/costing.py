import requests
import logging as logger
from typing import Any, Dict, List, Optional, Union
import os
import json
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict
try:
    from .literals import Usage, TokenUsage, Pricing
except:
    from literals import Usage, TokenUsage, Pricing
# from .literals import Usage, TokenUsage, Pricing
from rich import print

class PricingCalculator:
    _pricing = None
    def __init__(self,costing_json_path: Optional[str] = None):
        self._pricing = self._get_pricing(costing_json_path)
        
    def _get_pricing(self,costing_json_path: Optional[str] = None) -> Pricing:
        if self._pricing is None:             # if pricing is not already loaded, load it from file or URL
            try:
                if (costing_json_path is not None) and (os.path.exists(costing_json_path)):  # if costing_json_path is provided and file exists, load pricing from file
                    with open(costing_json_path) as f:
                        self._pricing = json.load(f)
                        pricing = self._pricing
                else:  # otherwise, load pricing from URL
                    pricing_url = "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json"
                    logger.info(f"Loading pricing from {pricing_url}")

                    response = requests.get(pricing_url)
                    response.raise_for_status()
                    pricing = response.json()

            except Exception as e:
                logger.error(f"Failed to load pricing data: {str(e)}")
                print('Error: ',e)
                return None
        return pricing
    def get_pricing(self, token_usage: TokenUsage = None) -> Pricing:
            
        try:
            details = self._pricing[token_usage.model]
            # print('Details: ',details)
        except KeyError:
            logger.warning(f"Pricing details not found for {token_usage.model}")
            return None

    # Calculate costs
        input_cost = details["input_cost_per_token"] * token_usage.prompt_tokens  # 
        
        output_cost = (
            details["output_cost_per_token"] * token_usage.completion_tokens
        )
        
    # 
        return Pricing(
            prompt_tokens=token_usage.prompt_tokens,
            completion_tokens=token_usage.completion_tokens,
            total_tokens=token_usage.total_tokens,
            input_cost=input_cost,
            output_cost=output_cost,
            total_cost=input_cost + output_cost,
    )

        

# def get_pricing(
#     costing_json_path: Optional[str] = None,
#     # provider: str = "azure",
#     token_usage: TokenUsage = None,
# ) -> Optional[Dict[str, Any]]:
#     """Calculate pricing based on current response."""
#     # if self.response is None:
#     #     logger.warning("No response available to calculate pricing")
#     #     return None

#     # Load pricing data


#     # Get model details

#     # pricing_key = f"{provider}/{token_usage.model}"
#     model_name = token_usage.model
    
 
    # Calculate costs
# calculator =  CostCalculator()

class Costing(BaseModel):


    """ This class give functionality for drill down"""
    usages: List[Usage]
    
    def aggregate_costs(self) -> Dict:
        """Aggregates costs across all usages"""
        totals = defaultdict(float)
        models = set()
        providers = set()

        for usage in self.usages:
            pricing = usage.pricing
            totals['prompt_tokens'] += pricing.prompt_tokens
            totals['completion_tokens'] += pricing.completion_tokens
            totals['tokens'] += pricing.total_tokens
            totals['input_cost'] += pricing.input_cost
            totals['output_cost'] += pricing.output_cost
            totals['total_cost'] += pricing.total_cost
            models.add(usage.model)
            providers.add(usage.provider)

        return {
            "total_prompt_tokens": totals['prompt_tokens'],
            "total_completion_tokens": totals['completion_tokens'],
            "total_tokens": totals['tokens'],
            "total_input_cost": totals['input_cost'],
            "total_output_cost": totals['output_cost'],
            "total_cost": totals['total_cost'],
            "models": list(models),
            "providers": list(providers)
        }
    
    def merge_costing(self, other: 'Costing') -> 'Costing':
        """Merge two Costing instances into a new combined instance"""
        return Costing(usages=self.usages + other.usages)
    
    def model_usage_counts(self) -> Dict[str, int]:
        """Count how many times each model was used"""
        counts = defaultdict(int)
        for usage in self.usages:
            counts[usage.model] += 1
        return dict(counts)
    
    def model_cost_breakdown(self) -> Dict[str, Dict]:
        """Calculate cost and token usage per model"""
        breakdown = defaultdict(lambda: {
            'prompt_tokens': 0.0,
            'completion_tokens': 0.0,
            'total_tokens': 0.0,
            'input_cost': 0.0,
            'output_cost': 0.0,
            'total_cost': 0.0,
            'usage_count': 0
        })

        for usage in self.usages:
            model = usage.model
            pricing = usage.pricing
            
            breakdown[model]['prompt_tokens'] += pricing.prompt_tokens
            breakdown[model]['completion_tokens'] += pricing.completion_tokens
            breakdown[model]['total_tokens'] += pricing.total_tokens
            breakdown[model]['input_cost'] += pricing.input_cost
            breakdown[model]['output_cost'] += pricing.output_cost
            breakdown[model]['total_cost'] += pricing.total_cost
            breakdown[model]['usage_count'] += 1

        return {model: dict(values) for model, values in breakdown.items()}

    def model_frequency(self) -> Dict[str, float]:
        """Calculate relative frequency of model usage"""
        total = len(self.usages)
        counts = self.model_usage_counts()
        return {model: count / total for model, count in counts.items()}
if __name__ == "__main__":


    calculator = PricingCalculator()

    print('Gemini ', 'gemini-1.5-pro-002',calculator.get_pricing(token_usage=TokenUsage(**{'model': 'gemini-1.5-pro-002', 'prompt_tokens': 1000000, 'completion_tokens': 1000000, 'total_tokens': 2000000}))
    )
    print('Gemini','gemini-2.0-flash-lite',calculator.get_pricing(token_usage=TokenUsage(**{'model': 'gemini-2.0-flash-lite', 'prompt_tokens': 1000000, 'completion_tokens': 1000000, 'total_tokens': 2000000}))
    )
    print('Azure','azure/gpt-4o',calculator.get_pricing(token_usage=TokenUsage(**{'model': 'azure/gpt-4o', 'prompt_tokens': 1000000, 'completion_tokens': 1000000, 'total_tokens': 2000000}))
    )
