
"use client";

import type { Player } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Only needed if using a plain button
import { PartyPopper, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WinnerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  winner: Player | null;
  onRestart: () => void;
}

export function WinnerDialog({ isOpen, onOpenChange, winner, onRestart }: WinnerDialogProps) {
  if (!winner) {
    return null; // Don't render if there's no winner (e.g. draw or game ongoing)
  }

  const handlePlayAgain = () => {
    onRestart();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card shadow-xl rounded-lg">
        <AlertDialogHeader className="items-center">
          <PartyPopper 
            className={cn(
              "h-16 w-16 mb-3",
              winner === 'X' ? 'text-primary' : 'text-accent'
            )} 
          />
          <AlertDialogTitle className={cn(
            "text-3xl font-bold",
            winner === 'X' ? 'text-primary' : 'text-accent'
          )}>
            Player {winner} Wins!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-lg pt-2">
            Congratulations on your victory!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 sm:mt-6 flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={handleClose} 
            className="w-full sm:w-auto"
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handlePlayAgain} 
            className={cn(
              "w-full sm:w-auto",
              winner === 'X' ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90',
              'text-primary-foreground' // Assuming both primary and accent use light text for foreground
            )}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
