
import React, { useState } from "react";
import { PhysicsResult, PhysicsOperation } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PhysicsStepsProps {
  result: PhysicsResult;
  operation: PhysicsOperation;
  className?: string;
  formula?: string;
  variables?: Record<string, string>;
  onCalculate?: (variables: Record<string, string>, targetVariable?: string) => void;
}

const PhysicsSteps: React.FC<PhysicsStepsProps> = ({ 
  result, 
  operation, 
  className,
  formula,
  variables: initialVariables,
  onCalculate 
}) => {
  const [variables, setVariables] = useState<Record<string, string>>(initialVariables || {});
  const [targetVariable, setTargetVariable] = useState<string | undefined>(undefined);
  const [showVariableInputs, setShowVariableInputs] = useState<boolean>(!!formula);

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

  const handleVariableChange = (variable: string, value: string) => {
    setVariables({
      ...variables,
      [variable]: value
    });
  };

  const handleTargetVariableChange = (variable: string) => {
    setTargetVariable(variable === targetVariable ? undefined : variable);
  };

  const handleCalculateClick = () => {
    if (onCalculate) {
      onCalculate(variables, targetVariable);
    }
  };

  // Extract variables from formula if available
  const extractVariables = () => {
    if (!formula) return [];
    // This is a simplified extraction - adjust based on your formula format
    const matches = formula.match(/[a-zA-Z]+/g) || [];
    return [...new Set(matches)]; // Remove duplicates
  };

  const formulaVariables = extractVariables();

  return (
    <Card className={cn("mt-4 overflow-auto max-h-96", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {formula && (
          <div className="mb-4 p-2 bg-muted/30 rounded-md">
            <div className="font-medium mb-2">Formula: {formula}</div>
            
            {showVariableInputs && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {formulaVariables.map(variable => (
                    <div key={variable} className="flex items-center space-x-2">
                      <Button 
                        variant={targetVariable === variable ? "secondary" : "outline"} 
                        size="sm"
                        onClick={() => handleTargetVariableChange(variable)}
                      >
                        {variable}
                      </Button>
                      <Input
                        placeholder={`Value for ${variable}`}
                        value={variables[variable] || ''}
                        onChange={(e) => handleVariableChange(variable, e.target.value)}
                        disabled={targetVariable === variable}
                        className="text-xs"
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={handleCalculateClick} className="w-full">
                  Calculate {targetVariable ? `for ${targetVariable}` : ''}
                </Button>
              </div>
            )}
          </div>
        )}
        
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
