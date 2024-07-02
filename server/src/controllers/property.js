import Property from "../models/Property.js";
import { validatePropertyFields } from "../models/Property.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { logError } from "../util/logging.js";
import cloudinary from "../util/cloudinary.js";

export const uploadProperty = async (req, res) => {
  const propertyData = req.body;

  const errors = validatePropertyFields(propertyData);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errors) });
  }

  try {
    const userId = req.userData.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized user!" });
    }

    const uploadedPhotos = await Promise.all(
      propertyData.photos.map(async (photoData) => {
        // try {
        const result = await cloudinary.uploader.upload(photoData);
        return result.secure_url;
        // } catch (error) {
        // console.error("Error uploading photo to Cloudinary:", error);
        // throw new Error("Failed to upload photo to Cloudinary");
        // }
      }),
    );

    const propertyWithUserID = {
      ...propertyData,
      photos: uploadedPhotos,
      userRef: userId,
    };

    const newProperty = await Property.create(propertyWithUserID);
    res.status(201).json({ success: true, newProperty });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to upload property, try again later",
    });
  }
};

export const getProperties = async (req, res) => {
  try {
    //for pagination:
    const limit = parseInt(req.query.limit, 10) || 6;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const { country, city, type, bedrooms, amenities /*availability*/ } =
      req.query;
    let filter = {};

    const createRegex = (value) => new RegExp(`^${value.trim()}$`, "i");

    if (country) filter["address.country"] = createRegex(country);
    if (city) filter["address.city"] = createRegex(city);
    if (type) filter.type = createRegex(type);
    if (bedrooms) filter.bedrooms = bedrooms;
    if (amenities) filter.amenities = { $in: amenities };

    const properties = await Property.find(filter).limit(limit).skip(offset);
    const total = await Property.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    if (properties.length === 0) {
      return res.status(404).json({
        success: true,
        msg: "No properties found",
        data: [],
        total,
        page: 0,
        totalPages,
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
      total,
      page,
      totalPages,
      // filterApplied: filter,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get properties, try again later",
    });
  }
};

export const viewProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        msg: "Property not found",
      });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Error retrieving property",
    });
  }
};

export const amenitiesRoute = async (req, res) => {
  try {
    const amenities = await Property.distinct("amenities");
    res.status(200).json({ success: true, data: amenities });
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving property", error });
  }
};
