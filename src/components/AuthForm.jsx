import React, { useState } from 'react';
import CandidateForm from './CandidateForm';
import './AuthForm.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [electionName, setElectionName] = useState('');
  const [electionDate, setElectionDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [electionCreated, setElectionCreated] = useState(false);
  const navigate = useNavigate();

  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  const handleCreateElection = (e) => {
    e.preventDefault(); // Prevent form submission
    // Send election data to backend here
    setElectionCreated(true);
  };

  const handleHostElection = () => {
    navigate('/admin'); // Navigate to AdminDashboard.jsx
  };

  return (
    <div className="auth-form-container">
      {!electionCreated ? (
        <form onSubmit={handleCreateElection}>
          <label htmlFor="election-form"><h2>ELECTION FORM</h2></label>
          <input
            type="text"
            placeholder="Election Name"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            required
          />
          <label htmlFor="election-date"><h2>Election-Date</h2></label>
          <input
            type="date"
            placeholder="Election Date"
            value={electionDate}
            onChange={(e) => setElectionDate(e.target.value)}
            required
          />
          <label htmlFor="election-start-time"><h2>Election-Start-TIme</h2></label>
          <input
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <label htmlFor="election-end-time"><h2>Election-End-TIme</h2></label>
          <input
            type="time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <button type="submit">Create Election</button>
        </form>
      ) : (
        <div className="election-created">
          <p><h1>ELECTION NAME: {electionName}</h1></p>
          <CandidateForm onAddCandidate={handleAddCandidate} />
          <button className="host-election-button" onClick={handleHostElection}>
            Host Election
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthForm;