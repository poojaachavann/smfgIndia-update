import cv2 as cv
import os
from ultralytics import YOLO
import cv2 as cv
import json

model = YOLO(r"C:\SMFG-UPDATED\smfgIndia-update\server\models\yolov8l_100e.pt")


def extract_ROI(image, box, scale_factor_x=1.7, scale_factor_y=1.5):
    shape = image.shape
    x1, y1, x2, y2 = box["x1"], box["y1"], box["x2"], box["y2"]

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
    print(results)
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
    return output_path, max_conf




def save_top_faces(image_paths, output_dir, top_k=3):
    all_faces = []

    for image_path in image_paths:
        image = cv.imread(image_path)
        results = detect_face(image_path)  # List of face detections, one per face

        if not results:
            continue  # Skip if no detections

        for result in results:  # Iterate over each face detection directly
            boxes = result.boxes
            if boxes is None or len(boxes) == 0:
                continue

            for box in boxes:  # Each box corresponds to one face in the result
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = box.conf[0].item()

                roi = image[y1:y2, x1:x2]
                all_faces.append(
                    {
                        "conf": conf,
                        "roi": roi,
                        "source_image": os.path.basename(image_path),
                    }
                )

    if not all_faces:
        print("No faces detected in any image.")
        return

    # Sort all faces by confidence in descending order
    all_faces.sort(key=lambda x: x["conf"], reverse=True)

    os.makedirs(output_dir, exist_ok=True)

    # Save top K faces
    for i, face in enumerate(all_faces[:top_k]):
        output_path = os.path.join(
            output_dir,
            f"face_{i + 1}_{face['source_image']}_conf_{face['conf']:.2f}.jpg",
        )
        cv.imwrite(output_path, face["roi"])
        print(f"Saved: {output_path}")

    return [face["conf"] for face in all_faces[:top_k]]


def extract_ROI(image, box, scale_factor_x=1.7, scale_factor_y=1.5, draw_rect=False):
    shape = image.shape
    x1, y1, x2, y2 = box["x1"], box["y1"], box["x2"], box["y2"]

    x1, y1, x2, y2 = float(x1), float(y1), float(x2), float(y2)
    cx = (x1 + x2) / 2
    cy = (y1 + y2) / 2

    width = (x2 - x1) * scale_factor_x
    height = (y2 - y1) * scale_factor_y

    new_x1 = int(max(cx - width / 2, 0))
    new_y1 = int(max(cy - height / 2, 0))
    new_x2 = int(min(cx + width / 2, shape[1]))
    new_y2 = int(min(cy + height / 2, shape[0]))

    if draw_rect:
        cv.rectangle(image, (new_x1, new_y1), (new_x2, new_y2), (0, 255, 0), 2)

    sliced_image = image[new_y1:new_y2, new_x1:new_x2]
    return sliced_image


def save_top_faces(image_paths, output_dir, top_k=3):
    all_faces = []

    for image_path in image_paths:
        image = cv.imread(image_path)
        results = detect_face(image_path)

        if not results:
            continue

        for result in results:
            boxes = result.boxes
            if boxes is None or len(boxes) == 0:
                continue

            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = box.conf[0].item()

                box_dict = {"x1": x1, "y1": y1, "x2": x2, "y2": y2}
                roi = extract_ROI(image, box_dict)

                all_faces.append(
                    {
                        "conf": conf,
                        "roi": roi,
                        "source_image": os.path.basename(image_path),
                    }
                )

    if not all_faces:
        print("No faces detected in any image.")
        return

    all_faces.sort(key=lambda x: x["conf"], reverse=True)
    os.makedirs(output_dir, exist_ok=True)
    output_paths = []
    output_confidences = []
    for i, face in enumerate(all_faces[:top_k]):
        output_path = os.path.join(
            output_dir,
            f"face_{i + 1}_{face['source_image']}_conf_{face['conf']:.2f}.jpg",
        )
        cv.imwrite(output_path, face["roi"])
        output_paths.append(output_path)
        output_confidences.append(face["conf"])
        print(f"Saved: {output_path}")

    return output_paths, output_confidences


if __name__ == "__main__":
    image_path1 = r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\assets\uid-testing\pid-id_proof\images\id_proof_KYC-_8290883\pan.png"
    image_path2 = r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\assets\uid-testing\pid-id_proof\images\id_proof_KYC-_8290883\KYC-_8290883_page_0.png"
    # image_path3 = r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\assets\uid-testing\pid-id_proof\images\id_proof_KYC-_8290883\image.png"
    results  = save_top_faces(
        [image_path1, image_path2],
        r"C:\Users\akliv\OneDrive\Desktop\Akesh kumar\forks\SMFG-V2\assets\uid-testing\pid-id_proof\images\id_proof_KYC-_8290883",
    )
    print(results)
