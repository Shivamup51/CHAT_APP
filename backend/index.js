import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Initialize DB connection before setting up middleware
const initializeServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Middleware setup
    app.use(express.json({ limit: "10mb" })); 
    app.use(cookieParser());
    app.use(
      cors({
        origin: [
          "https://chat-app-frontend-f8ne1cxol-shivamup51s-projects.vercel.app",
          "http://localhost:5173"
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type', 
          'Authorization', 
          'Accept', 
          'Origin', 
          'X-Requested-With',
          'Cookie'
        ]
      })
    );

    // Health check routes
    app.get("/", (req, res) => {
      res.status(200).send("API is running successfully!");
    });

    app.get("/health", (req, res) => {
      res.status(200).json({ 
        status: "ok",
        dbConnection: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
      });
    });

    // API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/messages", messageRoutes);

    // Production setup
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
      });
    }

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Global error:', err);
      res.status(err.status || 500).json({
        message: err.message || "Internal server error"
      });
    });

    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
      console.log(`MongoDB connection status: ${mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'}`);
    });

  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

// Start the server
initializeServer();

// Handle process termination
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM signal. Closing server...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
