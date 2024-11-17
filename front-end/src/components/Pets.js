import React from 'react';

const Pets = ({ data }) => {
  return (
    <div>
      <h2>Pets Component</h2>
      <ul>
        {data.pets.map((pet, index) => (
          <li key={index}>
            <p>Name: {pet.name}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
          </li>))}
      </ul>
    </div>
  );
};

export default Pets;