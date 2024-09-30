// src/Components/PropertyForm.js
import React, { useState } from 'react';
import Button from './Button';
import Popup from './Popup';
import styles from './PropertyForm.module.css'; // Import the CSS Module

const PropertyForm = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className={styles.propertyFormContainer}>
            <Button onClick={openPopup}>Open Property Form</Button>
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <div className={styles.popupContent}>
                    <button className={styles.closeButton} onClick={closePopup}>×</button>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Property Name:</label>
                            <input type="text" name="propertyName" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Property Value:</label>
                            <input type="text" name="propertyValue" />
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </Popup>
        </div>
    );
};

export default PropertyForm;