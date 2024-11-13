import React, { useState } from 'react';
import axios from 'axios';

function AddQuestion({ token }) {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/questions', {
        questionText,
        category
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Question added successfully');
    } catch (error) {
      alert('Failed to add question');
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <input value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Question Text" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestion;
