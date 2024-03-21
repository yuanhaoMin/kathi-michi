import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import questions from './data/Questions.js';
import userNames from './data/Users.js';
import Popup from './Popup.js';
import './style/BingoBoard.css';

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
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

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

  const handleSubmit = () => {
    const answers = squares.filter(square => square.clicked && !square.special).map(square => square.name);
    console.log(answers);
  };

  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.clicked ? 'clicked' : ''} ${square.special ? 'special' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.special ? '★' : square.clicked ? square.name.substring(0, 3) : '?'}
        </div>
      ))}
      <button
        className={`submit-button ${isSubmitEnabled ? '' : 'disabled'}`}
        onClick={handleSubmit}
        disabled={!isSubmitEnabled}
      >
        Absenden
      </button>
      {isModalOpen && <Popup question={currentQuestion} onClose={handleModalClose} userNames={userNames} usedNames={squares.filter(square => square.clicked).map(square => square.name)}/>}
    </div>
  );
}

export default BingoBoard;