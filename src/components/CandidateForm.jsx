// CandidateForm.jsx
import React, { useState } from "react";

function CandidateForm({ onAddCandidate }) {
  const [partyName, setPartyName] = useState("");
  const [symbol, setSymbol] = useState(null);
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      name: partyName,
      image: image,
      description: description,
    };
    onAddCandidate(newCandidate);
    setPartyName("");
    setSymbol(null);
    setDescription("");
  };
  const convertToBase64 = (e) => {
    const reader = new FileReader();
    setSymbol(e.target.files[0]);
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
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
        <label htmlFor="symbol">
          <h2>Symbol</h2>
        </label>
        <input
          className="browse"
          type="file"
          id="symbol"
          accept="image/png, image/jpeg"
          onChange={convertToBase64}
          required
        />
        <label htmlFor="candidate-desc">
          <h2>Candidate-Description</h2>
        </label>
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
