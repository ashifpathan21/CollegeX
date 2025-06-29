import User from '../models/User.js';
import OTP from '../models/OTP.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import {config } from 'dotenv'
config()

// ============ SEND OTP ==============
export const sendotp = async (req, res) => {
  try {
    const { collegeEmail } = req.body;

    if (!collegeEmail) {
      return res.status(400).json({
        success: false,
        message: "College email is required",
      });
    }

    const user = await User.findOne({ collegeEmail });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let existingOtp = await OTP.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    await OTP.create({ email: collegeEmail, otp });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

// ============ SIGNUP ==============
export const signup = async (req, res) => {
  try {
    const {
      fullName,
      collegeEmail,
      password,
      otp,
      college,
      year,
      branch,
      contactNumber,
    } = req.body;

    if (
      !fullName ||
      !collegeEmail ||
      !password ||
      !otp ||
      !college ||
      !year ||
      !branch ||
      !contactNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ collegeEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const recentOtp = await OTP.findOne({ email: collegeEmail }).sort({ createdAt: -1 });

    if (!recentOtp || recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      collegeEmail,
      password: hashedPassword,
      college,
      year,
      branch,
      contactNumber,
      isVerified: true,
      profilePic: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.collegeEmail },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ============ LOGIN ==============
export const login = async (req, res) => {
  try {
    const { collegeEmail, password } = req.body;

    if (!collegeEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ collegeEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.collegeEmail , role:user?.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    user.password = undefined;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
