import { Router } from "express";
import { handleCreateThread, handleDeleteThread, handleGetThreads } from "../controllers/thread.controller";
import { isAuth } from "../middleware/authMiddleware";

const routes = Router();

// tworzenie nowego wątku
routes.post("", isAuth, handleCreateThread);

// pobieranie wątków
routes.get("/:page", handleGetThreads);

// usuwanie wątku
routes.delete("/:id", isAuth, handleDeleteThread);

export default routes;
