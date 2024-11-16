# Navigate to the backend folder and start the Python app
echo "Starting Python backend..."
cd ./backend
python3 -m venv venv  # Create a virtual environment if needed
source venv/bin/activate  # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies

# Run the backend server on port 5001
flask --app app.py --debug run --port 5001