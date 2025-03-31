
import React from "react";
import { cn } from "@/lib/utils";

interface DisplayProps {
  value: string;
  expression: string;
  className?: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression, className }) => {
  // Function to format chemical formulas with proper subscripts and superscripts for display
  const formatChemicalFormula = (text: string): React.ReactNode => {
    // Check for various special cases
    if (text.startsWith('∫∫') || text.startsWith('∫∫∫')) {
      return formatMultipleIntegrals(text);
    }
    
    if (text.includes('^')) {
      return formatExponents(text);
    }
    
    // This regex matches element symbols, their subscripts, and superscripts
    const parts = text.split(/([A-Z][a-z]?)(\d*)([\+\-\d]*)/g).filter(Boolean);
    
    return parts.map((part, index) => {
      // If the part is a number and follows an element symbol (subscript)
      if (/^\d+$/.test(part) && index > 0 && /^[A-Z][a-z]?$/.test(parts[index - 1])) {
        return <sub key={index}>{part}</sub>;
      }
      // If the part starts with + or - and follows an element symbol (oxidation state)
      else if (/^[\+\-]\d*$/.test(part) && index > 0) {
        return <sup key={index}>{part}</sup>;
      }
      return part;
    });
  };

  // Format multiple integrals
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
  
  // New function to format expressions with exponents
  const formatExponents = (text: string): React.ReactNode => {
    const parts = text.split(/\^/);
    if (parts.length === 1) return text;
    
    const result: React.ReactNode[] = [parts[0]];
    
    for (let i = 1; i < parts.length; i++) {
      // Check if the exponent part is enclosed in parentheses
      let exponent = parts[i];
      let remainder = '';
      
      if (exponent.startsWith('(')) {
        // Find the closing parenthesis
        const closingIndex = exponent.indexOf(')');
        if (closingIndex !== -1) {
          remainder = exponent.substring(closingIndex + 1);
          exponent = exponent.substring(1, closingIndex);
        }
      } else {
        // No parentheses, just take the first character as exponent
        if (exponent.length > 1) {
          remainder = exponent.substring(1);
          exponent = exponent.substring(0, 1);
        }
      }
      
      result.push(<sup key={`exp-${i}`}>{exponent}</sup>);
      if (remainder) {
        result.push(remainder);
      }
    }
    
    return <span>{result}</span>;
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
