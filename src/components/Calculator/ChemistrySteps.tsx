
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

// Extended element interface with more detailed information
export interface ElementInfo {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: string;
  category: string;
  group: string;
  period: number;
  valenceElectrons: number;
  electronConfiguration: string;
  description: string;
}

// Comprehensive list of all chemical elements for the periodic table with detailed information
export const getAllElements = (): ElementInfo[] => {
  return [
    // Group 1 (Alkali Metals)
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: '1.008', category: 'Nonmetal', group: '1', period: 1, valenceElectrons: 1, electronConfiguration: '1s¹', description: 'Colorless, odorless gas, most abundant element in the universe' },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: '6.94', category: 'Alkali Metal', group: '1', period: 2, valenceElectrons: 1, electronConfiguration: '[He]2s¹', description: 'Soft, silvery-white metal used in batteries and psychiatric medications' },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: '22.990', category: 'Alkali Metal', group: '1', period: 3, valenceElectrons: 1, electronConfiguration: '[Ne]3s¹', description: 'Soft, silvery-white metal that reacts vigorously with water' },
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: '39.098', category: 'Alkali Metal', group: '1', period: 4, valenceElectrons: 1, electronConfiguration: '[Ar]4s¹', description: 'Soft, silvery-white metal, essential for plant and animal life' },
    { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, atomicMass: '85.468', category: 'Alkali Metal', group: '1', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]5s¹', description: 'Soft, silvery-white metal that ignites spontaneously in air' },
    { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, atomicMass: '132.91', category: 'Alkali Metal', group: '1', period: 6, valenceElectrons: 1, electronConfiguration: '[Xe]6s¹', description: 'Soft, gold-colored metal used in atomic clocks' },
    { symbol: 'Fr', name: 'Francium', atomicNumber: 87, atomicMass: '(223)', category: 'Alkali Metal', group: '1', period: 7, valenceElectrons: 1, electronConfiguration: '[Rn]7s¹', description: 'Highly radioactive, rare element with few known applications' },
    
    // Group 2 (Alkaline Earth Metals)
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: '9.0122', category: 'Alkaline Earth Metal', group: '2', period: 2, valenceElectrons: 2, electronConfiguration: '[He]2s²', description: 'Steel-gray, strong, lightweight metal used in aerospace' },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: '24.305', category: 'Alkaline Earth Metal', group: '2', period: 3, valenceElectrons: 2, electronConfiguration: '[Ne]3s²', description: 'Lightweight, silvery-white metal essential for chlorophyll' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: '40.078', category: 'Alkaline Earth Metal', group: '2', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]4s²', description: 'Soft, gray alkaline earth metal essential for bones and teeth' },
    { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, atomicMass: '87.62', category: 'Alkaline Earth Metal', group: '2', period: 5, valenceElectrons: 2, electronConfiguration: '[Kr]5s²', description: 'Soft, silvery metal that turns yellow in air, used in fireworks' },
    { symbol: 'Ba', name: 'Barium', atomicNumber: 56, atomicMass: '137.33', category: 'Alkaline Earth Metal', group: '2', period: 6, valenceElectrons: 2, electronConfiguration: '[Xe]6s²', description: 'Soft, silvery metal used in medical imaging and fireworks' },
    { symbol: 'Ra', name: 'Radium', atomicNumber: 88, atomicMass: '(226)', category: 'Alkaline Earth Metal', group: '2', period: 7, valenceElectrons: 2, electronConfiguration: '[Rn]7s²', description: 'Radioactive, silvery-white metal once used in luminous paints' },
    
    // Transition Metals (first row)
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: '44.956', category: 'Transition Metal', group: '3', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d¹4s²', description: 'Silvery-white metal used in aerospace and sports equipment' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: '47.867', category: 'Transition Metal', group: '4', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d²4s²', description: 'Strong, lightweight, corrosion-resistant metal with many applications' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: '50.942', category: 'Transition Metal', group: '5', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d³4s²', description: 'Silvery-gray metal used in steel alloys and redox flow batteries' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: '51.996', category: 'Transition Metal', group: '6', period: 4, valenceElectrons: 1, electronConfiguration: '[Ar]3d⁵4s¹', description: 'Steely-gray, lustrous metal used in stainless steel and plating' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: '54.938', category: 'Transition Metal', group: '7', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d⁵4s²', description: 'Gray-white, hard, brittle metal used in steel production' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: '55.845', category: 'Transition Metal', group: '8', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d⁶4s²', description: 'Silvery-gray, ductile metal, most common element on Earth by mass' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: '58.933', category: 'Transition Metal', group: '9', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d⁷4s²', description: 'Hard, lustrous, silver-gray metal used in magnets and batteries' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: '58.693', category: 'Transition Metal', group: '10', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d⁸4s²', description: 'Silvery-white, lustrous metal used in coins and stainless steel' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: '63.546', category: 'Transition Metal', group: '11', period: 4, valenceElectrons: 1, electronConfiguration: '[Ar]3d¹⁰4s¹', description: 'Reddish metal with high thermal and electrical conductivity' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: '65.38', category: 'Transition Metal', group: '12', period: 4, valenceElectrons: 2, electronConfiguration: '[Ar]3d¹⁰4s²', description: 'Bluish-white metal used in galvanization and batteries' },
    
    // More Transition Metals (additional rows)
    { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, atomicMass: '88.906', category: 'Transition Metal', group: '3', period: 5, valenceElectrons: 2, electronConfiguration: '[Kr]4d¹5s²', description: 'Silvery-metallic transition metal used in LED lights' },
    { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, atomicMass: '91.224', category: 'Transition Metal', group: '4', period: 5, valenceElectrons: 2, electronConfiguration: '[Kr]4d²5s²', description: 'Gray-white metal resistant to corrosion, used in nuclear reactors' },
    { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, atomicMass: '92.906', category: 'Transition Metal', group: '5', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]4d⁴5s¹', description: 'Soft, gray, ductile transition metal used in superconducting magnets' },
    { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, atomicMass: '95.95', category: 'Transition Metal', group: '6', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]4d⁵5s¹', description: 'Silvery metal with high melting point, used in steel alloys' },
    { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, atomicMass: '(98)', category: 'Transition Metal', group: '7', period: 5, valenceElectrons: 2, electronConfiguration: '[Kr]4d⁵5s²', description: 'Radioactive metal, first artificially produced element' },
    { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, atomicMass: '101.07', category: 'Transition Metal', group: '8', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]4d⁷5s¹', description: 'Hard, rare transition metal used in electronics and catalysis' },
    { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, atomicMass: '102.91', category: 'Transition Metal', group: '9', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]4d⁸5s¹', description: 'Rare, silvery-white, hard metal used in catalytic converters' },
    { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, atomicMass: '106.42', category: 'Transition Metal', group: '10', period: 5, valenceElectrons: 0, electronConfiguration: '[Kr]4d¹⁰', description: 'Rare, silvery-white metal used in catalytic converters and electronics' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: '107.87', category: 'Transition Metal', group: '11', period: 5, valenceElectrons: 1, electronConfiguration: '[Kr]4d¹⁰5s¹', description: 'Soft, white, lustrous metal with highest electrical conductivity' },
    { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, atomicMass: '112.41', category: 'Transition Metal', group: '12', period: 5, valenceElectrons: 2, electronConfiguration: '[Kr]4d¹⁰5s²', description: 'Soft, bluish-white metal, toxic and used in batteries' },
    
    // Main Group Elements (13-16)
    { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: '10.81', category: 'Metalloid', group: '13', period: 2, valenceElectrons: 3, electronConfiguration: '[He]2s²2p¹', description: 'Black, semiconductor element used in detergents and glass' },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: '26.982', category: 'Post-Transition Metal', group: '13', period: 3, valenceElectrons: 3, electronConfiguration: '[Ne]3s²3p¹', description: 'Silvery-white, soft, non-magnetic metal, widely used in packaging' },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: '69.723', category: 'Post-Transition Metal', group: '13', period: 4, valenceElectrons: 3, electronConfiguration: '[Ar]3d¹⁰4s²4p¹', description: 'Soft, silvery metal that melts near room temperature' },
    { symbol: 'In', name: 'Indium', atomicNumber: 49, atomicMass: '114.82', category: 'Post-Transition Metal', group: '13', period: 5, valenceElectrons: 3, electronConfiguration: '[Kr]4d¹⁰5s²5p¹', description: 'Soft, malleable metal used in flat-panel displays and solders' },
    { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, atomicMass: '204.38', category: 'Post-Transition Metal', group: '13', period: 6, valenceElectrons: 3, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p¹', description: 'Soft, malleable gray metal, highly toxic' },
    
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: '12.011', category: 'Nonmetal', group: '14', period: 2, valenceElectrons: 4, electronConfiguration: '[He]2s²2p²', description: 'Basis of organic chemistry, forms diverse compounds and allotropes' },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: '28.085', category: 'Metalloid', group: '14', period: 3, valenceElectrons: 4, electronConfiguration: '[Ne]3s²3p²', description: 'Hard, brittle crystalline solid used in electronics and solar cells' },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: '72.630', category: 'Metalloid', group: '14', period: 4, valenceElectrons: 4, electronConfiguration: '[Ar]3d¹⁰4s²4p²', description: 'Lustrous, hard-brittle, grayish-white metalloid used in transistors' },
    { symbol: 'Sn', name: 'Tin', atomicNumber: 50, atomicMass: '118.71', category: 'Post-Transition Metal', group: '14', period: 5, valenceElectrons: 4, electronConfiguration: '[Kr]4d¹⁰5s²5p²', description: 'Silvery, malleable metal used in solders and food packaging' },
    { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: '207.2', category: 'Post-Transition Metal', group: '14', period: 6, valenceElectrons: 4, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p²', description: 'Soft, malleable heavy metal, historically used in plumbing' },
    
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: '14.007', category: 'Nonmetal', group: '15', period: 2, valenceElectrons: 5, electronConfiguration: '[He]2s²2p³', description: 'Colorless, odorless gas that forms 78% of Earth\'s atmosphere' },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: '30.974', category: 'Nonmetal', group: '15', period: 3, valenceElectrons: 5, electronConfiguration: '[Ne]3s²3p³', description: 'Reactive nonmetal with several allotropes, essential for DNA and ATP' },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: '74.922', category: 'Metalloid', group: '15', period: 4, valenceElectrons: 5, electronConfiguration: '[Ar]3d¹⁰4s²4p³', description: 'Gray, metallic-looking metalloid, highly toxic' },
    { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, atomicMass: '121.76', category: 'Metalloid', group: '15', period: 5, valenceElectrons: 5, electronConfiguration: '[Kr]4d¹⁰5s²5p³', description: 'Lustrous gray metalloid used in flame retardants and batteries' },
    { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, atomicMass: '208.98', category: 'Post-Transition Metal', group: '15', period: 6, valenceElectrons: 5, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p³', description: 'Brittle, crystalline metal with pinkish tinge, used in cosmetics' },
    
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: '15.999', category: 'Nonmetal', group: '16', period: 2, valenceElectrons: 6, electronConfiguration: '[He]2s²2p⁴', description: 'Reactive nonmetal essential for respiration and combustion' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: '32.06', category: 'Nonmetal', group: '16', period: 3, valenceElectrons: 6, electronConfiguration: '[Ne]3s²3p⁴', description: 'Yellow crystalline solid used in gunpowder and vulcanizing rubber' },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: '78.971', category: 'Nonmetal', group: '16', period: 4, valenceElectrons: 6, electronConfiguration: '[Ar]3d¹⁰4s²4p⁴', description: 'Semiconductor with photovoltaic properties, essential trace element' },
    { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, atomicMass: '127.60', category: 'Metalloid', group: '16', period: 5, valenceElectrons: 6, electronConfiguration: '[Kr]4d¹⁰5s²5p⁴', description: 'Silvery-white metalloid used in semiconductor devices' },
    { symbol: 'Po', name: 'Polonium', atomicNumber: 84, atomicMass: '(209)', category: 'Post-Transition Metal', group: '16', period: 6, valenceElectrons: 6, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁴', description: 'Radioactive, rare element, used in anti-static devices' },
    
    // Group 17 (Halogens)
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: '18.998', category: 'Halogen', group: '17', period: 2, valenceElectrons: 7, electronConfiguration: '[He]2s²2p⁵', description: 'Pale yellow, highly reactive gas, most electronegative element' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: '35.45', category: 'Halogen', group: '17', period: 3, valenceElectrons: 7, electronConfiguration: '[Ne]3s²3p⁵', description: 'Yellow-green gas used in water purification and as disinfectant' },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: '79.904', category: 'Halogen', group: '17', period: 4, valenceElectrons: 7, electronConfiguration: '[Ar]3d¹⁰4s²4p⁵', description: 'Reddish-brown liquid halogen used in flame retardants' },
    { symbol: 'I', name: 'Iodine', atomicNumber: 53, atomicMass: '126.90', category: 'Halogen', group: '17', period: 5, valenceElectrons: 7, electronConfiguration: '[Kr]4d¹⁰5s²5p⁵', description: 'Bluish-black crystalline solid used in medicine and photography' },
    { symbol: 'At', name: 'Astatine', atomicNumber: 85, atomicMass: '(210)', category: 'Halogen', group: '17', period: 6, valenceElectrons: 7, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁵', description: 'Radioactive, rare halogen, most rare naturally occurring element' },
    
    // Group 18 (Noble Gases)
    { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: '4.0026', category: 'Noble Gas', group: '18', period: 1, valenceElectrons: 2, electronConfiguration: '1s²', description: 'Colorless, odorless gas used in balloons and cryogenics' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: '20.180', category: 'Noble Gas', group: '18', period: 2, valenceElectrons: 8, electronConfiguration: '[He]2s²2p⁶', description: 'Colorless, inert gas used in signs, produces reddish-orange glow' },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: '39.948', category: 'Noble Gas', group: '18', period: 3, valenceElectrons: 8, electronConfiguration: '[Ne]3s²3p⁶', description: 'Colorless, odorless gas, third most abundant in Earth\'s atmosphere' },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: '83.798', category: 'Noble Gas', group: '18', period: 4, valenceElectrons: 8, electronConfiguration: '[Ar]3d¹⁰4s²4p⁶', description: 'Colorless, odorless gas used in lighting and lasers' },
    { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, atomicMass: '131.29', category: 'Noble Gas', group: '18', period: 5, valenceElectrons: 8, electronConfiguration: '[Kr]4d¹⁰5s²5p⁶', description: 'Heavy, colorless, odorless gas used in lights and medical imaging' },
    { symbol: 'Rn', name: 'Radon', atomicNumber: 86, atomicMass: '(222)', category: 'Noble Gas', group: '18', period: 6, valenceElectrons: 8, electronConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁶', description: 'Radioactive, colorless gas, health hazard in some buildings' },
  ];
};

// Comprehensive list of all chemical elements for the periodic table
export const getAllElementSymbols = () => {
  return getAllElements().map(element => element.symbol);
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

// Get element info by symbol
export const getElementBySymbol = (symbol: string): ElementInfo | undefined => {
  return getAllElements().find(element => element.symbol === symbol);
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
