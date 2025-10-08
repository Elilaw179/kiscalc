import { Calculator } from '@/components/features/calculator';
import { HeroSection } from '@/components/layout/hero-section';

export default function CalculatorPage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <Calculator />
    </div>
  );
}
