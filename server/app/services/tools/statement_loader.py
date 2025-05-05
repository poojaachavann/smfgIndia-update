import re
import pandas as pd
import numpy as np
import datetime
from rich import print
import tabula
import pymupdf4llm


class StatementLoader:
    def __init__(self, statement_text: str):
        self.text = statement_text

    def load_pages(self):
        pages = []
        pdf = md_text = pymupdf4llm.to_markdown(self.pdf_path)
        for page in pdf.pages:
            pages.append(page.extract_text())
        # print(pages)
        return pages

    def load_by_month(self):
        monthly_list = self._split_by_months()
        return monthly_list

    def _load_combined_statement(self):
        return " ".join(self.load_pages())

    def _extract_dates_span(self):
        pattern = "[0-9]{2}/[0-9]{2}/[0-9]{4}"  # DD/MM/YYYY
        matches = re.finditer(pattern, self.text)
        dates = []
        spans = []
        months = []
        for match in matches:
            date = datetime.datetime.strptime(match.group(), "%d/%m/%Y")
            dates.append(date)
            months.append(date.month)
            spans.append(match.span())
        return dates, months, spans

    def _get_month_split_span(self):
        dates, months, spans = self._extract_dates_span()
        unique_months = []
        split_criterions = []
        for month in months:
            if month not in unique_months:
                unique_months.append(month)
        spans_final = []
        for month in unique_months:
            split_criterions.append(months.index(month))
            spans_final.append(spans[months.index(month)])
        return spans_final

    def _split_by_months(self):
        spans = self._get_month_split_span()
        texts = []
        last_index = 0
        for span in spans:
            texts.append(self.text[last_index : span[0]])
            last_index = span[0]
        return texts

if __name__ == "__main__":
    from pdf_parser import PdfParser
    loader = PdfParser(r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\smfg\data\fin-docs\pdfs\yes1.pdf")
    pages = loader.load_pages()
    
    
    # loader = StatementLoader()
    # print((loader.load_by_month()),sep='\n\n\n')
    
    
    
    
    
    
    