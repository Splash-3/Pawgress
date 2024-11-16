import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import Upload from './pages/UploadImage';
import Landing from './pages/Landing';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;