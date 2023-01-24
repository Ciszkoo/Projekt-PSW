import { Router } from "express";
import passport from "passport";
import { handleRegister } from "../controllers/auth.controller";
import validateResource from "../middleware/validateResource";
import { registerSchema } from "../schema/auth.schema";

const routes = Router();

routes.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ message: "Login successful" });
});

routes.post("/register", validateResource(registerSchema), handleRegister);

export default routes;
