import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  const handleSignUp = () => {
    setShowIntro(false);
    navigate('/login');
  };

  return (
    <div id="return">
      <div className="container-fluid" id="navContainer">
        <div className="row">
          <div className="col-md-3" id="logo">
            <h1>Pawgress</h1>
          </div>
          <div className="col-md-6 d-flex justify-content-center" id="navbar">
            <div className="btn-group-lg" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-light btn-lg">Service</button>
              <button type="button" className="btn btn-light btn-lg">FAQ</button>
              <button type="button" className="btn btn-light btn-lg">Contact Us</button>
            </div>
          </div>
          <div className="col-md-3" id="signLogin">
            <button type="button" className="btn btn-light btn-lg" onClick={handleSignUp}>SignUp</button>
          </div>
        </div>
      </div>

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

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;