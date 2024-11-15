import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            maxWidth: '1300px',
            border: '1px solid #eaeaea',
            backgroundColor: 'white',
            overflow: 'hidden'
        },
        leftSection: {
            flex: 1,
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#031739', 
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginTop: '10px',
            fontFamily: 'Times New Roman, Times, serif',
            color: '#031739',
            
        },
        input: {
            padding: '10px',
            marginTop: '5px',
            border: '0.5px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'gray', // Input background color for contrast
            color: '#031739', // Text color in input for readability
            width: '400px'          
        },
        button: {
            padding: '15px 20px', // Adjust padding to make the button smaller
            backgroundColor: 'black',
            color: '#B4975A',
            fontSize: '14px', // Decrease font size if needed
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
            width: '300px', // Optional: set a fixed width for a smaller look
            alignSelf: 'center'
            
        },
        linkText: {
            marginTop: '15px',
            // textAlign: 'center',
            fontSize: '14px',
            color: '#031739',
        },
        link: {
            textDecoration: 'underline', // Adds underline
            color: '#031739',
            fontWeight: 'bold', // Makes the text bold
            marginLeft: '5px',
        },
        rightSection: {
            flex: 1,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            width: '100%',
            height: '90%',
            objectFit: 'cover', // Adjusted for better visual fit
        }
    };

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        phone_number: "",
        address: "",
        role: ""
    });

    const navigate = useNavigate();

    const onSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/users/", {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                phone_number: newUser.phone_number,
                address: newUser.address,
                role: newUser.role
            });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(error.response.data.detail || 'Failed to register User');
            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <p style={styles.linkText}>
                    Already have an account?
                    <a href="/login" style={styles.link}>Log in</a>
                </p>
                <h2 style={{ color: '#031739' }}>Sign Up to Makao</h2>
                <form style={styles.form} onSubmit={onSignUpSubmit}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        style={styles.input}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        value={newUser.username}
                    />

                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        style={styles.input}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        value={newUser.email}
                    />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        minLength="8"
                        style={styles.input}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        value={newUser.password}
                    />
                    <small style={{ color: '#031739' }}>Please enter 8 or more characters.</small>

                    <label htmlFor="phone" style={styles.label}>Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="*254"
                        required
                        style={styles.input}
                        onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                        value={newUser.phone_number}
                    />

                    <label htmlFor="address" style={styles.label}>Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        style={styles.input}
                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                        value={newUser.address}
                    />

            <label htmlFor="role" style={styles.label}>Usertype</label>
            <select
                id="role"
                name="role"
                required
                style={{ ...styles.input, width: '550px' }}
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
                <option value="" disabled style={{ color: '#B4975A' }}>Select your role</option> 
                <option value="owner">Owner</option>
                <option value="client">Client</option>
            </select>


                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
            </div>

            <div style={styles.rightSection}>
                <img src="signup.jpg" alt="Modern House" style={styles.img} />
            </div>
        </div>
    );
};

export default Signup;
