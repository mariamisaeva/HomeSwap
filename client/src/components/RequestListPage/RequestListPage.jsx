import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./RequestListPage.css";
import { logError } from "../../../../server/src/util/logging";
import nextSlider from "../../assets/icon-next-slider.svg";
import prevSlider from "../../assets/icon-prev-slider.svg";

function RequestListPage() {
  const navigate = useNavigate();
  const { userId, token } = useLogin();
  const [requests, setRequests] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);
  const [showIncoming, setShowIncoming] = useState(true);

  const { error: incomingRequestsError, performFetch: incomingRequestsFetch } =
    useFetch(`/swap/requests/${userId}`, onIncomingDataFetched);

  const { error: outgoingRequestsError, performFetch: outgoingRequestsFetch } =
    useFetch(`/swap/sentRequests/${userId}`, onOutgoingDataFetched);
  //fetch for incoming and outgoing requests
  useEffect(() => {
    if (userId && token) {
      incomingRequestsFetch({
        headers: { Authorization: `Bearer ${token}` },
      });
      outgoingRequestsFetch({
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [userId, token]);

  function onOutgoingDataFetched(data) {
    if (data.success) {
      setOutgoingRequests(data.data);
      setOutgoingCount(data.data.length);
      const initialIndexes = {};
      data.data.forEach((request) => {
        initialIndexes[request._id] = 0;
      });
      setImageIndexes(initialIndexes);
    } else {
      logError("Failed to fetch outgoing requests");
      setFetchError(
        "No outgoing requests available or data is in an unexpected format.",
      );
    }
  }

  function onIncomingDataFetched(data) {
    if (data.success) {
      const unprocessedRequests = data.data.filter(
        (request) =>
          request.status !== "accepted" && request.status !== "rejected",
      );
      setRequests(unprocessedRequests);
      setIncomingCount(unprocessedRequests.length);
      const initialIndexes = {};
      unprocessedRequests.forEach((request) => {
        initialIndexes[request._id] = 0;
      });
      setImageIndexes(initialIndexes);
    } else {
      logError("Failed to fetch requests");
      setFetchError(
        "No requests available or data is in an unexpected format.",
      );
    }
  }

  //added sweetAlert notifications
  async function handleAccept(requestId) {
    const request = requests.find((r) => r._id === requestId);
    const propertyLocation =
      request?.sender_propertyId?.address?.city || "unknown location";
    try {
      const result = await Swal.fire({
        title: "Confirm Acceptance?",
        text: `Would you like to proceed with accepting this swap request for a property located in ${propertyLocation}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1a2a4f",
        cancelButtonColor: "#ae593a",
        confirmButtonText: "Yes, accept it!",
        customClass: {
          popup: "swap-swal-popup",
          title: "swap-swal-title",
          icon: "swap-swal-icon",
          confirmButton: "swap-swal-confirm",
          cancelButton: "swap-swal-cancel",
        },
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `http://localhost:3000/api/swap/confirm/${requestId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data.success === true) {
          removeRequestFromList(requestId);
          Swal.fire(
            "Accepted!",
            "You have successfully accepted this swap request ",
            "success",
            {
              customClass: {
                popup: "swap-swal-popup",
                title: "swap-swal-title",
                icon: "swap-swal-icon",
                confirmButton: "swap-swal-confirm",
              },
            },
          );
        } else {
          Swal.fire("Failed!", "Failed to accept the swap request.", "error", {
            customClass: {
              popup: "swap-swal-popup",
              title: "swap-swal-title",
              icon: "swap-swal-icon",
              confirmButton: "swap-swal-confirm",
            },
          });
        }
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        "An error occurred while accepting the request.",
        "error",
        {
          customClass: {
            popup: "swap-swal-popup",
            title: "swap-swal-title",
            icon: "swap-swal-icon",
            confirmButton: "swap-swal-confirm",
          },
        },
      );
    }
  }

  async function handleReject(requestId) {
    try {
      const result = await Swal.fire({
        title: "Confirm Rejection?",
        text: "Are you sure you want to reject this swap request? This action cannot be undone and will remove the request from your list.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1a2a4f",
        cancelButtonColor: "#ae593a",
        confirmButtonText: "Yes, reject it!",
        customClass: {
          popup: "swap-swal-popup",
          title: "swap-swal-title",
          icon: "swap-swal-icon",
          confirmButton: "swap-swal-confirm",
          cancelButton: "swap-swal-cancel",
        },
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `http://localhost:3000/api/swap/reject/${requestId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data.success === true) {
          removeRequestFromList(requestId);
          Swal.fire(
            "Rejected!",
            "This swap request has been rejected.",
            "success",
            {
              customClass: {
                popup: "swap-swal-popup",
                title: "swap-swal-title",
                icon: "swap-swal-icon",
                confirmButton: "swap-swal-confirm",
              },
            },
          );
        } else {
          Swal.fire("Failed!", "Failed to reject the swap request.", "error", {
            customClass: {
              popup: "swap-swal-popup",
              title: "swap-swal-title",
              icon: "swap-swal-icon",
              confirmButton: "swap-swal-confirm",
            },
          });
        }
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        "An error occurred while rejecting the request.",
        "error",
        {
          customClass: {
            popup: "swap-swal-popup",
            title: "swap-swal-title",
            icon: "swap-swal-icon",
            confirmButton: "swap-swal-confirm",
          },
        },
      );
    }
  }

  const setCurrentImageIndex = (requestId, newIndex) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [requestId]: newIndex,
    }));
  };

  //gallery slider navigation
  const goToPreviousImage = (requestId) => {
    const request = displayedRequests.find((req) => req._id === requestId);
    const property = showIncoming
      ? request.sender_propertyId
      : request.receiver_propertyId;
    if (property && property.photos) {
      const photoCount = property.photos.length;
      const currentIndex = imageIndexes[requestId] || 0;
      const newIndex = currentIndex === 0 ? photoCount - 1 : currentIndex - 1;
      setCurrentImageIndex(requestId, newIndex);
    } else {
      logError("Property or photos not found for request:", requestId);
    }
  };

  const goToNextImage = (requestId) => {
    const request = displayedRequests.find((req) => req._id === requestId);
    const property = showIncoming
      ? request.sender_propertyId
      : request.receiver_propertyId;
    if (property && property.photos) {
      const photoCount = property.photos.length;
      const currentIndex = imageIndexes[requestId] || 0;
      const newIndex = currentIndex === photoCount - 1 ? 0 : currentIndex + 1;
      setCurrentImageIndex(requestId, newIndex);
    } else {
      logError("Property or photos not found for request:", requestId);
    }
  };

  //delete request from list on accept and reject
  function removeRequestFromList(requestId) {
    const filteredRequests = requests.filter(
      (request) => request._id !== requestId,
    );
    setRequests(filteredRequests);
    setIncomingCount(filteredRequests.length); //to update the count in btns when requests are deleted from ui
  }

  if (incomingRequestsError || outgoingRequestsError || fetchError) {
    const errorMessage =
      typeof fetchError === "string"
        ? fetchError
        : "An error occurred while fetching requests.";
    return <div className="swap-no-requests">{errorMessage}</div>;
  }
  //conditional rendering for incoming and outgoing requests
  const displayedRequests = showIncoming ? requests : outgoingRequests;

  if (displayedRequests.length === 0) {
    return (
      <div className="swap-no-requests">
        You currently have no {showIncoming ? "incoming" : "outgoing"} swap
        requests.
      </div>
    );
  }

  return (
    <div className="swap-container">
      <div className="swap-incoming-outgoing-buttons">
        <button
          className={`swap-incoming-btn ${showIncoming ? "active" : ""}`}
          onClick={() => setShowIncoming(true)}
        >
          Incoming Requests ({incomingCount})
        </button>
        <button
          className={`swap-outgoing-btn ${!showIncoming ? "active" : ""}`}
          onClick={() => setShowIncoming(false)}
        >
          Outgoing Requests ({outgoingCount})
        </button>
      </div>
      {displayedRequests.map((request, index) => {
        const property = showIncoming
          ? request.sender_propertyId
          : request.receiver_propertyId;
        if (!property) {
          logError("Property not found for request:", request._id);
          return null;
        }
        const photos = property.photos;
        const photoCount = photos.length;
        const isFirstImage = index === 0; //for seperately styling the first image

        return (
          <div className="swap-main" key={request._id}>
            <div className="swap-property-card">
              <div
                className="swap-property-image-container"
                onClick={() => navigate(`/property/view/${property._id}`)}
              >
                <div className="swap-property-image-wrapper">
                  <img
                    className={`swap-property-image ${
                      isFirstImage ? "first-image" : ""
                    }`}
                    src={photos[imageIndexes[request._id] || 0]}
                    alt="House"
                  />

                  {photoCount > 1 && (
                    <>
                      <div className="swap-pagination">
                        {photos.map((_, imgIndex) => (
                          <span
                            key={imgIndex}
                            className={`swap-pagination-indicator ${
                              imageIndexes[request._id] === imgIndex
                                ? "active"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(request._id, imgIndex);
                            }}
                          ></span>
                        ))}
                      </div>
                      <div className="swap-slider-controls">
                        <button
                          className="swap-slider-btn prev"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPreviousImage(request._id);
                          }}
                        >
                          <img src={prevSlider} alt="previous button" />
                        </button>
                        <button
                          className="swap-slider-btn next"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToNextImage(request._id);
                          }}
                        >
                          <img src={nextSlider} alt="next button" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="swap-property-info">
                <h2 className="swap-property-title">{property.title}</h2>
                <div className="swap-property-detail">
                  <p>
                    <span className="bold-text">Type of property:</span>{" "}
                    {property.type}
                  </p>
                  <p>
                    <span className="bold-text">Number of Bedrooms:</span>{" "}
                    {property.bedrooms}
                  </p>
                  <p>
                    <span className="bold-text">Number of Bathrooms:</span>{" "}
                    {property.bathrooms}
                  </p>
                  <p className="swap-property-detail">
                    <span className="bold-text">Address:</span>{" "}
                    {`${property.address.house_number} ${property.address.street}, ${property.address.postcode}`}
                  </p>
                  <p className="swap-property-detail">
                    <span className="bold-text">Location:</span>{" "}
                    {property.address.city}, {property.address.country}
                  </p>
                </div>
                <div className="swap-property-availability">
                  <span className="bold-text">Available from:</span>
                  <div>
                    {new Date(request.swap_date.start).toLocaleDateString()} to{" "}
                    {new Date(request.swap_date.end).toLocaleDateString()}
                  </div>
                </div>
                <div className="chat-container">
                  {request.message && request.message.trim() ? (
                    <div>
                      <div className="message-label">Message:</div>
                      <div className="message-bubble">
                        <div className="message-bubble-content">
                          {request.message.trim()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-label no-message">
                      No message provided
                    </div>
                  )}
                </div>
                <div className="swap-all-buttons">
                  <button
                    className="swap-more-info-btn"
                    onClick={() => navigate(`/property/view/${property._id}`)}
                  >
                    See More
                  </button>
                  <div className="swap-actions">
                    {showIncoming ? (
                      <>
                        <button
                          className="swap-confirm-btn"
                          onClick={() => handleAccept(request._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="swap-remove-btn"
                          onClick={() => handleReject(request._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="swap-status">
                        <span className="status-label">Status:</span>{" "}
                        {request.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RequestListPage;
