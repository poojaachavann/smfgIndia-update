from image_parser import extract_text_from_images,ExtractionConfig
# from extraction_parser import parse_statement_pages

import asyncio


if __name__ == "__main__":
    print(
        asyncio.run(
            extract_text_from_images(
                image_paths=[
                    r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\corient\BankStatementAnalyser\data\statements\images\abu2.png"
                ],extraction_config=
                ExtractionConfig(**{
                    "provider": "azure",
                    "model": "azure_vision",
                    "system_persona": '',
                    "prompt_persona": '',
                })
            )
        )
    )
