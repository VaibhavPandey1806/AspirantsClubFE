import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './constants';

import './UserResponses.css';

const UserResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getResponses`);
      const data = await response.json();
      setResponses(data.responses);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  return (
    <div className="user-responses">
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
