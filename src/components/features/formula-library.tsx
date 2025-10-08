'use client';

import { useState, useMemo } from 'react';
import type { Formula } from '@/lib/formulas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

type Props = {
  formulas: Formula[];
};

export function FormulaLibrary({ formulas }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const categories = useMemo(() => ['all', ...Array.from(new Set(formulas.map(f => f.category)))], [formulas]);

  const filteredFormulas = useMemo(() => {
    return formulas.filter(formula => {
      const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) || formula.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || formula.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [formulas, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Formula Library</CardTitle>
          <CardDescription>A searchable library of common scientific and mathematical formulas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search formulas..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer capitalize whitespace-nowrap"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFormulas.map((formula) => (
          <Card key={formula.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{formula.name}</CardTitle>
                  <Badge variant="outline">{formula.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center items-center">
              <div className="bg-background/50 p-4 rounded-md w-full text-center">
                  <p className="font-code text-accent text-xl">{formula.formula}</p>
              </div>
              <CardDescription className="mt-4 text-center">{formula.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
         {filteredFormulas.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
                No formulas found.
            </div>
        )}
      </div>
    </div>
  );
}
