import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house_number: { type: String, required: true },
    postcode: { type: String, required: true },
  },

  type: { type: String, required: true },

  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },

  amenities: [
    {
      type: String,
      enum: [
        "Wifi",
        "Free parking",
        "TV",
        "Swimming pool",
        "Smoking allowed",
        "Wheelchair accessibility",
        "Gym",
        "Air conditioning",
        "Pets allowed",
        "Family/kids friendly",
        "Friendly workspace",
        "Coffee maker",
        "Dishwasher",
        "First aid kit",
        "Fire extinguisher(s)",
        "Outdoor furniture",
        "Barbecue grill",
        "Near the sea",
        "Near public transportation",
        "Near shopping centers",
        "Near restaurants",
        "Near tourist attractions",
        "Near sports facilities",
      ],
    },
  ],

  house_rules: [
    {
      type: String,
      enum: [
        "No smoking",
        "No pets",
        "No noise after 22:00",
        "No kids",
        "No shoes allowed inside the property",
        "Penalty applied for any damage",
        "Turn off lights and AC after use",
        "Wheelchair not accessible",
        "Cleaning fee",
        "Clean before leaving",
      ],
    },
  ],

  photos: { type: Array, required: true },

  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export const validatePropertyFields = (propertyObject) => {
  const errorList = [];
  const allowedKeys = [
    "title",
    "description",
    "address",
    "type",
    "bedrooms",
    "bathrooms",
    "amenities",
    "house_rules",
    "photos",
  ];

  const validatedKeysMessage = validateAllowedFields(
    propertyObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  const requiredFields = [
    { key: "title" },
    { key: "description" },
    { key: "address" },
    { key: "type" },
    { key: "bedrooms" },
    { key: "bathrooms" },
  ];

  requiredFields.forEach((field) => {
    if (!propertyObject[field.key]) {
      errorList.push(`Missing ${field.key}`);
    }
  });

  if (propertyObject.address) {
    const addressFields = [
      { key: "country" },
      { key: "city" },
      { key: "street" },
      { key: "house_number" },
      { key: "postcode" },
    ];
    addressFields.forEach((field) => {
      if (!propertyObject.address[field.key]) {
        errorList.push(`${field.key} is Required`);
      }
    });
  }

  if (!propertyObject.amenities || propertyObject.amenities.length === 0) {
    errorList.push("Please select at least one 'Amenity'!");
  }
  if (!propertyObject.house_rules || propertyObject.house_rules.length === 0) {
    errorList.push("Please select at least one 'House Rule'!");
  }
  if (!propertyObject.photos || propertyObject.photos.length === 0) {
    errorList.push("Please upload at least one 'photo'!");
  }

  return errorList;
};

export default Property;
