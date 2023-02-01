import { Router } from "express";
import { handleCreateGameSession, handleGetGame, handleGetGames, handleJoinGame } from "../controllers/game.controller";
import { isAuth } from "../middleware/authMiddleware";

const routes = Router();

// tworzenie nowej gry
routes.post("", isAuth, handleCreateGameSession);

// dołączanie do gry
routes.post("/:id", isAuth, handleJoinGame);

// usuwanie gry
// routes.delete("/:id", isAuth, handleDeleteGame);

// edycja nazwy pokoju
// routes.put("/:id", isAuth, handleEditGame);

// pobieranie pokoi
routes.get("", isAuth, handleGetGames);

// sprawdzanie czy jesteś w pokoju
routes.get("/check", isAuth, handleGetGame);

export default routes;
