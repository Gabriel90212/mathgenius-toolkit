
import React from "react";
import { cn } from "@/lib/utils";

interface DisplayProps {
  value: string;
  expression: string;
  className?: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression, className }) => {
  // Check if the display value contains variables (for calculus mode)
  const containsVariables = /[a-zA-Z]/.test(value);
  
  return (
    <div className={cn(
      "bg-calculator-display rounded-2xl p-4 mb-4 display-glass",
      "flex flex-col items-end justify-end",
      "min-h-[100px] overflow-hidden",
      className
    )}>
      <div className="text-muted-foreground text-right mb-1 h-6 overflow-x-auto whitespace-nowrap text-sm">
        {expression}
      </div>
      <div className={cn(
        "text-right text-3xl md:text-4xl font-light tracking-tighter overflow-x-auto whitespace-nowrap w-full animate-slide-up",
        containsVariables && "font-mono"
      )}>
        {value || "0"}
      </div>
    </div>
  );
};

export default Display;
