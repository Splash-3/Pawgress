import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadImage = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Load an image from a URL when the component mounts
    const loadImageFromURL = async () => {
        try {
            const response = await fetch("images/cat2.jpg");
            console.log(response);
            const blob = await response.blob();
            const initialFile = new File([blob], "default.jpg", { type: blob.type });
            setFile(initialFile);
        } catch (error) {
            console.error("Failed to load the default image:", error);
        }
    };

    loadImageFromURL();
  }, []);

  useEffect(() => {
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              console.log("File loaded");
              setImage(e.target.result);
              console.log(e.target.result);
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