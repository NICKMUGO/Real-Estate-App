import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Usercontext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editUser, SeteditUser] = useState(null);
    const [user] = useContext(Usercontext);


    console.log(userData)
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/userprofile/${user.user_id}/`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const navigate= useNavigate();

    useEffect(() => {
        fetchUserData();
    }, [user.user_id]);

    const Edit = () => {
        SeteditUser(userData);
    };

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
            borderRadius: '50px',  
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '150px', 
            alignSelf: 'center', 
            textAlign:"center",
        },
        buttonHover: {
            backgroundColor: '#B4975A',
        },
        editForm: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#fff',
        },
        input: {
            width: '60%',  
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing:'border-box',  
        },
        updateButton: {
            backgroundColor: '#031739',
            padding: '8px',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '55px',
            height: '55px',
            margin: 'auto',  
        },
        cancelButton: {
            marginTop: '10px',
            borderRadius: '50%', 
            border: 'none',
            cursor: 'pointer',
            color: '#FF5733',
            width: '50px',
            height: '50px', 
            margin: 'auto',  
        },
        textarea: {
            width: '60%',  
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
            display:'flex',
            textAlign: 'center',
            alignItems:'center',
        },
    };

    const handleUserUpdate = async () => {
        SeteditUser(null);
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/userprofile/${user.user_id}/`,{
                username:editUser.username,
                email:editUser.email,
                phone_number:editUser.phone_number,
                address:editUser.address,
                password:editUser.password,
                role:editUser.role

            })
            await fetchUserData(); 
            alert("Log in Again to Update")
            navigate('/login')
            console.log(response.data)
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

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
                <p>Loading user data...</p>
            )}
            {editUser && (
                <div style={styles.editForm}>
                    <h3>Edit Profile</h3>
                    <button onClick={() => SeteditUser(null)} style={styles.cancelButton}>❌</button>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Username"
                        value={editUser.username}
                        onChange={(e) =>
                            SeteditUser({ ...editUser, username: e.target.value })
                        }
                    />
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={editUser.email}
                        onChange={(e) =>
                            SeteditUser({ ...editUser, email: e.target.value })
                        }
                    />
                    <input
                        style={styles.input}
                        type="tel"
                        placeholder="Phone Number"
                        value={editUser.phone_number}
                        onChange={(e) =>
                            SeteditUser({ ...editUser, phone_number: e.target.value })
                        }
                    />
                    <input
                        style={styles.input}
                        type="password"
                        required
                        minLength="8"
                        placeholder="Password"
                        value={editUser.password}
                        onChange={(e) =>
                            SeteditUser({ ...editUser, password: e.target.value })
                        }
                    />
                    <textarea
                        style={styles.input}
                        placeholder="Address"
                        value={editUser.address}
                        onChange={(e) =>
                            SeteditUser({ ...editUser, address: e.target.value })
                        }
                    />
                    <button style={styles.updateButton} onClick={handleUserUpdate}>Update</button>
                </div>
            )}

            <button
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                onClick={Edit}
            >
                Edit
            </button>
        </div>
    );
};

export default UserProfile;
