import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Usercontext } from './UserContextProvider';
import './PayProperty.css'

function PayProperty() {
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
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      width: '100%',
      position: 'relative',
    },
    h2: {
      color: '#B4975A',
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '10px',
    },
    formRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    label: {
      color: '#F3F4F6',
      width: '40%',
      fontSize: '16px',
    },
    input: {
      padding: '10px',
      border: '1px solid #F3F4F6',
      borderRadius: '5px',
      backgroundColor: '#F3F4F6',
      width: '60%',
    },
    select: {
      padding: '10px',
      border: '1px solid #F3F4F6',
      borderRadius: '5px',
      backgroundColor: '#F3F4F6',
      width: '60%',
    },
    fileInput: {
      padding: '10px',
      backgroundColor: '#F3F4F6',
      width: '60%',
      borderRadius: '5px',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#B4975A',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '20%',
      marginLeft:"225px",
      marginTop: '20px',
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
    openButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
    },
    openButton: {
      padding: '15px',
      backgroundColor: '#3B82F6',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      maxWidth: '100px',
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [payPropertyData, setPayPropertyData] = useState({
    property: '',
    buyer: '',
    owner: '',
    amount: '',
    payment_date: '',
    payment_status: false,
    title_deed: null,
  });
  const [properties, setProperties] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [owners, setOwners] = useState([]);
  const { user } = useContext(Usercontext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [propertyResponse, buyerResponse, ownerResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/properties/'),
          axios.get('http://127.0.0.1:8000/clients/'),
          axios.get('http://127.0.0.1:8000/owners/'),
        ]);

        setProperties(propertyResponse.data);
        setBuyers(buyerResponse.data);
        setOwners(ownerResponse.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayPropertyData((prevData) => {
      let newStatus = prevData.payment_status;

      if (name === 'property') {
        const selectedProperty = properties.find((p) => p.id === parseInt(value));
        if (selectedProperty && payPropertyData.amount) {
          newStatus = parseFloat(payPropertyData.amount) >= parseFloat(selectedProperty.price);
        }
      } else if (name === 'amount') {
        const selectedProperty = properties.find((p) => p.id === parseInt(payPropertyData.property));
        if (selectedProperty) {
          newStatus = parseFloat(value) >= parseFloat(selectedProperty.price);
        }
      }
      console.log(newStatus)

      return {
        ...prevData,
        [name]: value,
        payment_status: newStatus,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('property', payPropertyData.property);
    formData.append('buyer', payPropertyData.buyer);
    formData.append('owner', payPropertyData.owner);
    formData.append('amount', payPropertyData.amount);
    formData.append('payment_date', payPropertyData.payment_date);
    formData.append('payment_status', payPropertyData.payment_status);
    if (payPropertyData.title_deed) {
      formData.append('title_deed', payPropertyData.title_deed);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/payProperties/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Payment Data Submitted:', response.data);
      console.log('Payment Data Submitted:', response.data);
      const patchPaymentStatus = await axios.patch(`http://127.0.0.1:8000/property/${payPropertyData.property}/`, {
        status:payPropertyData.payment_status? "sold":"available",
      }); 
      console.log(patchPaymentStatus.data)
      console.log(patchPaymentStatus.status) 
      if (payPropertyData.payment_status){
        const deletePaidProperty = await axios.delete(`http://127.0.0.1:8000/property/${payPropertyData.property}/`); 
        console.log(deletePaidProperty.data)
        console.log(deletePaidProperty.status)
        }else{
          alert("You have not completed payment")
        }
      setPayPropertyData({
        property: '',
        buyer: '',
        owner: '',
        amount: '',
        payment_date: '',
        payment_status: false,
        title_deed: null,
      });

      closeModal();
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
      <div style={styles.openButtonContainer}>
        <button style={styles.openButton} onClick={openModal}>
          🏠
        </button>
      </div>

      {isOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <div style={{ position: 'relative' }}>
              <h2 style={styles.h2}>Pay for Property</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <label htmlFor="property" style={styles.label}>Property:</label>
                <select
                  name="property"
                  value={payPropertyData.property}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="" disabled>Select Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      ({property.id}){property.property_type} - Price: {property.price}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formRow}>
                <label htmlFor="owner" style={styles.label}>Owner</label>
                <select
                  name="owner"
                  value={payPropertyData.owner}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select Owner</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.username}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formRow}>
                <label htmlFor="buyer" style={styles.label}>Buyer:</label>
                <select
                  name="buyer"
                  value={payPropertyData.buyer}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="" disabled>Select Buyer</option>
                  {buyers.map((buyer) => (
                    <option key={buyer.id} value={buyer.id}>
                      {buyer.username}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formRow}>
                <label htmlFor="amount" style={styles.label}>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={payPropertyData.amount}
                  onChange={handleChange}
                  step={1000000}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <label htmlFor="payment_date" style={styles.label}>Payment Date:</label>
                <input
                  type="date"
                  name="payment_date"
                  value={payPropertyData.payment_date}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <label htmlFor="payment_status" style={styles.label}>Payment Status:</label>
                <input
                  type="text"
                  value={payPropertyData.payment_status ? 'Paid' : 'Not Paid'}
                  readOnly
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <label htmlFor="title_deed" style={styles.label}>Title Deed (PDF):</label>
                <input
                  type="file"
                  name="title_deed"
                  onChange={(e) => setPayPropertyData({ ...payPropertyData, title_deed: e.target.files[0] })}
                  style={styles.fileInput}
                />
              </div>

              <button type="submit" style={styles.button}>Submit</button>
            </form>
          </div>
        </div>
      )}
      <center>
        <div style={styles.houseDisplay}>
            {properties.length > 0 ? (
                <section className="rent-details">
                    <h2>Property Checklist</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>Property ID</th>
                                <th>Property Type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => {
                                const Propertyowner = owners.find(owner => owner.id === property.owner);
                                return Propertyowner ? (
                                    <tr key={property.id}>
                                        <td>{Propertyowner.username}</td> 
                                        <td>{property.id}</td>
                                        <td>{property.property_type}</td>
                                        <td>{property.price} ksh</td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </section>
            ) : (
                <p>No properties found.</p>
            )}
        </div>
    </center>
    </div>
  );
}

export default PayProperty;
