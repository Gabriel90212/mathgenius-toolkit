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

// Function to calculate the derivative of an expression
export const calculateDerivative = (expression: string, variable: Variable = 'x'): CalculusResult => {
  try {
    // For educational purposes, we'll implement a simple symbolic differentiation
    // for basic expressions. A real calculator would use a more robust math library.
    
    // Initialize steps array to show work
    const steps: CalculusStep[] = [];
    
    // Clean and normalize the expression
    const cleanedExpression = expression.trim();
    
    steps.push({
      description: "Starting with the expression:",
      expression: cleanedExpression
    });
    
    // Handle basic polynomial terms
    let result = '';
    
    // Simple implementation for demonstration purpose
    if (cleanedExpression === variable) {
      // d/dx(x) = 1
      result = '1';
      steps.push({
        description: `Apply the power rule: d/dx(${variable}) = 1`,
        expression: result
      });
    } 
    else if (cleanedExpression.match(new RegExp(`${variable}\\^(\\d+)`))) {
      // d/dx(x^n) = n*x^(n-1)
      const powerMatch = cleanedExpression.match(new RegExp(`${variable}\\^(\\d+)`));
      if (powerMatch && powerMatch[1]) {
        const power = parseInt(powerMatch[1]);
        const newPower = power - 1;
        
        if (newPower === 0) {
          result = power.toString();
        } else if (newPower === 1) {
          result = `${power}${variable}`;
        } else {
          result = `${power}${variable}^${newPower}`;
        }
        
        steps.push({
          description: `Apply the power rule: d/dx(${variable}^${power}) = ${power} × ${variable}^${power-1}`,
          expression: result
        });
      }
    }
    else if (cleanedExpression.startsWith(`sin(${variable})`)) {
      // d/dx(sin(x)) = cos(x)
      result = `cos(${variable})`;
      steps.push({
        description: `Apply the derivative of sine: d/dx(sin(${variable})) = cos(${variable})`,
        expression: result
      });
    }
    else if (cleanedExpression.startsWith(`cos(${variable})`)) {
      // d/dx(cos(x)) = -sin(x)
      result = `-sin(${variable})`;
      steps.push({
        description: `Apply the derivative of cosine: d/dx(cos(${variable})) = -sin(${variable})`,
        expression: result
      });
    }
    else if (cleanedExpression.startsWith(`e^${variable}`)) {
      // d/dx(e^x) = e^x
      result = `e^${variable}`;
      steps.push({
        description: `Apply the derivative of e^x: d/dx(e^${variable}) = e^${variable}`,
        expression: result
      });
    }
    else if (cleanedExpression.match(/^\d+$/)) {
      // d/dx(constant) = 0
      result = '0';
      steps.push({
        description: `Apply the constant rule: d/dx(${cleanedExpression}) = 0`,
        expression: result
      });
    }
    else {
      // Default for unhandled expressions
      result = `d/dx(${cleanedExpression})`;
      steps.push({
        description: "This expression requires more advanced calculus rules.",
        expression: result
      });
    }
    
    return {
      expression: cleanedExpression,
      result,
      steps,
      error: result === `d/dx(${cleanedExpression})` ? 
        "This is a simplified calculator that handles only basic derivatives." : undefined
    };
  } catch (error) {
    return {
      expression,
      result: 'Error',
      steps: [{
        description: 'An error occurred while calculating the derivative',
        expression
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Function to calculate the integral of an expression
export const calculateIntegral = (expression: string, variable: Variable = 'x'): CalculusResult => {
  try {
    // For educational purposes, we'll implement a simple symbolic integration
    // for basic expressions. A real calculator would use a more robust math library.
    
    // Initialize steps array to show work
    const steps: CalculusStep[] = [];
    
    // Clean and normalize the expression
    const cleanedExpression = expression.trim();
    
    steps.push({
      description: "Starting with the expression:",
      expression: cleanedExpression
    });
    
    // Handle basic integrals
    let result = '';
    
    // Simple implementation for demonstration purpose
    if (cleanedExpression === variable) {
      // ∫x dx = x^2/2 + C
      result = `(${variable}^2)/2 + C`;
      steps.push({
        description: `Apply the power rule: ∫${variable} d${variable} = ${variable}^2/2 + C`,
        expression: result
      });
    } 
    else if (cleanedExpression.match(new RegExp(`${variable}\\^(\\d+)`))) {
      // ∫x^n dx = x^(n+1)/(n+1) + C
      const powerMatch = cleanedExpression.match(new RegExp(`${variable}\\^(\\d+)`));
      if (powerMatch && powerMatch[1]) {
        const power = parseInt(powerMatch[1]);
        const newPower = power + 1;
        
        result = `(${variable}^${newPower})/${newPower} + C`;
        
        steps.push({
          description: `Apply the power rule: ∫${variable}^${power} d${variable} = ${variable}^${power+1}/(${power+1}) + C`,
          expression: result
        });
      }
    }
    else if (cleanedExpression.match(/^\d+$/)) {
      // ∫constant dx = constant*x + C
      result = `${cleanedExpression}${variable} + C`;
      steps.push({
        description: `Apply the constant rule: ∫${cleanedExpression} d${variable} = ${cleanedExpression}${variable} + C`,
        expression: result
      });
    }
    else if (cleanedExpression.startsWith(`sin(${variable})`)) {
      // ∫sin(x) dx = -cos(x) + C
      result = `-cos(${variable}) + C`;
      steps.push({
        description: `Apply the integral of sine: ∫sin(${variable}) d${variable} = -cos(${variable}) + C`,
        expression: result
      });
    }
    else if (cleanedExpression.startsWith(`cos(${variable})`)) {
      // ∫cos(x) dx = sin(x) + C
      result = `sin(${variable}) + C`;
      steps.push({
        description: `Apply the integral of cosine: ∫cos(${variable}) d${variable} = sin(${variable}) + C`,
        expression: result
      });
    }
    else if (cleanedExpression.startsWith(`e^${variable}`)) {
      // ∫e^x dx = e^x + C
      result = `e^${variable} + C`;
      steps.push({
        description: `Apply the integral of e^x: ∫e^${variable} d${variable} = e^${variable} + C`,
        expression: result
      });
    }
    else {
      // Default for unhandled expressions
      result = `∫(${cleanedExpression}) d${variable}`;
      steps.push({
        description: "This expression requires more advanced calculus rules.",
        expression: result
      });
    }
    
    return {
      expression: cleanedExpression,
      result,
      steps,
      error: result === `∫(${cleanedExpression}) d${variable}` ? 
        "This is a simplified calculator that handles only basic integrals." : undefined
    };
  } catch (error) {
    return {
      expression,
      result: 'Error',
      steps: [{
        description: 'An error occurred while calculating the integral',
        expression
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Physics-related interfaces and types
export type PhysicsOperation = 'kinematics' | 'dynamics' | 'circuits' | 'laplace';

export interface PhysicsResult {
  input: string;
  result: string;
  steps: PhysicsStep[];
  error?: string;
}

export interface PhysicsStep {
  description: string;
  expression: string;
  value?: string;
}

// Basic kinematics calculations (motion)
export const calculateKinematics = (
  input: string, 
  operation: 'distance' | 'velocity' | 'acceleration' | 'time'
): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    let result = '';
    
    steps.push({
      description: "Parse the kinematics inputs:",
      expression: input
    });
    
    // Parse input format: initialVelocity|finalVelocity|acceleration|time|distance
    // Leave the value to calculate as 'x'
    const parts = input.split('|').map(p => p.trim());
    
    if (parts.length !== 5) {
      throw new Error("Format: initial_v|final_v|acceleration|time|distance (use 'x' for unknown)");
    }
    
    // Extract values, treating 'x' as the unknown
    const initialVelocity = parts[0] === 'x' ? null : parseFloat(parts[0]);
    const finalVelocity = parts[1] === 'x' ? null : parseFloat(parts[1]);
    const acceleration = parts[2] === 'x' ? null : parseFloat(parts[2]);
    const time = parts[3] === 'x' ? null : parseFloat(parts[3]);
    const distance = parts[4] === 'x' ? null : parseFloat(parts[4]);
    
    // Based on operation, calculate the missing value
    switch (operation) {
      case 'distance':
        if (initialVelocity !== null && time !== null) {
          // s = u*t + 0.5*a*t^2
          if (acceleration !== null) {
            result = (initialVelocity * time + 0.5 * acceleration * time * time).toString();
            steps.push({
              description: "Using the formula s = u*t + 0.5*a*t²",
              expression: `s = ${initialVelocity} * ${time} + 0.5 * ${acceleration} * ${time}²`,
              value: result
            });
          } 
          // s = ((u+v)/2) * t
          else if (finalVelocity !== null) {
            result = (((initialVelocity + finalVelocity) / 2) * time).toString();
            steps.push({
              description: "Using the average velocity formula s = ((u+v)/2) * t",
              expression: `s = ((${initialVelocity} + ${finalVelocity})/2) * ${time}`,
              value: result
            });
          }
        }
        break;
        
      case 'velocity':
        if (operation === 'velocity' && parts[0] === 'x') {
          // Calculate initial velocity (u)
          // v = u + a*t
          if (finalVelocity !== null && acceleration !== null && time !== null) {
            result = (finalVelocity - acceleration * time).toString();
            steps.push({
              description: "Using the formula v = u + a*t rearranged to u = v - a*t",
              expression: `u = ${finalVelocity} - ${acceleration} * ${time}`,
              value: result
            });
          } 
          // u = 2*s/t - v
          else if (finalVelocity !== null && distance !== null && time !== null) {
            result = (2 * distance / time - finalVelocity).toString();
            steps.push({
              description: "Using the rearranged formula u = 2*s/t - v",
              expression: `u = 2 * ${distance} / ${time} - ${finalVelocity}`,
              value: result
            });
          }
        }
        else if (operation === 'velocity' && parts[1] === 'x') {
          // Calculate final velocity (v)
          // v = u + a*t
          if (initialVelocity !== null && acceleration !== null && time !== null) {
            result = (initialVelocity + acceleration * time).toString();
            steps.push({
              description: "Using the formula v = u + a*t",
              expression: `v = ${initialVelocity} + ${acceleration} * ${time}`,
              value: result
            });
          }
          // v = 2*s/t - u
          else if (initialVelocity !== null && distance !== null && time !== null) {
            result = (2 * distance / time - initialVelocity).toString();
            steps.push({
              description: "Using the rearranged formula v = 2*s/t - u",
              expression: `v = 2 * ${distance} / ${time} - ${initialVelocity}`,
              value: result
            });
          }
        }
        break;
        
      case 'acceleration':
        // a = (v-u)/t
        if (initialVelocity !== null && finalVelocity !== null && time !== null) {
          result = ((finalVelocity - initialVelocity) / time).toString();
          steps.push({
            description: "Using the formula a = (v-u)/t",
            expression: `a = (${finalVelocity} - ${initialVelocity}) / ${time}`,
            value: result
          });
        }
        // a = 2(s - u*t)/t²
        else if (initialVelocity !== null && distance !== null && time !== null) {
          result = (2 * (distance - initialVelocity * time) / (time * time)).toString();
          steps.push({
            description: "Using the formula a = 2(s - u*t)/t²",
            expression: `a = 2(${distance} - ${initialVelocity} * ${time}) / ${time}²`,
            value: result
          });
        }
        break;
        
      case 'time':
        // t = (v-u)/a
        if (initialVelocity !== null && finalVelocity !== null && acceleration !== null) {
          result = ((finalVelocity - initialVelocity) / acceleration).toString();
          steps.push({
            description: "Using the formula t = (v-u)/a",
            expression: `t = (${finalVelocity} - ${initialVelocity}) / ${acceleration}`,
            value: result
          });
        }
        // Solving quadratic for time with known distance, initial velocity, acceleration
        else if (initialVelocity !== null && distance !== null && acceleration !== null) {
          // Using quadratic formula to solve: 0.5*a*t² + u*t - s = 0
          const a = 0.5 * acceleration;
          const b = initialVelocity;
          const c = -distance;
          
          // Calculate discriminant
          const discriminant = b * b - 4 * a * c;
          
          if (discriminant < 0) {
            throw new Error("No real solution exists with these parameters");
          }
          
          // We usually want the positive solution
          const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          
          steps.push({
            description: "Set up quadratic equation 0.5*a*t² + u*t - s = 0",
            expression: `0.5 * ${acceleration} * t² + ${initialVelocity} * t - ${distance} = 0`
          });
          
          steps.push({
            description: "Using the quadratic formula t = (-b ± √(b² - 4ac))/(2a)",
            expression: `t = (-${b} ± √(${b}² - 4 * ${a} * ${c}))/(2 * ${a})`
          });
          
          // Usually the positive time is the physical solution
          result = (t1 > 0 ? t1 : t2).toString();
          
          steps.push({
            description: "Choose the positive time solution",
            expression: `t = ${result}`,
            value: result
          });
        }
        break;
    }
    
    if (!result) {
      result = "Cannot calculate with the given inputs. Try different parameters.";
    }
    
    return { input, result, steps };
  } catch (error) {
    return {
      input,
      result: 'Error',
      steps: [{
        description: 'An error occurred during kinematics calculation',
        expression: input
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Dynamics calculations (forces, energy)
export const calculateDynamics = (input: string, operation: 'force' | 'energy' | 'momentum'): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    let result = '';
    
    steps.push({
      description: "Parse the dynamics inputs:",
      expression: input
    });
    
    // Parse input based on operation
    if (operation === 'force') {
      // Format: mass|acceleration
      const parts = input.split('|').map(p => p.trim());
      
      if (parts.length !== 2) {
        throw new Error("For force calculation, use format: mass|acceleration");
      }
      
      const mass = parseFloat(parts[0]);
      const acceleration = parseFloat(parts[1]);
      
      if (isNaN(mass) || isNaN(acceleration)) {
        throw new Error("Invalid inputs. Both mass and acceleration must be numbers.");
      }
      
      // F = m*a
      result = (mass * acceleration).toString();
      
      steps.push({
        description: "Using Newton's Second Law: F = m*a",
        expression: `F = ${mass} kg * ${acceleration} m/s² = ${result} N`
      });
    }
    else if (operation === 'energy') {
      // Format: type|param1|param2 (type can be 'kinetic', 'potential', 'mechanical')
      const parts = input.split('|').map(p => p.trim());
      
      if (parts.length < 3) {
        throw new Error("For energy calculation, use format: type|param1|param2");
      }
      
      const energyType = parts[0].toLowerCase();
      
      if (energyType === 'kinetic') {
        // KE = 0.5*m*v²
        const mass = parseFloat(parts[1]);
        const velocity = parseFloat(parts[2]);
        
        if (isNaN(mass) || isNaN(velocity)) {
          throw new Error("Invalid inputs for kinetic energy. Format: kinetic|mass|velocity");
        }
        
        result = (0.5 * mass * velocity * velocity).toString();
        
        steps.push({
          description: "Using the Kinetic Energy formula: KE = 0.5*m*v²",
          expression: `KE = 0.5 * ${mass} kg * (${velocity} m/s)² = ${result} J`
        });
      }
      else if (energyType === 'potential') {
        // PE = m*g*h
        const mass = parseFloat(parts[1]);
        const height = parseFloat(parts[2]);
        const gravity = parts.length > 3 ? parseFloat(parts[3]) : 9.8; // Default g = 9.8 m/s²
        
        if (isNaN(mass) || isNaN(height)) {
          throw new Error("Invalid inputs for potential energy. Format: potential|mass|height|[gravity]");
        }
        
        result = (mass * gravity * height).toString();
        
        steps.push({
          description: "Using the Gravitational Potential Energy formula: PE = m*g*h",
          expression: `PE = ${mass} kg * ${gravity} m/s² * ${height} m = ${result} J`
        });
      }
      else if (energyType === 'mechanical') {
        // ME = KE + PE
        // Format: mechanical|mass|velocity|height|[gravity]
        const mass = parseFloat(parts[1]);
        const velocity = parseFloat(parts[2]);
        const height = parseFloat(parts[3]);
        const gravity = parts.length > 4 ? parseFloat(parts[4]) : 9.8; // Default g = 9.8 m/s²
        
        if (isNaN(mass) || isNaN(velocity) || isNaN(height)) {
          throw new Error("Invalid inputs for mechanical energy. Format: mechanical|mass|velocity|height|[gravity]");
        }
        
        const ke = 0.5 * mass * velocity * velocity;
        const pe = mass * gravity * height;
        result = (ke + pe).toString();
        
        steps.push({
          description: "Calculate Kinetic Energy: KE = 0.5*m*v²",
          expression: `KE = 0.5 * ${mass} kg * (${velocity} m/s)² = ${ke} J`
        });
        
        steps.push({
          description: "Calculate Potential Energy: PE = m*g*h",
          expression: `PE = ${mass} kg * ${gravity} m/s² * ${height} m = ${pe} J`
        });
        
        steps.push({
          description: "Mechanical Energy = KE + PE",
          expression: `ME = ${ke} J + ${pe} J = ${result} J`
        });
      }
    }
    else if (operation === 'momentum') {
      // Format: mass|velocity
      const parts = input.split('|').map(p => p.trim());
      
      if (parts.length !== 2) {
        throw new Error("For momentum calculation, use format: mass|velocity");
      }
      
      const mass = parseFloat(parts[0]);
      const velocity = parseFloat(parts[1]);
      
      if (isNaN(mass) || isNaN(velocity)) {
        throw new Error("Invalid inputs. Both mass and velocity must be numbers.");
      }
      
      // p = m*v
      result = (mass * velocity).toString();
      
      steps.push({
        description: "Using the Linear Momentum formula: p = m*v",
        expression: `p = ${mass} kg * ${velocity} m/s = ${result} kg·m/s`
      });
    }
    
    return { input, result, steps };
  } catch (error) {
    return {
      input,
      result: 'Error',
      steps: [{
        description: 'An error occurred during dynamics calculation',
        expression: input
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Circuit analysis (Kirchhoff's laws)
export const analyzeCircuit = (input: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    let result = '';
    
    steps.push({
      description: "Parse the circuit inputs:",
      expression: input
    });
    
    // Parse input format: type|parameters
    // type can be: ohm, series, parallel, kirchhoff-loop, kirchhoff-node
    const parts = input.split('|').map(p => p.trim());
    
    if (parts.length < 2) {
      throw new Error("Format: type|param1|param2|...");
    }
    
    const circuitType = parts[0].toLowerCase();
    
    if (circuitType === 'ohm') {
      // Ohm's Law calculations (V = I*R)
      // Format: ohm|parameter1|parameter2
      // Parameters can be V|I, V|R, or I|R
      if (parts.length !== 3) {
        throw new Error("For Ohm's Law, use format: ohm|parameter1|parameter2");
      }
      
      const param1 = parseFloat(parts[1]);
      const param2 = parseFloat(parts[2]);
      
      if (isNaN(param1) || isNaN(param2)) {
        throw new Error("Invalid parameters for Ohm's Law");
      }
      
      // Detect parameters based on values
      // Typical voltage: 1.5-240V, current: 0.001-20A, resistance: 1-1000000Ω
      let voltage, current, resistance;
      
      if (param1 >= 0.1 && param1 <= 1000 && param2 >= 0.001 && param2 <= 100) {
        // First is voltage, second is current
        voltage = param1;
        current = param2;
        resistance = voltage / current;
        result = `Resistance = ${resistance} Ω`;
        
        steps.push({
          description: "Using Ohm's Law: V = I*R, rearranged to R = V/I",
          expression: `R = ${voltage} V / ${current} A = ${resistance} Ω`
        });
      }
      else if (param1 >= 0.1 && param1 <= 1000 && param2 >= 1 && param2 <= 1000000) {
        // First is voltage, second is resistance
        voltage = param1;
        resistance = param2;
        current = voltage / resistance;
        result = `Current = ${current} A`;
        
        steps.push({
          description: "Using Ohm's Law: V = I*R, rearranged to I = V/R",
          expression: `I = ${voltage} V / ${resistance} Ω = ${current} A`
        });
      }
      else if (param1 >= 0.001 && param1 <= 100 && param2 >= 1 && param2 <= 1000000) {
        // First is current, second is resistance
        current = param1;
        resistance = param2;
        voltage = current * resistance;
        result = `Voltage = ${voltage} V`;
        
        steps.push({
          description: "Using Ohm's Law: V = I*R",
          expression: `V = ${current} A * ${resistance} Ω = ${voltage} V`
        });
      }
      else {
        // If ambiguous, ask for explicit params
        throw new Error("Please specify explicit parameters: ohm|V=value|I=value or similar");
      }
    }
    else if (circuitType === 'series') {
      // Series circuit calculations
      // Format: series|R1|R2|R3|...
      if (parts.length < 3) {
        throw new Error("For series circuit, provide at least two resistances: series|R1|R2|...");
      }
      
      const resistances = parts.slice(1).map(r => {
        const val = parseFloat(r);
        if (isNaN(val)) {
          throw new Error(`Invalid resistance value: ${r}`);
        }
        return val;
      });
      
      // Total resistance in series: Rtotal = R1 + R2 + R3 + ...
      const totalResistance = resistances.reduce((sum, r) => sum + r, 0);
      result = `Total resistance = ${totalResistance} Ω`;
      
      steps.push({
        description: "For resistors in series, total resistance is the sum of individual resistances",
        expression: `Rtotal = ${resistances.join(' + ')} = ${totalResistance} Ω`
      });
    }
    else if (circuitType === 'parallel') {
      // Parallel circuit calculations
      // Format: parallel|R1|R2|R3|...
      if (parts.length < 3) {
        throw new Error("For parallel circuit, provide at least two resistances: parallel|R1|R2|...");
      }
      
      const resistances = parts.slice(1).map(r => {
        const val = parseFloat(r);
        if (isNaN(val)) {
          throw new Error(`Invalid resistance value: ${r}`);
        }
        return val;
      });
      
      // Total resistance in parallel: 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
      const reciprocalSum = resistances.reduce((sum, r) => sum + 1/r, 0);
      const totalResistance = 1 / reciprocalSum;
      result = `Total resistance = ${totalResistance} Ω`;
      
      steps.push({
        description: "For resistors in parallel, reciprocal of total resistance is the sum of reciprocals",
        expression: `1/Rtotal = ${resistances.map(r => `1/${r}`).join(' + ')}`
      });
      
      steps.push({
        description: "Calculate the reciprocal sum",
        expression: `1/Rtotal = ${reciprocalSum}`
      });
      
      steps.push({
        description: "Find the total resistance",
        expression: `Rtotal = 1 / ${reciprocalSum} = ${totalResistance} Ω`
      });
    }
    else if (circuitType === 'kirchhoff-loop') {
      // Kirchhoff's Voltage Law example
      // Format: kirchhoff-loop|voltage|R1|R2|R3 (solving for current in a simple loop)
      if (parts.length !== 5) {
        throw new Error("For KVL example, use format: kirchhoff-loop|voltage|R1|R2|R3");
      }
      
      const voltage = parseFloat(parts[1]);
      const r1 = parseFloat(parts[2]);
      const r2 = parseFloat(parts[3]);
      const r3 = parseFloat(parts[4]);
      
      if (isNaN(voltage) || isNaN(r1) || isNaN(r2) || isNaN(r3)) {
        throw new Error("Invalid values for KVL calculation");
      }
      
      // Apply KVL: V - I*R1 - I*R2 - I*R3 = 0
      const totalResistance = r1 + r2 + r3;
      const current = voltage / totalResistance;
      result = `Current = ${current} A`;
      
      steps.push({
        description: "Applying Kirchhoff's Voltage Law: ΣV = 0 around the loop",
        expression: `V - I*R1 - I*R2 - I*R3 = 0`
      });
      
      steps.push({
        description: "Rearranging to solve for current I",
        expression: `V = I*(R1 + R2 + R3)`
      });
      
      steps.push({
        description: "Calculating the total resistance in the loop",
        expression: `Rtotal = ${r1} + ${r2} + ${r3} = ${totalResistance} Ω`
      });
      
      steps.push({
        description: "Finding the current using I = V/Rtotal",
        expression: `I = ${voltage} V / ${totalResistance} Ω = ${current} A`
      });
    }
    else if (circuitType === 'kirchhoff-node') {
      // Kirchhoff's Current Law example
      // Format: kirchhoff-node|I1|I2|I3|...|In (finding the final current)
      if (parts.length < 3) {
        throw new Error("For KCL example, use format: kirchhoff-node|I1|I2|I3|...|In (use negative values for currents leaving the node)");
      }
      
      const currents = parts.slice(1).map(i => {
        const val = parseFloat(i);
        if (isNaN(val)) {
          throw new Error(`Invalid current value: ${i}`);
        }
        return val;
      });
      
      // Apply KCL: I1 + I2 + I3 + ... + In = 0
      // If the inputs are incoming currents, the missing one is outgoing (negative)
      const knownCurrentsSum = currents.reduce((sum, i) => sum + i, 0);
      const missingCurrent = -knownCurrentsSum;
      result = `Missing current = ${missingCurrent} A`;
      
      steps.push({
        description: "Applying Kirchhoff's Current Law: ΣI = 0 at a node",
        expression: `${currents.join(' + ')} + Imissing = 0`
      });
      
      steps.push({
        description: "Calculating the sum of known currents",
        expression: `${currents.join(' + ')} = ${knownCurrentsSum} A`
      });
      
      steps.push({
        description: "Solving for the missing current",
        expression: `Imissing = -${knownCurrentsSum} = ${missingCurrent} A`
      });
    }
    
    return { input, result, steps };
  } catch (error) {
    return {
      input,
      result: 'Error',
      steps: [{
        description: 'An error occurred during circuit analysis',
        expression: input
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Laplace Transform calculations for circuit analysis
export const calculateLaplace = (input: string): PhysicsResult => {
  try {
    const steps: PhysicsStep[] = [];
    let result = '';
    
    steps.push({
      description: "Parse the Laplace transform inputs:",
      expression: input
    });
    
    // Parse input format: transform|function
    // transform can be: forward, inverse, circuit
    const parts = input.split('|').map(p => p.trim());
    
    if (parts.length < 2) {
      throw new Error("Format: transform|function");
    }
    
    const transformType = parts[0].toLowerCase();
    const functionStr = parts[1];
    
    if (transformType === 'forward') {
      // Common Laplace Transforms
      if (functionStr === '1') {
        result = '1/s';
        steps.push({
          description: "Applying Laplace transform to the constant function f(t) = 1",
          expression: "L{1} = 1/s, for s > 0"
        });
      }
      else if (functionStr === 't') {
        result = '1/s²';
        steps.push({
          description: "Applying Laplace transform to the function f(t) = t",
          expression: "L{t} = 1/s², for s > 0"
        });
      }
      else if (functionStr === 't^2') {
        result = '2/s³';
        steps.push({
          description: "Applying Laplace transform to the function f(t) = t²",
          expression: "L{t²} = 2/s³, for s > 0"
        });
      }
      else if (functionStr.startsWith('e^') && functionStr.length > 2) {
        const a = parseFloat(functionStr.substring(2));
        if (!isNaN(a)) {
          result = `1/(s-${a})`;
          steps.push({
            description: `Applying Laplace transform to the exponential function f(t) = e^(${a}t)`,
            expression: `L{e^(${a}t)} = 1/(s-${a}), for s > ${a}`
          });
        }
      }
      else if (functionStr.startsWith('sin(') && functionStr.endsWith(')')) {
        const omega = parseFloat(functionStr.substring(4, functionStr.length - 1));
        if (!isNaN(omega)) {
          result = `${omega}/(s²+${omega}²)`;
          steps.push({
            description: `Applying Laplace transform to the sine function f(t) = sin(${omega}t)`,
            expression: `L{sin(${omega}t)} = ${omega}/(s²+${omega}²), for s > 0`
          });
        }
      }
      else if (functionStr.startsWith('cos(') && functionStr.endsWith(')')) {
        const omega = parseFloat(functionStr.substring(4, functionStr.length - 1));
        if (!isNaN(omega)) {
          result = `s/(s²+${omega}²)`;
          steps.push({
            description: `Applying Laplace transform to the cosine function f(t) = cos(${omega}t)`,
            expression: `L{cos(${omega}t)} = s/(s²+${omega}²), for s > 0`
          });
        }
      }
      else {
        result = `L{${functionStr}}`;
        steps.push({
          description: "This specific Laplace transform requires more complex computation than available in this demo",
          expression: `L{${functionStr}}`
        });
      }
    }
    else if (transformType === 'inverse') {
      // Common Inverse Laplace Transforms
      if (functionStr === '1/s') {
        result = '1';
        steps.push({
          description: "Applying inverse Laplace transform to F(s) = 1/s",
          expression: "L⁻¹{1/s} = 1, for t > 0"
        });
      }
      else if (functionStr === '1/s^2') {
        result = 't';
        steps.push({
          description: "Applying inverse Laplace transform to F(s) = 1/s²",
          expression: "L⁻¹{1/s²} = t, for t > 0"
        });
      }
      else if (functionStr === '1/s^3') {
        result = 't²/2';
        steps.push({
          description: "Applying inverse Laplace transform to F(s) = 1/s³",
          expression: "L⁻¹{1/s³} = t²/2, for t > 0"
        });
      }
      else if (functionStr.includes('/(s-') && functionStr.endsWith(')')) {
        // Match 1/(s-a) pattern
        const matches = functionStr.match(/1\/\(s-([^)]+)\)/);
        if (matches && matches.length > 1) {
          const a = parseFloat(matches[1]);
          if (!isNaN(a)) {
            result = `e^(${a}t)`;
            steps.push({
              description: `Applying inverse Laplace transform to F(s) = 1/(s-${a})`,
              expression: `L⁻¹{1/(s-${a})} = e^(${a}t), for t > 0`
            });
          }
        }
      }
      else if (functionStr.includes('/(s^2+') && functionStr.endsWith(')')) {
        // Match ω/(s²+ω²) pattern (sine)
        const matches = functionStr.match(/([^\/]+)\/\(s\^2\+([^)]+)\^2\)/);
        if (matches && matches.length > 2) {
          const omega = parseFloat(matches[2]);
          if (!isNaN(omega)) {
            result = `sin(${omega}t)`;
            steps.push({
              description: `Applying inverse Laplace transform to F(s) = ${omega}/(s²+${omega}²)`,
              expression: `L⁻¹{${omega}/(s²+${omega}²)} = sin(${omega}t), for t > 0`
            });
          }
        }
        
        // Match s/(s²+ω²) pattern (cosine)
        const matchesCos = functionStr.match(/s\/\(s\^2\+([^)]+)\^2\)/);
        if (matchesCos && matchesCos.length > 1) {
          const omega = parseFloat(matchesCos[1]);
          if (!isNaN(omega)) {
            result = `cos(${omega}t)`;
            steps.push({
              description: `Applying inverse Laplace transform to F(s) = s/(s²+${omega}²)`,
              expression: `L⁻¹{s/(s²+${omega}²)} = cos(${omega}t), for t > 0`
            });
          }
        }
      }
      else {
        result = `L⁻¹{${functionStr}}`;
        steps.push({
          description: "This specific inverse Laplace transform requires more complex computation than available in this demo",
          expression: `L⁻¹{${functionStr}}`
        });
      }
    }
    else if (transformType === 'circuit') {
      // Circuit analysis using Laplace transforms
      // Format: circuit|type|parameters
      if (parts.length < 3) {
        throw new Error("For circuit analysis with Laplace, use format: circuit|type|parameters");
      }
      
      const circuitType = parts[2].toLowerCase();
      
      if (circuitType === 'rc') {
        // RC circuit analysis (charging/discharging)
        // Format: circuit|rc|R|C|V
        if (parts.length !== 6) {
          throw new Error("For RC circuit, use format: laplace|circuit|rc|R|C|V");
        }
        
        const r = parseFloat(parts[3]);
        const c = parseFloat(parts[4]);
        const v = parseFloat(parts[5]);
        
        if (isNaN(r) || isNaN(c) || isNaN(v)) {
          throw new Error("Invalid values for RC circuit");
        }
        
        // Time constant
        const tau = r * c;
        
        // Charging capacitor voltage: v(t) = V * (1 - e^(-t/RC))
        result = `v(t) = ${v} * (1 - e^(-t/${tau}))`;
        
        steps.push({
          description: "Setting up the differential equation for capacitor charging",
          expression: "RC dv/dt + v = V"
        });
        
        steps.push({
          description: "Taking Laplace transform of both sides",
          expression: "RCs V(s) - RCv(0) + V(s) = V/s"
        });
        
        steps.push({
          description: "Initial condition: v(0) = 0",
          expression: "RCs V(s) + V(s) = V/s"
        });
        
        steps.push({
          description: "Solving for V(s)",
          expression: "V(s) = V/[s(1 + RCs)] = V/[s(1 + τs)]"
        });
        
        steps.push({
          description: "Calculating the time constant τ = RC",
          expression: `τ = ${r} * ${c} = ${tau} seconds`
        });
        
        steps.push({
          description: "Taking inverse Laplace transform to find v(t)",
          expression: `v(t) = ${v} * (1 - e^(-t/${tau}))`
        });
      }
      else if (circuitType === 'rl') {
        // RL circuit analysis
        // Format: circuit|rl|R|L|V
        if (parts.length !== 6) {
          throw new Error("For RL circuit, use format: laplace|circuit|rl|R|L|V");
        }
        
        const r = parseFloat(parts[3]);
        const l = parseFloat(parts[4]);
        const v = parseFloat(parts[5]);
        
        if (isNaN(r) || isNaN(l) || isNaN(v)) {
          throw new Error("Invalid values for RL circuit");
        }
        
        // Time constant
        const tau = l / r;
        
        // Current: i(t) = (V/R) * (1 - e^(-Rt/L))
        result = `i(t) = ${v/r} * (1 - e^(-t/${tau}))`;
        
        steps.push({
          description: "Setting up the differential equation for inductor current",
          expression: "L di/dt + Ri = V"
        });
        
        steps.push({
          description: "Taking Laplace transform of both sides",
          expression: "Ls I(s) - Li(0) + R I(s) = V/s"
        });
        
        steps.push({
          description: "Initial condition: i(0) = 0",
          expression: "Ls I(s) + R I(s) = V/s"
        });
        
        steps.push({
          description: "Solving for I(s)",
          expression: "I(s) = V/[s(R + Ls)] = V/[sR(1 + Ls/R)]"
        });
        
        steps.push({
          description: "Calculating the time constant τ = L/R",
          expression: `τ = ${l} / ${r} = ${tau} seconds`
        });
        
        steps.push({
          description: "Taking inverse Laplace transform to find i(t)",
          expression: `i(t) = ${v/r} * (1 - e^(-t/${tau}))`
        });
      }
      else if (circuitType === 'rlc') {
        // RLC circuit analysis (series)
        // Format: circuit|rlc|R|L|C|V
        if (parts.length !== 7) {
          throw new Error("For RLC circuit, use format: laplace|circuit|rlc|R|L|C|V");
        }
        
        const r = parseFloat(parts[3]);
        const l = parseFloat(parts[4]);
        const c = parseFloat(parts[5]);
        const v = parseFloat(parts[6]);
        
        if (isNaN(r) || isNaN(l) || isNaN(c) || isNaN(v)) {
          throw new Error("Invalid values for RLC circuit");
        }
        
        // Damping factor
        const alpha = r / (2 * l);
        
        // Resonant frequency
        const omega0 = 1 / Math.sqrt(l * c);
        
        // Damped frequency
        const omegaD = Math.sqrt(omega0*omega0 - alpha*alpha);
        
        steps.push({
          description: "Setting up the differential equation for RLC circuit",
          expression: "L d²q/dt² + R dq/dt + (1/C)q = V"
        });
        
        steps.push({
          description: "Taking Laplace transform",
          expression: "Ls² Q(s) - Lsq(0) - Lq'(0) + Rs Q(s) - Rq(0) + (1/C)Q(s) = V/s"
        });
        
        steps.push({
          description: "Initial conditions: q(0) = 0, q'(0) = 0",
          expression: "Ls² Q(s) + Rs Q(s) + (1/C)Q(s) = V/s"
        });
        
        steps.push({
          description: "Solving for Q(s)",
          expression: "Q(s) = V / [s(Ls² + Rs + 1/C)]"
        });
        
        steps.push({
          description: "Calculating the damping factor α = R/(2L)",
          expression: `α = ${r}/(2*${l}) = ${alpha}`
        });
        
        steps.push({
          description: "Calculating the resonant frequency ω₀ = 1/√(LC)",
          expression: `ω₀ = 1/√(${l}*${c}) = ${omega0} rad/s`
        });
        
        // Case 1: Underdamped (α < ω₀)
        if (alpha < omega0) {
          steps.push({
            description: "System is underdamped (α < ω₀)",
            expression: `${alpha} < ${omega0}`
          });
          
          steps.push({
            description: "Calculating damped frequency ωd = √(ω₀² - α²)",
            expression: `ωd = √(${omega0}² - ${alpha}²) = ${omegaD} rad/s`
          });
          
          result = `q(t) = (${v}C/ωd) * e^(-${alpha}t) * sin(${omegaD}t)`;
          
          steps.push({
            description: "The charge on the capacitor is",
            expression: result
          });
        }
        // Case 2: Critically damped (α = ω₀)
        else if (Math.abs(alpha - omega0) < 0.001) {
          steps.push({
            description: "System is critically damped (α = ω₀)",
            expression: `${alpha} ≈ ${omega0}`
          });
          
          result = `q(t) = ${v}Ct * e^(-${alpha}t)`;
          
          steps.push({
            description: "The charge on the capacitor is",
            expression: result
          });
        }
        // Case 3: Overdamped (α > ω₀)
        else {
          steps.push({
            description: "System is overdamped (α > ω₀)",
            expression: `${alpha} > ${omega0}`
          });
          
          const s1 = -alpha + Math.sqrt(alpha*alpha - omega0*omega0);
          const s2 = -alpha - Math.sqrt(alpha*alpha - omega0*omega0);
          
          result = `q(t) = ${v}C * [(e^(${s1}t) - e^(${s2}t))/(${s1} - ${s2})]`;
          
          steps.push({
            description: "The charge on the capacitor is",
            expression: result
          });
        }
      }
    }
    
    if (!result) {
      result = "This Laplace transform calculation is not implemented in this demo";
    }
    
    return { input, result, steps };
  } catch (error) {
    return {
      input,
      result: 'Error',
      steps: [{
        description: 'An error occurred during Laplace transform calculation',
        expression: input
      }],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
