export type Formula = {
  id: string;
  name: string;
  category: 'Algebra' | 'Geometry' | 'Physics' | 'Trigonometry';
  formula: string;
  description: string;
};

export const formulas: Formula[] = [
  {
    id: 'quadratic-formula',
    name: 'Quadratic Formula',
    category: 'Algebra',
    formula: 'x = [-b ± sqrt(b² - 4ac)] / 2a',
    description: 'Solves for x in a quadratic equation of the form ax² + bx + c = 0.',
  },
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem',
    category: 'Geometry',
    formula: 'a² + b² = c²',
    description: 'Relates the three sides of a right-angled triangle.',
  },
  {
    id: 'slope-formula',
    name: 'Slope Formula',
    category: 'Algebra',
    formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
    description: 'Calculates the slope of a line between two points.',
  },
  {
    id: 'area-circle',
    name: 'Area of a Circle',
    category: 'Geometry',
    formula: 'A = πr²',
    description: 'Calculates the area of a circle given its radius.',
  },
  {
    id: 'circumference-circle',
    name: 'Circumference of a Circle',
    category: 'Geometry',
    formula: 'C = 2πr',
    description: 'Calculates the circumference of a circle given its radius.',
  },
  {
    id: 'law-of-sines',
    name: 'Law of Sines',
    category: 'Trigonometry',
    formula: 'a/sin(A) = b/sin(B) = c/sin(C)',
    description: 'Relates the sides of a triangle to the sines of their opposite angles.',
  },
  {
    id: 'law-of-cosines',
    name: 'Law of Cosines',
    category: 'Trigonometry',
    formula: 'c² = a² + b² - 2ab cos(C)',
    description: 'Relates the lengths of the sides of a triangle to the cosine of one of its angles.',
  },
  {
    id: 'newtons-second-law',
    name: "Newton's Second Law",
    category: 'Physics',
    formula: 'F = ma',
    description: 'Force equals mass times acceleration.',
  },
  {
    id: 'einstein-mass-energy',
    name: 'Mass-Energy Equivalence',
    category: 'Physics',
    formula: 'E = mc²',
    description: 'Energy equals mass times the speed of light squared.',
  },
  {
    id: 'distance-formula',
    name: 'Distance Formula',
    category: 'Geometry',
    formula: 'd = sqrt((x₂ - x₁)² + (y₂ - y₁)²)',
    description: 'Calculates the distance between two points in a plane.',
  },
  {
    id: 'sine-identity',
    name: 'Sine Identity',
    category: 'Trigonometry',
    formula: 'sin(θ) = Opposite / Hypotenuse',
    description: 'The basic definition of sine in a right-angled triangle.',
  },
    {
    id: 'cosine-identity',
    name: 'Cosine Identity',
    category: 'Trigonometry',
    formula: 'cos(θ) = Adjacent / Hypotenuse',
    description: 'The basic definition of cosine in a right-angled triangle.',
  },
  {
    id: 'tangent-identity',
    name: 'Tangent Identity',
    category: 'Trigonometry',
    formula: 'tan(θ) = Opposite / Adjacent',
    description: 'The basic definition of tangent in a right-angled triangle.',
  },
];
