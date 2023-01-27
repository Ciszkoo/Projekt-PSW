import { Router } from "express";
import passport from "passport";
import {
  handleLogin,
  handleLogout,
  handleSessionCheck,
} from "../controllers/auth.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";

const routes = Router();

routes.get("/session", isAuth, handleSessionCheck);

routes.get("/logout", isAuth, handleLogout);

routes.post(
  "/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  handleLogin
);

export default routes;
