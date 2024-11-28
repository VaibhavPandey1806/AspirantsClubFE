import React, { useState, useEffect } from 'react';
import './AddQuestion.css';
import Header from './Header1';
import { BASE_URL } from './constants';
import axios from 'axios';
import Footer from './Footer';

axios.defaults.withCredentials = true;

const AddQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState('new');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [topic, setTopic] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopicType, setSelectedTopicType] = useState('new');
  const [source, setSource] = useState('');
  const [newSource, setNewSource] = useState('');
  const [sources, setSources] = useState([]);
  const [selectedSourceType, setSelectedSourceType] = useState('new');
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    if (selectedCategoryType === 'existing') fetchCategories();
    if (selectedTopicType === 'existing') fetchTopics();
    if (selectedSourceType === 'existing') fetchSources();
  }, [selectedCategoryType, selectedTopicType, selectedSourceType]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      const data = await response.data;
      setCategories(data.map(item => item.name));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/topics`);
      const data = await response.data;
      setTopics(data.map(item => item.name));
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sources`);
      const data = await response.data;
      setSources(data.map(item => item.name));
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  const handleOptionChange = (option, value) => {
    setOptions({ ...options, [option]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newInvalidFields = {};

    if (!questionText) newInvalidFields.questionText = true;
    if (!options.A || !options.B || !options.C || !options.D) newInvalidFields.options = true;
    if (!correctAnswer) newInvalidFields.correctAnswer = true;
    if (!category && selectedCategoryType === 'existing') newInvalidFields.category = true;
    if (!newCategory && selectedCategoryType === 'new') newInvalidFields.newCategory = true;
    if (!topic && selectedTopicType === 'existing') newInvalidFields.topic = true;
    if (!newTopic && selectedTopicType === 'new') newInvalidFields.newTopic = true;
    if (!source && selectedSourceType === 'existing') newInvalidFields.source = true;
    if (!newSource && selectedSourceType === 'new') newInvalidFields.newSource = true;

    if (Object.keys(newInvalidFields).length > 0) {
      setInvalidFields(newInvalidFields);
      return;
    }

    const questionData = {
      questionText,
      section: category,
      topic: selectedTopicType === 'existing' ? topic : newTopic,
      source: selectedSourceType === 'existing' ? source : newSource,
      optionA: options.A,
      optionB: options.B,
      optionC: options.C,
      optionD: options.D,
      correctAnswer,
      categoryId: selectedCategoryType === 'existing' ? category : newCategory,
    };

    try {
      const response = await fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        alert('Question submitted successfully!');
      } else {
        alert('Failed to submit the question.');
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const renderInputClass = (field) => {
    return invalidFields[field] ? 'input-invalid' : '';
  };

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="add-question-container" style={{ flex: 1 }}>
          <h1 className="add-question-title">Add Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question:</label>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                className={renderInputClass('questionText')} />
            </div>
            <div className="form-group">
              <label>Options:</label>
              {['A', 'B', 'C', 'D'].map((option) => (
                <input
                  key={option}
                  type="text"
                  value={options[option]}
                  onChange={(e) => handleOptionChange(option, e.target.value)}
                  required
                  placeholder={`Option ${option}`}
                  className={renderInputClass('options')} />
              ))}
            </div>
            <div className="correct-answer-options">
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Correct Answer:</span>
              {['A', 'B', 'C', 'D'].map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswer === option}
                    onChange={() => setCorrectAnswer(option)}
                    required />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Category Type:</label>
              <input
                type="radio"
                value="existing"
                checked={selectedCategoryType === 'existing'}
                onChange={() => setSelectedCategoryType('existing')} /> Existing
              <input
                type="radio"
                value="new"
                checked={selectedCategoryType === 'new'}
                onChange={() => setSelectedCategoryType('new')} /> New
            </div>
            {selectedCategoryType === 'existing' ? (
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={renderInputClass('category')}>
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
                className={renderInputClass('newCategory')} />
            )}
            <div className="form-group">
              <label>Topic Type:</label>
              <input
                type="radio"
                value="existing"
                checked={selectedTopicType === 'existing'}
                onChange={() => setSelectedTopicType('existing')} /> Existing
              <input
                type="radio"
                value="new"
                checked={selectedTopicType === 'new'}
                onChange={() => setSelectedTopicType('new')} /> New
            </div>
            {selectedTopicType === 'existing' ? (
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className={renderInputClass('topic')}>
                <option value="">Select Topic</option>
                {topics.map((top, index) => (
                  <option key={index} value={top}>{top}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                required
                className={renderInputClass('newTopic')} />
            )}
            <div className="form-group">
              <label>Source Type:</label>
              <input
                type="radio"
                value="existing"
                checked={selectedSourceType === 'existing'}
                onChange={() => setSelectedSourceType('existing')} /> Existing
              <input
                type="radio"
                value="new"
                checked={selectedSourceType === 'new'}
                onChange={() => setSelectedSourceType('new')} /> New
            </div>
            {selectedSourceType === 'existing' ? (
              <select value={source} onChange={(e) => setSource(e.target.value)} className={renderInputClass('source')}>
                <option value="">Select Source</option>
                {sources.map((src, index) => (
                  <option key={index} value={src}>{src}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                required
                className={renderInputClass('newSource')} />
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div><Footer /></div>
    </>
  );
};

export default AddQuestion;