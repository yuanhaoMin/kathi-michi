import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './style/BingoBoard.css';
import Toast from './Toast.js';
import Popup from './Popup.js';
import questions from './data/Questions.js';
import userNames from './data/Users.js';

function BingoBoard() {
  const [squares, setSquares] = useState(() => {
    const storedSquares = sessionStorage.getItem('squares');
    const initialSquares = new Array(25).fill().map((_, index) => ({
      clicked: false,
      special: index === 12,
      question: index === 12 ? null : questions[index < 12 ? index : index - 1],
      name: '',
    }));

    return storedSquares ? JSON.parse(storedSquares) : initialSquares;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const storedName = sessionStorage.getItem('userName');

  useEffect(() => {
    sessionStorage.setItem('squares', JSON.stringify(squares));
    // Check if all squares (except the special one) have been clicked and names entered
    const allFilled = squares.every((square, index) => square.special || (square.clicked && square.name));
    setIsSubmitEnabled(allFilled);
  }, [squares]);

  if (!storedName) {
    return <Navigate to="/" />;
  }

  const handleClick = (index) => {
    if (squares[index].special) return;
    setCurrentQuestion(squares[index].question);
    setIsModalOpen(true);
    // Pass the current name to the Popup component
    setCurrentName(squares[index].name); // Add this state variable and setter if not already present
  };

  const handleModalClose = (answer) => {
    if (answer) {
      setSquares((prevSquares) =>
        prevSquares.map((square, idx) =>
          square.question === currentQuestion
            ? { ...square, clicked: true, name: answer }
            : square
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const choices = squares
      .filter(square => square.clicked && !square.special)
      .map(square => square.name)
      .join(', ');
  
    const payload = {
      userName: storedName,
      choices: choices
    };
  
    try {
      // Perform the POST request
      const response = await fetch('https://wedding-quiz.azurewebsites.net/user-choices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        setToastMessage('Erfolgreich gesendet!');
        setShowToast(true);
        // Disable further submissions
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit choices. Status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting choices:', error);
    }
  };
  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.clicked ? 'clicked' : ''} ${square.special ? 'special' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.special ? '♥' : square.clicked ? square.name.substring(0, 3) : '?'}
        </div>
      ))}
      <button
        className={`submit-button ${!isSubmitEnabled && isSubmitted? 'disabled' : ''}`}
        onClick={handleSubmit}
        disabled={!isSubmitEnabled || isSubmitted}
      >
        Absenden
      </button>
      {isModalOpen && <Popup question={currentQuestion} currentName={currentName} onClose={handleModalClose} userNames={userNames} usedNames={squares.filter(square => square.clicked).map(square => square.name)} />}
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default BingoBoard;