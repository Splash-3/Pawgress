import requests

def classify_dog_breed(image_path):
    url = "https://dog-breed-classification-api.p.rapidapi.com/dog_breed_classification"
    
    headers = {
        "x-rapidapi-key": "f4d1540488msha5bd6e2f0138dd8p1ddcb3jsn061cc6715f19",
        "x-rapidapi-host": "dog-breed-classification-api.p.rapidapi.com"
    }

    # Open the image file in binary mode
    with open(image_path, "rb") as image_file:
        files = {"file": image_file}
        response = requests.post(url, headers=headers, files=files)

    # Check response
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Error: {response.status_code} - {response.text}"}

# Example usage
result = classify_dog_breed("path/to/your/image.jpg")
print(result)
