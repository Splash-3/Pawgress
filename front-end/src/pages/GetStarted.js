import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "../styles/getstarted.css";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Get Started with Pawgress</h2>
      <p className="text-center">
        Welcome to the Get Started page! Here you can find information to help you get started with Pawgress.
      </p>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleBack}>Back to Home</button>
      </div>
    </div>
  );
};

export default GetStarted;