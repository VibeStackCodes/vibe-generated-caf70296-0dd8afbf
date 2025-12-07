import { ReactNode } from 'react'

/**
 * Props for the NumericKeypad component
 */
interface NumericKeypadProps {
  onButtonClick: (value: string) => void
  disabled?: boolean
}

/**
 * Props for an individual KeypadButton
 */
interface KeypadButtonProps {
  value: string
  label?: string
  onClick: (value: string) => void
  disabled?: boolean
  variant?: 'default' | 'operator' | 'equals'
  children?: ReactNode
  className?: string
}

/**
 * Individual keypad button component
 * Supports different variants for visual distinction with enhanced visual feedback
 */
function KeypadButton({
  value,
  label,
  onClick,
  disabled = false,
  variant = 'default',
  children,
  className = '',
}: KeypadButtonProps) {
  const baseStyles =
    'w-full h-14 font-semibold text-lg rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-sm'

  const variantStyles = {
    default:
      'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700',
    operator:
      'bg-[#FF6B35] dark:bg-[#FF6B35] text-white hover:bg-[#E55A24] dark:hover:bg-[#E55A24] active:bg-[#D44914] dark:active:bg-[#D44914] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] dark:focus:ring-[#FF6B35] focus:ring-opacity-50',
    equals:
      'bg-[#0066FF] dark:bg-[#0066FF] text-white hover:bg-[#0052CC] dark:hover:bg-[#0052CC] active:bg-[#003D99] dark:active:bg-[#003D99] focus:outline-none focus:ring-2 focus:ring-[#0066FF] dark:focus:ring-[#0066FF] focus:ring-opacity-50',
  }

  return (
    <button
      onClick={() => onClick(value)}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={label || value}
      type="button"
    >
      {children || label || value}
    </button>
  )
}

/**
 * Numeric Keypad Component
 *
 * Provides a calculator-style numeric keypad with buttons for:
 * - Numbers 0-9
 * - Decimal point
 * - Basic styling with brand colors
 *
 * The component is fully responsive and supports touch/click interactions.
 * Includes keyboard accessibility with proper ARIA labels.
 *
 * @param onButtonClick - Callback function that receives the button value when clicked
 * @param disabled - Optional flag to disable all buttons
 */
export function NumericKeypad({
  onButtonClick,
  disabled = false,
}: NumericKeypadProps) {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1: 7, 8, 9, Delete */}
        <KeypadButton
          value="7"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="8"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="9"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="delete"
          label="DEL"
          onClick={onButtonClick}
          disabled={disabled}
          variant="operator"
        />

        {/* Row 2: 4, 5, 6, + */}
        <KeypadButton
          value="4"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="5"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="6"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="+"
          onClick={onButtonClick}
          disabled={disabled}
          variant="operator"
        />

        {/* Row 3: 1, 2, 3, - */}
        <KeypadButton
          value="1"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="2"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="3"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="-"
          onClick={onButtonClick}
          disabled={disabled}
          variant="operator"
        />

        {/* Row 4: 0, ., =, × */}
        <KeypadButton
          value="0"
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="."
          label="."
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value="="
          onClick={onButtonClick}
          disabled={disabled}
          variant="equals"
        />
        <KeypadButton
          value="*"
          label="×"
          onClick={onButtonClick}
          disabled={disabled}
          variant="operator"
        />

        {/* Row 5: /, clear, (, ) */}
        <KeypadButton
          value="/"
          label="÷"
          onClick={onButtonClick}
          disabled={disabled}
          variant="operator"
        />
        <div className="col-span-2">
          <KeypadButton
            value="clear"
            label="C"
            onClick={onButtonClick}
            disabled={disabled}
            variant="operator"
            className="w-full"
          />
        </div>
        <KeypadButton
          value="("
          onClick={onButtonClick}
          disabled={disabled}
        />
        <KeypadButton
          value=")"
          onClick={onButtonClick}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
