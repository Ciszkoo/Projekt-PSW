import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import winston from "winston";

const myFormat = winston.format.printf(({level, message}) => {
  const timestamp = dayjs().format();
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console({
      format: winston.format.combine( myFormat), 
    }),
  ],
});

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method}: ${req.path}`);
  next();
};

export default logger;
