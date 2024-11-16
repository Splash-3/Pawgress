import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="container-fluid" id="descContainer">
          <div className="row">
            <div className="col-md-6" id="description">
              <p>
                Have you ever wondered how to give your pet the best care possible? 
                With Pawgress, all it takes is a simple picture of your pet! 
                Our intelligent platform uses cutting-edge technology to analyze your pet's photo and provide personalized insights into their breed, characteristics, and unique care needs. 
                Whether you’re a first-time pet owner or a seasoned animal lover, Pawgress is here to guide you every step of the way in ensuring a happy, healthy future for your furry companion.
              </p>
            </div>
            <div className="col-md-6" id="petImgs">
              {/* Add your pet images or content here */}
            </div>
          </div>
          <div className="row">
            {/* Additional content can go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;