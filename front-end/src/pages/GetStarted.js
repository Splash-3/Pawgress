import React, { useState } from 'react';
import SS from "../images/registerSS.png"
import Arrow from "../images/arrow.png"
import "../styles/get-started.css";

const GetStarted = () => {
  // State to track arrow position
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [count, setCount] = useState(0)

  const moveArrow = (event) => {
    // Get the click position relative to the container
    setCount(count + 1);
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const newTop = ((event.clientY - rect.top) / rect.height) * 100;
    const newLeft = ((event.clientX - rect.left) / rect.width) * 100;

    // Update state with new positions
    setPosition({ top: newTop, left: newLeft });
  }; 

  return (
    <div className="container" onClick={moveArrow} style={{
      '--arrow-top': `${position.top}%`, // Set the CSS variable for top
      '--arrow-left': `${position.left}%`, // Set the CSS variable for left
    }}>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
        <p>
        {count === 1
          ? "Please Enter Your Full Name"
          : count === 2
          ? "Please Enter A Valid Email Address"
          : count === 3
          ? "Please Enter A Valid Password"
          : count === 4
          ? "Please Re-enter The Password You Just Typed"
          : count === 5
          ? "Please Click On the Register Button"
          : ""}
      </p> 
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <img src={SS} class="img-fluid" alt="RegisterSS"></img>
        </div>
        <img src={Arrow} className="arrow" alt="Arrow"></img>
      </div>
    </div>
  );
};  

export default GetStarted;
