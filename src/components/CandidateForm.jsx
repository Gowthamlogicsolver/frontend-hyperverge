// CandidateForm.jsx
import React, { useState } from 'react';

function CandidateForm({ onAddCandidate }) {
  const [partyName, setPartyName] = useState('');
  const [symbol, setSymbol] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      partyName,
      symbol,
      description
    };
    onAddCandidate(newCandidate);
    setPartyName('');
    setSymbol(null);
    setDescription('');
  };

  return (
    <div className="candidate-form">
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          required
        />
        <label htmlFor="symbol">Symbol:</label>
        <input
          type="file"
          id="symbol"
          accept="image/png, image/jpeg"
          onChange={(e) => setSymbol(e.target.files[0])}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateForm;
