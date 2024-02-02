import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InitialForm.css';

function InitialForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [signInMessage, setSignInMessage] = useState('');
  const navigate = useNavigate(); // Use the navigate hook from react-router-dom

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check admin credentials
    if (isAdmin) {
      if (adminPassword === 'admin@123') {
        navigate('/admin'); // Route to AdminDashboard.jsx
      } else {
        setSignInMessage('Wrong admin credentials');
      }
    } else {
      navigate('/main'); // Route to MainLanding.jsx
    }

    // Reset form fields (after navigation logic)
    setEmail('');
    setPassword('');
    setIsAdmin(false);
    setAdminPassword('');
    setSignInMessage('');
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
          <label htmlFor="isAdmin"><h3>Are you an admin?</h3></label>
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
        <button type="submit" >Sign In</button>
      </form>
    </div>
  );

        }
export default InitialForm;
