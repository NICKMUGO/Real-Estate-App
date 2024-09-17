import React, { useState } from 'react';
import './payrent.css'; // Styling for this page

function PayRentPage () {
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    propertyId: '',
    rentAmount: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to process payment here
    console.log('Payment submitted:', paymentInfo);
  };

  return (
    <div className="pay-rent-container">
      <h1 className="page-title">Pay My Rent</h1>
      <form onSubmit={handleSubmit} className="pay-rent-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={paymentInfo.name} 
            onChange={handleChange} 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={paymentInfo.email} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="propertyId">Property ID</label>
          <input 
            type="text" 
            id="propertyId" 
            name="propertyId" 
            value={paymentInfo.propertyId} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rentAmount">Rent Amount</label>
          <input 
            type="number" 
            id="rentAmount" 
            name="rentAmount" 
            value={paymentInfo.rentAmount} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input 
            type="text" 
            id="cardNumber" 
            name="cardNumber" 
            value={paymentInfo.cardNumber} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input 
            type="text" 
            id="expirationDate" 
            name="expirationDate" 
            placeholder="MM/YY" 
            value={paymentInfo.expirationDate} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input 
            type="text" 
            id="cvv" 
            name="cvv" 
            value={paymentInfo.cvv} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit Payment</button>
      </form>
    </div>
  );
};

export default PayRentPage;
