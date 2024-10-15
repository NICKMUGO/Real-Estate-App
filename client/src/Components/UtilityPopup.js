import React, { useState } from 'react';
import axios from 'axios'; 

function UtilityPopup() {
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
  const [utilityData, setUtilityData] = useState({
    utilityType: '',
    description: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setUtilityData({
      ...utilityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:8000/utility/',{
        utility_type:utilityData.utilityType,
        description:utilityData.description    
      })
      console.log('Utility Data:', utilityData);
      closeModal();
    }catch (error) {
      if (error.response) {
          console.error('Error response:', error.response.data); 
          alert(error.response.data.detail || 'Failed to Delete Property');
      } else {
          console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="App">
      <button style={styles.openButton} onClick={openModal}>
        Open Utility Form
      </button>

      {isOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <div style={{ position: 'relative' }}>
              <h2 style={styles.h2}>Add Utility</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <label style={styles.label}>
                  Utility Type:
                </label>
                <input
                  type="text"
                  name="utilityType"
                  style={styles.input}
                  value={utilityData.utilityType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>
                  Description:
                </label>
                <textarea
                  name="description"
                  style={styles.input}
                  value={utilityData.description}
                  onChange={handleChange}
                  required
                ></textarea>
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

export default UtilityPopup;
