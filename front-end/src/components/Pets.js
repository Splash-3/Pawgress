import React from 'react';
import mySVG from '../images/blackPlus.png';
import { useNavigate } from 'react-router-dom';

const Pets = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Pets Component</h2>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-light btn-lg navGroupButton" style={{ padding: '5px 10px', fontSize: '1rem' }} onClick={() => navigate('../upload')} title="Upload a new pet">
            <img src={mySVG} alt="Plus" draggable = "false" style={{ width: '16px', height: '16px' }}></img>
          </button> 
            <ul>
              {data.pets.map((pet, index) => (
                <li key={index}>
                  <p>Name: {pet.name}</p>
                  <p>Age: {pet.age}</p>
                  <p>Breed: {pet.breed}</p>
                </li>))}
            </ul>
        </div>

        </div>
    </div>
    
  );
};

export default Pets;

