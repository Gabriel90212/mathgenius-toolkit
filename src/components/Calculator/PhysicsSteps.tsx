
import React, { useState, useEffect } from "react";
import { PhysicsResult, PhysicsOperation } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface PhysicsStepsProps {
  result: PhysicsResult;
  operation: PhysicsOperation;
  className?: string;
  formula?: string;
  variables?: Record<string, string>;
  onCalculate?: (variables: Record<string, string>, targetVariable?: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const PhysicsSteps: React.FC<PhysicsStepsProps> = ({ 
  result, 
  operation, 
  className,
  formula,
  variables: initialVariables,
  onCalculate,
  isOpen = false,
  onClose,
}) => {
  const [variables, setVariables] = useState<Record<string, string>>(initialVariables || {});
  const [targetVariable, setTargetVariable] = useState<string | undefined>(undefined);
  const [showVariableInputs, setShowVariableInputs] = useState<boolean>(!!formula);
  const [dialogOpen, setDialogOpen] = useState<boolean>(isOpen);

  // Extract variables from formula immediately when component mounts or formula changes
  useEffect(() => {
    if (formula) {
      setShowVariableInputs(true);
      
      // Get variables from the formula
      const extractedVars = extractVariables();
      
      // Always initialize variables when formula changes
      const newVariables: Record<string, string> = {};
      extractedVars.forEach(v => {
        // Keep existing values if available
        newVariables[v] = initialVariables?.[v] || '';
      });
      
      setVariables(newVariables);
    }
  }, [formula, initialVariables]);

  // Keep dialog state in sync with isOpen prop
  useEffect(() => {
    setDialogOpen(isOpen);
  }, [isOpen]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (onClose) onClose();
  };

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
      handleCloseDialog();
    }
  };

  const clearForm = () => {
    const emptyVariables: Record<string, string> = {};
    Object.keys(variables).forEach(key => {
      emptyVariables[key] = '';
    });
    setVariables(emptyVariables);
    setTargetVariable(undefined);
    toast.success("Formula inputs cleared");
  };

  // Extract variables from formula if available
  const extractVariables = () => {
    if (!formula) return [];
    // This is a simplified extraction - adjust based on your formula format
    const matches = formula.match(/[a-zA-Z]+/g) || [];
    return [...new Set(matches)]; // Remove duplicates
  };

  const formulaVariables = extractVariables();

  const formulaContent = (
    <div className="mb-6 p-4 bg-muted/30 rounded-md border border-primary/20">
      <div className="font-medium mb-4 text-center text-primary text-lg">{formula}</div>
      
      {showVariableInputs && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulaVariables.map(variable => (
              <div key={variable} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant={targetVariable === variable ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => handleTargetVariableChange(variable)}
                    className="w-14 h-10 flex-shrink-0 text-base"
                  >
                    {variable}
                  </Button>
                  <Input
                    placeholder={`Value for ${variable}`}
                    value={variables[variable] || ''}
                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                    disabled={targetVariable === variable}
                    className={cn("text-base h-10", targetVariable === variable && "bg-muted")}
                    type="number"
                    step="any"
                  />
                </div>
                {targetVariable === variable && (
                  <p className="text-sm text-muted-foreground pl-16">Solving for this variable</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={handleCalculateClick} 
              className="flex-1 py-2 h-10 text-base"
              variant="default"
              size="default"
            >
              Calculate {targetVariable ? `for ${targetVariable}` : 'Result'}
            </Button>
            <Button
              onClick={clearForm}
              variant="outline"
              size="default"
              className="h-10 text-base"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const resultsContent = (
    <>
      {result.error ? (
        <div className="text-red-500 p-3 bg-red-50 rounded-md text-base">{result.error}</div>
      ) : (
        <>
          <div className="font-semibold mb-4 p-3 bg-primary/10 rounded-md flex justify-between text-base">
            <span>Result:</span> <span className="font-mono">{result.result}</span>
          </div>
          <div className="space-y-4 mt-6">
            {result.steps && result.steps.map((step, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="font-medium text-base">{step.description}</div>
                <div className="font-mono bg-muted/50 p-3 rounded mt-2 overflow-x-auto text-base">
                  {step.expression}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={clearForm}
            variant="outline"
            size="default"
            className="mt-5 text-base"
          >
            Clear Formula
          </Button>
        </>
      )}
    </>
  );

  // For formula dialog
  if (formula && isOpen) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Formula Calculator</DialogTitle>
            <DialogDescription className="text-base">
              Enter values and select which variable to solve for
            </DialogDescription>
          </DialogHeader>
          {formulaContent}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} className="text-base">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // For regular display
  return (
    <Card className={cn("mt-5 overflow-auto max-h-[550px]", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="text-base">
        {formula && formulaContent}
        {resultsContent}
      </CardContent>
    </Card>
  );
};

export default PhysicsSteps;
