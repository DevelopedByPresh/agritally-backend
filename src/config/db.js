import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../utils/logger.utils.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
  }
};

export default connectDB;
