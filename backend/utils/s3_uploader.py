import boto3
import os
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

def upload_to_s3(image_bytes, file_extension='jpg'):
    try:
        # Initialize S3 client
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION
        )

        # Generate a unique filename
        unique_filename = f"{uuid.uuid4()}.{file_extension}"

        # Upload the file to the S3 bucket
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=unique_filename,
            Body=image_bytes,
            ContentType=f'image/{file_extension}'
        )

        # Construct the public URL (based on the bucket policy)
        public_url = f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{unique_filename}"
        print("Uploaded to S3:", public_url)
        return {"url": public_url}
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return {"error": "Failed to upload to S3."}
