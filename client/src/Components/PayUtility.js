import React, { useContext, useState,useEffect } from 'react';
import axios from 'axios'; 
import { Usercontext } from './UserContextProvider';

function PayUtility() {
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
      backgroundColor: '#031739',
      color: 'white',
      fontSize: '14px',
      border: 'none',
      marginTop: '20px',
      cursor: 'pointer',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '20%',
      maxWidth: '50px', 
      borderRadius:"50%",
      textAlign: 'center'
  }
  };

  const[user]=useContext(Usercontext);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    property_id: '',
    user: user.user_id,
    utilityprovider: '',
    amount: '',
    payment_date: '',
    payment_status: true,
  });
  const[utilityProvider,setUtilityProviders]=useState([]);
  const[users,setUsers]=useState([]);
  const[properties,setProperties]=useState([]);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/payment/', {
        property_id: paymentData.property_id,
        user: paymentData.user,
        utilityprovider: paymentData.utilityprovider,
        amount: parseFloat(paymentData.amount),
        payment_date: paymentData.payment_date,
        payment_status: paymentData.payment_status,
      });
      console.log('Payment Data:', response.data);
      closeModal();
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data); 
        alert(error.response.data.detail || 'Failed to Submit Payment');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData= async()=>{
    try{
      const response= await axios.get('http://127.0.0.1:8000/utilityproviders/')
      setUtilityProviders(response.data)
      console.log(response.data)
      // const responseProperty= await axios.get('http://127.0.0.1:8000/owner_property/16/')
      // setProperties(responseProperty.data.owner_properties) 
      const responseProperty= await axios.get('http://127.0.0.1:8000/properties')
      setProperties(responseProperty.data) 
      const responseUser= await axios.get('http://127.0.0.1:8000/users/')
      setUsers(responseUser.data)
      console.log(responseUser.data)
    }catch{

    }
    }
    fetchData();
  },[]);

  return (
    <div>
      <button style={styles.openButton} onClick={openModal}>
        💵
      </button>

      {isOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <div style={{ position: 'relative' }}>
              <h2 style={styles.h2}>Add Payment</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formRow}>
              <label style={styles.label}>PropertyID:</label>
              <select
                    id="utilityprovider"
                    name="utilityprovider"
                    required
                    className="utilityprovider-utilityprovider-input utilityprovider-type"
                    value={paymentData.property_id}
                    onChange={(e) =>
                        setPaymentData({ ...paymentData, property_id: e.target.value })
                    }
                >
                    <option value="" disabled>Select a property type</option>
                    {properties && properties.map((property) => (
                        <option key={property.id} value={property.id}>
                              ({property.id}){property.property_type} - Price: {property.price}
                        </option>
                    ))}
                </select>
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>User:</label>
                <input
                  name="user"
                  type="text"
                  style={styles.input}
                  value={user.username}
                  // onChange={handleChange}
                  required
                  disabled
                />
                {/* <select
                  name="user"
                  value={paymentData.user}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="" disabled>Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select> */}
                </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Utility ID:</label>
                <select
                    id="utility_type"
                    name="utility_type"
                    required
                    className="utilityprovider-utilityprovider-input utilityprovider-type"
                    value={paymentData.utilityprovider}
                    onChange={(e) =>
                        setPaymentData({ ...paymentData, utilityprovider: e.target.value })
                    }
                >
                    <option value="" disabled>Select a utility type</option>
                    {utilityProvider && utilityProvider.map((utilityProvider) => (
                        <option key={utilityProvider.provider_id} value={utilityProvider.provider_id}>
                            {utilityProvider.provider_name} 
                        </option>
                    ))}
                </select>
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Amount:</label>
                <input
                  type="number"
                  step="1000"
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
                  type="datetime-local"
                  name="payment_date"
                  style={styles.input}
                  value={paymentData.payment_date}
                  onChange={handleChange}
                  required
                />
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

export default PayUtility;
