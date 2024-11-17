import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Pets from './Pets';
import Settings from './Settings';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');
  const [data, setData] = useState({
    fullName: '',
    email: '',
    pets: [],
    settings: {}
  });

  useEffect(() => {
    // Fetch data from the database and update the state
    const fetchData = async () => {
      try {
        const userId = 'user_001'; // Replace with the actual user ID
        const response = await fetch(`/api/data/${userId}`);
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile data={data} />;
      case 'pets':
        return <Pets data={data.pets} />;
      case 'settings':
        return <Settings data={data.settings} />;
      default:
        return <Profile data={data} />;
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Area with Buttons */}
        <div className="col-md-3 bg-light d-flex flex-column align-items-start p-3">
          <button className="btn btn-primary mb-2 w-100" onClick={() => setActiveComponent('profile')}>Profile</button>
          <button className="btn btn-primary mb-2 w-100" onClick={() => setActiveComponent('pets')}>Pets</button>
          <button className="btn btn-primary mb-2 w-100" onClick={() => setActiveComponent('settings')}>Settings</button>
        </div>
        
        {/* Right Area */}
        <div className="col-md-9 bg-white p-3">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;