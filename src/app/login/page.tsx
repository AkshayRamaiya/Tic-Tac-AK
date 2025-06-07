
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogoText } from "@/components/icons/logo";
import { Gamepad2, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Login attempt with:", { email, password });
    // Simulate API call / authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // After successful login, you might navigate the user:
    // router.push('/'); 
    alert("Login functionality is a placeholder. Check console for submitted data.");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 selection:bg-primary/20 selection:text-primary-foreground">
      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden animate-scale-in">
        <CardHeader className="items-center text-center p-6 bg-card/80 backdrop-blur-sm border-b border-border">
          <LogoText className="mb-2 animate-subtle-pulse [animation-delay:0.5s]" />
          <CardTitle className="text-2xl font-bold text-primary">Welcome Back, Player!</CardTitle>
          <CardDescription className="text-muted-foreground pt-1">
            Enter your credentials to join the duel.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="text-right -mt-2">
              <Link href="#" className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full transform transition-transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30 text-base py-6"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Gamepad2 className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Logging In...' : 'Enter the Arena'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground pt-4">
            New challenger?{' '}
            <Link href="#" className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
              Create an Account
            </Link>
          </p>
        </CardContent>
      </Card>
       <footer className="fixed bottom-4 text-sm text-muted-foreground/80">
        Tic-Tac-Toe Duel: Secure Login.
      </footer>
    </div>
  );
}
