import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/login');
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  return (
    <div>
      <div className="container-fluid" id="navContainer">
        <div className="row">
          <div className="col-md-3" id="logo">
            <h1 className="display-3" id="homeButton" onClick={() => navigate('/')}>Pawgress</h1>
          </div>
          <div className="col-md-6 d-flex justify-content-center" id="navbar">
            <div className="btn-group-lg" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-light btn-lg" onClick={handleUpload}>Service</button>
              <button type="button" className="btn btn-light btn-lg">FAQ</button>
              <button type="button" className="btn btn-light btn-lg">Contact Us</button>
            </div>
          </div>
          <div className="col-md-3" id="signLogin">
            <button type="button" className="btn btn-light btn-lg" onClick={handleSignUp}>SignUp</button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;