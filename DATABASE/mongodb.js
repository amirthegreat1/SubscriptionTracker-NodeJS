import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectDB = async () => {
  try {
    // If you have a DB_URI (like for production), use that
    // Otherwise, default to local MongoDB
    const uri =
      DB_URI || `mongodb://localhost:27017/subtracker-${NODE_ENV || "dev"}`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ MongoDB connected successfully to: ${uri} in ${NODE_ENV} mode`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
