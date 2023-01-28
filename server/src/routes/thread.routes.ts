import { Router } from "express";
import { handleCreateThread, handleGetThreads } from "../controllers/thread.controller";
import { isAuth } from "../middleware/authMiddleware";

const routes = Router();

// tworzenie nowego wątku
routes.post("", isAuth, handleCreateThread);

// pobieranie wątków
routes.get("/:page", handleGetThreads);

export default routes;
