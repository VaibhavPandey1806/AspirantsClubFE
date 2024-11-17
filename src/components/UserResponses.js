import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './constants';
import Header from './Header1';
import axios from 'axios';

import './UserResponses.css';

const UserResponses = () => {
  axios.defaults.withCredentials = true;

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getResponses`);
      const data = await response.data;
      setResponses(data.responses);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  return (
    <div className="user-responses">
      <Header></Header>
      <h2>Your Activity</h2>
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
    </div>
  );
};

export default UserResponses;
