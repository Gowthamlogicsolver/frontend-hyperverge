import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InitialForm.css";

const URL = "http://localhost:8080/";

function InitialForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const navigate = useNavigate(); // Use the navigate hook from react-router-dom

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(URL + "voter/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const msg = await res.json();
    if (msg.error) {
      alert(msg.error);
      return;
    }
    localStorage.setItem("token", msg.token);

    if (msg.error) {
      setSignInMessage(msg.error);
    }

    // Check admin credentials
    if (isAdmin) {
      if (adminPassword === "admin@123") {
        const res = await fetch(URL + "voter/isVoterAdmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const msg = await res.json();
        if (msg.isAdmin) {
          navigate("/admin"); // Route to AdminDashboard.jsx
        } else {
          alert("You are not an admin");
        }
      } else {
        setSignInMessage("Wrong admin credentials");
      }
    } else {
      navigate("/main"); // Route to MainLanding.jsx
    }

    // Reset form fields (after navigation logic)
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setAdminPassword("");
    setSignInMessage("");
  };

  return (
    <div className="initial-form-container">
      <h2>SIGN IN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="admin-checkbox">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="isAdmin">
            <h3>Are you an admin?</h3>
          </label>
        </div>
        {isAdmin && (
          <input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
export default InitialForm;
