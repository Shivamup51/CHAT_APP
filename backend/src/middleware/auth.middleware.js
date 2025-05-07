import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { connectDB } from "../lib/db.js";
import mongoose from "mongoose";

export const protectRoute = async (req, res, next) => {
  try {
    // Ensure DB connection is established
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    
    // Handle specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    }
    
    if (error.name === "MongooseError" || error.name === "MongoError") {
      return res.status(503).json({ message: "Database connection error" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a database connection check middleware
export const ensureDBConnection = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(503).json({ message: "Database connection failed" });
  }
};
