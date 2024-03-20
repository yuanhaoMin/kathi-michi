import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import questions from './data/Questions.js';
import userNames from './data/Users.js';
import Popup from './Popup.js';
import './style/BingoBoard.css';

function BingoBoard() {
  const [squares, setSquares] = useState(() => {
    // Attempt to load existing square data from session storage
    const storedSquares = sessionStorage.getItem('squares');
    const initialSquares = new Array(25).fill().map((_, index) => ({
      clicked: false,
      special: index === 12,
      question: index === 12 ? null : questions[index < 12 ? index : index - 1],
      name: '', // Field to store the name
    }));
    
    return storedSquares ? JSON.parse(storedSquares) : initialSquares;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const storedName = sessionStorage.getItem('userName');

  // useEffect to update session storage; now correctly placed at the top level
  useEffect(() => {
    sessionStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);

  // Redirect if no storedName, handled using useEffect
  useEffect(() => {
    if (!storedName) {
      // Code to redirect or update state to trigger redirect
      // This example shows a potential approach if you want to conditionally render <Navigate>
      // You might need to adjust this based on your routing setup
    }
  }, [storedName]); // Dependency on storedName to re-check on its update

  if (!storedName) {
    return <Navigate to="/" />;
  }

  const handleClick = (index) => {
    if (squares[index].special) return;
    setCurrentQuestion(squares[index].question);
    setIsModalOpen(true);
  };

  const handleModalClose = (answer) => {
    if (answer) {
      setSquares((prevSquares) =>
        prevSquares.map((square, idx) =>
          square.question === currentQuestion
            ? { ...square, clicked: true, name: answer } // Update the corresponding square
            : square
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.clicked ? 'clicked' : ''} ${square.special ? 'special' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.special ? '★' : square.clicked ? square.name.charAt(0) : '?'}
        </div>
      ))}
      <button className="rules-button">Rules</button>
      {isModalOpen && <Popup question={currentQuestion} onClose={handleModalClose} userNames={userNames}/>}
    </div>
  );
}

export default BingoBoard;
