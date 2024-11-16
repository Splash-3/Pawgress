from flask import Blueprint, request, jsonify
from models.predictions import create_prediction, update_prediction, delete_prediction, get_prediction

prediction_bp = Blueprint("prediction_routes", __name__)

# @prediction_bp.route("/add-pet", methods=["POST"])
