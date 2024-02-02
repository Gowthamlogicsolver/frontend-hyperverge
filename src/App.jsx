// App.js
import React from 'react';
import Navbar from './components/navbar';
import PreviousElection from './components/previous_election';
import './App.css';

function App() {
  return (
    <div class="nav1">
      <Navbar />
      <PreviousElection />
      {/* Other components or content */}
    </div>
  );
}

export default App;
