"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Chess } from "chess.js"
import { saveChessGame, listChessGames, ChessGameData, parseFenInfo } from "@/lib/chessStorage"

export default function Home() {
  const router = useRouter()
  const [games, setGames] = useState<ChessGameData[]>(() => listChessGames())

  const handlePlay = () => {
    const chessGame = new Chess()
    const gameId = saveChessGame(chessGame)
    setGames(listChessGames()) // Refresh the games list
    router.push(`/play/${gameId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8">
      <button
        onClick={handlePlay}
        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
      >
        New Game
      </button>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Join Existing Games</h2>
        {games.length > 0 ? (
          <div className="space-y-2">
            {games.map((game) => {
              const fenInfo = parseFenInfo(game.fen);
              return (
                <Link
                  key={game.id}
                  href={`/play/${game.id}`}
                  className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-sm font-semibold">{game.id}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {fenInfo && (
                    <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <span>Move {fenInfo.moveNumber}</span>
                      <span>•</span>
                      <span className="capitalize">{fenInfo.turn}&apos;s turn</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm">No existing games. Create a new game to get started!</p>
        )}
      </div>
    </main>
  )
}
