from firebase_config import db

def create_user(user_id, user_data):
    db.collection("Users").document(user_id).set(user_data)

def get_user(user_id):
    return db.collection("Users").document(user_id).get().to_dict()

def update_user(user_id, update_data):
    db.collection("Users").document(user_id).update(update_data)

def delete_user(user_id):
    db.collection("Users").document(user_id).delete()
