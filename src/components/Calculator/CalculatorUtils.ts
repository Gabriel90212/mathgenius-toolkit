
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

// Basic symbolic derivative rules
export const calculateDerivative = (expression: Expression, variable: Variable = 'x'): CalculusResult => {
  try {
    // This is a simplified implementation - in a real app, you'd use a math library
    const steps: CalculusStep[] = [];
    let result = '';
    
    // Try to identify the expression structure
    const cleanedExpr = expression.replace(/\s+/g, '');
    
    // Handle basic polynomial terms: x^n → n*x^(n-1)
    const powerMatch = cleanedExpr.match(new RegExp(`${variable}\\^(\\d+)`));
    if (powerMatch) {
      const power = parseInt(powerMatch[1], 10);
      if (power > 0) {
        steps.push({
          description: `Apply the power rule: d/d${variable}(${variable}^n) = n·${variable}^(n-1)`,
          expression: `${power}${variable}^${power - 1}`
        });
        
        if (power - 1 === 0) {
          steps.push({
            description: `Simplify:`,
            expression: `${power}`
          });
          result = `${power}`;
        } else if (power - 1 === 1) {
          steps.push({
            description: `Simplify:`,
            expression: `${power}${variable}`
          });
          result = `${power}${variable}`;
        } else {
          result = `${power}${variable}^${power - 1}`;
        }
        
        return { expression, result, steps };
      }
    }
    
    // Handle basic constants: c → 0
    const constMatch = /^[0-9]+$/.test(cleanedExpr);
    if (constMatch) {
      steps.push({
        description: `The derivative of a constant is zero: d/d${variable}(${cleanedExpr}) = 0`,
        expression: '0'
      });
      result = '0';
      return { expression, result, steps };
    }
    
    // Handle x → 1
    if (cleanedExpr === variable) {
      steps.push({
        description: `The derivative of ${variable} with respect to ${variable} is 1: d/d${variable}(${variable}) = 1`,
        expression: '1'
      });
      result = '1';
      return { expression, result, steps };
    }
    
    // Handle sin(x) → cos(x)
    if (cleanedExpr === `sin(${variable})`) {
      steps.push({
        description: `Apply the derivative of sine: d/d${variable}(sin(${variable})) = cos(${variable})`,
        expression: `cos(${variable})`
      });
      result = `cos(${variable})`;
      return { expression, result, steps };
    }
    
    // Handle cos(x) → -sin(x)
    if (cleanedExpr === `cos(${variable})`) {
      steps.push({
        description: `Apply the derivative of cosine: d/d${variable}(cos(${variable})) = -sin(${variable})`,
        expression: `-sin(${variable})`
      });
      result = `-sin(${variable})`;
      return { expression, result, steps };
    }
    
    // Handle e^x → e^x
    if (cleanedExpr === `e^${variable}` || cleanedExpr === `exp(${variable})`) {
      steps.push({
        description: `Apply the derivative of exponential: d/d${variable}(e^${variable}) = e^${variable}`,
        expression: `e^${variable}`
      });
      result = `e^${variable}`;
      return { expression, result, steps };
    }
    
    // Handle ln(x) → 1/x
    if (cleanedExpr === `ln(${variable})`) {
      steps.push({
        description: `Apply the derivative of natural logarithm: d/d${variable}(ln(${variable})) = 1/${variable}`,
        expression: `1/${variable}`
      });
      result = `1/${variable}`;
      return { expression, result, steps };
    }
    
    // If we can't handle it, return an error
    return {
      expression,
      result: 'Cannot compute',
      steps: [{
        description: 'This expression format is not supported yet',
        expression: expression
      }],
      error: 'Unsupported expression'
    };
  } catch (error) {
    return {
      expression,
      result: 'Error',
      steps: [{
        description: 'An error occurred while computing the derivative',
        expression: expression
      }],
      error: 'Computation error'
    };
  }
};

// Basic symbolic integration
export const calculateIntegral = (expression: Expression, variable: Variable = 'x'): CalculusResult => {
  try {
    // This is a simplified implementation - in a real app, you'd use a math library
    const steps: CalculusStep[] = [];
    let result = '';
    
    // Try to identify the expression structure
    const cleanedExpr = expression.replace(/\s+/g, '');
    
    // Handle constant: c → c*x
    const constMatch = /^[0-9]+$/.test(cleanedExpr);
    if (constMatch) {
      steps.push({
        description: `The integral of a constant is the constant times the variable: ∫${cleanedExpr} d${variable} = ${cleanedExpr}${variable}`,
        expression: `${cleanedExpr}${variable} + C`
      });
      result = `${cleanedExpr}${variable} + C`;
      return { expression, result, steps };
    }
    
    // Handle x → x^2/2
    if (cleanedExpr === variable) {
      steps.push({
        description: `Apply the power rule for integration: ∫${variable} d${variable} = ${variable}^2/2`,
        expression: `${variable}^2/2 + C`
      });
      result = `${variable}^2/2 + C`;
      return { expression, result, steps };
    }
    
    // Handle x^n → x^(n+1)/(n+1) where n ≠ -1
    const powerMatch = cleanedExpr.match(new RegExp(`${variable}\\^(\\d+)`));
    if (powerMatch) {
      const power = parseInt(powerMatch[1], 10);
      if (power !== -1) {
        steps.push({
          description: `Apply the power rule for integration: ∫${variable}^${power} d${variable} = ${variable}^(${power}+1)/(${power}+1)`,
          expression: `${variable}^${power + 1}/${power + 1} + C`
        });
        result = `${variable}^${power + 1}/${power + 1} + C`;
        return { expression, result, steps };
      } else {
        // Handle x^-1 = 1/x → ln|x|
        steps.push({
          description: `Apply the logarithmic rule: ∫1/${variable} d${variable} = ln|${variable}|`,
          expression: `ln|${variable}| + C`
        });
        result = `ln|${variable}| + C`;
        return { expression, result, steps };
      }
    }
    
    // Handle sin(x) → -cos(x)
    if (cleanedExpr === `sin(${variable})`) {
      steps.push({
        description: `Apply the integral of sine: ∫sin(${variable}) d${variable} = -cos(${variable})`,
        expression: `-cos(${variable}) + C`
      });
      result = `-cos(${variable}) + C`;
      return { expression, result, steps };
    }
    
    // Handle cos(x) → sin(x)
    if (cleanedExpr === `cos(${variable})`) {
      steps.push({
        description: `Apply the integral of cosine: ∫cos(${variable}) d${variable} = sin(${variable})`,
        expression: `sin(${variable}) + C`
      });
      result = `sin(${variable}) + C`;
      return { expression, result, steps };
    }
    
    // Handle e^x → e^x
    if (cleanedExpr === `e^${variable}` || cleanedExpr === `exp(${variable})`) {
      steps.push({
        description: `Apply the integral of exponential: ∫e^${variable} d${variable} = e^${variable}`,
        expression: `e^${variable} + C`
      });
      result = `e^${variable} + C`;
      return { expression, result, steps };
    }
    
    // Handle 1/x → ln|x|
    if (cleanedExpr === `1/${variable}`) {
      steps.push({
        description: `Apply the logarithmic rule: ∫1/${variable} d${variable} = ln|${variable}|`,
        expression: `ln|${variable}| + C`
      });
      result = `ln|${variable}| + C`;
      return { expression, result, steps };
    }
    
    // If we can't handle it, return an error
    return {
      expression,
      result: 'Cannot compute',
      steps: [{
        description: 'This expression format is not supported yet',
        expression: expression
      }],
      error: 'Unsupported expression'
    };
  } catch (error) {
    return {
      expression,
      result: 'Error',
      steps: [{
        description: 'An error occurred while computing the integral',
        expression: expression
      }],
      error: 'Computation error'
    };
  }
};
