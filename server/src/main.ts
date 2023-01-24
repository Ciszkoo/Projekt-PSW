import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Dog, DogModel } from "./models/dog.model";
import log, { logMiddleware } from "./utils/logger";

dotenv.config();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL || "";

const app = express();

app.use(express.json());

app.use(logMiddleware);

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Typegoose Example 🤟" });
});

app.get("/dogs", async (req: Request, res: Response): Promise<Response> => {
  const allDogs: Dog[] = await DogModel.find();
  return res.status(200).json(allDogs);
});

app.post("/dogs", async (req: Request, res: Response): Promise<Response> => {
  const dog: Dog = await DogModel.create({ ...req.body });
  return res.status(201).json(dog);
});

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(port, () => {
      log.info(`Server started on port ${port}`);
    });
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

void start();
