/**
 * CALCULATOR ENGINE - IMPLEMENTATION GUIDE
 * ========================================
 *
 * This document explains the implementation of the calculation engine
 * which provides correct arithmetic operations with proper operator precedence.
 *
 * FILE STRUCTURE
 * ==============
 *
 * 1. calculator-engine.ts
 *    Main calculation engine module with:
 *    - evaluate(expression: string): number
 *    - isValidExpression(expression: string): boolean
 *    - formatNumber(num: number): string
 *
 * 2. calculator-engine.test.ts
 *    Comprehensive test suite documenting expected behavior
 *
 * 3. calculator-engine.examples.ts
 *    Usage examples for various scenarios
 *
 * ARCHITECTURE
 * ============
 *
 * The calculator uses a three-stage pipeline:
 *
 * 1. TOKENIZATION
 *    Input: "2 + 3 * 4"
 *    Output: [
 *      { type: 'number', value: 2 },
 *      { type: 'operator', value: '+' },
 *      { type: 'number', value: 3 },
 *      { type: 'operator', value: '*' },
 *      { type: 'number', value: 4 }
 *    ]
 *
 *    The tokenizer handles:
 *    - Numbers (integers and decimals)
 *    - Operators (+, -, *, /)
 *    - Parentheses
 *    - Whitespace (ignored)
 *
 * 2. PARSING (Recursive Descent Parsing)
 *    The parser builds an abstract syntax tree (AST) that respects
 *    operator precedence using a recursive descent approach:
 *
 *    parseAddSub()        handles + and - (lowest precedence)
 *      ↓
 *    parseMulDiv()        handles * and / (higher precedence)
 *      ↓
 *    parsePrimary()       handles numbers, parentheses, unary operators
 *
 *    This order ensures correct precedence: 2 + 3 * 4 parses as:
 *
 *         +
 *        / \
 *       2   *
 *          / \
 *         3   4
 *
 *    NOT as (2 + 3) * 4, but as 2 + (3 * 4)
 *
 * 3. EVALUATION
 *    The AST is evaluated recursively:
 *    - Binary nodes: evaluate left, apply operator, evaluate right
 *    - Unary nodes: apply operator to operand
 *    - Number nodes: return the value
 *
 * OPERATOR PRECEDENCE
 * ===================
 *
 * The calculator follows standard mathematical precedence:
 *
 * 1. Parentheses: (2 + 3) * 4 = 20
 * 2. Unary operators: -5 + 10 = 5
 * 3. Multiplication & Division (left to right): 2 * 3 / 4 = 1.5
 * 4. Addition & Subtraction (left to right): 2 + 3 - 1 = 4
 *
 * EXAMPLES
 * ========
 *
 * Basic arithmetic:
 *   2 + 3 = 5
 *   10 - 4 = 6
 *   5 * 6 = 30
 *   20 / 4 = 5
 *
 * Operator precedence:
 *   2 + 3 * 4 = 14 (not 20)
 *   10 - 2 * 3 = 4 (not 24)
 *
 * Parentheses:
 *   (2 + 3) * 4 = 20
 *   ((2 + 3) * 4) / 2 = 10
 *
 * Decimal and negative numbers:
 *   2.5 + 1.5 = 4
 *   -5 * -2 = 10
 *   -(2 + 3) = -5
 *
 * Complex expressions:
 *   1 + 2 * 3 - 4 / 2 + 5 * 6 = 35
 *   (100 + 50) * 2 - 25 * 3 = 225
 *
 * USAGE IN REACT
 * ==============
 *
 * The calculator is integrated into the CalculatorPage component:
 *
 * import { evaluate, formatNumber, isValidExpression } from '@/utils/calculator-engine'
 *
 * // In your React component:
 * const [expression, setExpression] = useState('0')
 *
 * const handleEquals = () => {
 *   try {
 *     if (!isValidExpression(expression)) {
 *       setError('Invalid expression')
 *       return
 *     }
 *
 *     const result = evaluate(expression)
 *     const formatted = formatNumber(result)
 *     setExpression(formatted)
 *   } catch (err) {
 *     setError(err.message)
 *   }
 * }
 *
 * SAFETY & DETERMINISM
 * ====================
 *
 * The calculator is safe because:
 * 1. NO use of eval() - uses explicit parsing and evaluation
 * 2. NO arbitrary code execution
 * 3. Deterministic - same input always produces same output
 * 4. Handles errors gracefully - division by zero throws error
 * 5. Validates expressions before evaluation
 *
 * PERFORMANCE
 * ===========
 *
 * Time Complexity:
 * - Tokenization: O(n) where n is expression length
 * - Parsing: O(n)
 * - Evaluation: O(n)
 * - Total: O(n)
 *
 * Space Complexity:
 * - Token list: O(n)
 * - AST: O(h) where h is tree height (at most O(n))
 * - Total: O(n)
 *
 * For typical calculator expressions (< 100 characters), performance
 * is negligible.
 *
 * TESTING
 * =======
 *
 * The test suite (calculator-engine.test.ts) covers:
 * - Basic arithmetic operations
 * - Operator precedence scenarios
 * - Parentheses handling
 * - Decimal number handling
 * - Negative number handling
 * - Edge cases (empty expressions, single numbers)
 * - Error cases (division by zero, unmatched parentheses)
 * - Complex expressions
 * - Expression validation
 * - Number formatting
 *
 * To run tests (when Jest is configured):
 *   npm test
 *
 * LIMITATIONS & FUTURE ENHANCEMENTS
 * =================================
 *
 * Current limitations:
 * - No support for functions (sin, cos, log, etc.)
 * - No support for exponents (^)
 * - No support for variables
 * - No support for memory operations (M+, M-, etc.)
 * - Floating point precision issues (0.1 + 0.2 ≠ 0.3 in some cases)
 *
 * Future enhancements could include:
 * - Scientific functions: sqrt, sin, cos, tan, log, etc.
 * - Exponents: 2 ^ 3 = 8
 * - Variables: x = 5, then 2 * x = 10
 * - Memory operations: M+, M-, MR, MC
 * - Expression history for reuse
 * - Symbolic computation
 * - Custom function definitions
 *
 * INTEGRATION WITH KEYPAD
 * ======================
 *
 * The NumericKeypad component sends button values to the CalculatorPage,
 * which uses the calculator engine for evaluation:
 *
 * NumericKeypad
 *      ↓ (onClick)
 * CalculatorPage (handleButtonClick)
 *      ↓ (when equals is clicked)
 * evaluate(expression) → result
 *
 * Button types:
 * - Numbers (0-9): Added to expression
 * - Operators (+, -, *, /): Added to expression with spacing
 * - Parentheses: Added to expression
 * - Equals: Triggers evaluate()
 * - Clear: Resets to '0'
 * - Delete: Removes last character
 *
 * BROWSER COMPATIBILITY
 * ====================
 *
 * The calculator uses only standard JavaScript features:
 * - RegExp (all browsers)
 * - Arrays and objects (all browsers)
 * - try/catch (all browsers)
 * - isFinite (all browsers)
 *
 * Compatible with:
 * - Chrome/Edge 90+
 * - Firefox 88+
 * - Safari 14+
 * - All modern mobile browsers
 *
 * ACCESSIBILITY
 * =============
 *
 * The calculator is accessible:
 * - Uses semantic HTML buttons with aria-label
 * - Keyboard navigation via React event handlers
 * - Clear error messages for invalid expressions
 * - High contrast display (dark and light mode support)
 * - Clear visual feedback for button interactions
 *
 * ADDITIONAL RESOURCES
 * ===================
 *
 * For understanding the implementation:
 * 1. Read calculator-engine.examples.ts for usage patterns
 * 2. Review calculator-engine.test.ts for expected behavior
 * 3. Study the recursive descent parsing algorithm
 * 4. Learn about operator precedence and AST construction
 *
 * References:
 * - Recursive Descent Parsing: https://en.wikipedia.org/wiki/Recursive_descent_parser
 * - Operator Precedence: https://en.wikipedia.org/wiki/Operator_precedence
 * - Abstract Syntax Trees: https://en.wikipedia.org/wiki/Abstract_syntax_tree
 */

// This file is pure documentation and does not export any code
