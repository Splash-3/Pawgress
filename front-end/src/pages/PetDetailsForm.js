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
    sex: '',
    type: 'Cat' // Default value for the dropdown
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 'user_001'; // Replace with the actual user ID

    // Prepare the request payload
    const payload = {
      ...petDetails,
      user_id: userId
    };

    // Send POST request to Flask API
    try {
      const response = await fetch('http://localhost:6000/add-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Check if the pet was added successfully
      if (response.status === 201) {
        setMessage('Pet added successfully.');
        navigate('/dashboard');
      } else {
        setMessage(data.error || 'Failed to add pet.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enter Pet Details</h2>
      {message && <p className="text-center">{message}</p>}
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
          <label htmlFor="color" className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={petDetails.color}
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