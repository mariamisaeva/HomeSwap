import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logError } from "../../../../server/src/util/logging";
import "./SearchBar.css";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import HomeBackground from "../HomeBackground/HomeBackground";

const Search = () => {
  const {
    setProperties,
    setCurrentPage,
    setTotalPages,
    searchParams,
    setSearchParams,
    params,
  } = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [type, setTypes] = useState([]);
  const { error, performFetch } = useFetch(
    "/property/amenities",
    onDataReceived,
  );

  const {
    isLoading,
    error: dataError,
    performFetch: performPropertiesFetch,
  } = useFetch(`/property/get?${params}`, onPropertiesReceived);

  function onDataReceived(data) {
    setAmenities(data.data);
  }

  function onPropertiesReceived(data) {
    // overwrites the properties from first render + currentPage and totalPages so that pagination can be shown accordingly
    setProperties(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setLoader(false);
  }

  const {
    isLoading: isTypesLoading,
    error: typesError,
    performFetch: fetchPropertyTypes,
  } = useFetch("/property/get?/type", onTypesDataReceived);

  //Used Set to remove duplicate values from  both type and  number of bedrooms array
  function onTypesDataReceived(data) {
    if (data && data.data) {
      const uniqueTypes = [...new Set(data.data.map((item) => item.type))];
      setTypes(uniqueTypes);
    }
  }

  useEffect(() => {
    performFetch();
    fetchPropertyTypes();
    if (error) {
      logError("Error fetching amenities:", error);
    } else if (typesError) {
      logError("Error fetching property types:", error);
    }
  }, []);

  //fixed the issue with negatives in the bedroom bedrooms dropdown
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for 'bedrooms' and prevent it from going below 0
    if (name === "bedrooms") {
      const sanitizedValue = Math.max(0, parseInt(value, 10));
      setSearchParams((prevParams) => ({
        ...prevParams,
        [name]: sanitizedValue || "", // Used sanitizedValue here or revert to empty string if NaN
      }));
    } else {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
    }
  };

  //search form fields validation
  const validateSearchCriteria = () => {
    if (
      !searchParams.country &&
      !searchParams.city &&
      !searchParams.type &&
      !searchParams.bedrooms &&
      searchParams.amenities.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    setErrorMessage(null);
    if (!validateSearchCriteria()) {
      setErrorMessage("Please enter at least one search criteria.");
      return;
    }
    setLoader(true);
    setTimeout(() => {
      performPropertiesFetch();
      if (dataError) {
        toast.error(
          "Currently there are no properties that matches your search criteria.",
        );
      }
    }, 1000);
  };

  const style = {
    position: "fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="search-container-main">
      <HomeBackground className="search-container-home-bg" direction="column">
        <h1 className="search-title">Find a home that suits your needs</h1>
        <div className="search-container">
          <div className="search-criteria">
            <div className="location-container-search">
              <span>location</span>
              <div className="search-city-country">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="search-area"
                  value={searchParams.country}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="search-area2"
                  value={searchParams.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="property-container-search">
              <span className="span-property">property type</span>
              <select
                type="text"
                name="type"
                className="search-type"
                value={searchParams.type}
                onChange={handleInputChange}
                disabled={isTypesLoading}
              >
                <option value="">Type</option>
                {type.length > 0 &&
                  type.map((propertyType, index) => (
                    <option key={index} value={propertyType}>
                      {propertyType}
                    </option>
                  ))}
              </select>
            </div>
            <div className="vertical-line"></div>
            <div className="bedrooms-container-search">
              <span className="span-bedrooms">bedrooms</span>
              <input
                type="number"
                name="bedrooms"
                className="search-bedrooms"
                value={searchParams.bedrooms}
                onChange={handleInputChange}
                placeholder="Bedrooms"
              />
            </div>
            <div className="vertical-line"></div>
            <div className="amenities-container-search">
              <span className="span-amenities">amenities</span>
              <select
                name="amenities"
                onChange={handleInputChange}
                className="search-amenities"
              >
                <option value="">Amenities</option>
                {amenities.map((amenities) => (
                  <option key={amenities} value={amenities}>
                    {amenities}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-icon-container">
              <CiSearch
                color="#fff"
                className="search-bar-search-icon"
                onClick={handleSearch}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="validation-error-search">
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="loader-container" style={style}>
          {loader && (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#000"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
      </HomeBackground>
    </div>
  );
};
export default Search;
