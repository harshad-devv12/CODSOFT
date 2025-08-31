import React from 'react';
import clsx from 'clsx';

const TextArea = ({ 
  label, 
  error, 
  helperText,
  className,
  required = false,
  rows = 4,
  ...props 
}) => {
  const textareaClasses = clsx(
    'w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-vertical',
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
      <textarea 
        className={textareaClasses} 
        rows={rows}
        {...props} 
      />
      {(error || helperText) && (
        <p className={clsx('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default TextArea;
