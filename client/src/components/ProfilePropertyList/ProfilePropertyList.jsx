import React from "react";
import MyPropertyCard from "../MyPropertyCard/MyPropertyCard";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const ProfilePropertyList = () => {
  const { userProperties } = useLogin();

  const renderPropertyCards = () => {
    return userProperties.length < 1 ? (
      <div>No properties found</div>
    ) : (
      userProperties?.map((property) => (
        <MyPropertyCard key={property._id} property={property} />
      ))
    );
  };

  return (
    <div className="my-property-list-container">{renderPropertyCards()}</div>
  );
};

export default ProfilePropertyList;
