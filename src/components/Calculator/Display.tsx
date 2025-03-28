
import React from "react";
import { cn } from "@/lib/utils";

interface DisplayProps {
  value: string;
  expression: string;
  className?: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression, className }) => {
  // Function to format chemical formulas with proper subscripts for display
  const formatChemicalFormula = (text: string): React.ReactNode => {
    // Check if it's a multiple integral expression
    if (text.startsWith('∫∫') || text.startsWith('∫∫∫')) {
      return formatMultipleIntegrals(text);
    }
    
    // This regex matches element symbols and their subscripts
    const parts = text.split(/([A-Z][a-z]?)(\d*)/g).filter(Boolean);
    
    return parts.map((part, index) => {
      // If the part is a number and follows an element symbol
      if (/^\d+$/.test(part) && index > 0 && /^[A-Z][a-z]?$/.test(parts[index - 1])) {
        return <sub key={index}>{part}</sub>;
      }
      return part;
    });
  };

  // New function to format multiple integrals
  const formatMultipleIntegrals = (text: string): React.ReactNode => {
    // Identify the type of integral
    const isDoubleIntegral = text.startsWith('∫∫');
    const isTripleIntegral = text.startsWith('∫∫∫');
    
    // Extract the expression part (after the integral symbols)
    const integralSymbols = isTripleIntegral ? '∫∫∫' : (isDoubleIntegral ? '∫∫' : '∫');
    const expressionPart = text.substring(integralSymbols.length);
    
    return (
      <span className="flex items-baseline">
        <span className="text-4xl font-light mr-1">{integralSymbols}</span>
        <span>{expressionPart}</span>
      </span>
    );
  };

  return (
    <div className={cn("bg-background rounded-lg p-4 text-right", className)}>
      {expression && (
        <div className="text-sm text-muted-foreground overflow-x-auto whitespace-nowrap mb-1">
          {expression}
        </div>
      )}
      <div className="text-3xl font-light overflow-x-auto overflow-y-hidden whitespace-nowrap">
        {formatChemicalFormula(value)}
      </div>
    </div>
  );
};

export default Display;
