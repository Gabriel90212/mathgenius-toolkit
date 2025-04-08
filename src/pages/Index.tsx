
import React from "react";
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            Scientific, Calculus, Chemistry & Physics Calculator
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Advanced calculator with derivatives, integrals, chemical equations, physics formulas, circuit analysis, and step-by-step solutions
          </p>
        </div>
        
        <Calculator className="w-full h-full min-h-[700px]" />
        
        <div className="mt-10 text-center text-sm text-muted-foreground animate-fade-in max-w-3xl">
          <p>
            Switch between <strong>Basic</strong>, <strong>Calculus</strong>, <strong>Chemistry</strong>, and <strong>Physics</strong> modes for different calculations.
            <br />
            <strong>NEW:</strong> Interactive Physics formulas with step-by-step solvers for Mechanics, Thermodynamics, Waves, Electromagnetism, and Modern Physics.
            <br />
            <strong>Chemistry Mode:</strong> Balance chemical equations and calculate stoichiometry with support for all 118 elements in the periodic table.
            <br />
            <strong>Calculus Mode:</strong> Compute derivatives and integrals with variables.
            <br />
            <strong>Physics Mode:</strong> Solve problems with formulas, canvas drawing, and step-by-step solutions across multiple physics disciplines.
            <br />
            Keyboard shortcuts available: Numbers, operators, Enter (=), Escape (clear), Backspace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
