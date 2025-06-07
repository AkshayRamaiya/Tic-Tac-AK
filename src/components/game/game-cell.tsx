"use client";

import type { CellValue, Player } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameCellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
  playerMark: Player; // To determine color
}

export function GameCell({ value, onClick, disabled, isWinningCell, playerMark }: GameCellProps) {
  const cellContent = value ? (
    <span 
      className={cn(
        "text-5xl md:text-6xl font-bold transition-all duration-300 animate-scale-in",
        value === 'X' ? "text-primary" : "text-accent"
      )}
    >
      {value}
    </span>
  ) : null;

  return (
    <Button
      variant="outline"
      className={cn(
        "aspect-square w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center p-0",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isWinningCell && value === 'X' && "bg-primary/20",
        isWinningCell && value === 'O' && "bg-accent/20",
        !value && !disabled && "hover:bg-muted cursor-pointer",
        disabled && !value && "cursor-not-allowed opacity-70",
        value && "cursor-default" 
      )}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={`Cell ${value ? `contains ${value}` : 'empty'}`}
    >
      {cellContent}
    </Button>
  );
}
