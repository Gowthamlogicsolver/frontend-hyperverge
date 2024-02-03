// MainLanding.jsx
import React, { useEffect, useState } from "react";
import image from "../assets/stats2.webp";
import NavBar from "./navbar";
import "./MainLanding.css";
import { Link, useNavigate } from "react-router-dom";
const URL = "http://localhost:8080/";

function MainLanding() {
  const navigate = useNavigate();
  let [voter, setVoter] = useState({});
  let [hasVoted, setHasVoted] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [electionData, setElectionData] = useState({});

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Route to InitialForm.jsx
      }
      const res = await fetch(URL + "voter/getVoterByToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const vot = await res.json();
      console.log(vot);
      setVoter(vot);
    })();

    (async () => {
      const r = await fetch(URL + "voter/getVoterByMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ email: voter.email }),
      });

      const voterr = await r.json();

      setHasVoted(voterr.hasVoted);
    })();
    (async () => {
      const res = await fetch(URL + "election", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setElectionData(data);
      setIsLoading(true);
    })();
    console.log(isLoading);
  }, []);

  const handleVoteNow = async (e) => {
    const email = voter.email;

    const res = await fetch(URL + "voter/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }),
    });
    const msg = await res.json();
    if (msg.error) {
      alert(msg.error);
      return;
    }
    setHasVoted(true);
    alert("Message has been sent to your mail");
  };
  return (
    <>
      {isLoading ? (
        <>
          <NavBar />
          <div className="election-info-container">
            <h1>Election Name: {electionData.name}</h1>
            <p>Election Description: {electionData.description}</p>
            <ul>
              {electionData.candidates.map((candidate, index) => {
                return (
                  <li key={index}>
                    <img
                      src={candidate.imgUrl}
                      alt={candidate.name}
                      className="profile-pic"
                    />
                    <h3>Name: {candidate.name}</h3>
                    <p>Description: {candidate.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="votenow-container">
            <div>
              See how you're votes gets Stored:{" "}
              <a
                href="https://sepolia.etherscan.io/address/0x79866015cEb447c7827790830c3458C389FF1c39#code"
                target="_blank"
              >
                Click here
              </a>
            </div>
            {!hasVoted ? (
              <button className="votenow-button" onClick={handleVoteNow}>
                VOTE NOW
              </button>
            ) : (
              <h1>Voted</h1>
            )}
            {/* <Link to="/vote" className="votenow-button">
              VOTE NOW
            </Link> */}
          </div>
          <div className="previous-election-container">
            <div className="image-column">
              <img
                src={image}
                alt="Previous Election"
                className="election-image"
              />
            </div>
            <div className="content-column">
              <div className="content">
                <h2>Previous Election</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  ac malesuada ligula. Sed vitae lectus elit. Mauris consectetur
                  ultricies purus at sodales.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default MainLanding;
