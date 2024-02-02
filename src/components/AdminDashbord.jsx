import React from 'react';
import NavBar from './navbar';
import './AdminDashboard.css';
import image1 from '../assets/stats2.webp';
import image2 from '../assets/stats3.webp';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminDashboard() {
  const navigate = useNavigate();

  const handleCreateElection = () => {
    navigate('/auth-form'); // Navigate to AuthForm.jsx
  };

  return (
    <>
      <NavBar />
      <div className="create-election-container">
        <button className="create-election-button" onClick={handleCreateElection}>
          CREATE ELECTION
        </button>
      </div>
    <div className="admin-dashboard">
      <div className="analytics-container">
        <img src={image2} alt="Previous Election" className="election-image" />
      </div>
      <div className="analytics-container">
        <img src={image2} alt="Previous Election" className="election-image" />
      </div>
      
    </div>
    
    </>
  );
}

export default AdminDashboard;
