import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:6000/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Image uploaded successfully.');
          navigate('/pet-details', { state: { imageUrl: data.filename } });
        } else {
          setMessage(data.error || 'Failed to upload image.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Upload a Picture</h2>
      {message && <p className="text-center">{message}</p>}
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
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Registration</button>
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