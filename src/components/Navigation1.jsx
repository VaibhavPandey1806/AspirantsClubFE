import PropTypes from "prop-types";
import "./Navigation1.css";

const Navigation1 = ({ className = "" }) => {
  return (
    <header className={`navigation ${className}`}>
      <div className="subnavigation">
        <h1 className="aspirants-club1">Aspirants Club</h1>
      </div>
      <div className="content">
        <div className="inner-content">
          <div className="links">
            <div className="shop">Shop</div>
            <div className="newstand">Newstand</div>
            <div className="who-we-are">Who we are</div>
            <div className="my-profile">My profile</div>
          </div>
        </div>
        <button className="cart-button">
          <div className="submit-your-question">Submit Your Question</div>
        </button>
      </div>
    </header>
  );
};

Navigation1.propTypes = {
  className: PropTypes.string,
};

export default Navigation1;
