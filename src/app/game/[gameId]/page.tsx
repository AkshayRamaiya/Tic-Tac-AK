
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { BoardState, Player, GameStatus as GameResultType, WinningLine } from '@/types';
import { calculateWinner, isBoardFull, createInitialBoard } from '@/lib/game-logic';
import { GameBoard } from '@/components/game/game-board';
import { GameStatus } from '@/components/game/game-status';
import { GameControls } from '@/components/game/game-controls';
import { InvitationModal } from '@/components/game/invitation-modal';
import { WinnerDialog } from '@/components/game/winner-dialog';
import { LogoText } from '@/components/icons/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PartyPopper } from 'lucide-react';

const AUTH_KEY = 'tic-tac-toe-duel-isLoggedIn';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [board, setBoard] = useState<BoardState>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameResult, setGameResult] = useState<GameResultType | null>('playing'); 
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    // Check authentication status
    const loggedIn = localStorage.getItem(AUTH_KEY) === 'true';
    setIsAuthenticated(loggedIn);

    if (!loggedIn) {
      router.replace(`/login?redirect=/game/${gameId}`);
    } else {
      // Only set invite link if authenticated and on client
      setInviteLink(window.location.href);
    }
  }, [router, gameId]);

  useEffect(() => {
    if (gameResult === 'X' || gameResult === 'O') {
      setWinner(gameResult);
      setIsWinnerModalOpen(true);
    } else {
      setIsWinnerModalOpen(false);
    }
  }, [gameResult]);


  const handleCellClick = useCallback((index: number) => {
    if (gameResult !== 'playing' || board[index] || !isAuthenticated) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const { winner: newWinner, line: newLine } = calculateWinner(newBoard);

    if (newWinner) {
      setGameResult(newWinner);
      setWinningLine(newLine);
    } else if (isBoardFull(newBoard)) {
      setGameResult('draw');
    } else {
      setCurrentPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  }, [board, currentPlayer, gameResult, isAuthenticated]);

  const handleRestartGame = useCallback(() => {
    if (!isAuthenticated) return;
    setBoard(createInitialBoard());
    setCurrentPlayer('X');
    setGameResult('playing');
    setWinningLine(null);
    setIsWinnerModalOpen(false);
  }, [isAuthenticated]);

  const handleOpenInviteModal = () => {
    if (!isAuthenticated) return;
    setIsInvitationModalOpen(true);
  };
  
  const isGameOver = gameResult !== 'playing';

  if (isAuthenticated === null) {
    // Still checking auth, show loading or null
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Should have been redirected, but as a fallback:
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 selection:bg-primary/20 selection:text-primary-foreground">
      <Card className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="items-center pt-6 pb-2 bg-card">
          <LogoText />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <GameStatus gameResult={gameResult} currentPlayer={currentPlayer} />
          
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={isGameOver}
            winningLine={winningLine}
            currentPlayer={currentPlayer}
          />
          
          <GameControls
            onRestart={handleRestartGame}
            onInvite={handleOpenInviteModal}
            isGameOver={isGameOver}
          />
        </CardContent>
      </Card>

      {isGameOver && winner && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-0 h-0">
          {[...Array(40)].map((_, i) => (
            <PartyPopper
              key={i}
              className="absolute animate-particle-burst"
              style={{
                '--tx': `${(Math.random() - 0.5) * 400}px`,
                '--ty': `${(Math.random() - 0.5) * 400}px`,
                '--s': `${0.7 + Math.random() * 0.8}`,
                '--r': `${(Math.random() - 0.5) * 720}deg`,
                animationDelay: `${Math.random() * 0.3}s`,
                animationDuration: `${0.6 + Math.random() * 0.6}s`,
                width: `${12 + Math.random() * 12}px`,
                height: `${12 + Math.random() * 12}px`,
                color: winner === 'X' ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <InvitationModal
        isOpen={isInvitationModalOpen}
        onOpenChange={setIsInvitationModalOpen}
        gameLink={inviteLink}
      />

      <WinnerDialog
        isOpen={isWinnerModalOpen}
        onOpenChange={setIsWinnerModalOpen}
        winner={winner}
        onRestart={handleRestartGame}
      />
      
      <footer className="fixed bottom-4 text-sm text-muted-foreground/80">
        Game ID: {gameId}
      </footer>
    </div>
  );
}
