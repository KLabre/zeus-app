import React from 'react';

// Define prop types
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'primary' | 'outline'; // TODO: add more button types here
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
}) => {
  const baseStyles =
    'px-3 py-1 font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-sm sm:text-base';
  const primaryStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  const outlineStyles = 'border border-blue-600 text-blue-600 hover:bg-blue-50';
  const disabledStyles = 'bg-blue-400 text-white opacity-50 cursor-not-allowed';

  // Determine the button style
  const buttonStyles = disabled
    ? disabledStyles
    : type === 'outline'
      ? outlineStyles
      : primaryStyles;

  return (
    <button className={`${baseStyles} ${buttonStyles}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
