from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env file
load_dotenv()

# Retrieve the path to Firebase credentials from the environment variable
cred_path = os.getenv("KEYS")

if not cred_path:
    print("Error: Firebase credentials file path not found")
    exit(1)

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

app = Flask(__name__)
