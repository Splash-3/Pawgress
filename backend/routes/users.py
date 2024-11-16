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
    
@user_bp.route("/get-user", methods=["GET"])
def get_user_route():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"Error":"User_id param missing"})
    
    user_data = get_user(user_id)

    if user_data is None:
        return jsonify({"Error":"User not found"})
    
    return jsonify(user_data), 200

