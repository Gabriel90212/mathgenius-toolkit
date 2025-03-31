
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  
  // Setup canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match the display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial canvas state
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";
    
    // Clear canvas with white background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Save current drawing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore drawing
      ctx.putImageData(imageData, 0, 0);
      
      // Reset canvas properties
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000";
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates based on event type
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setLastX(x);
    setLastY(y);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates based on event type
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      
      // Prevent scrolling when drawing
      e.preventDefault();
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setEquation("");
    setResult("");
  };
  
  // Recognize and calculate
  const recognizeAndCalculate = () => {
    setRecognizing(true);
    
    // Simulate recognition of handwritten mathematical expression
    // In a real application, you would use a handwriting recognition API
    setTimeout(() => {
      // For demo, we'll use a simple example
      const mockRecognizedEquation = "2+2";
      setEquation(mockRecognizedEquation);
      
      try {
        // Calculate result
        const calculatedResult = eval(mockRecognizedEquation).toString();
        setResult(calculatedResult);
        
        // Pass result to parent component
        onCalculation(`${mockRecognizedEquation} = ${calculatedResult}`);
        
        toast.success("Calculation completed");
      } catch (error) {
        setResult("Error");
        toast.error("Could not calculate the expression");
      }
      
      setRecognizing(false);
    }, 1500);
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
            {recognizing ? "Recognizing..." : "Calculate"}
          </button>
        </div>
      </div>
      
      <div className="relative w-full h-[200px] border rounded-lg overflow-hidden canvas-container">
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
      
      {(equation || result) && (
        <div className="flex flex-col space-y-1 rounded-lg bg-calculator-display p-3">
          {equation && (
            <div className="text-sm text-muted-foreground">
              Recognized: {equation}
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
