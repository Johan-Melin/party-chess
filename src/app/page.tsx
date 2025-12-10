"use client"
import { Chessboard } from 'react-chessboard';

export default function Home() {
  const chessBoardOtions = {
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
