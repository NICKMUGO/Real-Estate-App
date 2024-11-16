import "./RentalPayment.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Usercontext } from "./UserContextProvider";

function RentalPayment() {
    const [payments, setPayments] = useState([]);
    const[user]=useContext(Usercontext)
    const[tenant,setTenant]=useState();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/payRent/${user.user_id}`);
                console.log(user.user_id)
                setTenant(response.data.tenant)
                setPayments(response.data.rental_details);
                console.log(response.data.rental_details);
            } catch (error) {
                console.error("Failed to fetch rental payments", error);
                alert("Error fetching rental payment data");
            }
        };
        fetchPayments();
    }, [user.user_id]);

    return (
        <div id="rental-payments-container">
            <section id="payment-details">
                <h2> Rental Payments </h2>
                <table id="rent-payment">
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
                            <tr key={payment.payrent_id}>
                                <td>{tenant.username || "N/A"}</td> 
                                <td>{payment.property?.description || "N/A"}</td> 
                                <td>{payment.amount_paid} ksh</td> 
                                <td>{payment.payment_status ? "Paid" : "Pending"}</td>
                                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                <td>{new Date(payment.created_at).toLocaleString()}</td>
                                <td>{new Date(payment.updated_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default RentalPayment;
