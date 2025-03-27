
import React from "react";
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            Scientific Calculator
          </h1>
          <p className="text-muted-foreground">
            Elegant, precision-focused design for your calculations
          </p>
        </div>
        
        <Calculator className="w-full max-w-md" />
        
        <div className="mt-10 text-center text-sm text-muted-foreground animate-fade-in">
          <p>
            Designed with simplicity and functionality in mind.
            <br />
            Keyboard shortcuts available: Numbers, operators, Enter (=), Escape (clear), Backspace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
