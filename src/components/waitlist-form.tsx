"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const q = query(collection(db, "waitlist"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCount(querySnapshot.size);
      }, (error) => {
        console.error("Error fetching waitlist count:", error);
        toast({
            title: "Connection Error",
            description: "Could not fetch live founder count. Your Firebase configuration might be missing or incorrect.",
            variant: "destructive"
        })
      });
      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase initialization error. Please check your configuration in src/lib/firebase.ts and your .env.local file.", err);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      await addDoc(collection(db, 'waitlist'), {
        email: email,
        timestamp: serverTimestamp(),
        source: 'landing_page'
      });
      setIsSubmitted(true);
    } catch (err)      {
      console.error('Error saving email:', err);
      toast({
          title: "Submission Error",
          description: "Something went wrong. Please check your Firebase setup and security rules, then try again.",
          variant: "destructive"
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <div className="mt-6 bg-[#16202e] text-[#8bffd3] p-4 rounded-lg text-lg font-medium flex items-center justify-center gap-2">
          <PartyPopper className="w-6 h-6" />
          You're in! Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            id="email"
            placeholder="Enter your email…"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input text-foreground border-none rounded-lg p-6 text-base placeholder:text-[#8a7fb8]/80 focus-visible:ring-2 focus-visible:ring-primary h-auto"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent border-none rounded-lg text-white font-bold text-base py-3 h-auto tracking-wide hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_hsl(var(--primary)/0.3)] transition-all duration-150"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Join as Founder'}
          </Button>
        </form>
      )}
      <div className="mt-10 text-sm text-[#9e9ac8]/75">
        No spam — just early-access details.<br />
        <span id="count">{count !== null ? `${count} founders and counting` : 'Building the future together'}</span>
      </div>
    </>
  );
}
