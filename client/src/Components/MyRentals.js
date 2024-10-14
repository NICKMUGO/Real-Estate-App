import React, { useContext, useState, useEffect } from "react";
import "./Houses.css";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import PropertyForm from "./PropertyForm";
import { Link } from "react-router-dom";
import RentalPopup from "./RentalPopup";

function MyRentals() {
  const [user] = useContext(Usercontext);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchPrice, setPriceSearch] = useState("");

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/rentalUser/${user.user_id}/`);
        setRentals(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user.user_id]);

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
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    searchBarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
      width: '100%',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      flex: 1,
      marginRight: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      color: '#333',
      backgroundColor: '#f1f1f1',
    },
    houseDisplay: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      color: '#333',
      transition: 'transform 0.3s ease',
      textAlign: 'center',
      border: '1px solid #e0e0e0',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#444',
    },
    cardText: {
      fontSize: '16px',
      marginBottom: '8px',
      color: '#666',
    },
  };

  const filteredRentals = () => {
    return rentals.filter((rental) => {
      const matchesType = rental.property_id.property_type.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = rental.property_id.price.toString().includes(searchPrice);
      return matchesType && matchesPrice;
    });
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
        <input
          type="text"
          style={styles.input}
          placeholder="Search by Price"
          value={searchPrice}
          onChange={(e) => setPriceSearch(e.target.value)}
        />
      </div>
      <RentalPopup/>
      <center>
        <div style={styles.houseDisplay}>
          {filteredRentals().length > 0 ? (
            filteredRentals().map((rental) => (
              <div style={styles.card} key={rental.id}>
                <Link to={`/rental/${rental.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={rental.property_id ? rental.property_id.image : "No tenant Found"}
                    alt={rental.property_id ? rental.property_id.description : "No tenant Found"}
                    style={styles.image}
                  />
                  <div style={styles.cardTitle}>
                    {rental.property_id ? rental.property_id.property_type : "No Property Found"}
                  </div>
                  <div style={styles.cardText}>
                    Tenant: {rental.tenant ? rental.tenant.username : "No Tenant Found"}
                  </div>
                  <div style={styles.cardText}>
                    Price: KES {rental.property_id ? rental.property_id.price : "No Price Found"}
                  </div>
                  <div style={styles.cardText}>
                    Status: {rental.property_id ? rental.property_id.status : "No Status Found"}
                  </div>
                  <div style={styles.cardText}>
                    Start Date: {new Date(rental.start_date).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div style={styles.cardText}>
                    End Date: {new Date(rental.end_date).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No rentals available.</p>
          )}
        </div>
      </center>
    </div>
  );
}

export default MyRentals;
