import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PropertyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShower,
  faBed,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const PropertyCard = ({ property }) => {
  //checking if there is no property (not important)
  if (!property) {
    return <div>No data</div>;
  }

  return (
    <div className="property-card">
      <Link to={`/property/view/${property?._id}`}>
        <img src={property?.photos[0]} alt={property?.title} />
      </Link>
      <div className="accommodation-container">
        <div className="accommodations margin-right">
          <FontAwesomeIcon icon={faBed} className="icon" />
          <p>{property?.bedrooms}</p>
        </div>
        <div className="accommodations">
          <FontAwesomeIcon icon={faShower} className="icon" />
          <p>{property?.bathrooms}</p>
        </div>
      </div>
      <div className="property-details">
        <h3>{property?.title}</h3>
      </div>
      <div className="property-details location">
        <FontAwesomeIcon icon={faLocationDot} />
        <p>
          {property?.address?.city}, {property?.address?.country}
        </p>
      </div>
      <Link to={`/property/view/${property?._id}`}>
        <button className="property-card-btn">More information</button>
      </Link>
    </div>
  );
};

// Defining types for component props improves reusability of your components by validating received data. It can warn other developers if they make a mistake while reusing the component with improper data type - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md

PropertyCard.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default PropertyCard;
