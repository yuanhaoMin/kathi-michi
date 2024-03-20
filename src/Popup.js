import React, { useState, useEffect } from 'react';
import './style/Modal.css';

function Popup({ question, onClose, userNames }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredUserNames, setFilteredUserNames] = useState([]);

  useEffect(() => {
    if (inputValue) {
      setFilteredUserNames(userNames.filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase())));
    } else {
      setFilteredUserNames([]);
    }
  }, [inputValue, userNames]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectName = (name) => {
    setInputValue(name);
    setFilteredUserNames([]);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onClose("")}>&times;</span>
        <p>{question}</p>
        <input type="text" value={inputValue} onChange={handleInputChange} onBlur={(e) => onClose(e.target.value)} autoFocus />
        {filteredUserNames.length > 0 && (
          <ul className="autocomplete-dropdown">
            {filteredUserNames.map((name, index) => (
              <li key={index} onClick={() => handleSelectName(name)}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Popup;
