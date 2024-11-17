from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os
import hashlib
from bson import ObjectId
import bcrypt


# Load environment variables
load_dotenv()
app = Flask(__name__)

# MongoDB connection
url = "mongodb+srv://deeveshrai125:GvwOlLbTLPiumsYw@pawgress.rrcjd.mongodb.net/?retryWrites=true&w=majority&appName=Pawgress"
client = MongoClient(os.getenv(url))
db = client["flaskDatabase"]
users_collection = db["users"]
pets_collection = db["pets"]
predictions_collection = db["predictions"]

# Home route
@app.route('/')
def home():
    return "Welcome to the Flask and MongoDB API!"


# Helper function to hash the password
def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt)

# Helper function to check if an email already exists
def email_exists(email):
    return users_collection.find_one({"email": email}) is not None

# Create User Endpoint (POST)
# Get started button -  Register
@app.route("/create-user", methods=["POST"])
def create_user():
    try:
        # Get data from the request
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validate the input data
        if not name or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if the email already exists
        if email_exists(email):
            return jsonify({"error": "Email already exists"}), 409

        # Hash the password
        hashed_password = hash_password(password)

        # Create the user document
        user = {
            "name": name,
            "email": email,
            "password": hashed_password.decode(),  # Store as a string
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }

        # Insert the user into the database
        result = users_collection.insert_one(user)

        # Return a success response
        return jsonify({
            "message": "User created successfully",
            "user_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create function to get user data, excluding password
@app.route("/get-user", methods=["GET"])
def get_users():
    try:
        # Get the query parameters from the request body (for GET requests, use query parameters instead of JSON body)
        user_id = request.args.get("user_id")
        name = request.args.get("name")
        email = request.args.get("email")

        # Build the query based on the provided parameters
        query = {}
        if user_id:
            query["_id"] = ObjectId(user_id)  # Convert to ObjectId if searching by user_id
        if name:
            query["name"] = name
        if email:
            query["email"] = email

        # Ensure at least one parameter is provided
        if not query:
            return jsonify({"error": "No search parameters provided"}), 400

        # Search for the user in the database
        user =users_collection.find_one(query)

        # If user is not found, return a 404 response
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Convert ObjectId to string for JSON response
        user["_id"] = str(user["_id"])

        # Return the user data as JSON
        return jsonify(user), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#helper function to hash password
def hashed_password(password):
    # Create a SHA-256 hash of the password
    hashed = hashlib.sha256(password.encode()).hexdigest()
    return hashed

#function to update user data
@app.route('/update-users', methods=['PUT'])
def update_user():
    try:
        #Get the user_id from the URL
        user_id = request.args.get("user_id")

        #Get the data to update from the request body
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        #Construct the update query
        update_data = {}
        if name:
            update_data["name"] = name
        if email:
            update_data["email"] = email
        if password:
            update_data["password"] = hashed_password(password)  # Consider hashing the password

        result = users_collection.update_one({"user_id": ObjectId(user_id)}, {"$set": update_data})

        if result.matched_count == 0:
            return jsonify({"error"})

        return {"message": "User updated successfully"}, 200

    except Exception as e:
        return {"error": str(e)}, 500
    

#function to delete user data from DB
@app.route('/delete_users', methods=['DELETE'])
def delete_user(user_id):
    try:
        # Convert the user_id to ObjectId
        user_id = ObjectId(user_id)

        # Delete the user from the database
        result = users_collection.delete_one({"_id": user_id})

        # Check if a user was deleted
        if result.deleted_count == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Helper function to check if the user exists
def user_exists(user_id):
    return users_collection.find_one({"_id": ObjectId(user_id)}) is not None

# Add Pet Endpoint (POST)
# login -> '+' button
@app.route("/add-pet", methods=["POST"])
def add_pet():
    try:
        # Get data from the request
        data = request.get_json()
        pet_id = data.get("pet_id")
        user_id = data.get("user_id")
        name = data.get("name")
        age = data.get("age")
        weight = data.get("weight") 
        breed = data.get("breed")
        isdog = data.get("isdog")
        iscat = data.get("iscat")
        sex = data.get("sex")

        # Validate the input data
        if not user_id or not name or not age or not breed:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if the user exists
        if not user_exists(user_id):
            return jsonify({"error": "User not found"}), 404

        # Ensure `isdog` and `iscat` are boolean values
        if not isinstance(isdog, bool) or not isinstance(iscat, bool):
            return jsonify({"error": "`isdog` and `iscat` must be boolean values"}), 400

        # Ensure that only one of `isdog` or `iscat` is true
        if isdog == iscat:
            return jsonify({"error": "Either `isdog` or `iscat` must be true, but not both"}), 400

        # Create the pet document
        pet = {
            "pet_id": pet_id,
            "user_id": ObjectId(user_id),
            "name": name,
            "age": int(age),
            "sex": sex,
            "weight": float(weight),    
            "breed": breed,
            "isdog": isdog, #bool
            "iscat": iscat, #bool
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }

        # Insert the pet into the database
        result = pets_collection.insert_one(pet)

        # Return a success response
        return jsonify({
            "message": "Pet added successfully",
            "pet_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function to get pet data
@app.route("/get-pet", methods=["GET"])
def get_pet():
    try:
        pet_id = request.args.get("pet_id")
        if not pet_id:
            return jsonify({"error": "Missing pet_id"}), 400

        pet = pets_collection.find_one({"_id": ObjectId(pet_id)})
        if not pet:
            return jsonify({"error": "Pet not found"}), 404

        pet["_id"] = str(pet["_id"])
        pet["user_id"] = str(pet["user_id"])
        return jsonify(pet), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function that returns all the pets that a user has
#login -> Pets : have photos of pets as list
@app.route("/get-all-pets-for-users", methods=["GET"])
def get_all_pets_for_users():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        pets = list(pets_collection.find({"user_id": ObjectId(user_id)}))
        for pet in pets:
            pet["_id"] = str(pet["_id"])
            pet["user_id"] = str(pet["user_id"])

        return jsonify(pets), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#function to update data of a pet
# will be implemented
@app.route("/update-pet", methods=["PUT"])
def update_pet():
    try:
        data = request.get_json()
        pet_id = data.get("pet_id")
        update_data = data.get("update")

        if not pet_id or not update_data:
            return jsonify({"error": "Missing required fields"}), 400

        result = pets_collection.update_one(
            {"_id": ObjectId(pet_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Pet not found"}), 404

        return jsonify({"message": "Pet updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function to delete a pet's data
#Will be implemeneted
@app.route("/delete-pet", methods=["DELETE"])
def delete_pet():
    try:
        pet_id = request.args.get("pet_id")
        if not pet_id:
            return jsonify({"error": "Missing pet_id"}), 400

        result = pets_collection.delete_one({"_id": ObjectId(pet_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Pet not found"}), 404

        return jsonify({"message": "Pet deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function to store a prediction in DB
#dunno
@app.route("/create-prediction", methods=["POST"])
def create_prediction():
    try:
        data = request.get_json()
        pet_id = data.get("pet_id")
        predicted_height = data.get("predicted_height")
        predicted_weight = data.get("predicted_weight")
        confidence = data.get("confidence")

        if not pet_id or predicted_height is None or predicted_weight is None or confidence is None:
            return jsonify({"error": "Missing required fields"}), 400

        prediction = {
            "pet_id": ObjectId(pet_id),
            "predicted_height": predicted_height,
            "predicted_weight": predicted_weight,
            "confidence": confidence,
            "createdAt": datetime.utcnow()
        }

        result = predictions_collection.insert_one(prediction)
        return jsonify({"message": "Prediction created", "id": str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function that returns a chosen prediction
@app.route("/get-prediction", methods=["GET"])
def get_prediction():
    try:
        prediction_id = request.args.get("id")
        if not prediction_id:
            return jsonify({"error": "Missing prediction_id"}), 400

        prediction = predictions_collection.find_one({"_id": ObjectId(prediction_id)})
        if not prediction:
            return jsonify({"error": "Prediction not found"}), 404

        prediction["_id"] = str(prediction["_id"])
        prediction["pet_id"] = str(prediction["pet_id"])
        return jsonify(prediction), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function that updates the prediction data
@app.route("/update-prediction", methods=["PUT"])
def update_prediction():
    try:
        data = request.get_json()
        prediction_id = data.get("id")
        update_data = data.get("update")

        if not prediction_id or not update_data:
            return jsonify({"error": "Missing required fields"}), 400

        result = predictions_collection.update_one(
            {"_id": ObjectId(prediction_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Prediction not found"}), 404

        return jsonify({"message": "Prediction updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#function that deletes a stored prediction
@app.route("/delete-prediction", methods=["DELETE"])
def delete_prediction():
    try:
        prediction_id = request.args.get("id")
        if not prediction_id:
            return jsonify({"error": "Missing prediction_id"}), 400

        result = predictions_collection.delete_one({"_id": ObjectId(prediction_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Prediction not found"}), 404

        return jsonify({"message": "Prediction deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=6000)
