import express from "express";
import * as dotenv from "dotenv";
import logger, { logMiddleware } from "./utils/logger";
import connectToDb from "./utils/dbConnection";
import sessionStore from "./utils/sessionStore";
import passport from "passport";
import routes from "./routes/routes";
import cors from "./utils/cors";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors)
app.use(express.json());
app.use(sessionStore);
app.use(logMiddleware);

require("./strategies/local");
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

const start = async (): Promise<void> => {
  try {
    await connectToDb();
    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

void start();
