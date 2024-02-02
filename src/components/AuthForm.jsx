// AuthForm.jsx
import React, { useState } from 'react';
import CandidateForm from './CandidateForm';
import './AuthForm.css'; 

function AuthForm() {
  const [electionName, setElectionName] = useState('');
  const [electionDate, setElectionDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [candidates, setCandidates] = useState([]);

  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Election Name:', electionName);
    console.log('Election Date:', electionDate);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Candidates:', candidates);
    // Clear form fields after submission
    setElectionName('');
    setElectionDate('');
    setStartTime('');
    setEndTime('');
    setCandidates([]);
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Election Name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Election Date"
          value={electionDate}
          onChange={(e) => setElectionDate(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <div className="candidates-list">
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate">
              <h3>{candidate.partyName}</h3>
              <p>{candidate.description}</p>
              <img src={URL.createObjectURL(candidate.symbol)} alt="Symbol" />
            </div>
          ))}
        </div>
        <CandidateForm onAddCandidate={handleAddCandidate} />
        <button type="submit">Host Election</button>
      </form>
    </div>
  );
}

export default AuthForm;
