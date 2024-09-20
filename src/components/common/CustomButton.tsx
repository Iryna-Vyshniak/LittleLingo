import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  size?: 'small' | 'large'; // Size variants
  variant?: 'primary' | 'secondary'; // Define specific variant options
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  size = 'large', // Default to medium size if not provided
  variant = 'primary', // Default to primary variant
  disabled = false,
}) => {
  // Define variant-based styles
  const variantStyles = {
    primary: size === 'large' ? 'butt' : 'butt-small',
    secondary: size === 'large' ? 'butt-secondary' : 'butt-secondary-small',
  };

  // Define styles for the disabled state
  const disabledStyles = disabled
    ? 'cursor-not-allowed opacity-20'
    : 'cursor-pointer';

  return (
    <button
      onClick={!disabled ? onClick : undefined} // Disable onClick if the button is disabled
      className={`special-font custom text-center tracking-wide text-white ${variantStyles[variant]} ${disabledStyles}`}
      disabled={disabled}
    >
      <span className={size === 'large' ? 'layer l1' : 'layer-small l1-small'}>
        <span className={size === 'large' ? 'l5' : 'l5-small'}>{label}</span>
      </span>
      <span
        className={size === 'large' ? 'layer l2' : 'layer-small l2-small'}
      ></span>
      <span
        className={size === 'large' ? 'layer l3' : 'layer-small l3-small'}
      ></span>
      <span
        className={size === 'large' ? 'layer l4' : 'layer-small l4-small'}
      ></span>
      <span
        className={size === 'large' ? 'layer l6' : 'layer-small l6-small'}
      ></span>
    </button>
  );
};

export default CustomButton;
