import React from 'react';
import clsx from 'clsx';

const Input = ({ 
  label, 
  error, 
  helperText,
  leftIcon,
  rightIcon,
  className,
  required = false,
  fullWidth = false,
  ...props 
}) => {
  const inputClasses = clsx(
    'w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500',
    error 
      ? 'border-red-300 focus:ring-red-500' 
      : 'border-gray-300 hover:border-gray-400',
    leftIcon && 'pl-11',
    rightIcon && 'pr-11',
    className
  );

  return (
    <div className={clsx('relative', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-lg">{leftIcon}</span>
          </div>
        )}
        <input className={inputClasses} {...props} />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-gray-400 text-lg">{rightIcon}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={clsx('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
