import { generatePublicCode } from './generatePublicCode';
import { saveParamData, getParamData } from './storage';
import { Chess } from 'chess.js';

export interface ChessGameData {
  id: string;
  fen: string;
  createdAt: number;
}

export function saveChessGame(chessGame: Chess): string {
  const id = generatePublicCode();
  const fen = chessGame.fen();
  
  const gameData: ChessGameData = {
    id,
    fen,
    createdAt: Date.now(),
  };

  saveParamData(`chess-game-${id}`, gameData);
  return id;
}

export function getChessGame(id: string): ChessGameData | null {
  return getParamData<ChessGameData>(`chess-game-${id}`);
}

export function updateChessGameFen(id: string, chessGame: Chess): void {
  const existingGame = getChessGame(id);
  if (existingGame) {
    const updatedGame: ChessGameData = {
      ...existingGame,
      fen: chessGame.fen(),
    };
    saveParamData(`chess-game-${id}`, updatedGame);
  }
}

export function listChessGames(): ChessGameData[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const games: ChessGameData[] = [];
  const prefix = 'chess-game-';

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const gameData = getParamData<ChessGameData>(key);
        if (gameData) {
          games.push(gameData);
        }
      }
    }
  } catch (error) {
    console.error('Error listing chess games:', error);
  }

  // Sort by creation date, newest first
  return games.sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Parses FEN string to extract game state information
 * @param fen - The FEN string to parse
 * @returns Object with turn and moveNumber, or null if parsing fails
 */
export function parseFenInfo(fen: string): { turn: 'white' | 'black'; moveNumber: number } | null {
  try {
    const tokens = fen.split(/\s+/);
    if (tokens.length < 6) {
      return null;
    }
    
    const activeColor = tokens[1]; // 'w' or 'b'
    const fullmoveNumber = parseInt(tokens[5], 10);
    
    return {
      turn: activeColor === 'w' ? 'white' : 'black',
      moveNumber: fullmoveNumber || 1,
    };
  } catch {
    return null;
  }
}

