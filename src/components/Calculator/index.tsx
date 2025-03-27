import React, { useState, useEffect } from "react";
import Button from "./Button";
import Display from "./Display";
import CalculusSteps from "./CalculusSteps";
import ChemistrySteps from "./ChemistrySteps";
import { 
  OPERATIONS, 
  formatNumber, 
  calculate, 
  scientificFunctions, 
  parseExpression, 
  calculateDerivative, 
  calculateIntegral,
  balanceChemicalEquation,
  calculateStoichiometry,
  type CalculusResult,
  type CalculusOperation,
  type ChemistryResult,
  type ChemistryOperation
} from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CalculatorProps {
  className?: string;
}

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  // State for display value, expression history, and memory
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<string | null>(null);
  const [isNewInput, setIsNewInput] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [shiftMode, setShiftMode] = useState<boolean>(false);
  
  // State for calculus operations
  const [calculusMode, setCalculusMode] = useState<boolean>(false);
  const [calculusOperation, setCalculusOperation] = useState<CalculusOperation | null>(null);
  const [calculusResult, setCalculusResult] = useState<CalculusResult | null>(null);
  const [variable, setVariable] = useState<'x' | 'y' | 't'>('x');
  
  // State for chemistry operations
  const [chemistryMode, setChemistryMode] = useState<boolean>(false);
  const [chemistryOperation, setChemistryOperation] = useState<ChemistryOperation | null>(null);
  const [chemistryResult, setChemistryResult] = useState<ChemistryResult | null>(null);
  const [knownAmount, setKnownAmount] = useState<number>(1);
  const [knownCompound, setKnownCompound] = useState<string>('');
  const [targetCompound, setTargetCompound] = useState<string>('');
  
  // Handle number input
  const handleNumberInput = (value: string) => {
    if (value === "." && displayValue.includes(".")) {
      return; // Prevent multiple decimal points
    }
    
    if (isNewInput) {
      setDisplayValue(value === "." ? "0." : value);
      setIsNewInput(false);
    } else {
      // Prevent leading zeros
      if (displayValue === "0" && value !== ".") {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
    }
  };

  // Handle operations (add, subtract, multiply, etc.)
  const handleOperation = (operation: string) => {
    const currentValue = parseFloat(displayValue);
    
    // If we have a stored value and a pending operation
    if (storedValue !== null && pendingOperation !== null && !isNewInput) {
      const result = calculate(storedValue, currentValue, pendingOperation);
      setStoredValue(result);
      setDisplayValue(formatNumber(result));
      setExpression(`${expression} ${displayValue} ${operation}`);
    } else {
      setStoredValue(currentValue);
      setExpression(`${displayValue} ${operation}`);
    }
    
    setPendingOperation(operation);
    setIsNewInput(true);
  };

  // Handle equals operation
  const handleEquals = () => {
    if (storedValue === null || pendingOperation === null) {
      return;
    }

    const currentValue = parseFloat(displayValue);
    const result = calculate(storedValue, currentValue, pendingOperation);

    // Update history
    const historyItem = `${storedValue} ${pendingOperation} ${currentValue} = ${formatNumber(result)}`;
    setHistory([historyItem, ...history].slice(0, 10));

    setDisplayValue(formatNumber(result));
    setExpression(`${expression} ${displayValue} =`);
    setStoredValue(null);
    setPendingOperation(null);
    setIsNewInput(true);
  };

  // Handle scientific functions
  const handleFunction = (funcName: string) => {
    try {
      const currentValue = parseFloat(displayValue);
      let result;

      if (funcName in scientificFunctions) {
        // @ts-ignore
        result = scientificFunctions[funcName](currentValue);
      } else {
        throw new Error("Unknown function");
      }

      setDisplayValue(formatNumber(result));
      setExpression(`${funcName}(${displayValue})`);
      setIsNewInput(true);
    } catch (error) {
      toast.error("Math error");
      clearDisplay();
    }
  };

  // Handle chemistry operations (balancing equations, stoichiometry)
  const handleChemistryOperation = (type: ChemistryOperation) => {
    try {
      setChemistryMode(true);
      setChemistryOperation(type);
      
      // Calculate the result based on the operation type
      let result: ChemistryResult;
      if (type === 'balance') {
        result = balanceChemicalEquation(displayValue);
      } else {
        // For stoichiometry, we need additional inputs which should be in the displayValue
        // Format expected: "equation|knownAmount|knownCompound|targetCompound"
        const parts = displayValue.split('|');
        if (parts.length !== 4) {
          throw new Error("For stoichiometry, enter: equation|amount|known|target");
        }
        result = calculateStoichiometry(
          parts[0].trim(),
          parseFloat(parts[1].trim()),
          parts[2].trim(),
          parts[3].trim()
        );
      }
      
      setChemistryResult(result);
      
      // Update history
      const historyItem = `${type === 'balance' ? 'Balance' : 'Stoichiometry'}: ${displayValue} = ${result.result}`;
      setHistory([historyItem, ...history].slice(0, 10));
      
    } catch (error) {
      toast.error("Chemistry error: " + (error instanceof Error ? error.message : "Unknown error"));
      setChemistryResult(null);
    }
  };

  // Toggle calculator modes
  const toggleCalculusMode = () => {
    setCalculusMode(!calculusMode);
    setChemistryMode(false);
    if (!calculusMode) {
      toast.info("Enter an expression in terms of x");
    } else {
      setCalculusResult(null);
      setCalculusOperation(null);
    }
  };
  
  const toggleChemistryMode = () => {
    setChemistryMode(!chemistryMode);
    setCalculusMode(false);
    if (!chemistryMode) {
      toast.info("Enter a chemical equation like 'H2 + O2 → H2O'");
    } else {
      setChemistryResult(null);
      setChemistryOperation(null);
    }
  };

  // Handle shift mode (for inverse functions)
  const toggleShiftMode = () => {
    setShiftMode(!shiftMode);
  };

  // Memory operations
  const handleMemory = (operation: string) => {
    const currentValue = parseFloat(displayValue);
    
    switch (operation) {
      case "MC": // Memory Clear
        setMemory(0);
        toast.info("Memory cleared");
        break;
      case "MR": // Memory Recall
        setDisplayValue(formatNumber(memory));
        setIsNewInput(true);
        break;
      case "M+": // Memory Add
        setMemory(memory + currentValue);
        toast.info("Added to memory");
        setIsNewInput(true);
        break;
      case "M-": // Memory Subtract
        setMemory(memory - currentValue);
        toast.info("Subtracted from memory");
        setIsNewInput(true);
        break;
      case "MS": // Memory Store
        setMemory(currentValue);
        toast.info("Stored in memory");
        setIsNewInput(true);
        break;
    }
  };

  // Handle +/- (sign change)
  const handlePlusMinus = () => {
    if (displayValue !== "0") {
      setDisplayValue(
        displayValue.charAt(0) === "-" 
          ? displayValue.substring(1) 
          : "-" + displayValue
      );
    }
  };

  // Clear everything
  const clearAll = () => {
    setDisplayValue("0");
    setExpression("");
    setStoredValue(null);
    setPendingOperation(null);
    setIsNewInput(true);
    setCalculusResult(null);
    setCalculusOperation(null);
    setChemistryResult(null);
    setChemistryOperation(null);
  };

  // Clear only the display (CE)
  const clearDisplay = () => {
    setDisplayValue("0");
    setIsNewInput(true);
  };

  // Delete the last character
  const handleBackspace = () => {
    if (!isNewInput && displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
      setIsNewInput(true);
    }
  };

  // Percentage calculation
  const handlePercentage = () => {
    const currentValue = parseFloat(displayValue);
    
    if (storedValue !== null) {
      // If there's a pending operation, calculate percentage based on stored value
      const percentValue = (storedValue * currentValue) / 100;
      setDisplayValue(formatNumber(percentValue));
    } else {
      // Just convert the current value to a percentage
      setDisplayValue(formatNumber(currentValue / 100));
    }
  };

  // Add x, y, and other variable symbols for calculus mode
  const handleVariableInput = (variable: string) => {
    if (isNewInput) {
      setDisplayValue(variable);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue + variable);
    }
  };

  // Toggle between variables (x, y, t)
  const toggleVariable = () => {
    setVariable(prev => {
      if (prev === 'x') return 'y';
      if (prev === 'y') return 't';
      return 'x';
    });
    toast.info(`Variable set to ${variable}`);
  };

  // Add chemical symbols and arrows for chemistry mode
  const handleChemicalInput = (symbol: string) => {
    if (isNewInput) {
      setDisplayValue(symbol);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue + symbol);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/[0-9.]/)) {
        handleNumberInput(e.key);
      } else if (e.key === "+" || e.key === "-") {
        handleOperation(e.key);
      } else if (e.key === "*") {
        handleOperation(OPERATIONS.MULTIPLY);
      } else if (e.key === "/") {
        handleOperation(OPERATIONS.DIVIDE);
      } else if (e.key === "Enter" || e.key === "=") {
        handleEquals();
      } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
        clearAll();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "%") {
        handlePercentage();
      } else if (e.key === "x" || e.key === "y" || e.key === "t") {
        if (calculusMode) {
          handleVariableInput(e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayValue, storedValue, pendingOperation, isNewInput, calculusMode]);

  return (
    <div className={cn(
      "p-6 rounded-3xl glass-morphism calc-shadow",
      "w-full max-w-md mx-auto animate-fade-in transition-all",
      className
    )}>
      <Display 
        value={displayValue} 
        expression={parseExpression(expression)} 
      />
      
      {calculusResult && calculusOperation && (
        <CalculusSteps 
          result={calculusResult} 
          operation={calculusOperation} 
        />
      )}
      
      {chemistryResult && chemistryOperation && (
        <ChemistrySteps 
          result={chemistryResult} 
          operation={chemistryOperation} 
        />
      )}
      
      <div className="grid grid-cols-4 gap-3 mt-4">
        {/* Mode Selection Buttons */}
        <Button 
          value={chemistryMode ? "Basic" : "Chemistry"} 
          onClick={toggleChemistryMode} 
          variant={chemistryMode ? "equal" : "function"} 
        />
        
        <Button 
          value={calculusMode ? "Basic" : "Calculus"} 
          onClick={toggleCalculusMode} 
          variant={calculusMode ? "equal" : "function"} 
        />
        
        {/* Common buttons in all modes */}
        <Button value="C" onClick={clearAll} variant="function" />
        <Button value="⌫" onClick={handleBackspace} variant="function" />

        {chemistryMode ? (
          // Chemistry Mode Buttons
          <>
            {/* Chemistry operation buttons */}
            <Button value="Balance" onClick={() => handleChemistryOperation('balance')} variant="function" wide />
            <Button value="Stoichiometry" onClick={() => handleChemistryOperation('stoichiometry')} variant="function" wide />

            {/* Chemical symbols and operators */}
            <Button value="H" onClick={() => handleChemicalInput('H')} variant="number" />
            <Button value="O" onClick={() => handleChemicalInput('O')} variant="number" />
            <Button value="C" onClick={() => handleChemicalInput('C')} variant="number" />
            <Button value="N" onClick={() => handleChemicalInput('N')} variant="number" />

            <Button value="→" onClick={() => handleChemicalInput('→')} variant="operator" />
            <Button value="+" onClick={() => handleChemicalInput('+')} variant="operator" />
            <Button value="(" onClick={() => handleChemicalInput('(')} variant="function" />
            <Button value=")" onClick={() => handleChemicalInput(')')} variant="function" />

            <Button value="2" onClick={() => handleNumberInput('2')} />
            <Button value="3" onClick={() => handleNumberInput('3')} />
            <Button value="4" onClick={() => handleNumberInput('4')} />
            <Button value="|" onClick={() => handleChemicalInput('|')} variant="operator" />

            <Button value="5" onClick={() => handleNumberInput('5')} />
            <Button value="6" onClick={() => handleNumberInput('6')} />
            <Button value="7" onClick={() => handleNumberInput('7')} />
            <Button value="8" onClick={() => handleNumberInput('8')} />

            <Button value="9" onClick={() => handleNumberInput('9')} />
            <Button value="0" onClick={() => handleNumberInput('0')} />
            <Button value="1" onClick={() => handleNumberInput('1')} />
            <Button value="." onClick={() => handleNumberInput('.')} />
          </>
        ) : calculusMode ? (
          // Calculus Mode Buttons (leave existing code)
          <>
            {/* Calculus operation buttons */}
            <Button value="d/dx" onClick={() => handleCalculusOperation('derivative')} variant="function" />
            <Button value="∫dx" onClick={() => handleCalculusOperation('integral')} variant="function" />
            <Button value={variable} onClick={() => handleVariableInput(variable)} variant="number" />
            <Button value="^" onClick={() => handleVariableInput('^')} variant="operator" />

            {/* Variable symbols and common functions */}
            <Button value="(" onClick={() => handleVariableInput('(')} variant="function" />
            <Button value=")" onClick={() => handleVariableInput(')')} variant="function" />
            <Button value="sin" onClick={() => handleVariableInput('sin(')} variant="function" />
            <Button value="cos" onClick={() => handleVariableInput('cos(')} variant="function" />

            <Button value="7" onClick={handleNumberInput} />
            <Button value="8" onClick={handleNumberInput} />
            <Button value="9" onClick={handleNumberInput} />
            <Button value="+" onClick={() => handleVariableInput('+')} variant="operator" />

            <Button value="4" onClick={handleNumberInput} />
            <Button value="5" onClick={handleNumberInput} />
            <Button value="6" onClick={handleNumberInput} />
            <Button value="-" onClick={() => handleVariableInput('-')} variant="operator" />

            <Button value="1" onClick={handleNumberInput} />
            <Button value="2" onClick={handleNumberInput} />
            <Button value="3" onClick={handleNumberInput} />
            <Button value="*" onClick={() => handleVariableInput('*')} variant="operator" />

            <Button value="0" onClick={handleNumberInput} />
            <Button value="." onClick={handleNumberInput} />
            <Button value="e" onClick={() => handleVariableInput('e^')} variant="function" />
            <Button value="/" onClick={() => handleVariableInput('/')} variant="operator" />
          </>
        ) : (
          // Standard Calculator Mode
          <>
            {/* Memory and Clear Row */}
            <Button value="MR" onClick={() => handleMemory("MR")} variant="memory" />
            <Button value="M+" onClick={() => handleMemory("M+")} variant="memory" />
            <Button value="M-" onClick={() => handleMemory("M-")} variant="memory" />

            {/* Function Row */}
            <Button value={shiftMode ? "2ⁿᵈ" : "2ⁿᵈ"} onClick={toggleShiftMode} variant={shiftMode ? "equal" : "function"} />
            <Button value={shiftMode ? "10ˣ" : "log"} onClick={() => handleFunction(shiftMode ? "exp" : "log")} variant="function" />
            <Button value={shiftMode ? "eˣ" : "ln"} onClick={() => handleFunction(shiftMode ? "exp" : "ln")} variant="function" />
            <Button value="MS" onClick={() => handleMemory("MS")} variant="memory" />

            {/* Scientific Functions Row */}
            <Button value={shiftMode ? "asin" : "sin"} onClick={() => handleFunction(shiftMode ? "asin" : "sin")} variant="function" />
            <Button value={shiftMode ? "acos" : "cos"} onClick={() => handleFunction(shiftMode ? "acos" : "cos")} variant="function" />
            <Button value={shiftMode ? "atan" : "tan"} onClick={() => handleFunction(shiftMode ? "atan" : "tan")} variant="function" />
            <Button value="%" onClick={handlePercentage} variant="operator" />

            {/* Constants and Special Functions Row */}
            <Button value="π" onClick={() => handleFunction("pi")} variant="function" />
            <Button value="e" onClick={() => handleFunction("e")} variant="function" />
            <Button value="x²" onClick={() => handleFunction("pow")} variant="function" />
            <Button value="√" onClick={() => handleFunction("sqrt")} variant="function" />

            {/* Numbers and Operations */}
            <Button value="7" onClick={handleNumberInput} />
            <Button value="8" onClick={handleNumberInput} />
            <Button value="9" onClick={handleNumberInput} />
            <Button value={OPERATIONS.DIVIDE} onClick={() => handleOperation(OPERATIONS.DIVIDE)} variant="operator" />

            <Button value="4" onClick={handleNumberInput} />
            <Button value="5" onClick={handleNumberInput} />
            <Button value="6" onClick={handleNumberInput} />
            <Button value={OPERATIONS.MULTIPLY} onClick={() => handleOperation(OPERATIONS.MULTIPLY)} variant="operator" />

            <Button value="1" onClick={handleNumberInput} />
            <Button value="2" onClick={handleNumberInput} />
            <Button value="3" onClick={handleNumberInput} />
            <Button value={OPERATIONS.SUBTRACT} onClick={() => handleOperation(OPERATIONS.SUBTRACT)} variant="operator" />

            <Button value="0" onClick={handleNumberInput} />
            <Button value="." onClick={handleNumberInput} />
            <Button value="±" onClick={handlePlusMinus} variant="function" />
            <Button value={OPERATIONS.ADD} onClick={() => handleOperation(OPERATIONS.ADD)} variant="operator" />

            {/* Last Row */}
            <Button value="xʸ" onClick={() => handleOperation(OPERATIONS.POWER)} variant="function" wide />
            <Button value="=" onClick={handleEquals} variant="equal" wide />
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
