import { Router } from "express";
import { handleRegister } from "../controllers/user.controller";
import validateResource from "../middleware/validateResource";
import { registerSchema } from "../schema/user.schema";

const routes = Router();

routes.post("", validateResource(registerSchema), handleRegister);

export default routes;
