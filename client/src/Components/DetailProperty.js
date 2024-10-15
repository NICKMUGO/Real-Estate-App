import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/property/${id}/`);
        setProperty(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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
      color: '#031739', // Change to blue
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
      backgroundColor: '#031739', // Change to blue
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
      color: '#031739', // Change to blue
    },
  };

  return (
    <div id="property-details" style={styles.container}>
      {property ? (
        <div>
          <img 
            src={property.image} 
            alt={property.description || 'Property Image'} 
            style={styles.image} 
          />
          <div style={styles.details}>
            <h1 style={styles.propertyType}>{property.property_type}</h1>
            <p style={styles.price}>Price: KES {property.price}</p>
            <p style={styles.description}>{property.description}</p>
          </div>
          <div style={styles.userDetailsContainer}>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>User Details</h2>
            <p style={styles.userDetail}>
              <span style={styles.userDetailLabel}>Username: </span>
              {property.owner ? property.owner.username : "No user found"}
            </p>
            <p style={styles.userDetail}>
              <span style={styles.userDetailLabel}>Email: </span>
              {property.owner ? property.owner.email : "No email found"}
            </p>
            <p style={styles.userDetail}>
              <span style={styles.userDetailLabel}>Phone Number: </span>
              {property.owner ? property.owner.phone_number : "No phone number found"}
            </p>
          </div>
          <button onClick={() => navigate(-1)} style={styles.backButton}>Go Back</button>
        </div>
      ) : (
        <p>No property details found.</p>
      )}
    </div>
  );
};

export default DetailProperty;
