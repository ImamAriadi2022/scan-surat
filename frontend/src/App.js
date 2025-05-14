import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/login';
import AdminPage from './pages/AdminPage';
import MahasiswaPage from './pages/MahasiswaPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/mahasiswa" element={<MahasiswaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;