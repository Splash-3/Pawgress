from flask import Blueprint, request, jsonify
from models.pets import add_pet, get_pet, update_pet, delete_pet

pet_bp = Blueprint("pets_routes", __name__)

@pet_bp.route("/add-pet", methods=["POST"])
def add_pet_route():
    data = request.json
    pet_id = data.get("pet_id")
    pet_data = {
        "pet_id": data.get("pet_id"),
        "user_id": data.get("user_id"),
        "breed_id": data.get("breed_id"),
        "weight": data.get("weight"),
        "height": data.get("height"),
        "dob": data.get("dob"),
    }
    try:
        add_pet(pet_id, pet_data)
        return jsonify({"message": "Pet added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@pet_bp("/get_pet", methods=["GET"])
def get_pet_route():
    pet_id = request.args.get("pet_id")

    if not pet_id:
        return jsonify({"Error":"Missing pet_id param"})

    pet_data = get_pet(pet_id)

    if pet_id is None:
        return jsonify({"Error":"pet_id not found"})

    return jsonify(pet_data), 200 