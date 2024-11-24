import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Add CSS for styling
import Header1 from "./Header1";
import Footer from "./Footer";
import { BASE_URL } from "./constants";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user details from the API
  useEffect(() => {
    axios
      .get(`${BASE_URL}/userDetails`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details");
      });
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <><div><Header1></Header1></div><div className="profile-page">
          <div className="profile-header">
              <div className="profile-avatar">
                  <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                      alt="User Avatar" />
              </div>
              <div className="profile-info">
                  <h1>{user.name}</h1>
                  <p className="profile-email">{user.emailId}</p>
              </div>
          </div>
          <div className="profile-details">
              <h2>Profile Details</h2>
              <div className="details-grid">
                  <div>
                      <strong>Mobile:</strong>
                      <p>{user.mobile}</p>
                  </div>
                  <div>
                      <strong>Username:</strong>
                      <p>{user.username}</p>
                  </div>
              </div>
          </div>
      </div>
      <div><Footer></Footer></div></>
  );
};

export default Profile;
