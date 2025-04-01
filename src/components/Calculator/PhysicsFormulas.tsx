
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Thermometer, Waves, Lightbulb, Circle, CircleArrowDown, CircleArrowUp, FileText, FlaskConical, Magnet } from "lucide-react";
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
    id: 'classical-mechanics',
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
      },
      {
        id: 'momentum',
        name: 'Linear Momentum',
        equation: 'p = mv',
        variables: [
          { symbol: 'p', name: 'Momentum', unit: 'kg·m/s' },
          { symbol: 'm', name: 'Mass', unit: 'kg' },
          { symbol: 'v', name: 'Velocity', unit: 'm/s' }
        ],
        description: 'Calculates the linear momentum of an object',
        calculateResult: (values) => {
          const result = values.m * values.v;
          return {
            result,
            unit: 'kg·m/s',
            steps: [
              `Start with the equation: p = mv`,
              `Substitute values: p = ${values.m} × ${values.v}`,
              `Calculate: p = ${result} kg·m/s`
            ]
          };
        }
      },
      {
        id: 'kinetic-energy',
        name: 'Kinetic Energy',
        equation: 'KE = ½mv²',
        variables: [
          { symbol: 'KE', name: 'Kinetic energy', unit: 'J' },
          { symbol: 'm', name: 'Mass', unit: 'kg' },
          { symbol: 'v', name: 'Velocity', unit: 'm/s' }
        ],
        description: 'Calculates the kinetic energy of a moving object',
        calculateResult: (values) => {
          const result = 0.5 * values.m * Math.pow(values.v, 2);
          return {
            result,
            unit: 'J',
            steps: [
              `Start with the equation: KE = ½mv²`,
              `Substitute values: KE = 0.5 × ${values.m} × (${values.v})²`,
              `Calculate: KE = 0.5 × ${values.m} × ${Math.pow(values.v, 2)}`,
              `KE = ${result} J`
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
      },
      {
        id: 'first-law',
        name: 'First Law of Thermodynamics',
        equation: 'ΔU = Q - W',
        variables: [
          { symbol: 'ΔU', name: 'Change in internal energy', unit: 'J' },
          { symbol: 'Q', name: 'Heat added to system', unit: 'J' },
          { symbol: 'W', name: 'Work done by system', unit: 'J' }
        ],
        description: 'Relates the change in internal energy to heat and work',
        calculateResult: (values) => {
          const result = values.Q - values.W;
          return {
            result,
            unit: 'J',
            steps: [
              `Start with the equation: ΔU = Q - W`,
              `Substitute values: ΔU = ${values.Q} - ${values.W}`,
              `Calculate: ΔU = ${result} J`
            ]
          };
        }
      },
      {
        id: 'entropy-change',
        name: 'Entropy Change',
        equation: 'ΔS = Q/T',
        variables: [
          { symbol: 'ΔS', name: 'Change in entropy', unit: 'J/K' },
          { symbol: 'Q', name: 'Heat transferred', unit: 'J' },
          { symbol: 'T', name: 'Absolute temperature', unit: 'K' }
        ],
        description: 'Calculates the change in entropy for a reversible process',
        calculateResult: (values) => {
          const result = values.Q / values.T;
          return {
            result,
            unit: 'J/K',
            steps: [
              `Start with the equation: ΔS = Q/T`,
              `Substitute values: ΔS = ${values.Q} / ${values.T}`,
              `Calculate: ΔS = ${result} J/K`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'waves-optics',
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
      },
      {
        id: 'thin-lens',
        name: 'Thin Lens Equation',
        equation: '1/f = 1/d₀ + 1/d᷎',
        variables: [
          { symbol: 'f', name: 'Focal length', unit: 'm' },
          { symbol: 'd₀', name: 'Object distance', unit: 'm' },
          { symbol: 'd᷎', name: 'Image distance', unit: 'm' }
        ],
        description: 'Relates the focal length of a lens to object and image distances',
        calculateResult: (values) => {
          if (!values.f && values['d₀'] && values['d᷎']) {
            const result = 1 / (1/values['d₀'] + 1/values['d᷎']);
            return {
              result,
              unit: 'm',
              steps: [
                `Start with the equation: 1/f = 1/d₀ + 1/d᷎`,
                `Rearrange to find f: f = 1/(1/d₀ + 1/d᷎)`,
                `Substitute values: f = 1/(1/${values['d₀']} + 1/${values['d᷎']})`,
                `Calculate: f = 1/(${1/values['d₀'] + 1/values['d᷎']})`,
                `f = ${result} m`
              ]
            };
          } else if (values.f && !values['d₀'] && values['d᷎']) {
            const result = 1 / (1/values.f - 1/values['d᷎']);
            return {
              result,
              unit: 'm',
              steps: [
                `Start with the equation: 1/f = 1/d₀ + 1/d᷎`,
                `Rearrange to find d₀: 1/d₀ = 1/f - 1/d᷎`,
                `d₀ = 1/(1/f - 1/d᷎)`,
                `Substitute values: d₀ = 1/(1/${values.f} - 1/${values['d᷎']})`,
                `Calculate: d₀ = 1/(${1/values.f - 1/values['d᷎']})`,
                `d₀ = ${result} m`
              ]
            };
          } else {
            const result = 1 / (1/values.f - 1/values['d₀']);
            return {
              result,
              unit: 'm',
              steps: [
                `Start with the equation: 1/f = 1/d₀ + 1/d᷎`,
                `Rearrange to find d᷎: 1/d᷎ = 1/f - 1/d₀`,
                `d᷎ = 1/(1/f - 1/d₀)`,
                `Substitute values: d᷎ = 1/(1/${values.f} - 1/${values['d₀']})`,
                `Calculate: d᷎ = 1/(${1/values.f - 1/values['d₀']})`,
                `d᷎ = ${result} m`
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
      },
      {
        id: 'coulombs-law',
        name: 'Coulomb\'s Law',
        equation: 'F = k(q₁q₂/r²)',
        variables: [
          { symbol: 'F', name: 'Electric force', unit: 'N' },
          { symbol: 'k', name: 'Coulomb constant', unit: 'N·m²/C²', defaultValue: 8.9875e9 },
          { symbol: 'q₁', name: 'Charge 1', unit: 'C' },
          { symbol: 'q₂', name: 'Charge 2', unit: 'C' },
          { symbol: 'r', name: 'Distance', unit: 'm' }
        ],
        description: 'Calculates the electrostatic force between two charges',
        calculateResult: (values) => {
          const result = values.k * (values['q₁'] * values['q₂']) / Math.pow(values.r, 2);
          return {
            result,
            unit: 'N',
            steps: [
              `Start with the equation: F = k(q₁q₂/r²)`,
              `Substitute values: F = ${values.k} × (${values['q₁']} × ${values['q₂']} / ${values.r}²)`,
              `Calculate: F = ${values.k} × (${values['q₁'] * values['q₂']} / ${Math.pow(values.r, 2)})`,
              `F = ${result} N`
            ]
          };
        }
      },
      {
        id: 'magnetic-force',
        name: 'Magnetic Force on Moving Charge',
        equation: 'F = qvBsin(θ)',
        variables: [
          { symbol: 'F', name: 'Magnetic force', unit: 'N' },
          { symbol: 'q', name: 'Charge', unit: 'C' },
          { symbol: 'v', name: 'Velocity', unit: 'm/s' },
          { symbol: 'B', name: 'Magnetic field', unit: 'T' },
          { symbol: 'θ', name: 'Angle', unit: '°' }
        ],
        description: 'Calculates the magnetic force on a moving charge',
        calculateResult: (values) => {
          const thetaRad = values['θ'] * Math.PI / 180;
          const result = Math.abs(values.q) * values.v * values.B * Math.sin(thetaRad);
          return {
            result,
            unit: 'N',
            steps: [
              `Start with the equation: F = qvBsin(θ)`,
              `Substitute values: F = ${values.q} × ${values.v} × ${values.B} × sin(${values['θ']}°)`,
              `Calculate: F = ${values.q} × ${values.v} × ${values.B} × ${Math.sin(thetaRad).toFixed(4)}`,
              `F = ${result} N`
            ]
          };
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
      },
      {
        id: 'photoelectric-effect',
        name: 'Photoelectric Effect',
        equation: 'KE = hf - Φ',
        variables: [
          { symbol: 'KE', name: 'Kinetic energy', unit: 'eV' },
          { symbol: 'h', name: 'Planck\'s constant', unit: 'eV·s', defaultValue: 4.136e-15 },
          { symbol: 'f', name: 'Frequency', unit: 'Hz' },
          { symbol: 'Φ', name: 'Work function', unit: 'eV' }
        ],
        description: 'Calculates the kinetic energy of photoelectrons',
        calculateResult: (values) => {
          const result = values.h * values.f - values['Φ'];
          return {
            result,
            unit: 'eV',
            steps: [
              `Start with the equation: KE = hf - Φ`,
              `Substitute values: KE = ${values.h} × ${values.f} - ${values['Φ']}`,
              `Calculate: KE = ${values.h * values.f} - ${values['Φ']}`,
              `KE = ${result} eV`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics',
    icon: Circle,
    formulas: [
      {
        id: 'uncertainty-principle',
        name: 'Heisenberg Uncertainty Principle',
        equation: 'ΔxΔp ≥ ħ/2',
        variables: [
          { symbol: 'Δx', name: 'Position uncertainty', unit: 'm' },
          { symbol: 'Δp', name: 'Momentum uncertainty', unit: 'kg·m/s' },
          { symbol: 'ħ', name: 'Reduced Planck constant', unit: 'J·s', defaultValue: 1.0545718e-34 }
        ],
        description: 'Describes the fundamental limit on precision of complementary variables',
        calculateResult: (values) => {
          if (!values['Δx'] && values['Δp'] && values['ħ']) {
            const result = values['ħ'] / (2 * values['Δp']);
            return {
              result,
              unit: 'm',
              steps: [
                `Start with the equation: ΔxΔp ≥ ħ/2`,
                `Rearrange to find Δx: Δx ≥ ħ/(2·Δp)`,
                `Substitute values: Δx ≥ ${values['ħ']} / (2 × ${values['Δp']})`,
                `Calculate: Δx ≥ ${result} m`
              ]
            };
          } else {
            const result = values['ħ'] / (2 * values['Δx']);
            return {
              result,
              unit: 'kg·m/s',
              steps: [
                `Start with the equation: ΔxΔp ≥ ħ/2`,
                `Rearrange to find Δp: Δp ≥ ħ/(2·Δx)`,
                `Substitute values: Δp ≥ ${values['ħ']} / (2 × ${values['Δx']})`,
                `Calculate: Δp ≥ ${result} kg·m/s`
              ]
            };
          }
        }
      },
      {
        id: 'schrodinger',
        name: 'Time-Independent Schrödinger Equation',
        equation: 'ĤΨ = EΨ',
        variables: [
          { symbol: 'Ĥ', name: 'Hamiltonian operator', unit: 'J' },
          { symbol: 'Ψ', name: 'Wave function', unit: '' },
          { symbol: 'E', name: 'Energy eigenvalue', unit: 'J' }
        ],
        description: 'The fundamental equation of quantum mechanics',
        calculateResult: (values) => {
          // This is mostly for display since solving Schrödinger's equation is complex
          return {
            result: values.E,
            unit: 'J',
            steps: [
              `The Schrödinger equation: ĤΨ = EΨ`,
              `This equation typically requires solving differential equations for specific potentials`,
              `For simple cases like a particle in a box: E_n = (n²π²ħ²)/(2mL²)`,
              `For the hydrogen atom: E_n = -13.6 eV/n²`,
              `Energy value: ${values.E} J`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'astrophysics',
    name: 'Astrophysics and Cosmology',
    icon: Circle,
    formulas: [
      {
        id: 'gravitational-force',
        name: 'Newton\'s Law of Gravitation',
        equation: 'F = G(m₁m₂/r²)',
        variables: [
          { symbol: 'F', name: 'Gravitational force', unit: 'N' },
          { symbol: 'G', name: 'Gravitational constant', unit: 'N·m²/kg²', defaultValue: 6.67430e-11 },
          { symbol: 'm₁', name: 'Mass 1', unit: 'kg' },
          { symbol: 'm₂', name: 'Mass 2', unit: 'kg' },
          { symbol: 'r', name: 'Distance', unit: 'm' }
        ],
        description: 'Calculates the gravitational force between two masses',
        calculateResult: (values) => {
          const result = values.G * (values['m₁'] * values['m₂']) / Math.pow(values.r, 2);
          return {
            result,
            unit: 'N',
            steps: [
              `Start with the equation: F = G(m₁m₂/r²)`,
              `Substitute values: F = ${values.G} × (${values['m₁']} × ${values['m₂']} / ${values.r}²)`,
              `Calculate: F = ${values.G} × (${values['m₁'] * values['m₂']} / ${Math.pow(values.r, 2)})`,
              `F = ${result} N`
            ]
          };
        }
      },
      {
        id: 'escape-velocity',
        name: 'Escape Velocity',
        equation: 'v_e = √(2GM/r)',
        variables: [
          { symbol: 'v_e', name: 'Escape velocity', unit: 'm/s' },
          { symbol: 'G', name: 'Gravitational constant', unit: 'N·m²/kg²', defaultValue: 6.67430e-11 },
          { symbol: 'M', name: 'Mass of celestial body', unit: 'kg' },
          { symbol: 'r', name: 'Distance from center', unit: 'm' }
        ],
        description: 'Minimum velocity needed to escape a gravitational field',
        calculateResult: (values) => {
          const result = Math.sqrt(2 * values.G * values.M / values.r);
          return {
            result,
            unit: 'm/s',
            steps: [
              `Start with the equation: v_e = √(2GM/r)`,
              `Substitute values: v_e = √(2 × ${values.G} × ${values.M} / ${values.r})`,
              `Calculate: v_e = √(${2 * values.G * values.M / values.r})`,
              `v_e = ${result} m/s`
            ]
          };
        }
      },
      {
        id: 'hubbles-law',
        name: 'Hubble\'s Law',
        equation: 'v = H₀d',
        variables: [
          { symbol: 'v', name: 'Recessional velocity', unit: 'km/s' },
          { symbol: 'H₀', name: 'Hubble constant', unit: 'km/s/Mpc', defaultValue: 70 },
          { symbol: 'd', name: 'Distance', unit: 'Mpc' }
        ],
        description: 'Relates the velocity of a galaxy to its distance from Earth',
        calculateResult: (values) => {
          const result = values['H₀'] * values.d;
          return {
            result,
            unit: 'km/s',
            steps: [
              `Start with the equation: v = H₀d`,
              `Substitute values: v = ${values['H₀']} × ${values.d}`,
              `Calculate: v = ${result} km/s`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'mathematical-physics',
    name: 'Mathematical Methods for Physics',
    icon: FileText,
    formulas: [
      {
        id: 'vector-dot-product',
        name: 'Vector Dot Product',
        equation: 'A·B = |A||B|cos(θ)',
        variables: [
          { symbol: 'A·B', name: 'Dot product', unit: 'varies' },
          { symbol: '|A|', name: 'Magnitude of A', unit: 'varies' },
          { symbol: '|B|', name: 'Magnitude of B', unit: 'varies' },
          { symbol: 'θ', name: 'Angle between vectors', unit: '°' }
        ],
        description: 'Calculates the scalar product of two vectors',
        calculateResult: (values) => {
          const thetaRad = values['θ'] * Math.PI / 180;
          const result = values['|A|'] * values['|B|'] * Math.cos(thetaRad);
          return {
            result,
            unit: 'varies',
            steps: [
              `Start with the equation: A·B = |A||B|cos(θ)`,
              `Substitute values: A·B = ${values['|A|']} × ${values['|B|']} × cos(${values['θ']}°)`,
              `Calculate: A·B = ${values['|A|']} × ${values['|B|']} × ${Math.cos(thetaRad).toFixed(4)}`,
              `A·B = ${result}`
            ]
          };
        }
      },
      {
        id: 'vector-cross-product',
        name: 'Vector Cross Product Magnitude',
        equation: '|A×B| = |A||B|sin(θ)',
        variables: [
          { symbol: '|A×B|', name: 'Cross product magnitude', unit: 'varies' },
          { symbol: '|A|', name: 'Magnitude of A', unit: 'varies' },
          { symbol: '|B|', name: 'Magnitude of B', unit: 'varies' },
          { symbol: 'θ', name: 'Angle between vectors', unit: '°' }
        ],
        description: 'Calculates the magnitude of the cross product of two vectors',
        calculateResult: (values) => {
          const thetaRad = values['θ'] * Math.PI / 180;
          const result = values['|A|'] * values['|B|'] * Math.sin(thetaRad);
          return {
            result,
            unit: 'varies',
            steps: [
              `Start with the equation: |A×B| = |A||B|sin(θ)`,
              `Substitute values: |A×B| = ${values['|A|']} × ${values['|B|']} × sin(${values['θ']}°)`,
              `Calculate: |A×B| = ${values['|A|']} × ${values['|B|']} × ${Math.sin(thetaRad).toFixed(4)}`,
              `|A×B| = ${result}`
            ]
          };
        }
      },
      {
        id: 'gradient-cartesian',
        name: 'Gradient (Cartesian)',
        equation: '∇f = (∂f/∂x)i + (∂f/∂y)j + (∂f/∂z)k',
        variables: [
          { symbol: '∂f/∂x', name: 'Partial derivative wrt x', unit: 'varies' },
          { symbol: '∂f/∂y', name: 'Partial derivative wrt y', unit: 'varies' },
          { symbol: '∂f/∂z', name: 'Partial derivative wrt z', unit: 'varies' }
        ],
        description: 'Calculates the gradient vector from partial derivatives',
        calculateResult: (values) => {
          return {
            result: 0, // Just a placeholder
            unit: 'varies',
            steps: [
              `The gradient is a vector: ∇f = (∂f/∂x)i + (∂f/∂y)j + (∂f/∂z)k`,
              `Components: (${values['∂f/∂x']}, ${values['∂f/∂y']}, ${values['∂f/∂z']})`,
              `For example, the gradient of f(x,y,z) = x²y + yz is (2xy, x² + z, y)`
            ]
          };
        }
      }
    ]
  },
  {
    id: 'nuclear-physics',
    name: 'Nuclear Physics',
    icon: FlaskConical,
    formulas: [
      {
        id: 'binding-energy',
        name: 'Nuclear Binding Energy',
        equation: 'E_B = [Zm_p + (A-Z)m_n - m_N]c²',
        variables: [
          { symbol: 'E_B', name: 'Binding energy', unit: 'MeV' },
          { symbol: 'Z', name: 'Atomic number', unit: '' },
          { symbol: 'A', name: 'Mass number', unit: '' },
          { symbol: 'm_p', name: 'Proton mass', unit: 'u', defaultValue: 1.007825 },
          { symbol: 'm_n', name: 'Neutron mass', unit: 'u', defaultValue: 1.008665 },
          { symbol: 'm_N', name: 'Nuclear mass', unit: 'u' }
        ],
        description: 'Calculates the binding energy of a nucleus',
        calculateResult: (values) => {
          // Convert to MeV using E=mc²
          const c2 = 931.494; // MeV/u
          const massDefect = values.Z * values.m_p + (values.A - values.Z) * values.m_n - values.m_N;
          const result = massDefect * c2;
          return {
            result,
            unit: 'MeV',
            steps: [
              `Start with the equation: E_B = [Zm_p + (A-Z)m_n - m_N]c²`,
              `Substitute values: E_B = [${values.Z} × ${values.m_p} + (${values.A} - ${values.Z}) × ${values.m_n} - ${values.m_N}]c²`,
              `Calculate mass defect: Δm = ${massDefect} u`,
              `Convert to energy: E_B = ${massDefect} × ${c2} = ${result} MeV`
            ]
          };
        }
      },
      {
        id: 'radioactive-decay',
        name: 'Radioactive Decay Law',
        equation: 'N = N₀e^(-λt)',
        variables: [
          { symbol: 'N', name: 'Number of nuclei at time t', unit: '' },
          { symbol: 'N₀', name: 'Initial number of nuclei', unit: '' },
          { symbol: 'λ', name: 'Decay constant', unit: 's⁻¹' },
          { symbol: 't', name: 'Time', unit: 's' }
        ],
        description: 'Describes how the number of undecayed nuclei changes over time',
        calculateResult: (values) => {
          if (!values.N && values['N₀'] && values['λ'] && values.t) {
            const result = values['N₀'] * Math.exp(-values['λ'] * values.t);
            return {
              result,
              unit: '',
              steps: [
                `Start with the equation: N = N₀e^(-λt)`,
                `Substitute values: N = ${values['N₀']} × e^(-${values['λ']} × ${values.t})`,
                `Calculate: N = ${values['N₀']} × ${Math.exp(-values['λ'] * values.t).toFixed(6)}`,
                `N = ${result}`
              ]
            };
          } else if (values.N && !values['N₀'] && values['λ'] && values.t) {
            const result = values.N / Math.exp(-values['λ'] * values.t);
            return {
              result,
              unit: '',
              steps: [
                `Start with the equation: N = N₀e^(-λt)`,
                `Rearrange to find N₀: N₀ = N/e^(-λt)`,
                `Substitute values: N₀ = ${values.N} / e^(-${values['λ']} × ${values.t})`,
                `Calculate: N₀ = ${values.N} / ${Math.exp(-values['λ'] * values.t).toFixed(6)}`,
                `N₀ = ${result}`
              ]
            };
          } else if (values.N && values['N₀'] && !values['λ'] && values.t) {
            const result = -Math.log(values.N / values['N₀']) / values.t;
            return {
              result,
              unit: 's⁻¹',
              steps: [
                `Start with the equation: N = N₀e^(-λt)`,
                `Rearrange to find λ: λ = -ln(N/N₀)/t`,
                `Substitute values: λ = -ln(${values.N}/${values['N₀']}) / ${values.t}`,
                `Calculate: λ = ${result} s⁻¹`
              ]
            };
          } else {
            const result = -Math.log(values.N / values['N₀']) / values['λ'];
            return {
              result,
              unit: 's',
              steps: [
                `Start with the equation: N = N₀e^(-λt)`,
                `Rearrange to find t: t = -ln(N/N₀)/λ`,
                `Substitute values: t = -ln(${values.N}/${values['N₀']}) / ${values['λ']}`,
                `Calculate: t = ${result} s`
              ]
            };
          }
        }
      },
      {
        id: 'half-life',
        name: 'Half-Life',
        equation: 't₁/₂ = ln(2)/λ',
        variables: [
          { symbol: 't₁/₂', name: 'Half-life', unit: 's' },
          { symbol: 'λ', name: 'Decay constant', unit: 's⁻¹' }
        ],
        description: 'Relates the half-life to the decay constant',
        calculateResult: (values) => {
          if (!values['t₁/₂'] && values['λ']) {
            const result = Math.log(2) / values['λ'];
            return {
              result,
              unit: 's',
              steps: [
                `Start with the equation: t₁/₂ = ln(2)/λ`,
                `Substitute values: t₁/₂ = ${Math.log(2).toFixed(6)} / ${values['λ']}`,
                `Calculate: t₁/₂ = ${result} s`
              ]
            };
          } else {
            const result = Math.log(2) / values['t₁/₂'];
            return {
              result,
              unit: 's⁻¹',
              steps: [
                `Start with the equation: t₁/₂ = ln(2)/λ`,
                `Rearrange to find λ: λ = ln(2)/t₁/₂`,
                `Substitute values: λ = ${Math.log(2).toFixed(6)} / ${values['t₁/₂']}`,
                `Calculate: λ = ${result} s⁻¹`
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

