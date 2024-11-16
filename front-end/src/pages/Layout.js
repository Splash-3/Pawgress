import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import "../styles/landing.css";

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
            <h1 className="display-3 fw-bold pointer" id="homeButton" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} >Pawgress</h1>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center" id="navbar">
            <div className="btn-group-lg" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-light btn-lg" onClick={handleUpload}>Service</button>
              <button type="button" className="btn btn-light btn-lg">FAQ</button>
              <button type="button" className="btn btn-light btn-lg">Contact Us</button>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-end align-items-center" id="signLogin">
            <button type="button" className="btn btn-light btn-lg" onClick={handleSignUp}>SignUp</button>
          </div>
          <div className="row">
            <div class="col-sm-12 d-flex justify-content-center">
              <hr className="line1"></hr>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;