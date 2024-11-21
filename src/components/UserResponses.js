import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './constants';
import Header from './Header1';
import axios from 'axios';

import './UserResponses.css';

const UserResponses = () => {
  axios.defaults.withCredentials = true;

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true); // Added to handle loading state
  const [error, setError] = useState(null); // Added to handle error state

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${BASE_URL}/getResponses`);
      const data = response.data;

      if (!data || !data.responses || data.responses.length === 0) {
        setResponses([]); // Set empty array if no responses
      } else {
        setResponses(data.responses);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
      setError("Failed to fetch responses. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-responses">
      <Header />
      <h2>Your Activity</h2>
      {responses.length > 0 ? (
        <ul className="response-list">
          {responses.map((item, index) => (
            <li key={index} className="response-item">
              <Link to={`/question/${item.question.id}`} className="question-link">
                <div className="question-text">{item.question.questionText}</div>
              </Link>
              <div className="response-details">
                <span className="time-taken">Time taken: {item.time} seconds</span>
                {item.response ? (
                  <span className="status correct">&#10004;</span> // Tick mark
                ) : (
                  <span className="status incorrect">&#10008;</span> // Cross mark
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-responses">No activity found.</div>
      )}
    </div>
  );
};

export default UserResponses;
