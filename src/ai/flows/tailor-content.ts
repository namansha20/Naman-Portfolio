'use server';

/**
 * @fileOverview A dynamic content tailoring AI agent.
 *
 * - tailorContent - A function that handles the content tailoring process.
 * - TailorContentInput - The input type for the tailorContent function.
 * - TailorContentOutput - The return type for the tailorContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorContentInputSchema = z.object({
  visitorProfile: z
    .string()
    .describe('The inferred professional background of the website visitor.'),
  aboutMeSection: z.string().describe('The original About Me section content.'),
  projectDescriptions: z.record(z.string()).describe('A map of project names to their descriptions.'),
});
export type TailorContentInput = z.infer<typeof TailorContentInputSchema>;

const TailorContentOutputSchema = z.object({
  tailoredAboutMe: z.string().describe('The tailored About Me section content.'),
  tailoredProjectDescriptions: z.record(z.string()).describe('A map of project names to their tailored descriptions.'),
});
export type TailorContentOutput = z.infer<typeof TailorContentOutputSchema>;

export async function tailorContent(input: TailorContentInput): Promise<TailorContentOutput> {
  return tailorContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorContentPrompt',
  input: {schema: TailorContentInputSchema},
  output: {schema: TailorContentOutputSchema},
  prompt: `You are an expert at tailoring website content to match a visitor's professional background.

  Based on the visitor's profile, rewrite the About Me section and project descriptions to highlight the most relevant information.

  Visitor Profile: {{{visitorProfile}}}

  Original About Me Section: {{{aboutMeSection}}}

  Original Project Descriptions:
  {{#each projectDescriptions}}
  {{@key}}: {{this}}
  {{/each}}

  Return the tailored About Me section and project descriptions.
  Be concise and professional.
  `,
});

const tailorContentFlow = ai.defineFlow(
  {
    name: 'tailorContentFlow',
    inputSchema: TailorContentInputSchema,
    outputSchema: TailorContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
