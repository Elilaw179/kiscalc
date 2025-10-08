import { FormulaLibrary } from "@/components/features/formula-library";
import { formulas } from "@/lib/formulas";

export default function FormulaLibraryPage() {
    return <FormulaLibrary formulas={formulas} />;
}
