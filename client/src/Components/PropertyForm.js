import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyForm = () => {
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
            maxWidth: '350px',
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
            top: '30px',
            right: '10px', 
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '30px', 
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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [owners, setOwners] = useState([]);
    const [property, setProperty] = useState({
        id: "",
        property_type: "",
        image: null, // Change to null for file input
        status: "",
        price: "",
        description: ""
    });

    useEffect(() => {
        const fetchOwners = async () => {
            const response = await axios.get('http://127.0.0.1:8000/owners/');
            setOwners(response.data);
            console.log(response.data)
        };
        fetchOwners();
    }, []);
  

    const handlePropertySubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(); 
        formData.append('id', property.id); 
        formData.append('property_type', property.property_type); 
        formData.append('image', property.image);
        formData.append('status', property.status);
        formData.append('price', property.price);
        formData.append('description', property.description);

        try {
            const response = await axios.post('http://127.0.0.1:8000/properties/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <button style={styles.openButton} onClick={() => setIsPopupOpen(true)}>
                Register Property
            </button>
            {isPopupOpen && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        <button style={styles.closeButton} onClick={() => setIsPopupOpen(false)}>
                            &times;
                        </button> 
                        <h2 style={styles.h2}>Register Property</h2>
                        <form style={styles.form} onSubmit={handlePropertySubmit} encType="multipart/form-data">
                            <label htmlFor="owner_name" style={styles.label}>Owner Name</label>
                            <select
                                id="owner_name"
                                required
                                style={styles.input}
                                value={property.id}
                                onChange={(e) => setProperty({ ...property, id: e.target.value })}
                            >
                                <option value="" disabled>Select your name</option>
                                {owners.map((owner) => (
                                    <option key={owner.id} value={owner.id}>
                                        {owner.username}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="property_type" style={styles.label}>Property Type</label>
                            <select
                                id="property_type"
                                required
                                style={styles.input}
                                value={property.property_type}
                                onChange={(e) => setProperty({ ...property, property_type: e.target.value })}
                            >
                                <option value="" disabled>Select your property type</option>
                                <option value="apartment">Apartment</option>
                                <option value="mansion">Mansion</option>
                                <option value="bungalow">Bungalow</option>
                            </select>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Image</label>
                                <input 
                                    type="file" 
                                    required 
                                    style={styles.input} 
                                    onChange={(e) => setProperty({ ...property, image: e.target.files[0] })} // Update image state with the file
                                />
                            </div>

                            <label htmlFor="status" style={styles.label}>Status</label>
                            <select
                                id="status"
                                required
                                style={styles.input}
                                value={property.status}
                                onChange={(e) => setProperty({ ...property, status: e.target.value })}
                            >
                                <option value="" disabled>Select availability</option>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                            </select>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Price</label>
                                <input 
                                    type="number" 
                                    required 
                                    style={styles.input} 
                                    value={property.price}
                                    step={1000000}
                                    onChange={(e) => setProperty({ ...property, price: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <label style={{ marginBottom: '10px', color: '#B4975A' }}>Description</label>
                                <textarea 
                                    required 
                                    style={{ width: '300px', height: '150px', padding: '10px', backgroundColor: 'gray', borderRadius: '5px', border: '0.5px solid #ccc' }} 
                                    value={property.description}
                                    onChange={(e) => setProperty({ ...property, description: e.target.value })}
                                />
                            </div>
                            
                            <button type="submit" style={styles.button}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyForm;
