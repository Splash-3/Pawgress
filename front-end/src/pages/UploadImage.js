import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate('/pet-details');
  };

  useEffect(() => {
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              console.log("File loaded");
              setImage(e.target.result);
              // console.log(e.target.result);
          };
          reader.readAsDataURL(file);
      }
  }, [file]);

  useEffect(() => {
      if (image) {
          fetch("/api/analyse-image", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  "image": image,
              }),
          }).then(response => {
              if (!response.ok) {
                  console.error(response)
                  console.error("Network response was not ok " + response.statusText);
              }
              return response.json();
          })
              .then(data => {
                  console.log("Success:", data);
                  setData(data);
              })
              .catch(error => {
                  console.error("Error:", error);
              })
              .finally(() => {
                  console.log("Request completed.");
                  
              });
          setData({});
      }
  }, [image]);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
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
              onChange={handleFileChange} 
            />
          </div>
          {image && (
            <div className="text-center">
              <img 
                src={image} 
                alt="Selected" 
                className="img-fluid mt-3" 
                style={{ maxHeight: '300px' }} 
              />
            </div>
          )}
          <div className="text-center mt-4">
            {/* <button className="btn btn-secondary" onClick={onBack}>Back to Registration</button> */}
            <button className="btn btn-primary ml-2" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;