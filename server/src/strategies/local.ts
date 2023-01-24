import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../models/user.model";
import { validatePassword } from "../utils/hashPassword";
import logger from "../utils/logger";

type User = {
  _id?: string;
};

passport.serializeUser((user: User, done) => {
  logger.info("Serializing user...");
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  logger.info("Deserializing user...");
  try {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    logger.info("User found");
    done(null, user);
  } catch (error) {
    logger.error(error);
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) throw new Error("Missing email or password");
        const userDB = await UserModel.findOne({ email });
        if (!userDB) throw new Error("User not found");
        const isValidPassword = await validatePassword(
          password,
          userDB.password
        );
        if (!isValidPassword) {
          logger.info("Invalid authentication");
          done(null, false);
        }
        logger.info("Authentication successful");
        done(null, userDB);
      } catch (error) {
        logger.error(error);
        done(error, false);
      }
    }
  )
);
