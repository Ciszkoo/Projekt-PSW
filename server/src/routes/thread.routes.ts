import { Router } from "express";
import {
  handleCreateThread,
  handleDeleteThread,
  handleGetThread,
  handleGetThreadComments,
  handleGetThreads,
} from "../controllers/thread.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { createThreadSchema } from "../schema/thread.schema";

const routes = Router();

// tworzenie nowego wątku
routes.post(
  "",
  isAuth,
  validateResource(createThreadSchema),
  handleCreateThread
);

// pobieranie wątków
routes.get("/:page", isAuth, handleGetThreads);

// usuwanie wątku
routes.delete("/:id", isAuth, handleDeleteThread);

// edycja wątku
// routes.put("/:id", isAuth, handleEditThread);

// pobieranie komentarzy wątku
// routes.get("/comments/:id", isAuth, handleGetThreadComments);

// pobieranie wątku
routes.get("/single/:id", isAuth, handleGetThread);

export default routes;
