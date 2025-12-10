"use client"
import { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';

export default function ChessGame() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  function makeRandomMove() {
    const possibleMoves = chessGame.moves();

    if (chessGame.isGameOver()) {
      return;
    }

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());
  }

  function onPieceDrop({
    sourceSquare,
    targetSquare
  }: PieceDropHandlerArgs) {
    // type narrow targetSquare potentially being null (e.g. if dropped off board)
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });

      // update the position state upon successful move to trigger a re-render of the chessboard
      setChessPosition(chessGame.fen());

      // make random cpu move after a short delay
      setTimeout(makeRandomMove, 500);

      // return true as the move was successful
      return true;
    } catch {
      // return false as the move was not successful
      return false;
    }
  }
  
  const chessBoardOtions = {
    position: chessPosition,
    onPieceDrop,
    id: 'play-vs-random',
    boardStyle: {
      width: 'min(80vw, 80vh)',
      height: 'min(80vw, 80vh)',
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Chessboard options={chessBoardOtions} />
    </main>
  )
}
