import React, { useEffect, useState } from "react";
import addIcon from "../../assets/icon-add.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Nav/Nav";
import "./ProfileComponent.css";
import { Link } from "react-router-dom";
import ProfilePropertyList from "../ProfilePropertyList/ProfilePropertyList";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import useFetch from "../../hooks/useFetch";
import RequestListPage from "../RequestListPage/RequestListPage";
import "../RequestListPage/RequestListPage.css";
import HomeBackground from "../RequestListPage/HeroSection";

function ProfileComponent() {
  const { userId, token, setUserProperties, setUserRequests, username } =
    useLogin();

  const onReceived = (data) => {
    setUserProperties(data.data);
  };
  const onRequestsReceived = (data) => {
    setUserRequests(data.data);
  };
  const { performFetch: fetchProperties } = useFetch(
    `/user/properties/${userId}`,
    onReceived,
  );
  const { performFetch: fetchRequests } = useFetch(
    `/swap/requests/${userId}`,
    onRequestsReceived,
  );

  const [activeTab, setActiveTab] = useState("My properties");
  const myProperties = activeTab === "My properties";
  const myRequests = activeTab === "My requests";
  const [transition, setTransition] = useState(false); //added transition for a smooth transition between tabs

  useEffect(() => {
    if (token) {
      if (activeTab === "My properties") {
        fetchProperties({
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (activeTab === "My requests") {
        fetchRequests({
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    }
  }, [activeTab, token]);

  // change activeTab state to the text content of button clicked so that active className can be applied (default is "My properties')
  const handleClick = (e) => {
    setTransition(true);
    setTimeout(() => {
      setActiveTab(e.target.textContent);
      setTransition(false);
    }, 500);
  };

  return (
    <>
      <Nav />
      <HomeBackground
        className="swap-hero-container"
        style={{
          marginTop: "-30px",
          marginBottom: "30px",
        }}
      >
        <h1 className="swap-hero-title">Find a home that suits your needs</h1>
      </HomeBackground>
      <div className="add-profile-page">
        {/* conditionally rendering add to profile button in my properties tab */}
        {myProperties && (
          <button className="add-to-profile">
            <Link to={"/property/upload"}>
              <img src={addIcon} alt="add button" />
            </Link>
          </button>
        )}
        <div className="card-and-list-container">
          {/* conditionally applied classes for adjustments in my component */}
          <div className="card-container">
            <div
              className={`upper-container ${myRequests ? "requests-active" : ""}`}
            >
              <div className="image-container">
                <FontAwesomeIcon icon={faUser} className="user-pic-icon" />
              </div>
            </div>
            <div className="lower-container">
              <div>
                <h4>{username}</h4>
              </div>
              <div className="tab-btns-container">
                <button
                  onClick={handleClick}
                  className={`${myProperties ? "active-tab-profile" : ""} btn-default profile-tabs-btn`}
                >
                  My properties
                </button>
                <button
                  onClick={handleClick}
                  className={`${myRequests ? "active-tab-profile" : ""} profile-tabs-btn`}
                >
                  My requests
                </button>
              </div>
            </div>
          </div>
          <div
            className={`content-container ${transition ? "fade-out" : "fade-in"}`}
          ></div>
          {myProperties ? <ProfilePropertyList /> : <RequestListPage />}
        </div>
      </div>
    </>
  );
}
export default ProfileComponent;
