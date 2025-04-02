import React, { useState, useEffect } from "react";
import Button from "./Button";
import Display from "./Display";
import CalculusSteps from "./CalculusSteps";
import ChemistrySteps, { 
  getAllElementSymbols, 
  getElementGroups, 
  getCommonElements, 
  getElementBySymbol,
  type ElementInfo
} from "./ChemistrySteps";
import PhysicsSteps from "./PhysicsSteps";
import CanvasCalculator from "./CanvasCalculator";
import PhysicsFormulas from "./PhysicsFormulas";
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
  calculateKinematics,
  calculateDynamics,
  analyzeCircuit,
  calculateLaplace,
  type CalculusResult,
  type CalculusOperation,
  type ChemistryResult,
  type ChemistryOperation,
  type PhysicsResult,
  type PhysicsOperation
} from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorProps {
  className?: string;
}

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<string | null>(null);
  const [isNewInput, setIsNewInput] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [shiftMode, setShiftMode] = useState<boolean>(false);
  const [calculusMode, setCalculusMode] = useState<boolean>(false);
  const [calculusOperation, setCalculusOperation] = useState<'derivative' | 'integral' | 'double-integral' | 'triple-integral' | null>(null);
  const [calculusResult, setCalculusResult] = useState<CalculusResult | null>(null);
  const [variable, setVariable] = useState<'x' | 'y' | 't'>('x');
  const [chemistryMode, setChemistryMode] = useState<boolean>(false);
  const [chemistryOperation, setChemistryOperation] = useState<ChemistryOperation | null>(null);
  const [chemistryResult, setChemistryResult] = useState<ChemistryResult | null>(null);
  const [redoxMode, setRedoxMode] = useState<boolean>(false);
  const [physicsMode, setPhysicsMode] = useState<boolean>(false);
  const [physicsOperation, setPhysicsOperation] = useState<PhysicsOperation | null>(null);
  const [physicsSubMode, setPhysicsSubMode] = useState<'kinematics' | 'dynamics' | 'circuits' | 'laplace'>('kinematics');
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [canvasResult, setCanvasResult] = useState<string | null>(null);
  const [showPhysicsFormulas, setShowPhysicsFormulas] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("calculator");
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);

  const elementSymbols = getAllElementSymbols();
  const elementGroups = getElementGroups();
  const commonElements = getCommonElements();

  const handleNumberInput = (value: string) => {
    if (value === "." && displayValue.includes(".")) {
      return;
    }
    
    if (isNewInput) {
      setDisplayValue(value === "." ? "0." : value);
      setIsNewInput(false);
    } else {
      if (displayValue === "0" && value !== ".") {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
    }
  };

  const handleOperation = (operation: string) => {
    const currentValue = parseFloat(displayValue);
    
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

  const handleEquals = () => {
    if (storedValue === null || pendingOperation === null) {
      return;
    }

    const currentValue = parseFloat(displayValue);
    const result = calculate(storedValue, currentValue, pendingOperation);

    const historyItem = `${storedValue} ${pendingOperation} ${currentValue} = ${formatNumber(result)}`;
    setHistory([historyItem, ...history].slice(0, 10));

    setDisplayValue(formatNumber(result));
    setExpression(`${expression} ${displayValue} =`);
    setStoredValue(null);
    setPendingOperation(null);
    setIsNewInput(true);
  };

  const handleFunction = (funcName: string) => {
    try {
      const currentValue = parseFloat(displayValue);
      let result;

      if (funcName === "pow") {
        result = Math.pow(currentValue, 2);
      } else if (funcName === "pow_n") {
        setPendingOperation("^");
        setStoredValue(currentValue);
        setIsNewInput(true);
        return;
      } else if (funcName in scientificFunctions) {
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

  const handleCalculusOperation = (type: 'derivative' | 'integral' | 'double-integral' | 'triple-integral') => {
    try {
      setCalculusMode(true);
      setCalculusOperation(type);
      
      let result: CalculusResult;
      if (type === 'derivative') {
        result = calculateDerivative(displayValue, variable);
      } else if (type === 'integral') {
        result = calculateIntegral(displayValue, variable);
      } else if (type === 'double-integral') {
        const firstResult = calculateIntegral(displayValue, variable);
        result = calculateIntegral(firstResult.result, variable === 'x' ? 'y' : 'x');
        result.steps = [
          ...firstResult.steps.map(step => ({
            ...step,
            description: `First integration (w.r.t. ${variable}): ${step.description}`
          })),
          ...result.steps.map(step => ({
            ...step,
            description: `Second integration (w.r.t. ${variable === 'x' ? 'y' : 'x'}): ${step.description}`
          }))
        ];
      } else if (type === 'triple-integral') {
        const firstResult = calculateIntegral(displayValue, variable);
        const secondVar = variable === 'x' ? 'y' : (variable === 'y' ? 'z' : 'x');
        const secondResult = calculateIntegral(firstResult.result, secondVar);
        const thirdVar = secondVar === 'x' ? 'y' : (secondVar === 'y' ? 'z' : 'x');
        result = calculateIntegral(secondResult.result, thirdVar);
        result.steps = [
          ...firstResult.steps.map(step => ({
            ...step,
            description: `First integration (w.r.t. ${variable}): ${step.description}`
          })),
          ...secondResult.steps.map(step => ({
            ...step,
            description: `Second integration (w.r.t. ${secondVar}): ${step.description}`
          })),
          ...result.steps.map(step => ({
            ...step,
            description: `Third integration (w.r.t. ${thirdVar}): ${step.description}`
          }))
        ];
      } else {
        throw new Error("Unknown calculus operation");
      }
      
      setCalculusResult(result);
      
      let operationSymbol = '';
      switch (type) {
        case 'derivative': operationSymbol = 'd/dx'; break;
        case 'integral': operationSymbol = '∫'; break;
        case 'double-integral': operationSymbol = '∫∫'; break;
        case 'triple-integral': operationSymbol = '∫∫∫'; break;
      }
      
      const historyItem = `${operationSymbol}(${displayValue}) = ${result.result}`;
      setHistory([historyItem, ...history].slice(0, 10));
      
    } catch (error) {
      toast.error("Calculus error: " + (error instanceof Error ? error.message : "Unknown error"));
      setCalculusResult(null);
    }
  };

  const handleChemistryOperation = (type: ChemistryOperation) => {
    try {
      setChemistryMode(true);
      setChemistryOperation(type);
      
      let result: ChemistryResult;
      if (type === 'balance') {
        result = balanceChemicalEquation(displayValue);
      } else {
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
      
      const historyItem = `${type === 'balance' ? 'Balance' : 'Stoichiometry'}: ${displayValue} = ${result.result}`;
      setHistory([historyItem, ...history].slice(0, 10));
      
    } catch (error) {
      toast.error("Chemistry error: " + (error instanceof Error ? error.message : "Unknown error"));
      setChemistryResult(null);
    }
  };

  const handlePhysicsOperation = (type: PhysicsOperation) => {
    try {
      setPhysicsMode(true);
      setPhysicsOperation(type);
      
      let result: PhysicsResult;
      
      if (type === 'kinematics') {
        const kinematicsType = physicsSubMode === 'kinematics' ? 
          'distance' : 'velocity';
        result = calculateKinematics(displayValue, kinematicsType);
      } 
      else if (type === 'dynamics') {
        const dynamicsType = physicsSubMode === 'dynamics' ? 
          'force' : 'energy';
        result = calculateDynamics(displayValue, dynamicsType);
      }
      else if (type === 'circuits') {
        result = analyzeCircuit(displayValue);
      }
      else if (type === 'laplace') {
        result = calculateLaplace(displayValue);
      }
      else {
        throw new Error("Unknown physics operation");
      }
      
      setPhysicsResult(result);
      
      const historyItem = `Physics (${type}): ${displayValue} = ${result.result}`;
      setHistory([historyItem, ...history].slice(0, 10));
      
    } catch (error) {
      toast.error("Physics error: " + (error instanceof Error ? error.message : "Unknown error"));
      setPhysicsResult(null);
    }
  };

  const toggleCalculusMode = () => {
    setCalculusMode(!calculusMode);
    setChemistryMode(false);
    setPhysicsMode(false);
    setShowPhysicsFormulas(false);
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
    setPhysicsMode(false);
    setShowPhysicsFormulas(false);
    if (!chemistryMode) {
      toast.info("Enter a chemical equation like 'H2 + O2 → H2O'");
    } else {
      setChemistryResult(null);
      setChemistryOperation(null);
    }
  };

  const togglePhysicsMode = () => {
    setPhysicsMode(!physicsMode);
    setCalculusMode(false);
    setChemistryMode(false);
    
    if (!physicsMode) {
      toast.info("Enter physics parameters separated by | symbol");
      setShowPhysicsFormulas(true);
      setActiveTab("formulas");
    } else {
      setPhysicsResult(null);
      setPhysicsOperation(null);
      setShowPhysicsFormulas(false);
    }
  };

  const togglePhysicsSubMode = () => {
    setPhysicsSubMode(prev => {
      if (prev === 'kinematics') return 'dynamics';
      if (prev === 'dynamics') return 'circuits';
      if (prev === 'circuits') return 'laplace';
      return 'kinematics';
    });
    
    toast.info(`Physics mode set to ${physicsSubMode}`);
    setPhysicsResult(null);
    setPhysicsOperation(null);
  };

  const handlePhysicsFormulas = () => {
    setShowPhysicsFormulas(!showPhysicsFormulas);
    if (!showPhysicsFormulas) {
      setActiveTab("calculator");
    } else {
      setActiveTab("formulas");
    }
  };

  const handleInsertFormula = (formula: string) => {
    setDisplayValue(formula);
    setIsNewInput(true);
    setActiveTab("calculator");
  };

  const toggleShiftMode = () => {
    setShiftMode(!shiftMode);
  };

  const handleMemory = (operation: string) => {
    const currentValue = parseFloat(displayValue);
    
    switch (operation) {
      case "MC": setMemory(0); toast.info("Memory cleared"); break;
      case "MR": setDisplayValue(formatNumber(memory)); setIsNewInput(true); break;
      case "M+": setMemory(memory + currentValue); toast.info("Added to memory"); setIsNewInput(true); break;
      case "M-": setMemory(memory - currentValue); toast.info("Subtracted from memory"); setIsNewInput(true); break;
      case "MS": setMemory(currentValue); toast.info("Stored in memory"); setIsNewInput(true); break;
    }
  };

  const handlePlusMinus = () => {
    if (displayValue !== "0") {
      setDisplayValue(
        displayValue.charAt(0) === "-" 
          ? displayValue.substring(1) 
          : "-" + displayValue
      );
    }
  };

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
    setPhysicsResult(null);
    setPhysicsOperation(null);
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setIsNewInput(true);
  };

  const handleBackspace = () => {
    if (!isNewInput && displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
      setIsNewInput(true);
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(displayValue);
    
    if (storedValue !== null) {
      const percentValue = (storedValue * currentValue) / 100;
      setDisplayValue(formatNumber(percentValue));
    } else {
      setDisplayValue(formatNumber(currentValue / 100));
    }
  };

  const handleVariableInput = (variable: string) => {
    if (isNewInput) {
      setDisplayValue(variable);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue + variable);
    }
  };

  const toggleVariable = () => {
    setVariable(prev => {
      if (prev === 'x') return 'y';
      if (prev === 'y') return 't';
      return 'x';
    });
    toast.info(`Variable set to ${variable}`);
  };

  const handleChemicalInput = (symbol: string) => {
    if (isNewInput) {
      setDisplayValue(symbol);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue + symbol);
    }
  };

  const handleSubscriptInput = (num: number) => {
    if (isNewInput) {
      setDisplayValue(num.toString());
      setIsNewInput(false);
    } else {
      const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
      setDisplayValue(displayValue + subscripts[num]);
    }
  };

  const handleSuperscriptInput = (symbol: string) => {
    if (isNewInput) {
      setDisplayValue(symbol);
      setIsNewInput(false);
    } else {
      const superscriptMap: Record<string, string> = {
        '+': '⁺',
        '-': '⁻',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '0': '⁰'
      };
      setDisplayValue(displayValue + (superscriptMap[symbol] || symbol));
    }
  };

  const handlePhysicsInput = (symbol: string) => {
    if (isNewInput) {
      setDisplayValue(symbol);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue + symbol);
    }
  };

  const handleExponent = (base: number, exponent: number) => {
    try {
      const result = Math.pow(base, exponent);
      setDisplayValue(formatNumber(result));
      setExpression(`${base}^${exponent}`);
      setIsNewInput(true);
    } catch (error) {
      toast.error("Math error");
      clearDisplay();
    }
  };

  const handleRedoxNotation = (type: string) => {
    if (type === 'e-') {
      handleChemicalInput('e⁻');
    } else if (type === 'oxidation') {
      toggleRedoxMode();
    } else if (type.startsWith('oxidation-')) {
      const number = type.split('-')[1];
      handleSuperscriptInput('+' + number);
    } else if (type.startsWith('reduction-')) {
      const number = type.split('-')[1];
      handleSuperscriptInput('-' + number);
    }
  };

  const toggleRedoxMode = () => {
    setRedoxMode(!redoxMode);
    if (!redoxMode) {
      toast.info("Redox mode activated - select oxidation states");
    }
  };

  const toggleCanvasMode = () => {
    setShowCanvas(!showCanvas);
  };

  const handleCanvasCalculation = (result: string) => {
    setCanvasResult(result);
    
    setHistory([result, ...history].slice(0, 10));
  };

  const handleExponentInput = () => {
    if (!isNewInput) {
      setDisplayValue(displayValue + "^");
    } else {
      setDisplayValue("^");
      setIsNewInput(false);
    }
  };

  const handleElementSelect = (symbol: string) => {
    handleChemicalInput(symbol);
    const elementInfo = getElementBySymbol(symbol);
    if (elementInfo) {
      setSelectedElement(elementInfo);
    } else {
      if (symbol.includes('2') || symbol.includes('3') || symbol.includes('4')) {
        setSelectedElement(null);
      } else {
        toast.info(`No detailed information available for ${symbol}`);
        setSelectedElement(null);
      }
    }
  };

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
      calculusMode || chemistryMode || showCanvas || physicsMode ? "w-full max-w-5xl" : "w-full max-w-md", 
      "mx-auto animate-fade-in transition-all",
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
      
      {physicsResult && physicsOperation && (
        <PhysicsSteps 
          result={physicsResult} 
          operation={physicsOperation} 
        />
      )}
      
      {showCanvas && (
        <CanvasCalculator 
          onCalculation={handleCanvasCalculation}
          className="mt-4" 
        />
      )}
      
      {(physicsMode || showPhysicsFormulas) && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="formulas">Physics Formulas</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator">
            {/* Calculator buttons will be rendered here */}
          </TabsContent>
          <TabsContent value="formulas" className="border rounded-md p-2">
            <PhysicsFormulas 
              onInsertFormula={handleInsertFormula}
            />
          </TabsContent>
        </Tabs>
      )}
      
      {chemistryMode && !redoxMode && (
        <div className="mt-4 mb-4 p-3 bg-muted/30 rounded-lg">
          <Tabs defaultValue="periodic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
              <TabsTrigger value="groups">Element Groups</TabsTrigger>
              <TabsTrigger value="info">Element Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="periodic" className="mt-2">
              <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto p-1">
                {elementSymbols.map((element) => (
                  <button
                    key={element}
                    onClick={() => handleElementSelect(element)}
                    className="bg-calculator-button-number text-foreground hover:bg-opacity-80 rounded-md p-1 text-xs"
                  >
                    {element}
                  </button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="mt-2">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {elementGroups.map((group, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="text-xs text-muted-foreground">{group.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {group.elements.map((element) => (
                        <button
                          key={element}
                          onClick={() => handleElementSelect(element)}
                          className="bg-calculator-button-number text-foreground hover:bg-opacity-80 rounded-md p-1 text-xs"
                        >
                          {element}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="mt-2">
              {selectedElement ? (
                <Card className="border-primary/20">
                  <CardHeader className="py-2 px-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{selectedElement.symbol} - {selectedElement.name}</span>
                      <span className="text-xs text-muted-foreground">#{selectedElement.atomicNumber}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-muted-foreground">Atomic Mass:</span> {selectedElement.atomicMass}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span> {selectedElement.category}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Group:</span> {selectedElement.group}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Period:</span> {selectedElement.period}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Valence e⁻:</span> {selectedElement.valenceElectrons}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Configuration:</span> {selectedElement.electronConfiguration}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">Description:</span>
                      <p className="text-xs">{selectedElement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  Click an element to view detailed information
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {activeTab === "calculator" || (!physicsMode && !showPhysicsFormulas) ? (
        <div className={cn(
          "grid gap-3 mt-4",
          calculusMode || chemistryMode || redoxMode ? "grid-cols-10" : "grid-cols-4"
        )}>
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
          
          <Button 
            value={physicsMode ? "Basic" : "Physics"} 
            onClick={togglePhysicsMode} 
            variant={physicsMode ? "equal" : "function"} 
          />
          
          <Button 
            value={showCanvas ? "Hide Canvas" : "Canvas"} 
            onClick={toggleCanvasMode} 
            variant={showCanvas ? "equal" : "function"} 
          />
          
          <Button value="C" onClick={clearAll} variant="function" />
          
          {physicsMode ? (
            <>
              <Button value="⌫" onClick={handleBackspace} variant="function" />
              <Button 
                value={physicsSubMode === 'kinematics' ? "Kinematics" : 
                       physicsSubMode === 'dynamics' ? "Dynamics" : 
                       physicsSubMode === 'circuits' ? "Circuits" : "Laplace"} 
                onClick={togglePhysicsSubMode} 
                variant="function" 
                wide 
              />
              <Button value="|" onClick={() => handlePhysicsInput('|')} variant="operator" />

              {physicsSubMode === 'kinematics' ? (
                <>
                  <Button value="Distance" onClick={() => handlePhysicsOperation('kinematics')} variant="function" />
                  <Button value="Velocity" onClick={() => handlePhysicsOperation('kinematics')} variant="function" />
                  <Button value="Accel." onClick={() => handlePhysicsOperation('kinematics')} variant="function" />
                  <Button value="Time" onClick={() => handlePhysicsOperation('kinematics')} variant="function" />

                  <Button value="u" onClick={() => handlePhysicsInput('u')} variant="number" />
                  <Button value="v" onClick={() => handlePhysicsInput('v')} variant="number" />
                  <Button value="a" onClick={() => handlePhysicsInput('a')} variant="number" />
                  <Button value="t" onClick={() => handlePhysicsInput('t')} variant="number" />

                  <Button value="s" onClick={() => handlePhysicsInput('s')} variant="number" />
                  <Button value="x" onClick={() => handlePhysicsInput('x')} variant="number" />
                </>
              ) : physicsSubMode === 'dynamics' ? (
                <>
                  <Button value="Force" onClick={() => handlePhysicsOperation('dynamics')} variant="function" />
                  <Button value="Energy" onClick={() => handlePhysicsOperation('dynamics')} variant="function" />
                  <Button value="Momentum" onClick={() => handlePhysicsOperation('dynamics')} variant="function" />
                  <Button value="Mass" onClick={() => handlePhysicsInput('mass')} variant="number" />

                  <Button value="KE" onClick={() => handlePhysicsInput('kinetic')} variant="number" />
                  <Button value="PE" onClick={() => handlePhysicsInput('potential')} variant="number" />
                  <Button value="ME" onClick={() => handlePhysicsInput('mechanical')} variant="number" />
                  <Button value="g" onClick={() => handlePhysicsInput('9.8')} variant="number" />
                </>
              ) : physicsSubMode === 'circuits' ? (
                <>
                  <Button value="Ohm's Law" onClick={() => handlePhysicsOperation('circuits')} variant="function" />
                  <Button value="Series" onClick={() => handlePhysicsOperation('circuits')} variant="function" />
                  <Button value="Parallel" onClick={() => handlePhysicsOperation('circuits')} variant="function" />
                  <Button value="Kirchhoff" onClick={() => handlePhysicsOperation('circuits')} variant="function" />

                  <Button value="V" onClick={() => handlePhysicsInput('V')} variant="number" />
                  <Button value="I" onClick={() => handlePhysicsInput('I')} variant="number" />
                  <Button value="R" onClick={() => handlePhysicsInput('R')} variant="number" />
                  <Button value="ohm" onClick={() => handlePhysicsInput('ohm')} variant="number" />

                  <Button value="series" onClick={() => handlePhysicsInput('series')} variant="number" />
                  <Button value="parallel" onClick={() => handlePhysicsInput('parallel')} variant="number" />
                  <Button value="k-loop" onClick={() => handlePhysicsInput('kirchhoff-loop')} variant="number" />
                  <Button value="k-node" onClick={() => handlePhysicsInput('kirchhoff-node')} variant="number" />
                </>
              ) : (
                <>
                  <Button value="Forward" onClick={() => handlePhysicsOperation('laplace')} variant="function" />
                  <Button value="Inverse" onClick={() => handlePhysicsOperation('laplace')} variant="function" />
                  <Button value="Circuit" onClick={() => handlePhysicsOperation('laplace')} variant="function" />
                  <Button value="s" onClick={() => handlePhysicsInput('s')} variant="number" />

                  <Button value="forward" onClick={() => handlePhysicsInput('forward')} variant="number" />
                  <Button value="inverse" onClick={() => handlePhysicsInput('inverse')} variant="number" />
                  <Button value="circuit" onClick={() => handlePhysicsInput('circuit')} variant="number" />
                  <Button value="rc" onClick={() => handlePhysicsInput('rc')} variant="number" />

                  <Button value="rl" onClick={() => handlePhysicsInput('rl')} variant="number" />
                  <Button value="rlc" onClick={() => handlePhysicsInput('rlc')} variant="number" />
                  <Button value="e^" onClick={() => handlePhysicsInput('e^')} variant="number" />
                  <Button value="sin(" onClick={() => handlePhysicsInput('sin(')} variant="number" />
                </>
              )}

              <Button value="7" onClick={() => handleNumberInput('7')} />
              <Button value="8" onClick={() => handleNumberInput('8')} />
              <Button value="9" onClick={() => handleNumberInput('9')} />
              <Button value="/" onClick={() => handlePhysicsInput('/')} variant="operator" />

              <Button value="4" onClick={() => handleNumberInput('4')} />
              <Button value="5" onClick={() => handleNumberInput('5')} />
              <Button value="6" onClick={() => handleNumberInput('6')} />
              <Button value="*" onClick={() => handlePhysicsInput('*')} variant="operator" />

              <Button value="1" onClick={() => handleNumberInput('1')} />
              <Button value="2" onClick={() => handleNumberInput('2')} />
              <Button value="3" onClick={() => handleNumberInput('3')} />
              <Button value="-" onClick={() => handlePhysicsInput('-')} variant="operator" />

              <Button value="0" onClick={() => handleNumberInput('0')} />
              <Button value="." onClick={() => handleNumberInput('.')} />
              <Button value="(" onClick={() => handlePhysicsInput('(')} variant="function" />
              <Button value=")" onClick={() => handlePhysicsInput(')')} variant="function" />
              <Button value="x²" onClick={() => handleFunction('pow')} variant="function" />
            </>
          ) : chemistryMode ? (
            redoxMode ? (
              <>
                <Button value="⌫" onClick={handleBackspace} variant="function" />
                <Button value="e⁻" onClick={() => handleRedoxNotation('e-')} variant="redox" />
                <Button value="Back" onClick={toggleRedoxMode} variant="function" />
                <Button value="→" onClick={() => handleChemicalInput('→')} variant="operator" />
                <Button value="+" onClick={() => handleChemicalInput('+')} variant="operator" />
                <Button value="|" onClick={() => handleChemicalInput('|')} variant="operator" />
                
                <Button value="+1" onClick={() => handleRedoxNotation('oxidation-1')} variant="redox" />
                <Button value="+2" onClick={() => handleRedoxNotation('oxidation-2')} variant="redox" />
                <Button value="+3" onClick={() => handleRedoxNotation('oxidation-3')} variant="redox" />
                <Button value="+4" onClick={() => handleRedoxNotation('oxidation-4')} variant="redox" />
                <Button value="+5" onClick={() => handleRedoxNotation('oxidation-5')} variant="redox" />
                <Button value="+6" onClick={() => handleRedoxNotation('oxidation-6')} variant="redox" />
                <Button value="+7" onClick={() => handleRedoxNotation('oxidation-7')} variant="redox" />
                <Button value="+8" onClick={() => handleRedoxNotation('oxidation-8')} variant="redox" />

                <Button value="-1" onClick={() => handleRedoxNotation('reduction-1')} variant="redox" />
                <Button value="-2" onClick={() => handleRedoxNotation('reduction-2')} variant="redox" />
                <Button value="-3" onClick={() => handleRedoxNotation('reduction-3')} variant="redox" />
                <Button value="-4" onClick={() => handleRedoxNotation('reduction-4')} variant="redox" />
                
                {commonElements.slice(0, 20).map(element => (
                  <Button 
                    key={element} 
                    value={element} 
                    onClick={() => handleChemicalInput(element)} 
                    variant="number" 
                  />
                ))}

                {[1, 2, 3, 4].map(num => (
                  <Button 
                    key={`sub-${num}`} 
                    value={`${num}`} 
                    onClick={() => handleSubscriptInput(num)} 
                    variant="function" 
                  />
                ))}
              </>
            ) : (
              <>
                <Button value="⌫" onClick={handleBackspace} variant="function" />
                <Button value="CE" onClick={clearDisplay} variant="function" />
                <Button value="%" onClick={handlePercentage} variant="function" />
                <Button value="^" onClick={handleExponentInput} variant="operator" />
                
                <Button value="(" onClick={() => handleChemicalInput('(')} variant="function" />
                <Button value=")" onClick={() => handleChemicalInput(')')} variant="function" />
                <Button value="→" onClick={() => handleChemicalInput('→')} variant="operator" />
                <Button value="⇌" onClick={() => handleChemicalInput('⇌')} variant="operator" />
                
                <Button value="+" onClick={() => handleChemicalInput('+')} variant="operator" />
                <Button value="=" onClick={handleEquals} variant="equal" />
                <Button value="|" onClick={() => handleChemicalInput('|')} variant="operator" />
                <Button value="Redox" onClick={toggleRedoxMode} variant="redox" />
                
                {commonElements.slice(0, 20).map(element => (
                  <Button 
                    key={element} 
                    value={element} 
                    onClick={() => handleChemicalInput(element)} 
                    variant="number" 
                  />
                ))}
                
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <Button 
                    key={`sub-${num}`} 
                    value={`${num}`} 
                    onClick={() => handleSubscriptInput(num)} 
                    variant="function" 
                  />
                ))}
                
                <Button value="Balance" onClick={() => handleChemistryOperation('balance')} variant="equal" wide />
                <Button value="Stoich." onClick={() => handleChemistryOperation('stoichiometry')} variant="equal" wide />
              </>
            )
          ) : calculusMode ? (
            <>
              <Button value="⌫" onClick={handleBackspace} variant="function" />
              <Button value="CE" onClick={clearDisplay} variant="function" />
              <Button value="%" onClick={handlePercentage} variant="function" />
              <Button value="^" onClick={handleExponentInput} variant="operator" />
              
              <Button value="var" onClick={toggleVariable} variant="function" />
              <Button value="(" onClick={() => handleVariableInput('(')} variant="function" />
              <Button value=")" onClick={() => handleVariableInput(')')} variant="function" />
              <Button value="√" onClick={() => handleFunction('sqrt')} variant="function" />
              
              <Button value="x" onClick={() => handleVariableInput('x')} variant="number" />
              <Button value="y" onClick={() => handleVariableInput('y')} variant="number" />
              <Button value="sin" onClick={() => handleVariableInput('sin(')} variant="function" />
              <Button value="cos" onClick={() => handleVariableInput('cos(')} variant="function" />
              
              <Button value="7" onClick={() => handleNumberInput('7')} />
              <Button value="8" onClick={() => handleNumberInput('8')} />
              <Button value="9" onClick={() => handleNumberInput('9')} />
              <Button value="÷" onClick={() => handleOperation(OPERATIONS.DIVIDE)} variant="operator" />
              
              <Button value="4" onClick={() => handleNumberInput('4')} />
              <Button value="5" onClick={() => handleNumberInput('5')} />
              <Button value="6" onClick={() => handleNumberInput('6')} />
              <Button value="×" onClick={() => handleOperation(OPERATIONS.MULTIPLY)} variant="operator" />
              
              <Button value="1" onClick={() => handleNumberInput('1')} />
              <Button value="2" onClick={() => handleNumberInput('2')} />
              <Button value="3" onClick={() => handleNumberInput('3')} />
              <Button value="-" onClick={() => handleOperation(OPERATIONS.SUBTRACT)} variant="operator" />
              
              <Button value="0" onClick={() => handleNumberInput('0')} />
              <Button value="." onClick={() => handleNumberInput('.')} />
              <Button value="=" onClick={handleEquals} variant="equal" />
              <Button value="+" onClick={() => handleOperation(OPERATIONS.ADD)} variant="operator" />
              
              <Button value="x²" onClick={() => handleFunction('pow')} variant="function" />
              <Button value="x³" onClick={() => handleVariableInput('x^3')} variant="function" />
              <Button value="e^x" onClick={() => handleVariableInput('e^')} variant="function" />
              <Button value="ln" onClick={() => handleVariableInput('ln(')} variant="function" />
              
              <Button value="d/dx" onClick={() => handleCalculusOperation('derivative')} variant="equal" />
              <Button value="∫" onClick={() => handleCalculusOperation('integral')} variant="equal" />
              <Button value="∫∫" onClick={() => handleCalculusOperation('double-integral')} variant="equal" />
              <Button value="∫∫∫" onClick={() => handleCalculusOperation('triple-integral')} variant="equal" />
            </>
          ) : (
            <>
              <Button value="⌫" onClick={handleBackspace} variant="function" />
              <Button value="CE" onClick={clearDisplay} variant="function" />
              <Button value="%" onClick={handlePercentage} variant="function" />
              
              <Button value="MC" onClick={() => handleMemory("MC")} variant="memory" />
              <Button value="MR" onClick={() => handleMemory("MR")} variant="memory" />
              <Button value="M+" onClick={() => handleMemory("M+")} variant="memory" />
              <Button value="M-" onClick={() => handleMemory("M-")} variant="memory" />
              
              <Button value="7" onClick={() => handleNumberInput('7')} />
              <Button value="8" onClick={() => handleNumberInput('8')} />
              <Button value="9" onClick={() => handleNumberInput('9')} />
              <Button value="÷" onClick={() => handleOperation(OPERATIONS.DIVIDE)} variant="operator" />
              
              <Button value="4" onClick={() => handleNumberInput('4')} />
              <Button value="5" onClick={() => handleNumberInput('5')} />
              <Button value="6" onClick={() => handleNumberInput('6')} />
              <Button value="×" onClick={() => handleOperation(OPERATIONS.MULTIPLY)} variant="operator" />
              
              <Button value="1" onClick={() => handleNumberInput('1')} />
              <Button value="2" onClick={() => handleNumberInput('2')} />
              <Button value="3" onClick={() => handleNumberInput('3')} />
              <Button value="-" onClick={() => handleOperation(OPERATIONS.SUBTRACT)} variant="operator" />
              
              <Button value="0" onClick={() => handleNumberInput('0')} />
              <Button value="." onClick={() => handleNumberInput('.')} />
              <Button value="=" onClick={handleEquals} variant="equal" />
              <Button value="+" onClick={() => handleOperation(OPERATIONS.ADD)} variant="operator" />
              
              {shiftMode ? (
                <>
                  <Button value="x^n" onClick={() => handleFunction('pow_n')} variant="function" />
                  <Button value="√" onClick={() => handleFunction('sqrt')} variant="function" />
                  <Button value="log" onClick={() => handleFunction('log10')} variant="function" />
                  <Button value="ln" onClick={() => handleFunction('ln')} variant="function" />
                </>
              ) : (
                <>
                  <Button value="x²" onClick={() => handleFunction('pow')} variant="function" />
                  <Button value="1/x" onClick={() => handleFunction('reciprocal')} variant="function" />
                  <Button value="±" onClick={handlePlusMinus} variant="function" />
                  <Button value="Shift" onClick={toggleShiftMode} variant="function" />
                </>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Calculator;
