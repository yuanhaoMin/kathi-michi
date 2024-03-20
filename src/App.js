import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import BingoBoard from './BingoBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/bingo" element={<BingoBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
