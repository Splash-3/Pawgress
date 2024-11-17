import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetDetailsForm = () => {
  const navigate = useNavigate();
  const [petDetails, setPetDetails] = useState({
    name: '',
    age: '',
    breed: '',
    weight: '',
    color: '',
    sex: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Pet Details:', petDetails);
    // Navigate to another page or show a success message
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enter Pet Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={petDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={petDetails.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="breed" className="form-label">Breed</label>
          <input
            type="text"
            className="form-control"
            id="breed"
            name="breed"
            value={petDetails.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            value={petDetails.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sex" className="form-label">Sex</label>
          <input
            type="text"
            className="form-control"
            id="sex"
            name="sex"
            value={petDetails.sex}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={petDetails.type}
            onChange={handleChange}
            required
          >
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
          </select>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PetDetailsForm;