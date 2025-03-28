
import React from "react";
import { PhysicsResult, PhysicsOperation } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PhysicsStepsProps {
  result: PhysicsResult;
  operation: PhysicsOperation;
  className?: string;
}

const PhysicsSteps: React.FC<PhysicsStepsProps> = ({ result, operation, className }) => {
  const getTitle = () => {
    switch (operation) {
      case 'kinematics':
        return 'Kinematics Calculation';
      case 'dynamics':
        return 'Dynamics Calculation';
      case 'circuits':
        return 'Circuit Analysis';
      case 'laplace':
        return 'Laplace Transform';
      default:
        return 'Physics Calculation';
    }
  };

  return (
    <Card className={cn("mt-4 overflow-auto max-h-64", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {result.error ? (
          <div className="text-red-500">{result.error}</div>
        ) : (
          <>
            <div className="font-semibold mb-2">Result: {result.result}</div>
            <div className="space-y-2">
              {result.steps.map((step, index) => (
                <div key={index} className="border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="font-medium">{step.description}</div>
                  <div className="font-mono bg-muted/50 p-1 rounded mt-1">
                    {step.expression}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhysicsSteps;
