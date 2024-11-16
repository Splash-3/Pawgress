import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import "../styles/getstarted.css";

const GetStarted = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Set the state to show the image upload form
    setIsRegistered(true);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleBack = () => {
    setIsRegistered(false); // Move back to the registration form
  };

  return (
    <div className="container mt-5">
      {!isRegistered ? (
        <>
          <h2 className="text-center mb-4">Register with Pawgress</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={handleBack}>Back to Home</button>
          </div>
        </>
      ) : (
        <>
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
            <button className="btn btn-secondary" onClick={handleBack}>Back to Registration</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GetStarted;