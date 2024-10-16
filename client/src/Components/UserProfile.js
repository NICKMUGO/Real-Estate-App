import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Usercontext } from "./UserContextProvider";

const UserProfile = () => {
    const [userData, setUserData] = useState(null); // Set initial state to null

    const [user] = useContext(Usercontext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/user/${user.user_id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user.user_id]);

    const styles = {
        container: {
            backgroundColor: '#f4f7fc',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto',
            padding: '30px',
            textAlign: 'center',
        },
        profilePic: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
            border: '5px solid #031739',
        },
        header: {
            color: '#031739',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        fieldContainer: {
            textAlign: 'left',
            marginBottom: '15px',
        },
        label: {
            fontWeight: 'bold',
            color: '#031739',
            marginRight: '10px',
            fontSize: '16px',
        },
        value: {
            color: '#444',
            fontSize: '16px',
        },
        button: {
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#031739',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#B4975A',
        }
    };

    // Conditional rendering to handle null or undefined data
    return (
        <div style={styles.container}>
            <img
                src={'https://via.placeholder.com/150'}
                alt="User Profile"
                style={styles.profilePic}
            />
            <h2 style={styles.header}>User Profile</h2>
            {userData ? (
                <>
                    <div style={styles.fieldContainer}>
                        <span style={styles.label}>Username:</span>
                        <span style={styles.value}>{userData.username}</span>
                    </div>
                    <div style={styles.fieldContainer}>
                        <span style={styles.label}>Email:</span>
                        <span style={styles.value}>{userData.email}</span>
                    </div>
                    <div style={styles.fieldContainer}>
                        <span style={styles.label}>Phone Number:</span>
                        <span style={styles.value}>{userData.phone_number}</span>
                    </div>
                    <div style={styles.fieldContainer}>
                        <span style={styles.label}>Address:</span>
                        <span style={styles.value}>{userData.address}</span>
                    </div>
                    <div style={styles.fieldContainer}>
                        <span style={styles.label}>Role:</span>
                        <span style={styles.value}>{userData.role}</span>
                    </div>
                </>
            ) : (
                <p>Loading user data...</p> // Display loading message until data is fetched
            )}
            
            <button
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Edit Profile
            </button>
        </div>
    );
};

export default UserProfile;
