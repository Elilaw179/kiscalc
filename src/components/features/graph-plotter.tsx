'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function GraphPlotter() {
  const [funcStr, setFuncStr] = useState('x^2');
  const [xMin, setXMin] = useState('-10');
  const [xMax, setXMax] = useState('10');
  const [step, setStep] = useState('0.5');
  const { toast } = useToast();

  const chartData = useMemo(() => {
    const min = parseFloat(xMin);
    const max = parseFloat(xMax);
    const s = parseFloat(step);

    if (isNaN(min) || isNaN(max) || isNaN(s) || s <= 0 || min >= max) {
      return [];
    }

    const data = [];
    const sanitizedFunc = funcStr.replace(/\^/g, '**');

    try {
      const plotFunction = new Function('x', `with(Math) { return ${sanitizedFunc}; }`);
      
      for (let x = min; x <= max; x += s) {
        const y = plotFunction(x);
        if (isFinite(y)) {
          data.push({ x: x.toFixed(2), y });
        }
      }
      return data;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Invalid Function',
        description: 'Please check your function syntax.',
      });
      return [];
    }
  }, [funcStr, xMin, xMax, step, toast]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Graph Plotter</CardTitle>
          <CardDescription>Visualize mathematical functions. Enter a function of x.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="function">Function y = f(x)</Label>
              <Input id="function" value={funcStr} onChange={(e) => setFuncStr(e.target.value)} placeholder="e.g., sin(x) * x" className="font-code" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="x-min">x-Min</Label>
                <Input id="x-min" type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="x-max">x-Max</Label>
                <Input id="x-max" type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="step">Step</Label>
                <Input id="step" type="number" value={step} onChange={(e) => setStep(e.target.value)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg min-h-[400px]">
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            {chartData.length > 0 ? (
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="x" stroke="hsl(var(--foreground))" dy={10} />
                <YAxis stroke="hsl(var(--foreground))" dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} name={`y = ${funcStr}`} />
              </LineChart>
            ) : (
                <div className="flex justify-center items-center h-full text-muted-foreground">
                    Enter a valid function to plot the graph.
                </div>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
