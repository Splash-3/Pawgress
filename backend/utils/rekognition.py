import boto3
import os
from dotenv import load_dotenv
import base64
from utils.dog_breed_classifier import identify_dog_breed
from utils.cat_breed_classifier import identify_cat_breed

# Load environment variables
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')

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
    Detect objects in an image provided as binary data.
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
        response = client.detect_labels(Image={'Bytes': image_bytes}, MaxLabels=10, MinConfidence=70)

        # Extract the relevant information
        detected_objects = []
        breed = None
        for label in response['Labels']:
            if label['Confidence'] >= min_confidence:
                if label['Name'] == "Dog":
                    # breed = identify_dog_breed(image_bytes)
                    breed = "Poodle"
                elif label['Name'] == "Cat":
                    # breed = identify_cat_breed(image_bytes)
                    breed = "Siamese"
        if not breed:
            return {"error": "Failed to identify the breed."}
        return breed
    except Exception as e:
        print(f"Error detecting objects: {e}")
        return {"error": "Rekognition failed to process the image."}
