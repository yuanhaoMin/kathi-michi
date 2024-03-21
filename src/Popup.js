import React, { useState, useEffect } from 'react';
import './style/Modal.css';

function Popup({ question, currentName, onClose, userNames, usedNames }) {
  const [inputValue, setInputValue] = useState(currentName || "");
  const [filteredUserNames, setFilteredUserNames] = useState([]);

  useEffect(() => {
    if (inputValue) {
      // Suggest names that start with the input value, regardless of whether they've been used
      setFilteredUserNames(userNames.filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase())));
    } else {
      setFilteredUserNames([]);
    }
  }, [inputValue, userNames]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectName = (name) => {
    onClose(name); // This will immediately close the popup and send the name back
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onClose("")}>&times;</span>
        <p>{question}</p>
        <input type="text" value={inputValue} onChange={handleInputChange} autoFocus />
        {filteredUserNames.length > 0 && (
          <div className="autocomplete-dropdown">
            {filteredUserNames.map((name, index) => {
              const isUsed = usedNames.includes(name); // Check if the name has been used
              return (
                <button key={index} 
                        onClick={() => !isUsed && handleSelectName(name)} 
                        className={`suggestion-button ${isUsed ? 'disabled-button' : ''}`} 
                        disabled={isUsed}>
                  {name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
