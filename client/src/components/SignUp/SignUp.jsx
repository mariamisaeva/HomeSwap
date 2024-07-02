import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess,
  );
  const { user, prevLocation } = useLogin();

  useEffect(() => {
    if (user) {
      prevLocation.pathname === "/user/signup"
        ? navigate("/home")
        : history.back();
    }
    return () => cancelFetch;
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.id]: "",
    }));
  };

  function onSuccess() {
    setFormData(initialFormState);
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set errors
    const validationErrors = validateForm(formData);
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  const validateForm = (formData) => {
    let errors = {};
    if (!formData.username) {
      errors.username = "Username is a required field";
    } else if (formData.username.includes(" ")) {
      errors.username = "Username cannot contain empty spaces";
    } else if (!/^[a-zA-Z0-9_ ]{3,20}$/.test(formData.username)) {
      errors.username = "Username cannot contain special characters";
    }

    if (!formData.email) {
      errors.email = "Email is a required field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <section className="sign-up" id="sign-up">
      <div className="sign-up-container">
        <div className="left">
          <div className="login-text">
            <p>
              Discover The <span className="login-text-span">World</span> Just
              From here!
            </p>
          </div>
          <div className="col-22">
            <form
              noValidate
              onSubmit={handleSubmit} /*action="" method="post"*/
            >
              <div className="password">
                <input
                  type="text"
                  /*name="user"*/
                  className="user-name"
                  placeholder="Username *"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <span className="error-user">{errors.username}</span>
                )}
                <br />
                <input
                  type="email"
                  /*name="password"*/
                  className="password-input"
                  placeholder="Email *"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <br />

                <input
                  type={showPassword ? "text" : "password"}
                  /* name="password"*/
                  className="password-input"
                  placeholder="Password *"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  // name="password"
                  className="password-input"
                  placeholder="Confirm password *"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="submit">
                <button type="submit" className="submit" disabled={isLoading}>
                  Sign Up
                </button>
                {/* <i className="fa-solid fa-arrow-right"></i> */}
              </div>
            </form>
          </div>

          <div>
            <p className="login-qustion">
              Already have an account ?{" "}
              <Link to={"/user/login"} className="login-qustion-span">
                Log In
              </Link>{" "}
            </p>
          </div>
        </div>
        <div className="right">
          <div className="image-grid">
            <img
              src="https://d2oto3d7z6t29c.cloudfront.net/entries/transformed/57/72/564471_bf0bb7c0d5454d40be4c39192d531f5e.jpg"
              alt=""
            />
            <img
              src="https://d3bzyjrsc4233l.cloudfront.net/news/Airbnb_A7WinGK.png"
              alt=""
            />
            <img
              src="https://ascentialcdn.filespin.io/api/v1/storyboard/4e4a6c6652f34ad5a91953297428f0e1/storyboard_000008.jpg?resize=600,600"
              alt=""
            />
            <img
              src="https://www.stashmedia.tv/wp-content/uploads/Screen-Shot-2020-06-30-at-9.58.12-AM-640x360.png"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqoynlEao_OGtwzz3VrtNdFlAdEZYuwL4z9guFzvjiG6x9kmN6VMzju66nf9IAPs1QFsQ&usqp=CAU"
              alt=""
            />
            <img
              src="https://thumbs.dreamstime.com/b/laptop-wooden-desk-art-student-s-airbnb-apartment-sea-view-home-garden-laptop-computer-rests-wooden-desk-art-276124832.jpg"
              alt=""
            />
            <img
              src="https://www.stashmedia.tv/wp-content/uploads/Screen-Shot-2020-06-30-at-10.00.37-AM-640x360.png"
              alt=""
            />
            <img
              src="https://thumbs.dreamstime.com/b/isometric-loft-unit-design-airbnb-apartment-two-story-interior-kitchen-study-living-room-bedroom-276315331.jpg"
              alt=""
            />
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/e011a8126119239.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/378543d6cf516239d9859579ba2046ca6552582d-1062x900.png?w=600&q=95&auto=format"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/59772dc7d53c66db1a123e4e0f6dc003000d74bf-1352x676.png?w=600&q=95&auto=format"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/d4fe4923d3e5d1f5a41eea65009f519af510c711-1350x676.png?w=600&q=95&auto=format"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
