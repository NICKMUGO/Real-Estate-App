import "./MyPaymentpage.css";
function MyPaymentspage() {
    return (
        <div>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
</style>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
        
            <div>
                <header>
                    <h1>MyPayments</h1>
                </header>
                <main>
                    <section className="rent-details">
                        <h2>Rent Details</h2>
                        <table>
                            <tr>
                                <th>Payment Date</th>
                                <th>Payment Amount</th>
                                <th>Balance</th>
                                <th>Payment Method</th>
                            </tr>
                            <tr>
                                <td>2024-09-11</td>
                                <td>$40000</td>
                                <td>$5000</td>
                                <td>M-Pesa</td>
                                {/* Payment methods strictly online , no cash used  */}
                            </tr>
                            <tr>
                                <td>2024-09-12</td>
                                <td>$5000</td>
                                <td>$0</td>
                                   <td>Paypal</td>   
                           </tr>
                        </table>
                    </section>
                    <section className="payment-summary">
                        <h2>Payment Summary</h2>
                        <p>Total Paid: $45000</p>
                        <p>Balance: $0</p>
                    </section>
                </main>
                <footer>
                    <p>&copy; 2024 Rent Collection Page</p>
                </footer>
            </div>
        </div>
    );
}
export default MyPaymentspage;