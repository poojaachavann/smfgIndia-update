"""Main processing script for bank statements."""

import os
import json
import asyncio
import pandas as pd
from io import StringIO
from app.services.ai_clients.azure_openai import AzureOpenAIModel
from app import (
    extract_text_from_images,
    ExtractionConfig,
    parse_statement_pages,
    ParsingConfig,
    PDFToImagesConverter,
)

from app.services.verifiers.personal_address_info_presence import validate_document
import io
import sys
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')



# def verify_account_info(account_info):
#     verify the wheather the address present in the bank statement


# Main processing function
def main(file_path=None, out_dir="assets", uuid=None, process_id=None):
    # Build output directories
    base_path = os.path.join(os.getcwd(), out_dir, f"uid-{uuid}", f"pid-{process_id}")
    images_dir = os.path.join(base_path, "images")
    json_dir = os.path.join(base_path, "json")
    page_csv_dir = os.path.join(base_path, "page_csv")
    combined_csv_path = os.path.join(base_path, "combined_transactions.csv")

    # Ensure directories exist
    for d in [base_path, images_dir, json_dir, page_csv_dir]:
        os.makedirs(d, exist_ok=True)

    # Convert PDF to images
    converter = PDFToImagesConverter()
    image_paths = converter.convert(file_path, images_dir)[:1]
    print("Image Paths:", image_paths)

    # Extract text from images
    extraction_config = ExtractionConfig(model="azure_openai_vision",system_persona="""Extract the text out of image, maintain the original structure of the image""")
    extracted = asyncio.run(extract_text_from_images(image_paths, extraction_config))

    print("Extracted Text:", extracted)
    exit()
    # Parse pages
    parsing_config = ParsingConfig(
        provider="azure",
        system_persona="""**System Persona & Task**  
You are an expert in transforming bank-statement images (or PDFs) into clean, structured CSV data. Your goal is to:

1. Extract only the transaction details—ignore headers, footers, summaries, ads, etc.  
2. Identify and output any available account metadata (holder name, account number).  
3. Tag each transaction according to a predefined taxonomy.  
4. Produce a two-part output per page:  
   - **Account Information** (text block)  
   - **CSV Table** of transactions (enclose CSV block between `[$SEPTRANSACTIONS-START]` and `[$SEPTRANSACTIONS-END]`)

---

## 1. Account Information  
- **Holder Name**: extracted or `Not Present`  
- **Account Number**: extracted or `Not Present`
- **Address**: extracted or `Not Present`
- **Contact**: extracted or `Not Present`  
- **Opening Balance**: amount or `N/A`  
- **Closing Balance**: amount or `N/A`


## 2. CSV-Formatted Transactions  
- **Separator**: use a line break then `[$SEPTRANSACTIONS-START]`, followed by CSV, then `[$SEPTRANSACTIONS-END]`.  
- **Columns**: `Date,Type,Description,Amount,Balance,Tags`  
- **Date**: format `DD Mon YY` (e.g., `05 Nov 23`); if missing/invalid → `N/A`.  
- **Type**:  
  - `Credit` if Balance After > Balance Before  
  - `Debit` if Balance After < Balance Before  
  - blank if BB/BA missing or ambiguous  
- **Description**: clean text—remove IDs, branch codes, redundant details.  
  - e.g., `UPI/024421993618/YASWANT SINGH` write `UPI/YASWANT SINGH`  
  - if missing write `N/A`.  
- **Amount**: positive number, two decimals; strip currency symbols & separators; parentheses or minus → negative.  
  - if missing/invalid write `N/A`.  
- **Balance**: two decimals; parentheses write negative (e.g., `(500.00)` write `-500.00`).  
  - if missing/invalid write `N/A`.  
- **Tags**: choose from predefined lists; multiple tags separated by `, `; if none match write `Miscellaneous Expense` (for Debits) or `Other Income` (for Credits).

---

### Predefined Tags  
transaction_tags = [
    # Income
    "salary",
    "bonus_incentive",
    "business_income",
    "interest_income",
    "dividend_income",
    "rent_received",
    "refund_reversal",
    "investment_proceeds",
    "other_income",

    # Expenses
    "emi_loan_repayment",
    "credit_card_payment",
    "rent_payment",
    "utilities",
    "groceries",
    "shopping",
    "fuel",
    "healthcare_pharmacy",
    "insurance_premium",
    "tax_payment",
    "education_tuition",
    "travel_transport",
    "entertainment_dining_out",
    "subscription",
    "fees_charges",
    "penalty_overdraft_fee",
    "miscellaneous_expense",

    # Transfers
    "internal_transfer",
    "external_transfer",
    "p2p_transfer",
    "cash_deposit",
    "cash_withdrawal",

    # Cheque
    "cheque_issued",
    "cheque_deposit",
    "cheque_bounce",

    # Additional Behavioural / Granular Tags
    "food_delivery",
    "online_shopping",
    "mobile_recharge",
    "charity_donation",
    "gift_purchase",
    "fitness_gym",
    "home_improvement",
    "pet_care",
    "atm_fee",
    "loan_interest",
    "bank_charges",
    "asset_purchase",
]
You can also give others tags name by your own if required. 
---

## 3. OCR & Numeric Normalization  
- Replace letter “O” with zero in numeric contexts (e.g., `1O00.00` → `1000.00`).  
- Normalize separators: handle European vs US formats, remove thousands separators, convert decimal to `.`.  
- Convert parentheses to negative values; preserve leading minus.  
- If any numeric field cannot be parsed, set to `N/A`.

---

## 4. Edge Cases & Output Rules  
- **No transactions on a page** → output exactly:  
  ```text
  Unrelevant Information Present in this page
  ```  
- **Missing or Invalid Fields** → if Date, Type, Description, Amount, or Balance is missing or cannot be parsed logically, use `N/A`.  
- **Missing Account Metadata** → if holder name or account number not found, use `Not Present`.  
- **Exclude** any non-transaction rows (e.g., “Balance Brought Forward”, “Carried Forward”).

---

## 5. Example  
**Input OCR Text**  

05 Nov 23\nUPI/9823612345/PAYTM\n100\n 12,000.00
10 Nov 23\nATM WDL/4567\n500\n11,500.00
**Desired Output**  
```text
Account Information:
    Holder Name: JOHN DOE
    Holder Account Number: 123456789
    Opening Balance: 10000.00
    Closing Balance: N/A
Address Information:
    123 Main St, City, State, Zip
[$SEPTRANSACTIONS-START]
Date,Type,Description,Amount,Balance,Tags
05 Nov 23,Credit,UPI/PAYTM,100.00,12000.00,P2P Transfer
10 Nov 23,Debit,ATM WDL,500.00,9500.00,Cash Withdrawal
[$SEPTRANSACTIONS-END]

```


    '''""",
    )
    
    
    texts = [res.response["text"] for res in extracted]
    confidences = [res.response["confidence"] for res in extracted]
    overall_confidence = sum(confidences) / len(confidences)
    parsed = asyncio.run(
        parse_statement_pages(pages=texts, parsing_config=parsing_config)
    )

    # Prepare accumulators
    combined_df = pd.DataFrame()
    json_manifest = []
    account_infos = []

    # Delimiters for transactions block
    start_marker = "[$SEPTRANSACTIONS-START]"
    end_marker = "[$SEPTRANSACTIONS-END]"

    for idx, page in enumerate(parsed, start=1):
        raw = page.response.strip("`").strip()
        # print('Parsed: ',raw)
        # Split account info and transactions by custom markers
        if start_marker in raw and end_marker in raw:
            pre, rest = raw.split(start_marker, 1)
            account_info = pre.strip()
            transactions_block = rest.split(end_marker, 1)[0].strip()
        else:
            account_info = raw.strip()
            transactions_block = None

        # Determine if transaction CSV exists
        if not transactions_block or "Date," not in transactions_block:
            page_entry = {
                "page": idx,
                "account_info": account_info,
                "csv_path": None,
                "note": "No transactions found",
            }
        else:
            # Parse CSV text
            df = pd.read_csv(StringIO(transactions_block))
            df.columns = df.columns.str.strip()
            page_csv_path = os.path.join(page_csv_dir, f"page_{idx}.csv")
            df.to_csv(page_csv_path, index=False)

            # Accumulate combined
            combined_df = pd.concat([combined_df, df], ignore_index=True)
            account_infos.append(account_info)
            page_entry = {
                "page": idx,
                "account_info": account_info,
                "csv_path": page_csv_path,
                "page_confidence": confidences[idx - 1],
            }
        # Record JSON manifest
        json_manifest.append(page_entry)
        json_path = os.path.join(json_dir, f"page_{idx}.json")
        with open(json_path, "w", encoding="utf-8") as jf:
            json.dump(page_entry, jf, ensure_ascii=False, indent=2)

    validation_result = validate_document('\n\n'.join(account_infos), document_type="bank_statement")

    if overall_confidence < 0.85:
        print(f"Low overall confidence: {overall_confidence}")
        reason = {
            "info": "Low confidence in OCR results. Please review and verify.",
            "level": "error",
        }
    elif overall_confidence < 0.95:
        print(f"⚠️ Moderately low overall confidence: {overall_confidence}")
        reason = {
            "info": "Moderately low confidence in OCR results. Please review and verify.",
            "level": "warning",
        }
    else:
        reason = {"info": "High confidence in OCR results.", "level": "success"}

    # Validate account info

    # Save combined JSON manifest
    combined_json_manifest = {
        "extraction": {
            "overall_confidence": overall_confidence,
            "pages": json_manifest,
            "combined_csv_path": combined_csv_path,
            "reason": reason,
        },
        "validation_result": validation_result,
    }
    combined_json_path = os.path.join(base_path, "combined_manifest.json")
    with open(combined_json_path, "w", encoding="utf-8") as jf:
        json.dump(combined_json_manifest, jf, ensure_ascii=False, indent=2)

    # Save combined CSV

    if not combined_df.empty:
        combined_df.to_csv(combined_csv_path, index=False)
        print(f"✅ Combined CSV saved: {combined_csv_path}")
    else:
        print("⚠️ No transactions extracted to combine.")

    # Summary
    print(f"Processed {len(parsed)} pages.")
    print(f"JSON manifests saved in: {json_dir}")
    print(f"Page CSVs saved in: {page_csv_dir}")


# CLI entrypoint
if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser(description="Process bank statements")
    parser.add_argument("--file_path", required=True, help="Path to the PDF file")
    parser.add_argument("--out_dir", default="assets", help="Base output directory")
    parser.add_argument("--uuid", default="user1", help="User ID")
    parser.add_argument("--process_id", default="process1", help="Process ID")
    args = parser.parse_args()
    main(args.file_path, args.out_dir, args.uuid, args.process_id)

    # & C:/Users/akliv/.pyenv/pyenv-win/versions/3.12.8/python.exe "C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\v2\main_bank_statement_manger.py" --file_path "C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\data\statements\pdfs\8241318_Santosh.pdf" --uuid 'testing' --process_id "santosh"
