import { Router } from "express";
import {
  handleDeleteUser,
  handleEditEmail,
  handleEditUsername,
  handleGetUser,
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

// pobieranie danych użytkownika
routes.get("", isAuth, handleGetUser);

// usuwanie użytkownika
routes.delete("", isAuth, handleDeleteUser);

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
