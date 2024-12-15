// components/Button.tsx
type ButtonColors = 'red' | 'blue' | 'cyan' | 'green'

type ButtonProps = {
  children: React.ReactNode
  color?: ButtonColors // 버튼 색상
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'red',
  onClick,
  type = 'button',
  className = '',
  disabled = false
}) => {
  const colors = {
    red: 'bg-red-600 hover:bg-red-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    cyan: 'bg-cyan-600 hover:bg-cyan-700',
    green: 'bg-green-600 hover:bg-green-700'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white px-4 py-2 rounded-lg font-bold transition duration-300 ${
        colors[color]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  )
}

export default Button
