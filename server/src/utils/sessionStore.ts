import session from "express-session";
import * as dotenv from "dotenv";
import MongoStore from "connect-mongo";

dotenv.config();
const secret = process.env.SESSION_SECRET || "sekreto";
const mongoUrl = process.env.MONGO_URL || "";

const sessionStore = session({
  cookie: { maxAge: 1000 * 60 * 5, httpOnly: true, sameSite: false },
  store: MongoStore.create({ mongoUrl: mongoUrl }),
  secret: secret,
  saveUninitialized: false,
  resave: false,
});

export default sessionStore;
