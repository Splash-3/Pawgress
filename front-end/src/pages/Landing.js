import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cat1 from "../images/cat1.jpg"
// import dog1 from "../images/dog1"
// import dog2 from "../images/dog2"
import "../styles/landing.css"

const Landing = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  const handleSignUp = () => {
    setShowIntro(false);
    navigate('/login');
  };

  const handleUpload = () => {
    setShowIntro(false);
    navigate('/upload');
  };

  return (
    <div>
      {showIntro && (
        <div className="container" id="descContainer">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center" id="description">
              <p >
                Have you ever wondered how to give your pet the best care possible? 
                With Pawgress, all it takes is a simple picture of your pet! 
                Our intelligent platform uses cutting-edge technology to analyze your pet's photo and provide personalized insights into their breed, characteristics, and unique care needs. 
                Whether you’re a first-time pet owner or a seasoned animal lover, Pawgress is here to guide you every step of the way in ensuring a happy, healthy future for your furry companion.
              </p>
            </div>
            <div className="col-md-6" id="petImgs">
              <img src={cat1} class="img-fluid" alt="cat1"/>
            </div>
          </div>
          <div className="row">
            <div class="col-sm-12 d-flex justify-content-center">
                <hr className="line1"></hr>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;