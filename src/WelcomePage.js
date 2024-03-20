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
      sessionStorage.setItem('userName', name); // Store the name in sessionStorage
      navigate('/bingo'); // Navigate to the BingoBoard page
    }
  };

  return (
    <div className={styles.welcomeScreen}>
      <h1>Willkommen bei Bingo!</h1>
      <p>Um zu beginnen, bitte geben Sie Ihren Nachnamen ein:</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Nachname"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default WelcomePage;
