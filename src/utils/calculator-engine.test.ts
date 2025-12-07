/**
 * Test suite for the calculator engine
 *
 * Tests:
 * - Basic arithmetic operations
 * - Operator precedence
 * - Parentheses handling
 * - Decimal numbers
 * - Negative numbers
 * - Edge cases and error handling
 */

import { evaluate, isValidExpression, formatNumber } from './calculator-engine'

// Helper function for comparing floating point numbers
function approxEqual(a: number, b: number, epsilon: number = 1e-10): boolean {
  return Math.abs(a - b) < epsilon
}

describe('Calculator Engine', () => {
  describe('Basic Arithmetic Operations', () => {
    test('Addition', () => {
      expect(evaluate('2 + 3')).toBe(5)
      expect(evaluate('10 + 20')).toBe(30)
      expect(evaluate('0 + 5')).toBe(5)
    })

    test('Subtraction', () => {
      expect(evaluate('5 - 3')).toBe(2)
      expect(evaluate('10 - 20')).toBe(-10)
      expect(evaluate('5 - 5')).toBe(0)
    })

    test('Multiplication', () => {
      expect(evaluate('2 * 3')).toBe(6)
      expect(evaluate('10 * 20')).toBe(200)
      expect(evaluate('5 * 0')).toBe(0)
    })

    test('Division', () => {
      expect(evaluate('6 / 2')).toBe(3)
      expect(evaluate('10 / 5')).toBe(2)
      expect(approxEqual(evaluate('1 / 3'), 1 / 3)).toBe(true)
    })
  })

  describe('Operator Precedence', () => {
    test('Multiplication before addition', () => {
      // 2 + 3 * 4 should be 2 + 12 = 14, not 5 * 4 = 20
      expect(evaluate('2 + 3 * 4')).toBe(14)
    })

    test('Multiplication before subtraction', () => {
      // 10 - 2 * 3 should be 10 - 6 = 4, not 8 * 3 = 24
      expect(evaluate('10 - 2 * 3')).toBe(4)
    })

    test('Division before addition', () => {
      // 12 / 3 + 1 should be 4 + 1 = 5
      expect(evaluate('12 / 3 + 1')).toBe(5)
    })

    test('Division before subtraction', () => {
      // 10 - 8 / 2 should be 10 - 4 = 6
      expect(evaluate('10 - 8 / 2')).toBe(6)
    })

    test('Complex precedence: 2 + 3 * 4 - 5 / 2', () => {
      // 2 + 12 - 2.5 = 11.5
      expect(approxEqual(evaluate('2 + 3 * 4 - 5 / 2'), 11.5)).toBe(true)
    })

    test('Multiple multiplications and divisions', () => {
      // 2 * 3 * 4 = 24
      expect(evaluate('2 * 3 * 4')).toBe(24)
      // 24 / 2 / 3 = 4
      expect(evaluate('24 / 2 / 3')).toBe(4)
    })

    test('Mixed operations', () => {
      // 10 + 5 * 2 - 3 / 1 = 10 + 10 - 3 = 17
      expect(evaluate('10 + 5 * 2 - 3 / 1')).toBe(17)
    })
  })

  describe('Parentheses', () => {
    test('Simple parentheses', () => {
      // (2 + 3) * 4 = 5 * 4 = 20
      expect(evaluate('(2 + 3) * 4')).toBe(20)
    })

    test('Parentheses override precedence', () => {
      // (10 - 2) * 3 = 8 * 3 = 24
      expect(evaluate('(10 - 2) * 3')).toBe(24)
    })

    test('Nested parentheses', () => {
      // ((2 + 3) * 4) / 2 = (5 * 4) / 2 = 20 / 2 = 10
      expect(evaluate('((2 + 3) * 4) / 2')).toBe(10)
    })

    test('Multiple groups', () => {
      // (2 + 3) * (4 - 1) = 5 * 3 = 15
      expect(evaluate('(2 + 3) * (4 - 1)')).toBe(15)
    })

    test('Parentheses with single number', () => {
      // (5) + 3 = 8
      expect(evaluate('(5) + 3')).toBe(8)
    })
  })

  describe('Decimal Numbers', () => {
    test('Simple decimals', () => {
      expect(approxEqual(evaluate('2.5 + 1.5'), 4)).toBe(true)
      expect(approxEqual(evaluate('5.5 - 2.5'), 3)).toBe(true)
    })

    test('Decimals with operations', () => {
      expect(approxEqual(evaluate('2.5 * 2'), 5)).toBe(true)
      expect(approxEqual(evaluate('10.5 / 2'), 5.25)).toBe(true)
    })

    test('Very small decimals', () => {
      expect(approxEqual(evaluate('0.1 + 0.2'), 0.3)).toBe(true)
    })

    test('Decimal with precedence', () => {
      // 1 + 2.5 * 2 = 1 + 5 = 6
      expect(approxEqual(evaluate('1 + 2.5 * 2'), 6)).toBe(true)
    })
  })

  describe('Negative Numbers', () => {
    test('Unary minus', () => {
      expect(evaluate('-5')).toBe(-5)
      expect(evaluate('-5 + 10')).toBe(5)
    })

    test('Multiple unary minuses', () => {
      expect(evaluate('--5')).toBe(5)
      expect(evaluate('---5')).toBe(-5)
    })

    test('Negative in operations', () => {
      expect(evaluate('-5 * 2')).toBe(-10)
      expect(evaluate('10 / -2')).toBe(-5)
    })

    test('Negative with parentheses', () => {
      expect(evaluate('-(2 + 3)')).toBe(-5)
      expect(evaluate('-5 * (2 + 3)')).toBe(-25)
    })

    test('Subtraction creating negative results', () => {
      expect(evaluate('3 - 5')).toBe(-2)
      expect(evaluate('1 - 10 * 2')).toBe(-19)
    })
  })

  describe('Edge Cases', () => {
    test('Single number', () => {
      expect(evaluate('5')).toBe(5)
      expect(evaluate('0')).toBe(0)
    })

    test('Empty expression', () => {
      expect(evaluate('')).toBe(0)
      expect(evaluate('   ')).toBe(0)
    })

    test('Whitespace handling', () => {
      expect(evaluate('2 + 3')).toBe(5)
      expect(evaluate('2  +  3')).toBe(5)
      expect(evaluate('  2 + 3  ')).toBe(5)
    })

    test('Zero operations', () => {
      expect(evaluate('0 + 0')).toBe(0)
      expect(evaluate('0 * 100')).toBe(0)
      expect(evaluate('0 - 5')).toBe(-5)
    })

    test('Division by one', () => {
      expect(evaluate('5 / 1')).toBe(5)
    })
  })

  describe('Error Handling', () => {
    test('Division by zero', () => {
      expect(() => evaluate('5 / 0')).toThrow('Division by zero')
    })

    test('Invalid characters', () => {
      expect(() => evaluate('2 + # 3')).toThrow()
    })

    test('Unmatched parentheses', () => {
      expect(() => evaluate('(2 + 3')).toThrow('Missing closing parenthesis')
      expect(() => evaluate('2 + 3)')).toThrow()
    })

    test('Empty parentheses', () => {
      expect(() => evaluate('()')).toThrow()
    })
  })

  describe('Expression Validation', () => {
    test('Valid expressions', () => {
      expect(isValidExpression('2 + 3')).toBe(true)
      expect(isValidExpression('10 * (5 - 3)')).toBe(true)
      expect(isValidExpression('5')).toBe(true)
      expect(isValidExpression('')).toBe(true)
    })

    test('Invalid expressions', () => {
      expect(isValidExpression('2 + # 3')).toBe(false)
      expect(isValidExpression('(2 + 3')).toBe(false)
      expect(isValidExpression('2 + 3)')).toBe(false)
      expect(isValidExpression('()')).toBe(false)
    })
  })

  describe('Number Formatting', () => {
    test('Format integers', () => {
      expect(formatNumber(5)).toBe('5')
      expect(formatNumber(100)).toBe('100')
    })

    test('Format decimals', () => {
      expect(formatNumber(5.5)).toBe('5.5')
      expect(formatNumber(3.14159)).toBe('3.14159')
    })

    test('Format with rounding', () => {
      const result = formatNumber(0.1 + 0.2) // JavaScript floating point issue
      expect(result).toBeDefined()
    })

    test('Negative numbers', () => {
      expect(formatNumber(-5)).toBe('-5')
      expect(formatNumber(-3.14)).toBe('-3.14')
    })

    test('Very small numbers', () => {
      const result = formatNumber(0.0001)
      expect(result).toBe('0.0001')
    })

    test('Special values', () => {
      expect(formatNumber(Infinity)).toBe('Error')
      expect(formatNumber(-Infinity)).toBe('Error')
      expect(formatNumber(NaN)).toBe('Error')
    })
  })

  describe('Complex Expressions', () => {
    test('Real-world calculation 1: Budget calculation', () => {
      // Gross salary - tax - deductions + bonus
      // 5000 - 1000 - 500 + 200 = 3700
      expect(evaluate('5000 - 1000 - 500 + 200')).toBe(3700)
    })

    test('Real-world calculation 2: Compound calculation', () => {
      // (100 + 50) * 2 - 25 * 3 = 150 * 2 - 75 = 300 - 75 = 225
      expect(evaluate('(100 + 50) * 2 - 25 * 3')).toBe(225)
    })

    test('Real-world calculation 3: Discount calculation', () => {
      // Original price - (original price * discount percent / 100)
      // 100 - (100 * 20 / 100) = 100 - 20 = 80
      expect(evaluate('100 - 100 * 20 / 100')).toBe(80)
    })

    test('Long expression', () => {
      // 1 + 2 * 3 - 4 / 2 + 5 * 6 = 1 + 6 - 2 + 30 = 35
      expect(evaluate('1 + 2 * 3 - 4 / 2 + 5 * 6')).toBe(35)
    })
  })
})

// Note: This test suite uses a simple test function signature
// In a real project with Jest, you would use the full Jest syntax
// For now, this documents the expected behavior
