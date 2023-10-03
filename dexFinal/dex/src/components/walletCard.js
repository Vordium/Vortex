import React from 'react';
import './Model.css'; // Import the CSS file for your modal styling

function WalletCard({ onClose }) {
  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <div>
          
          {/* Additional components or logic */}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
