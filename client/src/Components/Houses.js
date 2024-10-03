import React, { useContext, useState, useEffect } from "react";
import "./Houses.css";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import PropertyForm from "./PropertyForm";

const Houses = () => {
  const [user] = useContext(Usercontext);
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/properties/user/${user.user_id}/`);
        setMyProperties(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1300px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#031739',
    },
    searchBar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    input: {
      flex: 1,
      marginRight: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    searchButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    },
    houseDisplay: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      color: '#333',
      overflow: 'hidden',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBar}>
        <input type="text" style={styles.input} id="location" placeholder="Location" />
        <input type="text" style={styles.input} placeholder="Property Type" />
        <button style={styles.searchButton} id="search">Search</button>
      </div>
      <PropertyForm/>

      <center>
        <div style={styles.houseDisplay}>
          {myProperties.length > 0 ? (
            myProperties.map((property) => (
              <div style={styles.card} key={property.id}>
                <img
                  src={property.image}
                  alt={property.description || 'No description available'}
                  style={styles.image}
                />
                <br />
                Owner Name: {user.username}<br />
                Property Type: {property.property_type}<br />
                Status: {property.status}<br />
                Price: KES {property.price}<br />
                Description: {property.description}<br />
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </center>
    </div>
  );
}

export default Houses;
