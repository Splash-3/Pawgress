import React, { useState } from 'react';
import RegistrationForm from '../GetStartedParts/Register';
import ImageUploadForm from '../GetStartedParts/ImageUpload';
// import "../styles/getstarted.css";

const GetStarted = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleBack = () => {
    setIsRegistered(false);
  };

  return (
    <div className="container mt-5">
      {!isRegistered ? (
        <RegistrationForm onRegister={handleRegister} />
      ) : (
        <ImageUploadForm onBack={handleBack} />
      )}
    </div>
  );
};

export default GetStarted;