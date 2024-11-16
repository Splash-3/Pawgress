import './App.css';
import cat1 from "./images/cat1.jpg"
import dog1 from "./images/dog1.jpg"
import dog2 from "./images/dog2.jpg"

function App() {
  return (
    <div id="return">
      <div class="container-fluid" id="navContainer">
        <div class="row">
          <div class="col-md-3" id="logo">
            <h1 class="display-3" id="homeButton">Pawgress</h1>
          </div>
          <div class="col-md-6 d-flex justify-content-center" id="navbar">
            <div class="btn-group-lg" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-light btn-lg">Service</button>
              <button type="button" class="btn btn-light btn-lg">FAQ</button>
              <button type="button" class="btn btn-light btn-lg">Contact Us</button>
            </div>
          </div>
          <div class="col-md-3" id="signLogin">
            <button type="button" class="btn btn-light btn-lg">SignUp</button>
          </div>
        </div>
      </div>

      <div class="container-fluid" id="descContainer">
        <div class="row">
          <div class="col-md-6" id="description">
            <p>
              Have you ever wondered how to give your pet the best care possible? 
              With Pawgress, all it takes is a simple picture of your pet! 
              Our intelligent platform uses cutting-edge technology to analyze your pet's photo and provide personalized insights into their breed, characteristics, and unique care needs. 
              Whether you’re a first-time pet owner or a seasoned animal lover, Pawgress is here to guide you every step of the way in ensuring a happy, healthy future for your furry companion.
            </p>
          </div>
          <div class="col-md-6" id="petImgs">
            <img src={cat1} class="img-fluid" alt="cat1"/>
          </div>
        </div>
        <div class="row">
        </div>
      </div>      
    </div>
  );
}

export default App;
