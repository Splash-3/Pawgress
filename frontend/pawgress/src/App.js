import './App.css';

function App() {
  return (
    <div class="container-fluid" id="navContainer">
      <div class="row">
        <div class="col-md-3" id="logo">
            <h1>Pawgress</h1>
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
  );
}

export default App;
