// src/Components/Popup.js
import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
	<div className="popup">
	  <div className="popup-content">
		<button className="close-button" onClick={onClose}>X</button>
		{children}
	  </div>
	</div>
  );
};

export default Popup;