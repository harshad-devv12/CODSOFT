import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

const Select = ({ 
  label, 
  error, 
  helperText,
  children,
  className,
  required = false,
  ...props 
}) => {
  const selectClasses = clsx(
    'w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 appearance-none bg-white pr-10',
    error 
      ? 'border-red-300 focus:ring-red-500' 
      : 'border-gray-300 hover:border-gray-400',
    className
  );

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select className={selectClasses} {...props}>
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {(error || helperText) && (
        <p className={clsx('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
