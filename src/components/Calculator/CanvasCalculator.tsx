import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { create, all } from "mathjs";

const math = create(all);

interface CanvasCalculatorProps {
  onCalculation: (result: string) => void;
  className?: string;
}

const CanvasCalculator: React.FC<CanvasCalculatorProps> = ({ 
  onCalculation,
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState<Array<{start: {x: number, y: number}, points: Array<{x: number, y: number}>}>>([]);
  const [currentStroke, setCurrentStroke] = useState<{start: {x: number, y: number}, points: Array<{x: number, y: number}>} | null>(null);
  const [userInput, setUserInput] = useState("");
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.putImageData(imageData, 0, 0);
      
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000";
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    
    setLastX(x);
    setLastY(y);
    
    setCurrentStroke({
      start: {x, y},
      points: []
    });
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
    
    if (currentStroke) {
      setCurrentStroke({
        ...currentStroke,
        points: [...currentStroke.points, {x, y}]
      });
    }
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
    
    if (currentStroke) {
      setStrokeHistory(prev => [...prev, currentStroke]);
      setCurrentStroke(null);
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setEquation("");
    setResult("");
    setStrokeHistory([]);
    setUserInput("");
  };
  
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  
  const handleMathInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processUserEquation();
    }
  };
  
  const processUserEquation = () => {
    if (!userInput.trim()) {
      toast.error("Please enter a mathematical expression");
      return;
    }
    
    setRecognizing(true);
    setEquation(userInput);
    
    try {
      const result = math.evaluate(userInput);
      const calculatedResult = result.toString();
      
      setResult(calculatedResult);
      onCalculation(`${userInput} = ${calculatedResult}`);
      toast.success("Calculation completed");
    } catch (error) {
      console.error("Calculation error:", error);
      setResult("Error");
      toast.error("Could not calculate. Check your expression syntax.");
    } finally {
      setRecognizing(false);
    }
  };
  
  const recognizeAndCalculate = () => {
    setRecognizing(true);
    
    if (strokeHistory.length > 0 && !userInput) {
      toast.info("Please type in the equation you wrote");
      setRecognizing(false);
      return;
    }
    
    if (userInput) {
      processUserEquation();
    } else {
      toast.error("Please write or type an equation first");
      setRecognizing(false);
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col space-y-4",
      className
    )}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Handwritten Calculator</h3>
        <div className="flex space-x-2">
          <button
            onClick={clearCanvas}
            className="px-3 py-1 bg-calculator-button-function text-primary rounded-md hover:bg-opacity-80"
          >
            Clear
          </button>
          <button
            onClick={recognizeAndCalculate}
            disabled={recognizing}
            className={cn(
              "px-3 py-1 bg-calculator-button-equal text-white rounded-md hover:bg-opacity-90",
              recognizing ? "pulse-animation" : ""
            )}
          >
            {recognizing ? "Calculating..." : "Calculate"}
          </button>
        </div>
      </div>
      
      <div className="relative w-full h-[250px] border rounded-lg overflow-hidden canvas-container">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            onKeyDown={handleMathInput}
            placeholder="Type your equation here (e.g., 2+2)"
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          Write your equation on the canvas, then type it in the input box and press Enter or click Calculate.
        </div>
      </div>
      
      {(equation || result) && (
        <div className="flex flex-col space-y-1 rounded-lg bg-calculator-display p-3">
          {equation && (
            <div className="text-sm text-muted-foreground">
              Equation: {equation}
            </div>
          )}
          {result && (
            <div className="text-xl font-medium">
              Result: {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CanvasCalculator;
