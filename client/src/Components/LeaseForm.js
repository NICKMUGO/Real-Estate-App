import "./LeaseForm.css";
import { useState, useEffect } from "react";
import axios from "axios";

function LeaseForm() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/payments/");
                setPayments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch payments", error);
                alert("Error fetching lease payment data");
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="lease-form-container">
            <header>
                <h1>Lease Payments</h1>
            </header>
            <main>
                <section className="payment-details">
                    <h2>Payment Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rental</th>
                                <th>Tenant ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Payment Date</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.payrent_id}>
                                    <td>{payment.rental?.address || "N/A"}</td>
                                    <td>{payment.tenant_id?.name || "N/A"}</td>
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
                <p>&copy; 2024 Lease Payments Page</p>
            </footer>
        </div>
    );
}

export default LeaseForm;
