from flask import Flask, request, jsonify
from utils.rekognition import detect_objects_in_image_base64
import requests

app = Flask(__name__)

# Temporary file storage
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/analyse-image', methods=['POST'])
def upload_image():
    data = request.get_json()
    print("Received POST data")

    if not data or "image" not in data:
        return jsonify({'error": "missing "image" in data'}), 400

    try:
        response = detect_objects_in_image_base64(data["image"])
        print("Breed:", response)
        return jsonify(response)
    except Exception as e:
        print(f"Error detecting objects: {e}")
        return jsonify({"error": "Failed to process the image."}), 500

if __name__ == '__main__':
    app.run(debug=True)