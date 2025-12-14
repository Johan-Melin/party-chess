"use client"
import { Chessboard } from 'react-chessboard';
import { useChessGame } from './useChessGame';
import { getChessGame } from '@/lib/chessStorage';

interface ChessGameProps {
  gameId: string;
}

export default function ChessGame({ gameId }: ChessGameProps) {
  const gameData = getChessGame(gameId);
  const initialFen = gameData?.fen;
  const { chessPosition, onPieceDrop } = useChessGame(initialFen, gameId);
  
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
