import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you'll use dynamic routing

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone_number: "",
        address: "",
        role: "",
    });

    const { userId } = useParams(); // Assuming you pass userId as a route param

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Assuming the backend provides the user data at this route
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const styles = {
        container: {
            padding: '100px',
            backgroundColor: '#031739',
            color: '#B4975A',
            borderRadius: '10px',
            maxWidth: '1000px',
            margin: 'auto',
        },
        field: {
            marginBottom: '15px',
        },
        label: {
            fontWeight: 'bold',
            marginRight: '10px',
        },
        value: {
            color: '#fff',
        }
    };

    return (
        <div style={styles.container}>
            <h2>User Profile</h2><br></br>
            <div style={styles.field}>
                <span style={styles.label}>Username:</span>
                <span style={styles.value}>{userData.username}</span>
            </div>
            <div style={styles.field}>
                <span style={styles.label}>Email:</span>
                <span style={styles.value}>{userData.email}</span>
            </div>
            <div style={styles.field}>
                <span style={styles.label}>Phone Number:</span>
                <span style={styles.value}>{userData.phone_number}</span>
            </div>
            <div style={styles.field}>
                <span style={styles.label}>Address:</span>
                <span style={styles.value}>{userData.address}</span>
            </div>
            <div style={styles.field}>
                <span style={styles.label}>Role:</span>
                <span style={styles.value}>{userData.role}</span>
            </div>
        </div>
    );
};

export default UserProfile;
