from threading import Lock                       
import json


def read_json(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)
    return data

def write_json(data, file_path):
    with open(file_path, "w") as f:
        
        json.dump(data, f, indent=4)
        

def write_json_safe(data, path):
    file_lock = Lock()
    with file_lock:
        write_json(data, path)