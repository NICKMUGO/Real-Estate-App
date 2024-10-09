
import React, { useState } from 'react';
import './awards.css';

function UtilityPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [utilityData, setUtilityData] = useState({
    utilityId: '',
    utilityType: '',
    description: '',
    createdAt: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setUtilityData({
      ...utilityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Utility Data:', utilityData);
    closeModal();
  };

  return (
    <div className="App">
      <button className="open-button" onClick={openModal}>
        Open Utility Form
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Utility</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>
                Utility ID:
                <input
                  type="text"
                  name="utilityId"
                  value={utilityData.utilityId}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Utility Type:
                <input
                  type="text"
                  name="utilityType"
                  value={utilityData.utilityType}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={utilityData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <label>
                Created At:
                <input
                  type="date"
                  name="createdAt"
                  value={utilityData.createdAt}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UtilityPopup;
