import Swap from "../models/Swap.js";
import Property from "../models/Property.js";
import { validateSwapFields, isValidObjectId } from "../models/Swap.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const createSwapRequest = async (req, res) => {
  const swapRequestData = req.body;

  const errors = validateSwapFields(swapRequestData);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errors) });
  }

  // check if "Invalid" mongo ObjectId
  if (!isValidObjectId(swapRequestData.sender_propertyId)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid sender_propertyId" });
  }
  if (!isValidObjectId(swapRequestData.receiver_propertyId)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid receiver_propertyId" });
  }

  //the user is not the owner of a property
  const senderProp = await Property.findById(swapRequestData.sender_propertyId);
  const receiverProp = await Property.findById(
    swapRequestData.receiver_propertyId,
  );
  if (senderProp.userRef.toString() !== req.userData.id) {
    return res
      .status(400)
      .json({ success: false, msg: "You are not the owner of this property" });
  }
  //user cannot apply for their own property
  if (senderProp.userRef.toString() === receiverProp.userRef.toString()) {
    return res
      .status(400)
      .json({ success: false, msg: "You cannot apply for your own property" });
  }

  // check if the swapped propertiesId exist in Property Collection
  const senderPropertyExists = await Property.exists({
    _id: swapRequestData.sender_propertyId,
  });
  if (!senderPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "This sender_propertyId does not exist" });
  }

  const receiverPropertyExists = await Property.exists({
    _id: swapRequestData.receiver_propertyId,
  });
  if (!receiverPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "This receiver_propertyId does not exist" });
  }

  //check if the request exists
  const existingSwapRequest = await Swap.findOne({
    sender_propertyId: swapRequestData.sender_propertyId,
    receiver_propertyId: swapRequestData.receiver_propertyId,
    "swap_date.start": swapRequestData.swap_date.start,
    "swap_date.end": swapRequestData.swap_date.end,
  });
  if (existingSwapRequest) {
    return res
      .status(400)
      .json({ success: false, msg: "This swap request already exists" });
  }

  try {
    const newSwapRequest = await Swap.create(swapRequestData);
    res.status(201).json({ success: true, newSwapRequest });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "An unexpected error occurred, please try again later",
    });
  }
};

export const getSwapRequest = async (req, res) => {
  sentReceivedRequests(req, res, "receiver_propertyId");
};

export const getSentSwapRequest = async (req, res) => {
  sentReceivedRequests(req, res, "sender_propertyId");
};

export const confirmSwapRequest = async (req, res) => {
  const swapChecks = await confirmRejectChecks(req, res);
  if (!swapChecks) return;

  try {
    const updatedSwap = await Swap.findByIdAndUpdate(
      req.params.requestId,
      { status: "accepted" },
      { new: true },
    );
    res.status(200).json({ success: true, data: updatedSwap });
  } catch (error) {
    logError(error);
    res.status(500).json({ msg: "Error confirming swap request", error });
  }
};

export const rejectSwapRequest = async (req, res) => {
  const swapChecks = await confirmRejectChecks(req, res);
  if (!swapChecks) return; //if checks fail

  try {
    const updatedSwap = await Swap.findByIdAndUpdate(
      req.params.requestId,
      { status: "rejected" },
      { new: true },
    );

    res.status(200).json({ success: true, data: updatedSwap });
  } catch (error) {
    logError(error);
    res.status(500).json({ msg: "Error rejecting swap request", error });
  }
};

//FUNCTIONS:
async function confirmRejectChecks(req, res) {
  try {
    const swapRequest = await Swap.findById(req.params.requestId).populate({
      path: "receiver_propertyId",
      select: "userRef",
    });

    if (!swapRequest) {
      return res
        .status(404)
        .json({ success: false, msg: "Swap request not found" });
    }

    if (
      swapRequest.receiver_propertyId.userRef.toString() !== req.userData.id
    ) {
      return res
        .status(401)
        .json({ success: false, msg: "You are not authorized!" });
    }

    if (swapRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        msg: "Swap request has already been processed",
      });
    }

    return swapRequest;
  } catch (error) {
    logError(error);
    res.status(500).json({ msg: "Error processing swap request", error });
  }
}

async function sentReceivedRequests(req, res, propertyField) {
  if (req.params.id !== req.userData.id) {
    return res.status(401).json({
      success: false,
      msg: "You cannot view requests list of other users!",
    });
  }

  try {
    const userProperties = await Property.find({ userRef: req.userData.id }); //find props of the user
    const propertyIds = userProperties.map((prop) => prop._id); //extract the ids

    const query = {}; //empty query
    query[propertyField] = {
      $in: propertyIds, //get ids sent/received by user
    };

    const swapRequests = await Swap.find(query).populate({
      path:
        propertyField === "sender_propertyId"
          ? "receiver_propertyId"
          : "sender_propertyId",
      select: "title type address bedrooms bathrooms photos",
    });

    if (swapRequests.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "You have no requests",
      });
    }
    res.status(200).json({ success: true, data: swapRequests });
  } catch (error) {
    logError(error);
    res.status(500).json({ msg: "Error retrieving swap requests", error });
  }
}
