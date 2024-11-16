from flask import Flask
from routes.users_routes import user_bp
from routes.pets_routes import pet_bp
from routes.predictions_routes import prediction_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(pet_bp)
app.register_blueprint(prediction_bp)

# Test route
@app.route("/", methods=["GET"])
def index():
    return "Firebase and Firestore are set up successfully!"

if __name__ == "__main__":
    app.run(debug=True)
