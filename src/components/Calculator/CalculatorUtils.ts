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
