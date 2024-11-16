import requests

def classify_dog_breed(image_file):
    api_url = "https://api.example.com/dog-breed-classification"  # Replace with the actual Dog Breed API URL
    api_key = "your_api_key"  # Replace with your actual API key

    # Upload the image to the Dog Breed Classification API (handle it as per API requirements)
    files = {'file': image_file}
    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    response = requests.post(api_url, headers=headers, files=files)

    if response.status_code == 200:
        return response.json()  # Returns the breed and confidence
    else:
        return {"error": "Unable to classify breed"}
