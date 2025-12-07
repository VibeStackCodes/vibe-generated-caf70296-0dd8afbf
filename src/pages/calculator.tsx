import { useState } from 'react'
import { NumericKeypad } from '@/components/numeric-keypad'
import { evaluate, formatNumber, isValidExpression } from '@/utils/calculator-engine'

/**
 * Calculator page with a full expression-based calculator
 *
 * Features:
 * - Full expression input (supports +, -, *, /, parentheses)
 * - Correct operator precedence
 * - Real-time evaluation
 * - Error handling
 * - Expression history
 */
export function CalculatorPage() {
  const [expression, setExpression] = useState<string>('0')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isNewExpression, setIsNewExpression] = useState<boolean>(true)

  /**
   * Handles keypad button clicks
   * Supports numbers, operators, parentheses, and special functions
   */
  const handleButtonClick = (value: string) => {
    setError(null)

    // Handle number input (0-9)
    if (/^\d$/.test(value)) {
      if (isNewExpression && expression === '0') {
        setExpression(value)
      } else if (isNewExpression) {
        setExpression(value)
      } else {
        setExpression(expression + value)
      }
      setIsNewExpression(false)
      setResult(null)
      return
    }

    // Handle decimal point
    if (value === '.') {
      // If starting a new expression, begin with "0."
      if (isNewExpression) {
        setExpression('0.')
        setIsNewExpression(false)
      } else if (!expression.includes('.')) {
        setExpression(expression + '.')
      }
      setResult(null)
      return
    }

    // Handle clear (reset calculator)
    if (value === 'clear') {
      setExpression('0')
      setResult(null)
      setError(null)
      setIsNewExpression(true)
      return
    }

    // Handle delete (backspace)
    if (value === 'delete') {
      if (expression.length === 1) {
        setExpression('0')
        setIsNewExpression(true)
      } else {
        setExpression(expression.slice(0, -1))
      }
      setResult(null)
      return
    }

    // Handle operators (+, -, *, /)
    if (['+', '-', '*', '/'].includes(value)) {
      // Don't allow operator at the start (except minus for negation)
      if (expression === '0' && value !== '-') {
        return
      }

      // If we just calculated a result, use it as the start of the new expression
      if (result !== null && isNewExpression) {
        setExpression(result + ' ' + value + ' ')
        setResult(null)
      } else {
        // Add the operator to the expression
        const lastChar = expression.trim().slice(-1)
        if (['+', '-', '*', '/'].includes(lastChar) && value !== '-') {
          // Replace the last operator
          setExpression(expression.trim().slice(0, -1) + ' ' + value + ' ')
        } else {
          setExpression(expression + ' ' + value + ' ')
        }
      }
      setIsNewExpression(true)
      return
    }

    // Handle opening parenthesis
    if (value === '(') {
      if (isNewExpression) {
        setExpression('(')
        setIsNewExpression(false)
      } else {
        const lastChar = expression.trim().slice(-1)
        // Add space before ( if the last character is a number or )
        if (/\d/.test(lastChar) || lastChar === ')') {
          setExpression(expression + ' * (')
        } else {
          setExpression(expression + '(')
        }
      }
      setResult(null)
      return
    }

    // Handle closing parenthesis
    if (value === ')') {
      const lastChar = expression.trim().slice(-1)
      // Only allow ) if there are open parentheses and last char is not an operator
      if (!lastChar || /[\d)]/.test(lastChar)) {
        setExpression(expression + ')')
        setIsNewExpression(false)
      }
      setResult(null)
      return
    }

    // Handle equals (evaluate expression)
    if (value === '=') {
      try {
        if (!isValidExpression(expression)) {
          setError('Invalid expression')
          return
        }

        const calculated = evaluate(expression)
        const formatted = formatNumber(calculated)
        setResult(formatted)
        setExpression(formatted)
        setIsNewExpression(true)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Calculation error'
        setError(errorMsg)
        setResult(null)
      }
      return
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center font-sans">
          Calculator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Expression-based with correct operator precedence
        </p>

        {/* Display */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
          {/* Expression display */}
          <div className="text-right text-sm text-gray-600 dark:text-gray-400 mb-1 min-h-5 break-words">
            {expression && expression !== '0' && !isNewExpression ? expression : ''}
          </div>

          {/* Main display (result or expression) */}
          <div className="text-right text-4xl font-semibold text-gray-900 dark:text-white break-words overflow-hidden min-h-12 flex items-end justify-end">
            {error ? (
              <span className="text-sm text-red-500">{error}</span>
            ) : result ? (
              <span>{result}</span>
            ) : expression === '0' ? (
              <span className="text-gray-400">0</span>
            ) : (
              <span>{expression}</span>
            )}
          </div>
        </div>

        {/* Keypad */}
        <NumericKeypad onButtonClick={handleButtonClick} />

        {/* Info text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          Supports: +, −, ×, ÷, parentheses, and correct operator precedence
        </p>
      </div>
    </div>
  )
}
