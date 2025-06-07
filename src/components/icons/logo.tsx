import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LogoTextProps extends HTMLAttributes<HTMLHeadingElement> {}

export function LogoText({ className, ...props }: LogoTextProps) {
  return (
    <h1 
      className={cn("font-headline text-3xl md:text-4xl font-bold text-primary dark:text-primary", className)}
      {...props}
    >
      Tic-Tac-Toe <span className="text-accent dark:text-accent">Duel</span>
    </h1>
  );
}
