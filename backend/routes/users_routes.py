from flask import Blueprint, request, jsonify
from models.users import create_user, get_user, update_user, delete_user

user_bp = Blueprint("users_routes", __name__)

@user_bp.route("/create-user", methods=["POST"])
def create_user_route():
    data = request.json
    user_id = data.get("user_id")
    user_data = {
        "id": data.get("id"),
        "name": data.get("name"),
        "email": data.get("email")
    }
    try:
        create_user(user_id, user_data)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
