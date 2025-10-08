'use server';

/**
 * @fileOverview A flow that solves algebraic equations using AI, showing intermediate steps.
 *
 * - solveAlgebraicEquations - A function that solves algebraic equations.
 * - SolveAlgebraicEquationsInput - The input type for the solveAlgebraicEquations function.
 * - SolveAlgebraicEquationsOutput - The return type for the solveAlgebraicEquations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveAlgebraicEquationsInputSchema = z.object({
  equation: z.string().describe('The algebraic equation to solve.'),
});
export type SolveAlgebraicEquationsInput = z.infer<typeof SolveAlgebraicEquationsInputSchema>;

const SolveAlgebraicEquationsOutputSchema = z.object({
  solution: z.string().describe('The solution to the algebraic equation, including intermediate steps.'),
});
export type SolveAlgebraicEquationsOutput = z.infer<typeof SolveAlgebraicEquationsOutputSchema>;

export async function solveAlgebraicEquations(input: SolveAlgebraicEquationsInput): Promise<SolveAlgebraicEquationsOutput> {
  return solveAlgebraicEquationsFlow(input);
}

const solveAlgebraicEquationsPrompt = ai.definePrompt({
  name: 'solveAlgebraicEquationsPrompt',
  input: {schema: SolveAlgebraicEquationsInputSchema},
  output: {schema: SolveAlgebraicEquationsOutputSchema},
  prompt: `You are an expert mathematician skilled at solving algebraic equations step by step.

  Given the following equation, solve for the variable, showing all intermediate steps and reasoning.

  Equation: {{{equation}}}
  `,
});

const solveAlgebraicEquationsFlow = ai.defineFlow(
  {
    name: 'solveAlgebraicEquationsFlow',
    inputSchema: SolveAlgebraicEquationsInputSchema,
    outputSchema: SolveAlgebraicEquationsOutputSchema,
  },
  async input => {
    const {output} = await solveAlgebraicEquationsPrompt(input);
    return output!;
  }
);
