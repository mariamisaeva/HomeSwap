import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { logError } from "../util/logging.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["username", "email", "password", "confirmPassword"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.username) {
    userObject.username = userObject.username.trim();
  }
  if (userObject.email) {
    userObject.email = userObject.email.trim().toLowerCase();
  }

  if (userObject.username == null) {
    errorList.push("username is a required field");
  } else if (userObject.username.includes(" ")) {
    errorList.push("username cannot contain empty spaces");
  } else if (!/^[a-zA-Z0-9_ ]{3,20}$/.test(userObject.username)) {
    errorList.push("Username cannot contain special characters");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (!userObject.password) {
    errorList.push("password is required");
  } else if (userObject.password.length < 8) {
    errorList.push("password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(userObject.password)) {
    errorList.push("password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(userObject.password)) {
    errorList.push("password must contain at least one lowercase letter");
  }

  if (!/\d/.test(userObject.password)) {
    errorList.push("password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(userObject.password)) {
    errorList.push("password must contain at least one special character");
  }

  if (userObject.password !== userObject.confirmPassword) {
    errorList.push("password and confirm password do not match");
  }

  return errorList;
};

export const validateLogin = (userObject) => {
  const errorList = [];

  if (!userObject.email) {
    errorList.push("Email is required");
  } else {
    userObject.email = userObject.email.trim().toLowerCase();
  }

  if (!userObject.password) {
    errorList.push("Password is required");
  }

  return errorList;
};

export const convertEmailsToLowercase = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      await User.updateOne({ _id: user._id }, { $set: { email: user.email } });
    }
  } catch (error) {
    logError(error);
  }
};

export default User;
