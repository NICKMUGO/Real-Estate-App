import axios from "axios";
import React, { useEffect, useState } from "react";

const UtilityProviderForm = () => {
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
            justifyContent: 'center',  // Centers items vertically
            
            
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
        },
    };

    const [isOpen, setIsOpen] = useState(false);
    const [utilities, setUtilities] = useState([]);
    const [Utilityprovider, setUtilityprovider] = useState({
        providername: "",
        contact_info: "",
        utility_id: "", 
    });

    const onUtilityProviderSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/utilityprovider/', {
                provider_name: Utilityprovider.providername,
                contact_info: Utilityprovider.contact_info,
                utility_id: parseInt(Utilityprovider.utility_id), 
            });
            console.log(response.data);
            setUtilityprovider({
                providername: "",
                contact_info: "",
                utility_id: "", 
            });
        } catch (error) {
            console.error("Error submitting form:", error.response || error.message);
        }
    };

    useEffect(() => {
        const fetchUtilities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/utility/');
                console.log(response.data);
                setUtilities(response.data); 
            } catch (error) {
                console.error("Error fetching utilities:", error);
            }
        };
        fetchUtilities();
    }, []);
    useEffect(() => {
        console.log(utilities); 
    }, [utilities]);

    return (
        <div>
            <button style={styles.openButton} onClick={() => setIsOpen(true)}>
                Open Utility Provider Form
            </button>
            {isOpen && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
                            &times;
                        </button>

                        <h2 style={styles.h2}>Utility Providers</h2>
                        <form style={styles.form} onSubmit={onUtilityProviderSubmit}>
                            <label htmlFor="provider_name" style={styles.label}>Provider Name</label>
                            <input
                                type="text"
                                id="provider_name"
                                name="provider_name"
                                required
                                style={styles.input}
                                value={Utilityprovider.providername}
                                onChange={(e) =>
                                    setUtilityprovider({ ...Utilityprovider, providername: e.target.value })
                                }
                            />

                            <label htmlFor="contact_info" style={styles.label}>Contact Info</label>
                            <input
                                type="tel"
                                id="contact_info"
                                name="contact_info"
                                required
                                style={styles.input}
                                value={Utilityprovider.contact_info}
                                onChange={(e) =>
                                    setUtilityprovider({ ...Utilityprovider, contact_info: e.target.value })
                                }
                            />

                            <label htmlFor="utility_type" style={styles.label}>Utility Type</label>
                            <select
                                id="utility_type"
                                name="utility_type"
                                required
                                style={styles.input}
                                value={Utilityprovider.utility_id}
                                onChange={(e) =>
                                    setUtilityprovider({ ...Utilityprovider, utility_id: e.target.value })
                                }
                            >
                                <option value="" disabled>Select a utility</option>
                                {utilities && utilities.map((utility) => (
                                    <option key={utility.utility_id} value={utility.utility_id}>
                                        {utility.utility_type}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" style={styles.button}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UtilityProviderForm;
