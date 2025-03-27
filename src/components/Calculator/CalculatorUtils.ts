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
      if (i < formula.length && /[a-z]/.test(formula[i])) {
        symbol += formula[i];
        i++;
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
    
    // Count elements on both sides
    const reactantElements = countElements(reactants);
    const productElements = countElements(products);
    
    steps.push({
      description: "Identify the elements in the reaction:",
      expression: `Elements: ${Object.keys(reactantElements).concat(Object.keys(productElements))
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(', ')}`
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
        
        // If it's not a recognized pattern, provide a generic explanation
        steps.push({
          description: "Apply the law of conservation of mass:",
          expression: "The number of atoms of each element must be equal on both sides of the equation"
        });
        
        // Inform about the limitation of this simple implementation
        result = "Unable to automatically balance this equation. Try a simpler equation like 'H2 + O2 → H2O'";
        return {
          equation,
          result,
          steps,
          error: "Complex equation balancing requires matrix operations not implemented in this demo"
        };
      }
    }
    
    if (!result) {
      result = formatBalancedEquation(reactants, products);
    }
    
    steps.push({
      description: "Final balanced equation:",
      expression: result
    });
    
    return { equation, result, steps };
  } catch (error) {
    return {
      equation,
      result: 'Error',
      steps: [{
        description: 'An error occurred while balancing the equation',
        expression: equation
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Calculate stoichiometry based on a balanced equation
export const calculateStoichiometry = (equation: string, knownAmount: number, knownCompound: string, targetCompound: string): ChemistryResult => {
  try {
    // Parse the equation first
    const { reactants, products } = parseChemicalEquation(equation);
    
    // Check if the equation is balanced
    const balanceResult = balanceChemicalEquation(equation);
    
    const steps: ChemistryStep[] = [];
    
    steps.push({
      description: "Start with the balanced equation:",
      expression: balanceResult.result || equation
    });
    
    // This is a simplified implementation that recognizes basic patterns
    // For a real implementation, you'd get the molar mass of compounds and use proper stoichiometric calculations
    
    // Example: For a reaction like "2H2 + O2 → 2H2O", if we know we have 4 moles of H2, 
    // how many moles of H2O can we produce?
    
    // For demonstration, let's handle some common cases
    if (equation.match(/H2\s*\+\s*O2\s*→\s*H2O/) || equation.match(/2H2\s*\+\s*O2\s*→\s*2H2O/)) {
      steps.push({
        description: `Given: ${knownAmount} moles of ${knownCompound}`,
        expression: `2H2 + O2 → 2H2O (balanced equation)`
      });
      
      let result = '';
      
      if (knownCompound === 'H2' && targetCompound === 'H2O') {
        // 2 moles of H2 produce 2 moles of H2O (1:1 ratio)
        const targetAmount = knownAmount;
        
        steps.push({
          description: "Calculate mole ratio:",
          expression: "2 moles H₂ : 2 moles H₂O = 1:1 ratio"
        });
        
        steps.push({
          description: "Apply the mole ratio:",
          expression: `${knownAmount} moles H₂ × (1 mol H₂O / 1 mol H₂) = ${targetAmount} moles H₂O`
        });
        
        result = `${targetAmount} moles of ${targetCompound}`;
      } 
      else if (knownCompound === 'O2' && targetCompound === 'H2O') {
        // 1 mole of O2 produces 2 moles of H2O (1:2 ratio)
        const targetAmount = knownAmount * 2;
        
        steps.push({
          description: "Calculate mole ratio:",
          expression: "1 mole O₂ : 2 moles H₂O = 1:2 ratio"
        });
        
        steps.push({
          description: "Apply the mole ratio:",
          expression: `${knownAmount} moles O₂ × (2 mol H₂O / 1 mol O₂) = ${targetAmount} moles H₂O`
        });
        
        result = `${targetAmount} moles of ${targetCompound}`;
      }
      else {
        // Handle other combinations
        result = "Stoichiometry calculation for this specific combination is not implemented in this demo";
      }
      
      return { equation, result, steps };
    }
    
    // For other equations, provide a generic message
    return {
      equation,
      result: "For complex stoichiometry, please use a specific equation like 'H2 + O2 → H2O'",
      steps: [{
        description: "Complex stoichiometry requires more advanced calculations not implemented in this demo",
        expression: equation
      }],
      error: "Stoichiometry demo supports only simple reactions like H2 + O2 → H2O"
    };
  } catch (error) {
    return {
      equation,
      result: 'Error',
      steps: [{
        description: 'An error occurred during stoichiometry calculation',
        expression: equation
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
