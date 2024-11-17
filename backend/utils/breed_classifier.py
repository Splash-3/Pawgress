import requests
import os
from dotenv import load_dotenv

load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

def identify_breed(image_url, url, bearer, min_confidence=70):
    try:
        if not image_url:
            return {"error": "Invalid image URL."}
        headers = {
            'Authorization': 'Bearer ' + bearer,
        }
        headers = {
            'Authorization': 'Bearer ' + bearer,
            'client_id': client_id,  # Adding client_id to headers
            'client_secret': client_secret  # Adding client_secret to headers
        }
        result = requests.post(url, headers=headers, json={"data":image_url})
        if not result.ok:
            return {"error": f"API error: {result.status_code}"}
        response_data = result.json()
        # print(response_data)
        breed = response_data.get("labelName", None)
        confidence = response_data.get("confidence", "0.0")
        if confidence < min_confidence or not breed:
            return None
        return breed
    except Exception as e:
        return {"error": str(e)}