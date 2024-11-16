# Navigate to the backend folder and start the Python app
echo "Starting Python backend..."
cd ./backend
python3 -m venv venv  # Create a virtual environment if needed
source venv/bin/activate  # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies

# Run the backend server on port 6000
flask --app app.py --debug run --port 6000