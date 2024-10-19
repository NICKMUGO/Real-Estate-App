import React, { useContext, useState, useEffect } from "react";
import "./Houses.css";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import PropertyForm from "./PropertyForm";
import { Link, useParams } from "react-router-dom";

function RentalDetail() {
  const { id } = useParams();
  const [user] = useContext(Usercontext);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchPrice, setPriceSearch] = useState("");

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/rental/${id}/`);
        setRentals(Array.isArray(response.data) ? response.data : [response.data]); 
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user.user_id, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#ffffff !important', 
      borderRadius: '15px',
      border: '5px solid #000 !important', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    image: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '20px',
    },
    details: {
      padding: '20px',
      backgroundColor: '#f2f2f2',
      borderRadius: '10px',
    },
    propertyType: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '20px 0',
      textAlign: 'center',
      color: '#333',
    },
    price: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#031739',
      marginBottom: '15px',
      textAlign: 'center',
    },
    description: {
      fontSize: '18px',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'center',
    },
    backButton: {
      padding: '10px 15px',
      margin: '20px auto',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#031739',
      color: 'white',
      cursor: 'pointer',
      display: 'block',
      textAlign: 'center',
      textDecoration: 'none',
    },
    userDetailsContainer: {
      marginTop: '20px',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: '#e9ecef',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    userDetail: {
      fontSize: '18px',
      lineHeight: '1.6',
      color: '#333',
      marginBottom: '10px',
    },
    userDetailLabel: {
      fontWeight: 'bold',
      color: '#031739',
    },
  };

  return (
    <div id="rental-details" style={styles.container}>
      {rentals.length > 0 ? (
        rentals.map((rental) => (
          <div key={rental.id}>
            <img
              src={rental.property ? `http://127.0.0.1:8000${rental.property.image}` : "No image available"}
              alt={rental.property ? rental.property.description : "No description available"}
              style={styles.image}
            />
            <div style={styles.details}>
              <h1 style={styles.propertyType}>
                {rental.property ? rental.property.property_type : "No Property Found"}
              </h1>
              <p style={{color:"black"}}>
                {rental.property ? rental.property.description : "No description available"}
              </p>
              <p style={styles.price}>
                Price: KES {rental.property ? rental.property.price : "No Price Found"}
              </p>
              <p style={styles.description}>
                Tenant: {rental.tenant ? rental.tenant.username : "No Tenant Found"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No rentals available.</p>
      )}
      <button onClick={() => window.history.back()} style={styles.backButton}>Go Back</button>
    </div>
  );
}

export default RentalDetail;
