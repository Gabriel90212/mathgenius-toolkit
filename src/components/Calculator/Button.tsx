
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = 
  | "number" 
  | "operator" 
  | "function" 
  | "equal" 
  | "memory";

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: ButtonVariant;
  className?: string;
  wide?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  variant = "number",
  className,
  wide = false,
  disabled = false,
}) => {
  const baseClasses = "flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none active:animate-button-press";
  
  const variantClasses = {
    number: "bg-calculator-button-number text-foreground hover:bg-opacity-80",
    operator: "bg-calculator-button-operator text-primary hover:bg-opacity-80 font-semibold",
    function: "bg-calculator-button-function text-primary hover:bg-opacity-80",
    equal: "bg-calculator-button-equal text-white hover:bg-opacity-90 font-semibold",
    memory: "bg-calculator-button-memory text-primary hover:bg-opacity-80",
  };

  const handleClick = () => {
    if (!disabled) {
      onClick(value);
    }
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        wide ? "col-span-2" : "",
        disabled && "opacity-50 cursor-not-allowed",
        "h-14 md:h-16 shadow-sm",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
