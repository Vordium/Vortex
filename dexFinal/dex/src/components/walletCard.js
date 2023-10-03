import './Model.css'; // Import the CSS file for your modal styling
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



function WalletCard({ onClose }) {
  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <div>
        <div className="account-card-header">
          <h4>Account</h4>
          <button className="close-button" onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
          {/* Additional components or logic */}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
