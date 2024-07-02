import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { TbWheelchairOff } from "react-icons/tb";
import { TbSmokingNo } from "react-icons/tb";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { FaToggleOff } from "react-icons/fa";
import { GiBrokenPottery } from "react-icons/gi";
import { GiSonicShoes } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import "./UploadProperty4.css";

function UploadProperty4({
  submitFormData,
  formdata,
  setformdata,
  validateForm,
  errors,
  showPopup,
  setShowPopup,
}) {
  const [description, setDescription] = useState(formdata.description || "");
  const [house_rules, setRules] = useState(formdata.house_rules || []);
  const navigate = useNavigate();

  useEffect(() => {
    setformdata((prevFormData) => ({
      ...prevFormData,
      description,
      house_rules,
    }));
  }, [description, house_rules, setformdata]);

  const iconSize = 30;
  const uploadAmenitiesData = [
    {
      icon: <TbSmokingNo color="#ae593a" size={iconSize} />,
      text: "No smoking",
    },
    {
      icon: <MdOutlinePets color="#ae593a" size={iconSize} />,
      text: "No pets",
    },
    {
      icon: <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
      text: "No noise after 22:00",
    },
    {
      icon: <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
      text: "No kids",
    },
    {
      icon: <MdOutlineCleaningServices color="#ae593a" size={iconSize} />,
      text: "Clean before leaving",
    },
    {
      icon: <GiBrokenPottery color="#ae593a" size={iconSize} />,
      text: "Penalty applied for any damage",
    },
    {
      icon: <FaToggleOff color="#ae593a" size={iconSize} />,
      text: "Turn off lights and AC after use",
    },
    {
      icon: <TbWheelchairOff color="#ae593a" size={iconSize} />,
      text: "Wheelchair not accessible",
    },
    {
      icon: <CiMoneyBill color="#ae593a" size={iconSize} />,
      text: "Cleaning fee",
    },
    {
      icon: <GiSonicShoes color="#ae593a" size={iconSize} />,
      text: "No shoes allowed inside the property",
    },
  ];

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRuleToggle = (text) => {
    const updatedRules = [...house_rules];
    const ruleIndex = updatedRules.indexOf(text);
    if (ruleIndex !== -1) {
      updatedRules.splice(ruleIndex, 1);
    } else {
      updatedRules.push(text);
    }
    setRules(updatedRules);
  };

  const handleSubmitButtonClick = () => {
    if (validateForm()) {
      submitFormData();
    }
  };

  return (
    <>
      <div className="upload-property-container">
        <div>
          <div className="header-property4">
            <h1 className="upload-property-title">
              Describe your home, what makes it special?
            </h1>
            <div className="rules-error-deccription">
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
            <div className="textarae-input">
              <div className="text-input">
                <textarea
                  className="textarea-property4"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  id="text-area"
                  cols="30"
                  rows="10"
                >
                  Add home description...
                </textarea>
              </div>
            </div>
            <br />
            <div>
              <h1 className="upload-title">
                Please specify some rules for your home
              </h1>
            </div>
            <br />
            <div className="rules-error">
              {errors.rules && <span className="error">{errors.rules}</span>}
            </div>
            <div className="rules-input">
              <div className="upload-card2-container">
                <ul className="amenities-grid-4">
                  {uploadAmenitiesData.map((amenity, index) => (
                    <li
                      key={index}
                      className={`amenity-item ${
                        house_rules.includes(amenity.text) ? "selected" : ""
                      }`}
                      onClick={() => handleRuleToggle(amenity.text)}
                    >
                      <div className="amenity-icon">{amenity.icon}</div>
                      <span className="amenity-text">{amenity.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="property-image-property">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/bedroom-3318351-2766923.png"
            alt=""
            className="property-pic-property"
          />
          <div className="submit-btn-container">
            <button
              type="button"
              className="input-submit"
              onClick={handleSubmitButtonClick}
            >
              Submit
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="popup-submition">
            <div className="popup-content-submition">
              <span
                className="close-submition"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/profile");
                }}
              >
                &times;
              </span>
              <span className="content-submition">
                <h2>Thank you for your submission!</h2>
                <p>We appreciate you taking the time to share this with us.</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

UploadProperty4.propTypes = {
  submitFormData: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  setformdata: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UploadProperty4;
