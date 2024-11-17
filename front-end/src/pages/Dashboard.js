import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../components/Profile';
import Pets from '../components/Pets';
import Settings from '../components/Settings';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'pets':
        return <Pets />;
      case 'settings':
        return <Settings />;
      default:
        return <Profile />;
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