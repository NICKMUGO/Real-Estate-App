import "./MyPaymentpage.css";
import { useContext, useEffect, useState } from "react";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import PayUtility from "./PayUtility";

function MyPaymentsPage() {
    const [user] = useContext(Usercontext);
    const [payments, setPayments] = useState([]);
    const [utilityProviders, setUtilityProviders] = useState([]);

    console.log(user)
    useEffect(() => {
        const fetchPayments = async () => {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/payments/user/${user.user_id}/`);
                setPayments(response.data);
                const responseUtilityProvider = await axios.get(`http://127.0.0.1:8000/utilityproviders/`);
                setUtilityProviders(responseUtilityProvider.data);
                console.log(responseUtilityProvider.data); 
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
            {/* <header>
                <h1>Utility Payments</h1>
            </header> */}
            <PayUtility/>
            <main>
                <section className="rent-details">
                    <h2>Rent Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>UtilityProvider</th>
                                <th>Payment Amount</th>
                                {/* <th>Contact Info</th> */}
                                <th>Created at</th>
                                <th>Updated at</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {payments.map((payment) => {
                            const provider = utilityProviders.find((utilProvider) => utilProvider.provider_id === payment.utilityprovider);
                            console.log(provider)
                            if (!provider) {
                                console.error(`Provider not found for provider_id: ${payment.utilityprovider}`);
                            }
                            return (
                                <tr key={payment.payment_id}>
                                    <td>{provider ? provider.provider_name : 'N/A'}</td>
                                    <td>{payment.amount} ksh</td>
                                    {/* <td>{provider ? provider.contact_info : 'N/A'}</td> */}
                                    <td>{payment.created_at ? new Date(payment.created_at).toLocaleString() : 'N/A'}</td>
                                    <td>{payment.updated_at ? new Date(payment.updated_at).toLocaleString() : 'N/A'}</td>
                                    <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}
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
