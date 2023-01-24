import { Router } from "express";
import authRoutes from "./auth.routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.use("/auth", authRoutes);

export default routes;
