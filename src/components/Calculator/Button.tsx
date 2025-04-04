
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = 
  | "number" 
  | "operator" 
  | "function" 
  | "equal" 
  | "memory"
  | "redox"
  | "element"
  | "sum";  // Added new "sum" variant

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: ButtonVariant;
  className?: string;
  wide?: boolean;
  disabled?: boolean;
  onInfoClick?: () => void;  // Prop for element info click
  showInfoButton?: boolean;  // Prop to show info button
  small?: boolean;  // New prop for smaller buttons
}

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  variant = "number",
  className,
  wide = false,
  disabled = false,
  onInfoClick,
  showInfoButton = false,
  small = false,
}) => {
  const baseClasses = "flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none active:animate-button-press";
  
  const variantClasses = {
    number: "bg-calculator-button-number text-foreground hover:bg-opacity-80",
    operator: "bg-calculator-button-operator text-primary-foreground hover:bg-opacity-80 font-semibold",
    function: "bg-calculator-button-function text-primary hover:bg-opacity-80",
    equal: "bg-calculator-button-equal text-white hover:bg-opacity-90 font-semibold",
    memory: "bg-calculator-button-memory text-primary hover:bg-opacity-80",
    redox: "bg-calculator-button-redox text-primary-foreground hover:bg-opacity-80 font-semibold",
    element: "bg-calculator-button-number text-foreground hover:bg-opacity-80 relative",
    sum: "bg-calculator-button-operator text-primary-foreground hover:bg-opacity-80 font-bold text-3xl" // Increased text size to text-3xl and made it bold
  };

  const handleClick = () => {
    if (!disabled) {
      onClick(value);
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInfoClick) {
      onInfoClick();
    }
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        wide ? "col-span-2" : "",
        small ? "text-xs" : "",
        disabled && "opacity-50 cursor-not-allowed",
        "h-14 md:h-16 shadow-sm",
        variant === "sum" && "font-extrabold scale-125", // Extra bold and slightly enlarged for sum variant
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Calculator ${variant} button: ${value}`}
    >
      {value}
      {showInfoButton && onInfoClick && (
        <span 
          className="absolute top-0 right-0 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
          onClick={handleInfoClick}
        >
          i
        </span>
      )}
    </button>
  );
};

export default Button;
