import { Router } from "express";
import { handleGetUser, handleRegister } from "../controllers/user.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { registerSchema } from "../schema/user.schema";

const routes = Router();

// rejestrowanie użytkownika
routes.post("", validateResource(registerSchema), handleRegister);

// routes.get("", isAuth, handleGetUser);

export default routes;
