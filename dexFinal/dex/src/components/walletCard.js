import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Model.css'; // Import the CSS file for your modal styling

function WalletCard({ onClose }) {
  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="account-card">
          <div className="account-card-header">
            <h4>Account</h4>
            <button className="close-button" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          </div>
          {/* Additional components or logic */}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
