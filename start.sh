#!/bin/bash

# Navigate to the frontend folder and start the React app
echo "Starting React frontend..."
cd front-end
npm install  # Ensures dependencies are installed
npm install react-scripts
npm install react-router-dom
npm install bootstrap@5
npm install http-proxy-middleware
npm start &  # Run the React app in the background

# Navigate to the backend folder and start the Python app
echo "Starting Python backend..."
cd ../backend
python3 -m venv venv  # Create a virtual environment if needed
source venv/bin/activate  # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies
python app.py  # Run the backend server
