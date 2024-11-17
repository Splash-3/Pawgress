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
AWS_S3_BUCKET = os.getenv('AWS_S3_BUCKET')

# RapidAPI credentials for the dog breed classifier
RAPIDAPI_KEY = "f4d1540488msha5bd6e2f0138dd8p1ddcb3jsn061cc6715f19"
RAPIDAPI_HOST = "dog-breed-classification-api.p.rapidapi.com"

# Initialize the S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def upload_image_to_s3(image_bytes, image_name):
    """
    Uploads an image to S3 and returns a presigned URL.
    """
    try:
        s3_client.put_object(
            Bucket=AWS_S3_BUCKET,
            Key=image_name,
            Body=image_bytes,
            ContentType='image/jpeg'
        )

        # Generate a presigned URL for the uploaded image
        presigned_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': AWS_S3_BUCKET, 'Key': image_name},
            ExpiresIn=3600  # URL expires in 1 hour
        )
        return presigned_url
    except Exception as e:
        print(f"Error uploading image to S3: {e}")
        return None

def detect_objects_in_image_base64(image_base64):
    """
    Detect objects in an image provided as a Base64 string.
    """
    try:
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

        breed = None
        for label in response['Labels']:
            if label['Confidence'] >= min_confidence:
                print(f"Detected: {label['Name']} with confidence {label['Confidence']:.2f}%")

                # If a dog is detected, call the dog breed classifier
                if label['Name'] == "Dog":
                    breed = identify_dog_breed(image_bytes)
                    print(f"Identified Dog Breed: {breed}")
                    return {"animal": "Dog", "breed": breed}

                # If a cat is detected, return a placeholder message
                elif label['Name'] == "Cat":
                    return {"animal": "Cat", "message": "Cat detected, breed classification not implemented."}

        print("No dog or cat detected.")
        return {"error": "No dog or cat detected."}
    except Exception as e:
        print(f"Error detecting objects: {e}")
        return {"error": "Rekognition failed to process the image."}

def identify_dog_breed(image_bytes):
    """
    Identify the breed of the dog using a third-party API with an image URL from S3.
    """
    try:
        # Upload the image to S3 and get a presigned URL
        image_name = "dog_image.jpg"
        image_url = upload_image_to_s3(image_bytes, image_name)
        if not image_url:
            return {"error": "Failed to upload image to S3"}

        url = "https://dog-breed-classification-api.p.rapidapi.com/dog_breed_classification"
        headers = {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
            "Content-Type": "application/json"
        }

        # Use the presigned URL as the input for the API
        data = {"url": image_url}
        response = requests.post(url, headers=headers, json=data)

        # Check the response status
        if response.status_code == 200:
            result = response.json()
            breed = result.get("breed", "Unknown breed")
            confidence = result.get("confidence", "N/A")
            breed_info = f"{breed} (Confidence: {confidence})"
            print(f"API Response: {breed_info}")
            return breed_info
        else:
            error_message = f"API error: {response.status_code} - {response.text}"
            print(error_message)
            return {"error": error_message}
    except Exception as e:
        print(f"Error identifying dog breed: {e}")
        return {"error": "Dog breed classification failed."}
