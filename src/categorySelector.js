import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategorySelector.css'; // Import the CSS file

const CategorySelector = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories'); // Adjust to your endpoint
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    navigate(`/category/${category.id}`); // Use category._id for the category ID
  };

  return (
    <>
      <div className="header">
        <h1>Select a Category</h1>
      </div>
      <div className="container">
        {categories.map((category) => (
          <button
            key={category._id} // Use category._id as the key
            className="category-button"
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name} {/* Display the category name */}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategorySelector;
