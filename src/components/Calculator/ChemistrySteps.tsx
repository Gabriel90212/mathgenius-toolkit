
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChemistryResult } from "./CalculatorUtils";
import { cn } from "@/lib/utils";

interface ChemistryStepsProps {
  result: ChemistryResult | null;
  operation: 'balance' | 'stoichiometry' | null;
  className?: string;
}

const ChemistrySteps: React.FC<ChemistryStepsProps> = ({ result, operation, className }) => {
  if (!result || !operation) {
    return null;
  }

  const title = operation === 'balance' ? 'Equation Balancing' : 'Stoichiometry Calculation';

  return (
    <div className={cn("bg-calculator-display rounded-2xl p-4 mt-4 display-glass", className)}>
      <h3 className="text-lg font-medium mb-2">{title} Solution</h3>
      
      <div className="mb-3">
        <div className="text-muted-foreground">Original equation:</div>
        <div className="text-lg font-medium">{result.equation}</div>
      </div>
      
      <div className="mb-3">
        <div className="text-muted-foreground">Result:</div>
        <div className="text-xl font-medium">{result.result}</div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="steps">
          <AccordionTrigger className="text-primary">See step-by-step solution</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {result.steps.map((step, index) => (
                <div key={index} className="border-l-2 border-primary pl-3">
                  <div className="text-sm text-muted-foreground">{step.description}</div>
                  <div className="text-base font-medium mt-1">{step.expression}</div>
                </div>
              ))}
              
              {result.error && (
                <div className="text-destructive mt-2">
                  Note: {result.error}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ChemistrySteps;
