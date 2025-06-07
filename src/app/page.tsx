"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogoText } from "@/components/icons/logo";
import { Gamepad2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const startNewGame = () => {
    // Generate a simple unique ID for the game room
    // In a real app, this would likely be handled by a backend
    const gameId = Math.random().toString(36).substr(2, 9);
    router.push(`/game/${gameId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <div className="text-center space-y-8 bg-card p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full">
        <LogoText className="mb-6" />
        
        <p className="text-muted-foreground text-lg">
          Challenge a friend to a classic game of Tic-Tac-Toe!
        </p>
        
        <Button 
          onClick={startNewGame} 
          size="lg" 
          className="w-full transform transition-transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30"
          aria-label="Start a new game of Tic-Tac-Toe"
        >
          <Gamepad2 className="mr-2 h-5 w-5" />
          Start New Game
        </Button>
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Built with Next.js and ShadCN UI.
      </footer>
    </div>
  );
}
