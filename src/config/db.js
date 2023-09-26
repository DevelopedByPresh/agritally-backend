require("dotenv").config();
const mongoose = require("mongoose");
const { logger } = require("../utils/logger.utils");

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

module.exports = connectDB;
