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

# Nyckel API credentials
NYCKEL_CLIENT_ID = os.getenv('NYCKEL_CLIENT_ID')
NYCKEL_CLIENT_SECRET = os.getenv('NYCKEL_CLIENT_SECRET')

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def get_nyckel_access_token():
    """
    Get the Nyckel API access token.
    """
    try:
        token_url = "https://www.nyckel.com/connect/token"
        data = {
            'grant_type': 'client_credentials',
            'client_id': NYCKEL_CLIENT_ID,
            'client_secret': NYCKEL_CLIENT_SECRET
        }

        response = requests.post(token_url, data=data)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            print(f"Error obtaining Nyckel access token: {response.text}")
            return None
    except Exception as e:
        print(f"Error in token request: {e}")
        return None

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

        presigned_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': AWS_S3_BUCKET, 'Key': image_name},
            ExpiresIn=3600
        )
        return presigned_url
    except Exception as e:
        print(f"Error uploading image to S3: {e}")
        return None

def identify_cat_breed(image_url, access_token):
    """
    Identify the breed of the cat using Nyckel API with an image URL.
    """
    try:
        url = "https://www.nyckel.com/v1/functions/cat-breed-identifier/invoke"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        data = {"data": image_url}

        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            result = response.json()
            breed = result.get("labelName", "Unknown breed")
            confidence = result.get("confidence", "N/A")
            breed_info = f"{breed} (Confidence: {confidence})"
            print(f"API Response: {breed_info}")
            return breed_info
        else:
            error_message = f"API error: {response.status_code} - {response.text}"
            print(error_message)
            return {"error": error_message}
    except Exception as e:
        print(f"Error identifying cat breed: {e}")
        return {"error": "Cat breed classification failed."}

def classify_cat_image(image_bytes, image_name):
    """
    Classify the breed of a cat image using Nyckel's Cat Breed API.
    """
    try:
        # Get Nyckel access token
        access_token = get_nyckel_access_token()
        if not access_token:
            return {"error": "Failed to obtain Nyckel access token"}

        # Upload image to S3 and get URL
        image_url = upload_image_to_s3(image_bytes, image_name)
        if not image_url:
            return {"error": "Failed to upload image to S3"}

        # Identify cat breed
        breed_info = identify_cat_breed(image_url, access_token)
        return {"animal": "Cat", "breed": breed_info}
    except Exception as e:
        print(f"Error classifying cat image: {e}")
        return {"error": "Cat image classification failed"}
