// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';
// import Header from './Header'; // Import the Header component

// const Home = () => {
//   const navigate = useNavigate();

//   const handleAddQuestionClick = () => {
//     navigate('/add-question'); // Navigate to Add Question page
//   };

//   const handleGetStartedClick = () => {
//     navigate('/categories');
//     // alert("Get started with our resources!");
//   };

//   return (
//     <div className="home-container">
//       <Header /> {/* Render the Header component here */}
//       <div className="hero-text">
//         Your One-Stop Destination for Mastering Competitive Exams—Free
//         Resources, Peer Support, and Tools to Help You Succeed
//       </div>
//       <div className="button-container">
//         <button className="main-button" onClick={handleAddQuestionClick}>
//           Submit Your Question
//         </button>
//         <button className="main-button" onClick={handleGetStartedClick}>
//           Access Question Bank
//         </button>
//       </div>
//       <div className="header-line"></div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from './Header'; // Import the Header component

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8081/public/isLogin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials like cookies if required
        });

        if (response.ok) {
          const data = await response.json();
          if (!data) {
            navigate('/Login'); // Redirect to Login if not logged in
          }
        } else {
          console.error('Failed to verify login status:', response.statusText);
          navigate('/Login'); // Redirect to Login on API failure
        }
      } catch (error) {
        console.error('Error occurred while checking login status:', error);
        navigate('/Login'); // Redirect to Login on error
      }
    };

    checkLoginStatus(); // Call the function on component mount
  }, [navigate]);

  const handleAddQuestionClick = () => {
    navigate('/add-question'); // Navigate to Add Question page
  };

  const handleGetStartedClick = () => {
    navigate('/categories'); // Navigate to Categories page
  };

  return (
    <div className="home-container">
      <Header /> {/* Render the Header component */}
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
  );
};

export default Home;
