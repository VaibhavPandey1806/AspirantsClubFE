import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
// import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Header1 from './Header1';

const Home = () => {
  const navigate = useNavigate();

  // Function to check login status by calling `isLogin` API
  const checkIsLoggedIn = async () => {
    try {
      const response = await axios.get("http://localhost:8081/public/isLogin");
     {
        const result = await response.data;
        console.log(result);
        return result===true?true:false; // Assume API returns { isLoggedIn: true/false }
      }
      // return false;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };

  // Handle navigation for "Submit Your Question"
  const handleAddQuestionClick = async () => {
    const isLoggedIn = await checkIsLoggedIn();
    if (isLoggedIn) {
      navigate('/add-question');
    } else {
      navigate('/register');
    }
  };

  // Handle navigation for "Access Question Bank"
  const handleGetStartedClick = async () => {
    const isLoggedIn = await checkIsLoggedIn();
    if (isLoggedIn) {
      navigate('/categories');
    } else {
      navigate('/register');
    }
  };

  return (
    <><>
      <Header1 /> {/* Assuming Header1 shows a generic header */}
      <div className="home-container">
        <div className="hero-text">
          Your One-Stop Destination for Mastering Competitive Exams—Free
          Resources, Peer Support, and Tools to Help You Succeed
        </div>
        <div className="button-container">
          <button className="main-button" onClick={handleAddQuestionClick}>
            Submit Your Question
          </button>
          <button className="main-button" onClick={handleGetStartedClick}>
            Access Question Bank
          </button>
        </div>
        <div className="header-line"></div>
      </div>
    </><Footer /></>
  );
};

export default Home;
