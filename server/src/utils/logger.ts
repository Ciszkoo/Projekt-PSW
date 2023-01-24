import pino from "pino";
import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";

const log = pino({
  transport: {
    target: "pino-pretty",
  },
  level: "info",
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.info(`${req.method}: ${req.path}`);
  next();
};

export default log;
