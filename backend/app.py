from flask import Flask, request, jsonify
from utils.rekognition import detect_objects_in_image_base64
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os

app = Flask(__name__)

# Temporary file storage
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

load_dotenv()
app = Flask(__name__)

# MongoDB connection
url = os.getenv("MONGODB_URI")
client = MongoClient(url)
db = client["flaskDatabase"]
users_collection = db["users"]
pets_collection = db["pets"]
predictions_collection = db["predictions"]

# Home route
@app.route('/')
def home():
    return "Welcome to the Flask and MongoDB API!"

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