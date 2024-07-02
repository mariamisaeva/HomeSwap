import User, { validateLogin, validateUser } from "../models/User.js";
import Property from "../models/Property.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const errorList = validateUser({
    username,
    email: email.toLowerCase(),
    password,
    confirmPassword,
  });

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const errorList = validateLogin({
    email: email.toLowerCase(),
    password,
  });

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const validUser = await User.findOne({ email: email.toLowerCase() });

    if (!validUser) {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect email or password" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      id: validUser._id,
      username: validUser._doc.username,
      email: validUser._doc.email,
      token: token,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to sign in, try again later" });
  }
};

export const getUserProperties = async (req, res) => {
  if (req.userData.id === req.params.id) {
    try {
      const properties = await Property.find({ userRef: req.params.id });
      return res.status(200).json({ success: true, data: properties });
    } catch (error) {
      res.status(500).json({ msg: "Error retrieving properties", error });
    }
  } else {
    return res.status(401).json({
      success: false,
      msg: "You cannot view properties list of other users!",
    });
  }
};
