import mongoose from "mongoose";

// Global connection promise that can be awaited
let dbConnectionPromise = null;

export const connectDB = async () => {
  // Return existing connection promise if it exists
  if (dbConnectionPromise) {
    return dbConnectionPromise;
  }

  // Create new connection promise with optimized connection options
  dbConnectionPromise = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  });

  try {
    const conn = await dbConnectionPromise;

    // Set up connection event listeners
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      dbConnectionPromise = null; // Reset on error
    });

    mongoose.connection.on('disconnected', () => {
      dbConnectionPromise = null; // Reset on disconnect
    });

    console.log(`MongoDB connected`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
