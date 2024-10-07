import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RentalPopup.css';
import 'react-datepicker/dist/react-datepicker.css';



export default function RentalPopup() {
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button onClick={toggleModal} className='btn-modal'>Rental ADD</button>
      {modal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h2>Rental Form</h2>
              <form>
                <div className='form-group'>
                  <label htmlFor='propertyID'>Property ID: </label>
                  <input type='number' id='propertyID' name='propertyID' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='rentalID'>Rental ID: </label>
                  <input type='number' id='rentalPayment' name='rentalPayment' required />                 
                </div>
                <div className='form-group'>
                  <label htmlFor='tenantname'>Tenant Name: </label>
                  <input type='text' id='tenantname' name='tenantname' required />                 
                </div>
                <div className='form-group'>
                  <label htmlFor='startdate'>Choose Start Date: </label>
                  <input type='date' id='startdate' name='startdate' required />                 

                  {/* <DatePicker
                    id='startdate'
                    name='startdate'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    required
                  /> */}
                </div>
                <div className='form-group'>
                  <label htmlFor='enddate'>Choose End Date: </label>
                  <input type='date' id='enddate' name='enddate' required />                 

                </div>
                <div className='form-group'>
                  <label htmlFor='monthlyrent'>Monthly Rent: </label>
                  <input type='number' id='monthlyrent' name='monthlyrent' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentstatus'>Payment Status: </label>
                  <input type='text' id='paymentstatus' name='paymentstatus' required />                 
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