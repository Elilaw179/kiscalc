'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { solveEquationAction } from '@/app/equation-solver/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  solution: '',
  isError: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Solve'}
    </Button>
  );
}

export function EquationSolver() {
  const [state, formAction] = useActionState(solveEquationAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <form action={formAction}>
          <CardHeader>
            <CardTitle>AI Equation Solver</CardTitle>
            <CardDescription>Enter an algebraic equation, and our AI will solve it for you, step by step.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation">Equation</Label>
              <Input 
                id="equation" 
                name="equation" 
                placeholder="e.g., 2x + 5 = 15" 
                required 
              />
            </div>
            {state.solution && !state.isError && (
              <div className="space-y-2">
                <Label>Solution</Label>
                <Card className="bg-background/50">
                  <CardContent className="p-4">
                    <pre className="font-code text-sm whitespace-pre-wrap">{state.solution}</pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
