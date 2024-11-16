import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  const handleGetStarted = () => {
    setShowIntro(false);
    navigate('/get-started'); // Update this path to the correct route if needed
  };

  return (
    <div>
      {showIntro && (
        <div className="container" id="descContainer">
          <div className="row" id="background-img">
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center background-overlay" id="description">
              <p className="fw-bold fs-3 description-text" id="text">
                Have you ever wondered how to give your pet the best care possible? 
                With Pawgress, all it takes is a simple picture of your pet! 
                Pawgress is here to guide you every step of the way in ensuring a happy, healthy future for your furry companion.
              </p>
              <button type="button" className="btn btn-light btn-lg navGroupButton mt-5" onClick={handleGetStarted}>Get Started</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <hr className="line1"></hr>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;