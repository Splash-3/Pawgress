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
              {data.pets.map((pets, index) => (
                <li key={index}>
                  <p>Name: {pets.name}</p>
                  <p>Age: {pets.age}</p>
                  <p>Breed: {pets.breed}</p>
                  <p>Weight: {pets.weight}</p>
                  <p>Sex: {pets.sex}</p>
                  {pets.photo && (
                    <div>
                      <p>Photo:</p>
                      <img 
                        src={pets.photo} 
                        alt={`${pets.name}'s photo`} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </li>))}
            </ul>
        </div>

        </div>
    </div>
    
  );
};

export default Pets;

