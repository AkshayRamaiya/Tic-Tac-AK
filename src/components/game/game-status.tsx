"use client";

import type { Player, GameStatus as GameResultType } from '@/types';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  gameResult: GameResultType | null; // 'playing', 'draw', 'X' (X wins), 'O' (O wins)
  currentPlayer: Player;
}

export function GameStatus({ gameResult, currentPlayer }: GameStatusProps) {
  let statusText: React.ReactNode;

  if (gameResult === 'playing') {
    statusText = (
      <>
        Next player: <span className={cn("font-bold", currentPlayer === 'X' ? 'text-primary' : 'text-accent')}>{currentPlayer}</span>
      </>
    );
  } else if (gameResult === 'draw') {
    statusText = <span className="font-bold text-muted-foreground">It's a Draw!</span>;
  } else if (gameResult === 'X' || gameResult === 'O') {
    statusText = (
      <>
        Winner: <span className={cn("font-bold", gameResult === 'X' ? 'text-primary' : 'text-accent')}>{gameResult}</span>!
      </>
    );
  } else {
     statusText = "Loading game...";
  }

  return (
    <div className="text-center my-4 md:my-6 text-xl md:text-2xl font-medium text-foreground p-3 bg-muted rounded-lg shadow-sm">
      {statusText}
    </div>
  );
}
