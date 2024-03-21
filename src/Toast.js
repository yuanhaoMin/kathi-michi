import React from 'react';
import './style/Toast.css';

export default function Toast({ message, show, onClose }) {
  React.useEffect(() => {
    if (show) {
      // Hide the toast after 4 seconds
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast">{message}</div>
  );
}
