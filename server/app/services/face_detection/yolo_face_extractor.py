from ultralytics import YOLO
import cv2 as cv
import json

model = YOLO(r".\models\yolov8l-face.pt")

def extract_ROI(image, box, scale_factor_x=1.7, scale_factor_y=1.5):
    shape = image.shape
    x1, y1, x2, y2 = box['x1'], box['y1'], box['x2'], box['y2']
    
    # Convert to float for precision
    x1, y1, x2, y2 = float(x1), float(y1), float(x2), float(y2)

    # Compute center
    cx = (x1 + x2) / 2
    cy = (y1 + y2) / 2

    # Compute new width and height
    width = (x2 - x1) * scale_factor_x 
    height = (y2 - y1) * scale_factor_y
    area = width * height

    # Get new top-left and bottom-right
    new_x1 = int(max(cx - width / 2, 0))
    new_y1 = int(max(cy - height / 2, 0))
    new_x2 = int(min(cx + width / 2, shape[1]))
    new_y2 = int(min(cy + height / 2, shape[0]))

    # Draw rectangle for visualization (optional)
    cv.rectangle(image, (new_x1, new_y1), (new_x2, new_y2), (0, 255, 0), 2)

    # Slice and return
    sliced_image = image[new_y1:new_y2, new_x1:new_x2]
    return sliced_image, area

def detect_face(image_path):
    return model.predict(source=image_path, save=False, show=False)

def save_faces(input_image, output_path):
    image = cv.imread(input_image)    
    
    results = detect_face(input_image)    
    result = results[0]  # Assuming one image at a time    
    
    boxes = result.boxes    
    if boxes is None or len(boxes) == 0:    
        print("No faces detected.")    
        exit()    
    
    best_box = None    
    max_area = 0    
    max_conf = 0    
    
    # Loop through all detections
    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        conf = box.conf[0].item()
        width = x2 - x1
        height = y2 - y1
        area = width * height

        if area > max_area or (area == max_area and conf > max_conf):
            max_area = area
            max_conf = conf
            best_box = {"x1": x1, "y1": y1, "x2": x2, "y2": y2, "conf": conf}

    # Extract and show/save ROI
    if best_box:
        roi, roi_area = extract_ROI(image, best_box)
        cv.imwrite(output_path, roi)

        
if __name__ == "__main__":
    image_path = r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\v2\app\services\ocrExtreme\image.png"
    save_faces(image_path, "roi.jpg")