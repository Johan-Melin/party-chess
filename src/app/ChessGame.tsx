"use client"
import { Chessboard } from 'react-chessboard';
import { useChessGame } from './useChessGame';

export default function ChessGame() {
  const { chessPosition, onPieceDrop } = useChessGame();
  
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
