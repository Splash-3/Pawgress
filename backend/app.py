from flask import Flask
from routes.users import user_bp
from routes.pets import pet_bp
from routes.predictions import prediction_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(pet_bp)
app.register_blueprint(prediction_bp)

# Test route
@app.route("/", methods=["GET"])
def index():
    return "Firebase and Firestore are set up successfully!"

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

# Import utility functions
from utils.rekognition import detect_dog_or_cat
from utils.dog_breed_classifier import classify_dog_breed

app = Flask(__name__)

# Temporary file storage
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})

    if file:
        # Secure and save the file temporarily
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Open the file for reading
        with open(file_path, 'rb') as image_file:
            # Step 1: Check if the image is a dog or a cat using Rekognition
            pet_type = detect_dog_or_cat(image_file)
            if not pet_type:
                return jsonify({"error": "Neither a dog nor a cat detected"})

            # Step 2: If it's a dog, classify the breed
            if pet_type == 'dog':
                breed_info = classify_dog_breed(image_file)
                return jsonify({
                    "pet_type": pet_type,
                    "breed": breed_info.get("breed", "Unknown"),
                    "confidence": breed_info.get("confidence", "N/A")
                })

            # If it's a cat, return that info
            return jsonify({"pet_type": pet_type})

if __name__ == '__main__':
    app.run(debug=True)