// WelcomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css'; // Import the CSS module

function WelcomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      sessionStorage.setItem('bingoName', name); // Store the name in sessionStorage
      navigate('/bingo'); // Navigate to the BingoBoard page
    }
  };

  return (
    <div className={styles.welcomeScreen}>
      <h1>Welcome to Bingo!</h1>
      <p>Please enter your name to start:</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default WelcomePage;
