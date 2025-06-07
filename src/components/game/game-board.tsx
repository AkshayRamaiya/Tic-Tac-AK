"use client";

import type { BoardState, Player, WinningLine } from '@/types';
import { GameCell } from './game-cell';

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine: WinningLine;
  currentPlayer: Player;
}

export function GameBoard({ board, onCellClick, disabled, winningLine, currentPlayer }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 p-2 md:p-3 bg-card rounded-lg shadow-xl aspect-square w-full max-w-sm md:max-w-md mx-auto">
      {board.map((cellValue, index) => (
        <GameCell
          key={index}
          value={cellValue}
          onClick={() => onCellClick(index)}
          disabled={disabled}
          isWinningCell={winningLine ? winningLine.includes(index) : false}
          playerMark={currentPlayer} // This is for potential future styling, currently X/O colors are fixed
        />
      ))}
    </div>
  );
}
