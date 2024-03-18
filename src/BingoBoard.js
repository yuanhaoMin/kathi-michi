import React, { useState } from 'react';
import './BingoBoard.css'; // Make sure to create this CSS file

function BingoBoard() {
  // Initialize an array with 25 items, each item is an object with an error flag
  const [squares, setSquares] = useState(
    new Array(25).fill().map(() => ({ error: false }))
  );

  const handleClick = (index) => {
    // Toggle the error state for the clicked square
    const newSquares = squares.slice();
    newSquares[index].error = !newSquares[index].error;
    setSquares(newSquares);
  };

  return (
    <div className="bingo-board">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square ${square.error ? 'error' : ''}`}
          onClick={() => handleClick(index)}
        >
          {square.error ? 'Unknown Error' : '?'}
        </div>
      ))}
      <button className="rules-button">Rules</button>
    </div>
  );
}

export default BingoBoard;
