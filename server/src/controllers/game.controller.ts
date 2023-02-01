import { Request, Response } from "express";
import { GameSessionModel } from "../models/gameSession.model";
import { UserModel } from "../models/user.model";

export const handleCreateGameSession = async (req: Request, res: Response) => {
  const { color } = req.body;
  const gameAlreadyExists = await GameSessionModel.findOne({
    owner: req.session.passport?.user,
  });
  const user = await UserModel.findById(req.session.passport?.user);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (gameAlreadyExists) {
    return res.status(400).send({ message: "You already have a game session" });
  }

  const gameSession = await GameSessionModel.create({
    name: `${user.username}'s game`,
    owner: req.session.passport?.user,
    expiresAt: new Date(),
    white: color === "white" ? req.session.passport?.user : null,
    black: color === "black" ? req.session.passport?.user : null,
  });
  return res.status(201).send({
    id: gameSession._id,
    owner: gameSession.owner,
    name: gameSession.name,
    white: gameSession.white,
    black: gameSession.black,
  });
};

export const handleJoinGame = async (req: Request, res: Response) => {
  const userId = req.session.passport?.user as string;
  const { id } = req.params;
  const game = await GameSessionModel.findById(id);

  if (!game) {
    return res.status(404).send({ message: "Game not found" });
  }

  if (game.white === userId || game.black === userId) {
    return res.status(400).send({ message: "You are already in this game" });
  }

  if (game.white) {
    game.black = userId;
  }

  if (game.black) {
    game.white = userId;
  }

  await game.save();
  return res.status(200).send({ message: "Joined game" });
};

export const handleGetGames = async (req: Request, res: Response) => {
  const games = await GameSessionModel.aggregate([
    { $match: { owner: { $ne: req.session.passport?.user } } },
    { $sort: { expiresAt: -1 } },
    { $limit: 10 },
  ]);
  const result = await Promise.all(
    games.map(async (game) => {
      const whiteName = await UserModel.findById(game.white).then((user) => {
        if (user) {
          return user.username;
        }
        return null;
      });
      const blackName = await UserModel.findById(game.black).then((user) => {
        if (user) {
          return user.username;
        }
        return null;
      });
      return {
        id: game._id,
        name: game.name,
        owner: game.owner,
        white: game.white,
        whiteName,
        black: game.black,
        blackName,
      };
    })
  );

  return res.status(200).send(result);
};

export const handleGetGame = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const game = await GameSessionModel.findOne({
    $or: [{ white: id }, { black: id }],
  });
  if (!game) {
    return res.status(404).send({ message: "Game not found" });
  }
  const whiteName = await UserModel.findById(game.white).then((user) => {
    if (user) {
      return user.username;
    }
    return null;
  });
  const blackName = await UserModel.findById(game.black).then((user) => {
    if (user) {
      return user.username;
    }
    return null;
  });

  return res.status(200).send({
    ...game,
    id: game._id,
    white: game.white,
    black: game.black,
    whiteName,
    blackName,
  });
};
