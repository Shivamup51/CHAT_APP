import mongoose from "mongoose";

// Global connection promise that can be awaited
let dbConnectionPromise = null;

let cachedConnection = null;

export const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      maxPoolSize: 1,
      retryWrites: true,
      w: 'majority'
    });

    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
