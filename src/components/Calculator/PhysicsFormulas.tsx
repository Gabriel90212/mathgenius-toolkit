import React, { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FlaskConical, Zap, Waves, CornerRightDown, Atom, Calculator, Binary, Share2, FileSymlink, FlaskConical as FlaskRound } from "lucide-react";
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
  
  // Define all categories
  const categories = [
    { id: "mechanics", name: "Classical Mechanics", icon: <CornerRightDown className="h-4 w-4" /> },
    { id: "thermodynamics", name: "Thermodynamics", icon: <FlaskConical className="h-4 w-4" /> },
    { id: "waves", name: "Waves & Optics", icon: <Waves className="h-4 w-4" /> },
    { id: "electricity", name: "Electricity & Magnetism", icon: <Zap className="h-4 w-4" /> },
    { id: "modern", name: "Modern Physics", icon: <Atom className="h-4 w-4" /> },
    { id: "quantum", name: "Quantum Mechanics", icon: <Binary className="h-4 w-4" /> },
    { id: "astrophysics", name: "Astrophysics & Cosmology", icon: <Share2 className="h-4 w-4" /> },
    { id: "mathematical", name: "Mathematical Methods", icon: <Calculator className="h-4 w-4" /> },
    { id: "nuclear", name: "Nuclear Physics", icon: <FlaskRound className="h-4 w-4" /> },
  ];
  
  return (
    <div className="max-h-[60vh] overflow-y-auto p-2 border rounded-md bg-background">
      <div className="grid grid-cols-3 gap-2 mb-4 sticky top-0 bg-background z-10 pt-1 pb-2 border-b">
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
        <Accordion type="single" collapsible defaultValue="minor" className="w-full">
          <AccordionItem value="minor">
            <AccordionTrigger className="text-base font-medium">Mechanics Minor</AccordionTrigger>
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
                      formula="Fg = Gm1m2/r²"
                      explanation="Force of gravity between two masses"
                      variables={[
                        { symbol: "Fg", name: "Gravitational Force", unit: "N" },
                        { symbol: "G", name: "Gravitational Constant", unit: "Nm²/kg²" },
                        { symbol: "m1", name: "Mass 1", unit: "kg" },
                        { symbol: "m2", name: "Mass 2", unit: "kg" },
                        { symbol: "r", name: "Distance between masses", unit: "m" },
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
                      formula="W = Fdcosθ"
                      explanation="Work done by a force over a distance"
                      variables={[
                        { symbol: "W", name: "Work", unit: "J" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "d", name: "Distance", unit: "m" },
                        { symbol: "θ", name: "Angle between force and displacement", unit: "degrees" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
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
                      label="Momentum"
                      formula="p = mv"
                      explanation="Mass in motion"
                      variables={[
                        { symbol: "p", name: "Momentum", unit: "kg m/s" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "v", name: "Velocity", unit: "m/s" },
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
                      label="Angular Acceleration"
                      formula="α = a/r"
                      explanation="Rate of change of angular velocity"
                      variables={[
                        { symbol: "α", name: "Angular Acceleration", unit: "rad/s²" },
                        { symbol: "a", name: "Tangential Acceleration", unit: "m/s²" },
                        { symbol: "r", name: "Radius of circle", unit: "m" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Torque"
                      formula="τ = rFsinθ"
                      explanation="Turning effect of a force"
                      variables={[
                        { symbol: "τ", name: "Torque", unit: "Nm" },
                        { symbol: "r", name: "Distance from axis of rotation", unit: "m" },
                        { symbol: "F", name: "Force", unit: "N" },
                        { symbol: "θ", name: "Angle between force and lever arm", unit: "degrees" },
                      ]}
                      onInsert={onInsertFormula}
                    />
                    
                    <Formula
                      label="Moment of Inertia"
                      formula="I = Σmr²"
                      explanation="Resistance to rotational motion"
                      variables={[
                        { symbol: "I", name: "Moment of Inertia", unit: "kg m²" },
                        { symbol: "m", name: "Mass", unit: "kg" },
                        { symbol: "r", name: "Distance from axis of rotation", unit: "m" },
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        
          <AccordionItem value="superior">
            <AccordionTrigger className="text-base font-medium">Mechanics Superior</AccordionTrigger>
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
                      formula="q̇ᵢ = ∂H/∂pᵢ, ṗᵢ = -∂H/∂qᵢ"
                      explanation="Equations of motion in terms of Hamiltonian"
                      variables={[
                        { symbol: "H", name: "Hamiltonian" },
                        { symbol: "pᵢ", name: "Generalized Momentum" },
                        { symbol: "q̇ᵢ", name: "Time Derivative of Generalized Coordinate" },
                        { symbol: "qᵢ", name: "Generalized Coordinate" },
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
      
      {activeCategory === "thermodynamics" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Basic Thermodynamics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Ideal Gas Law"
                formula="PV = nRT"
                explanation="Relates pressure, volume, and temperature of an ideal gas"
                variables={[
                  { symbol: "P", name: "Pressure", unit: "Pa" },
                  { symbol: "V", name: "Volume", unit: "m³" },
                  { symbol: "n", name: "Number of moles" },
                  { symbol: "R", name: "Ideal gas constant", unit: "J/(mol·K)" },
                  { symbol: "T", name: "Temperature", unit: "K" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="First Law of Thermodynamics"
                formula="ΔU = Q - W"
                explanation="Change in internal energy equals heat added minus work done"
                variables={[
                  { symbol: "ΔU", name: "Change in internal energy", unit: "J" },
                  { symbol: "Q", name: "Heat added", unit: "J" },
                  { symbol: "W", name: "Work done", unit: "J" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Work Done by Gas"
                formula="W = PΔV"
                explanation="Work done by a gas at constant pressure"
                variables={[
                  { symbol: "W", name: "Work done", unit: "J" },
                  { symbol: "P", name: "Pressure", unit: "Pa" },
                  { symbol: "ΔV", name: "Change in volume", unit: "m³" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Heat Capacity"
                formula="Q = mcΔT"
                explanation="Heat required to change temperature of a substance"
                variables={[
                  { symbol: "Q", name: "Heat", unit: "J" },
                  { symbol: "m", name: "Mass", unit: "kg" },
                  { symbol: "c", name: "Specific heat capacity", unit: "J/(kg·K)" },
                  { symbol: "ΔT", name: "Change in temperature", unit: "K" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Second Law of Thermodynamics"
                formula="ΔS ≥ 0"
                explanation="Total entropy of an isolated system always increases"
                variables={[
                  { symbol: "ΔS", name: "Change in entropy", unit: "J/K" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Efficiency of Carnot Engine"
                formula="η = 1 - (Tc/Th)"
                explanation="Maximum possible efficiency of a heat engine"
                variables={[
                  { symbol: "η", name: "Efficiency" },
                  { symbol: "Tc", name: "Cold reservoir temperature", unit: "K" },
                  { symbol: "Th", name: "Hot reservoir temperature", unit: "K" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "waves" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Basic Wave Formulas</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Wave Speed"
                formula="v = fλ"
                explanation="Speed of a wave equals frequency times wavelength"
                variables={[
                  { symbol: "v", name: "Wave speed", unit: "m/s" },
                  { symbol: "f", name: "Frequency", unit: "Hz" },
                  { symbol: "λ", name: "Wavelength", unit: "m" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Period of a Wave"
                formula="T = 1/f"
                explanation="Period is the inverse of frequency"
                variables={[
                  { symbol: "T", name: "Period", unit: "s" },
                  { symbol: "f", name: "Frequency", unit: "Hz" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Wave Number"
                formula="k = 2π/λ"
                explanation="Wave number is related to wavelength"
                variables={[
                  { symbol: "k", name: "Wave number", unit: "rad/m" },
                  { symbol: "λ", name: "Wavelength", unit: "m" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Angular Frequency"
                formula="ω = 2πf"
                explanation="Angular frequency is related to frequency"
                variables={[
                  { symbol: "ω", name: "Angular frequency", unit: "rad/s" },
                  { symbol: "f", name: "Frequency", unit: "Hz" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Intensity of a Wave"
                formula="I = P/A"
                explanation="Intensity is power per unit area"
                variables={[
                  { symbol: "I", name: "Intensity", unit: "W/m²" },
                  { symbol: "P", name: "Power", unit: "W" },
                  { symbol: "A", name: "Area", unit: "m²" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Doppler Effect"
                formula="f' = f((v ± vo)/(v ± vs))"
                explanation="Change in frequency due to relative motion"
                variables={[
                  { symbol: "f'", name: "Observed frequency", unit: "Hz" },
                  { symbol: "f", name: "Source frequency", unit: "Hz" },
                  { symbol: "v", name: "Speed of wave", unit: "m/s" },
                  { symbol: "vo", name: "Observer speed", unit: "m/s" },
                  { symbol: "vs", name: "Source speed", unit: "m/s" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "electricity" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Basic Electricity & Magnetism</AccordionTrigger>
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
                label="Electric Power"
                formula="P = IV"
                explanation="Power equals current times voltage"
                variables={[
                  { symbol: "P", name: "Power", unit: "W" },
                  { symbol: "I", name: "Current", unit: "A" },
                  { symbol: "V", name: "Voltage", unit: "V" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Coulomb's Law"
                formula="F = k(q1q2/r²)"
                explanation="Force between two electric charges"
                variables={[
                  { symbol: "F", name: "Force", unit: "N" },
                  { symbol: "k", name: "Coulomb's constant", unit: "Nm²/C²" },
                  { symbol: "q1", name: "Charge 1", unit: "C" },
                  { symbol: "q2", name: "Charge 2", unit: "C" },
                  { symbol: "r", name: "Distance between charges", unit: "m" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Electric Field"
                formula="E = F/q"
                explanation="Force per unit charge"
                variables={[
                  { symbol: "E", name: "Electric field", unit: "N/C" },
                  { symbol: "F", name: "Force", unit: "N" },
                  { symbol: "q", name: "Charge", unit: "C" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Magnetic Force on Moving Charge"
                formula="F = qvBsinθ"
                explanation="Force on a charge moving in a magnetic field"
                variables={[
                  { symbol: "F", name: "Force", unit: "N" },
                  { symbol: "q", name: "Charge", unit: "C" },
                  { symbol: "v", name: "Velocity", unit: "m/s" },
                  { symbol: "B", name: "Magnetic field", unit: "T" },
                  { symbol: "θ", name: "Angle between velocity and field", unit: "degrees" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "modern" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Basic Modern Physics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Energy-Mass Equivalence"
                formula="E = mc²"
                explanation="Energy equals mass times speed of light squared"
                variables={[
                  { symbol: "E", name: "Energy", unit: "J" },
                  { symbol: "m", name: "Mass", unit: "kg" },
                  { symbol: "c", name: "Speed of light", unit: "m/s" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="Planck's Energy"
                formula="E = hf"
                explanation="Energy of a photon"
                variables={[
                  { symbol: "E", name: "Energy", unit: "J" },
                  { symbol: "h", name: "Planck's constant", unit: "Js" },
                  { symbol: "f", name: "Frequency", unit: "Hz" },
                ]}
                onInsert={onInsertFormula}
              />
              
              <Formula
                label="De Broglie Wavelength"
                formula="λ = h/p"
                explanation="Wavelength of a particle"
                variables={[
                  { symbol: "λ", name: "Wavelength", unit: "m" },
                  { symbol: "h", name: "Planck's constant", unit: "Js" },
                  { symbol: "p", name: "Momentum", unit: "kg m/s" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {activeCategory === "quantum" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Quantum Mechanics</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Heisenberg Uncertainty Principle"
                formula="ΔxΔp ≥ ħ/2"
                explanation="Fundamental limit to the precision of certain pairs of physical quantities"
                variables={[
                  { symbol: "Δx", name: "Uncertainty in position", unit: "m" },
                  { symbol: "Δp", name: "Uncertainty in momentum", unit: "kg m/s" },
                  { symbol: "ħ", name: "Reduced Planck constant", unit: "Js" },
                ]}
                onInsert={onInsertFormula}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {activeCategory === "astrophysics" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-base font-medium">Astrophysics & Cosmology</AccordionTrigger>
            <AccordionContent>
              <Formula
                label="Hubble's Law"
                formula="v = H₀D"
                explanation="The velocity of a galaxy is proportional to its distance"
                variables={[
                  { symbol: "v", name: "Velocity of galaxy", unit: "km/s" },
