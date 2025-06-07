export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[]; // Array of 9 cells
export type GameStatus = 'playing' | 'draw' | Player; // 'X' or 'O' means that player won
export type WinningLine = number[] | null; // Array of 3 indices for the winning line
