
import { ChemistryResult, ChemistryStep } from "./CalculatorUtils";

// Interface for matrix operations (used for balancing complex equations)
interface Matrix {
  values: number[][];
  rows: number;
  cols: number;
}

// Enhanced element data with more properties
interface ElementData {
  name: string;
  atomicNumber: number;
  atomicMass: number;
  electronConfig?: string;
  oxidationStates?: number[];
  electronegativity?: number;
}

// Enhanced periodic table with more data
export const enhancedPeriodicTable: Record<string, ElementData> = {
  "H": { 
    name: "Hydrogen", 
    atomicNumber: 1, 
    atomicMass: 1.008,
    electronConfig: "1s¹",
    oxidationStates: [-1, 1],
    electronegativity: 2.20
  },
  "He": { 
    name: "Helium", 
    atomicNumber: 2, 
    atomicMass: 4.0026,
    electronConfig: "1s²",
    oxidationStates: [0],
    electronegativity: 0
  },
  "Li": { 
    name: "Lithium", 
    atomicNumber: 3, 
    atomicMass: 6.94,
    electronConfig: "1s² 2s¹",
    oxidationStates: [1],
    electronegativity: 0.98
  },
  "Be": { 
    name: "Beryllium", 
    atomicNumber: 4, 
    atomicMass: 9.0122,
    electronConfig: "1s² 2s²",
    oxidationStates: [2],
    electronegativity: 1.57
  },
  "B": { 
    name: "Boron", 
    atomicNumber: 5, 
    atomicMass: 10.81,
    electronConfig: "1s² 2s² 2p¹",
    oxidationStates: [3],
    electronegativity: 2.04
  },
  "C": { 
    name: "Carbon", 
    atomicNumber: 6, 
    atomicMass: 12.011,
    electronConfig: "1s² 2s² 2p²",
    oxidationStates: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    electronegativity: 2.55
  },
  "N": { 
    name: "Nitrogen", 
    atomicNumber: 7, 
    atomicMass: 14.007,
    electronConfig: "1s² 2s² 2p³",
    oxidationStates: [-3, -2, -1, 1, 2, 3, 4, 5],
    electronegativity: 3.04
  },
  "O": { 
    name: "Oxygen", 
    atomicNumber: 8, 
    atomicMass: 15.999,
    electronConfig: "1s² 2s² 2p⁴",
    oxidationStates: [-2, -1, 1, 2],
    electronegativity: 3.44
  },
  "F": { 
    name: "Fluorine", 
    atomicNumber: 9, 
    atomicMass: 18.998,
    electronConfig: "1s² 2s² 2p⁵",
    oxidationStates: [-1],
    electronegativity: 3.98
  },
  "Ne": { 
    name: "Neon", 
    atomicNumber: 10, 
    atomicMass: 20.180,
    electronConfig: "1s² 2s² 2p⁶",
    oxidationStates: [0],
    electronegativity: 0
  },
  // More elements would be included here, following the same pattern
  "Na": { name: "Sodium", atomicNumber: 11, atomicMass: 22.990, oxidationStates: [1], electronegativity: 0.93 },
  "Mg": { name: "Magnesium", atomicNumber: 12, atomicMass: 24.305, oxidationStates: [2], electronegativity: 1.31 },
  "Al": { name: "Aluminum", atomicNumber: 13, atomicMass: 26.982, oxidationStates: [3], electronegativity: 1.61 },
  "Si": { name: "Silicon", atomicNumber: 14, atomicMass: 28.085, oxidationStates: [-4, -3, -2, -1, 1, 2, 3, 4], electronegativity: 1.90 },
  "P": { name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974, oxidationStates: [-3, 3, 5], electronegativity: 2.19 },
  "S": { name: "Sulfur", atomicNumber: 16, atomicMass: 32.06, oxidationStates: [-2, 2, 4, 6], electronegativity: 2.58 },
  "Cl": { name: "Chlorine", atomicNumber: 17, atomicMass: 35.45, oxidationStates: [-1, 1, 3, 5, 7], electronegativity: 3.16 },
  "Ar": { name: "Argon", atomicNumber: 18, atomicMass: 39.948, oxidationStates: [0], electronegativity: 0 },
  "K": { name: "Potassium", atomicNumber: 19, atomicMass: 39.098, oxidationStates: [1], electronegativity: 0.82 },
  "Ca": { name: "Calcium", atomicNumber: 20, atomicMass: 40.078, oxidationStates: [2], electronegativity: 1.00 },
  "Fe": { name: "Iron", atomicNumber: 26, atomicMass: 55.845, oxidationStates: [2, 3], electronegativity: 1.83 },
  "Cu": { name: "Copper", atomicNumber: 29, atomicMass: 63.546, oxidationStates: [1, 2], electronegativity: 1.90 },
  "Zn": { name: "Zinc", atomicNumber: 30, atomicMass: 65.38, oxidationStates: [2], electronegativity: 1.65 },
  "Ag": { name: "Silver", atomicNumber: 47, atomicMass: 107.87, oxidationStates: [1], electronegativity: 1.93 },
  "Au": { name: "Gold", atomicNumber: 79, atomicMass: 196.97, oxidationStates: [1, 3], electronegativity: 2.54 },
};

// Interfaces for chemical equations
export interface ChemicalElement {
  symbol: string;
  count: number;
  charge?: number; // For ions
  state?: string;  // For states of matter (s, l, g, aq)
}

export interface ChemicalCompound {
  elements: ChemicalElement[];
  coefficient: number;
  charge?: number; // For complex ions
  state?: string;  // For states of matter (s, l, g, aq)
}

// Enhanced parser that handles more complex chemical formulas
export class ChemicalFormulaParser {
  // Parse a formula into elements and their counts
  static parseFormula(formula: string): ChemicalElement[] {
    const elements: ChemicalElement[] = [];
    let i = 0;
    let state: string | undefined;
    let charge: number | undefined;

    // Check for state indicators at the end (s), (l), (g), (aq)
    const stateMatch = formula.match(/\((s|l|g|aq)\)$/);
    if (stateMatch) {
      state = stateMatch[1];
      formula = formula.substring(0, stateMatch.index);
    }

    // Check for charge indicators like 2+, 3-, etc.
    const chargeMatch = formula.match(/\^([0-9]*)([+\-])$/);
    if (chargeMatch) {
      const magnitude = chargeMatch[1] ? parseInt(chargeMatch[1], 10) : 1;
      const sign = chargeMatch[2] === '+' ? 1 : -1;
      charge = magnitude * sign;
      formula = formula.substring(0, chargeMatch.index);
    }

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
        
        // Handle parentheses for complex formulas like Ca(OH)2
        let count = 1;
        let subCount = '';
        
        // Handle nested parentheses using a stack
        if (i < formula.length && formula[i] === '(') {
          const openParenIndex = i;
          i++;
          let nestedLevel = 1;
          
          // Find matching closing parenthesis
          while (i < formula.length && nestedLevel > 0) {
            if (formula[i] === '(') nestedLevel++;
            if (formula[i] === ')') nestedLevel--;
            i++;
          }
          
          // Get subscript for the parentheses group
          while (i < formula.length && /[0-9]/.test(formula[i])) {
            subCount += formula[i];
            i++;
          }
          
          const subFormula = formula.substring(openParenIndex + 1, i - (subCount.length > 0 ? subCount.length + 1 : 1));
          const subElements = this.parseFormula(subFormula);
          const multiplier = subCount ? parseInt(subCount, 10) : 1;
          
          // Apply multiplier to each element in the sub-formula
          subElements.forEach(subElement => {
            const existingElement = elements.find(e => e.symbol === subElement.symbol);
            if (existingElement) {
              existingElement.count += subElement.count * multiplier;
            } else {
              elements.push({
                symbol: subElement.symbol,
                count: subElement.count * multiplier
              });
            }
          });
          
          continue;
        }
        
        // Check for a number or a subscript following the symbol
        let countStr = '';
        while (i < formula.length && /[0-9]/.test(formula[i])) {
          countStr += formula[i];
          i++;
        }
        
        count = countStr ? parseInt(countStr, 10) : 1;
        
        // Check if this element already exists in our list
        const existingElement = elements.find(e => e.symbol === symbol);
        if (existingElement) {
          existingElement.count += count;
        } else {
          elements.push({ symbol, count });
        }
      } else {
        // Skip any other characters
        i++;
      }
    }
    
    // Apply state and charge to all elements if applicable
    if (state || charge !== undefined) {
      elements.forEach(element => {
        if (state) element.state = state;
        if (charge !== undefined) element.charge = charge;
      });
    }
    
    return elements;
  }
}

// Class for handling chemical equation balancing
export class EquationBalancer {
  // Parse a chemical equation side (left or right of the arrow)
  static parseEquationSide(side: string): ChemicalCompound[] {
    const compounds: ChemicalCompound[] = [];
    
    // Split by + to get individual compounds
    const compoundStrings = side.split('+').map(s => s.trim()).filter(s => s.length > 0);
    
    for (const compoundStr of compoundStrings) {
      // Check for coefficient
      const coefficientMatch = compoundStr.match(/^(\d+)(.+)$/);
      let coefficient = 1;
      let formulaStr = compoundStr;
      let state: string | undefined;
      let charge: number | undefined;
      
      if (coefficientMatch) {
        coefficient = parseInt(coefficientMatch[1], 10);
        formulaStr = coefficientMatch[2].trim();
      }
      
      // Check for state indicators (s), (l), (g), (aq)
      const stateMatch = formulaStr.match(/\((s|l|g|aq)\)$/);
      if (stateMatch) {
        state = stateMatch[1];
        formulaStr = formulaStr.substring(0, stateMatch.index).trim();
      }
      
      // Check for charge indicators like ^2+, ^3-, etc.
      const chargeMatch = formulaStr.match(/\^([0-9]*)([+\-])$/);
      if (chargeMatch) {
        const magnitude = chargeMatch[1] ? parseInt(chargeMatch[1], 10) : 1;
        const sign = chargeMatch[2] === '+' ? 1 : -1;
        charge = magnitude * sign;
        formulaStr = formulaStr.substring(0, chargeMatch.index).trim();
      }
      
      const elements = ChemicalFormulaParser.parseFormula(formulaStr);
      compounds.push({
        elements,
        coefficient,
        state,
        charge
      });
    }
    
    return compounds;
  }

  // Parse a full chemical equation
  static parseEquation(equation: string): { reactants: ChemicalCompound[], products: ChemicalCompound[] } {
    // Replace arrow variants with a standard one
    const standardizedEquation = equation
      .replace(/⟶|⇌|=>|→|-->|—>|⟹|⟾/g, '→')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Split by the arrow
    const sides = standardizedEquation.split('→').map(s => s.trim());
    
    if (sides.length !== 2) {
      throw new Error('Invalid equation format. Use format like "H2 + O2 → H2O"');
    }
    
    const reactants = this.parseEquationSide(sides[0]);
    const products = this.parseEquationSide(sides[1]);
    
    return { reactants, products };
  }

  // Count elements on each side of the equation
  static countElements(compounds: ChemicalCompound[]): Map<string, number> {
    const elementCounts = new Map<string, number>();
    
    for (const compound of compounds) {
      for (const element of compound.elements) {
        const totalCount = element.count * compound.coefficient;
        const currentCount = elementCounts.get(element.symbol) || 0;
        elementCounts.set(element.symbol, currentCount + totalCount);
      }
    }
    
    return elementCounts;
  }

  // Create a matrix for solving the linear system
  static createMatrix(reactants: ChemicalCompound[], products: ChemicalCompound[]): Matrix {
    // Get all unique elements
    const allElements = new Set<string>();
    
    for (const compound of [...reactants, ...products]) {
      for (const element of compound.elements) {
        allElements.add(element.symbol);
      }
    }
    
    const elements = Array.from(allElements);
    
    // Create coefficient matrix: rows are elements, columns are compounds
    const matrix: Matrix = {
      values: [],
      rows: elements.length,
      cols: reactants.length + products.length + 1  // +1 for the constant terms column
    };
    
    // Initialize matrix with zeros
    for (let i = 0; i < matrix.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < matrix.cols; j++) {
        row.push(0);
      }
      matrix.values.push(row);
    }
    
    // Fill matrix with element counts
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      // Reactants (positive coefficients)
      for (let j = 0; j < reactants.length; j++) {
        const compound = reactants[j];
        const elementObj = compound.elements.find(e => e.symbol === element);
        if (elementObj) {
          matrix.values[i][j] = elementObj.count;
        }
      }
      
      // Products (negative coefficients)
      for (let j = 0; j < products.length; j++) {
        const compound = products[j];
        const elementObj = compound.elements.find(e => e.symbol === element);
        if (elementObj) {
          matrix.values[i][reactants.length + j] = -elementObj.count;
        }
      }
    }
    
    return matrix;
  }

  // Perform Gaussian elimination to solve the matrix
  static gaussianElimination(matrix: Matrix): number[] {
    const m = matrix.values;
    const rows = matrix.rows;
    const cols = matrix.cols;
    
    // Forward elimination
    for (let i = 0; i < rows; i++) {
      // Find pivot row
      let maxRow = i;
      for (let j = i + 1; j < rows; j++) {
        if (Math.abs(m[j][i]) > Math.abs(m[maxRow][i])) {
          maxRow = j;
        }
      }
      
      // Swap rows if needed
      if (maxRow !== i) {
        [m[i], m[maxRow]] = [m[maxRow], m[i]];
      }
      
      // Skip if pivot is zero
      if (Math.abs(m[i][i]) < 1e-10) continue;
      
      // Scale pivot row
      const pivotValue = m[i][i];
      for (let j = i; j < cols; j++) {
        m[i][j] /= pivotValue;
      }
      
      // Eliminate other rows
      for (let j = 0; j < rows; j++) {
        if (j === i) continue;
        
        const factor = m[j][i];
        for (let k = i; k < cols; k++) {
          m[j][k] -= factor * m[i][k];
        }
      }
    }
    
    // Back substitution
    const solution: number[] = [];
    for (let i = 0; i < cols - 1; i++) {
      solution[i] = 0;
    }
    
    for (let i = 0; i < rows; i++) {
      if (Math.abs(m[i][i]) > 1e-10) {
        solution[i] = m[i][cols - 1];
      }
    }
    
    return solution;
  }

  // Find integer coefficients by scaling
  static findIntegerCoefficients(coefficients: number[]): number[] {
    // Find smallest non-zero coefficient
    let minCoeff = Infinity;
    for (const coeff of coefficients) {
      if (coeff !== 0 && Math.abs(coeff) < minCoeff) {
        minCoeff = Math.abs(coeff);
      }
    }
    
    // Scale all coefficients
    const scaledCoeffs = coefficients.map(coeff => coeff / minCoeff);
    
    // Find common denominator to convert to integers
    let precision = 1e6; // Allow for reasonable precision
    let commonDenom = 1;
    for (const coeff of scaledCoeffs) {
      const decimal = coeff - Math.floor(coeff);
      if (decimal > 0 && decimal < 1) {
        // Find the denominator for this decimal
        for (let i = 2; i <= precision; i++) {
          if (Math.abs(Math.round(decimal * i) - (decimal * i)) < 1e-10) {
            commonDenom = Math.max(commonDenom, i);
            break;
          }
        }
      }
    }
    
    // Scale and round to integers
    const intCoeffs = scaledCoeffs.map(coeff => Math.round(coeff * commonDenom));
    
    // Find GCD to simplify
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    
    let divisor = Math.abs(intCoeffs[0]);
    for (let i = 1; i < intCoeffs.length; i++) {
      divisor = gcd(divisor, Math.abs(intCoeffs[i]));
    }
    
    // Divide by GCD
    return intCoeffs.map(coeff => coeff / divisor);
  }

  // Balance a chemical equation using advanced linear algebra
  static balanceEquation(equation: string): ChemistryResult {
    const steps: ChemistryStep[] = [];
    let result = '';
    
    try {
      steps.push({
        description: "Parse the chemical equation:",
        expression: equation
      });
      
      // Parse equation
      const { reactants, products } = this.parseEquation(equation);
      
      steps.push({
        description: "Identify compounds in the reaction:",
        expression: `Reactants: ${reactants.map(r => 
          r.elements.map(e => e.symbol + (e.count > 1 ? e.count : '')).join('')
        ).join(', ')}\nProducts: ${products.map(p => 
          p.elements.map(e => e.symbol + (e.count > 1 ? e.count : '')).join('')
        ).join(', ')}`
      });
      
      // Create matrix
      const matrix = this.createMatrix(reactants, products);
      
      steps.push({
        description: "Set up system of linear equations:",
        expression: "Each row represents conservation of an element, each column represents a compound coefficient"
      });
      
      // Set first coefficient to 1 to avoid trivial solution
      if (reactants.length > 0) {
        reactants[0].coefficient = 1;
        for (let i = 0; i < matrix.rows; i++) {
          matrix.values[i][matrix.cols - 1] = -matrix.values[i][0];
          matrix.values[i][0] = 0;
        }
      }
      
      // Solve using Gaussian elimination
      const solution = this.gaussianElimination(matrix);
      
      steps.push({
        description: "Solve the system of equations using Gaussian elimination",
        expression: "Finding the set of coefficients that balances all elements"
      });
      
      // Convert to integers and assign coefficients
      const intCoeffs = this.findIntegerCoefficients([1, ...solution]);
      
      steps.push({
        description: "Convert to integer coefficients:",
        expression: `Coefficients: ${intCoeffs.join(', ')}`
      });
      
      // Assign coefficients to compounds
      for (let i = 0; i < reactants.length; i++) {
        reactants[i].coefficient = intCoeffs[i];
      }
      
      for (let i = 0; i < products.length; i++) {
        products[i].coefficient = intCoeffs[i + reactants.length];
      }
      
      // Format the balanced equation
      const formatCompound = (compound: ChemicalCompound): string => {
        const coeff = compound.coefficient === 1 ? '' : compound.coefficient;
        const formula = compound.elements.map(e => 
          e.symbol + (e.count > 1 ? e.count : '')
        ).join('');
        const state = compound.state ? `(${compound.state})` : '';
        const charge = compound.charge ? 
          (compound.charge > 0 ? `^${compound.charge > 1 ? compound.charge : ''}+` : 
            `^${Math.abs(compound.charge) > 1 ? Math.abs(compound.charge) : ''}-`) : '';
        return `${coeff}${formula}${state}${charge}`;
      };
      
      const reactantStr = reactants.map(formatCompound).join(' + ');
      const productStr = products.map(formatCompound).join(' + ');
      result = `${reactantStr} → ${productStr}`;
      
      // Verify balance
      const reactantElements = this.countElements(reactants);
      const productElements = this.countElements(products);
      
      let balanced = true;
      for (const [element, count] of reactantElements.entries()) {
        if (count !== (productElements.get(element) || 0)) {
          balanced = false;
          break;
        }
      }
      
      steps.push({
        description: "Verify balance by counting atoms on each side:",
        expression: `Reactants: ${Array.from(reactantElements.entries()).map(([el, count]) => `${el}: ${count}`).join(', ')}\nProducts: ${Array.from(productElements.entries()).map(([el, count]) => `${el}: ${count}`).join(', ')}\nBalance status: ${balanced ? 'Balanced ✓' : 'Not balanced ✗'}`
      });
      
      steps.push({
        description: "Balanced equation:",
        expression: result
      });
      
      return {
        equation,
        result,
        steps,
        error: balanced ? undefined : "Could not fully balance the equation."
      };
      
    } catch (error) {
      console.error("Error balancing chemical equation:", error);
      return {
        equation,
        result: "Error",
        steps: [{ 
          description: "Error", 
          expression: error instanceof Error ? error.message : "Unknown error" 
        }],
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }

  // Format a chemical compound for display
  static formatCompound(compound: ChemicalCompound): string {
    const coeff = compound.coefficient === 1 ? '' : compound.coefficient;
    const formula = compound.elements.map(e => {
      return e.symbol + (e.count > 1 ? e.count : '');
    }).join('');
    
    return `${coeff}${formula}`;
  }
  
  // Format the balanced equation as a string
  static formatEquation(reactants: ChemicalCompound[], products: ChemicalCompound[]): string {
    return `${reactants.map(this.formatCompound).join(' + ')} → ${products.map(this.formatCompound).join(' + ')}`;
  }
}

// Public function to balance a chemical equation using the enhanced algorithm
export const balanceChemicalEquationEnhanced = (equation: string): ChemistryResult => {
  try {
    return EquationBalancer.balanceEquation(equation);
  } catch (error) {
    console.error("Error in enhanced equation balancer:", error);
    return {
      equation,
      result: "Error",
      steps: [{ 
        description: "Error in equation balancing", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Function to help with chemical redox reactions
export const analyzeRedoxReaction = (equation: string): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    
    // First, balance the equation
    const balancedResult = EquationBalancer.balanceEquation(equation);
    const { reactants, products } = EquationBalancer.parseEquation(balancedResult.result);
    
    steps.push(...balancedResult.steps);
    steps.push({
      description: "Now analyzing redox components:",
      expression: "Identifying oxidation states of elements"
    });
    
    // Identify elements likely to undergo redox
    const redoxElements = new Set<string>();
    
    for (const compound of [...reactants, ...products]) {
      for (const element of compound.elements) {
        // Common redox-active elements
        if (['Fe', 'Cu', 'Zn', 'Ag', 'Au', 'H', 'O', 'N', 'S', 'C', 'Cl', 'Br', 'I', 'F', 'Mn', 'Cr'].includes(element.symbol)) {
          redoxElements.add(element.symbol);
        }
      }
    }
    
    // Check for oxidation and reduction (simplified approach)
    let oxidationMessage = '';
    let reductionMessage = '';
    
    for (const element of redoxElements) {
      // Simplified detection based on common patterns
      if (['O', 'F', 'Cl', 'Br', 'I'].includes(element)) {
        oxidationMessage += `${element} is often an oxidizing agent.\n`;
      }
      
      if (['H', 'Na', 'K', 'Li', 'Ca', 'Mg', 'Al', 'Zn'].includes(element)) {
        reductionMessage += `${element} is often a reducing agent.\n`;
      }
    }
    
    steps.push({
      description: "Redox analysis:",
      expression: `${oxidationMessage}\n${reductionMessage}\nNote: Full redox analysis requires assigning oxidation states to each element and tracking changes.`
    });
    
    return {
      equation: balancedResult.result,
      result: `${balancedResult.result} (Redox reaction identified)`,
      steps
    };
  } catch (error) {
    return {
      equation,
      result: "Error",
      steps: [{ 
        description: "Error in redox analysis", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Function for parsing and displaying molecular properties
export const analyzeMolecule = (formula: string): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    let result = '';
    
    steps.push({
      description: "Analyzing molecular formula:",
      expression: formula
    });
    
    // Parse the formula
    const elements = ChemicalFormulaParser.parseFormula(formula);
    
    // Calculate molar mass
    let molarMass = 0;
    for (const element of elements) {
      const elementData = enhancedPeriodicTable[element.symbol];
      if (!elementData) {
        throw new Error(`Unknown element: ${element.symbol}`);
      }
      molarMass += elementData.atomicMass * element.count;
    }
    
    steps.push({
      description: "Calculate molar mass:",
      expression: elements.map(e => {
        const elementData = enhancedPeriodicTable[e.symbol];
        return `${e.symbol}: ${e.count} × ${elementData?.atomicMass.toFixed(3)} g/mol = ${(e.count * (elementData?.atomicMass || 0)).toFixed(3)} g/mol`;
      }).join('\n')
    });
    
    steps.push({
      description: "Total molar mass:",
      expression: `${molarMass.toFixed(3)} g/mol`
    });
    
    // Determine empirical formula
    const empiricalFormula = () => {
      // Find the smallest count
      const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
      };
      
      let divisor = elements[0].count;
      for (let i = 1; i < elements.length; i++) {
        divisor = gcd(divisor, elements[i].count);
      }
      
      // Create empirical formula
      return elements.map(e => `${e.symbol}${e.count / divisor === 1 ? '' : e.count / divisor}`).join('');
    };
    
    steps.push({
      description: "Empirical formula:",
      expression: empiricalFormula()
    });
    
    // Display element composition
    steps.push({
      description: "Element composition (% by mass):",
      expression: elements.map(e => {
        const elementData = enhancedPeriodicTable[e.symbol];
        const massPercent = (e.count * (elementData?.atomicMass || 0) / molarMass) * 100;
        return `${e.symbol}: ${massPercent.toFixed(2)}%`;
      }).join('\n')
    });
    
    result = `M(${formula}) = ${molarMass.toFixed(3)} g/mol`;
    
    return {
      equation: formula,
      result,
      steps
    };
  } catch (error) {
    return {
      equation: formula,
      result: "Error",
      steps: [{ 
        description: "Error analyzing molecule", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Function to perform stoichiometry calculations with enhanced error handling
export const calculateStoichiometryEnhanced = (
  equation: string,
  knownAmount: number,
  knownCompound: string,
  targetCompound: string,
  unit: string = "g"
): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    
    steps.push({
      description: "Starting with chemical equation:",
      expression: equation
    });
    
    // First, balance the equation using the enhanced balancer
    const balancedResult = EquationBalancer.balanceEquation(equation);
    const balancedEquation = balancedResult.result;
    
    steps.push({
      description: "Using balanced equation:",
      expression: balancedEquation
    });
    
    // Parse the balanced equation
    const { reactants, products } = EquationBalancer.parseEquation(balancedEquation);
    
    // Combine all compounds into one array for easier searching
    const allCompounds = [...reactants, ...products];
    
    // Find the known and target compounds by formula
    let knownCompoundObj: ChemicalCompound | undefined;
    let targetCompoundObj: ChemicalCompound | undefined;
    
    for (const compound of allCompounds) {
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
      throw new Error(`Compound ${knownCompound} not found in the balanced equation`);
    }
    
    if (!targetCompoundObj) {
      throw new Error(`Compound ${targetCompound} not found in the balanced equation`);
    }
    
    // Calculate molar masses
    const calculateMolarMass = (elements: ChemicalElement[]): number => {
      let mass = 0;
      for (const element of elements) {
        const elementData = enhancedPeriodicTable[element.symbol];
        if (!elementData) {
          throw new Error(`Unknown element: ${element.symbol}`);
        }
        mass += elementData.atomicMass * element.count;
      }
      return mass;
    };
    
    const knownMolarMass = calculateMolarMass(knownCompoundObj.elements);
    const targetMolarMass = calculateMolarMass(targetCompoundObj.elements);
    
    steps.push({
      description: "Calculate molar masses:",
      expression: `${knownCompound}: ${knownMolarMass.toFixed(2)} g/mol\n${targetCompound}: ${targetMolarMass.toFixed(2)} g/mol`
    });
    
    // Convert known amount to moles
    const knownMoles = unit === "g" 
      ? knownAmount / knownMolarMass 
      : unit === "mol"
        ? knownAmount
        : knownAmount / 6.022e23; // If unit is "molecules"
    
    steps.push({
      description: `Convert ${knownAmount} ${unit} of ${knownCompound} to moles:`,
      expression: `${knownAmount} ${unit} = ${knownMoles.toExponential(4)} mol`
    });
    
    // Use the ratio from the balanced equation to find target moles
    const moleRatio = targetCompoundObj.coefficient / knownCompoundObj.coefficient;
    const targetMoles = knownMoles * moleRatio;
    
    steps.push({
      description: "Apply stoichiometric ratio from balanced equation:",
      expression: `Mole ratio ${targetCompound}:${knownCompound} = ${targetCompoundObj.coefficient}:${knownCompoundObj.coefficient} = ${moleRatio}\n${knownMoles.toExponential(4)} mol × ${moleRatio} = ${targetMoles.toExponential(4)} mol of ${targetCompound}`
    });
    
    // Convert target moles to grams
    const targetGrams = targetMoles * targetMolarMass;
    
    steps.push({
      description: "Convert target moles to grams:",
      expression: `${targetMoles.toExponential(4)} mol × ${targetMolarMass.toFixed(2)} g/mol = ${targetGrams.toFixed(4)} g`
    });
    
    // Calculate molecules
    const targetMolecules = targetMoles * 6.022e23;
    
    steps.push({
      description: "Calculate number of molecules:",
      expression: `${targetMoles.toExponential(4)} mol × 6.022×10²³ molecules/mol = ${targetMolecules.toExponential(4)} molecules`
    });
    
    // Format final result based on unit
    let finalAmount: number;
    let finalUnit: string;
    
    if (unit === "g") {
      finalAmount = targetGrams;
      finalUnit = "g";
    } else if (unit === "mol") {
      finalAmount = targetMoles;
      finalUnit = "mol";
    } else { // molecules
      finalAmount = targetMolecules;
      finalUnit = "molecules";
    }
    
    return {
      equation: balancedEquation,
      result: `${finalAmount.toFixed(4)} ${finalUnit} of ${targetCompound}`,
      steps
    };
  } catch (error) {
    return {
      equation,
      result: "Error",
      steps: [{ 
        description: "Error in stoichiometry calculation", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Calculate solution concentration
export const calculateSolutionConcentration = (
  solute: string,
  mass: number, // in grams
  volume: number, // in liters
  unit: string = "M" // M (molarity), m (molality), or % (percent)
): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    
    steps.push({
      description: "Analyzing solution concentration:",
      expression: `Solute: ${solute}\nMass: ${mass} g\nVolume: ${volume} L`
    });
    
    // Parse the solute formula
    const elements = ChemicalFormulaParser.parseFormula(solute);
    
    // Calculate molar mass of solute
    let molarMass = 0;
    for (const element of elements) {
      const elementData = enhancedPeriodicTable[element.symbol];
      if (!elementData) {
        throw new Error(`Unknown element: ${element.symbol}`);
      }
      molarMass += elementData.atomicMass * element.count;
    }
    
    steps.push({
      description: "Calculate molar mass of solute:",
      expression: `${solute}: ${molarMass.toFixed(2)} g/mol`
    });
    
    // Calculate moles of solute
    const moles = mass / molarMass;
    
    steps.push({
      description: "Calculate moles of solute:",
      expression: `${mass} g ÷ ${molarMass.toFixed(2)} g/mol = ${moles.toFixed(4)} mol`
    });
    
    let result = '';
    
    // Calculate concentration based on unit
    if (unit === "M") {
      // Molarity (mol/L)
      const molarity = moles / volume;
      
      steps.push({
        description: "Calculate molarity (M):",
        expression: `M = mol / L = ${moles.toFixed(4)} mol / ${volume} L = ${molarity.toFixed(4)} M`
      });
      
      result = `${molarity.toFixed(4)} M`;
    } 
    else if (unit === "m") {
      // Molality (mol/kg solvent)
      // Assuming water as solvent with density 1 kg/L
      const solventMass = volume; // Approximation: 1 L water = 1 kg
      const molality = moles / solventMass;
      
      steps.push({
        description: "Calculate molality (m):",
        expression: `m = mol / kg solvent = ${moles.toFixed(4)} mol / ${solventMass} kg = ${molality.toFixed(4)} m`
      });
      
      result = `${molality.toFixed(4)} m`;
    }
    else if (unit === "%") {
      // Percent by mass
      const solutionMass = mass + (volume * 1000); // Approximation: 1 L water = 1000 g
      const percentByMass = (mass / solutionMass) * 100;
      
      steps.push({
        description: "Calculate percent by mass (%):",
        expression: `% = (mass solute / mass solution) × 100% = (${mass} g / ${solutionMass} g) × 100% = ${percentByMass.toFixed(2)}%`
      });
      
      result = `${percentByMass.toFixed(2)}%`;
    }
    
    return {
      equation: `${mass} g ${solute} in ${volume} L solution`,
      result,
      steps
    };
  } catch (error) {
    return {
      equation: `${mass} g ${solute} in ${volume} L solution`,
      result: "Error",
      steps: [{ 
        description: "Error calculating concentration", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Function to analyze acid-base reactions
export const analyzeAcidBaseReaction = (equation: string): ChemistryResult => {
  try {
    const steps: ChemistryStep[] = [];
    
    steps.push({
      description: "Analyzing acid-base reaction:",
      expression: equation
    });
    
    // Common acids and bases
    const commonAcids = ['HCl', 'H2SO4', 'HNO3', 'CH3COOH', 'H3PO4', 'H2CO3'];
    const commonBases = ['NaOH', 'KOH', 'Ca(OH)2', 'NH3', 'Al(OH)3'];
    
    // Balance the equation first
    const balancedResult = EquationBalancer.balanceEquation(equation);
    const balancedEquation = balancedResult.result;
    
    steps.push({
      description: "Balanced equation:",
      expression: balancedEquation
    });
    
    // Parse the balanced equation
    const { reactants, products } = EquationBalancer.parseEquation(balancedEquation);
    
    // Identify acids and bases in the reaction
    let acid = '';
    let base = '';
    
    for (const compound of reactants) {
      const formula = compound.elements.map(e => 
        e.count === 1 ? e.symbol : `${e.symbol}${e.count}`
      ).join('');
      
      if (commonAcids.includes(formula) || formula.startsWith('H')) {
        acid = formula;
      } else if (commonBases.includes(formula) || formula.includes('OH')) {
        base = formula;
      }
    }
    
    // Identify if it's an acid-base neutralization
    if (acid && base) {
      steps.push({
        description: "Acid-base reaction identified:",
        expression: `Acid: ${acid}\nBase: ${base}`
      });
      
      // Look for salt and water in products
      let salt = '';
      let water = false;
      
      for (const compound of products) {
        const formula = compound.elements.map(e => 
          e.count === 1 ? e.symbol : `${e.symbol}${e.count}`
        ).join('');
        
        if (formula === 'H2O') {
          water = true;
        } else {
          salt = formula;
        }
      }
      
      if (water && salt) {
        steps.push({
          description: "Neutralization reaction produces:",
          expression: `Salt: ${salt}\nWater: H2O`
        });
        
        steps.push({
          description: "General form of neutralization:",
          expression: "Acid + Base → Salt + Water"
        });
      }
      
      return {
        equation: balancedEquation,
        result: `Acid-base neutralization: ${acid} + ${base} → ${products.map(p => EquationBalancer.formatCompound(p)).join(' + ')}`,
        steps
      };
    } else {
      steps.push({
        description: "Not a typical acid-base reaction",
        expression: "Couldn't identify clear acid-base pair in the reactants"
      });
      
      return {
        equation: balancedEquation,
        result: "Not identified as an acid-base reaction",
        steps
      };
    }
  } catch (error) {
    return {
      equation,
      result: "Error",
      steps: [{ 
        description: "Error analyzing acid-base reaction", 
        expression: error instanceof Error ? error.message : "Unknown error" 
      }],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
