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
export type PhysicsOperation = 'kinematics' | 'dynamics' | 'circuits' | 'laplace';

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

// Physics related interfaces
export interface PhysicsResult {
  input: string;
  result: string;
  steps: PhysicsStep[];
  error?: string;
}

export interface PhysicsStep {
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

// Get all element symbols as an array
export const getAllElementSymbols = (): string[] => {
  return Object.keys(periodicTableElements);
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
      
      // Check for a number or a subscript following the symbol
      let countStr = '';
      
      // Handle both regular numbers and subscript Unicode characters
      while (i < formula.length && 
             (/[0-9]/.test(formula[i]) || 
              /[\u2080-\u2089]/.test(formula[i]))) {
        
        // Convert subscript Unicode characters to regular digits if needed
        if (/[\u2080-\u2089]/.test(formula[i])) {
          // Convert subscript to regular digit (₀-₉ to 0-9)
          const subscriptToDigit: Record<string, string> = {
            '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
            '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
          };
          countStr += subscriptToDigit[formula[i]] || '';
        } else {
          countStr += formula[i];
        }
        i++;
      }
      
      const count = countStr ? parseInt(countStr, 10) : 1;
      elements.push({ symbol, count });
    } else {
      // Skip any other characters (like charges, etc.)
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
    let balanced = false;
    
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
      description: "Balanced equation:",
      expression: result
    });
    
    return {
      equation,
      result,
      steps,
      error: balanced ? undefined : "Could not balance the equation after multiple attempts."
    };
  } catch (error) {
    console.error("Error balancing chemical equation:", error);
    return {
      equation,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate stoichiometry for a chemical reaction
export const calculateStoichiometry = (
  equation: string,
  knownAmount: number,
  knownCompound: string,
  targetCompound: string
): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    
    steps.push({
      description: "Starting with balanced equation:",
      expression: equation
    });
    
    // Balance the equation first
    const balancedResult = balanceChemicalEquation(equation);
    const balancedEquation = balancedResult.result;
    
    // Parse the balanced equation
    const { reactants, products } = parseChemicalEquation(balancedEquation);
    
    // Combine all compounds into one array for easier searching
    const allCompounds = [...reactants, ...products];
    
    // Find the known and target compounds
    let knownCompoundObj: ChemicalCompound | undefined;
    let targetCompoundObj: ChemicalCompound | undefined;
    
    for (const compound of allCompounds) {
      // Very simple matching by checking if the formula contains the compound string
      // In a real implementation, you'd need a more robust comparison
      const formula = compound.elements.map(e => 
        e.count === 1 ? e.symbol : `${e.symbol}${e.count}`
      ).join('');
      
      if (formula === knownCompound) {
        knownCompoundObj = compound;
      }
      
      if (formula === targetCompound) {
        targetCompoundObj = compound;
      }
    }
    
    if (!knownCompoundObj) {
      throw new Error(`Could not find compound ${knownCompound} in the equation`);
    }
    
    if (!targetCompoundObj) {
      throw new Error(`Could not find compound ${targetCompound} in the equation`);
    }
    
    // Calculate molar masses
    const knownMolarMass = calculateMolarMass(knownCompound);
    const targetMolarMass = calculateMolarMass(targetCompound);
    
    steps.push({
      description: "Calculate molar masses:",
      expression: `${knownCompound}: ${knownMolarMass.toFixed(2)} g/mol\n${targetCompound}: ${targetMolarMass.toFixed(2)} g/mol`
    });
    
    // Convert known amount to moles
    const knownMoles = knownAmount / knownMolarMass;
    
    steps.push({
      description: "Convert known amount to moles:",
      expression: `${knownAmount} g ÷ ${knownMolarMass.toFixed(2)} g/mol = ${knownMoles.toFixed(4)} mol`
    });
    
    // Use the ratio from the balanced equation to find target moles
    const moleRatio = targetCompoundObj.coefficient / knownCompoundObj.coefficient;
    const targetMoles = knownMoles * moleRatio;
    
    steps.push({
      description: "Apply mole ratio from balanced equation:",
      expression: `${targetCompound} / ${knownCompound} = ${targetCompoundObj.coefficient} / ${knownCompoundObj.coefficient} = ${moleRatio}\n${knownMoles.toFixed(4)} mol × ${moleRatio} = ${targetMoles.toFixed(4)} mol`
    });
    
    // Convert target moles to grams
    const targetAmount = targetMoles * targetMolarMass;
    
    steps.push({
      description: "Convert target moles to mass:",
      expression: `${targetMoles.toFixed(4)} mol × ${targetMolarMass.toFixed(2)} g/mol = ${targetAmount.toFixed(2)} g`
    });
    
    return {
      equation: balancedEquation,
      result: `${targetAmount.toFixed(2)} g`,
      steps
    };
  } catch (error) {
    console.error("Error calculating stoichiometry:", error);
    return {
      equation,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate derivative for calculus mode
export const calculateDerivative = (expression: string, variable: Variable): CalculusResult => {
  try {
    const steps: CalculusStep[] = [];
    
    steps.push({
      description: "Original expression:",
      expression
    });
    
    // This is a simplified implementation that handles basic polynomials
    // A real implementation would use a math library like math.js or mathjs
    
    // Basic power rule: d/dx(x^n) = n*x^(n-1)
    const powerRuleMatch = expression.match(new RegExp(`${variable}\\^(\\d+)`));
    if (powerRuleMatch) {
      const power = parseInt(powerRuleMatch[1], 10);
      
      steps.push({
        description: "Apply the power rule:",
        expression: `d/d${variable}(${variable}^${power}) = ${power} × ${variable}^${power-1}`
      });
      
      const result = power === 1 
        ? "1" 
        : power === 2 
          ? `2${variable}` 
          : `${power}${variable}^${power-1}`;
          
      return {
        expression,
        result,
        steps
      };
    }
    
    // Basic constant rule: d/dx(c) = 0
    if (!expression.includes(variable)) {
      steps.push({
        description: "Apply the constant rule:",
        expression: `d/d${variable}(${expression}) = 0`
      });
      
      return {
        expression,
        result: "0",
        steps
      };
    }
    
    // Linear term: d/dx(x) = 1
    if (expression === variable) {
      steps.push({
        description: "Apply the basic rule:",
        expression: `d/d${variable}(${variable}) = 1`
      });
      
      return {
        expression,
        result: "1",
        steps
      };
    }
    
    // Simple coefficient: d/dx(a*x) = a
    const coefficientMatch = expression.match(new RegExp(`(\\d+)${variable}`));
    if (coefficientMatch) {
      const coefficient = coefficientMatch[1];
      
      steps.push({
        description: "Apply the constant multiple rule:",
        expression: `d/d${variable}(${coefficient}${variable}) = ${coefficient}`
      });
      
      return {
        expression,
        result: coefficient,
        steps
      };
    }
    
    // If we can't handle the expression, provide a generic explanation
    return {
      expression,
      result: "Cannot compute",
      steps: [
        {
          description: "This simplified calculator can only handle basic polynomials:",
          expression: "Examples: x, 2x, x^2, 3x^4"
        }
      ],
      error: "Expression too complex for this demo calculator"
    };
  } catch (error) {
    console.error("Error calculating derivative:", error);
    return {
      expression,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate integral for calculus mode
export const calculateIntegral = (expression: string, variable: Variable): CalculusResult => {
  try {
    const steps: CalculusStep[] = [];
    
    steps.push({
      description: "Original expression:",
      expression
    });
    
    // This is a simplified implementation that handles basic polynomials
    // A real implementation would use a math library
    
    // Basic power rule: ∫(x^n)dx = x^(n+1)/(n+1) + C
    const powerRuleMatch = expression.match(new RegExp(`${variable}\\^(\\d+)`));
    if (powerRuleMatch) {
      const power = parseInt(powerRuleMatch[1], 10);
      const newPower = power + 1;
      
      steps.push({
        description: "Apply the power rule for integration:",
        expression: `∫${variable}^${power} d${variable} = ${variable}^${newPower}/${newPower} + C`
      });
      
      const result = `${variable}^${newPower}/${newPower} + C`;
          
      return {
        expression,
        result,
        steps
      };
    }
    
    // Basic constant rule: ∫c dx = c*x + C
    if (!expression.includes(variable)) {
      steps.push({
        description: "Apply the constant rule for integration:",
        expression: `∫${expression} d${variable} = ${expression}${variable} + C`
      });
      
      return {
        expression,
        result: `${expression}${variable} + C`,
        steps
      };
    }
    
    // Linear term: ∫x dx = x^2/2 + C
    if (expression === variable) {
      steps.push({
        description: "Apply the basic rule for integration:",
        expression: `∫${variable} d${variable} = ${variable}^2/2 + C`
      });
      
      return {
        expression,
        result: `${variable}^2/2 + C`,
        steps
      };
    }
    
    // Simple coefficient: ∫(a*x) dx = a*x^2/2 + C
    const coefficientMatch = expression.match(new RegExp(`(\\d+)${variable}`));
    if (coefficientMatch) {
      const coefficient = coefficientMatch[1];
      
      steps.push({
        description: "Apply the constant multiple rule for integration:",
        expression: `∫${coefficient}${variable} d${variable} = ${coefficient}(${variable}^2/2) + C = ${coefficient}${variable}^2/2 + C`
      });
      
      return {
        expression,
        result: `${coefficient}${variable}^2/2 + C`,
        steps
      };
    }
    
    // If we can't handle the expression, provide a generic explanation
    return {
      expression,
      result: "Cannot compute",
      steps: [
        {
          description: "This simplified calculator can only handle basic polynomials:",
          expression: "Examples: x, 2x, x^2, 3x^4"
        }
      ],
      error: "Expression too complex for this demo calculator"
    };
  } catch (error) {
    console.error("Error calculating integral:", error);
    return {
      expression,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate kinematics problems for physics mode
export const calculateKinematics = (input: string, type: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    
    steps.push({
      description: "Kinematics equation inputs:",
      expression: input
    });
    
    // Parse the input parameters
    // Expected format: u|v|a|t|s (initial velocity|final velocity|acceleration|time|distance)
    const params = input.split('|').map(p => p.trim());
    
    if (params.length !== 5) {
      throw new Error("Please provide all five parameters (use '?' for unknown): u|v|a|t|s");
    }
    
    let [u, v, a, t, s] = params.map(p => p === '?' ? null : parseFloat(p));
    
    // Basic kinematic equations:
    // 1. v = u + at
    // 2. s = ut + 0.5at²
    // 3. s = vt - 0.5at²
    // 4. v² = u² + 2as
    // 5. s = 0.5(u + v)t
    
    let result = "?";
    
    if (type === 'distance' && s === null) {
      // Calculate distance
      if (u !== null && v !== null && t !== null) {
        // Equation 5: s = 0.5(u + v)t
        s = 0.5 * (u + v) * t;
        result = `s = ${s.toFixed(2)} m`;
        
        steps.push({
          description: "Using average velocity equation:",
          expression: `s = 0.5(u + v)t = 0.5(${u} + ${v}) × ${t} = ${s.toFixed(2)} m`
        });
      } 
      else if (u !== null && a !== null && t !== null) {
        // Equation 2: s = ut + 0.5at²
        s = u * t + 0.5 * a * t * t;
        result = `s = ${s.toFixed(2)} m`;
        
        steps.push({
          description: "Using initial velocity and acceleration equation:",
          expression: `s = ut + 0.5at² = ${u} × ${t} + 0.5 × ${a} × ${t}² = ${s.toFixed(2)} m`
        });
      }
      else if (v !== null && a !== null && t !== null) {
        // Equation 3: s = vt - 0.5at²
        s = v * t - 0.5 * a * t * t;
        result = `s = ${s.toFixed(2)} m`;
        
        steps.push({
          description: "Using final velocity and acceleration equation:",
          expression: `s = vt - 0.5at² = ${v} × ${t} - 0.5 × ${a} × ${t}² = ${s.toFixed(2)} m`
        });
      }
      else if (u !== null && v !== null && a !== null) {
        // Equation 4: v² = u² + 2as
        s = (v * v - u * u) / (2 * a);
        result = `s = ${s.toFixed(2)} m`;
        
        steps.push({
          description: "Using velocity-acceleration relationship:",
          expression: `v² = u² + 2as\ns = (v² - u²)/(2a) = (${v}² - ${u}²)/(2 × ${a}) = ${s.toFixed(2)} m`
        });
      }
    }
    else if (type === 'velocity' && v === null) {
      // Calculate final velocity
      if (u !== null && a !== null && t !== null) {
        // Equation 1: v = u + at
        v = u + a * t;
        result = `v = ${v.toFixed(2)} m/s`;
        
        steps.push({
          description: "Using basic acceleration equation:",
          expression: `v = u + at = ${u} + ${a} × ${t} = ${v.toFixed(2)} m/s`
        });
      }
      else if (u !== null && a !== null && s !== null) {
        // Equation 4: v² = u² + 2as
        v = Math.sqrt(u * u + 2 * a * s);
        result = `v = ${v.toFixed(2)} m/s`;
        
        steps.push({
          description: "Using energy-conservation equation:",
          expression: `v² = u² + 2as\nv = √(u² + 2as) = √(${u}² + 2 × ${a} × ${s}) = ${v.toFixed(2)} m/s`
        });
      }
      else if (u !== null && s !== null && t !== null) {
        // Equation 5: s = 0.5(u + v)t
        // Rearranged: v = 2s/t - u
        v = 2 * s / t - u;
        result = `v = ${v.toFixed(2)} m/s`;
        
        steps.push({
          description: "Using average velocity equation:",
          expression: `s = 0.5(u + v)t\nv = 2s/t - u = 2 × ${s}/${t} - ${u} = ${v.toFixed(2)} m/s`
        });
      }
    }
    
    return {
      input,
      result,
      steps,
      error: result === "?" ? "Insufficient information to calculate" : undefined
    };
  } catch (error) {
    console.error("Error in kinematics calculation:", error);
    return {
      input,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate dynamics problems for physics mode
export const calculateDynamics = (input: string, type: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    
    steps.push({
      description: "Dynamics equation inputs:",
      expression: input
    });
    
    // Parse the input parameters
    // Expected format: m|a|F (mass|acceleration|force)
    const params = input.split('|').map(p => p.trim());
    
    if (params.length < 2) {
      throw new Error("Please provide at least two parameters separated by '|'");
    }
    
    let result = "?";
    
    if (type === 'force') {
      // Calculate force using F = ma
      if (params.length >= 2) {
        const m = parseFloat(params[0]);
        const a = parseFloat(params[1]);
        
        if (!isNaN(m) && !isNaN(a)) {
          const force = m * a;
          result = `F = ${force.toFixed(2)} N`;
          
          steps.push({
            description: "Using Newton's Second Law:",
            expression: `F = m × a = ${m} kg × ${a} m/s² = ${force.toFixed(2)} N`
          });
        }
      }
    }
    else if (type === 'energy') {
      // Calculate kinetic energy using K = 0.5mv²
      if (params.length >= 2) {
        const m = parseFloat(params[0]);
        const v = parseFloat(params[1]);
        
        if (!isNaN(m) && !isNaN(v)) {
          const kineticEnergy = 0.5 * m * v * v;
          result = `KE = ${kineticEnergy.toFixed(2)} J`;
          
          steps.push({
            description: "Calculating Kinetic Energy:",
            expression: `KE = 0.5 × m × v² = 0.5 × ${m} kg × (${v} m/s)² = ${kineticEnergy.toFixed(2)} J`
          });
        }
      }
    }
    
    return {
      input,
      result,
      steps,
      error: result === "?" ? "Insufficient or invalid information provided" : undefined
    };
  } catch (error) {
    console.error("Error in dynamics calculation:", error);
    return {
      input,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Analyze electric circuits for physics mode
export const analyzeCircuit = (input: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    
    steps.push({
      description: "Circuit analysis inputs:",
      expression: input
    });
    
    // Parse the input parameters
    const params = input.split('|').map(p => p.trim());
    
    if (params.length < 2) {
      throw new Error("Please provide circuit parameters separated by '|'");
    }
    
    const circuitType = params[0].toLowerCase();
    let result = "";
    
    if (circuitType === 'ohm') {
      // Ohm's Law: V = IR
      if (params.length === 3) {
        // Parse the parameters based on which one is unknown (marked with '?')
        let voltage = params[1] === '?' ? null : parseFloat(params[1]);
        let current = params[2] === '?' ? null : parseFloat(params[2]);
        let resistance = params[3] === '?' ? null : parseFloat(params[3]);
        
        if (voltage === null && current !== null && resistance !== null) {
          // Calculate voltage
          voltage = current * resistance;
          result = `V = ${voltage.toFixed(2)} V`;
          
          steps.push({
            description: "Using Ohm's Law to find voltage:",
            expression: `V = I × R = ${current} A × ${resistance} Ω = ${voltage.toFixed(2)} V`
          });
        } 
        else if (current === null && voltage !== null && resistance !== null) {
          // Calculate current
          current = voltage / resistance;
          result = `I = ${current.toFixed(2)} A`;
          
          steps.push({
            description: "Using Ohm's Law to find current:",
            expression: `I = V / R = ${voltage} V / ${resistance} Ω = ${current.toFixed(2)} A`
          });
        }
        else if (resistance === null && voltage !== null && current !== null) {
          // Calculate resistance
          resistance = voltage / current;
          result = `R = ${resistance.toFixed(2)} Ω`;
          
          steps.push({
            description: "Using Ohm's Law to find resistance:",
            expression: `R = V / I = ${voltage} V / ${current} A = ${resistance.toFixed(2)} Ω`
          });
        }
      }
    }
    else if (circuitType === 'series') {
      // Series circuit: Rtotal = R1 + R2 + ...
      const resistances = params.slice(1).map(r => parseFloat(r)).filter(r => !isNaN(r));
      
      if (resistances.length > 0) {
        const totalResistance = resistances.reduce((sum, r) => sum + r, 0);
        result = `Rtotal = ${totalResistance.toFixed(2)} Ω`;
        
        steps.push({
          description: "Calculating total resistance in series:",
          expression: `Rtotal = ${resistances.join(' + ')} = ${totalResistance.toFixed(2)} Ω`
        });
      }
    }
    else if (circuitType === 'parallel') {
      // Parallel circuit: 1/Rtotal = 1/R1 + 1/R2 + ...
      const resistances = params.slice(1).map(r => parseFloat(r)).filter(r => !isNaN(r));
      
      if (resistances.length > 0) {
        const reciprocalSum = resistances.reduce((sum, r) => sum + 1/r, 0);
        const totalResistance = 1 / reciprocalSum;
        result = `Rtotal = ${totalResistance.toFixed(2)} Ω`;
        
        steps.push({
          description: "Calculating total resistance in parallel:",
          expression: `1/Rtotal = ${resistances.map(r => `1/${r}`).join(' + ')}\nRtotal = ${totalResistance.toFixed(2)} Ω`
        });
      }
    }
    
    return {
      input,
      result,
      steps,
      error: result === "" ? "Unable to perform the requested circuit analysis" : undefined
    };
  } catch (error) {
    console.error("Error in circuit analysis:", error);
    return {
      input,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate Laplace transforms for physics mode
export const calculateLaplace = (input: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    
    steps.push({
      description: "Laplace transform input:",
      expression: input
    });
    
    // Parse the input parameters
    const params = input.split('|').map(p => p.trim());
    
    if (params.length < 2) {
      throw new Error("Please specify transform type and function");
    }
    
    const transformType = params[0].toLowerCase();
    const expression = params[1];
    
    let result = "";
    
    if (transformType === 'forward') {
      // Forward Laplace transform examples
      if (expression === '1') {
        result = "L{1} = 1/s";
        
        steps.push({
          description: "Applying forward Laplace transform to constant:",
          expression: "L{1} = 1/s"
        });
      }
      else if (expression === 't') {
        result = "L{t} = 1/s²";
        
        steps.push({
          description: "Applying forward Laplace transform to t:",
          expression: "L{t} = 1/s²"
        });
      }
      else if (expression === 't^2') {
        result = "L{t²} = 2/s³";
        
        steps.push({
          description: "Applying forward Laplace transform to t²:",
          expression: "L{t²} = 2/s³"
        });
      }
      else if (expression === 'e^at') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L{e^(${a}t)} = 1/(s-${a})`;
        
        steps.push({
          description: "Applying forward Laplace transform to exponential:",
          expression: `L{e^(${a}t)} = 1/(s-${a})`
        });
      }
      else if (expression === 'sin(at)') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L{sin(${a}t)} = ${a}/(s²+${a}²)`;
        
        steps.push({
          description: "Applying forward Laplace transform to sine:",
          expression: `L{sin(${a}t)} = ${a}/(s²+${a}²)`
        });
      }
      else if (expression === 'cos(at)') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L{cos(${a}t)} = s/(s²+${a}²)`;
        
        steps.push({
          description: "Applying forward Laplace transform to cosine:",
          expression: `L{cos(${a}t)} = s/(s²+${a}²)`
        });
      }
    }
    else if (transformType === 'inverse') {
      // Inverse Laplace transform examples
      if (expression === '1/s') {
        result = "L⁻¹{1/s} = 1";
        
        steps.push({
          description: "Applying inverse Laplace transform:",
          expression: "L⁻¹{1/s} = 1"
        });
      }
      else if (expression === '1/s^2') {
        result = "L⁻¹{1/s²} = t";
        
        steps.push({
          description: "Applying inverse Laplace transform:",
          expression: "L⁻¹{1/s²} = t"
        });
      }
      else if (expression === '1/(s-a)') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L⁻¹{1/(s-${a})} = e^(${a}t)`;
        
        steps.push({
          description: "Applying inverse Laplace transform:",
          expression: `L⁻¹{1/(s-${a})} = e^(${a}t)`
        });
      }
      else if (expression === 'a/(s^2+a^2)') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L⁻¹{${a}/(s²+${a}²)} = sin(${a}t)`;
        
        steps.push({
          description: "Applying inverse Laplace transform:",
          expression: `L⁻¹{${a}/(s²+${a}²)} = sin(${a}t)`
        });
      }
      else if (expression === 's/(s^2+a^2)') {
        // Parse 'a' from additional parameter if available
        const a = params.length > 2 ? parseFloat(params[2]) : 1;
        result = `L⁻¹{s/(s²+${a}²)} = cos(${a}t)`;
        
        steps.push({
          description: "Applying inverse Laplace transform:",
          expression: `L⁻¹{s/(s²+${a}²)} = cos(${a}t)`
        });
      }
    }
    
    return {
      input,
      result,
      steps,
      error: result === "" ? "Unsupported Laplace transform expression" : undefined
    };
  } catch (error) {
    console.error("Error in Laplace transform:", error);
    return {
      input,
      result: "Error",
      steps: [{ description: "Error", expression: error instanceof Error ? error.message : "Unknown error" }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Helper function to convert normal numbers to subscript characters for display
export const toSubscript = (num: number | string): string => {
  const numStr = num.toString();
  const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  
  return numStr.split('').map(digit => {
    const index = parseInt(digit, 10);
    return isNaN(index) ? digit : subscripts[index];
  }).join('');
};

// Helper function to convert normal numbers to superscript characters for display
export const toSuperscript = (num: number | string): string => {
  const numStr = num.toString();
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻'
  };
  
  return numStr.split('').map(char => superscripts[char] || char).join('');
};
