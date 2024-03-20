import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './BingoBoard.css';

function BingoBoard() {
  const [squares, setSquares] = useState(
    new Array(25).fill().map(() => ({ clicked: false }))
  );

  // Check if the name is stored in session storage
  const storedName = sessionStorage.getItem('bingoName');

  // If no name is found in session storage, redirect to the welcome page
  if (!storedName) {
    return <Navigate to="/" />;
  }

  const handleClick = (index) => {
    const newSquares = squares.slice();
    newSquares[index].clicked = !newSquares[index].clicked;
    setSquares(newSquares);
  };

  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.clicked ? 'clicked' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.clicked ? '✓' : '?'}
        </div>
      ))}
      <button className="rules-button">Rules</button>
    </div>
  );
}

export default BingoBoard;