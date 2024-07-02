import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

//userX id : 6645decec035637a74f53b75
//userX propertyId: 6645e0d479079bdc9aba4c96

//userY id : 6645df02d7a1b3a667da0823
//userY propertyId: 6645e1ab9f12aefa19031e46
const swapSchema = new mongoose.Schema({
  sender_propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  receiver_propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  swap_date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  message: {
    type: String,
  },
});

const Swap = mongoose.model("Swap", swapSchema);

export const validateSwapFields = (swapObject) => {
  const errorList = [];
  const allowedKeys = [
    "sender_propertyId",
    "receiver_propertyId",
    "swap_date",
    "status",
    "message",
  ];

  const validatedKeysMessage = validateAllowedFields(swapObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!swapObject.sender_propertyId) {
    errorList.push("sender_propertyId is required");
  }
  if (!swapObject.receiver_propertyId) {
    errorList.push("receiver_propertyId is required");
  }

  if (!swapObject.swap_date) {
    errorList.push("swap_date is required");
  } else {
    if (!swapObject.swap_date.start) {
      errorList.push("swap_date.start is required");
    }
    if (!swapObject.swap_date.end) {
      errorList.push("swap_date.end is required");
    } else {
      const currentDate = Date.now();
      const startDate = new Date(swapObject.swap_date.start);
      const endDate = new Date(swapObject.swap_date.end);
      if (startDate < currentDate || endDate < currentDate) {
        errorList.push("swap date cannot be in the past");
      }
    }

    if (swapObject.swap_date.start > swapObject.swap_date.end) {
      errorList.push("End date must be after start date");
    }
  }

  if (swapObject.sender_propertyId === swapObject.receiver_propertyId) {
    errorList.push("Please select different properties");
  }

  if (
    swapObject.swap_date &&
    swapObject.swap_date.start === swapObject.swap_date.end
  ) {
    errorList.push("Please select different dates");
  }

  // if (!swapObject.status) {
  //   errorList.push("status is a required");
  // }

  return errorList;
};

export function isValidObjectId(id) {
  //Only valid objectId
  return mongoose.Types.ObjectId.isValid(id);
}

export default Swap;
