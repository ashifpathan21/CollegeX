import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from 'dotenv';

config();

// ====================== AUTH ======================
export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token`,
    });
  }
};

// ====================== IS ADMIN ======================
export const isAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }

    if (decode.role === 'Admin') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Not an Admin`,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token`,
    });
  }
};
