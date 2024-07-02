import express from "express";
import {
  uploadProperty,
  getProperties,
  viewProperty,
  amenitiesRoute,
} from "../controllers/property.js";
import { verifyUser } from "../util/verifyUser.js";

const propertyRouter = express.Router();

propertyRouter.post("/upload", verifyUser, uploadProperty);
propertyRouter.get("/get", getProperties);
propertyRouter.get("/view/:id", viewProperty);
propertyRouter.get("/amenities", amenitiesRoute);

export default propertyRouter;
