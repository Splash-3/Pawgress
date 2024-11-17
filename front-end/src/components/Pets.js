import React from 'react';
import mySVG from '../images/blackPlus.png';
import { useNavigate } from 'react-router-dom';

const Pets = ({ data, onDeletePet }) => {
  const navigate = useNavigate();

  const handleDeletePet = (petId) => {
    // Call the onDeletePet function passed as a prop
    onDeletePet(petId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Pets Component</h2>
        </div>
        <div className="col-md-2">
          <button 
            type="button" 
            className="btn btn-light btn-lg navGroupButton" 
            style={{ padding: '5px 10px', fontSize: '1rem' }} 
            onClick={() => navigate('../upload')}
            title="Upload a new pet"
          >
            <img 
              src={mySVG} 
              alt="Plus" 
              draggable="false" 
              style={{ width: '16px', height: '16px' }}
            />
          </button>
        </div>
      </div>
      <ul>
        {data.pets.map((pet, index) => (
          <li key={index}>
            <p>Name: {pet.name}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Weight: {pet.weight}</p>
            <p>Sex: {pet.sex}</p>
            {pet.photo && (
              <div>
                <p>Photo:</p>
                <img 
                  src={pet.photo} 
                  alt={`${pet.name}'s photo`} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              </div>
            )}
            <button 
              type="button" 
              className="btn btn-danger mt-2" 
              onClick={() => handleDeletePet(pet.id)}
            >
              Delete Pet
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;