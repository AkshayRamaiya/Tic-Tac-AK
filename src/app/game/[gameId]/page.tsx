"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import type { BoardState, Player, GameStatus as GameResultType, WinningLine } from '@/types';
import { calculateWinner, isBoardFull, createInitialBoard } from '@/lib/game-logic';
import { GameBoard } from '@/components/game/game-board';
import { GameStatus } from '@/components/game/game-status';
import { GameControls } from '@/components/game/game-controls';
import { InvitationModal } from '@/components/game/invitation-modal';
import { LogoText } from '@/components/icons/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Confetti } from 'lucide-react'; // Placeholder for potential win animation enhancement

export default function GamePage() {
  const params = useParams();
  const gameId = params.gameId as string;

  const [board, setBoard] = useState<BoardState>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameResult, setGameResult] = useState<GameResultType | null>('playing'); // 'playing', 'draw', 'X', 'O'
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    // This effect runs only on the client after mount
    setInviteLink(window.location.href);
  }, []);

  // In a real-time app, you would fetch game state based on gameId here
  // and listen for updates from a backend (e.g., Firebase, WebSockets)
  // useEffect(() => {
  //   if (gameId) {
  //     // const unsubscribe = setupRealtimeListener(gameId, (newGameState) => {
  //     //   setBoard(newGameState.board);
  //     //   setCurrentPlayer(newGameState.currentPlayer);
  //     //   setGameResult(newGameState.gameResult);
  //     //   setWinningLine(newGameState.winningLine);
  //     // });
  //     // return () => unsubscribe();
  //   }
  // }, [gameId]);

  const handleCellClick = useCallback((index: number) => {
    if (gameResult !== 'playing' || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // In a real-time app, this move would be sent to the backend here:
    // sendMoveToBackend(gameId, index, currentPlayer);

    const { winner: newWinner, line: newLine } = calculateWinner(newBoard);

    if (newWinner) {
      setGameResult(newWinner);
      setWinningLine(newLine);
    } else if (isBoardFull(newBoard)) {
      setGameResult('draw');
    } else {
      setCurrentPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  }, [board, currentPlayer, gameResult, gameId]);

  const handleRestartGame = useCallback(() => {
    setBoard(createInitialBoard());
    setCurrentPlayer('X');
    setGameResult('playing');
    setWinningLine(null);
    // In a real-time app, signal backend to restart game:
    // restartGameOnBackend(gameId);
  }, [gameId]);

  const handleOpenInviteModal = () => {
    setIsInvitationModalOpen(true);
  };
  
  const isGameOver = gameResult !== 'playing';

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

      {isGameOver && gameResult !== 'draw' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {/* Basic confetti-like effect for winners */}
          {[...Array(30)].map((_, i) => (
            <Confetti
              key={i}
              className="absolute animate-ping text-primary opacity-0"
              style={{
                left: `${Math.random() * 300 - 150}px`,
                top: `${Math.random() * 300 - 150}px`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                width: `${10 + Math.random() * 10}px`,
                height: `${10 + Math.random() * 10}px`,
                color: gameResult === 'X' ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
              }}
            />
          ))}
        </div>
      )}

      <InvitationModal
        isOpen={isInvitationModalOpen}
        onOpenChange={setIsInvitationModalOpen}
        gameLink={inviteLink}
      />
      <footer className="fixed bottom-4 text-sm text-muted-foreground/80">
        Game ID: {gameId}
      </footer>
    </div>
  );
}
