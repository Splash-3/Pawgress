from flask import Blueprint, request, jsonify
from models.predictions import create_prediction, update_prediction, delete_prediction, get_prediction

prediction_bp = Blueprint("prediction_routes", __name__)

@prediction_bp.route("/create-prediction", methods=["POST"])
def create_prediction_routes():
    data = request.json
    pet_id = data.get("pet_id")
    prediction_data = {
        "pet_id": data.get("pet_id"),
        "user_id": data.get("user_id"),
        "predicted_weight": data.get("predicted_weight"),
        "predicted_height": data.get("predicted_height"),
        "prediction_date": data.get("prediction_date"),
    }

    try:
        create_prediction(pet_id, prediction_data)
        return jsonify({"message": "prediction added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

