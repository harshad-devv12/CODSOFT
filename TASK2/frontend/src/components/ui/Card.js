import React from 'react';
import clsx from 'clsx';

const Card = ({ 
  children, 
  className, 
  hover = false, 
  padding = 'default',
  variant = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl border transition-all duration-200';
  
  const variants = {
    default: 'border-gray-200 shadow-sm',
    elevated: 'border-gray-200 shadow-lg',
    outlined: 'border-2 border-gray-300',
    ghost: 'border-transparent shadow-none'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const hoverEffect = hover ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : '';

  const classes = clsx(
    baseClasses,
    variants[variant],
    paddings[padding],
    hoverEffect,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
