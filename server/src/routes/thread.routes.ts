import { Router } from "express";
import { handleCreateThread } from "../controllers/thread.controller";
import { isAuth } from "../middleware/authMiddleware";

const routes = Router();

// tworzenie nowego wątku
routes.post("", isAuth, handleCreateThread);

export default routes;
