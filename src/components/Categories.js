import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Categories.css';
import Header from './Header1';
import { BASE_URL } from './constants';
import Footer from './Footer';

axios.defaults.withCredentials = true;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL + '/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch topics based on selected categories
  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCategoryIds.length === 0) {
        setTopics([]);
        return;
      }

      try {
        const response = await axios.get(BASE_URL + '/getTopicsByCategory', {
          params: { categories: selectedCategoryIds },
          paramsSerializer: (params) =>
            params.categories.map((cat) => `categoryId=${cat}`).join('&'),
        });
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, [selectedCategoryIds]);

  // Fetch sources
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.get(BASE_URL + '/sources');
        setSources(response.data);
      } catch (error) {
        console.error('Error fetching sources:', error);
      }
    };

    fetchSources();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleTopicChange = (topicId) => {
    setSelectedTopicIds((prevSelected) =>
      prevSelected.includes(topicId)
        ? prevSelected.filter((id) => id !== topicId)
        : [...prevSelected, topicId]
    );
  };

  const handleSourceChange = (sourceId) => {
    setSelectedSourceIds((prevSelected) =>
      prevSelected.includes(sourceId)
        ? prevSelected.filter((id) => id !== sourceId)
        : [...prevSelected, sourceId]
    );
  };

  // Update handleSubmit to pass selected IDs to the Questions component
  const handleSubmit = () => {
    navigate('/questions', {
      state: {
        selectedCategoryIds,
        selectedTopicIds,
        selectedSourceIds,
      },
    });
  };

  return (
  
      <><><Header /><div className="topics-column">
      <h2>Select Categories</h2>
      {categories.map((category) => (
        <div key={category.id} className="topic-item">
          <input
            type="checkbox"
            id={category.id}
            value={category.name}
            onChange={() => handleCategoryChange(category.id)} />
          <label htmlFor={category.id}>{category.name}</label>
        </div>

      ))}
    </div><div className="topics-column">
        {topics.length > 0 && (
          <>
            <h3>Select Topics</h3>
            {topics.map((topic) => (
              <div key={topic.id} className="topic-item">
                <input
                  type="checkbox"
                  id={topic.id}
                  value={topic.name}
                  onChange={() => handleTopicChange(topic.id)} />
                <label htmlFor={topic.id}>{topic.name}</label>
              </div>
            ))}
          </>
        )}
      </div><div className="topics-column">
        {selectedTopicIds.length > 0 && (
          <>
            <h3>Select Sources</h3>
            {sources.map((source) => (
              <div key={source.id} className="topic-item">
                <input
                  type="checkbox"
                  id={source.id}
                  value={source.name}
                  onChange={() => handleSourceChange(source.id)} />
                <label htmlFor={source.id}>{source.name}</label>
              </div>
            ))}
          </>
        )}



        <button onClick={handleSubmit} className="submit-button1">
          Submit
        </button>
      </div></><div><Footer></Footer></div></>

  );
};

export default Categories;
