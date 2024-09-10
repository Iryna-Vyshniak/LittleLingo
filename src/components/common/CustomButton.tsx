import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  size?: 'small' | 'large'; // Size variants
  variant?: 'primary' | 'secondary'; // Define specific variant options
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  size = 'large', // Default to medium size if not provided
  variant = 'primary', // Default to primary variant
}) => {
  // Define variant-based styles
  const variantStyles = {
    primary: size === 'large' ? 'butt' : 'butt-small',
    secondary: size === 'large' ? 'butt-secondary' : 'butt-secondary-small',
  };
  return (
    <button
      onClick={onClick}
      className={`special-font custom text-center tracking-wide text-white ${variantStyles[variant]}`}
    >
      <span className={`layer ${size === 'large' ? 'l1' : 'l1-small'}`}>
        <span className={`${size === 'large' ? 'l5' : 'l5-small'}`}>
          {label}
        </span>
      </span>
      <span className={`layer ${size === 'large' ? 'l2' : 'l2-small'}`}></span>
      <span className={`layer ${size === 'large' ? 'l3' : 'l3-small'}`}></span>
      <span className={`layer ${size === 'large' ? 'l4' : 'l4-small'}`}></span>
      <span className={`layer ${size === 'large' ? 'l6' : 'l6-small'}`}></span>
    </button>
  );
};

export default CustomButton;
