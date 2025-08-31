import React from 'react';
import clsx from 'clsx';

const IconButton = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className,
  ...props 
}) => {
  const variants = {
    default: 'text-gray-600 hover:bg-gray-100',
    primary: 'text-blue-600 hover:bg-blue-100',
    success: 'text-green-600 hover:bg-green-100',
    warning: 'text-yellow-600 hover:bg-yellow-100',
    danger: 'text-red-600 hover:bg-red-100',
    info: 'text-cyan-600 hover:bg-cyan-100'
  };

  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const classes = clsx(
    'inline-flex items-center justify-center rounded-lg transition-colors duration-150 focus:outline-none',
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
