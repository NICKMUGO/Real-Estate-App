import React, { useContext, useState, useEffect } from "react";
import "./Houses.css";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import PropertyForm from "./PropertyForm";

const AllProperties = () => {
  const [user] = useContext(Usercontext);
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [propertyId, setPropertyId] = useState("");

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/properties/`);
        setMyProperties(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

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
      backgroundColor:'white',
    },
    searchBarContainer: { 
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      width:'40%'
    },
    input: {
      flex: 1,
      marginRight: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
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

  const PropertySearch = () => {
    return myProperties.filter((property) => 
      property.property_type.toString().toLowerCase().includes(search.toLowerCase())
    );
  };

  const DeleteProperty = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/property/${id}/`);
      setMyProperties(myProperties.filter((property) => property.id !== id));
    }catch (error) {
      if (error.response) {
          console.error('Error response:', error.response.data); 
          alert(error.response.data.detail || 'Failed to Delete Property');
      } else {
          console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBarContainer}>
        <input 
          type="text" 
          style={styles.input} 
          placeholder="Search Property Type"
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <PropertyForm />
      <center>
        <div style={styles.houseDisplay}>
          {myProperties.length > 0 ? (
            PropertySearch().map((property) => (
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
                <button onClick={() => DeleteProperty(property.id)}>🚮</button>
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

export default AllProperties;
