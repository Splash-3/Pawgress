import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../components/Profile';
import Pets from '../components/Pets';
import Settings from '../components/Settings';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');
  const [data, setData] = useState({
    fullName: '',
    email: '',
    pets: [],
    settings: {}
  });

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile data={data} />;
      case 'pets':
        return <Pets data={data}/>;
      case 'settings':
        return <Settings data={data}/>;
      default:
        return <Profile data={data} />;
    }
  };

  // useEffect(() => {
  //   // whenever data changes, this will run
  //   console.log('Data:', data);
  //   setFullName(data.fullName);
  //   setEmail(data.email);
    
  // }, [data]);

  useEffect(() => {
    // Fetch data from the database and update the state
    const fetchData = async () => {
      // Replace with your actual data fetching logic
      const fetchedData = await fetch('/api/data').then(res => res.json());
      setData(fetchedData);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   // This will run whenever data changes
  //   console.log('Data:', data);
  // }, [data]);

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