from firebase_config import db

def add_pet(pet_id, pet_data):
    db.collection("Pets").document(pet_id).set(pet_data)

def get_pet(pet_id):
    return db.collection("Pets").document(pet_id).get().to_dict()

def update_pet(pet_id, update_data):
    db.collection("Pets").document(pet_id).update(update_data)

def delete_pet(pet_id):
    db.collection("Pets").document(pet_id).delete()
