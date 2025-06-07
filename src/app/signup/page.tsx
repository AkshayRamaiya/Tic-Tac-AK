
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogoText } from "@/components/icons/logo";
import { UserPlus, Mail, Lock, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const AUTH_KEY = 'tic-tac-toe-duel-isLoggedIn';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in, redirect away from signup page
    if (localStorage.getItem(AUTH_KEY) === 'true') {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); 

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    console.log("Signup attempt with:", { email, password });
    
    // Simulate API call / authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, handle Firebase Authentication here.
    // For now, we'll just simulate success.
    localStorage.setItem(AUTH_KEY, 'true');
    setIsLoading(false);
    
    router.push('/'); // Redirect to homepage after signup
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 selection:bg-primary/20 selection:text-primary-foreground">
      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden animate-scale-in">
        <CardHeader className="items-center text-center p-6 bg-card/80 backdrop-blur-sm border-b border-border">
          <LogoText className="mb-2 animate-subtle-pulse [animation-delay:0.5s]" />
          <CardTitle className="text-2xl font-bold text-primary">Join the Duel!</CardTitle>
          <CardDescription className="text-muted-foreground pt-1">
            Create your account to start playing.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90 flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input/70 border-border focus:bg-input placeholder:text-muted-foreground/70"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/90 flex items-center">
                <Lock className="mr-2 h-4 w-4 text-primary" /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input/70 border-border focus:bg-input placeholder:text-muted-foreground/70"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground/90 flex items-center">
                <CheckSquare className="mr-2 h-4 w-4 text-primary" /> Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={cn(
                  "bg-input/70 border-border focus:bg-input placeholder:text-muted-foreground/70",
                  error && "border-destructive focus:border-destructive"
                )}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button 
              type="submit" 
              className="w-full transform transition-transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30 text-base py-6 mt-6"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <UserPlus className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Creating Account...' : 'Create Account & Play'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground pt-4">
            Already a duelist?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
              Login Here
            </Link>
          </p>
        </CardContent>
      </Card>
       <footer className="fixed bottom-4 text-sm text-muted-foreground/80">
        Tic-Tac-Toe Duel: New Player Registration.
      </footer>
    </div>
  );
}
