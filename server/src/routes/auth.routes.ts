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

// sprawdzanie sesji + wysyłanie danych użytkownika w przypadku powodzenia
routes.get("/session", isAuth, handleSessionCheck);

// wylogowywanie użytkownika
routes.get("/logout", isAuth, handleLogout);

// logowanie użytkownika
routes.post(
  "/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  handleLogin
);

export default routes;
