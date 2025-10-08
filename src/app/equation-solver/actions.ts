'use server';

import { solveAlgebraicEquations } from '@/ai/flows/solve-algebraic-equations';
import { z } from 'zod';

const schema = z.object({
  equation: z.string().min(1, 'Please enter an equation.'),
});

type FormState = {
  message: string;
  solution?: string;
  isError: boolean;
};

export async function solveEquationAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!process.env.GEMINI_API_KEY) {
    return {
      message: 'The Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable.',
      isError: true,
    };
  }

  const validatedFields = schema.safeParse({
    equation: formData.get('equation'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.equation?.join(', ') || 'Invalid input.',
      isError: true,
    };
  }

  try {
    const result = await solveAlgebraicEquations({ equation: validatedFields.data.equation });
    return {
      message: 'Equation solved successfully!',
      solution: result.solution,
      isError: false,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: `An error occurred while solving the equation. The AI model may be unavailable or the input is invalid. (Details: ${errorMessage})`,
      isError: true,
    };
  }
}
