from backend.firebase_config import db

def get_prediction(pet_id):
    return db.collection("Prediction").document(pet_id).get().to_dict()

def update_prediction(pet_id, update_data):
    db.collection("Prediction").document(pet_id).update(update_data)

def create_prediction(pet_id, prediction_data):
    db.collection("Prediction").document(pet_id).set(prediction_data)

def delete_prediction(pet_id):
    db.collection("Prediction").document(pet_id).delete()