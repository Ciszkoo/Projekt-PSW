import mongoose from "mongoose";
import * as dotenv from "dotenv";
import logger from "./logger";

const connectToDb = async (): Promise<void> => {
  dotenv.config();
  const mongoUrl = process.env.MONGO_URL || "";
  try {
    await mongoose.connect(mongoUrl);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectToDb;
