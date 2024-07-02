import express from "express";
import { signUp, login, getUserProperties } from "../controllers/user.js";
import { verifyUser } from "../util/verifyUser.js";

const userRouter = express.Router();

userRouter.post("/create", signUp);
userRouter.post("/login", login);
userRouter.get("/properties/:id", verifyUser, getUserProperties);

export default userRouter;
