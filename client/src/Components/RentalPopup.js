import React, { useState, useEffect, useContext } from 'react';
import './RentalPopup.css';
import axios from 'axios';
import { Usercontext } from './UserContextProvider';

export default function RentalPopup() {
  const[user]=useContext(Usercontext);
  const [selectedProperty, setSelectedProperty] = useState();
  const [modal, setModal] = useState(false); 
  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);
  const [rental, setRental] = useState({
    property: "",
    tenant: "",
    start_date: "",
    end_date: "",
    monthly_rent: "",
    payment_status: false
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/rentals/',{
        property: rental.property,
        tenant: rental.tenant,
        start_date: rental.start_date,
        end_date: rental.end_date,
        monthly_rent: rental.monthly_rent,
        payment_status: rental.payment_status

      });
      console.log(response.data);
      setModal(!modal);

    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.detail || 'Failed to Add Rental');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clients/');
        setClients(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);
  console.log('Rental Data:', rental)

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/properties/user/${user.user_id}/`);
        setProperties(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          alert(error.response.data.detail || 'Failed to Add Rental');
        } else {
          console.error('Error submitting form:', error);
        }
      }
    };

    fetchMyProperties();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRental(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <button onClick={toggleModal} className='btn-modal'>Add</button>
      {modal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h2>Rental Form</h2>
              <form onSubmit={handleRentalSubmit}>
                <div className='form-group'>
                <label htmlFor='property'>Property </label>
                <select name='property' value={rental.property} onChange={handleInputChange} required>
                  <option value='' disabled>Select Property</option>
                  {properties.map((property) => {
                    console.log('Property:', property);
                    return (
                      <option key={property.id} value={property.id}>
                        ({property.id}) {property.property_type} - {property.description}
                      </option>
                    );
                  })}
                </select>

                </div>
                <div className='form-group'>
                  <label htmlFor='tenantname'>Tenant Name: </label>
                  <select
                    name='tenant'
                    value={rental.tenant}
                    onChange={handleInputChange}
                    required
                  >
                    <option value=''>Select Tenant</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>{client.username}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='startdate'>Choose Start Date: </label>
                  <input
                    type='date'
                    id='startdate'
                    name='start_date' 
                    value={rental.start_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='enddate'>Choose End Date: </label>
                  <input
                    type='date'
                    id='enddate'
                    name='end_date' 
                    value={rental.end_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='monthlyrent'>Monthly Rent: </label>
                  <input
                    type='number'
                    id='monthlyrent'
                    name='monthly_rent'
                    value={rental.monthly_rent}
                    onChange={handleInputChange}
                    step={10000}
                    min={0}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentstatus'>Payment Status: </label>
                  <select
                    id='paymentstatus'
                    name='payment_status'
                    value={rental.payment_status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={false}>Not Paid</option>
                    <option value={true}>Paid</option>
                  </select>
                </div>
                <button type='submit' className='submit-button'>Submit</button>
              </form>
              <button onClick={toggleModal} className='close-modal'>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
