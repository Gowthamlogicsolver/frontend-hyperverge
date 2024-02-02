import React, { useState, useEffect } from "react";
import CandidateForm from "./CandidateForm";
import "./AuthForm.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8080/";

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [electionName, setElectionName] = useState("");
  const [electionDescription, setElectionDescription] = useState("");
  const [electionDate, setElectionDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [electionCreated, setElectionCreated] = useState(false);
  const [electionData, setElectionData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Route to InitialForm.jsx
      }
      const voter = await fetch(URL + "voter/getVoterByToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const voterData = await voter.json();
      console.log(voterData);

      if (!voterData.isAdmin) {
        navigate("/main");
      }
    })();

    async () => {
      const election = await fetch(URL + "election", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const electionData_ = await election.json();
      setElectionData(electionData_);

      if (electionData.error) {
        alert(electionData.error);
        return;
      }

      if (electionData._id) {
        setElectionCreated(true);
      }
    };
    setIsLoading(true);
  }, []);

  const handleAddCandidate = async (newCandidate) => {
    setCandidates([...candidates, newCandidate]);

    const res = await fetch(URL + "election/addCandidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: newCandidate.name,
        image: newCandidate.image,
        description: newCandidate.description,
      }),
    });

    const msg = await res.json();

    if (msg.error) {
      alert(msg.error);
      return;
    }
  };

  const handleCreateElection = async (e) => {
    e.preventDefault(); // Prevent form submission
    // Send election data to backend here

    console.log(startTime, endTime, electionDate);
    const st = `${electionDate}T${startTime}:00`;
    const et = `${electionDate}T${endTime}:00`;

    const res = await fetch(URL + "election", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: electionName,
        description: electionDescription,
        startTime: st,
        endTime: et,
      }),
    });

    const msg = await res.json();
    if (msg.error) {
      alert(msg.error);
      return;
    }

    setElectionCreated(true);
    alert("Election Created");
  };

  const handleHostElection = async () => {
    console.log("hello");
    const res = await fetch(URL + "election/host", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const msg = await res.json();
    if (msg.error) {
      alert(msg.error);
      return;
    }
    alert("Election Hosted");

    navigate("/admin"); // Navigate to AdminDashboard.jsx
  };

  return (
    <>
      {isLoading ? (
        <div className="auth-form-container">
          {!electionCreated ? (
            <form onSubmit={handleCreateElection}>
              <label htmlFor="election-form">
                <h2>ELECTION FORM</h2>
              </label>
              <input
                type="text"
                placeholder="Election Name"
                value={electionName}
                onChange={(e) => setElectionName(e.target.value)}
                required
              />
              <input
                type="textarea"
                placeholder="Election Description"
                value={electionDescription}
                onChange={(e) => setElectionDescription(e.target.value)}
                required
              />
              <label htmlFor="election-date">
                <h2>Election-Date</h2>
              </label>
              <input
                type="date"
                placeholder="Election Date"
                value={electionDate}
                onChange={(e) => setElectionDate(e.target.value)}
                required
              />
              <label htmlFor="election-start-time">
                <h2>Election-Start-TIme</h2>
              </label>
              <input
                type="time"
                placeholder="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <label htmlFor="election-end-time">
                <h2>Election-End-TIme</h2>
              </label>
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
              <p>
                <h1>ELECTION NAME: {electionName}</h1>
              </p>
              <CandidateForm onAddCandidate={handleAddCandidate} />
              <button
                className="host-election-button"
                onClick={handleHostElection}
              >
                Host Election
              </button>
            </div>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default AuthForm;
