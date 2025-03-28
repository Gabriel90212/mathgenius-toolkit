
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChemistryResult } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className={cn("mt-4 overflow-auto max-h-64", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title} Solution</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {result.error ? (
          <div className="text-red-500">{result.error}</div>
        ) : (
          <>
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
                        <div className="font-mono bg-muted/50 p-1 rounded mt-1">{step.expression}</div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChemistrySteps;
