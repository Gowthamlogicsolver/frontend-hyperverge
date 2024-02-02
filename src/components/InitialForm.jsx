// InitialForm.jsx
import React, { useState } from 'react';
import './InitialForm.css'; // Import CSS file for styling

function InitialForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [signInMessage, setSignInMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user is admin and validate admin password if applicable
    if (isAdmin && adminPassword !== 'admin123') {
      setSignInMessage('Incorrect admin password');
      return;
    }
    // Handle sign-in logic (e.g., send data to backend)
    // Here, you can replace the console.log with your actual sign-in logic
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Is Admin:', isAdmin);
    // Reset form fields
    setEmail('');
    setPassword('');
    setIsAdmin(false);
    setAdminPassword('');
    setSignInMessage('');
  };

  return (
    <div className="initial-form-container">
      <h2>REGISTER</h2>
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
        <button type="submit">Sign In</button>
        {signInMessage && <p className="error-message">{signInMessage}</p>}
      </form>
    </div>
  );
}

export default InitialForm;
