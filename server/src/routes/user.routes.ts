import { Router } from "express";
import {
  handleEditEmail,
  handleEditUsername,
  handleRegister,
} from "../controllers/user.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import {
  editEmailSchema,
  editUsernameSchema,
  registerSchema,
} from "../schema/user.schema";

const routes = Router();

// rejestrowanie użytkownika
routes.post("", validateResource(registerSchema), handleRegister);

// routes.get("", isAuth, handleGetUser);

// edycja danych użytkownika
routes.put(
  "/username",
  isAuth,
  validateResource(editUsernameSchema),
  handleEditUsername
);
routes.put(
  "/email",
  isAuth,
  validateResource(editEmailSchema),
  handleEditEmail
);

export default routes;
