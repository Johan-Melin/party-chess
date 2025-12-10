import { useCallback, useState } from 'react';
import { Chess } from 'chess.js';
import { PieceDropHandlerArgs } from 'react-chessboard';

export function useChessGame() {
  // Keep a single Chess instance; useState initializer avoids ref access in render.
  const [chessGame] = useState(() => new Chess());
  const [chessPosition, setChessPosition] = useState(() => chessGame.fen());

  const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
      if (!targetSquare) {
        return false;
      }

      try {
        chessGame.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q'
        });

        setChessPosition(chessGame.fen());
        return true;
      } catch {
        return false;
      }
    },
    [chessGame]
  );

  return { chessPosition, onPieceDrop };
}

