"use client"
import { useParams } from "next/navigation"
import ChessGame from "@/app/ChessGame"

export default function PlayPage() {
  const params = useParams()
  const gameId = params.id as string
  
  return <ChessGame gameId={gameId} />
}
