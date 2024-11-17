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

import React  from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from './Header'; // Import the Header component
import Footer from './Footer';
import Header1 from './Header1';
import { checkLogin } from './authUtils';

const Home = () => {
  const navigate = useNavigate();

  const handleAddQuestionClick = () => {
    navigate('/add-question'); // Navigate to Add Question page
  };

  const handleGetStartedClick = () => {
    navigate('/categories'); // Navigate to Categories page
  };

  return (
    <><div className="home-container">
      {console.log(checkLogin())};
      {checkLogin() ? <Header1 />:<Header></Header> }{/* Render the Header component */}
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
    </div><Footer></Footer></>
  );
};

export default Home;
