// AdminDashboard.jsx
import React from 'react';
import NavBar from './navbar'; // Importing the navigation bar component
import './AdminDashboard.css'; // Import CSS file for styling
import image1 from '../assets/stats2.webp';
import image2 from '../assets/stats3.webp';

function AdminDashboard() {
  return (
    <>
    <NavBar />
    <div className="create-election-container">
        <button className="create-election-button">CREATE ELECTION</button>
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
