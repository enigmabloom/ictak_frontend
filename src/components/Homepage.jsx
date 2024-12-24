import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faBuilding, faSmile, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import './Homepage.css';
import PopularCategories from './PopularCategories';
import CustomNavbar from './CustomNavbar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <CustomNavbar />
      <div className="homepage">
        <div className="wrapper">
          {/* Icon Section */}
          <div className="icon-container">
            <FontAwesomeIcon icon={faStar} className="icon icon-star" />
            <FontAwesomeIcon icon={faClock} className="icon icon-clock" />
            <FontAwesomeIcon icon={faBuilding} className="icon icon-building" />
            <FontAwesomeIcon icon={faSmile} className="icon icon-smile" />
            <FontAwesomeIcon icon={faMoneyBill} className="icon icon-money" />
          </div>
          {/* Main Heading */}
          <div className="content">
            <h2>Over 5,000 internships are waiting for you</h2>
            <p></p>
          </div>
         {/* Signup Section */}
         <div className="signup-section">
              <p className="signup-text">
                Ready to kickstart your career? <br /> Sign up now to get access to the latest opportunities!
              </p>
              <Link to={'/signup'}>
                <button className="btn btn-success signup-btn">Sign Up</button>
              </Link>  
          </div>
          <div  className="popular-categories-container">
          <PopularCategories/>
          </div>
      
        </div>
      </div>
    </>
  );
};

export default HomePage;
