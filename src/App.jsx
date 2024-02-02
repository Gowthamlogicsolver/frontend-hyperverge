import React from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/navbar';
import MainLanding from './components/MainLanding';
import InitialForm from './components/InitialForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashbord';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialForm />} />
        <Route path="/main" element={<MainLanding />} /> // Corrected path
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth-form" element={<AuthForm />} />
        {/* Add a route for AdminDashboard if needed */}
      </Routes>
    </Router>
  );
}

export default App;
