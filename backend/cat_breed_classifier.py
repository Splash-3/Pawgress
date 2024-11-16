import requests

def get_access_token(client_id, client_secret):
    token_url = 'https://www.nyckel.com/connect/token'
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }
    response = requests.post(token_url, data=data)
    
    if response.status_code == 200:
        token_data = response.json()
        return token_data['access_token']
    else:
        raise Exception("Failed to get access token: " + response.text)
    
def identify_cat_breed(image_path, client_id, client_secret):
    # Get the access token
    access_token = get_access_token(client_id, client_secret)
    
    # Define the API endpoint and headers
    url = 'https://www.nyckel.com/v1/functions/cat-breed-identifier/invoke'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    # Open the image file in binary mode
    with open(image_path, 'rb') as image_file:
        files = {'data': image_file}
        
        # Send POST request to the API
        response = requests.post(url, headers=headers, files=files)
        
        # Check the response
        if response.status_code == 200:
            result = response.json()
            label_name = result.get("labelName", "Unknown")
            confidence = result.get("confidence", 0)
            print(f"Cat Breed: {label_name}, Confidence: {confidence:.2f}")
            return label_name, confidence
        else:
            raise Exception("Failed to identify cat breed: " + response.text)
