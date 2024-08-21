import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  function fetchUser() {
    setLoading(true);
    axios
      .get(
        "https://jsonplaceholder.typicode.com/users/" +
          Math.floor(Math.random() * 10 + 1)
      )
      .then((responce) => {
        setUser(responce.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data!", error);
        setLoading(false);
      });
  }
  return (
    <div className={styles.profileContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className={styles.dataContainer}>
          <h1 className={styles.profileTitle}>{user.name}</h1>
          <p className={styles.profileInfo}>Email: {user.email}</p>
          <p className={styles.profileInfo}>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <button onClick={fetchUser} className={styles.loadButton}>
        Load New User
      </button>
    </div>
  );
}

export default UserProfile;
