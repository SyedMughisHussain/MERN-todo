import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: true,
        message: "User already exists with this email.",
        success: false,
        data: null,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const payload = {
      fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
    };

    const user = await User.create(payload);

    res.status(201).json({
      error: false,
      message: "User Registered Successfully.",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User does not exist.",
        success: false,
        data: null,
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials.",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign({ _id: user._id }, "todoapp", {
      expiresIn: "1d",
    });

    res.json({
      error: false,
      message: "User authenticated successfully.",
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser);

    if (!loggedInUser) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await User.findById(loggedInUser);

    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

export { signup, signin, getLoggedInUser };
