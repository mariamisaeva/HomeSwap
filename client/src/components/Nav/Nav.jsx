import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Nav.css";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const Nav = () => {
  const { user, setIsLoggedIn, setUserId, setToken } = useLogin();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="homeswap-logo" className="logo" />
        </Link>
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-toggle-label2">
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

export default Nav;
