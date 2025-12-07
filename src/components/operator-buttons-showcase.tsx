/**
 * Operator Buttons Showcase Component
 *
 * This component demonstrates all the operator buttons and their visual states.
 * It serves as a reference for the styling and functionality of operator buttons.
 *
 * Features Demonstrated:
 * - All operator buttons (+, -, ×, ÷, =)
 * - Visual feedback states (default, hover, active, focus, disabled)
 * - Brand colors and styling
 * - Accessibility features
 */

import { NumericKeypad } from '@/components/numeric-keypad'
import { useState } from 'react'

/**
 * Showcase component for operator buttons
 * Displays button states and demonstrates click handlers
 */
export function OperatorButtonsShowcase() {
  const [lastClicked, setLastClicked] = useState<string | null>(null)
  const [clickHistory, setClickHistory] = useState<string[]>([])

  const handleButtonClick = (value: string) => {
    setLastClicked(value)
    setClickHistory((prev) => [...prev, value].slice(-5)) // Keep last 5 clicks
  }

  const getOperatorDescription = (operator: string): string => {
    const descriptions: Record<string, string> = {
      '+': 'Addition - Adds two numbers',
      '-': 'Subtraction - Subtracts second number from first',
      '*': 'Multiplication (×) - Multiplies two numbers',
      '/': 'Division (÷) - Divides first number by second',
      '=': 'Equals - Evaluates the expression',
      delete: 'Delete - Removes the last digit',
      clear: 'Clear - Resets the calculator',
    }
    return descriptions[operator] || ''
  }

  const operatorInfo = [
    { symbol: '+', color: '#FF6B35', type: 'operator' },
    { symbol: '-', color: '#FF6B35', type: 'operator' },
    { symbol: '×', color: '#FF6B35', type: 'operator' },
    { symbol: '÷', color: '#FF6B35', type: 'operator' },
    { symbol: '=', color: '#0066FF', type: 'equals' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Operator Buttons Showcase
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Interactive demonstration of operator button styling and functionality
        </p>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Operator Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Operator Buttons
            </h2>
            <div className="space-y-3">
              {operatorInfo.map((op) => (
                <div
                  key={op.symbol}
                  className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: op.color }}
                  >
                    {op.symbol}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {op.symbol}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {getOperatorDescription(op.symbol.includes('×') ? '*' : op.symbol.includes('÷') ? '/' : op.symbol)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Colors Reference */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Brand Colors
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Primary Color (Equals Button)
                </h3>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-[#0066FF] p-3 text-white text-center font-mono text-sm">
                    #0066FF
                  </div>
                  <div className="flex-1 rounded-lg bg-[#0052CC] p-3 text-white text-center font-mono text-sm">
                    Hover
                  </div>
                  <div className="flex-1 rounded-lg bg-[#003D99] p-3 text-white text-center font-mono text-sm">
                    Active
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Accent Color (Operator Buttons)
                </h3>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-[#FF6B35] p-3 text-white text-center font-mono text-sm">
                    #FF6B35
                  </div>
                  <div className="flex-1 rounded-lg bg-[#E55A24] p-3 text-white text-center font-mono text-sm">
                    Hover
                  </div>
                  <div className="flex-1 rounded-lg bg-[#D44914] p-3 text-white text-center font-mono text-sm">
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keypad Showcase */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Keypad
          </h2>
          <div className="flex justify-center">
            <NumericKeypad onButtonClick={handleButtonClick} />
          </div>
        </div>

        {/* Click History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Last Button Clicked
            </h3>
            {lastClicked ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#FF6B35] dark:bg-[#FF6B35] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {lastClicked === '*' ? '×' : lastClicked === '/' ? '÷' : lastClicked}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Button</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lastClicked === '*' ? '×' : lastClicked === '/' ? '÷' : lastClicked}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {getOperatorDescription(lastClicked)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Click a button to see details</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Click History
            </h3>
            {clickHistory.length > 0 ? (
              <div className="space-y-2">
                {clickHistory.map((click, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 w-6 text-right">
                      #{clickHistory.length - index}
                    </span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      {click === '*' ? '×' : click === '/' ? '÷' : click}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No clicks yet</p>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Implementation Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Visual Feedback</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Smooth color transitions on hover (150ms)</li>
                <li>✓ Press animation with scale-down (95%)</li>
                <li>✓ Subtle down translation on press (+0.5px)</li>
                <li>✓ Shadow reduction on active state</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Accessibility</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Proper ARIA labels for all buttons</li>
                <li>✓ Focus ring for keyboard navigation</li>
                <li>✓ Ring offset for better visibility</li>
                <li>✓ Disabled state with clear indication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Interaction</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Click handlers for all operator buttons</li>
                <li>✓ Haptic feedback on touch devices (10ms vibration)</li>
                <li>✓ Proper event propagation handling</li>
                <li>✓ Support for disabled state</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Brand Integration</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Primary color: #0066FF (equals button)</li>
                <li>✓ Accent color: #FF6B35 (operators)</li>
                <li>✓ Dark mode support</li>
                <li>✓ Responsive design (mobile & desktop)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
