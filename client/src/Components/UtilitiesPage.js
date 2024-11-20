import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UtilityPopup from "./UtilityPopup";
import { Usercontext } from "./UserContextProvider";

function UtilitiesPage() {
  const [utilities, setUtilities] = useState([]);
  const [search, setSearch] = useState("");
  const [editUtility, setEditUtility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user]=useContext(Usercontext)

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
      justifyContent: "between",
      gap:"300px",
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
      backgroundColor: "#f4f7fc",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      color: "#333",
      overflow: "hidden",
      height: "100%",
    },
    button: {
      borderRadius: "40px",
      border: "none",
      padding: "5px",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px",
    },
  };

  const UtilitySearch = () => {
    return utilities.filter((utility) =>
      utility.utility_type.toLowerCase().includes(search.toLowerCase())
    );
  };

  const DeleteUtility = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/utility/${id}/`);
      setUtilities(utilities.filter((utility) => utility.utility_id !== id));
    } catch (error) {
      console.error("Failed to delete utility", error);
    }
  };

  const handleUpdate = async () => {
    if (editUtility) {
      try {
        const response = await axios.patch(
          `http://127.0.0.1:8000/utility/${editUtility.utility_id}/`,
          editUtility
        );
        setUtilities((prevUtilities) =>
          prevUtilities.map((utility) =>
            utility.utility_id === editUtility.utility_id
              ? response.data
              : utility
          )
        );
        setEditUtility(null);
      } catch (error) {
        console.error("Failed to update utility", error);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUtility((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search Utility Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <UtilityPopup/>
      </div>

      {editUtility && (
        <div>
          <h3>Edit Utility</h3>
          <button
            onClick={() => setEditUtility(null)}
            style={styles.button}
          >
            ❌
          </button>
          <input
            type="text"
            name="utility_type"
            value={editUtility.utility_type}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            value={editUtility.description}
            onChange={handleEditChange}
          />
          <button onClick={handleUpdate}>Update Utility</button>
        </div>
      )}

      <center>
        <div style={styles.utilityDisplay}>
          {utilities.length > 0 ? (
            UtilitySearch().map((utility) => (
              <div style={styles.card} key={utility.utility_id}>
                <h3>{utility.utility_type}</h3>
                <p>{utility.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {user.role==='owner' &&(
                  <>
                    <button
                      onClick={() => DeleteUtility(utility.utility_id)}
                      style={styles.button}
                    >
                      🚮
                    </button>
                    <button
                      onClick={() => setEditUtility(utility)}
                      style={styles.button}
                    >
                      ✏️
                    </button>
                  </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No utilities available.</p>
          )}
        </div>
      </center>
    </div>
  );
}

export default UtilitiesPage;
