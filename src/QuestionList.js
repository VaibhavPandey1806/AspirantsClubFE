import React, { useEffect, useState } from 'react';
import './QuestionList.css';  
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = ({ selectedCategory }) => {
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState(''); // Store category name here

  // Fetch questions based on selectedCategory
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/getquestions?category=${selectedCategory}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (selectedCategory) {
      fetchQuestions();
    }
  }, [selectedCategory]);

  // Fetch category name based on categoryId
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/categoryDetail?categoryId=${selectedCategory}`);
        setCategoryName(response.data.name); // Set the category name from the API response
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    if (selectedCategory) {
      fetchCategoryName();
    }
  }, [selectedCategory]);

  if (!selectedCategory) return null;

  if (questions.length === 0) return <p>No questions available for this category.</p>;

  return (
    <div>
      <h2>Questions in {categoryName || selectedCategory}</h2> {/* Display category name */}
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <Link to={`/question/${question.id}`}>{question.questionText}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
