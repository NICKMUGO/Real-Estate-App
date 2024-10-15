import React, { useState } from 'react';
import './awards.css';

function PayRentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentId: '',
    userId: '',
    propertyId: '',
    amount: '',
    paymentDate: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Payment Data:', paymentData);
    closeModal();
  };

  return (
    <div className="payrent">
      <button className="open-button" onClick={openModal}>
        Pay Rent
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Pay Rent</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>
                Payment ID:
                <input
                  type="text"
                  name="paymentId"
                  value={paymentData.paymentId}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={paymentData.userId}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Property ID:
                <input
                  type="text"
                  name="propertyId"
                  value={paymentData.propertyId}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Payment Date:
                <input
                  type="date"
                  name="paymentDate"
                  value={paymentData.paymentDate}
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

export default PayRentPopup;
