import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./UploadPropertyNav.css";
import { useLogin } from "../../../context/LogInProvider/LogInProvider";

const UploadPropertyNav = ({ goToPreviousPage, validateForm }) => {
  const { user, setIsLoggedIn, setUserId, setToken } = useLogin();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    localStorage.clear();
  };

  const handlePreviousButtonClick = () => {
    if (validateForm()) {
      goToPreviousPage();
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <button
          className="navbar-logo"
          onClick={handlePreviousButtonClick}
          style={{ background: "none", border: "none" }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-toggle-label1">
          &#9776;
        </label>
        <ul className="navbar-menu">
          {!user ? (
            <>
              <li className="navbar-item">
                <Link to="/user/login" className="navbar-link log-in-btn">
                  Log in
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/user/signup" className="navbar-link sign-up-btn">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/home" className="navbar-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  About Us
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/user/login"
                  className="navbar-link logout-btn"
                  onClick={handleLogOut}
                >
                  Log out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

UploadPropertyNav.propTypes = {
  goToPreviousPage: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
};

export default UploadPropertyNav;
