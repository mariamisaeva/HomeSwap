import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const initialFormState = {
  email: "",
  password: "",
};

function LogIn() {
  const {
    user,
    setIsLoggedIn,
    setUserId,
    setToken,
    setUsername,
    prevLocation,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  const { isLoading, error, performFetch } = useFetch("/user/login", onSuccess);

  useEffect(() => {
    if (user) {
      prevLocation.pathname === "/user/login"
        ? navigate("/home")
        : history.back();
    }
  }, [user, prevLocation.pathname]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  function onSuccess(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserId(userData.id);
    setToken(userData.token);
    setUsername(userData.username);
    history.back();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <section className="log-in" id="log-in">
      <div className="log-in-container">
        <div className="left">
          <div className="login-text">
            <p>
              Discover The <span className="login-text-span">World</span> Just
              From here!
            </p>
          </div>
          <div className="log-in-form">
            <form onSubmit={handleSubmit} /*action="" method="post"*/>
              <div className="password">
                <input
                  type="email"
                  /* name="email"*/
                  className="email-input"
                  placeholder="Email *"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />

                <input
                  type={showPassword ? "text" : "password"}
                  /*name="password"*/
                  className="password-input"
                  placeholder="Password *"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
              <div className="submit">
                <button type="submit" className="submit" disabled={isLoading}>
                  Log In
                </button>
                {/* <i className="fa-solid fa-arrow-right"></i> */}
              </div>
            </form>
          </div>
          <div>
            <p className="login-qustion">
              Dont have an account yet?{" "}
              <Link to={"/user/signup"} className="login-qustion-span">
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
        <div className="right">
          <div className="image-grid">
            <img
              src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://thumbs.dreamstime.com/b/laptop-wooden-desk-art-student-s-airbnb-apartment-sea-view-home-garden-laptop-computer-rests-wooden-desk-art-276124832.jpg"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1604348825621-22800b6ed16d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1536140012599-830a641c27e6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1603034203013-d532350372c6?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1597221336986-7a948756cd3a?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1551865673-9e9ee4f8cd4c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1628778637004-8b346181ba8c?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
