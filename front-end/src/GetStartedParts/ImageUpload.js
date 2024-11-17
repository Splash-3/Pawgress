import React, { useState } from 'react';

const ImageUploadForm = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

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
        <button className="btn btn-secondary" onClick={onBack}>Back to Registration</button>
      </div>
    </div>
  );
};

export default ImageUploadForm;