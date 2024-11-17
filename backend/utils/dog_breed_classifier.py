import boto3
import os
from dotenv import load_dotenv
import base64
import requests

# Load environment variables
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')

# RapidAPI credentials for the dog breed classifier
RAPIDAPI_KEY = "f4d1540488msha5bd6e2f0138dd8p1ddcb3jsn061cc6715f19"
RAPIDAPI_HOST = "dog-breed-classification-api.p.rapidapi.com"

def detect_objects_in_image_base64(image_base64):
    """
    Detect objects in an image provided as a Base64 string.
    """
    try:
        # Check if the Base64 string contains the prefix "data:image/...;base64,"
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]

        # Decode the Base64 string to binary data
        image_bytes = base64.b64decode(image_base64)
        return detect_objects_in_image(image_bytes)
    except Exception as e:
        print(f"Error decoding Base64 image: {e}")
        return {"error": "Invalid Base64 image format."}


def detect_objects_in_image(image_bytes, min_confidence=70):
    """
    Detect objects in an image provided as binary data using AWS Rekognition.
    """
    try:
        # Initialize the Rekognition client
        client = boto3.client(
            'rekognition',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION
        )

        # Call the Rekognition API to detect labels
        response = client.detect_labels(
            Image={'Bytes': image_bytes},
            MaxLabels=10,
            MinConfidence=min_confidence
        )

        # Extract the relevant information
        breed = None
        for label in response['Labels']:
            if label['Confidence'] >= min_confidence:
                print(f"Detected: {label['Name']} with confidence {label['Confidence']:.2f}%")

                # If a dog is detected, call the dog breed classifier
                if label['Name'] == "Dog":
                    breed = identify_dog_breed(image_bytes)
                    return {"animal": "Dog", "breed": breed}

                # If a cat is detected, you can implement a similar function for cat breed identification
                elif label['Name'] == "Cat":
                    return {"animal": "Cat", "message": "Cat detected, breed classification not implemented."}

        return {"error": "No dog or cat detected."}
    except Exception as e:
        print(f"Error detecting objects: {e}")
        return {"error": "Rekognition failed to process the image."}


def identify_dog_breed(image_bytes):
    """
    Identify the breed of the dog using a third-party API.
    """
    try:
        url = "https://dog-breed-classification-api.p.rapidapi.com/dog_breed_classification"

        headers = {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST
        }

        # Send the image bytes to the API directly
        files = {"file": ("image.jpg", image_bytes, "image/jpeg")}
        response = requests.post(url, headers=headers, files=files)

        # Check the response status
        if response.status_code == 200:
            result = response.json()
            breed = result.get("breed", "Unknown breed")
            confidence = result.get("confidence", "N/A")
            return f"Breed: {breed}, Confidence: {confidence}"
        else:
            return {"error": f"API error: {response.status_code} - {response.text}"}
    except Exception as e:
        print(f"Error identifying dog breed: {e}")
        return {"error": "Dog breed classification failed."}
