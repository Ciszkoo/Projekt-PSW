import { Chess, Move } from "chess.js";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { useMQTT } from "../../mqttContext/MQTTProvider";

interface BoardProps {
  game: Chess;
  setGame: (game: Chess) => void;
}

const Board = (props: BoardProps) => {
  const { color, turn, publish, gameId, changeTurn } = useMQTT();
  // const [game, setGame] = useState<Chess>(new Chess());

  // console.log(props.game.moves());

  // function makeAMove(
  //   move: string | { from: Square; to: Square; promotion?: string }
  // ) {
  //   const gameCopy = { ...game } as Chess;
  //   const result = gameCopy.move(move);
  //   setGame(gameCopy);
  //   return result; // null if the move was illegal, the move object if the move was legal
  // }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
  //     return; // exit if the game is over
  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   makeAMove(possibleMoves[randomIndex]);
  // }

  // function onDrop(sourceSquare: Square, targetSquare: Square) {
  //   const move = makeAMove({
  //     from: sourceSquare,
  //     to: targetSquare,
  //     promotion: "q", // always promote to a queen for example simplicity
  //   });

  //   // illegal move
  //   if (move === null) return false;
  //   setTimeout(makeRandomMove, 200);
  //   return true;
  // }
  const makeAMove = (move: { from: Square; to: Square }) => {
    const gameCopy = new Chess(props.game.fen());
    const result = gameCopy.move({ from: move.from, to: move.to });
    // if (result) {
    //   props.setGame(gameCopy);
    // }
    return result;
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    const move = makeAMove({ from: sourceSquare, to: targetSquare });
    if (!move) return false;
    // changeTurn();
    const res = {
      fen: props.game.fen(),
      color: color
    }
    publish(`game/${gameId}/move`, JSON.stringify(move));
    return true;
  };

  const isMyPiece = (args: { piece: Piece; sourceSquare: Square }) => {
    if (!turn) return false;
    return args.piece[0] === color[0];
  };

  return (
    <div className="basis-2/3 flex justify-center items-center">
      <Chessboard
        id="board"
        boardWidth={600}
        boardOrientation={color}
        position={props.game.fen()}
        onPieceDrop={onDrop}
        isDraggablePiece={isMyPiece}
      />
    </div>
  );
};

export default Board;
