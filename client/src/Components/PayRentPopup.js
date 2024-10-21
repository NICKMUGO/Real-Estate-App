import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Usercontext } from './UserContextProvider';

function PayRentPopup() {
  const styles = {
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popupContent: {
      backgroundColor: '#031739',
      padding: '30px',
      borderRadius: '10px',
      maxWidth: '450px', 
      width: '100%',
      position: 'relative',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    h2: {
      color: '#B4975A',
      textAlign: 'center',
    },
    formRow: {
      display: 'flex',
      justifyContent: 'flex-start', 
      alignItems: 'center',
      marginTop: '10px',
    },
    label: {
      fontFamily: 'Times New Roman, Times, serif',
      color: '#B4975A',
      width: '30%', 
    },
    input: {
      padding: '10px',
      border: '0.5px solid #ccc',
      borderRadius: '5px',
      backgroundColor: 'gray',
      width: '70%', 
      marginLeft: '0px',
    },
    button: {
      padding: '15px',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      marginTop: '20px',
      cursor: 'pointer',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
    },
    openButton: {
      padding: '15px',
      backgroundColor: 'blue',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    tenant_id: '',
    rental: '',
    amount: '',
    paymentDate: '',
    status: false, 
  });
  const [rentals, setRentals] = useState([]);
  const[error,setError]=useState();
  const[loading,setLoading]=useState();

  useEffect(() => {
    const fetchClients = async () => {
        const response = await axios.get('http://127.0.0.1:8000/clients/');
        setClients(response.data);
        console.log(response.data)
    };
    fetchClients();
}, []);

  const[user]=useContext(Usercontext);
  const [clients, setClients] = useState([]);
  const[tenantData,setTenantData]=useState([])

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => {
        let newStatus = prevData.status;
        if (name === 'rental') {
            const rental = rentals.find(r => r.id === parseInt(value));
            if (rental && paymentData.amount) {
                newStatus = parseFloat(paymentData.amount) >= parseFloat(rental.monthly_rent);
            }
        } else if (name === 'amount') {
            const rental = rentals.find(r => r.id === parseInt(paymentData.rental));
            if (rental) {
                newStatus = parseFloat(value) >= parseFloat(rental.monthly_rent);
            }
            console.log(newStatus)
        }
        return {
            ...prevData,
            [name]: value,
            status: newStatus,
        };
    });
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/rentalUserSide/${user.user_id}/`);
        setRentals(response.data.rental);
        setTenantData(response.data.tenant);
        console.log(response.data);
        const responseClients = await axios.get('http://127.0.0.1:8000/clients/');
        setClients(responseClients.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.user_id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // paymentData.status = false;
      const currentDate = new Date();

      // if (parseFloat(paymentData.amount) >= parseFloat(requiredRent)) {
      //   paymentData.status = true;
      // }
      const response = await axios.post('http://127.0.0.1:8000/payRents/', {
        rental: paymentData.rental,
        tenant_id: paymentData.tenant_id,
        amount: paymentData.amount,
        payment_date: paymentData.paymentDate,
        payment_status: paymentData.status,
      });

      console.log('Payment Data Submitted:', response.data);
      closeModal();

      // if (paymentData.status) {
      //   setTimeout(async () => {
      //     try {
      //       await axios.patch(`http://127.0.0.1:8000/payRent/${response.data.payrent_id}/`, {
      //         payment_status: false,
      //       });
      //       console.log(`Payment status for ${response.data.payrent_id} expired after one month`);
      //     } catch (expireError) {
      //       console.error('Error expiring payment status:', expireError);
      //     }
      //   }, 1000 * 60 * 60 * 24 * 30); 
      // }

    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.detail || 'Failed to submit payment');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div>
      <button style={styles.openButton} onClick={openModal}>
        Pay Rent
      </button>

      {isOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <div style={{ position: 'relative' }}>
              <h2 style={styles.h2}>Pay Rent</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formRow}>
              <label htmlFor="user" style={styles.label}>User Name</label>
                  <select
                    name='tenant_id'
                    value={paymentData.tenant_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select User</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>{client.username}</option>
                    ))}
                  </select>
              </div>
              <div style={styles.formRow}>
              <label htmlFor='rental' style={styles.label}>Rental </label>
                <select name='rental' value={paymentData.rental} onChange={handleChange} required>
                  <option value='' disabled>Select Rental</option>
                  {rentals.map((rental) => {
                    console.log('Rental', rental);
                    return (
                      <option key={rental.id} value={rental.id}>
                        Rental.No({rental.id})Tenant({tenantData.username}) Rent({rental.monthly_rent})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  style={styles.input}
                  value={paymentData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Payment Date:</label>
                <input
                  type="date"
                  name="paymentDate"
                  style={styles.input}
                  value={paymentData.paymentDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Payment Status:</label>
                <select
                  name="status"
                  style={styles.input}
                  value={paymentData.status ? 'Paid' : 'Not Paid'}
                  onChange={handleChange}
                  disabled 
                >
                  <option value={true}>Paid</option>
                  <option value={false}>Not Paid</option>
                </select>
              </div>
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayRentPopup;
