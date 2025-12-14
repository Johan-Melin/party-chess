import { useCallback, useState } from 'react';
import { Chess } from 'chess.js';
import { PieceDropHandlerArgs } from 'react-chessboard';
import { updateChessGameFen } from '@/lib/chessStorage';

export function useChessGame(initialFen?: string, gameId?: string) {
  // Keep a single Chess instance; useState initializer avoids ref access in render.
  const [chessGame] = useState(() => {
    if (initialFen) {
      try {
        return new Chess(initialFen);
      } catch {
        return new Chess();
      }
    }
    return new Chess();
  });
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

        const newFen = chessGame.fen();
        setChessPosition(newFen);
        
        // Save the updated FEN to storage if gameId is provided
        if (gameId) {
          updateChessGameFen(gameId, chessGame);
        }
        
        return true;
      } catch {
        return false;
      }
    },
    [chessGame, gameId]
  );

  return { chessPosition, onPieceDrop };
}

