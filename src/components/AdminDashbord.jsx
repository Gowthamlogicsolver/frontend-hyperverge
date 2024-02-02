import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./AdminDashboard.css";
import image1 from "../assets/stats2.webp";
import image2 from "../assets/stats3.webp";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const URL = "http://localhost:8080/";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [election, setElection] = useState({});

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

      if (!voterData.isAdmin) {
        navigate("/main");
      }
    })();

    (async () => {
      const election = await fetch(URL + "election", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const electionData = await election.json();
      setElection(electionData);
      console.log(setElection);
    })();
    setIsLoading(true);
  }, []);

  const handleCreateElection = () => {
    navigate("/auth-form"); // Navigate to AuthForm.jsx
  };

  return (
    <>
      {isLoading ? (
        <>
          <NavBar />
          <div className="create-election-container">
            {election._id !== undefined ? (
              <h1>Election already created</h1>
            ) : (
              <button
                className="create-election-button"
                onClick={handleCreateElection}
              >
                CREATE ELECTION
              </button>
            )}
          </div>
          <div className="admin-dashboard">
            <div className="analytics-container">
              <img
                src={image2}
                alt="Previous Election"
                className="election-image"
              />
            </div>
            <div className="analytics-container">
              <img
                src={image2}
                alt="Previous Election"
                className="election-image"
              />
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default AdminDashboard;
