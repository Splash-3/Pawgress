import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetDetailsForm = () => {
  const navigate = useNavigate();
  const [petDetails, setPetDetails] = useState({
    name: '',
    age: '',
    weight: '',
    sex: '',
    breed: '',
    animalType:''

  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError('');
    setSuccess('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Pet Details:', petDetails);
    // Navigate to another page or show a success message
  };

    try {
      // User ID (you can get this from the user's session or state)
      const userId = "user_001"; // Replace with the actual user ID

      // Prepare the request payload, including breed and animal type
      const payload = {
        ...petDetails,
        user_id: userId
      };

      // Send POST request to Flask API
      const response = await fetch('http://localhost:5000/add-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse the response
      const data = await response.json();

      // Check if the pet was added successfully
      if (response.status === 201) {
        setSuccess('Pet added successfully!');
        console.log('Pet ID:', data.pet_id);
        // Navigate to the pets list or another page
        navigate('/pets');
      } else {
        setError(data.error || 'Failed to add pet');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
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
          <label htmlFor="breed" className="form-label">Breed</label>
          <input
            type="text"
            className="form-control"
            id="breed"
            name="breed"
            value={petDetails.sex}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={petDetails.sex}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PetDetailsForm;