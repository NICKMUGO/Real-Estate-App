import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Usercontext } from "./UserContextProvider";
import axios from 'axios';

const Logout = () => {
    const [user, setUser] = useContext(Usercontext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if( window.confirm("Are you sure ?")){
            try {
                await axios.post('http://127.0.0.1:8000/logout/');
                navigate('/');
                setUser(null);   
                localStorage.removeItem("user");    
                navigate('/login');
            } catch (error) {
                console.error("Logout failed:", error);
                alert("Failed to log out. Please try again."); 
            }
        }else{
            console.log("user cancelled")
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '5px',  marginBottom:'20px'}}>
            <button onClick={handleLogout} style={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: '#B4975A',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
            }}>
                ⏻ 
            </button>
        </div>
    );
};

export default Logout;
