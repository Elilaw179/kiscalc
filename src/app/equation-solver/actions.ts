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
    return {
      message: 'An error occurred while solving the equation. The AI model may be unavailable or the input is invalid.',
      isError: true,
    };
  }
}
