import "./RentalPayment.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Usercontext } from "./UserContextProvider";

function RentalPayment() {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchDate, setSearchDate] = useState("");
    const [tenant, setTenant] = useState();
    const [user] = useContext(Usercontext);

    const paymentsPerPage = 3;

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/payRent/${user.user_id}`);
                console.log(user.user_id);
                setTenant(response.data.tenant);
                setPayments(response.data.rental_details);
                setFilteredPayments(response.data.rental_details);
                console.log(response.data.rental_details);
            } catch (error) {
                console.error("Failed to fetch rental payments", error);
                alert("Error fetching rental payment data");
            }
        };
        fetchPayments();
    }, [user.user_id]);

   
    const handleSearch = (event) => {
        setSearchDate(event.target.value);
        if (event.target.value) {
            const filtered = payments.filter((payment) =>
                new Date(payment.payment_date).toISOString().startsWith(event.target.value)
            );
            setFilteredPayments(filtered);
            setCurrentPage(1); 
        } else {
            setFilteredPayments(payments); 
        }
    };

    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div id="rental-payments-container">
            <section id="payment-details">
                <h2>Rental Payments</h2>
                <h3>{user.username} ©️ 2024 Financial year</h3>

                {/* Search Bar */}
                <input
                    type="date"
                    value={searchDate}
                    onChange={handleSearch}
                    placeholder="Search by payment date"
                    id="search-bar"
                />

                {/* Rental Payments Table */}
                <table id="rent-payment">
                    <thead>
                        <tr>
                            <th>Rental</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPayments.map((payment) => (
                            <tr key={payment.payrent_id}>
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

                {/* Pagination Controls */}
                <div id="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
}

export default RentalPayment;
