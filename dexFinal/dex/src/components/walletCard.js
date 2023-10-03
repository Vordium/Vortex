import './Model.css'; // Import the CSS file for your modal styling
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

    

function WalletCard({ onClose }) {
    const [isClosed, setIsClosed] = useState(false);

    const handleClose = () => {
        setIsClosed(true);
    };

if (isClosed) {
    return null; // If isClosed is true, the component will be null (not rendered)
}
  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <div>
        <div className="account-card-header">
          <h4>Account</h4>
          <button className="close-button" onClick={handleClose}>
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
