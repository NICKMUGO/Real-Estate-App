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
  const [search, setSearch] = useState("");
  const [editProperty, setEditProperty] = useState(null); 

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
      backgroundColor: 'white',
    },
    searchBarContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      width: '40%',
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
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.detail || 'Failed to Delete Property');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };
  const handleUpdate = async () => {
    if (editProperty) {
      const formData = new FormData();
      formData.append("property_type", editProperty.property_type);
      formData.append("price", editProperty.price);
      formData.append("description", editProperty.description);
      formData.append("address", editProperty.address);
      formData.append("status", editProperty.status);
      formData.append("user_id", user.user_id);
  
      if (editProperty.image instanceof File) {
        formData.append("image", editProperty.image);
      }
  
      try {
        const response = await axios.patch(
          `http://127.0.0.1:8000/property/${editProperty.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMyProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.id === editProperty.id ? response.data : property
          )
        );
        setEditProperty(null);
      } catch (error) {
        console.error("Error updating property:", error);
        alert(error.response?.data?.detail || "Failed to update property");
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
      {editProperty && (
        <div>
          <h3>Edit Property</h3>
          <button onClick={() => setEditProperty(null)}  style={{borderRadius:'40px',border:"none", padding:"5px"}}>❌</button>
          <input
            type="text"
            value={editProperty.property_type}
            onChange={(e) =>
              setEditProperty({ ...editProperty, property_type: e.target.value })
            }
          />
          <input
            type="text"
            value={editProperty.price}
            onChange={(e) =>
              setEditProperty({ ...editProperty, price: e.target.value })
            }
          />
          <input
            type="file"
            onChange={(e) =>
              setEditProperty({ ...editProperty, image: e.target.files[0] })
            }
          />
          <textarea
            value={editProperty.description}
            onChange={(e) =>
              setEditProperty({ ...editProperty, description: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Property</button>
        </div>
      )}

      <PropertyForm />
      <center>
        <div style={styles.houseDisplay}>
          {myProperties.length > 0 ? (
            PropertySearch().map((property) => (
              <div style={styles.card} key={property.id}>
                <img
                  src={property.image}
                  alt={property.description || "No description available"}
                  style={styles.image}
                />
                <br />
                Owner Name: {user.username}
                <br />
                Property Type: {property.property_type}
                <br />
                Status: {property.status}
                <br />
                Price: KES {property.price}
                <br />
                Description: {property.description}
                <br />
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <button onClick={() => DeleteProperty(property.id)} style={{borderRadius:'40px',border:"none", padding:"5px"}}>🚮</button>
                  <button onClick={() => setEditProperty(property)} style={{borderRadius:'40px',border:"none", padding:"5px"}}>✏️</button>
                </div>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </center>
    </div>
  );
};

export default Houses;
