import React from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import PropTypes from "prop-types";
import "./CreateSwapRequest.css";
import swal from "sweetalert";

function CreateSwapRequest({ receiver_propertyID, senderProperties }) {
  const { token } = useLogin();
  const [formData, setFormData] = useState({
    senderPropertyID: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  //fetch to create a swap request
  const {
    isLoading,
    error,
    performFetch: performSwapFetch,
  } = useFetch("/swap/create", onSwapSuccess);

  function onSwapSuccess() {
    setSuccessMsg("The request was sent successfully");
    setFormData({
      senderPropertyID: "",
      startDate: "",
      endDate: "",
      message: "",
    });
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "senderPropertyID") {
      const selectedProperty = senderProperties.find(
        (property) => property._id === value,
      );

      if (selectedProperty) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          senderPropertyID: selectedProperty._id,
        }));
      }
    }

    if (senderProperties.length === 1 && id !== "senderPropertyID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        senderPropertyID: senderProperties[0]._id,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    //Validations:
    if (formData.startDate < today || formData.endDate < today) {
      swal({
        title: "Invalid Date",
        text: "Start date cannot be a date in the past",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "custom-confirm-button",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (formData.startDate > formData.endDate) {
      swal({
        title: "Invalid Date",
        text: "End date must be after start date",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "custom-confirm-button",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (formData.senderPropertyID === receiver_propertyID) {
      swal({
        title: "Sorry",
        text: "You cannot apply for this property",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "custom-confirm-button",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (formData.startDate === formData.endDate) {
      swal({
        title: "Invalid Dates",
        text: "Please select different dates",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "custom-confirm-button",
            closeModal: true,
          },
        },
      });
      return;
    }

    const swapRequest = {
      sender_propertyId: formData.senderPropertyID,
      receiver_propertyId: receiver_propertyID,
      swap_date: {
        start: formData.startDate,
        end: formData.endDate,
      },
      status: "pending",
      message: formData.message,
    };

    performSwapFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(swapRequest),
    });
  };

  return (
    <div className="swap-request-container">
      <h4>Swap Request Form</h4>
      {isLoading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !successMsg ? (
        <form onSubmit={handleSubmit} className="swap-request-form">
          {senderProperties.length > 1 && (
            <select
              id="senderPropertyID"
              value={formData.senderPropertyID}
              onChange={handleChange}
              required
              className="select-property-dropdown"
            >
              <option value="" disabled>
                Select a property:{" "}
              </option>
              {senderProperties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.title}
                </option>
              ))}
            </select>
          )}
          <div className="dates-container">
            <div className="swap-req-date-container">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="date-input-swap-request"
              />
            </div>
            <div className="swap-req-date-container">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message (Optional)"
            className="text-area-swap-form"
            cols="30"
            rows="5"
          />
          <button type="submit" className="btn-default submit-swap-request">
            Submit
          </button>
        </form>
      ) : (
        <p>{successMsg}</p>
      )}
    </div>
  );
}

CreateSwapRequest.propTypes = {
  receiver_propertyID: PropTypes.string.isRequired,
  senderProperties: PropTypes.array.isRequired,
};

export default CreateSwapRequest;
