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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

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

export { signup, signin };
