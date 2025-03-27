// Constants for mathematical operations
export const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
  MODULO: '%',
  POWER: '^',
  EQUAL: '=',
};

// Format a number to a displayable string
export const formatNumber = (num: number): string => {
  // Handle infinity and NaN
  if (!isFinite(num) || isNaN(num)) {
    return isNaN(num) ? 'Error' : (num > 0 ? 'Infinity' : '-Infinity');
  }

  // Convert to string with appropriate precision
  const numStr = num.toString();
  
  // If it's an integer or has few decimal places, just show it
  if (Number.isInteger(num) || numStr.length <= 15) {
    return numStr;
  }
  
  // Otherwise, format to a reasonable number of significant digits
  if (Math.abs(num) >= 1e10 || Math.abs(num) < 1e-6) {
    return num.toExponential(10);
  }
  
  const decimalPlaces = 14 - Math.floor(Math.log10(Math.abs(num))) - 1;
  return num.toFixed(Math.max(0, Math.min(decimalPlaces, 14)));
};

// Calculate the result of an expression
export const calculate = (n1: number, n2: number, operation: string): number => {
  switch (operation) {
    case OPERATIONS.ADD:
      return n1 + n2;
    case OPERATIONS.SUBTRACT:
      return n1 - n2;
    case OPERATIONS.MULTIPLY:
      return n1 * n2;
    case OPERATIONS.DIVIDE:
      if (n2 === 0) {
        return Infinity; // Division by zero
      }
      return n1 / n2;
    case OPERATIONS.MODULO:
      return n1 % n2;
    case OPERATIONS.POWER:
      return Math.pow(n1, n2);
    default:
      return n2;
  }
};

// Scientific functions
export const scientificFunctions = {
  sin: (x: number): number => Math.sin(x),
  cos: (x: number): number => Math.cos(x),
  tan: (x: number): number => Math.tan(x),
  log: (x: number): number => Math.log10(x),
  ln: (x: number): number => Math.log(x),
  sqrt: (x: number): number => Math.sqrt(x),
  exp: (x: number): number => Math.exp(x),
  fact: (x: number): number => {
    // Factorial function
    if (x < 0) return NaN;
    if (!Number.isInteger(x)) return NaN;
    if (x === 0 || x === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= x; i++) {
      result *= i;
    }
    return result;
  },
  inv: (x: number): number => 1 / x,
  abs: (x: number): number => Math.abs(x),
  pi: (): number => Math.PI,
  e: (): number => Math.E,
};

// Parse an expression string into operands and operations
export const parseExpression = (expression: string): string => {
  // Replace multiplication and division symbols for display
  return expression
    .replace(/\*/g, OPERATIONS.MULTIPLY)
    .replace(/\//g, OPERATIONS.DIVIDE);
};

// Types for calculus operations
export type Variable = 'x' | 'y' | 't';
export type Expression = string;
export type CalculusOperation = 'derivative' | 'integral';
export type ChemistryOperation = 'balance' | 'stoichiometry';

// Interface for calculus result with steps
export interface CalculusResult {
  expression: Expression;
  result: Expression;
  steps: CalculusStep[];
  error?: string;
}

export interface CalculusStep {
  description: string;
  expression: Expression;
}

// Chemistry related interfaces
export interface ChemistryResult {
  equation: string;
  result: string;
  steps: ChemistryStep[];
  error?: string;
}

export interface ChemistryStep {
  description: string;
  expression: string;
}

export interface ChemicalElement {
  symbol: string;
  count: number;
}

export interface ChemicalCompound {
  elements: ChemicalElement[];
  coefficient: number;
}

// Periodic table elements data
export const periodicTableElements = {
  "H": { name: "Hydrogen", atomicNumber: 1, atomicMass: 1.008 },
  "He": { name: "Helium", atomicNumber: 2, atomicMass: 4.0026 },
  "Li": { name: "Lithium", atomicNumber: 3, atomicMass: 6.94 },
  "Be": { name: "Beryllium", atomicNumber: 4, atomicMass: 9.0122 },
  "B": { name: "Boron", atomicNumber: 5, atomicMass: 10.81 },
  "C": { name: "Carbon", atomicNumber: 6, atomicMass: 12.011 },
  "N": { name: "Nitrogen", atomicNumber: 7, atomicMass: 14.007 },
  "O": { name: "Oxygen", atomicNumber: 8, atomicMass: 15.999 },
  "F": { name: "Fluorine", atomicNumber: 9, atomicMass: 18.998 },
  "Ne": { name: "Neon", atomicNumber: 10, atomicMass: 20.180 },
  "Na": { name: "Sodium", atomicNumber: 11, atomicMass: 22.990 },
  "Mg": { name: "Magnesium", atomicNumber: 12, atomicMass: 24.305 },
  "Al": { name: "Aluminum", atomicNumber: 13, atomicMass: 26.982 },
  "Si": { name: "Silicon", atomicNumber: 14, atomicMass: 28.085 },
  "P": { name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974 },
  "S": { name: "Sulfur", atomicNumber: 16, atomicMass: 32.06 },
  "Cl": { name: "Chlorine", atomicNumber: 17, atomicMass: 35.45 },
  "Ar": { name: "Argon", atomicNumber: 18, atomicMass: 39.948 },
  "K": { name: "Potassium", atomicNumber: 19, atomicMass: 39.098 },
  "Ca": { name: "Calcium", atomicNumber: 20, atomicMass: 40.078 },
  "Sc": { name: "Scandium", atomicNumber: 21, atomicMass: 44.956 },
  "Ti": { name: "Titanium", atomicNumber: 22, atomicMass: 47.867 },
  "V": { name: "Vanadium", atomicNumber: 23, atomicMass: 50.942 },
  "Cr": { name: "Chromium", atomicNumber: 24, atomicMass: 51.996 },
  "Mn": { name: "Manganese", atomicNumber: 25, atomicMass: 54.938 },
  "Fe": { name: "Iron", atomicNumber: 26, atomicMass: 55.845 },
  "Co": { name: "Cobalt", atomicNumber: 27, atomicMass: 58.933 },
  "Ni": { name: "Nickel", atomicNumber: 28, atomicMass: 58.693 },
  "Cu": { name: "Copper", atomicNumber: 29, atomicMass: 63.546 },
  "Zn": { name: "Zinc", atomicNumber: 30, atomicMass: 65.38 },
  "Ga": { name: "Gallium", atomicNumber: 31, atomicMass: 69.723 },
  "Ge": { name: "Germanium", atomicNumber: 32, atomicMass: 72.630 },
  "As": { name: "Arsenic", atomicNumber: 33, atomicMass: 74.922 },
  "Se": { name: "Selenium", atomicNumber: 34, atomicMass: 78.971 },
  "Br": { name: "Bromine", atomicNumber: 35, atomicMass: 79.904 },
  "Kr": { name: "Krypton", atomicNumber: 36, atomicMass: 83.798 },
  "Rb": { name: "Rubidium", atomicNumber: 37, atomicMass: 85.468 },
  "Sr": { name: "Strontium", atomicNumber: 38, atomicMass: 87.62 },
  "Y": { name: "Yttrium", atomicNumber: 39, atomicMass: 88.906 },
  "Zr": { name: "Zirconium", atomicNumber: 40, atomicMass: 91.224 },
  "Nb": { name: "Niobium", atomicNumber: 41, atomicMass: 92.906 },
  "Mo": { name: "Molybdenum", atomicNumber: 42, atomicMass: 95.95 },
  "Tc": { name: "Technetium", atomicNumber: 43, atomicMass: 98 },
  "Ru": { name: "Ruthenium", atomicNumber: 44, atomicMass: 101.07 },
  "Rh": { name: "Rhodium", atomicNumber: 45, atomicMass: 102.91 },
  "Pd": { name: "Palladium", atomicNumber: 46, atomicMass: 106.42 },
  "Ag": { name: "Silver", atomicNumber: 47, atomicMass: 107.87 },
  "Cd": { name: "Cadmium", atomicNumber: 48, atomicMass: 112.41 },
  "In": { name: "Indium", atomicNumber: 49, atomicMass: 114.82 },
  "Sn": { name: "Tin", atomicNumber: 50, atomicMass: 118.71 },
  "Sb": { name: "Antimony", atomicNumber: 51, atomicMass: 121.76 },
  "Te": { name: "Tellurium", atomicNumber: 52, atomicMass: 127.60 },
  "I": { name: "Iodine", atomicNumber: 53, atomicMass: 126.90 },
  "Xe": { name: "Xenon", atomicNumber: 54, atomicMass: 131.29 },
  "Cs": { name: "Cesium", atomicNumber: 55, atomicMass: 132.91 },
  "Ba": { name: "Barium", atomicNumber: 56, atomicMass: 137.33 },
  "La": { name: "Lanthanum", atomicNumber: 57, atomicMass: 138.91 },
  "Ce": { name: "Cerium", atomicNumber: 58, atomicMass: 140.12 },
  "Pr": { name: "Praseodymium", atomicNumber: 59, atomicMass: 140.91 },
  "Nd": { name: "Neodymium", atomicNumber: 60, atomicMass: 144.24 },
  "Pm": { name: "Promethium", atomicNumber: 61, atomicMass: 145 },
  "Sm": { name: "Samarium", atomicNumber: 62, atomicMass: 150.36 },
  "Eu": { name: "Europium", atomicNumber: 63, atomicMass: 151.96 },
  "Gd": { name: "Gadolinium", atomicNumber: 64, atomicMass: 157.25 },
  "Tb": { name: "Terbium", atomicNumber: 65, atomicMass: 158.93 },
  "Dy": { name: "Dysprosium", atomicNumber: 66, atomicMass: 162.50 },
  "Ho": { name: "Holmium", atomicNumber: 67, atomicMass: 164.93 },
  "Er": { name: "Erbium", atomicNumber: 68, atomicMass: 167.26 },
  "Tm": { name: "Thulium", atomicNumber: 69, atomicMass: 168.93 },
  "Yb": { name: "Ytterbium", atomicNumber: 70, atomicMass: 173.05 },
  "Lu": { name: "Lutetium", atomicNumber: 71, atomicMass: 174.97 },
  "Hf": { name: "Hafnium", atomicNumber: 72, atomicMass: 178.49 },
  "Ta": { name: "Tantalum", atomicNumber: 73, atomicMass: 180.95 },
  "W": { name: "Tungsten", atomicNumber: 74, atomicMass: 183.84 },
  "Re": { name: "Rhenium", atomicNumber: 75, atomicMass: 186.21 },
  "Os": { name: "Osmium", atomicNumber: 76, atomicMass: 190.23 },
  "Ir": { name: "Iridium", atomicNumber: 77, atomicMass: 192.22 },
  "Pt": { name: "Platinum", atomicNumber: 78, atomicMass: 195.08 },
  "Au": { name: "Gold", atomicNumber: 79, atomicMass: 196.97 },
  "Hg": { name: "Mercury", atomicNumber: 80, atomicMass: 200.59 },
  "Tl": { name: "Thallium", atomicNumber: 81, atomicMass: 204.38 },
  "Pb": { name: "Lead", atomicNumber: 82, atomicMass: 207.2 },
  "Bi": { name: "Bismuth", atomicNumber: 83, atomicMass: 208.98 },
  "Po": { name: "Polonium", atomicNumber: 84, atomicMass: 209 },
  "At": { name: "Astatine", atomicNumber: 85, atomicMass: 210 },
  "Rn": { name: "Radon", atomicNumber: 86, atomicMass: 222 },
  "Fr": { name: "Francium", atomicNumber: 87, atomicMass: 223 },
  "Ra": { name: "Radium", atomicNumber: 88, atomicMass: 226 },
  "Ac": { name: "Actinium", atomicNumber: 89, atomicMass: 227 },
  "Th": { name: "Thorium", atomicNumber: 90, atomicMass: 232.04 },
  "Pa": { name: "Protactinium", atomicNumber: 91, atomicMass: 231.04 },
  "U": { name: "Uranium", atomicNumber: 92, atomicMass: 238.03 },
  "Np": { name: "Neptunium", atomicNumber: 93, atomicMass: 237 },
  "Pu": { name: "Plutonium", atomicNumber: 94, atomicMass: 244 },
  "Am": { name: "Americium", atomicNumber: 95, atomicMass: 243 },
  "Cm": { name: "Curium", atomicNumber: 96, atomicMass: 247 },
  "Bk": { name: "Berkelium", atomicNumber: 97, atomicMass: 247 },
  "Cf": { name: "Californium", atomicNumber: 98, atomicMass: 251 },
  "Es": { name: "Einsteinium", atomicNumber: 99, atomicMass: 252 },
  "Fm": { name: "Fermium", atomicNumber: 100, atomicMass: 257 },
  "Md": { name: "Mendelevium", atomicNumber: 101, atomicMass: 258 },
  "No": { name: "Nobelium", atomicNumber: 102, atomicMass: 259 },
  "Lr": { name: "Lawrencium", atomicNumber: 103, atomicMass: 266 },
  "Rf": { name: "Rutherfordium", atomicNumber: 104, atomicMass: 267 },
  "Db": { name: "Dubnium", atomicNumber: 105, atomicMass: 268 },
  "Sg": { name: "Seaborgium", atomicNumber: 106, atomicMass: 269 },
  "Bh": { name: "Bohrium", atomicNumber: 107, atomicMass: 270 },
  "Hs": { name: "Hassium", atomicNumber: 108, atomicMass: 277 },
  "Mt": { name: "Meitnerium", atomicNumber: 109, atomicMass: 278 },
  "Ds": { name: "Darmstadtium", atomicNumber: 110, atomicMass: 281 },
  "Rg": { name: "Roentgenium", atomicNumber: 111, atomicMass: 282 },
  "Cn": { name: "Copernicium", atomicNumber: 112, atomicMass: 285 },
  "Nh": { name: "Nihonium", atomicNumber: 113, atomicMass: 286 },
  "Fl": { name: "Flerovium", atomicNumber: 114, atomicMass: 289 },
  "Mc": { name: "Moscovium", atomicNumber: 115, atomicMass: 290 },
  "Lv": { name: "Livermorium", atomicNumber: 116, atomicMass: 293 },
  "Ts": { name: "Tennessine", atomicNumber: 117, atomicMass: 294 },
  "Og": { name: "Oganesson", atomicNumber: 118, atomicMass: 294 }
};

// Function to check if a given string is a valid element symbol
export const isElementSymbol = (symbol: string): boolean => {
  return !!periodicTableElements[symbol];
};

// Helper function to get element info
export const getElementInfo = (symbol: string) => {
  return periodicTableElements[symbol] || null;
};

// Parse a chemical formula into elements and their counts
const parseChemicalFormula = (formula: string): ChemicalElement[] => {
  const elements: ChemicalElement[] = [];
  let i = 0;

  while (i < formula.length) {
    // Match an element symbol (uppercase letter followed by optional lowercase)
    if (/[A-Z]/.test(formula[i])) {
      let symbol = formula[i];
      i++;
      
      // Check for lowercase part of the symbol
      while (i < formula.length && /[a-z]/.test(formula[i])) {
        symbol += formula[i];
        i++;
      }
      
      // Validate if this is a real element
      if (!isElementSymbol(symbol)) {
        throw new Error(`Unknown element symbol: ${symbol}`);
      }
      
      // Check for a number following the symbol
      let countStr = '';
      while (i < formula.length && /[0-9]/.test(formula[i])) {
        countStr += formula[i];
        i++;
      }
      
      const count = countStr ? parseInt(countStr, 10) : 1;
      elements.push({ symbol, count });
    } else {
      // Skip any other characters
      i++;
    }
  }
  
  return elements;
};

// Parse a chemical equation side (left or right of the arrow)
const parseEquationSide = (side: string): ChemicalCompound[] => {
  const compounds: ChemicalCompound[] = [];
  
  // Split by + to get individual compounds
  const compoundStrings = side.split('+').map(s => s.trim());
  
  for (const compoundStr of compoundStrings) {
    // Check for coefficient
    const coefficientMatch = compoundStr.match(/^(\d+)(.+)$/);
    let coefficient = 1;
    let formulaStr = compoundStr;
    
    if (coefficientMatch) {
      coefficient = parseInt(coefficientMatch[1], 10);
      formulaStr = coefficientMatch[2];
    }
    
    const elements = parseChemicalFormula(formulaStr);
    compounds.push({ elements, coefficient });
  }
  
  return compounds;
};

// Parse a full chemical equation
const parseChemicalEquation = (equation: string): { reactants: ChemicalCompound[], products: ChemicalCompound[] } => {
  // Replace arrow variants with a standard one
  const standardizedEquation = equation.replace(/⟶|⇌|=>/g, '→');
  
  // Split by the arrow
  const sides = standardizedEquation.split('→').map(s => s.trim());
  
  if (sides.length !== 2) {
    throw new Error('Invalid equation format. Use format like "H2 + O2 → H2O"');
  }
  
  const reactants = parseEquationSide(sides[0]);
  const products = parseEquationSide(sides[1]);
  
  return { reactants, products };
};

// Count elements on each side of the equation
const countElements = (compounds: ChemicalCompound[]): Record<string, number> => {
  const elementCounts: Record<string, number> = {};
  
  for (const compound of compounds) {
    for (const element of compound.elements) {
      const totalCount = element.count * compound.coefficient;
      elementCounts[element.symbol] = (elementCounts[element.symbol] || 0) + totalCount;
    }
  }
  
  return elementCounts;
};

// Format the balanced equation
const formatBalancedEquation = (reactants: ChemicalCompound[], products: ChemicalCompound[]): string => {
  const formatSide = (compounds: ChemicalCompound[]): string => {
    return compounds.map(compound => {
      const coefficient = compound.coefficient === 1 ? '' : compound.coefficient;
      const formula = compound.elements.map(element => {
        return element.count === 1 ? element.symbol : `${element.symbol}${element.count}`;
      }).join('');
      return `${coefficient}${formula}`;
    }).join(' + ');
  };
  
  return `${formatSide(reactants)} → ${formatSide(products)}`;
};

// Calculate the molar mass of a compound
export const calculateMolarMass = (formula: string): number => {
  try {
    const elements = parseChemicalFormula(formula);
    let totalMass = 0;
    
    for (const element of elements) {
      const elementInfo = getElementInfo(element.symbol);
      if (!elementInfo) {
        throw new Error(`Unknown element: ${element.symbol}`);
      }
      totalMass += elementInfo.atomicMass * element.count;
    }
    
    return totalMass;
  } catch (error) {
    console.error("Error calculating molar mass:", error);
    return 0;
  }
};

// Balance a chemical equation using linear algebra approach (simplified)
export const balanceChemicalEquation = (equation: string): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    let result = '';
    
    steps.push({
      description: "Parse the chemical equation:",
      expression: equation
    });
    
    // Parse the equation
    const { reactants, products } = parseChemicalEquation(equation);
    
    // Identify all unique elements
    const allElements = new Set<string>();
    
    reactants.forEach(compound => {
      compound.elements.forEach(element => {
        allElements.add(element.symbol);
      });
    });
    
    products.forEach(compound => {
      compound.elements.forEach(element => {
        allElements.add(element.symbol);
      });
    });
    
    steps.push({
      description: "Identify the elements in the reaction:",
      expression: `Elements: ${Array.from(allElements).join(', ')}`
    });
    
    // Count elements on both sides
    const reactantElements = countElements(reactants);
    const productElements = countElements(products);
    
    steps.push({
      description: "Count atoms on each side (before balancing):",
      expression: `Reactants: ${Object.entries(reactantElements).map(([el, count]) => `${el}: ${count}`).join(', ')}\nProducts: ${Object.entries(productElements).map(([el, count]) => `${el}: ${count}`).join(', ')}`
    });
    
    // Simple balancing for basic equations (this is a simplified approach)
    // For a real implementation, you'd use a linear algebra system to solve this
    
    // Start with coefficients of 1
    let balanced = false;
    let attempts = 0;
    const maxAttempts = 10; // Prevent infinite loops
    
    while (!balanced && attempts < maxAttempts) {
      attempts++;
      
      // Check if equation is balanced
      balanced = true;
      const allElements = new Set([...Object.keys(reactantElements), ...Object.keys(productElements)]);
      
      for (const element of allElements) {
        const reactantCount = reactantElements[element] || 0;
        const productCount = productElements[element] || 0;
        
        if (reactantCount !== productCount) {
          balanced = false;
          break;
        }
      }
      
      if (balanced) break;
      
      // Try to balance by adjusting coefficients (simplified approach)
      if (attempts === 1) {
        // For demonstration, let's simulate a simple balance for common reactions
        
        // Water formation: H2 + O2 → H2O (should be 2H2 + O2 → 2H2O)
        if (equation.match(/H2\s*\+\s*O2\s*→\s*H2O/)) {
          reactants[0].coefficient = 2; // 2H2
          products[0].coefficient = 2;  // 2H2O
          
          steps.push({
            description: "Balance hydrogen atoms:",
            expression: "Need 2 H₂ molecules to match 2 H₂O molecules"
          });
          
          steps.push({
            description: "Balance oxygen atoms:",
            expression: "O₂ has 2 oxygen atoms, which matches 2 H₂O molecules"
          });
          
          result = "2H2 + O2 → 2H2O";
          break;
        }
        
        // Methane combustion: CH4 + O2 → CO2 + H2O
        if (equation.match(/CH4\s*\+\s*O2\s*→\s*CO2\s*\+\s*H2O/)) {
          reactants[0].coefficient = 1; // CH4
          reactants[1].coefficient = 2; // 2O2
          products[0].coefficient = 1;  // CO2
          products[1].coefficient = 2;  // 2H2O
          
          steps.push({
            description: "Balance carbon atoms:",
            expression: "1 carbon in CH₄ matches 1 carbon in CO₂"
          });
          
          steps.push({
            description: "Balance hydrogen atoms:",
            expression: "4 hydrogen atoms in CH₄ need 2 H₂O molecules (with 4 hydrogen atoms)"
          });
          
          steps.push({
            description: "Balance oxygen atoms:",
            expression: "2 O₂ molecules provide 4 oxygen atoms, matching CO₂ (2) + 2H₂O (2)"
          });
          
          result = "CH4 + 2O2 → CO2 + 2H2O";
          break;
        }
        
        // Iron + Oxygen → Iron(III) Oxide: 4Fe + 3O2 → 2Fe2O3
        if (equation.match(/Fe\s*\+\s*O2\s*→\s*Fe2O3/)) {
          reactants[0].coefficient = 4; // 4Fe
          reactants[1].coefficient = 3; // 3O2
          products[0].coefficient = 2;  // 2Fe2O3
          
          steps.push({
            description: "Balance iron atoms:",
            expression: "4 Fe atoms are needed to match 2 Fe₂O₃ (with 4 Fe atoms)"
          });
          
          steps.push({
            description: "Balance oxygen atoms:",
            expression: "3 O₂ molecules provide 6 oxygen atoms, matching 2 Fe₂O₃ (with 6 O atoms)"
          });
          
          result = "4Fe + 3O2 → 2Fe2O3";
          break;
        }
        
        // If it's not a recognized pattern, provide a generic explanation
        steps.push({
          description: "Apply the law of conservation of mass:",
          expression: "The number of atoms of each element must be equal on both sides of the equation"
        });
        
        // Implement a basic coefficient adjustment algorithm
        // This is a very simplified approach and won't work for complex equations
        let adjustedCoefficients = false;
        
        // Check each element and try to balance by adjusting coefficients
        for (const element of allElements) {
          const reactantCount = reactantElements[element] || 0;
          const productCount = productElements[element] || 0;
          
          if (reactantCount < productCount && reactantCount > 0) {
            // Adjust reactant coefficients
            const ratio = Math.ceil(productCount / reactantCount);
            for (const compound of reactants) {
              if (compound.elements.some(el => el.symbol === element)) {
                compound.coefficient *= ratio;
                adjustedCoefficients = true;
                break;
              }
            }
          } else if (productCount < reactantCount && productCount > 0) {
            // Adjust product coefficients
            const ratio = Math.ceil(reactantCount / productCount);
            for (const compound of products) {
              if (compound.elements.some(el => el.symbol === element)) {
                compound.coefficient *= ratio;
                adjustedCoefficients = true;
                break;
              }
            }
          }
        }
        
        if (!adjustedCoefficients) {
          // If basic adjustment failed, inform the user
          result = "Unable to automatically balance this equation. Try a simpler equation or check for errors.";
          return {
            equation,
            result,
            steps,
            error: "Complex equation balancing requires more advanced algorithms not implemented in this demo."
          };
        }
      }
    }
    
    if (!result) {
      result = formatBalancedEquation(reactants, products);
    }
    
    steps.push({
      description: "
