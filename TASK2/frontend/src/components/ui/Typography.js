import React from 'react';
import clsx from 'clsx';

const Typography = ({ 
  children, 
  variant = 'body1',
  component,
  color = 'default',
  className,
  gutterBottom = false,
  ...props 
}) => {
  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    body1: 'text-base',
    body2: 'text-sm',
    caption: 'text-xs',
    subtitle1: 'text-base font-medium',
    subtitle2: 'text-sm font-medium'
  };

  const colors = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    textSecondary: 'text-gray-500',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    success: 'text-green-600'
  };

  const Component = component || (variant.startsWith('h') ? variant : 'p');

  const classes = clsx(
    variants[variant],
    colors[color],
    gutterBottom && 'mb-4',
    className
  );

  return React.createElement(Component, { className: classes, ...props }, children);
};

export default Typography;
