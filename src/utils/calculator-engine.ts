/**
 * Calculator Engine Module
 *
 * Implements a safe, deterministic calculation engine with:
 * - Basic arithmetic: +, -, ×, ÷
 * - Correct operator precedence (multiplication and division before addition and subtraction)
 * - Support for parentheses
 * - Decimal and negative number handling
 * - Safe evaluation (no eval() function)
 */

/**
 * Token types for parsing expressions
 */
type TokenType = 'number' | 'operator' | 'lparen' | 'rparen'

/**
 * Represents a single token in an expression
 */
interface Token {
  type: TokenType
  value: string | number
}

/**
 * Represents a node in the expression tree
 */
interface ExpressionNode {
  type: 'binary' | 'number' | 'unary'
  operator?: '+' | '-' | '*' | '/'
  left?: ExpressionNode
  right?: ExpressionNode
  value?: number
}

/**
 * Tokenizes a mathematical expression string into tokens
 *
 * @param expression - The expression string to tokenize
 * @returns Array of tokens
 * @throws Error if the expression contains invalid characters
 */
function tokenize(expression: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < expression.length) {
    // Skip whitespace
    if (/\s/.test(expression[i])) {
      i++
      continue
    }

    // Handle numbers (including decimals)
    if (/\d/.test(expression[i])) {
      let numStr = ''
      while (i < expression.length && /[\d.]/.test(expression[i])) {
        numStr += expression[i]
        i++
      }
      const num = parseFloat(numStr)
      if (!isNaN(num)) {
        tokens.push({ type: 'number', value: num })
      }
      continue
    }

    // Handle operators
    if (/[+\-*/]/.test(expression[i])) {
      tokens.push({ type: 'operator', value: expression[i] })
      i++
      continue
    }

    // Handle parentheses
    if (expression[i] === '(') {
      tokens.push({ type: 'lparen', value: '(' })
      i++
      continue
    }

    if (expression[i] === ')') {
      tokens.push({ type: 'rparen', value: ')' })
      i++
      continue
    }

    // Invalid character
    throw new Error(`Invalid character in expression: ${expression[i]}`)
  }

  return tokens
}

/**
 * Parses tokens into an expression tree using recursive descent parsing
 * Handles operator precedence and parentheses
 */
class ExpressionParser {
  private tokens: Token[]
  private current: number = 0

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  /**
   * Main parse method - starts from lowest precedence
   */
  parse(): ExpressionNode {
    return this.parseAddSub()
  }

  /**
   * Parses addition and subtraction (lowest precedence)
   */
  private parseAddSub(): ExpressionNode {
    let left = this.parseMulDiv()

    while (this.current < this.tokens.length) {
      const token = this.tokens[this.current]
      if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
        this.current++
        const right = this.parseMulDiv()
        left = {
          type: 'binary',
          operator: token.value as '+' | '-',
          left,
          right,
        }
      } else {
        break
      }
    }

    return left
  }

  /**
   * Parses multiplication and division (higher precedence)
   */
  private parseMulDiv(): ExpressionNode {
    let left = this.parsePrimary()

    while (this.current < this.tokens.length) {
      const token = this.tokens[this.current]
      if (token.type === 'operator' && (token.value === '*' || token.value === '/')) {
        this.current++
        const right = this.parsePrimary()
        left = {
          type: 'binary',
          operator: token.value as '*' | '/',
          left,
          right,
        }
      } else {
        break
      }
    }

    return left
  }

  /**
   * Parses primary expressions: numbers, parenthesized expressions, and unary operators
   */
  private parsePrimary(): ExpressionNode {
    const token = this.tokens[this.current]

    if (!token) {
      throw new Error('Unexpected end of expression')
    }

    // Handle parenthesized expressions
    if (token.type === 'lparen') {
      this.current++
      const expr = this.parseAddSub()
      if (this.current >= this.tokens.length || this.tokens[this.current].type !== 'rparen') {
        throw new Error('Missing closing parenthesis')
      }
      this.current++
      return expr
    }

    // Handle unary minus
    if (token.type === 'operator' && token.value === '-') {
      this.current++
      const operand = this.parsePrimary()
      return {
        type: 'unary',
        operator: '-',
        right: operand,
      }
    }

    // Handle unary plus
    if (token.type === 'operator' && token.value === '+') {
      this.current++
      return this.parsePrimary()
    }

    // Handle numbers
    if (token.type === 'number') {
      this.current++
      return {
        type: 'number',
        value: token.value as number,
      }
    }

    throw new Error(`Unexpected token: ${token.value}`)
  }
}

/**
 * Evaluates an expression tree
 *
 * @param node - The expression tree node
 * @returns The numeric result
 * @throws Error if division by zero occurs
 */
function evaluateNode(node: ExpressionNode): number {
  if (node.type === 'number') {
    return node.value ?? 0
  }

  if (node.type === 'unary') {
    const operand = evaluateNode(node.right!)
    if (node.operator === '-') {
      return -operand
    }
    return operand
  }

  if (node.type === 'binary') {
    const left = evaluateNode(node.left!)
    const right = evaluateNode(node.right!)

    switch (node.operator) {
      case '+':
        return left + right
      case '-':
        return left - right
      case '*':
        return left * right
      case '/':
        if (right === 0) {
          throw new Error('Division by zero')
        }
        return left / right
      default:
        throw new Error(`Unknown operator: ${node.operator}`)
    }
  }

  throw new Error('Unknown node type')
}

/**
 * Evaluates a mathematical expression string
 *
 * Handles:
 * - Basic arithmetic: +, -, *, /
 * - Correct operator precedence
 * - Parentheses for grouping
 * - Decimal numbers
 * - Negative numbers
 *
 * @param expression - The expression to evaluate (e.g., "2 + 3 * 4")
 * @returns The result of the calculation
 * @throws Error if the expression is invalid or contains division by zero
 */
export function evaluate(expression: string): number {
  // Handle empty or whitespace-only expression
  if (!expression || !expression.trim()) {
    return 0
  }

  try {
    const tokens = tokenize(expression)

    // Handle empty token list
    if (tokens.length === 0) {
      return 0
    }

    const parser = new ExpressionParser(tokens)
    const ast = parser.parse()
    return evaluateNode(ast)
  } catch (error) {
    throw new Error(
      `Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Validates if an expression is properly formatted
 *
 * @param expression - The expression to validate
 * @returns true if the expression is valid, false otherwise
 */
export function isValidExpression(expression: string): boolean {
  if (!expression || !expression.trim()) {
    return true // Empty expression is valid
  }

  try {
    const tokens = tokenize(expression)
    if (tokens.length === 0) {
      return true
    }

    // Check for balanced parentheses
    let parenCount = 0
    for (const token of tokens) {
      if (token.type === 'lparen') {
        parenCount++
      } else if (token.type === 'rparen') {
        parenCount--
        if (parenCount < 0) {
          return false
        }
      }
    }

    if (parenCount !== 0) {
      return false
    }

    // Try to parse
    new ExpressionParser(tokens).parse()
    return true
  } catch {
    return false
  }
}

/**
 * Formats a number to a reasonable precision and removes trailing zeros
 *
 * @param num - The number to format
 * @param maxDecimals - Maximum number of decimal places (default: 10)
 * @returns Formatted number string
 */
export function formatNumber(num: number, maxDecimals: number = 10): string {
  // Handle special cases
  if (!isFinite(num)) {
    return 'Error'
  }

  // Round to avoid floating point precision issues
  const rounded = Math.round(num * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals)

  // Convert to string and remove trailing zeros after decimal point
  const str = rounded.toString()

  // If the number is very large or very small, use scientific notation might be needed
  // but for now we'll just return the string representation
  return str
}
