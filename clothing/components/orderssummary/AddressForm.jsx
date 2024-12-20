'use client';
import { useState, useEffect } from 'react';

function AddressForm({ onSubmit, onCancel, addressToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
    type: 'HOME',
  });

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        name: addressToEdit.name || '',
        phone: addressToEdit.phone || '',
        address: addressToEdit.address || '',
        location: addressToEdit.location || '',
        type: addressToEdit.type || 'HOME',
      });
    }
  }, [addressToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { ...formData };

    // Include `_id` only when editing an address
    if (addressToEdit?._id) {
      submissionData._id = addressToEdit._id;
    }

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="City, State - Pincode"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="HOME">Home</option>
          <option value="WORK">Work</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {addressToEdit ? 'Update Address' : 'Save Address'}
        </button>
      </div>
    </form>
  );
}

export default AddressForm;