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
import { googleAI } from '@genkit-ai/google-genai';

const SolveAlgebraicEquationsInputSchema = z.object({
  equation: z.string().describe('The algebraic equation to solve.'),
});
export type SolveAlgebraicEquationsInput = z.infer<typeof SolveAlgebraicEquationsInputSchema>;

const SolveAlgebraicEquationsOutputSchema = z.object({
  solution: z.string().describe('The solution to the algebraic equation, including intermediate steps.'),
});
export type SolveAlgebraicEquationsOutput = z.infer<typeof SolveAlgebraicEquationsOutputSchema>;

const solveAlgebraicEquationsPrompt = ai.definePrompt({
  name: 'solveAlgebraicEquationsPrompt',
  model: googleAI.model('gemini-2.5-flash-preview'),
  input: {schema: SolveAlgebraicEquationsInputSchema},
  output: {schema: SolveAlgebraicEquationsOutputSchema},
  prompt: `You are an expert mathematician skilled at solving algebraic equations step by step.

  Your goal is to solve for the unknown variable in the given equation.
  - Show all intermediate steps clearly.
  - Explain the reasoning behind each step (e.g., "subtract 5 from both sides").
  - State the final answer clearly.
  - If an equation has no solution or infinite solutions, state that and explain why.

  Example 1:
  Equation: 2x + 5 = 15
  Solution:
  1.  Start with the equation: 2x + 5 = 15
  2.  To isolate the term with x, subtract 5 from both sides: 2x + 5 - 5 = 15 - 5
  3.  Simplify: 2x = 10
  4.  To solve for x, divide both sides by 2: 2x / 2 = 10 / 2
  5.  Simplify: x = 5
  The final answer is x = 5.

  Example 2:
  Equation: 3(a - 2) = 9
  Solution:
  1.  Start with the equation: 3(a - 2) = 9
  2.  Distribute the 3 on the left side: 3 * a - 3 * 2 = 9
  3.  Simplify: 3a - 6 = 9
  4.  Add 6 to both sides: 3a - 6 + 6 = 9 + 6
  5.  Simplify: 3a = 15
  6.  Divide by 3: a = 5
  The final answer is a = 5.

  Now, solve the following equation.

  Equation: {{{equation}}}
  `,
});

export async function solveAlgebraicEquations(input: SolveAlgebraicEquationsInput): Promise<SolveAlgebraicEquationsOutput> {
  const {output} = await solveAlgebraicEquationsPrompt(input);
  if (!output) {
    throw new Error('The AI model did not return a solution.');
  }
  return output;
}
