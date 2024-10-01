import "./MyPaymentpage.css";
import { useContext, useEffect, useState } from "react";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";

function MyPaymentsPage() {
    const [user] = useContext(Usercontext);
    const [payments, setPayments] = useState([]);

    console.log(user)
    useEffect(() => {
        const fetchPayments = async () => {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/payments/user/${user.user_id}/`);
                setPayments(response.data);
                console.log(response.data); 
            } catch (error) {
                console.log("Failed to fetch payments");
                alert("Error fetching payment data");
            }
        };
            fetchPayments();
    }, [user]);

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');`}
            </style>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />

            <header>
                <h1>My Payments</h1>
            </header>
            <main>
                <section className="rent-details">
                    <h2>Rent Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Payment Date</th>
                                <th>Payment Amount</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.payment_id}>
                                    <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.payment_method}</td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Rent Collection Page</p>
            </footer>
        </div>
    );
}

export default MyPaymentsPage;
