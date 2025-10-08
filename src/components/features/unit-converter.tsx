'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Thermometer, Weight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

const conversionData = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: {
      meters: { name: 'Meters', factor: 1 },
      kilometers: { name: 'Kilometers', factor: 1000 },
      centimeters: { name: 'Centimeters', factor: 0.01 },
      miles: { name: 'Miles', factor: 1609.34 },
      feet: { name: 'Feet', factor: 0.3048 },
      inches: { name: 'Inches', factor: 0.0254 },
    },
  },
  weight: {
    name: 'Weight',
    icon: Weight,
    units: {
      grams: { name: 'Grams', factor: 1 },
      kilograms: { name: 'Kilograms', factor: 1000 },
      milligrams: { name: 'Milligrams', factor: 0.001 },
      pounds: { name: 'Pounds', factor: 453.592 },
      ounces: { name: 'Ounces', factor: 28.3495 },
    },
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: {
      celsius: { name: 'Celsius' },
      fahrenheit: { name: 'Fahrenheit' },
      kelvin: { name: 'Kelvin' },
    },
  },
};

type Category = keyof typeof conversionData;

export function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('1');

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const newUnits = Object.keys(conversionData[newCategory].units);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };
  
  const outputValue = useMemo(() => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) return '';

    if (category === 'temperature') {
      let tempInCelsius: number;
      if (fromUnit === 'celsius') tempInCelsius = input;
      else if (fromUnit === 'fahrenheit') tempInCelsius = (input - 32) * 5 / 9;
      else if (fromUnit === 'kelvin') tempInCelsius = input - 273.15;
      else return '';

      let result: number;
      if (toUnit === 'celsius') result = tempInCelsius;
      else if (toUnit === 'fahrenheit') result = tempInCelsius * 9 / 5 + 32;
      else if (toUnit === 'kelvin') result = tempInCelsius + 273.15;
      else return '';
      return result.toFixed(3);
    } else {
      const fromFactor = conversionData[category].units[fromUnit as keyof typeof conversionData[typeof category]['units']].factor;
      const toFactor = conversionData[category].units[toUnit as keyof typeof conversionData[typeof category]['units']].factor;
      const result = (input * fromFactor) / toFactor;
      return result.toFixed(5);
    }
  }, [inputValue, fromUnit, toUnit, category]);

  const currentUnits = conversionData[category].units;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Unit Converter</CardTitle>
          <CardDescription>Convert between different units of measurement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Category</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {(Object.keys(conversionData) as Category[]).map((cat) => {
                const Icon = conversionData[cat].icon;
                return (
                  <Button key={cat} variant={category === cat ? 'default' : 'secondary'} onClick={() => handleCategoryChange(cat)} className="flex gap-2">
                    <Icon className="h-4 w-4" />
                    {conversionData[cat].name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input 
                id="from-value" 
                type="number" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentUnits).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="ghost" size="icon" className="self-center mt-6" onClick={handleSwap}>
              <ArrowRightLeft className="h-5 w-5 text-accent" />
            </Button>
            
            <div className="space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input 
                id="to-value" 
                value={outputValue} 
                readOnly 
                className="text-lg font-bold bg-secondary"
              />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentUnits).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
