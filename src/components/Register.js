import React, { useState } from "react";
import { BASE_URL,BASE_URL2 } from "./constants";
import axios from "axios";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "1.5em",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "8px",
      fontSize: "0.9em",
      color: "#555",
    },
    input: {
      marginBottom: "16px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1em",
      color: "#333",
    },
    button: {
      padding: "10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1em",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginBottom: "10px",
    },
    buttonSecondary: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1em",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    message: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "0.9em",
    },
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check username availability
      const checkResponse = await axios.post(`${BASE_URL1}/checkUsername`,{username:formData.username});

      const checkResult = await checkResponse.data

      if (!checkResult.available) {
        setMessage("Username is already taken. Please try another.");
        setMessageColor("red");
        return;
      }

      // Add user
      const addUserResponse = await axios.post(
        `${BASE_URL}/addUser`,
        formData, // The request body
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

      if (addUserResponse.ok) {
        setMessage("");
        alert("User registered successfully!");
        window.location.href = `${BASE_URL2}/login`;
      } else {
        setMessage("Failed to register user. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
      setMessageColor("red");
    }
  };

  // Redirect to login page
  const redirectToLogin = () => {
    window.location.href = `${BASE_URL2}/login`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="username">
          Username
        </label>
        <input
          style={styles.input}
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          style={styles.input}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.input}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label style={styles.label} htmlFor="mobile">
          Mobile
        </label>
        <input
          style={styles.input}
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <label style={styles.label} htmlFor="password">
          Password
        </label>
        <input
          style={styles.input}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <button onClick={redirectToLogin} style={styles.buttonSecondary}>
        Already a user? Login
      </button>
      {message && <p style={{ ...styles.message, color: messageColor }}>{message}</p>}
    </div>
  );
};

export default Register;
