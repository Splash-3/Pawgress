import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (selectedImage) {
      navigate('/pet-details');
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("File loaded");
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div>
      <h2 className="text-center mb-4">Upload a Picture</h2>
      <div className="mb-3">
        <input 
          type="file" 
          className="form-control" 
          onChange={handleImageChange} 
        />
      </div>
      {selectedImage && (
        <div className="text-center">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="img-fluid mt-3" 
            style={{ maxHeight: '300px' }} 
          />
        </div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Dashboard</button>
        <button 
          className="btn btn-primary ml-2" 
          onClick={handleNext} 
          disabled={!selectedImage} // Disable the button if no image is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadImage;