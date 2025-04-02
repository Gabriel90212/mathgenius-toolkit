import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChemistryResult } from "./CalculatorUtils";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChemistryStepsProps {
  result: ChemistryResult | null;
  operation: 'balance' | 'stoichiometry' | null;
  className?: string;
}

// Comprehensive list of all chemical elements for the periodic table
export const getAllElementSymbols = () => {
  return [
    // Group 1 (Alkali Metals)
    'H', 'Li', 'Na', 'K', 'Rb', 'Cs', 'Fr',
    // Group 2 (Alkaline Earth Metals)
    'Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra',
    // Transition Metals
    'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
    'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd',
    'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
    // Group 13-16 (Main Group Elements)
    'B', 'Al', 'Ga', 'In', 'Tl',
    'C', 'Si', 'Ge', 'Sn', 'Pb',
    'N', 'P', 'As', 'Sb', 'Bi',
    'O', 'S', 'Se', 'Te', 'Po',
    // Group 17 (Halogens)
    'F', 'Cl', 'Br', 'I', 'At',
    // Group 18 (Noble Gases)
    'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn',
    // Lanthanides
    'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu',
    // Actinides
    'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr',
    // Other Elements
    'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
  ];
};

// Organize elements by groups for easier selection
export const getElementGroups = () => {
  return [
    { name: 'Alkali Metals', elements: ['H', 'Li', 'Na', 'K', 'Rb', 'Cs', 'Fr'] },
    { name: 'Alkaline Earth', elements: ['Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra'] },
    { name: 'Transition Metals', elements: ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'] },
    { name: 'Post-Transition', elements: ['Al', 'Ga', 'In', 'Sn', 'Tl', 'Pb', 'Bi', 'Po'] },
    { name: 'Metalloids', elements: ['B', 'Si', 'Ge', 'As', 'Sb', 'Te'] },
    { name: 'Nonmetals', elements: ['C', 'N', 'O', 'P', 'S', 'Se'] },
    { name: 'Halogens', elements: ['F', 'Cl', 'Br', 'I', 'At'] },
    { name: 'Noble Gases', elements: ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'] },
    { name: 'Common Compounds', elements: ['H2O', 'CO2', 'NaCl', 'NH3', 'H2SO4', 'HCl', 'CH4', 'C2H5OH'] }
  ];
};

// Common elements in chemistry
export const getCommonElements = () => {
  return ['H', 'O', 'C', 'N', 'Cl', 'Na', 'K', 'Ca', 'Mg', 'Fe', 'S', 'P', 'Cu', 'Zn', 'I', 'Br', 'F', 'Al', 'Si', 'B'];
};

const ChemistrySteps: React.FC<ChemistryStepsProps> = ({ result, operation, className }) => {
  if (!result || !operation) {
    return null;
  }

  const title = operation === 'balance' ? 'Equation Balancing' : 'Stoichiometry Calculation';

  return (
    <Card className={cn("mt-4 overflow-auto max-h-64", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title} Solution</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {result.error ? (
          <div className="text-red-500">{result.error}</div>
        ) : (
          <>
            <div className="mb-3">
              <div className="text-muted-foreground">Original equation:</div>
              <div className="text-lg font-medium">{result.equation}</div>
            </div>
            
            <div className="mb-3">
              <div className="text-muted-foreground">Result:</div>
              <div className="text-xl font-medium">{result.result}</div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="steps">
                <AccordionTrigger className="text-primary">See step-by-step solution</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 py-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="border-l-2 border-primary pl-3">
                        <div className="text-sm text-muted-foreground">{step.description}</div>
                        <div className="font-mono bg-muted/50 p-1 rounded mt-1">{step.expression}</div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChemistrySteps;
