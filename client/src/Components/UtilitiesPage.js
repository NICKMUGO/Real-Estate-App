import React from 'react';
import './awards.css';

function UtilitiesPage() {
    return (
        <div className="utilities-container">
            <header className="utilities-header">
                <h1>Manage Your Utilities</h1>
                <p>Streamline your utility services for a hassle-free living experience.</p>
            </header>
            <section className="utilities-section">
                <div className="utility-card">
                    <h2>Electricity</h2>
                    <p>Connect with top electricity providers in your area.</p>
                    <button className="utility-button">Find Providers</button>
                </div>
                <div className="utility-card">
                    <h2>Water</h2>
                    <p>Manage your water services efficiently.</p>
                    <button className="utility-button">Manage Water</button>
                </div>
                <div className="utility-card">
                    <h2>Internet</h2>
                    <p>Choose the best internet plans to stay connected.</p>
                    <button className="utility-button">Explore Plans</button>
                </div>
                <div className="utility-card">
                    <h2>Gas</h2>
                    <p>Ensure a steady supply of gas for your home.</p>
                    <button className="utility-button">Gas Services</button>
                </div>
            </section>
           
            <section className="payment-portal">
                <h2>Utility Payment Portal</h2>
                <p>Pay your utility bills securely and conveniently.</p>
                <button className="utility-button">Go to Payment Portal</button>
            </section>
            <section className="resource-center">
                <h2>Resource Center</h2>
                <p>Find helpful articles and tips on managing your utilities efficiently.</p>
                <button className="utility-button">Read Articles</button>
            </section>
            <section className="contact-info">
                <h2>Contact Us</h2>
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <p>Email: support@makao.com</p>
                <p>Phone: (254) 792-671-945</p>
            </section>
        </div>
    );
}

export default UtilitiesPage;
