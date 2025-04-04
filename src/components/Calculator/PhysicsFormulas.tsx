
import React, { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Atom, 
  Zap, 
  Waves, 
  CornerRightDown, 
  Calculator, 
  Binary, 
  Share2, 
  FlaskConical,
  Thermometer,
  Sun,
  School,
  BookOpen,
  Plug,
  DraftingCompass,
  Globe,
  AtomIcon,
  RadioTower,
  MonitorSmartphone,
  Star,
  BarChart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhysicsFormulasProps {
  onInsertFormula: (formula: string) => void;
}

// Helper component for formula display with insertion capability
const Formula = ({ 
  label, 
  formula, 
  explanation, 
  variables, 
  onInsert 
}: { 
  label: string;
  formula: string;
  explanation?: string;
  variables?: { symbol: string; name: string; unit?: string }[];
  onInsert: (formula: string) => void;
}) => {
  return (
    <div className="border rounded-md p-3 mb-3 bg-background/80 shadow-sm">
      <div className="flex flex-col">
        <div className="font-medium text-sm mb-1">{label}</div>
        <div className="text-base font-mono mb-2 bg-muted/30 p-1.5 rounded">{formula}</div>
        {explanation && <div className="text-xs text-muted-foreground mb-2">{explanation}</div>}
        
        {variables && variables.length > 0 && (
          <div className="grid grid-cols-2 gap-1 mb-2">
            {variables.map((v) => (
              <div 
                key={v.symbol} 
                className="text-xs p-1 border rounded cursor-pointer hover:bg-primary/10 flex items-center"
                onClick={() => onInsert(`${v.symbol} = `)}
              >
                <span className="font-medium mr-1">{v.symbol}:</span> {v.name} {v.unit ? `(${v.unit})` : ''}
              </div>
            ))}
          </div>
        )}
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-1"
          onClick={() => onInsert(formula)}
        >
          Insert Formula
        </Button>
      </div>
    </div>
  );
};

const PhysicsFormulas: React.FC<PhysicsFormulasProps> = ({ onInsertFormula }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>("mechanics");
  const [educationLevel, setEducationLevel] = useState<'minor' | 'superior'>('minor');
  
  // Define all categories
  const categories = [
    { id: "mechanics", name: "Classical Mechanics", icon: <CornerRightDown className="h-4 w-4" /> },
    { id: "waves", name: "Waves & Optics", icon: <Waves className="h-4 w-4" /> },
    { id: "electricity", name: "Electricity & Magnetism", icon: <Zap className="h-4 w-4" /> },
    { id: "thermal", name: "Thermal Physics", icon: <Thermometer className="h-4 w-4" /> },
    { id: "modern", name: "Modern Physics", icon: <Atom className="h-4 w-4" /> },
    { id: "quantum", name: "Quantum Mechanics", icon: <Binary className="h-4 w-4" /> },
    { id: "mathematical", name: "Mathematical Methods", icon: <Calculator className="h-4 w-4" /> },
    { id: "astro", name: "Astrophysics & Cosmology", icon: <Star className="h-4 w-4" /> },
    { id: "nuclear", name: "Nuclear Physics", icon: <RadioTower className="h-4 w-4" /> },
    { id: "condensed", name: "Condensed Matter", icon: <DraftingCompass className="h-4 w-4" /> },
    { id: "particles", name: "Particle Physics", icon: <AtomIcon className="h-4 w-4" /> },
    { id: "computation", name: "Computational", icon: <MonitorSmartphone className="h-4 w-4" /> },
  ];
  
  return (
    <div className="max-h-[60vh] overflow-y-auto p-2 border rounded-md bg-background">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-background z-10 pt-1 pb-2 border-b">
        <div className="flex gap-2">
          <Button
            variant={educationLevel === 'minor' ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex items-center gap-1", 
              educationLevel === 'minor' ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setEducationLevel('minor')}
          >
            <School className="h-4 w-4" />
            <span className="text-xs">Basic Level</span>
          </Button>
          
          <Button
            variant={educationLevel === 'superior' ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex items-center gap-1", 
              educationLevel === 'superior' ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setEducationLevel('superior')}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Advanced Level</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4 sticky top-14 bg-background z-10 pt-1 pb-2 border-b">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex items-center gap-1", 
              activeCategory === category.id ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span className="text-xs">{category.name}</span>
          </Button>
        ))}
      </div>
      
      {activeCategory === "mechanics" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Mechanics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="kinematics">
                  <AccordionTrigger className="text-sm">Kinematics</AccordionTrigger>
                  <AccordionContent>
                    <Formula 
                      label="Displacement" 
                      formula="Δr = rf - ri" 
                      explanation="Change in position vector"
                      variables={[
                        {symbol: "Δr", name: "Displacement", unit: "m"},
                        {symbol: "rf", name: "Final position", unit: "m"},
                        {symbol: "ri", name: "Initial position", unit: "m"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Average Velocity" 
                      formula="vavg = Δr/Δt" 
                      explanation="Rate of change of displacement"
                      variables={[
                        {symbol: "vavg", name: "Average velocity", unit: "m/s"},
                        {symbol: "Δr", name: "Displacement", unit: "m"},
                        {symbol: "Δt", name: "Time interval", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Instantaneous Velocity" 
                      formula="v = dr/dt" 
                      explanation="Derivative of position with respect to time"
                      variables={[
                        {symbol: "v", name: "Velocity", unit: "m/s"},
                        {symbol: "dr", name: "Differential displacement", unit: "m"},
                        {symbol: "dt", name: "Differential time", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Average Acceleration" 
                      formula="aavg = Δv/Δt" 
                      explanation="Rate of change of velocity"
                      variables={[
                        {symbol: "aavg", name: "Average acceleration", unit: "m/s²"},
                        {symbol: "Δv", name: "Change in velocity", unit: "m/s"},
                        {symbol: "Δt", name: "Time interval", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Instantaneous Acceleration" 
                      formula="a = dv/dt = d²r/dt²" 
                      explanation="Derivative of velocity or second derivative of position"
                      variables={[
                        {symbol: "a", name: "Acceleration", unit: "m/s²"},
                        {symbol: "dv", name: "Differential velocity", unit: "m/s"},
                        {symbol: "dt", name: "Differential time", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Kinematic Equation 1" 
                      formula="vf = vi + at" 
                      explanation="Final velocity with constant acceleration"
                      variables={[
                        {symbol: "vf", name: "Final velocity", unit: "m/s"},
                        {symbol: "vi", name: "Initial velocity", unit: "m/s"},
                        {symbol: "a", name: "Acceleration", unit: "m/s²"},
                        {symbol: "t", name: "Time", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Kinematic Equation 2" 
                      formula="Δx = vi·t + ½at²" 
                      explanation="Displacement with constant acceleration"
                      variables={[
                        {symbol: "Δx", name: "Displacement", unit: "m"},
                        {symbol: "vi", name: "Initial velocity", unit: "m/s"},
                        {symbol: "t", name: "Time", unit: "s"},
                        {symbol: "a", name: "Acceleration", unit: "m/s²"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Kinematic Equation 3" 
                      formula="vf² = vi² + 2a·Δx" 
                      explanation="Final velocity using displacement"
                      variables={[
                        {symbol: "vf", name: "Final velocity", unit: "m/s"},
                        {symbol: "vi", name: "Initial velocity", unit: "m/s"},
                        {symbol: "a", name: "Acceleration", unit: "m/s²"},
                        {symbol: "Δx", name: "Displacement", unit: "m"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula 
                      label="Kinematic Equation 4" 
                      formula="Δx = ½(vi + vf)·t" 
                      explanation="Displacement using average velocity"
                      variables={[
                        {symbol: "Δx", name: "Displacement", unit: "m"},
                        {symbol: "vi", name: "Initial velocity", unit: "m/s"},
                        {symbol: "vf", name: "Final velocity", unit: "m/s"},
                        {symbol: "t", name: "Time", unit: "s"}
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="dynamics">
                  <AccordionTrigger className="text-sm">Dynamics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Newton's Second Law"
                      formula="F = ma"
                      explanation="Force equals mass times acceleration"
                      variables={[
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "a", name: "Acceleration", unit: "m/s²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gravitational Force"
                      formula="Fg = Gm₁m₂/r²"
                      explanation="Force of gravity between two masses"
                      variables={[
                        { symbol: "Fg", name: "Gravitational Force", unit: "N" },
                        { symbol: "G", name: "Gravitational Constant", unit: "Nm²/kg²" },
                        { symbol: "m₁", name: "Mass 1", unit: "kg" },
                        { symbol: "m₂", name: "Mass 2", unit: "kg" },
                        { symbol: "r", name: "Distance between masses", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Weight"
                      formula="W = mg"
                      explanation="Weight is mass times gravitational field strength"
                      variables={[
                        { symbol: "W", name: "Weight", unit: "N" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "g", name: "Gravitational field strength", unit: "m/s²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Friction Force"
                      formula="Ff = μN"
                      explanation="Force of friction equals coefficient of friction times normal force"
                      variables={[
                        { symbol: "Ff", name: "Friction Force", unit: "N" },
                        { symbol: "μ", name: "Coefficient of Friction" },
                        { symbol: "N", name: "Normal Force", unit: "N" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Work Done"
                      formula="W = Fd·cosθ"
                      explanation="Work done by a force over a distance"
                      variables={[
                        { symbol: "W", name: "Work", unit: "J" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "d", name: "Distance", unit: "m" },
                        { symbol: "θ", name: "Angle between force and displacement", unit: "degrees" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="energy">
                  <AccordionTrigger className="text-sm">Energy & Power</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Kinetic Energy"
                      formula="KE = ½mv²"
                      explanation="Energy of motion"
                      variables={[
                        { symbol: "KE", name: "Kinetic Energy", unit: "J" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Potential Energy (Gravitational)"
                      formula="PE = mgh"
                      explanation="Energy due to height in a gravitational field"
                      variables={[
                        { symbol: "PE", name: "Potential Energy", unit: "J" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "g", name: "Acceleration due to gravity", unit: "m/s²" },
                        { symbol: "h", name: "Height", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Elastic Potential Energy"
                      formula="PE = ½kx²"
                      explanation="Energy stored in an elastic material"
                      variables={[
                        { symbol: "PE", name: "Potential Energy", unit: "J" },
                        { symbol: "k", name: "Spring constant", unit: "N/m" },
                        { symbol: "x", name: "Displacement from equilibrium", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Conservation of Energy"
                      formula="KEi + PEi = KEf + PEf"
                      explanation="Total energy remains constant in a closed system"
                      variables={[
                        { symbol: "KEi", name: "Initial kinetic energy", unit: "J" },
                        { symbol: "PEi", name: "Initial potential energy", unit: "J" },
                        { symbol: "KEf", name: "Final kinetic energy", unit: "J" },
                        { symbol: "PEf", name: "Final potential energy", unit: "J" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Power"
                      formula="P = W/t"
                      explanation="Rate at which work is done"
                      variables={[
                        { symbol: "P", name: "Power", unit: "W" },
                        { symbol: "W", name: "Work", unit: "J" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Power (Alternative)"
                      formula="P = F·v"
                      explanation="Power as force times velocity"
                      variables={[
                        { symbol: "P", name: "Power", unit: "W" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="momentum">
                  <AccordionTrigger className="text-sm">Momentum & Collisions</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Linear Momentum"
                      formula="p = mv"
                      explanation="Mass in motion"
                      variables={[
                        { symbol: "p", name: "Momentum", unit: "kg m/s" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Impulse"
                      formula="J = FΔt"
                      explanation="Change in momentum equals force times time interval"
                      variables={[
                        { symbol: "J", name: "Impulse", unit: "Ns" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "Δt", name: "Time interval", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Impulse-Momentum Theorem"
                      formula="J = Δp"
                      explanation="Impulse equals change in momentum"
                      variables={[
                        { symbol: "J", name: "Impulse", unit: "Ns" },
                        { symbol: "Δp", name: "Change in momentum", unit: "kg m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Conservation of Momentum"
                      formula="m₁v₁i + m₂v₂i = m₁v₁f + m₂v₂f"
                      explanation="Total momentum is conserved in a closed system"
                      variables={[
                        { symbol: "m₁", name: "Mass of object 1", unit: "kg" },
                        { symbol: "v₁i", name: "Initial velocity of object 1", unit: "m/s" },
                        { symbol: "m₂", name: "Mass of object 2", unit: "kg" },
                        { symbol: "v₂i", name: "Initial velocity of object 2", unit: "m/s" },
                        { symbol: "v₁f", name: "Final velocity of object 1", unit: "m/s" },
                        { symbol: "v₂f", name: "Final velocity of object 2", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Elastic Collision (1D)"
                      formula="v₁f = ((m₁-m₂)/(m₁+m₂))v₁i + ((2m₂)/(m₁+m₂))v₂i"
                      explanation="Final velocity of object 1 in perfectly elastic collision"
                      variables={[
                        { symbol: "v₁f", name: "Final velocity of object 1", unit: "m/s" },
                        { symbol: "m₁", name: "Mass of object 1", unit: "kg" },
                        { symbol: "m₂", name: "Mass of object 2", unit: "kg" },
                        { symbol: "v₁i", name: "Initial velocity of object 1", unit: "m/s" },
                        { symbol: "v₂i", name: "Initial velocity of object 2", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="circular-motion">
                  <AccordionTrigger className="text-sm">Circular Motion</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Centripetal Force"
                      formula="Fc = mv²/r"
                      explanation="Force required to keep an object moving in a circle"
                      variables={[
                        { symbol: "Fc", name: "Centripetal Force", unit: "N" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "r", name: "Radius of circle", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Angular Velocity"
                      formula="ω = v/r"
                      explanation="Rate of change of angular displacement"
                      variables={[
                        { symbol: "ω", name: "Angular Velocity", unit: "rad/s" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "r", name: "Radius of circle", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Centripetal Acceleration"
                      formula="ac = v²/r = ω²r"
                      explanation="Acceleration toward the center of circular motion"
                      variables={[
                        { symbol: "ac", name: "Centripetal Acceleration", unit: "m/s²" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "r", name: "Radius of circle", unit: "m" },
                        { symbol: "ω", name: "Angular velocity", unit: "rad/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Period of Circular Motion"
                      formula="T = 2πr/v = 2π/ω"
                      explanation="Time for one complete revolution"
                      variables={[
                        { symbol: "T", name: "Period", unit: "s" },
                        { symbol: "r", name: "Radius of circle", unit: "m" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "ω", name: "Angular velocity", unit: "rad/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Mechanics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="lagrangian">
                  <AccordionTrigger className="text-sm">Lagrangian Mechanics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Lagrangian"
                      formula="L = T - V"
                      explanation="Difference between kinetic and potential energy"
                      variables={[
                        { symbol: "L", name: "Lagrangian" },
                        { symbol: "T", name: "Kinetic Energy" },
                        { symbol: "V", name: "Potential Energy" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Euler-Lagrange Equation"
                      formula="d/dt (∂L/∂q̇) - ∂L/∂q = 0"
                      explanation="Equation of motion in terms of Lagrangian"
                      variables={[
                        { symbol: "L", name: "Lagrangian" },
                        { symbol: "q", name: "Generalized Coordinate" },
                        { symbol: "q̇", name: "Time Derivative of Generalized Coordinate" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Generalized Momentum"
                      formula="p = ∂L/∂q̇"
                      explanation="Momentum in terms of Lagrangian"
                      variables={[
                        { symbol: "p", name: "Generalized Momentum" },
                        { symbol: "L", name: "Lagrangian" },
                        { symbol: "q̇", name: "Time Derivative of Generalized Coordinate" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Action"
                      formula="S = ∫L dt"
                      explanation="Time integral of Lagrangian"
                      variables={[
                        { symbol: "S", name: "Action" },
                        { symbol: "L", name: "Lagrangian" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Principle of Least Action"
                      formula="δS = 0"
                      explanation="Path taken by system minimizes the action"
                      variables={[
                        { symbol: "δS", name: "Variation of Action" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="hamiltonian">
                  <AccordionTrigger className="text-sm">Hamiltonian Mechanics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Hamiltonian"
                      formula="H = Σpᵢq̇ᵢ - L"
                      explanation="Total energy of a system"
                      variables={[
                        { symbol: "H", name: "Hamiltonian" },
                        { symbol: "pᵢ", name: "Generalized Momentum" },
                        { symbol: "q̇ᵢ", name: "Time Derivative of Generalized Coordinate" },
                        { symbol: "L", name: "Lagrangian" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Hamilton's Equations"
                      formula="q̇ᵢ = ∂H/∂pᵢ, ṗᵢ = -∂H/∂qᵢ"
                      explanation="Equations of motion in terms of Hamiltonian"
                      variables={[
                        { symbol: "H", name: "Hamiltonian" },
                        { symbol: "pᵢ", name: "Generalized Momentum" },
                        { symbol: "q̇ᵢ", name: "Time Derivative of Generalized Coordinate" },
                        { symbol: "qᵢ", name: "Generalized Coordinate" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Poisson Bracket"
                      formula="{A,B} = Σ(∂A/∂qᵢ·∂B/∂pᵢ - ∂A/∂pᵢ·∂B/∂qᵢ)"
                      explanation="Operator describing evolution of system"
                      variables={[
                        { symbol: "{A,B}", name: "Poisson Bracket of A and B" },
                        { symbol: "A", name: "Function of phase space" },
                        { symbol: "B", name: "Function of phase space" },
                        { symbol: "qᵢ", name: "Generalized Coordinate" },
                        { symbol: "pᵢ", name: "Generalized Momentum" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Time Evolution"
                      formula="dA/dt = {A,H} + ∂A/∂t"
                      explanation="Evolution of variable A in phase space"
                      variables={[
                        { symbol: "dA/dt", name: "Time derivative of A" },
                        { symbol: "{A,H}", name: "Poisson Bracket of A with Hamiltonian" },
                        { symbol: "∂A/∂t", name: "Explicit time derivative of A" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="rigid-bodies">
                  <AccordionTrigger className="text-sm">Rigid Body Dynamics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Angular Momentum"
                      formula="L = Iω"
                      explanation="Measure of an object's rotation"
                      variables={[
                        { symbol: "L", name: "Angular Momentum", unit: "kg m²/s" },
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "ω", name: "Angular Velocity", unit: "rad/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Torque"
                      formula="τ = r×F = Iα"
                      explanation="Turning effect of a force"
                      variables={[
                        { symbol: "τ", name: "Torque", unit: "Nm" },
                        { symbol: "r", name: "Position vector", unit: "m" },
                        { symbol: "F", name: "Force vector", unit: "N" },
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "α", name: "Angular acceleration", unit: "rad/s²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Moment of Inertia"
                      formula="I = Σmᵢrᵢ²"
                      explanation="Resistance to rotational motion"
                      variables={[
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "mᵢ", name: "Mass element", unit: "kg" },
                        { symbol: "rᵢ", name: "Distance from axis", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Parallel Axis Theorem"
                      formula="I = Icm + Md²"
                      explanation="Moment of inertia about arbitrary axis"
                      variables={[
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "Icm", name: "Moment about center of mass", unit: "kg m²" },
                        { symbol: "M", name: "Total mass", unit: "kg" },
                        { symbol: "d", name: "Distance between axes", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Rotational Kinetic Energy"
                      formula="KErot = ½Iω²"
                      explanation="Kinetic energy due to rotation"
                      variables={[
                        { symbol: "KErot", name: "Rotational Kinetic Energy", unit: "J" },
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "ω", name: "Angular Velocity", unit: "rad/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "thermal" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Thermal Physics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="temperature">
                  <AccordionTrigger className="text-sm">Temperature & Heat</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Temperature Conversion (C to K)"
                      formula="K = °C + 273.15"
                      explanation="Convert Celsius to Kelvin"
                      variables={[
                        { symbol: "K", name: "Temperature", unit: "K" },
                        { symbol: "°C", name: "Temperature", unit: "°C" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Temperature Conversion (C to F)"
                      formula="°F = (9/5)°C + 32"
                      explanation="Convert Celsius to Fahrenheit"
                      variables={[
                        { symbol: "°F", name: "Temperature", unit: "°F" },
                        { symbol: "°C", name: "Temperature", unit: "°C" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Heat Transfer"
                      formula="Q = mcΔT"
                      explanation="Heat required to change temperature"
                      variables={[
                        { symbol: "Q", name: "Heat", unit: "J" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "c", name: "Specific heat capacity", unit: "J/(kg·K)" },
                        { symbol: "ΔT", name: "Temperature change", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Heat of Fusion/Vaporization"
                      formula="Q = mL"
                      explanation="Heat for phase change"
                      variables={[
                        { symbol: "Q", name: "Heat", unit: "J" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "L", name: "Latent heat", unit: "J/kg" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Heat Transfer Rate"
                      formula="P = Q/t"
                      explanation="Rate of heat flow"
                      variables={[
                        { symbol: "P", name: "Power", unit: "W" },
                        { symbol: "Q", name: "Heat", unit: "J" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="gas-laws">
                  <AccordionTrigger className="text-sm">Gas Laws</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Ideal Gas Law"
                      formula="PV = nRT"
                      explanation="Relation between pressure, volume, and temperature"
                      variables={[
                        { symbol: "P", name: "Pressure", unit: "Pa" },
                        { symbol: "V", name: "Volume", unit: "m³" },
                        { symbol: "n", name: "Number of moles" },
                        { symbol: "R", name: "Gas constant", unit: "J/(mol·K)" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Boyle's Law"
                      formula="P₁V₁ = P₂V₂"
                      explanation="Pressure-volume relationship at constant temperature"
                      variables={[
                        { symbol: "P₁", name: "Initial pressure", unit: "Pa" },
                        { symbol: "V₁", name: "Initial volume", unit: "m³" },
                        { symbol: "P₂", name: "Final pressure", unit: "Pa" },
                        { symbol: "V₂", name: "Final volume", unit: "m³" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Charles's Law"
                      formula="V₁/T₁ = V₂/T₂"
                      explanation="Volume-temperature relationship at constant pressure"
                      variables={[
                        { symbol: "V₁", name: "Initial volume", unit: "m³" },
                        { symbol: "T₁", name: "Initial temperature", unit: "K" },
                        { symbol: "V₂", name: "Final volume", unit: "m³" },
                        { symbol: "T₂", name: "Final temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gay-Lussac's Law"
                      formula="P₁/T₁ = P₂/T₂"
                      explanation="Pressure-temperature relationship at constant volume"
                      variables={[
                        { symbol: "P₁", name: "Initial pressure", unit: "Pa" },
                        { symbol: "T₁", name: "Initial temperature", unit: "K" },
                        { symbol: "P₂", name: "Final pressure", unit: "Pa" },
                        { symbol: "T₂", name: "Final temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Combined Gas Law"
                      formula="P₁V₁/T₁ = P₂V₂/T₂"
                      explanation="Relationship between pressure, volume, and temperature"
                      variables={[
                        { symbol: "P₁", name: "Initial pressure", unit: "Pa" },
                        { symbol: "V₁", name: "Initial volume", unit: "m³" },
                        { symbol: "T₁", name: "Initial temperature", unit: "K" },
                        { symbol: "P₂", name: "Final pressure", unit: "Pa" },
                        { symbol: "V₂", name: "Final volume", unit: "m³" },
                        { symbol: "T₂", name: "Final temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="thermodynamics-basic">
                  <AccordionTrigger className="text-sm">Basic Thermodynamics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="First Law of Thermodynamics"
                      formula="ΔU = Q - W"
                      explanation="Change in internal energy"
                      variables={[
                        { symbol: "ΔU", name: "Change in internal energy", unit: "J" },
                        { symbol: "Q", name: "Heat added to system", unit: "J" },
                        { symbol: "W", name: "Work done by system", unit: "J" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Work Done by Gas"
                      formula="W = PΔV"
                      explanation="Work at constant pressure"
                      variables={[
                        { symbol: "W", name: "Work", unit: "J" },
                        { symbol: "P", name: "Pressure", unit: "Pa" },
                        { symbol: "ΔV", name: "Change in volume", unit: "m³" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Efficiency of Heat Engine"
                      formula="η = W/QH = 1 - TC/TH"
                      explanation="Maximum possible efficiency"
                      variables={[
                        { symbol: "η", name: "Efficiency" },
                        { symbol: "W", name: "Work output", unit: "J" },
                        { symbol: "QH", name: "Heat input from hot reservoir", unit: "J" },
                        { symbol: "TC", name: "Cold reservoir temperature", unit: "K" },
                        { symbol: "TH", name: "Hot reservoir temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Thermodynamics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="stat-mech">
                  <AccordionTrigger className="text-sm">Statistical Mechanics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Entropy"
                      formula="S = k ln(W)"
                      explanation="Boltzmann definition of entropy"
                      variables={[
                        { symbol: "S", name: "Entropy", unit: "J/K" },
                        { symbol: "k", name: "Boltzmann constant", unit: "J/K" },
                        { symbol: "W", name: "Number of microstates" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Entropy Change"
                      formula="ΔS = Q/T"
                      explanation="Entropy change in reversible process"
                      variables={[
                        { symbol: "ΔS", name: "Change in entropy", unit: "J/K" },
                        { symbol: "Q", name: "Heat transferred", unit: "J" },
                        { symbol: "T", name: "Absolute temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Boltzmann Distribution"
                      formula="ni/n = gi·e^(-Ei/kT)/Z"
                      explanation="Probability of finding a system in state i"
                      variables={[
                        { symbol: "ni", name: "Number of particles in state i" },
                        { symbol: "n", name: "Total number of particles" },
                        { symbol: "gi", name: "Degeneracy of state i" },
                        { symbol: "Ei", name: "Energy of state i", unit: "J" },
                        { symbol: "k", name: "Boltzmann constant", unit: "J/K" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                        { symbol: "Z", name: "Partition function" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Partition Function"
                      formula="Z = Σ gi·e^(-Ei/kT)"
                      explanation="Sum over all states"
                      variables={[
                        { symbol: "Z", name: "Partition function" },
                        { symbol: "gi", name: "Degeneracy of state i" },
                        { symbol: "Ei", name: "Energy of state i", unit: "J" },
                        { symbol: "k", name: "Boltzmann constant", unit: "J/K" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="thermo-potentials">
                  <AccordionTrigger className="text-sm">Thermodynamic Potentials</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Helmholtz Free Energy"
                      formula="F = U - TS"
                      explanation="Maximum work at constant temperature and volume"
                      variables={[
                        { symbol: "F", name: "Helmholtz free energy", unit: "J" },
                        { symbol: "U", name: "Internal energy", unit: "J" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                        { symbol: "S", name: "Entropy", unit: "J/K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gibbs Free Energy"
                      formula="G = H - TS"
                      explanation="Maximum non-expansion work at constant T and P"
                      variables={[
                        { symbol: "G", name: "Gibbs free energy", unit: "J" },
                        { symbol: "H", name: "Enthalpy", unit: "J" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                        { symbol: "S", name: "Entropy", unit: "J/K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Enthalpy"
                      formula="H = U + PV"
                      explanation="Heat content of a system"
                      variables={[
                        { symbol: "H", name: "Enthalpy", unit: "J" },
                        { symbol: "U", name: "Internal energy", unit: "J" },
                        { symbol: "P", name: "Pressure", unit: "Pa" },
                        { symbol: "V", name: "Volume", unit: "m³" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fundamental Thermodynamic Relation"
                      formula="dU = TdS - PdV"
                      explanation="Change in internal energy"
                      variables={[
                        { symbol: "dU", name: "Change in internal energy" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                        { symbol: "dS", name: "Change in entropy" },
                        { symbol: "P", name: "Pressure", unit: "Pa" },
                        { symbol: "dV", name: "Change in volume" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "waves" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Waves & Optics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wave-properties">
                  <AccordionTrigger className="text-sm">Wave Properties</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Wave Speed"
                      formula="v = fλ"
                      explanation="Speed equals frequency times wavelength"
                      variables={[
                        { symbol: "v", name: "Wave speed", unit: "m/s" },
                        { symbol: "f", name: "Frequency", unit: "Hz" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Period"
                      formula="T = 1/f"
                      explanation="Time for one complete cycle"
                      variables={[
                        { symbol: "T", name: "Period", unit: "s" },
                        { symbol: "f", name: "Frequency", unit: "Hz" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Angular Frequency"
                      formula="ω = 2πf"
                      explanation="Angular frequency in radians per second"
                      variables={[
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                        { symbol: "f", name: "Frequency", unit: "Hz" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Wave Number"
                      formula="k = 2π/λ"
                      explanation="Spatial frequency"
                      variables={[
                        { symbol: "k", name: "Wave number", unit: "rad/m" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Wave Equation"
                      formula="y(x,t) = Asin(kx-ωt+φ)"
                      explanation="Displacement of wave at position x and time t"
                      variables={[
                        { symbol: "y", name: "Displacement", unit: "m" },
                        { symbol: "A", name: "Amplitude", unit: "m" },
                        { symbol: "k", name: "Wave number", unit: "rad/m" },
                        { symbol: "x", name: "Position", unit: "m" },
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                        { symbol: "t", name: "Time", unit: "s" },
                        { symbol: "φ", name: "Phase constant", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sound-waves">
                  <AccordionTrigger className="text-sm">Sound Waves</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Speed of Sound"
                      formula="v = 331.4 + 0.6T"
                      explanation="Speed of sound in air at temperature T"
                      variables={[
                        { symbol: "v", name: "Speed of sound", unit: "m/s" },
                        { symbol: "T", name: "Temperature", unit: "°C" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Intensity Level"
                      formula="β = 10log(I/I₀)"
                      explanation="Sound intensity level in decibels"
                      variables={[
                        { symbol: "β", name: "Intensity level", unit: "dB" },
                        { symbol: "I", name: "Intensity", unit: "W/m²" },
                        { symbol: "I₀", name: "Reference intensity", unit: "W/m²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Doppler Effect"
                      formula="f' = f((v ± vₒ)/(v ± vₛ))"
                      explanation="Frequency change due to relative motion"
                      variables={[
                        { symbol: "f'", name: "Observed frequency", unit: "Hz" },
                        { symbol: "f", name: "Source frequency", unit: "Hz" },
                        { symbol: "v", name: "Wave speed", unit: "m/s" },
                        { symbol: "vₒ", name: "Observer velocity", unit: "m/s" },
                        { symbol: "vₛ", name: "Source velocity", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="light-waves">
                  <AccordionTrigger className="text-sm">Light & Geometric Optics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Law of Reflection"
                      formula="θᵢ = θᵣ"
                      explanation="Angle of incidence equals angle of reflection"
                      variables={[
                        { symbol: "θᵢ", name: "Angle of incidence", unit: "rad" },
                        { symbol: "θᵣ", name: "Angle of reflection", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Snell's Law"
                      formula="n₁sinθ₁ = n₂sinθ₂"
                      explanation="Relationship between angles and indices of refraction"
                      variables={[
                        { symbol: "n₁", name: "Index of refraction of medium 1" },
                        { symbol: "θ₁", name: "Angle in medium 1", unit: "rad" },
                        { symbol: "n₂", name: "Index of refraction of medium 2" },
                        { symbol: "θ₂", name: "Angle in medium 2", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Thin Lens Equation"
                      formula="1/f = 1/dₒ + 1/dᵢ"
                      explanation="Relationship between focal length and image/object distances"
                      variables={[
                        { symbol: "f", name: "Focal length", unit: "m" },
                        { symbol: "dₒ", name: "Object distance", unit: "m" },
                        { symbol: "dᵢ", name: "Image distance", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnification"
                      formula="M = -dᵢ/dₒ"
                      explanation="Ratio of image height to object height"
                      variables={[
                        { symbol: "M", name: "Magnification" },
                        { symbol: "dᵢ", name: "Image distance", unit: "m" },
                        { symbol: "dₒ", name: "Object distance", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="interference">
                  <AccordionTrigger className="text-sm">Interference & Diffraction</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Double Slit Interference"
                      formula="dsinθ = mλ"
                      explanation="Condition for constructive interference"
                      variables={[
                        { symbol: "d", name: "Slit separation", unit: "m" },
                        { symbol: "θ", name: "Angle to maximum", unit: "rad" },
                        { symbol: "m", name: "Order of maximum (integer)" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Single Slit Diffraction"
                      formula="asinθ = mλ"
                      explanation="Condition for diffraction minima"
                      variables={[
                        { symbol: "a", name: "Slit width", unit: "m" },
                        { symbol: "θ", name: "Angle to minimum", unit: "rad" },
                        { symbol: "m", name: "Order of minimum (integer)" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Diffraction Grating"
                      formula="dsinθ = mλ"
                      explanation="Condition for maxima in diffraction grating"
                      variables={[
                        { symbol: "d", name: "Grating spacing", unit: "m" },
                        { symbol: "θ", name: "Angle to maximum", unit: "rad" },
                        { symbol: "m", name: "Order of maximum (integer)" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Wave Physics & Optics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wave-equation">
                  <AccordionTrigger className="text-sm">Wave Equations</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Wave Equation (1D)"
                      formula="∂²y/∂t² = v²(∂²y/∂x²)"
                      explanation="General form of the wave equation"
                      variables={[
                        { symbol: "y", name: "Displacement", unit: "m" },
                        { symbol: "t", name: "Time", unit: "s" },
                        { symbol: "v", name: "Wave speed", unit: "m/s" },
                        { symbol: "x", name: "Position", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="D'Alembert's Solution"
                      formula="y(x,t) = f(x-vt) + g(x+vt)"
                      explanation="General solution to the wave equation"
                      variables={[
                        { symbol: "y", name: "Displacement", unit: "m" },
                        { symbol: "f", name: "Forward-traveling wave" },
                        { symbol: "g", name: "Backward-traveling wave" },
                        { symbol: "x", name: "Position", unit: "m" },
                        { symbol: "v", name: "Wave speed", unit: "m/s" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Wave Energy Density"
                      formula="u = ½ρω²A²cos²(kx-ωt)"
                      explanation="Energy per unit volume in wave"
                      variables={[
                        { symbol: "u", name: "Energy density", unit: "J/m³" },
                        { symbol: "ρ", name: "Medium density", unit: "kg/m³" },
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                        { symbol: "A", name: "Amplitude", unit: "m" },
                        { symbol: "k", name: "Wave number", unit: "rad/m" },
                        { symbol: "x", name: "Position", unit: "m" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="electromagnetic-waves">
                  <AccordionTrigger className="text-sm">Electromagnetic Waves</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Maxwell's Equations"
                      formula="∇·E = ρ/ε₀, ∇·B = 0, ∇×E = -∂B/∂t, ∇×B = μ₀J + ε₀μ₀∂E/∂t"
                      explanation="Fundamental equations of electromagnetism"
                      variables={[
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "ρ", name: "Charge density", unit: "C/m³" },
                        { symbol: "ε₀", name: "Vacuum permittivity", unit: "F/m" },
                        { symbol: "μ₀", name: "Vacuum permeability", unit: "H/m" },
                        { symbol: "J", name: "Current density", unit: "A/m²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="EM Wave Speed"
                      formula="c = 1/√(ε₀μ₀)"
                      explanation="Speed of light in vacuum"
                      variables={[
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "ε₀", name: "Vacuum permittivity", unit: "F/m" },
                        { symbol: "μ₀", name: "Vacuum permeability", unit: "H/m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Poynting Vector"
                      formula="S = E×H"
                      explanation="Energy flux density of EM wave"
                      variables={[
                        { symbol: "S", name: "Poynting vector", unit: "W/m²" },
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "H", name: "Magnetic field strength", unit: "A/m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="physical-optics">
                  <AccordionTrigger className="text-sm">Physical Optics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Fresnel Equations (s-polarization)"
                      formula="rs = (n₁cosθᵢ - n₂cosθₜ)/(n₁cosθᵢ + n₂cosθₜ)"
                      explanation="Reflection coefficient for perpendicular polarization"
                      variables={[
                        { symbol: "rs", name: "Reflection coefficient (s-polarization)" },
                        { symbol: "n₁", name: "Index of refraction of medium 1" },
                        { symbol: "n₂", name: "Index of refraction of medium 2" },
                        { symbol: "θᵢ", name: "Angle of incidence", unit: "rad" },
                        { symbol: "θₜ", name: "Angle of transmission", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fresnel Equations (p-polarization)"
                      formula="rp = (n₂cosθᵢ - n₁cosθₜ)/(n₂cosθᵢ + n₁cosθₜ)"
                      explanation="Reflection coefficient for parallel polarization"
                      variables={[
                        { symbol: "rp", name: "Reflection coefficient (p-polarization)" },
                        { symbol: "n₁", name: "Index of refraction of medium 1" },
                        { symbol: "n₂", name: "Index of refraction of medium 2" },
                        { symbol: "θᵢ", name: "Angle of incidence", unit: "rad" },
                        { symbol: "θₜ", name: "Angle of transmission", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Rayleigh Criterion"
                      formula="sinθ = 1.22λ/D"
                      explanation="Resolution limit of optical instruments"
                      variables={[
                        { symbol: "θ", name: "Angular resolution", unit: "rad" },
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                        { symbol: "D", name: "Aperture diameter", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "electricity" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Electricity & Magnetism</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="electrostatics">
                  <AccordionTrigger className="text-sm">Electrostatics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Coulomb's Law"
                      formula="F = k(q₁q₂/r²)"
                      explanation="Force between two charges"
                      variables={[
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "k", name: "Coulomb constant", unit: "Nm²/C²" },
                        { symbol: "q₁", name: "Charge 1", unit: "C" },
                        { symbol: "q₂", name: "Charge 2", unit: "C" },
                        { symbol: "r", name: "Distance between charges", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Electric Field"
                      formula="E = F/q = kQ/r²"
                      explanation="Electric field due to point charge"
                      variables={[
                        { symbol: "E", name: "Electric field", unit: "N/C" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "q", name: "Test charge", unit: "C" },
                        { symbol: "k", name: "Coulomb constant", unit: "Nm²/C²" },
                        { symbol: "Q", name: "Source charge", unit: "C" },
                        { symbol: "r", name: "Distance from source", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Electric Potential Energy"
                      formula="U = kqQ/r"
                      explanation="Potential energy of a charge in an electric field"
                      variables={[
                        { symbol: "U", name: "Electric potential energy", unit: "J" },
                        { symbol: "k", name: "Coulomb constant", unit: "Nm²/C²" },
                        { symbol: "q", name: "Test charge", unit: "C" },
                        { symbol: "Q", name: "Source charge", unit: "C" },
                        { symbol: "r", name: "Distance from source", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Electric Potential"
                      formula="V = U/q = kQ/r"
                      explanation="Electric potential at a point"
                      variables={[
                        { symbol: "V", name: "Electric potential", unit: "V" },
                        { symbol: "U", name: "Electric potential energy", unit: "J" },
                        { symbol: "q", name: "Test charge", unit: "C" },
                        { symbol: "k", name: "Coulomb constant", unit: "Nm²/C²" },
                        { symbol: "Q", name: "Source charge", unit: "C" },
                        { symbol: "r", name: "Distance from source", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="circuits">
                  <AccordionTrigger className="text-sm">Electric Circuits</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Ohm's Law"
                      formula="V = IR"
                      explanation="Voltage equals current times resistance"
                      variables={[
                        { symbol: "V", name: "Voltage", unit: "V" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "R", name: "Resistance", unit: "Ω" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Power"
                      formula="P = IV = I²R = V²/R"
                      explanation="Power in an electric circuit"
                      variables={[
                        { symbol: "P", name: "Power", unit: "W" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "V", name: "Voltage", unit: "V" },
                        { symbol: "R", name: "Resistance", unit: "Ω" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Series Resistors"
                      formula="Req = R₁ + R₂ + R₃ + ..."
                      explanation="Equivalent resistance for resistors in series"
                      variables={[
                        { symbol: "Req", name: "Equivalent resistance", unit: "Ω" },
                        { symbol: "R₁", name: "Resistance 1", unit: "Ω" },
                        { symbol: "R₂", name: "Resistance 2", unit: "Ω" },
                        { symbol: "R₃", name: "Resistance 3", unit: "Ω" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Parallel Resistors"
                      formula="1/Req = 1/R₁ + 1/R₂ + 1/R₃ + ..."
                      explanation="Equivalent resistance for resistors in parallel"
                      variables={[
                        { symbol: "Req", name: "Equivalent resistance", unit: "Ω" },
                        { symbol: "R₁", name: "Resistance 1", unit: "Ω" },
                        { symbol: "R₂", name: "Resistance 2", unit: "Ω" },
                        { symbol: "R₃", name: "Resistance 3", unit: "Ω" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Capacitance"
                      formula="C = Q/V"
                      explanation="Charge storage capacity"
                      variables={[
                        { symbol: "C", name: "Capacitance", unit: "F" },
                        { symbol: "Q", name: "Charge", unit: "C" },
                        { symbol: "V", name: "Voltage", unit: "V" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Capacitor Energy"
                      formula="U = ½CV²"
                      explanation="Energy stored in a capacitor"
                      variables={[
                        { symbol: "U", name: "Energy", unit: "J" },
                        { symbol: "C", name: "Capacitance", unit: "F" },
                        { symbol: "V", name: "Voltage", unit: "V" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="RC Time Constant"
                      formula="τ = RC"
                      explanation="Time constant of RC circuit"
                      variables={[
                        { symbol: "τ", name: "Time constant", unit: "s" },
                        { symbol: "R", name: "Resistance", unit: "Ω" },
                        { symbol: "C", name: "Capacitance", unit: "F" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="magnetism">
                  <AccordionTrigger className="text-sm">Magnetism</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Magnetic Force on Moving Charge"
                      formula="F = qv×B"
                      explanation="Force on a charge moving in a magnetic field"
                      variables={[
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "q", name: "Charge", unit: "C" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnetic Force on Current"
                      formula="F = IL×B"
                      explanation="Force on a current-carrying wire in a magnetic field"
                      variables={[
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "L", name: "Length vector", unit: "m" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnetic Field of Straight Wire"
                      formula="B = (μ₀I)/(2πr)"
                      explanation="Magnetic field at distance r from a long straight wire"
                      variables={[
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "μ₀", name: "Vacuum permeability", unit: "T·m/A" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "r", name: "Distance from wire", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnetic Field of Solenoid"
                      formula="B = μ₀nI"
                      explanation="Magnetic field inside a long solenoid"
                      variables={[
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "μ₀", name: "Vacuum permeability", unit: "T·m/A" },
                        { symbol: "n", name: "Number of turns per unit length", unit: "m⁻¹" },
                        { symbol: "I", name: "Current", unit: "A" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="electromagnetic-induction">
                  <AccordionTrigger className="text-sm">Electromagnetic Induction</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Faraday's Law"
                      formula="ε = -dΦB/dt"
                      explanation="Induced EMF equals rate of change of magnetic flux"
                      variables={[
                        { symbol: "ε", name: "Induced EMF", unit: "V" },
                        { symbol: "ΦB", name: "Magnetic flux", unit: "Wb" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnetic Flux"
                      formula="ΦB = B·A = BAcosθ"
                      explanation="Magnetic flux through area A"
                      variables={[
                        { symbol: "ΦB", name: "Magnetic flux", unit: "Wb" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "A", name: "Area", unit: "m²" },
                        { symbol: "θ", name: "Angle between B and area normal", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Self-Inductance"
                      formula="ε = -LdI/dt"
                      explanation="EMF induced in a circuit due to change in its own current"
                      variables={[
                        { symbol: "ε", name: "Induced EMF", unit: "V" },
                        { symbol: "L", name: "Self-inductance", unit: "H" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Energy in Inductor"
                      formula="U = ½LI²"
                      explanation="Energy stored in an inductor"
                      variables={[
                        { symbol: "U", name: "Energy", unit: "J" },
                        { symbol: "L", name: "Inductance", unit: "H" },
                        { symbol: "I", name: "Current", unit: "A" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Electromagnetism</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="maxwells-equations">
                  <AccordionTrigger className="text-sm">Maxwell's Equations</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Gauss's Law (Electric)"
                      formula="∮E·dA = Q/ε₀"
                      explanation="Flux of electric field through closed surface equals enclosed charge divided by ε₀"
                      variables={[
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "dA", name: "Area element", unit: "m²" },
                        { symbol: "Q", name: "Enclosed charge", unit: "C" },
                        { symbol: "ε₀", name: "Vacuum permittivity", unit: "F/m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gauss's Law (Magnetic)"
                      formula="∮B·dA = 0"
                      explanation="Flux of magnetic field through closed surface is zero"
                      variables={[
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "dA", name: "Area element", unit: "m²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Faraday's Law"
                      formula="∮E·dl = -dΦB/dt"
                      explanation="Circulation of electric field equals negative rate of change of magnetic flux"
                      variables={[
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "dl", name: "Line element", unit: "m" },
                        { symbol: "ΦB", name: "Magnetic flux", unit: "Wb" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Ampère-Maxwell Law"
                      formula="∮B·dl = μ₀I + μ₀ε₀dΦE/dt"
                      explanation="Circulation of magnetic field relates to current and changing electric flux"
                      variables={[
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "dl", name: "Line element", unit: "m" },
                        { symbol: "μ₀", name: "Vacuum permeability", unit: "H/m" },
                        { symbol: "I", name: "Current", unit: "A" },
                        { symbol: "ε₀", name: "Vacuum permittivity", unit: "F/m" },
                        { symbol: "ΦE", name: "Electric flux", unit: "V·m" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="electromagnetic-waves-adv">
                  <AccordionTrigger className="text-sm">Electromagnetic Waves</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Wave Equation"
                      formula="∇²E = (1/c²)∂²E/∂t²"
                      explanation="Wave equation for electric field"
                      variables={[
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Intensity"
                      formula="I = (1/2)ε₀cE₀²"
                      explanation="Intensity of electromagnetic wave"
                      variables={[
                        { symbol: "I", name: "Intensity", unit: "W/m²" },
                        { symbol: "ε₀", name: "Vacuum permittivity", unit: "F/m" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "E₀", name: "Electric field amplitude", unit: "V/m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Radiation Pressure"
                      formula="P = I/c"
                      explanation="Pressure exerted by electromagnetic wave"
                      variables={[
                        { symbol: "P", name: "Radiation pressure", unit: "Pa" },
                        { symbol: "I", name: "Intensity", unit: "W/m²" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="electrodynamics">
                  <AccordionTrigger className="text-sm">Electrodynamics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Electric Field (Moving Observer)"
                      formula="E' = γ(E + v×B) - (γ-1)(v·E)v/v²"
                      explanation="Lorentz transformation of electric field"
                      variables={[
                        { symbol: "E'", name: "Transformed electric field", unit: "V/m" },
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "v", name: "Relative velocity", unit: "m/s" },
                        { symbol: "γ", name: "Lorentz factor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Magnetic Field (Moving Observer)"
                      formula="B' = γ(B - (1/c²)v×E) - (γ-1)(v·B)v/v²"
                      explanation="Lorentz transformation of magnetic field"
                      variables={[
                        { symbol: "B'", name: "Transformed magnetic field", unit: "T" },
                        { symbol: "B", name: "Magnetic field", unit: "T" },
                        { symbol: "E", name: "Electric field", unit: "V/m" },
                        { symbol: "v", name: "Relative velocity", unit: "m/s" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "γ", name: "Lorentz factor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "modern" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Modern Physics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="relativity">
                  <AccordionTrigger className="text-sm">Special Relativity</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Lorentz Factor"
                      formula="γ = 1/√(1-v²/c²)"
                      explanation="Relativistic factor"
                      variables={[
                        { symbol: "γ", name: "Lorentz factor" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Length Contraction"
                      formula="L = L₀/γ"
                      explanation="Length in direction of motion appears shorter"
                      variables={[
                        { symbol: "L", name: "Contracted length", unit: "m" },
                        { symbol: "L₀", name: "Proper length", unit: "m" },
                        { symbol: "γ", name: "Lorentz factor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Time Dilation"
                      formula="Δt = γΔt₀"
                      explanation="Moving clocks run slower"
                      variables={[
                        { symbol: "Δt", name: "Dilated time interval", unit: "s" },
                        { symbol: "Δt₀", name: "Proper time interval", unit: "s" },
                        { symbol: "γ", name: "Lorentz factor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Relativistic Mass"
                      formula="m = γm₀"
                      explanation="Mass increases with velocity"
                      variables={[
                        { symbol: "m", name: "Relativistic mass", unit: "kg" },
                        { symbol: "m₀", name: "Rest mass", unit: "kg" },
                        { symbol: "γ", name: "Lorentz factor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Mass-Energy Equivalence"
                      formula="E = mc²"
                      explanation="Mass is a form of energy"
                      variables={[
                        { symbol: "E", name: "Energy", unit: "J" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quantum">
                  <AccordionTrigger className="text-sm">Quantum Physics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Planck's Energy"
                      formula="E = hf"
                      explanation="Energy of a photon"
                      variables={[
                        { symbol: "E", name: "Energy", unit: "J" },
                        { symbol: "h", name: "Planck's constant", unit: "J·s" },
                        { symbol: "f", name: "Frequency", unit: "Hz" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="De Broglie Wavelength"
                      formula="λ = h/p"
                      explanation="Wavelength of matter"
                      variables={[
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                        { symbol: "h", name: "Planck's constant", unit: "J·s" },
                        { symbol: "p", name: "Momentum", unit: "kg·m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Heisenberg Uncertainty Principle"
                      formula="ΔxΔp ≥ ℏ/2"
                      explanation="Limit on measurement precision"
                      variables={[
                        { symbol: "Δx", name: "Position uncertainty", unit: "m" },
                        { symbol: "Δp", name: "Momentum uncertainty", unit: "kg·m/s" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Photoelectric Effect"
                      formula="Kmax = hf - φ"
                      explanation="Maximum kinetic energy of ejected electrons"
                      variables={[
                        { symbol: "Kmax", name: "Maximum kinetic energy", unit: "J" },
                        { symbol: "h", name: "Planck's constant", unit: "J·s" },
                        { symbol: "f", name: "Frequency", unit: "Hz" },
                        { symbol: "φ", name: "Work function", unit: "J" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="atomic">
                  <AccordionTrigger className="text-sm">Atomic Physics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Bohr Model Energy Levels"
                      formula="En = -13.6eV/n²"
                      explanation="Energy levels in hydrogen atom"
                      variables={[
                        { symbol: "En", name: "Energy level", unit: "eV" },
                        { symbol: "n", name: "Principal quantum number" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Bohr Radius"
                      formula="a₀ = 0.0529nm"
                      explanation="Radius of first Bohr orbit"
                      variables={[
                        { symbol: "a₀", name: "Bohr radius", unit: "nm" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Photon Wavelength"
                      formula="λ = hc/E"
                      explanation="Wavelength of light from energy transition"
                      variables={[
                        { symbol: "λ", name: "Wavelength", unit: "m" },
                        { symbol: "h", name: "Planck's constant", unit: "J·s" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "E", name: "Energy difference", unit: "J" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nuclear">
                  <AccordionTrigger className="text-sm">Nuclear Physics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Nuclear Binding Energy"
                      formula="EB = [ZmH + (A-Z)mn - M]c²"
                      explanation="Energy required to separate nucleus into nucleons"
                      variables={[
                        { symbol: "EB", name: "Binding energy", unit: "J" },
                        { symbol: "Z", name: "Atomic number" },
                        { symbol: "mH", name: "Hydrogen mass", unit: "kg" },
                        { symbol: "A", name: "Mass number" },
                        { symbol: "mn", name: "Neutron mass", unit: "kg" },
                        { symbol: "M", name: "Nuclear mass", unit: "kg" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Radioactive Decay Law"
                      formula="N(t) = N₀e^(-λt)"
                      explanation="Number of nuclei remaining after time t"
                      variables={[
                        { symbol: "N(t)", name: "Number of nuclei at time t" },
                        { symbol: "N₀", name: "Initial number of nuclei" },
                        { symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Half-Life"
                      formula="t½ = ln(2)/λ"
                      explanation="Time for half of sample to decay"
                      variables={[
                        { symbol: "t½", name: "Half-life", unit: "s" },
                        { symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Activity"
                      formula="A = λN"
                      explanation="Rate of decay"
                      variables={[
                        { symbol: "A", name: "Activity", unit: "Bq" },
                        { symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
                        { symbol: "N", name: "Number of nuclei" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Modern Physics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="general-relativity">
                  <AccordionTrigger className="text-sm">General Relativity</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Einstein Field Equations"
                      formula="Gμν = (8πG/c⁴)Tμν"
                      explanation="Relates spacetime curvature to energy-momentum"
                      variables={[
                        { symbol: "Gμν", name: "Einstein tensor" },
                        { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "Tμν", name: "Energy-momentum tensor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Schwarzschild Radius"
                      formula="rs = 2GM/c²"
                      explanation="Radius of event horizon for non-rotating black hole"
                      variables={[
                        { symbol: "rs", name: "Schwarzschild radius", unit: "m" },
                        { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                        { symbol: "M", name: "Mass", unit: "kg" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gravitational Time Dilation"
                      formula="t = t₀/√(1-2GM/(rc²))"
                      explanation="Time dilation due to gravity"
                      variables={[
                        { symbol: "t", name: "Dilated time", unit: "s" },
                        { symbol: "t₀", name: "Proper time", unit: "s" },
                        { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                        { symbol: "M", name: "Mass", unit: "kg" },
                        { symbol: "r", name: "Radial distance", unit: "m" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quantum-field-theory">
                  <AccordionTrigger className="text-sm">Quantum Field Theory</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Klein-Gordon Equation"
                      formula="(∂²/∂t² - ∇² + m²c²/ℏ²)φ = 0"
                      explanation="Relativistic scalar wave equation"
                      variables={[
                        { symbol: "φ", name: "Scalar field" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Dirac Equation"
                      formula="(iℏγᵘ∂ᵘ - mc)ψ = 0"
                      explanation="Relativistic wave equation for spin-1/2 particles"
                      variables={[
                        { symbol: "ψ", name: "Spinor field" },
                        { symbol: "γᵘ", name: "Dirac gamma matrices" },
                        { symbol: "∂ᵘ", name: "Partial derivatives" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "c", name: "Speed of light", unit: "m/s" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Feynman Propagator"
                      formula="DF(x-y) = ∫d⁴k/(2π)⁴ e^(-ik(x-y))/(k² - m² + iε)"
                      explanation="Propagator for scalar field"
                      variables={[
                        { symbol: "DF", name: "Feynman propagator" },
                        { symbol: "x,y", name: "Spacetime points" },
                        { symbol: "k", name: "Four-momentum" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "ε", name: "Infinitesimal" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="standard-model">
                  <AccordionTrigger className="text-sm">Standard Model</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Fermi Interaction"
                      formula="GF = 1.166×10⁻⁵ GeV⁻²"
                      explanation="Fermi coupling constant for weak interactions"
                      variables={[
                        { symbol: "GF", name: "Fermi coupling constant", unit: "GeV⁻²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Higgs Mass"
                      formula="mH ≈ 125 GeV/c²"
                      explanation="Mass of Higgs boson"
                      variables={[
                        { symbol: "mH", name: "Higgs mass", unit: "GeV/c²" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Weinberg Angle"
                      formula="sin²θW ≈ 0.23"
                      explanation="Mixing angle in electroweak theory"
                      variables={[
                        { symbol: "θW", name: "Weinberg angle", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "quantum" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Quantum Mechanics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wave-functions">
                  <AccordionTrigger className="text-sm">Wave Functions</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Schrödinger Equation (Time-Dependent)"
                      formula="iℏ∂Ψ/∂t = ĤΨ"
                      explanation="Evolution of quantum state with time"
                      variables={[
                        { symbol: "Ψ", name: "Wave function" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                        { symbol: "Ĥ", name: "Hamiltonian operator" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Schrödinger Equation (Time-Independent)"
                      formula="ĤΨ = EΨ"
                      explanation="Energy eigenvalue equation"
                      variables={[
                        { symbol: "Ĥ", name: "Hamiltonian operator" },
                        { symbol: "Ψ", name: "Wave function" },
                        { symbol: "E", name: "Energy eigenvalue", unit: "J" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Probability Density"
                      formula="P(x) = |Ψ(x)|²"
                      explanation="Probability of finding particle at position x"
                      variables={[
                        { symbol: "P(x)", name: "Probability density" },
                        { symbol: "Ψ(x)", name: "Wave function" },
                        { symbol: "x", name: "Position", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Normalization Condition"
                      formula="∫|Ψ(x)|²dx = 1"
                      explanation="Total probability equals 1"
                      variables={[
                        { symbol: "Ψ(x)", name: "Wave function" },
                        { symbol: "x", name: "Position", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quantum-operators">
                  <AccordionTrigger className="text-sm">Quantum Operators</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Position Operator"
                      formula="x̂Ψ(x) = xΨ(x)"
                      explanation="Position operator multiplies by position"
                      variables={[
                        { symbol: "x̂", name: "Position operator" },
                        { symbol: "Ψ(x)", name: "Wave function" },
                        { symbol: "x", name: "Position", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Momentum Operator"
                      formula="p̂ = -iℏ∇"
                      explanation="Momentum operator is derivative operator"
                      variables={[
                        { symbol: "p̂", name: "Momentum operator" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                        { symbol: "∇", name: "Gradient operator" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Energy Operator"
                      formula="Ê = iℏ∂/∂t"
                      explanation="Energy operator is time derivative"
                      variables={[
                        { symbol: "Ê", name: "Energy operator" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Hamiltonian (Free Particle)"
                      formula="Ĥ = p̂²/2m"
                      explanation="Energy operator for free particle"
                      variables={[
                        { symbol: "Ĥ", name: "Hamiltonian operator" },
                        { symbol: "p̂", name: "Momentum operator" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quantum-systems">
                  <AccordionTrigger className="text-sm">Simple Quantum Systems</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Particle in a Box Energy Levels"
                      formula="En = n²h²/(8mL²)"
                      explanation="Energy levels of particle in 1D box"
                      variables={[
                        { symbol: "En", name: "Energy level", unit: "J" },
                        { symbol: "n", name: "Quantum number" },
                        { symbol: "h", name: "Planck's constant", unit: "J·s" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "L", name: "Box length", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Quantum Harmonic Oscillator Energy"
                      formula="En = (n+½)ℏω"
                      explanation="Energy levels of harmonic oscillator"
                      variables={[
                        { symbol: "En", name: "Energy level", unit: "J" },
                        { symbol: "n", name: "Quantum number" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Hydrogen Atom Energy Levels"
                      formula="En = -13.6eV/n²"
                      explanation="Energy levels of hydrogen atom"
                      variables={[
                        { symbol: "En", name: "Energy level", unit: "eV" },
                        { symbol: "n", name: "Principal quantum number" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Quantum Mechanics</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="spin">
                  <AccordionTrigger className="text-sm">Spin & Angular Momentum</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Angular Momentum Eigenvalues"
                      formula="L² = l(l+1)ℏ²"
                      explanation="Eigenvalues of squared angular momentum"
                      variables={[
                        { symbol: "L²", name: "Squared angular momentum" },
                        { symbol: "l", name: "Angular momentum quantum number" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="z-Component of Angular Momentum"
                      formula="Lz = mℏ"
                      explanation="Eigenvalues of z-component of angular momentum"
                      variables={[
                        { symbol: "Lz", name: "z-component of angular momentum" },
                        { symbol: "m", name: "Magnetic quantum number" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Spin Angular Momentum"
                      formula="S² = s(s+1)ℏ²"
                      explanation="Eigenvalues of squared spin"
                      variables={[
                        { symbol: "S²", name: "Squared spin angular momentum" },
                        { symbol: "s", name: "Spin quantum number" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Electron Spin"
                      formula="s = ½"
                      explanation="Spin quantum number for electron"
                      variables={[
                        { symbol: "s", name: "Spin quantum number" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="perturbation-theory">
                  <AccordionTrigger className="text-sm">Perturbation Theory</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="First-Order Energy Correction"
                      formula="E⁽¹⁾ₙ = ⟨ψ⁽⁰⁾ₙ|Ĥ'|ψ⁽⁰⁾ₙ⟩"
                      explanation="First-order correction to energy eigenvalue"
                      variables={[
                        { symbol: "E⁽¹⁾ₙ", name: "First-order energy correction" },
                        { symbol: "ψ⁽⁰⁾ₙ", name: "Unperturbed eigenfunction" },
                        { symbol: "Ĥ'", name: "Perturbation Hamiltonian" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Second-Order Energy Correction"
                      formula="E⁽²⁾ₙ = Σ|⟨ψ⁽⁰⁾ₘ|Ĥ'|ψ⁽⁰⁾ₙ⟩|²/(E⁽⁰⁾ₙ-E⁽⁰⁾ₘ)"
                      explanation="Second-order correction to energy eigenvalue"
                      variables={[
                        { symbol: "E⁽²⁾ₙ", name: "Second-order energy correction" },
                        { symbol: "ψ⁽⁰⁾ₙ", name: "Unperturbed eigenfunction for state n" },
                        { symbol: "ψ⁽⁰⁾ₘ", name: "Unperturbed eigenfunction for state m" },
                        { symbol: "Ĥ'", name: "Perturbation Hamiltonian" },
                        { symbol: "E⁽⁰⁾ₙ", name: "Unperturbed energy of state n" },
                        { symbol: "E⁽⁰⁾ₘ", name: "Unperturbed energy of state m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quantum-statistics">
                  <AccordionTrigger className="text-sm">Quantum Statistics</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Bose-Einstein Distribution"
                      formula="⟨nᵢ⟩ = 1/(e^((εᵢ-μ)/kT) - 1)"
                      explanation="Average occupation number for bosons"
                      variables={[
                        { symbol: "⟨nᵢ⟩", name: "Average occupation number" },
                        { symbol: "εᵢ", name: "Energy of state i", unit: "J" },
                        { symbol: "μ", name: "Chemical potential", unit: "J" },
                        { symbol: "k", name: "Boltzmann constant", unit: "J/K" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fermi-Dirac Distribution"
                      formula="⟨nᵢ⟩ = 1/(e^((εᵢ-μ)/kT) + 1)"
                      explanation="Average occupation number for fermions"
                      variables={[
                        { symbol: "⟨nᵢ⟩", name: "Average occupation number" },
                        { symbol: "εᵢ", name: "Energy of state i", unit: "J" },
                        { symbol: "μ", name: "Chemical potential", unit: "J" },
                        { symbol: "k", name: "Boltzmann constant", unit: "J/K" },
                        { symbol: "T", name: "Temperature", unit: "K" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fermi Energy"
                      formula="EF = (ℏ²/2m)(3π²n)^(2/3)"
                      explanation="Fermi energy for free electron gas"
                      variables={[
                        { symbol: "EF", name: "Fermi energy", unit: "J" },
                        { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                        { symbol: "m", name: "Electron mass", unit: "kg" },
                        { symbol: "n", name: "Number density", unit: "m⁻³" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "mathematical" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Mathematical Methods</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="vector-calc">
                  <AccordionTrigger className="text-sm">Vector Calculus</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Dot Product"
                      formula="A·B = |A||B|cosθ"
                      explanation="Scalar product of two vectors"
                      variables={[
                        { symbol: "A·B", name: "Dot product" },
                        { symbol: "|A|", name: "Magnitude of vector A" },
                        { symbol: "|B|", name: "Magnitude of vector B" },
                        { symbol: "θ", name: "Angle between vectors", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Cross Product"
                      formula="|A×B| = |A||B|sinθ"
                      explanation="Magnitude of vector product"
                      variables={[
                        { symbol: "|A×B|", name: "Magnitude of cross product" },
                        { symbol: "|A|", name: "Magnitude of vector A" },
                        { symbol: "|B|", name: "Magnitude of vector B" },
                        { symbol: "θ", name: "Angle between vectors", unit: "rad" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Gradient"
                      formula="∇f = (∂f/∂x)î + (∂f/∂y)ĵ + (∂f/∂z)k̂"
                      explanation="Gradient of scalar field"
                      variables={[
                        { symbol: "∇f", name: "Gradient of f" },
                        { symbol: "∂f/∂x", name: "Partial derivative with respect to x" },
                        { symbol: "∂f/∂y", name: "Partial derivative with respect to y" },
                        { symbol: "∂f/∂z", name: "Partial derivative with respect to z" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Divergence"
                      formula="∇·F = ∂Fx/∂x + ∂Fy/∂y + ∂Fz/∂z"
                      explanation="Divergence of vector field"
                      variables={[
                        { symbol: "∇·F", name: "Divergence of F" },
                        { symbol: "∂Fx/∂x", name: "Partial derivative of Fx with respect to x" },
                        { symbol: "∂Fy/∂y", name: "Partial derivative of Fy with respect to y" },
                        { symbol: "∂Fz/∂z", name: "Partial derivative of Fz with respect to z" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Curl"
                      formula="∇×F = (∂Fz/∂y - ∂Fy/∂z)î + (∂Fx/∂z - ∂Fz/∂x)ĵ + (∂Fy/∂x - ∂Fx/∂y)k̂"
                      explanation="Curl of vector field"
                      variables={[
                        { symbol: "∇×F", name: "Curl of F" },
                        { symbol: "∂Fx/∂y", name: "Partial derivative of Fx with respect to y" },
                        { symbol: "∂Fy/∂z", name: "Partial derivative of Fy with respect to z" },
                        { symbol: "∂Fz/∂x", name: "Partial derivative of Fz with respect to x" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="differential-eqs">
                  <AccordionTrigger className="text-sm">Differential Equations</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="First-Order Linear DE"
                      formula="dy/dx + P(x)y = Q(x)"
                      explanation="Standard form of first-order linear differential equation"
                      variables={[
                        { symbol: "dy/dx", name: "Derivative of y with respect to x" },
                        { symbol: "P(x)", name: "Coefficient function" },
                        { symbol: "Q(x)", name: "Source function" },
                        { symbol: "y", name: "Dependent variable" },
                        { symbol: "x", name: "Independent variable" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Second-Order Linear DE"
                      formula="a(x)d²y/dx² + b(x)dy/dx + c(x)y = f(x)"
                      explanation="Standard form of second-order linear differential equation"
                      variables={[
                        { symbol: "d²y/dx²", name: "Second derivative of y" },
                        { symbol: "dy/dx", name: "First derivative of y" },
                        { symbol: "a(x), b(x), c(x)", name: "Coefficient functions" },
                        { symbol: "f(x)", name: "Source function" },
                        { symbol: "y", name: "Dependent variable" },
                        { symbol: "x", name: "Independent variable" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Simple Harmonic Oscillator"
                      formula="d²x/dt² + ω²x = 0"
                      explanation="Differential equation of simple harmonic motion"
                      variables={[
                        { symbol: "d²x/dt²", name: "Second derivative of position" },
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                        { symbol: "x", name: "Position", unit: "m" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Damped Harmonic Oscillator"
                      formula="d²x/dt² + 2βdx/dt + ω₀²x = 0"
                      explanation="Differential equation of damped harmonic motion"
                      variables={[
                        { symbol: "d²x/dt²", name: "Second derivative of position" },
                        { symbol: "dx/dt", name: "First derivative of position" },
                        { symbol: "β", name: "Damping coefficient", unit: "s⁻¹" },
                        { symbol: "ω₀", name: "Natural frequency", unit: "rad/s" },
                        { symbol: "x", name: "Position", unit: "m" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="series">
                  <AccordionTrigger className="text-sm">Series & Transforms</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Taylor Series"
                      formula="f(x) = f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + ..."
                      explanation="Expansion of function around point a"
                      variables={[
                        { symbol: "f(x)", name: "Function" },
                        { symbol: "f(a)", name: "Function value at a" },
                        { symbol: "f'(a)", name: "First derivative at a" },
                        { symbol: "f''(a)", name: "Second derivative at a" },
                        { symbol: "x", name: "Variable" },
                        { symbol: "a", name: "Expansion point" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fourier Series"
                      formula="f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx))"
                      explanation="Periodic function as sum of sines and cosines"
                      variables={[
                        { symbol: "f(x)", name: "Periodic function" },
                        { symbol: "a₀", name: "Constant term coefficient" },
                        { symbol: "aₙ", name: "Cosine coefficient" },
                        { symbol: "bₙ", name: "Sine coefficient" },
                        { symbol: "x", name: "Variable" },
                        { symbol: "n", name: "Integer index" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Fourier Transform"
                      formula="F(ω) = ∫f(t)e^(-iωt)dt"
                      explanation="Transform from time to frequency domain"
                      variables={[
                        { symbol: "F(ω)", name: "Fourier transform" },
                        { symbol: "f(t)", name: "Original function" },
                        { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                        { symbol: "t", name: "Time", unit: "s" },
                        { symbol: "i", name: "Imaginary unit" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Laplace Transform"
                      formula="F(s) = ∫f(t)e^(-st)dt"
                      explanation="Transform for solving differential equations"
                      variables={[
                        { symbol: "F(s)", name: "Laplace transform" },
                        { symbol: "f(t)", name: "Original function" },
                        { symbol: "s", name: "Complex frequency", unit: "s⁻¹" },
                        { symbol: "t", name: "Time", unit: "s" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Mathematical Methods</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tensors">
                  <AccordionTrigger className="text-sm">Tensor Analysis</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Tensor Transformation"
                      formula="T'ᵏₗ = (∂x'ᵏ/∂xᵐ)(∂xⁿ/∂x'ₗ)Tᵐₙ"
                      explanation="Transformation law for (1,1) tensor"
                      variables={[
                        { symbol: "T'ᵏₗ", name: "Transformed tensor" },
                        { symbol: "Tᵐₙ", name: "Original tensor" },
                        { symbol: "∂x'ᵏ/∂xᵐ", name: "Jacobian of coordinate transformation" },
                        { symbol: "∂xⁿ/∂x'ₗ", name: "Inverse Jacobian" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Covariant Derivative"
                      formula="∇ᵥTᵏₗ = ∂Tᵏₗ/∂xᵛ + ΓᵏᵥₘTᵐₗ - ΓᵐᵥₗTᵏₘ"
                      explanation="Covariant derivative of (1,1) tensor"
                      variables={[
                        { symbol: "∇ᵥTᵏₗ", name: "Covariant derivative" },
                        { symbol: "∂Tᵏₗ/∂xᵛ", name: "Partial derivative" },
                        { symbol: "Γᵏᵥₘ", name: "Christoffel symbol" },
                        { symbol: "Tᵏₗ", name: "Tensor" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Metric Tensor"
                      formula="gᵢⱼ = eᵢ·eⱼ"
                      explanation="Definition of metric tensor"
                      variables={[
                        { symbol: "gᵢⱼ", name: "Metric tensor" },
                        { symbol: "eᵢ", name: "Basis vector i" },
                        { symbol: "eⱼ", name: "Basis vector j" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="complex-analysis">
                  <AccordionTrigger className="text-sm">Complex Analysis</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Cauchy-Riemann Equations"
                      formula="∂u/∂x = ∂v/∂y, ∂u/∂y = -∂v/∂x"
                      explanation="Conditions for complex differentiability"
                      variables={[
                        { symbol: "u", name: "Real part of function" },
                        { symbol: "v", name: "Imaginary part of function" },
                        { symbol: "x", name: "Real variable" },
                        { symbol: "y", name: "Imaginary variable" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Cauchy Integral Formula"
                      formula="f(z₀) = (1/2πi)∮(f(z)/(z-z₀))dz"
                      explanation="Value of function inside contour"
                      variables={[
                        { symbol: "f(z₀)", name: "Function value at z₀" },
                        { symbol: "f(z)", name: "Function on contour" },
                        { symbol: "z", name: "Complex variable" },
                        { symbol: "z₀", name: "Point inside contour" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Laurent Series"
                      formula="f(z) = Σaₙ(z-z₀)ⁿ + Σbₙ/(z-z₀)ⁿ"
                      explanation="Series expansion around singularity"
                      variables={[
                        { symbol: "f(z)", name: "Function" },
                        { symbol: "aₙ", name: "Regular part coefficients" },
                        { symbol: "bₙ", name: "Principal part coefficients" },
                        { symbol: "z", name: "Complex variable" },
                        { symbol: "z₀", name: "Expansion point" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="group-theory">
                  <AccordionTrigger className="text-sm">Group Theory</AccordionTrigger>
                  <AccordionContent>
                    <Formula
                      label="Group Axioms"
                      formula="Closure, Associativity, Identity, Inverse"
                      explanation="Properties that define a group"
                      variables={[]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Lie Group"
                      formula="[Tᵃ,Tᵇ] = ifᵃᵇᶜTᶜ"
                      explanation="Commutation relations of Lie algebra"
                      variables={[
                        { symbol: "[Tᵃ,Tᵇ]", name: "Commutator of generators" },
                        { symbol: "fᵃᵇᶜ", name: "Structure constants" },
                        { symbol: "Tᶜ", name: "Generator" },
                        { symbol: "i", name: "Imaginary unit" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "astro" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Astrophysics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Hubble's Law"
                formula="v = H₀d"
                explanation="Velocity of galaxy is proportional to distance"
                variables={[
                  { symbol: "v", name: "Velocity", unit: "km/s" },
                  { symbol: "H₀", name: "Hubble constant", unit: "km/s/Mpc" },
                  { symbol: "d", name: "Distance", unit: "Mpc" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Stellar Luminosity"
                formula="L = 4πR²σT⁴"
                explanation="Luminosity of a blackbody star"
                variables={[
                  { symbol: "L", name: "Luminosity", unit: "W" },
                  { symbol: "R", name: "Radius", unit: "m" },
                  { symbol: "σ", name: "Stefan-Boltzmann constant", unit: "W/(m²K⁴)" },
                  { symbol: "T", name: "Temperature", unit: "K" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Escape Velocity"
                formula="vₑ = √(2GM/R)"
                explanation="Minimum velocity to escape gravitational field"
                variables={[
                  { symbol: "vₑ", name: "Escape velocity", unit: "m/s" },
                  { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                  { symbol: "M", name: "Mass", unit: "kg" },
                  { symbol: "R", name: "Radius", unit: "m" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Cosmology</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Friedmann Equation"
                formula="(ȧ/a)² = (8πG/3)ρ - k/a² + Λ/3"
                explanation="Describes expansion of universe"
                variables={[
                  { symbol: "ȧ/a", name: "Hubble parameter", unit: "s⁻¹" },
                  { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                  { symbol: "ρ", name: "Energy density", unit: "J/m³" },
                  { symbol: "k", name: "Curvature parameter" },
                  { symbol: "a", name: "Scale factor" },
                  { symbol: "Λ", name: "Cosmological constant" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Critical Density"
                formula="ρc = 3H₀²/(8πG)"
                explanation="Density for flat universe"
                variables={[
                  { symbol: "ρc", name: "Critical density", unit: "kg/m³" },
                  { symbol: "H₀", name: "Hubble constant", unit: "s⁻¹" },
                  { symbol: "G", name: "Gravitational constant", unit: "m³/(kg·s²)" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "nuclear" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Nuclear Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Nuclear Binding Energy"
                formula="EB = [Zmp + (A-Z)mn - M]c²"
                explanation="Energy holding nucleus together"
                variables={[
                  { symbol: "EB", name: "Binding energy", unit: "MeV" },
                  { symbol: "Z", name: "Atomic number" },
                  { symbol: "mp", name: "Proton mass", unit: "u" },
                  { symbol: "A", name: "Mass number" },
                  { symbol: "mn", name: "Neutron mass", unit: "u" },
                  { symbol: "M", name: "Nuclear mass", unit: "u" },
                  { symbol: "c", name: "Speed of light", unit: "m/s" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Nuclear Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Bethe-Weizsäcker Formula"
                formula="EB = aᵥA - aₛA^(2/3) - aᶜZ(Z-1)/A^(1/3) - aₐ(A-2Z)²/A + δ"
                explanation="Semi-empirical mass formula"
                variables={[
                  { symbol: "EB", name: "Binding energy", unit: "MeV" },
                  { symbol: "A", name: "Mass number" },
                  { symbol: "Z", name: "Atomic number" },
                  { symbol: "aᵥ,aₛ,aᶜ,aₐ", name: "Constants" },
                  { symbol: "δ", name: "Pairing term" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "condensed" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Condensed Matter</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Drude Conductivity"
                formula="σ = ne²τ/m"
                explanation="Electrical conductivity in metals"
                variables={[
                  { symbol: "σ", name: "Conductivity", unit: "S/m" },
                  { symbol: "n", name: "Charge carrier density", unit: "m⁻³" },
                  { symbol: "e", name: "Elementary charge", unit: "C" },
                  { symbol: "τ", name: "Relaxation time", unit: "s" },
                  { symbol: "m", name: "Electron mass", unit: "kg" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Condensed Matter</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="BCS Theory Gap Equation"
                formula="Δ = 2ℏωDe^(-1/N₀V)"
                explanation="Energy gap in superconductors"
                variables={[
                  { symbol: "Δ", name: "Energy gap", unit: "eV" },
                  { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                  { symbol: "ωD", name: "Debye frequency", unit: "s⁻¹" },
                  { symbol: "N₀", name: "Density of states at Fermi level" },
                  { symbol: "V", name: "Interaction strength" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "particles" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Particle Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Rest Energy"
                formula="E₀ = mc²"
                explanation="Energy equivalent of mass"
                variables={[
                  { symbol: "E₀", name: "Rest energy", unit: "J" },
                  { symbol: "m", name: "Mass", unit: "kg" },
                  { symbol: "c", name: "Speed of light", unit: "m/s" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Particle Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Klein-Gordon Equation"
                formula="(□ + m²c²/ℏ²)φ = 0"
                explanation="Relativistic equation for spinless particles"
                variables={[
                  { symbol: "□", name: "d'Alembertian operator" },
                  { symbol: "m", name: "Mass", unit: "kg" },
                  { symbol: "c", name: "Speed of light", unit: "m/s" },
                  { symbol: "ℏ", name: "Reduced Planck constant", unit: "J·s" },
                  { symbol: "φ", name: "Scalar field" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "computation" && (
        <Accordion type="single" collapsible defaultValue={educationLevel} className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Basic Computational Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Euler Method"
                formula="y(t+h) ≈ y(t) + h·f(t,y(t))"
                explanation="Simple numerical integration"
                variables={[
                  { symbol: "y(t+h)", name: "Next value" },
                  { symbol: "y(t)", name: "Current value" },
                  { symbol: "h", name: "Step size" },
                  { symbol: "f(t,y(t))", name: "Function derivative" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Advanced Computational Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Runge-Kutta 4th Order"
                formula="y(t+h) = y(t) + (k₁ + 2k₂ + 2k₃ + k₄)/6"
                explanation="Higher accuracy numerical integration"
                variables={[
                  { symbol: "y(t+h)", name: "Next value" },
                  { symbol: "y(t)", name: "Current value" },
                  { symbol: "h", name: "Step size" },
                  { symbol: "k₁,k₂,k₃,k₄", name: "Intermediate steps" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default PhysicsFormulas;

