// src/Components/PaymentForm.js

import React, { useState } from 'react';
import './awards.css';

function PaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'card') {
            // Handle card payment submission
            console.log('Card payment submitted');
        } else if (paymentMethod === 'mpesa') {
            // Handle M-Pesa payment submission
            console.log('M-Pesa payment submitted');
        }
    };

    return (
        <div className="payment-container">
            <h2>Make a Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="payment-method">
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={handlePaymentMethodChange}
                        />
                        Credit/Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === 'mpesa'}
                            onChange={handlePaymentMethodChange}
                        />
                        M-Pesa
                    </label>
                </div>

                {paymentMethod === 'card' && (
                    <div className="card-payment">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolder">Card Holder Name</label>
                            <input type="text" id="cardHolder" name="cardHolder" required />
                        </div>
                    </div>
                )}

                {paymentMethod === 'mpesa' && (
                    <div className="mpesa-payment">
                        <div className="form-group">
                            <label htmlFor="mpesaNumber">M-Pesa Number</label>
                            <input type="text" id="mpesaNumber" name="mpesaNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mpesaPin">M-Pesa PIN</label>
                            <input type="password" id="mpesaPin" name="mpesaPin" required />
                        </div>
                    </div>
                )}

                <button type="submit" className="submit-button">Submit Payment</button>
            </form>
        </div>
    );
}

export default PaymentForm;
