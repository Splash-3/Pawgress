import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Upload Image</h2>
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
        </div>
      </div>
    </div>
  );
};

export default UploadImage;