import React from 'react';
import clsx from 'clsx';

const Paper = ({ 
  children, 
  elevation = 1, 
  className,
  ...props 
}) => {
  const elevations = {
    0: 'shadow-none',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
    4: 'shadow-xl',
    5: 'shadow-2xl'
  };

  const classes = clsx(
    'bg-white rounded-lg',
    elevations[elevation] || elevations[1],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Paper;
