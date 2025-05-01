import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700',
  };
  
  const sizeStyles = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4',
    large: 'py-3 px-6 text-lg',
  };
  
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium transition-colors duration-200
        flex items-center justify-center
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className || ''}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size="small" color={variant === 'outline' ? '#6B7280' : '#FFFFFF'} />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;