import type { BoardState, Player } from '@/types';

export const winningCombinations: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],             // Diagonals
];

export function calculateWinner(board: BoardState): { winner: Player | null; line: number[] | null } {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: winningCombinations[i] };
    }
  }
  return { winner: null, line: null };
}

export function isBoardFull(board: BoardState): boolean {
  return board.every(cell => cell !== null);
}

export function createInitialBoard(): BoardState {
  return Array(9).fill(null);
}
