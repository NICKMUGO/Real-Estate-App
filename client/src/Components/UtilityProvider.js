import React, { useState } from "react";

const UtilityProviderForm = () => {
    const [isOpen, setIsOpen] = useState(false); 

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
            maxWidth: '500px',
            width: '100%',
            position: 'relative', // Added to position the close button
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        h2: {
            color: '#B4975A',
            textAlign: 'center',
        },
        label: {
            marginTop: '10px',
            fontFamily: 'Times New Roman, Times, serif',
            color: '#B4975A',
        },
        input: {
            padding: '10px',
            marginTop: '5px',
            border: '0.5px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'gray',
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
        }
    };

    return (
        <div>
            {/* Button to open the popup */}
            <button style={styles.openButton} onClick={() => setIsOpen(true)}>
                Open Utility Provider Form
            </button>

            {/* Conditionally render the popup form */}
            {isOpen && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        {/* 'X' Close button */}
                        <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
                            &times;
                        </button>

                        <h2 style={styles.h2}>Utility Providers</h2>
                        <form style={styles.form}>
                            <label htmlFor="provider_name" style={styles.label}>Provider Name</label>
                            <input type="text" id="provider_name" name="provider_name" required style={styles.input} />

                            <label htmlFor="contact_info" style={styles.label}>Contact Info</label>
                            <input type="tel" id="contact_info" name="contact_info" required style={styles.input} />

                            <label htmlFor="utility_type" style={styles.label}>Utility Type</label>
                            <input type="text" id="utility_type" name="utility_type" required style={styles.input} />

                            <label htmlFor="created" style={styles.label}>Created at</label>
                            <input type="date" id="created" name="created" required style={styles.input} />

                            <button type="submit" style={styles.button}>Register</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UtilityProviderForm;
