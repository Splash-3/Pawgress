import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import Upload from './pages/UploadImage';
import Landing from './pages/Landing';
import Layout from './pages/Layout';

import cat1 from "./images/cat1.jpg"
import dog1 from "./images/dog1.jpg"
import dog2 from "./images/dog2.jpg"

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