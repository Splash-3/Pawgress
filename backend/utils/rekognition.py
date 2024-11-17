import boto3
import os
from dotenv import load_dotenv
import base64
from utils.breed_classifier import identify_breed
from utils.s3_uploader import upload_to_s3

# Load environment variables
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')

# Access the client_id and client_secret
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

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

        # Call the Rekognition API to check if dog or cat
        response = client.detect_labels(Image={'Bytes': image_bytes}, MaxLabels=10, MinConfidence=70)

        # Detect Breed
        breed = None
        for label in response['Labels']:
            if label['Confidence'] >= min_confidence:
                if label['Name'] == "Dog":
                    # Upload to S3
                    upload_response = upload_to_s3(image_bytes)
                    if "error" in upload_response:
                        return {"error": "Failed to upload image to S3."}
                    # print("Uploaded image to S3", upload_response["url"])
                    url = 'https://www.nyckel.com/v1/functions/dog-breed-identifier/invoke'
                    bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE3MzE4MTE0ODQsImV4cCI6MTczMTgxNTA4NCwiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6Imo4enJieXpza2V6ZzQ1bWRoOTR4dmlsbXFka3FqNWswIiwianRpIjoiMzRCQjRCNTRGQzIwMDU4MUVDMkMyM0FCNkE4M0I2NDYiLCJpYXQiOjE3MzE4MTE0ODQsInNjb3BlIjpbImFwaSJdfQ.HQRm25OAcZB48UiLGKjWTQwz0aRa9pkkd5t-DmEBzG6YmXfISljtm658ZHcZPjoOXT6iBKk75ktrb8UF7-dhiyRZhuiZ6GPzlE_SaJQQN5MSz-mOuc3lw6ioXKEN1JllAn4vI0lEzFtJwnjBZdMclaNFZ5F71aOB0_OMnbN4jcQTJq9Nd72g10xrXvQE_c6vc-oWW_t0GmAE7AfjkGLQi2pDXLmsp0h4w7xhYqhwBkyP55jfbGVoJGnlyxt6tl7n5AA8pgfDIvk0LPG3FK1G-l2nKaJipwHVncuRXy_XveILq45GLYCbdCppNm62jye_pVV5hG9p13CQucf6ySnI7w'
                    breed = identify_breed(upload_response["url"], url, bearer, 0)
                    return breed
                elif label['Name'] == "Cat":
                    # Upload to S3
                    upload_response = upload_to_s3(image_bytes)
                    if "error" in upload_response:
                        return {"error": "Failed to upload image to S3."}
                    url = 'https://www.nyckel.com/v1/functions/cat-breed-identifier/invoke'
                    bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE3MzE4MTM3ODQsImV4cCI6MTczMTgxNzM4NCwiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6Imo4enJieXpza2V6ZzQ1bWRoOTR4dmlsbXFka3FqNWswIiwianRpIjoiODU3Q0I4NkFCQjJBMTZDOTBGQTc0MkJFRUE3NTUxOEUiLCJpYXQiOjE3MzE4MTM3ODQsInNjb3BlIjpbImFwaSJdfQ.nlMxgBkqAV-NHC3__XvBf1v3L6TM07OMmkICB1Dtu4YfxqZFM80kOSvily0dQtfxElo6XOZElvYCjOY9B72wBCblQD8eDT6vzEo8_5ngTa7YSVPXcvGafkD5lMQGJdcS8BL1uq9L9Z_loCeycu1-XsiP-887z5WfyO4isXKUrwrd94oAPY48HYdR2xP7CLT_IIg98FzcRdAZ1ZIVMMXKiEX_5jBam0sULJCXvzpmVk5gyX2Ro4tZWkcwkNm_HTjtdvlvaox84loss3yKKFKTbcy7uSerknv9A-vQbDY2kTIFAn2t2887EhkHHNdmeKPtNeyEnOsNaz2pIveXQkQ4kA'  
                    breed = identify_breed(upload_response["url"], url, bearer, 0)
                    return breed
        if not breed:
            return {"error": "Failed to identify the breed."}
        return breed
    except Exception as e:
        print(f"Error detecting objects: {e}")
        return {"error": "Rekognition failed to process the image."}
