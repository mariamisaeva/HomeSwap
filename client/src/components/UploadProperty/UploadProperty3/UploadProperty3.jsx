import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./UploadProperty3.css";

function UploadProperty3({
  goToNextPage,
  formdata,
  setformdata,
  validateForm,
  errors,
  handlePhotoUpload,
  handleDeletePhoto,
  showPhotoInput,
}) {
  let [productCountBed, setProductCountBed] = useState(0);
  let [productCountBath, setProductCountBath] = useState(0);
  let fileInputRef = useRef(null);

  let incrementProductCountBed = function () {
    setProductCountBed((prev) => prev + 1);
    setformdata((prev) => ({ ...prev, bedrooms: prev.bedrooms + 1 }));
  };

  let decrementProductCountBed = function () {
    setProductCountBed((prev) => prev - 1);
    setformdata((prev) => ({
      ...prev,
      bedrooms: Math.max(prev.bedrooms - 1, 0),
    }));
  };

  let incrementProductCountBath = function () {
    setProductCountBath((prev) => prev + 1);
    setformdata((prev) => ({ ...prev, bathrooms: prev.bathrooms + 1 }));
  };

  let decrementProductCountBath = function () {
    setProductCountBath((prev) => prev - 1);
    setformdata((prev) => ({
      ...prev,
      bathrooms: Math.max(prev.bathrooms - 1, 0),
    }));
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleNextButtonClick = () => {
    if (validateForm()) {
      goToNextPage();
    }
  };

  return (
    <>
      <div className="upload-property-container">
        <div>
          <header className="upload-property3-header">
            <h1 className="upload-property-title">
              How many bedrooms and bathrooms are in your home?
            </h1>
            <div className="bath-error">
              {errors.bedrooms && (
                <span className="error-bath">{errors.bedrooms}</span>
              )}
              {errors.bathrooms && (
                <span className="error-bath">{errors.bathrooms}</span>
              )}
            </div>
            <div className="bathrooms-input">
              <div className="bathrooms-input1-property3">
                <div className="input-h2">
                  <h2>Bedrooms</h2>
                </div>
                <div className="input-btn">
                  <button
                    onClick={decrementProductCountBed}
                    disabled={productCountBed === 0}
                    type="button"
                  >
                    -
                  </button>
                  <input
                    className="input-property3"
                    type="text"
                    name="bedrooms"
                    value={formdata.bedrooms}
                    onChange={(event) =>
                      setformdata({
                        ...formdata,
                        bedrooms: parseInt(event.target.value, 10),
                      })
                    }
                  />
                  <button onClick={incrementProductCountBed} type="button">
                    +
                  </button>
                </div>
              </div>
              <div className="bathrooms-input1-property3">
                <div className="input-h2">
                  <h2>Bathrooms</h2>
                </div>
                <div className="input-btn">
                  <button
                    onClick={decrementProductCountBath}
                    disabled={productCountBath === 0}
                    type="button"
                  >
                    -
                  </button>
                  <input
                    className="input-property3"
                    type="text"
                    name="bathrooms"
                    value={formdata.bathrooms}
                    onChange={(event) =>
                      setformdata({
                        ...formdata,
                        bathrooms: parseInt(event.target.value, 10),
                      })
                    }
                  />
                  <button onClick={incrementProductCountBath} type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div>
              <h1 className="upload-property-title">
                Please add some photos of your home
              </h1>
            </div>
            <div className="photo-error">
              {errors.photos && <span className="error">{errors.photos}</span>}
            </div>
            <input
              type="file"
              multiple
              onChange={handlePhotoUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
              name="photos"
            />
            <div className="bathrooms-input">
              <div className="bathrooms-input1">
                <div
                  className="input-h2"
                  onClick={handleAddPhotoClick}
                  style={{ cursor: "pointer" }}
                >
                  <h2 style={{ fontSize: 50 }}>+</h2>
                </div>
              </div>
            </div>
            {showPhotoInput && formdata.photos.length > 0 && (
              <div className="bathrooms-input">
                <div className="add-photoes">
                  {formdata.photos.map((photo, index) => (
                    <div key={index} className="uploaded-photo-property3">
                      <img
                        src={photo}
                        alt={`Uploaded ${index}`}
                        style={{ width: 100, height: 100, borderRadius: 23 }}
                        value={formdata.photos}
                        name="photos"
                      />
                      <button
                        onClick={() => handleDeletePhoto(index)}
                        type="button"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </header>
        </div>
        <div className="property-image-property">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2642/2642358.png"
            alt=""
            className="property-pic-property"
          />
          <div className="submit-btn-container">
            <button
              type="button"
              className="input-submit"
              onClick={handleNextButtonClick}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

UploadProperty3.propTypes = {
  goToNextPage: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  setformdata: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handlePhotoUpload: PropTypes.func.isRequired,
  handleDeletePhoto: PropTypes.func.isRequired,
  showPhotoInput: PropTypes.bool.isRequired,
};

export default UploadProperty3;
