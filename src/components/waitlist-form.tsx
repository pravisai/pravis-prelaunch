"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export function WaitlistForm() {
  const [founderCount, setFounderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, "waitlist"), (snapshot) => {
        setFounderCount(snapshot.size);
      });
      return () => unsub();
    } catch (error) {
      console.error("Error fetching founder count:", error);
      toast({
        title: "Connection Error",
        description: "Could not fetch live founder count. Your Firebase configuration might be missing or incorrect.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "waitlist"), {
        email: values.email,
        createdAt: new Date(),
        source: 'landing-page-presentation'
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding to waitlist: ", error);
      toast({
        title: "Submission Error",
        description: "Could not add you to the waitlist. This could be due to a network issue or missing permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
        <div className="text-center p-6 bg-black/50 rounded-lg backdrop-blur-sm">
            <PartyPopper className="w-12 h-12 mx-auto text-primary animate-bounce"/>
            <h2 className="mt-4 text-2xl font-bold text-white">You have ascended.</h2>
            <p className="mt-2 text-gray-400">Welcome to the pantheon. We will be in touch.</p>
        </div>
      );
  }

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl bg-black/30 backdrop-blur-sm border border-primary/20 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email to transcend"
                      className="h-12 text-base text-center bg-gray-900/80 border-gray-700 text-white placeholder-gray-500 focus:ring-primary focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Claim Your Divinity
            </Button>
          </form>
        </Form>
        <div className="text-center text-gray-400">
            <p className="font-bold text-primary animate-pulse">{founderCount} have joined the pantheon</p>
        </div>
    </div>
  );
}
