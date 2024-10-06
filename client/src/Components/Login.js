import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Usercontext } from "./UserContextProvider";

const Login = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            maxWidth: '1300px',
            border: '1px solid #eaeaea',
            backgroundColor: '#031739',
            overflow: 'hidden'
        },
        leftSection: {
            flex: 1,
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#B4975A',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
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
            objectFit: 'unset',
        }
    };

    const [loggedinuser, setloggedinUser] = useState({
        email: "",
        password: ""
    });

    const[user,setUser]=useContext(Usercontext);

    const navigate = useNavigate(); 

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                email: loggedinuser.email,
                password: loggedinuser.password
            })
            setUser(response.data.user);
            console.log(response.data.user)
            navigate('/homepage'); 
        } catch (error) {
            console.log("Failed to login loggedinuser");
            alert("Invalid Username or Password");
        }
    };
    console.log(user)
    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <h2>Log in to Makao</h2>
                <form style={styles.form} onSubmit={onLoginSubmit}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        style={styles.input} 
                        value={loggedinuser.email}
                        onChange={(e) => setloggedinUser({ ...loggedinuser, email: e.target.value })}
                    />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        minLength="8"
                        style={styles.input}
                        value={loggedinuser.password}
                        onChange={(e) => setloggedinUser({ ...loggedinuser, password: e.target.value })}
                    />
                    <small>Please enter 8 or more characters.</small>

                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>

            <div style={styles.rightSection}>
                <img src="login.jpg" alt="Modern House" style={styles.img} />
            </div>
        </div>
    );
};

export default Login;
