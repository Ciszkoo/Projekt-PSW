import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { format, createLogger, transports } from "winston";

const myFormat = format.printf(({ level, message }) => {
  const timestamp = dayjs().format();
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console({
      format: format.combine(myFormat),
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
