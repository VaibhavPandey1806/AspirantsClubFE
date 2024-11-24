import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header1';
import { BASE_URL } from './constants';
import './Categories'; // Assuming the CSS file with the question styles
import  Footer from './Footer';

const Questions = () => {
  const location = useLocation();
  const { selectedCategoryIds, selectedTopicIds, selectedSourceIds } = location.state || {};
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getQuestionsByFilters`, {
          params: {
            categories: selectedCategoryIds,
            topics: selectedTopicIds,
            sources: selectedSourceIds,
          },
          paramsSerializer: (params) => {
            return (
              params.categories.map((cat) => `category=${cat}`).join('&') +
              '&' +
              params.topics.map((topic) => `topic=${topic}`).join('&') +
              '&' +
              params.sources.map((source) => `source=${source}`).join('&')
            );
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedCategoryIds && selectedTopicIds && selectedSourceIds) {
      fetchQuestions();
    }
  }, [selectedCategoryIds, selectedTopicIds, selectedSourceIds]);

  return (
    <><div>
      <Header />
      <h2>Questions</h2>
      <ul className="response-list">
        {questions.map((question) => (
          <li className="response-item" key={question.id}>
            <Link to={`/question/${question.id}`}>
              {question.questionText}
            </Link>
          </li>
        ))}
      </ul>
    </div><div><Footer></Footer></div></>
  );
};

export default Questions;
