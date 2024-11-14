// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update this line
import Home from './components/Home';
import AddQuestion from './components/AddQuestion';
import Categories from './components/Categories';
import Questions from './components/Questions';
import QuestionDetail from './components/QuestionDetail';
import Login from './components/Login'
import UserResponses from'./components/UserResponses';

const App = () => {
  return (
    <Router>
      <Routes> {/* Update this line */}
        <Route path="/" element={<Home />} /> {/* Update this line */}
        <Route path="/login" element={<Login />} /> {/* Update this line */}
        <Route path="/add-question" element={<AddQuestion />} /> {/* Update this line */}
        <Route path="/categories" element={<Categories />} /> {/* Update this line */}
        <Route path="/questions" element={<Questions />} />
        <Route path="/responses" element={<UserResponses />} />
        <Route path="/question/:questionId" element={<QuestionDetail />} />
      </Routes> {/* Update this line */}
    </Router>
  );
};

export default App;
