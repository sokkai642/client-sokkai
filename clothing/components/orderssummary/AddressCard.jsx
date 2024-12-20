import React from 'react';

function AddressCard({ address, selected, onSelect, onDeliverHere, showDeliverButton, onEdit }) {
  return (
    <div 
      className={`address-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="address-header">
        <div className="name-section">
          <span className="name">{address.name}</span>
          {address.type && <span className="address-type">{address.type}</span>}
        </div>
        <span className="phone">{address.phone}</span>
        <button 
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation(); 
            onEdit(address); 
          }}
        >
          Edit
        </button>
      </div>
      <div className="address-content">
        <p>{address.address}</p>
        <p>{address.location}</p>
      </div>
      {selected && showDeliverButton && (
        <button 
          className="deliver-here-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeliverHere();
          }}
        >
          DELIVER HERE
        </button>
      )}
    </div>
  );
}

export default AddressCard;