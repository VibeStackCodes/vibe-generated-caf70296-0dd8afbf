/**
 * Calculator Engine - Usage Examples
 *
 * This file demonstrates how to use the calculator engine for various scenarios
 */

import { evaluate, isValidExpression, formatNumber } from './calculator-engine'

/**
 * Example 1: Basic Arithmetic
 */
export function example1_basicArithmetic() {
  console.log('=== Basic Arithmetic ===')
  console.log('2 + 3 =', evaluate('2 + 3')) // 5
  console.log('10 - 4 =', evaluate('10 - 4')) // 6
  console.log('5 * 6 =', evaluate('5 * 6')) // 30
  console.log('20 / 4 =', evaluate('20 / 4')) // 5
}

/**
 * Example 2: Operator Precedence
 *
 * The calculator correctly follows operator precedence rules:
 * - Parentheses first
 * - Multiplication and Division (left to right)
 * - Addition and Subtraction (left to right)
 */
export function example2_operatorPrecedence() {
  console.log('=== Operator Precedence ===')
  // Without precedence awareness, this would be (2 + 3) * 4 = 20
  // With correct precedence, 3 * 4 is evaluated first, then 2 + 12 = 14
  console.log('2 + 3 * 4 =', evaluate('2 + 3 * 4')) // 14

  console.log('10 - 2 * 3 =', evaluate('10 - 2 * 3')) // 4
  console.log('2 * 3 + 4 * 5 =', evaluate('2 * 3 + 4 * 5')) // 26
}

/**
 * Example 3: Parentheses
 *
 * Parentheses override operator precedence
 */
export function example3_parentheses() {
  console.log('=== Parentheses ===')
  // (2 + 3) * 4 = 5 * 4 = 20
  console.log('(2 + 3) * 4 =', evaluate('(2 + 3) * 4')) // 20

  // ((2 + 3) * 4) / 2 = 20 / 2 = 10
  console.log('((2 + 3) * 4) / 2 =', evaluate('((2 + 3) * 4) / 2')) // 10

  // (2 + 3) * (4 - 1) = 5 * 3 = 15
  console.log('(2 + 3) * (4 - 1) =', evaluate('(2 + 3) * (4 - 1)')) // 15
}

/**
 * Example 4: Decimal Numbers
 */
export function example4_decimals() {
  console.log('=== Decimal Numbers ===')
  console.log('2.5 + 1.5 =', evaluate('2.5 + 1.5')) // 4
  console.log('10.5 / 2 =', evaluate('10.5 / 2')) // 5.25
  console.log('3.14 * 2 =', evaluate('3.14 * 2')) // 6.28
}

/**
 * Example 5: Negative Numbers
 */
export function example5_negativeNumbers() {
  console.log('=== Negative Numbers ===')
  console.log('-5 + 10 =', evaluate('-5 + 10')) // 5
  console.log('-5 * -2 =', evaluate('-5 * -2')) // 10
  console.log('-(2 + 3) =', evaluate('-(2 + 3)')) // -5
  console.log('10 - 15 =', evaluate('10 - 15')) // -5
}

/**
 * Example 6: Real-world Use Cases
 */
export function example6_realWorldUseCases() {
  console.log('=== Real-world Use Cases ===')

  // Calculate discount price
  // Original: $100, Discount: 20%
  const originalPrice = 100
  const discountPercent = 20
  const discountedPrice = evaluate(`${originalPrice} - ${originalPrice} * ${discountPercent} / 100`)
  console.log(`$${originalPrice} with ${discountPercent}% discount = $${discountedPrice}`)

  // Calculate tax
  // Subtotal: $50, Tax rate: 8.5%
  const subtotal = 50
  const taxRate = 8.5
  const tax = evaluate(`${subtotal} * ${taxRate} / 100`)
  console.log(`Tax on $${subtotal} at ${taxRate}% = $${tax.toFixed(2)}`)

  // Calculate average
  // (10 + 20 + 30) / 3 = 20
  const average = evaluate('(10 + 20 + 30) / 3')
  console.log(`Average of 10, 20, 30 = ${average}`)

  // Calculate distance with physics formula: d = v*t + (1/2)*a*t^2
  // Simplified: distance = velocity * time + acceleration * time * time / 2
  const velocity = 50
  const time = 2
  const acceleration = 10
  const distance = evaluate(`${velocity} * ${time} + ${acceleration} * ${time} * ${time} / 2`)
  console.log(
    `Distance = ${velocity}*${time} + ${acceleration}*${time}^2/2 = ${distance} meters`
  )
}

/**
 * Example 7: Expression Validation
 */
export function example7_validation() {
  console.log('=== Expression Validation ===')

  const testCases = [
    '2 + 3',
    '10 * (5 - 3)',
    '(2 + 3',
    '2 + 3)',
    '2 + # 3',
    '()',
    '5',
  ]

  testCases.forEach((expr) => {
    const isValid = isValidExpression(expr)
    console.log(`"${expr}" is ${isValid ? 'valid' : 'invalid'}`)
  })
}

/**
 * Example 8: Number Formatting
 */
export function example8_numberFormatting() {
  console.log('=== Number Formatting ===')

  const numbers = [5, 5.5, 3.14159, 0.0001, -10.5, 100000]

  numbers.forEach((num) => {
    const formatted = formatNumber(num)
    console.log(`Format ${num} => "${formatted}"`)
  })
}

/**
 * Example 9: Error Handling
 */
export function example9_errorHandling() {
  console.log('=== Error Handling ===')

  const testCases = ['5 / 0', '(2 + 3', '2 + # 3']

  testCases.forEach((expr) => {
    try {
      const result = evaluate(expr)
      console.log(`"${expr}" = ${result}`)
    } catch (error) {
      console.log(`"${expr}" => Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  })
}

/**
 * Example 10: Complex Expressions
 */
export function example10_complexExpressions() {
  console.log('=== Complex Expressions ===')

  const expressions = [
    '1 + 2 * 3 - 4 / 2 + 5 * 6',
    '(100 + 50) * 2 - 25 * 3',
    '10 / 2 + 3 * 4 - 5',
    '-(5 + 3) * 2 + 10',
  ]

  expressions.forEach((expr) => {
    try {
      const result = evaluate(expr)
      const formatted = formatNumber(result)
      console.log(`"${expr}" = ${formatted}`)
    } catch (error) {
      console.log(`"${expr}" => Error`)
    }
  })
}

/**
 * Run all examples
 */
export function runAllExamples() {
  example1_basicArithmetic()
  console.log('')
  example2_operatorPrecedence()
  console.log('')
  example3_parentheses()
  console.log('')
  example4_decimals()
  console.log('')
  example5_negativeNumbers()
  console.log('')
  example6_realWorldUseCases()
  console.log('')
  example7_validation()
  console.log('')
  example8_numberFormatting()
  console.log('')
  example9_errorHandling()
  console.log('')
  example10_complexExpressions()
}
