import React from 'react';
import './Model.css'; // Import the CSS file for your modal styling
import  {Profile} from "./profile";
function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div>
          <Profile />
          {/* Additional components or logic */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
