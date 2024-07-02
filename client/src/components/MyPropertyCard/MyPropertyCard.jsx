import React from "react";
import "./MyPropertyCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyPropertyCard = ({ property }) => {
  return (
    <div className="profile-property-card">
      <div className="img-card-wrapper">
        <Link to={`/property/view/${property?._id}`}>
          <img
            src={property?.photos[0]}
            alt={property?.title}
            className="property-card-img"
          />
        </Link>
      </div>
      <div className="property-card-info">
        <div>
          <p>
            <b>Type of property: </b>
            {property?.type}
          </p>
          <p>
            <b>Bedrooms:</b> {property?.bedrooms}
          </p>
          <p>{`${property?.address.street} ${property?.address.city} ${property?.address.country}`}</p>
        </div>
        <div className="property-description-container">
          <h4>Home description:</h4>
          <br />
          <p>{property?.description}</p>
        </div>
      </div>
    </div>
  );
};

MyPropertyCard.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default MyPropertyCard;
