// QuestionDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionDisplay = ({ selectedCategory }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://192.168.31.38:8081/api/getquestions?category=${selectedCategory}`);
        setQuestions(response.data);
        setCurrentQuestionIndex(0);
        setResult(''); // Reset result on category change
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Handle the error appropriately
      }
    };

    if (selectedCategory) {
      fetchQuestions();
    }
  }, [selectedCategory]);

  const handleAnswerSelect = (option) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (option === currentQuestion.correctAnswer) {
      setResult('Correct Answer!');
    } else {
      setResult('Wrong Answer. Try Again!');
    }

    setSelectedAnswer(option); // Track the selected answer
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setResult('');
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1; // Move to the next question
      }
      return prevIndex; // Stay on the last question if already at the end
    });
  };

  if (!selectedCategory) return null;

  if (questions.length === 0) return <p>No questions available for this category.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.questionText}</h2>
      <div>
        {currentQuestion.options.map((option) => (
          <button 
            key={option} 
            onClick={() => handleAnswerSelect(option)} 
            style={{ backgroundColor: option === selectedAnswer ? '#d3d3d3' : 'white' }} // Optional: Highlight selected answer
          >
            {option}
          </button>
        ))}
      </div>
      {result && <p>{result}</p>}
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
      {currentQuestionIndex === questions.length - 1 && result && (
        <p>You have completed the quiz!</p> // Message for completing the quiz
      )}
    </div>
  );
};

export default QuestionDisplay;
