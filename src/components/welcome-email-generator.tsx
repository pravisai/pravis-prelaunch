"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateWelcomeEmail } from '@/ai/flows/generate-welcome-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  tone: z.string().min(3, "Tone must be at least 3 characters long."),
  keywords: z.string().min(3, "Keywords must be at least 3 characters long."),
});

export function WelcomeEmailGenerator() {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tone: "",
      keywords: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedEmail('');
    try {
      const result = await generateWelcomeEmail(values);
      setGeneratedEmail(result.emailDraft);
    } catch (error) {
      console.error("Error generating email:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Friendly, professional, excited" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Project Unveiling, special offer, digital mind" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Generate Email
          </Button>
        </form>
      </Form>

      {isLoading && (
         <div className="flex justify-center items-center pt-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {generatedEmail && (
        <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Generated Email Draft</h3>
            <div className="p-4 rounded-md bg-muted/50 border">
                 <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">{generatedEmail}</pre>
            </div>
        </div>
      )}
    </div>
  );
}
