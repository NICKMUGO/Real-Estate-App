import React, { useEffect, useState } from "react";
import axios from "axios";
import UtilityPopup from "./UtilityPopup";
import PayUtility from "./PayUtility";
function UtilitiesPage() {
  const [utilities, setUtilities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUtility, setEditUtility] = useState();

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/utility/`);
        setUtilities(response.data);
        console.log(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.detail : "Failed to fetch utilities"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUtilities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "white",
    },
    searchBarContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
      width: "40%",
    },
    input: {
      flex: 1,
      marginRight: "10px",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    utilityDisplay: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "black",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      color: "#333",
      overflow: "hidden",
      height: "100%",
    },
    button: {
      backgroundColor: "#d4af37",
      color: "#fff",
      padding: "10px 15px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
  };

  const UtilitySearch = () => {
    return utilities.filter((utility) =>
      utility.utility_type.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/utility/${editUtility.utility_id}/`,
        editUtility
      );
      setUtilities((prevUtilities) =>
        prevUtilities.map((utility) =>
          utility.utility_id === editUtility.utility_id ? response.data : utility
        )
      );
      setEditUtility(null); 
    } catch (error) {
      console.error("Error updating rental:", error);
      setError("Failed to update rental");
    }
  };

  console.log(utilities[0].utility_type)

  const DeleteUtility= async(utility_id)=>{
    const response = await axios.delete(`http://127.0.0.1:8000/utility/${utility_id}/`);
    setUtilities(utilities.filter((utility)=>utility.id!==utility_id))
    console.log(response.data);
  }

  const RedirectUtilityProviders=()=>{
    window.location.href='/utilityproviderform';
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUtility(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={styles.container}>
      <PayUtility/><br></br>
      <header style={styles.header}>
        <h1>Manage Your Utilities</h1>
        <p>Streamline your utility services for a hassle-free living experience.</p>
      </header>
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search Utility Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <UtilityPopup/>
      {editUtility &&
        <div>
           <form>
                <div className='form-group'>
                  <button onClick={()=>setEditUtility(null)} style={{cursor:'pointer'}}>❌</button>
                </div>
                <div className='form-group'>
                  <label htmlFor='utility_name'>Choose Utility Name </label>
                  <input
                    type='text'
                    id='utility_name'
                    name='utility_type' 
                    value={editUtility.utility_type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Utility Description </label>
                  <textarea
                    type='text'
                    id='description'
                    name='description' 
                    value={editUtility.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type='submit' onClick={handleEdit} style={{cursor:'pointer'}}>Edit</button>
              </form>
        </div>
      }

      <center>
        <div style={styles.utilityDisplay}>
          {utilities.length > 0 ? (
            UtilitySearch().map((utility) => (
              <div style={styles.card} key={utility.utility_id}>
                <button onClick={() => setEditUtility(utility)}>✏️</button>
                <button onClick={() => DeleteUtility(utility.utility_id)} style={{marginLeft:'250px'}}>🚮</button>
                <h2 style={{color:"orange"}}>{utility.utility_type}</h2>
                <strong>
                  <p>{utility.description}</p>
                </strong>
                <button style={styles.button} onClick={()=>RedirectUtilityProviders()}>Find Providers</button>
              </div>
            ))
          ) : (
            <p>No utilities available.</p>
          )}
        </div>
      </center>

      <section className="payment-portal">
        <h2>Utility Payment Portal</h2>
        <p>Pay your utility bills securely and conveniently.</p>
        <button style={styles.button}>Go to Payment Portal</button>
      </section>

      <section className="resource-center">
        <h2>Resource Center</h2>
        <p>Find helpful articles and tips on managing your utilities efficiently.</p>
        <button style={styles.button}>Read Articles</button>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to our support team.
        </p>
        <p>Email: support@makao.com</p>
        <p>Phone: (254) 792-671-945</p>
      </section>
    </div>
  );
}

export default UtilitiesPage;
