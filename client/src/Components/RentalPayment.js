import "./RentalPayment.css";
import { useState, useEffect } from "react";
import axios from "axios";

function RentalPayment() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/rental-payments/");
                setPayments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch rental payments", error);
                alert("Error fetching rental payment data");
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="rental-payments-container">
            <header>
                <h1>Rental Payments</h1>
            </header>
            <main>
                <section className="payment-details">
                    <h2>Payment Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tenant</th>
                                <th>Rental</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Payment Date</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.payment_id}>
                                    <td>{payment.tenant?.name || "N/A"}</td>
                                    <td>{payment.rental?.address || "N/A"}</td>
                                    <td>{payment.amount} ksh</td>
                                    <td>{payment.payment_status ? "Paid" : "Pending"}</td>
                                    <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                    <td>{new Date(payment.created_at).toLocaleString()}</td>
                                    <td>{new Date(payment.updated_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Rental Payments Page</p>
            </footer>
        </div>
    );
}

export default RentalPayment;
