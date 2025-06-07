"use client";

import { Button } from '@/components/ui/button';
import { RefreshCw, Share2 } from 'lucide-react';

interface GameControlsProps {
  onRestart: () => void;
  onInvite: () => void;
  isGameOver: boolean;
}

export function GameControls({ onRestart, onInvite, isGameOver }: GameControlsProps) {
  return (
    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-sm md:max-w-md mx-auto">
      <Button 
        onClick={onRestart} 
        variant={isGameOver ? "default" : "secondary"} 
        className="w-full sm:w-auto flex-1 sm:flex-initial min-w-[150px] shadow-md hover:shadow-lg transition-shadow"
        aria-label="Restart game"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        {isGameOver ? "New Game" : "Restart"}
      </Button>
      <Button 
        onClick={onInvite} 
        variant="outline" 
        className="w-full sm:w-auto flex-1 sm:flex-initial min-w-[150px] shadow-md hover:shadow-lg transition-shadow"
        aria-label="Invite player"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Invite Player
      </Button>
    </div>
  );
}
