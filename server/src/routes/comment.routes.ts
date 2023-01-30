import { Router } from "express";
import { handleCreateComment, handleDeleteComment } from "../controllers/comment.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { createCommentSchema } from "../schema/comment.schema";

const routes = Router();

// tworzenie nowego komentarza
routes.post("/:threadId", isAuth, validateResource(createCommentSchema), handleCreateComment);

// usuwanie komentarza
routes.delete("/:id", isAuth, handleDeleteComment);

// edycja komentarza
// routes.put("/:id", isAuth, handleEditComment);

// pobieranie komentarza
// routes.get("/:id", isAuth, handleGetComment);


export default routes;