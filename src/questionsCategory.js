import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Track current question
  const [timer, setTimer] = useState(0); // Timer state
  const [isTimerActive, setIsTimerActive] = useState(false); // Timer active state

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch questions by category when selectedCategory changes
  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`http://localhost:8081/api/questions?category=${selectedCategory}`);
          setQuestions(response.data);
          setCurrentQuestionIndex(0); // Set to the first question
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setQuestions([]); // Clear questions when category changes
    setCurrentQuestionIndex(-1); // Reset question index
    setTimer(0); // Reset timer
  };

  // Handle question selection
  const handleQuestionClick = (question) => {
    setCurrentQuestionIndex(questions.indexOf(question)); // Set the current question index
    setTimer(question.timer); // Set the timer from question data
    setIsTimerActive(true); // Activate the timer
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1); // Decrement timer
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isTimerActive, timer]);

  return (
    <div>
      <h1>Questions by Category</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h2>Questions</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id} onClick={() => handleQuestionClick(question)}>
              {question.questionText}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this category.</p>
      )}

      {currentQuestionIndex >= 0 && (
        <div>
          <h3>{questions[currentQuestionIndex].questionText}</h3>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <p>Time Remaining: {timer} seconds</p>
        </div>
      )}
    </div>
  );
};

export default QuestionsByCategory;
