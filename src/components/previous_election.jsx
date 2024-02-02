// PreviousElection.jsx
import React from 'react';
import './previous_election.css'; // Import CSS file for styling
import image from '../assets/stats2.webp';

function PreviousElection() {
  return (
    <div className="previous-election-container">
      <div className="image-column">
        <img src={image} alt="Previous Election" className="election-image" />
      </div>
      <div className="content-column">
        <div className="content">
          <h2>Previous Election</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac malesuada ligula. Sed vitae lectus elit. Mauris consectetur ultricies purus at sodales.</p>
        </div>
      </div>
    </div>
  );
}

export default PreviousElection;
