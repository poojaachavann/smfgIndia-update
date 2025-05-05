import os
import fitz

class PDFToImagesConverter:
    def __init__(self, dpi=250, image_format='png', temp_image_prefix='temp_images'):
        """
        Initialize the PDF to Images Converter with configurable settings.
        
        :param dpi: Dots per inch for the output images. Default is 250.
        :param image_format: Image format for the output files (e.g., 'png', 'jpeg'). Default is 'png'.
        :param temp_image_prefix: Prefix for the temporary directory where images are stored. Default is 'temp_images'.
        """
        self.dpi = dpi
        self.image_format = image_format
        self.temp_image_prefix = temp_image_prefix

    def convert(self, pdf_path, output_dir_path):
        """
        Converts a PDF into images, one per page, and saves them in a directory within output_dir_path.
        
        :param pdf_path: Path to the PDF file.
        :param output_dir_path: Path to the directory where the output folder will be created.
        :return: List of paths to the saved image files.
        """
        image_paths = []
        
        pdf_name = os.path.splitext(os.path.basename(pdf_path))[0].replace(" ", "_")
        image_output_folder = os.path.join(output_dir_path, f"{self.temp_image_prefix}_{pdf_name}")
        
        os.makedirs(image_output_folder, exist_ok=True)
        
        with fitz.open(pdf_path) as doc:
            for page_num, page in enumerate(doc):
                pix = page.get_pixmap(dpi=self.dpi)
                image_filename = f"{pdf_name}_page_{page_num}.{self.image_format}"
                image_path = os.path.join(image_output_folder, image_filename)
                pix.save(image_path)
                pix = None
                image_paths.append(image_path)
        
        return image_paths

if __name__ == "__main__":
    # Example usage
    converter = PDFToImagesConverter()
    pdf_path = r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\corient\BankStatementAnalyser\data\statements\pdfs\complete.pdf"
    output_dir = os.path.join(os.getcwd(), "assets", "test_user")
    image_paths = converter.convert(pdf_path, output_dir)
    print(f"Converted images saved to: {image_paths}")