import React from 'react';
import './Model.css'; // Import the CSS file for your modal styling
import  {Profile} from "./profile";
function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <Profile />
          {/* Additional components or logic */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
