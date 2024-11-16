import React, { useContext, useState, useEffect } from "react";
import "./Houses.css";
import { Usercontext } from "./UserContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import RentalPopup from "./RentalPopup";

function MyRentals() {
  const [user] = useContext(Usercontext);
  console.log("User Context:", user);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const[editRental,setEditRental]=useState();
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchPrice, setPriceSearch] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/rentalUser/${user.user_id}/`);
        setRentals(response.data);
        const responseClients = await axios.get('http://127.0.0.1:8000/clients/');
        setClients(responseClients.data);
      } catch (error) {
        setError(error.response ? error.response.data.detail : "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.user_id]);

  // useEffect(() => {
  //   const fetchTenantDetails = async () => {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/tenantDetail/${tenantId}/`);
  //       setTenantDetails(response.data);
  //     } catch (error) {
  //       setError(error.response ? error.response.data.detail : "Failed to fetch tenant details");
  //     }
  //   };
  //   fetchTenantDetails();
  // },[])

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
      if (!rental.property) return false;
      const matchesType = rental.property.property_type
        ? rental.property.property_type.toLowerCase().includes(search.toLowerCase())
        : false;
  
      const matchesPrice = rental.property.price
        ? rental.property.price.toString().includes(searchPrice)
        : false;
  
      return matchesType && matchesPrice;
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRental(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/rental/${editRental.id}/`,
        editRental
      );
      setRentals((prevRentals) =>
        prevRentals.map((rental) =>
          rental.id === editRental.id ? response.data : rental
        )
      );
      setEditRental(null); 
    } catch (error) {
      console.error("Error updating rental:", error);
      setError("Failed to update rental");
    }
  };
  const handleDelete = async (e,id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/rental/${id}/`,
      );
      setRentals(rentals.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error updating rental:", error);
      setError("Failed to update rental");
    }
  };

  // console.log(rentals[0].payment_status)

  console.log(rentals);

  console.log(editRental);

  return (
    <div style={styles.container}>
      {/* <div style={styles.searchBarContainer}>
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
      </div> */}
      {editRental &&
        <div>
           <form>
                <div className='form-group'>
                  <button onClick={()=>setEditRental(null)} style={{cursor:'pointer'}}>❌</button>
                  <label htmlFor='tenantname'>Tenant Name: </label>
                  <select
                    name='tenant'
                    value={editRental.tenant}
                    onChange={handleInputChange}
                    required
                  >
                    <option value=''>Select Tenant</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>{client.username}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='startdate'>Choose Start Date: </label>
                  <input
                    type='date'
                    id='startdate'
                    name='start_date' 
                    value={editRental.start_date ? new Date(editRental.start_date).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='enddate'>Choose End Date: </label>
                  <input
                    type='date'
                    id='enddate'
                    name='end_date' 
                    value={editRental.end_date ? new Date(editRental.end_date).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='monthlyrent'>Monthly Rent: </label>
                  <input
                    type='number'
                    id='monthlyrent'
                    name='monthly_rent'
                    value={editRental.monthly_rent}
                    onChange={handleInputChange}
                    step={10000}
                    min={0}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentstatus'>Payment Status: </label>
                  <select
                    id='paymentstatus'
                    name='payment_status'
                    value={editRental.payment_status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={false}>Not Paid</option>
                    <option value={true}>Paid</option>
                  </select>
                </div>
                <button type='submit' onClick={handleEdit} style={{cursor:'pointer'}}>Edit</button>
              </form>
        </div>
      }
      <RentalPopup/>
      <center>
        <div style={styles.houseDisplay}>
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div style={styles.card} key={rental.id}>
                <Link to={`/rental/${rental.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* <img
                    src={rental.property ? rental.property.image : "No tenant Found"}
                    alt={rental.property ? rental.property.description : "No tenant Found"}
                    style={styles.image}
                  />
                  <div style={styles.cardTitle}>
                    {rental.property ? rental.property.property_type : "No Property Found"}
                  </div> */}
                  {/* <div style={styles.cardText}>
                    Tenant: {rental.tenant ? rental.tenant.username : "No Tenant Found"}
                  </div> */}
                  <div style={styles.cardText}>
                    Price: KES {rental.monthly_rent}
                  </div>
                  <div style={styles.cardText}>
                    Status: {rental.payment_status ? "Paid" : "Not Paid"}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => { setEditRental(rental); }} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '16px' }}>
                    ✏️
                  </button>
                  <button type="button" onClick={(e) => handleDelete(e, rental.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '16px' }}>
                    🚮
                  </button>
                </div>
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
