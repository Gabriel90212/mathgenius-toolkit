
import React, { useState } from "react";
import { PhysicsResult, PhysicsOperation } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    if (!targetVariable) {
      toast.error("Please select a variable to solve for");
      return;
    }

    // Check that all other variables have values
    const missingVariables = Object.entries(variables)
      .filter(([key, value]) => key !== targetVariable && !value)
      .map(([key]) => key);

    if (missingVariables.length > 0) {
      toast.error(`Please enter values for: ${missingVariables.join(', ')}`);
      return;
    }

    if (onCalculate) {
      onCalculate(variables, targetVariable);
    }
  };

  const clearForm = () => {
    setVariables({});
    setTargetVariable(undefined);
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
    <Card className={cn("mt-4 overflow-auto max-h-[500px]", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {formula && (
          <div className="mb-4 p-3 bg-muted/30 rounded-md border border-primary/20">
            <div className="font-medium mb-3 text-center text-primary">{formula}</div>
            
            {showVariableInputs && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formulaVariables.map(variable => (
                    <div key={variable} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={targetVariable === variable ? "secondary" : "outline"} 
                          size="sm"
                          onClick={() => handleTargetVariableChange(variable)}
                          className="w-12 flex-shrink-0"
                        >
                          {variable}
                        </Button>
                        <Input
                          placeholder={`Value for ${variable}`}
                          value={variables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          disabled={targetVariable === variable}
                          className={cn("text-sm", targetVariable === variable && "bg-muted")}
                        />
                      </div>
                      {targetVariable === variable && (
                        <p className="text-xs text-muted-foreground pl-14">Solving for this variable</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleCalculateClick} 
                    className="flex-1"
                    variant="default"
                    size="sm"
                  >
                    Calculate {targetVariable ? `for ${targetVariable}` : 'Result'}
                  </Button>
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    size="sm"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {result.error ? (
          <div className="text-red-500 p-2 bg-red-50 rounded-md">{result.error}</div>
        ) : (
          <>
            <div className="font-semibold mb-3 p-2 bg-primary/10 rounded-md flex justify-between">
              <span>Result:</span> <span className="font-mono">{result.result}</span>
            </div>
            <div className="space-y-3 mt-4">
              {result.steps && result.steps.map((step, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="font-medium">{step.description}</div>
                  <div className="font-mono bg-muted/50 p-2 rounded mt-1 overflow-x-auto">
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
