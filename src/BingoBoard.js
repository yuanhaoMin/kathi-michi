import React, { useState, useEffect } from 'react';
import './BingoBoard.css';

function BingoBoard() {
  const [squares, setSquares] = useState(
    new Array(25).fill().map(() => ({ clicked: false }))
  );
  const [name, setName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);

  useEffect(() => {
    // 在组件加载时检查sessionStorage中是否存储了名字
    const storedName = sessionStorage.getItem('bingoName');
    if (storedName) {
      setName(storedName);
      setNameEntered(true);
    }
  }, []);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    newSquares[index].clicked = !newSquares[index].clicked;
    setSquares(newSquares);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      sessionStorage.setItem('bingoName', name); // 将名字保存到sessionStorage
      setNameEntered(true);
    }
  };

  if (!nameEntered) {
    return (
      <div className="welcome-screen">
        <h1>Welcome to Bingo!</h1>
        <p>Please enter your name to start:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your Name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

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