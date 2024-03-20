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
            {filteredUserNames.map((name, index) => (
              <button key={index} onClick={() => handleSelectName(name)} className="suggestion-button">
                {name}
              </button>
            ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Popup;