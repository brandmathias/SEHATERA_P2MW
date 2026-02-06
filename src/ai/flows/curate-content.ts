'use server';
/**
 * @fileOverview Curates content for users based on their mood and interests.
 *
 * - curateContent - A function that returns a curated article and quote.
 */

import {ai} from '@/ai/genkit';
import {
    CurateContentInputSchema,
    CurateContentOutputSchema,
    type CurateContentInput,
    type CurateContentOutput
} from '@/types';


// The prompt for the AI model
const curateContentPrompt = ai.definePrompt({
  name: 'curateContentPrompt',
  input: { schema: CurateContentInputSchema },
  output: { schema: CurateContentOutputSchema },
  prompt: `You are an AI assistant for "SEHATERA", an app designed to support and uplift elderly users in Indonesia. Your task is to provide uplifting and educational content.

Based on the user's current mood and interests, generate a single, concise article title and a short, easy-to-read summary for it. The tone should be warm, positive, and encouraging. Also, provide a single inspirational quote that aligns with their interests.

All content MUST be in Bahasa Indonesia.

User's Mood: {{{userMood}}}
User's Interests: {{{interests}}}
`,
});

// The Genkit flow
const curateContentFlow = ai.defineFlow(
  {
    name: 'curateContentFlow',
    inputSchema: CurateContentInputSchema,
    outputSchema: CurateContentOutputSchema,
  },
  async (input) => {
    const { output } = await curateContentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate curated content.');
    }
    return output;
  }
);

// The exported function that the UI will call
export async function curateContent(input: CurateContentInput): Promise<CurateContentOutput> {
  return await curateContentFlow(input);
}
