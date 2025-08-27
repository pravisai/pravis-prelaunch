'use server';

/**
 * @fileOverview AI agent that generates a welcome email based on user-provided tone and keywords.
 *
 * - generateWelcomeEmail - A function that generates a welcome email.
 * - GenerateWelcomeEmailInput - The input type for the generateWelcomeEmail function.
 * - GenerateWelcomeEmailOutput - The return type for the generateWelcomeEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateWelcomeEmailInputSchema = z.object({
  tone: z
    .string()
    .describe('The desired tone of the welcome email (e.g., friendly, professional, excited).'),
  keywords: z
    .string()
    .describe('Keywords to include in the welcome email (e.g., product name, special offer).'),
});
export type GenerateWelcomeEmailInput = z.infer<typeof GenerateWelcomeEmailInputSchema>;

const GenerateWelcomeEmailOutputSchema = z.object({
  emailDraft: z.string().describe('The generated welcome email draft.'),
});
export type GenerateWelcomeEmailOutput = z.infer<typeof GenerateWelcomeEmailOutputSchema>;

export async function generateWelcomeEmail(
  input: GenerateWelcomeEmailInput
): Promise<GenerateWelcomeEmailOutput> {
  return generateWelcomeEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWelcomeEmailPrompt',
  input: {schema: GenerateWelcomeEmailInputSchema},
  output: {schema: GenerateWelcomeEmailOutputSchema},
  prompt: `You are an expert email copywriter. Generate a welcome email draft based on the specified tone and keywords.

Tone: {{{tone}}}
Keywords: {{{keywords}}}

Email Draft:`,
});

const generateWelcomeEmailFlow = ai.defineFlow(
  {
    name: 'generateWelcomeEmailFlow',
    inputSchema: GenerateWelcomeEmailInputSchema,
    outputSchema: GenerateWelcomeEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
