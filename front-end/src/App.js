import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import Upload from './pages/UploadImage';
import Landing from './pages/Landing';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/GetStarted';
import PetDetailsForm from './pages/PetDetailsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="upload" element={<Upload />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="pet-details" element={<PetDetailsForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;