"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

interface InvitationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  gameLink: string;
}

export function InvitationModal({ isOpen, onOpenChange, gameLink }: InvitationModalProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      toast({
        title: "Link Copied!",
        description: "Invitation link copied to clipboard.",
      });
      setIsCopied(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please copy it manually.",
        variant: "destructive",
      });
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">Invite a Player</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share this link with a friend to invite them to the game.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Input id="gameLink" value={gameLink} readOnly className="bg-muted border-border" />
          <Button 
            type="button" 
            size="icon" 
            onClick={handleCopyLink} 
            variant={isCopied ? "secondary" : "default"}
            aria-label={isCopied ? "Copied" : "Copy link"}
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
