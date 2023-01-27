import { Router } from "express";
import passport from "passport";
import {
  handleLogout,
  handleRegister,
  handleSessionCheck,
} from "../controllers/auth.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { loginSchema, registerSchema } from "../schema/auth.schema";

const routes = Router();

routes.get("/session", isAuth, handleSessionCheck);

routes.get("/logout", isAuth, handleLogout);

routes.post(
  "/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  (req, res) => {
    res.status(200).send({ message: "Login successful" });
  }
);

routes.post("/register", validateResource(registerSchema), handleRegister);

export default routes;
