import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import threadRoutes from "./thread.routes";
import commentRoutes from "./comment.routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/thread", threadRoutes);
routes.use("/comment", commentRoutes);

export default routes;
