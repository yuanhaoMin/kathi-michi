// BingoBoard.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import questions from './data/Questions.js';
import userNames from './data/Users.js';
import Popup from './Popup.js';
import './style/BingoBoard.css';

function BingoBoard() {
  const [squares] = useState(() => {
    const initialSquares = new Array(25).fill().map((_, index) => ({
      clicked: false,
      special: index === 12,
      question: index === 12 ? null : questions[index < 12 ? index : index - 1], // Adjust for center square
    }));
    return initialSquares;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const storedName = sessionStorage.getItem('bingoName');

  if (!storedName) {
    return <Navigate to="/" />;
  }

  const handleClick = (index) => {
    if (squares[index].special) return;

    setCurrentQuestion(squares[index].question);
    setIsModalOpen(true);
  };

  const handleModalClose = (answer) => {
    setIsModalOpen(false);
    console.log("Answer submitted:", answer);
    // Here you can handle the user's answer. For simplicity, we just log it and close the modal.
  };

  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.clicked ? 'clicked' : ''} ${square.special ? 'special' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.special ? '★' : square.clicked ? '✓' : '?'}
        </div>
      ))}
      <button className="rules-button">Rules</button>

      {isModalOpen && <Popup question={currentQuestion} onClose={handleModalClose} userNames={userNames}/>}
    </div>
  );
}

export default BingoBoard;
