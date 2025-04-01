
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Thermometer, Waves, Lightbulb, Circle, CircleArrowDown, CircleArrowUp, FileText, Flask, Magnet } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  defaultValue?: number;
}

interface Formula {
  id: string;
  name: string;
  equation: string;
  variables: FormulaVariable[];
  description: string;
  calculateResult: (values: Record<string, number>) => { result: number; unit: string; steps: string[] };
}

interface PhysicsTopic {
  id: string;
  name: string;
  icon: React.ElementType;
  formulas: Formula[];
}

// Define physics topics with their formulas
const physicsTopics: PhysicsTopic[] = [
  {
    id: 'mechanics',
    name: 'Classical Mechanics',
    icon: Calculator,
    formulas: [
      {
        id: 'kinematics-velocity',
        name: 'Final Velocity',
        equation: 'v = u + at',
        variables: [
          { symbol: 'v', name: 'Final velocity', unit: 'm/s' },
          { symbol: 'u', name: 'Initial velocity', unit: 'm/s' },
          { symbol: 'a', name: 'Acceleration', unit: 'm/s²' },
          { symbol: 't', name: 'Time', unit: 's' }
        ],
        description: 'Calculates the final velocity of an object with constant acceleration',
        calculateResult: (values) => {
          const result = values.u + values.a * values.t;
          return {
            result,
            unit: 'm/s',
            steps: [
              `Start with the equation: v = u + at`,
              `Substitute values: v = ${values.u} + ${values.a} × ${values.t}`,
              `Calculate: v = ${result} m/s`
            ]
          };
        }
      },
      {
        id: 'kinematics-displacement',
        name: 'Displacement',
        equation: 's = ut + ½at²',
        variables: [
          { symbol: 's', name: 'Displacement', unit: 'm' },
          { symbol: 'u', name: 'Initial velocity', unit: 'm/s' },
          { symbol: 'a', name: 'Acceleration', unit: 'm/s²' },
          { symbol: 't', name: 'Time', unit: 's' }
        ],
        description: 'Calculates the displacement of an object with constant acceleration',
        calculateResult: (values) => {
          const result = values.u * values.t + 0.5 * values.a * Math.pow(values.t, 2);
          return {
            result,
            unit: 'm',
            steps: [
              `Start with the equation: s = ut + ½at²`,
              `Substitute values: s = ${values.u} × ${values.t} + 0.5 × ${values.a} × ${values.t}²`,
              `Calculate: s = ${values.u * values.t} + ${0.5 * values.a * Math.pow(values.t, 2)}`,
              `s = ${result} m`
            ]
          };
        }
      },
      {
        id: 'newton-second-law',
        name: 'Newton\'s Second Law',
        equation: 'F = ma',
        variables: [
          { symbol: 'F', name: 'Force', unit: 'N' },
          { symbol: 'm', name: 'Mass', unit: 'kg' },
          { symbol: 'a', name: 'Acceleration', unit: 'm/s²' }
        ],
        description: 'Calculates the force required to accelerate an object',
        calculateResult: (values) => {
          const result = values.m * values.a;
          return {
            result,
            unit: 'N',
            steps: [
              `Start with the equation: F = ma`,
              `Substitute values: F = ${values.m} × ${values.a}`,
              `Calculate: F = ${result} N`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    icon: Thermometer,
    formulas: [
      {
        id: 'ideal-gas-law',
        name: 'Ideal Gas Law',
        equation: 'PV = nRT',
        variables: [
          { symbol: 'P', name: 'Pressure', unit: 'Pa' },
          { symbol: 'V', name: 'Volume', unit: 'm³' },
          { symbol: 'n', name: 'Amount of substance', unit: 'mol' },
          { symbol: 'R', name: 'Gas constant', unit: 'J/(mol·K)', defaultValue: 8.314 },
          { symbol: 'T', name: 'Temperature', unit: 'K' }
        ],
        description: 'Relates pressure, volume, amount, and temperature of an ideal gas',
        calculateResult: (values) => {
          // We'll solve for whichever variable is missing
          if (!values.P && values.V && values.n && values.R && values.T) {
            const result = (values.n * values.R * values.T) / values.V;
            return {
              result,
              unit: 'Pa',
              steps: [
                `Start with the equation: PV = nRT`,
                `Rearrange to find P: P = nRT/V`,
                `Substitute values: P = ${values.n} × ${values.R} × ${values.T} / ${values.V}`,
                `Calculate: P = ${result} Pa`
              ]
            };
          } else if (values.P && !values.V && values.n && values.R && values.T) {
            const result = (values.n * values.R * values.T) / values.P;
            return {
              result,
              unit: 'm³',
              steps: [
                `Start with the equation: PV = nRT`,
                `Rearrange to find V: V = nRT/P`,
                `Substitute values: V = ${values.n} × ${values.R} × ${values.T} / ${values.P}`,
                `Calculate: V = ${result} m³`
              ]
            };
          } else if (values.P && values.V && !values.n && values.R && values.T) {
            const result = (values.P * values.V) / (values.R * values.T);
            return {
              result,
              unit: 'mol',
              steps: [
                `Start with the equation: PV = nRT`,
                `Rearrange to find n: n = PV/RT`,
                `Substitute values: n = ${values.P} × ${values.V} / (${values.R} × ${values.T})`,
                `Calculate: n = ${result} mol`
              ]
            };
          } else if (values.P && values.V && values.n && values.R && !values.T) {
            const result = (values.P * values.V) / (values.n * values.R);
            return {
              result,
              unit: 'K',
              steps: [
                `Start with the equation: PV = nRT`,
                `Rearrange to find T: T = PV/nR`,
                `Substitute values: T = ${values.P} × ${values.V} / (${values.n} × ${values.R})`,
                `Calculate: T = ${result} K`
              ]
            };
          } else {
            const result = (values.P * values.V) / (values.n * values.T);
            return {
              result,
              unit: 'J/(mol·K)',
              steps: [
                `Start with the equation: PV = nRT`,
                `Rearrange to find R: R = PV/nT`,
                `Substitute values: R = ${values.P} × ${values.V} / (${values.n} × ${values.T})`,
                `Calculate: R = ${result} J/(mol·K)`
              ]
            };
          }
        }
      },
      {
        id: 'heat-transfer',
        name: 'Heat Transfer',
        equation: 'Q = mcΔT',
        variables: [
          { symbol: 'Q', name: 'Heat energy', unit: 'J' },
          { symbol: 'm', name: 'Mass', unit: 'kg' },
          { symbol: 'c', name: 'Specific heat capacity', unit: 'J/(kg·K)' },
          { symbol: 'ΔT', name: 'Temperature change', unit: 'K' }
        ],
        description: 'Calculates the heat energy transferred to an object',
        calculateResult: (values) => {
          const result = values.m * values.c * values['ΔT'];
          return {
            result,
            unit: 'J',
            steps: [
              `Start with the equation: Q = mcΔT`,
              `Substitute values: Q = ${values.m} × ${values.c} × ${values['ΔT']}`,
              `Calculate: Q = ${result} J`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'waves',
    name: 'Waves and Optics',
    icon: Waves,
    formulas: [
      {
        id: 'wave-speed',
        name: 'Wave Speed',
        equation: 'v = fλ',
        variables: [
          { symbol: 'v', name: 'Wave speed', unit: 'm/s' },
          { symbol: 'f', name: 'Frequency', unit: 'Hz' },
          { symbol: 'λ', name: 'Wavelength', unit: 'm' }
        ],
        description: 'Calculates the speed of a wave',
        calculateResult: (values) => {
          const result = values.f * values['λ'];
          return {
            result,
            unit: 'm/s',
            steps: [
              `Start with the equation: v = fλ`,
              `Substitute values: v = ${values.f} × ${values['λ']}`,
              `Calculate: v = ${result} m/s`
            ]
          };
        }
      },
      {
        id: 'snells-law',
        name: 'Snell\'s Law',
        equation: 'n₁sin(θ₁) = n₂sin(θ₂)',
        variables: [
          { symbol: 'n₁', name: 'Refractive index 1', unit: '' },
          { symbol: 'θ₁', name: 'Angle of incidence', unit: '°' },
          { symbol: 'n₂', name: 'Refractive index 2', unit: '' },
          { symbol: 'θ₂', name: 'Angle of refraction', unit: '°' }
        ],
        description: 'Relates the angles of incidence and refraction when light passes between media',
        calculateResult: (values) => {
          // Convert degrees to radians for calculation
          const theta1Rad = values['θ₁'] * Math.PI / 180;
          
          // If θ₂ is missing, calculate it
          if (!values['θ₂'] && values['n₁'] && values['n₂']) {
            const sinTheta2 = (values['n₁'] * Math.sin(theta1Rad)) / values['n₂'];
            // Check if total internal reflection occurs
            if (sinTheta2 > 1 && values['n₁'] > values['n₂']) {
              return {
                result: 90,
                unit: '°',
                steps: [
                  `Start with the equation: n₁sin(θ₁) = n₂sin(θ₂)`,
                  `Substitute values: ${values['n₁']} × sin(${values['θ₁']}°) = ${values['n₂']} × sin(θ₂)`,
                  `Calculate: ${values['n₁']} × ${Math.sin(theta1Rad).toFixed(4)} = ${values['n₂']} × sin(θ₂)`,
                  `sin(θ₂) = ${sinTheta2.toFixed(4)} > 1`,
                  `Total internal reflection occurs (no refraction)`
                ]
              };
            }
            
            const theta2Rad = Math.asin(sinTheta2);
            const result = theta2Rad * 180 / Math.PI;
            return {
              result,
              unit: '°',
              steps: [
                `Start with the equation: n₁sin(θ₁) = n₂sin(θ₂)`,
                `Rearrange to find sin(θ₂): sin(θ₂) = (n₁/n₂)sin(θ₁)`,
                `Substitute values: sin(θ₂) = (${values['n₁']}/${values['n₂']}) × sin(${values['θ₁']}°)`,
                `Calculate: sin(θ₂) = ${sinTheta2.toFixed(4)}`,
                `θ₂ = ${result.toFixed(2)}°`
              ]
            };
          } else if (!values['n₂'] && values['n₁'] && values['θ₁'] && values['θ₂']) {
            const theta2Rad = values['θ₂'] * Math.PI / 180;
            const result = values['n₁'] * Math.sin(theta1Rad) / Math.sin(theta2Rad);
            return {
              result,
              unit: '',
              steps: [
                `Start with the equation: n₁sin(θ₁) = n₂sin(θ₂)`,
                `Rearrange to find n₂: n₂ = n₁sin(θ₁)/sin(θ₂)`,
                `Substitute values: n₂ = ${values['n₁']} × sin(${values['θ₁']}°) / sin(${values['θ₂']}°)`,
                `Calculate: n₂ = ${values['n₁']} × ${Math.sin(theta1Rad).toFixed(4)} / ${Math.sin(theta2Rad).toFixed(4)}`,
                `n₂ = ${result.toFixed(4)}`
              ]
            };
          } else {
            // Default case, assume we want to find θ₂
            const sinTheta2 = (values['n₁'] * Math.sin(theta1Rad)) / values['n₂'];
            const theta2Rad = Math.asin(sinTheta2);
            const result = theta2Rad * 180 / Math.PI;
            return {
              result,
              unit: '°',
              steps: [
                `Start with the equation: n₁sin(θ₁) = n₂sin(θ₂)`,
                `Rearrange to find θ₂: θ₂ = sin⁻¹((n₁/n₂)sin(θ₁))`,
                `Substitute values: θ₂ = sin⁻¹((${values['n₁']}/${values['n₂']}) × sin(${values['θ₁']}°))`,
                `Calculate: θ₂ = ${result.toFixed(2)}°`
              ]
            };
          }
        }
      }
    ]
  },
  {
    id: 'electromagnetism',
    name: 'Electricity and Magnetism',
    icon: Magnet,
    formulas: [
      {
        id: 'ohms-law',
        name: 'Ohm\'s Law',
        equation: 'V = IR',
        variables: [
          { symbol: 'V', name: 'Voltage', unit: 'V' },
          { symbol: 'I', name: 'Current', unit: 'A' },
          { symbol: 'R', name: 'Resistance', unit: 'Ω' }
        ],
        description: 'Relates voltage, current, and resistance in an electrical circuit',
        calculateResult: (values) => {
          if (!values.V && values.I && values.R) {
            const result = values.I * values.R;
            return {
              result,
              unit: 'V',
              steps: [
                `Start with the equation: V = IR`,
                `Substitute values: V = ${values.I} × ${values.R}`,
                `Calculate: V = ${result} V`
              ]
            };
          } else if (values.V && !values.I && values.R) {
            const result = values.V / values.R;
            return {
              result,
              unit: 'A',
              steps: [
                `Start with the equation: V = IR`,
                `Rearrange to find I: I = V/R`,
                `Substitute values: I = ${values.V} / ${values.R}`,
                `Calculate: I = ${result} A`
              ]
            };
          } else {
            const result = values.V / values.I;
            return {
              result,
              unit: 'Ω',
              steps: [
                `Start with the equation: V = IR`,
                `Rearrange to find R: R = V/I`,
                `Substitute values: R = ${values.V} / ${values.I}`,
                `Calculate: R = ${result} Ω`
              ]
            };
          }
        }
      },
      {
        id: 'electric-power',
        name: 'Electric Power',
        equation: 'P = VI',
        variables: [
          { symbol: 'P', name: 'Power', unit: 'W' },
          { symbol: 'V', name: 'Voltage', unit: 'V' },
          { symbol: 'I', name: 'Current', unit: 'A' }
        ],
        description: 'Calculates the power in an electrical circuit',
        calculateResult: (values) => {
          if (!values.P && values.V && values.I) {
            const result = values.V * values.I;
            return {
              result,
              unit: 'W',
              steps: [
                `Start with the equation: P = VI`,
                `Substitute values: P = ${values.V} × ${values.I}`,
                `Calculate: P = ${result} W`
              ]
            };
          } else if (values.P && !values.V && values.I) {
            const result = values.P / values.I;
            return {
              result,
              unit: 'V',
              steps: [
                `Start with the equation: P = VI`,
                `Rearrange to find V: V = P/I`,
                `Substitute values: V = ${values.P} / ${values.I}`,
                `Calculate: V = ${result} V`
              ]
            };
          } else {
            const result = values.P / values.V;
            return {
              result,
              unit: 'A',
              steps: [
                `Start with the equation: P = VI`,
                `Rearrange to find I: I = P/V`,
                `Substitute values: I = ${values.P} / ${values.V}`,
                `Calculate: I = ${result} A`
              ]
            };
          }
        }
      }
    ]
  },
  {
    id: 'modern-physics',
    name: 'Modern Physics',
    icon: Lightbulb,
    formulas: [
      {
        id: 'energy-mass',
        name: 'Mass-Energy Equivalence',
        equation: 'E = mc²',
        variables: [
          { symbol: 'E', name: 'Energy', unit: 'J' },
          { symbol: 'm', name: 'Mass', unit: 'kg' },
          { symbol: 'c', name: 'Speed of light', unit: 'm/s', defaultValue: 299792458 }
        ],
        description: 'Einstein\'s famous equation relating energy and mass',
        calculateResult: (values) => {
          if (!values.E && values.m && values.c) {
            const result = values.m * Math.pow(values.c, 2);
            return {
              result,
              unit: 'J',
              steps: [
                `Start with the equation: E = mc²`,
                `Substitute values: E = ${values.m} × (${values.c})²`,
                `Calculate: E = ${values.m} × ${Math.pow(values.c, 2)}`,
                `E = ${result} J`
              ]
            };
          } else if (values.E && !values.m && values.c) {
            const result = values.E / Math.pow(values.c, 2);
            return {
              result,
              unit: 'kg',
              steps: [
                `Start with the equation: E = mc²`,
                `Rearrange to find m: m = E/c²`,
                `Substitute values: m = ${values.E} / (${values.c})²`,
                `Calculate: m = ${values.E} / ${Math.pow(values.c, 2)}`,
                `m = ${result} kg`
              ]
            };
          } else {
            const result = Math.sqrt(values.E / values.m);
            return {
              result,
              unit: 'm/s',
              steps: [
                `Start with the equation: E = mc²`,
                `Rearrange to find c: c = √(E/m)`,
                `Substitute values: c = √(${values.E} / ${values.m})`,
                `Calculate: c = ${result} m/s`
              ]
            };
          }
        }
      },
      {
        id: 'de-broglie',
        name: 'De Broglie Wavelength',
        equation: 'λ = h/p',
        variables: [
          { symbol: 'λ', name: 'Wavelength', unit: 'm' },
          { symbol: 'h', name: 'Planck\'s constant', unit: 'J·s', defaultValue: 6.626e-34 },
          { symbol: 'p', name: 'Momentum', unit: 'kg·m/s' }
        ],
        description: 'Relates the momentum of a particle to its wavelength',
        calculateResult: (values) => {
          if (!values['λ'] && values.h && values.p) {
            const result = values.h / values.p;
            return {
              result,
              unit: 'm',
              steps: [
                `Start with the equation: λ = h/p`,
                `Substitute values: λ = ${values.h} / ${values.p}`,
                `Calculate: λ = ${result} m`
              ]
            };
          } else if (values['λ'] && !values.h && values.p) {
            const result = values['λ'] * values.p;
            return {
              result,
              unit: 'J·s',
              steps: [
                `Start with the equation: λ = h/p`,
                `Rearrange to find h: h = λp`,
                `Substitute values: h = ${values['λ']} × ${values.p}`,
                `Calculate: h = ${result} J·s`
              ]
            };
          } else {
            const result = values.h / values['λ'];
            return {
              result,
              unit: 'kg·m/s',
              steps: [
                `Start with the equation: λ = h/p`,
                `Rearrange to find p: p = h/λ`,
                `Substitute values: p = ${values.h} / ${values['λ']}`,
                `Calculate: p = ${result} kg·m/s`
              ]
            };
          }
        }
      }
    ]
  }
];

interface PhysicsFormulasProps {
  onInsertFormula: (formula: string) => void;
  className?: string;
}

const PhysicsFormulas: React.FC<PhysicsFormulasProps> = ({ onInsertFormula, className }) => {
  const [activeFormula, setActiveFormula] = useState<Formula | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, number>>({});
  const [calculationResult, setCalculationResult] = useState<{
    result: number;
    unit: string;
    steps: string[];
  } | null>(null);

  const handleFormulaSelect = (formula: Formula) => {
    setActiveFormula(formula);
    
    // Initialize variable values with defaults
    const initialValues: Record<string, number> = {};
    formula.variables.forEach(variable => {
      if (variable.defaultValue !== undefined) {
        initialValues[variable.symbol] = variable.defaultValue;
      }
    });
    setVariableValues(initialValues);
    setCalculationResult(null);
  };

  const handleVariableChange = (symbol: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setVariableValues(prev => ({
        ...prev,
        [symbol]: numValue
      }));
    } else {
      // Remove the variable if it's not a valid number
      const newValues = { ...variableValues };
      delete newValues[symbol];
      setVariableValues(newValues);
    }
  };

  const calculateFormula = () => {
    if (!activeFormula) return;
    
    try {
      // Check if we have at least n-1 variables (one can be calculated)
      const requiredVariables = activeFormula.variables.length - 1;
      const providedVariables = Object.keys(variableValues).length;
      
      if (providedVariables < requiredVariables) {
        toast.error(`Please provide at least ${requiredVariables} variables to solve the equation.`);
        return;
      }
      
      const result = activeFormula.calculateResult(variableValues);
      setCalculationResult(result);
      
      // Format the result as a string to insert
      const resultText = `${activeFormula.name}: ${result.result} ${result.unit}`;
      onInsertFormula(resultText);
    } catch (error) {
      toast.error('Error calculating formula. Check your inputs.');
      console.error(error);
    }
  };

  const insertFormulaSymbol = (formula: Formula) => {
    onInsertFormula(formula.equation);
    toast.success(`Inserted formula: ${formula.equation}`);
  };

  return (
    <div className={cn("mt-4", className)}>
      <h3 className="text-lg font-medium mb-2">Physics Formulas</h3>
      
      <Accordion type="single" collapsible className="w-full">
        {physicsTopics.map((topic) => (
          <AccordionItem key={topic.id} value={topic.id}>
            <AccordionTrigger className="hover:bg-muted/50 px-3 py-2 rounded-md">
              <div className="flex items-center gap-2">
                <topic.icon className="h-4 w-4" />
                <span>{topic.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                {topic.formulas.map((formula) => (
                  <Card key={formula.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{formula.name}</h4>
                          <div className="font-mono text-sm mt-1">{formula.equation}</div>
                        </div>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleFormulaSelect(formula)}
                              >
                                Solve
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>{formula.name}</DialogTitle>
                                <DialogDescription>
                                  {formula.description}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="py-4">
                                <div className="font-mono text-lg text-center mb-4">{formula.equation}</div>
                                
                                <div className="space-y-3">
                                  {formula.variables.map((variable) => (
                                    <div key={variable.symbol} className="flex items-center justify-between">
                                      <div>
                                        <span className="font-mono font-medium">{variable.symbol}</span>
                                        <span className="text-sm text-muted-foreground ml-2">
                                          {variable.name} ({variable.unit})
                                        </span>
                                      </div>
                                      <input
                                        type="number"
                                        className="w-24 px-2 py-1 border rounded"
                                        placeholder={variable.defaultValue?.toString() || "Value"}
                                        defaultValue={variable.defaultValue}
                                        onChange={(e) => handleVariableChange(variable.symbol, e.target.value)}
                                      />
                                    </div>
                                  ))}
                                </div>
                                
                                <Button 
                                  className="w-full mt-4" 
                                  onClick={calculateFormula}
                                >
                                  Calculate
                                </Button>
                                
                                {calculationResult && (
                                  <div className="mt-4 p-3 bg-muted/50 rounded-md">
                                    <div className="font-medium">Result: {calculationResult.result} {calculationResult.unit}</div>
                                    <div className="mt-2 text-sm">
                                      <h4 className="font-medium">Steps:</h4>
                                      <ol className="list-decimal pl-5 mt-1 space-y-1">
                                        {calculationResult.steps.map((step, index) => (
                                          <li key={index}>{step}</li>
                                        ))}
                                      </ol>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => insertFormulaSymbol(formula)}
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PhysicsFormulas;
