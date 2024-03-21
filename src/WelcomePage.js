// WelcomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/WelcomePage.css'; // Import the CSS module

function WelcomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      sessionStorage.setItem('userName', name); // Store the name in sessionStorage
      navigate('/bingo'); // Navigate to the BingoBoard page
    }
  };

  return (
    <div className="welcomeScreen">
      <h1>Willkommen bei Bingo!</h1>
      <p>Bitte geben Sie Ihren Namen ein:</p>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Vorname"
          className="input"
        />
        <button type="submit" className="button">Los</button>
      </form>
    </div>
  );
}

export default WelcomePage;
