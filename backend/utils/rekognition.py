import boto3

def detect_dog_or_cat(image_file):
    # Initialize AWS Rekognition client
    rekognition_client = boto3.client('rekognition', region_name='us-east-1')  # Adjust region if needed

    # Send the image to Rekognition for label detection
    response = rekognition_client.detect_labels(
        Image={'Bytes': image_file.read()},
        MaxLabels=10,
        MinConfidence=80  # Minimum confidence threshold (adjust as needed)
    )

    # Check if a dog or cat is detected in the image
    pet_type = None
    for label in response['Labels']:
        if label['Name'].lower() in ['dog', 'cat']:
            pet_type = label['Name'].lower()
            break
    
    return pet_type
