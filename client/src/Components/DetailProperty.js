import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProperty = () => {
  const { id } = useParams();
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
      backgroundColor: '#ffffff !important', // Ensure white background
      borderRadius: '15px',
      border: '5px solid #000 !important', // Ensure thick black border
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
      color: '#4CAF50',
      marginBottom: '15px',
      textAlign: 'center',
    },
    description: {
      fontSize: '18px',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'center',
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
        </div>
      ) : (
        <p>No property details found.</p>
      )}
    </div>
  );
};

export default DetailProperty;
