import Navigation1 from "./components/Navigation1";
import "./LandingPage.css";

const landingPage = () => {
  return (
    <div className="homepage">
      <Navigation1 />
      <div className="heading">
        <h1 className="aspirants-club">
          Aspirants Club – Your Study Buddy to Success!
        </h1>
      </div>
      <div className="button-container">
        <button className="button">
          <div className="start-answering">Start Answering</div>
        </button>
      </div>
      <div className="beliefs">
        <div className="belief-content">
          <div className="belief-heading">
            <div className="what-we-believe">WHAT WE BELIEVE</div>
          </div>
          <div className="welcome-to-aspirants">
            Welcome to Aspirants Club, a dynamic question-and-answer platform
            designed to enhance your learning and problem-solving skills! Here,
            users can submit their own questions, challenge others, and engage
            in interactive learning sessions. With a built-in timer, our
            platform allows you to practice under timed conditions, helping you
            improve speed and accuracy. Whether you're preparing for tough
            challenges or just testing your knowledge, our community-driven
            website offers endless opportunities for growth. Join now,
            contribute your own questions, and be a part of an active learning
            environment where knowledge is shared and sharpened!
          </div>
        </div>
      </div>
    </div>
  );
};

export default landingPage;
