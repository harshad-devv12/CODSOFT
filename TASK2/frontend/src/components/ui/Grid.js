import React from 'react';
import clsx from 'clsx';

const Grid = ({ 
  children, 
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing = 0,
  className,
  ...props 
}) => {
  const getSpacingClass = (spacing) => {
    const spacingMap = {
      0: '',
      1: 'gap-1',
      2: 'gap-2',  
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6'
    };
    return spacingMap[spacing] || '';
  };

  const getColClass = (size, breakpoint = '') => {
    if (!size) return '';
    const prefix = breakpoint ? `${breakpoint}:` : '';
    if (size === 12) return `${prefix}col-span-12`;
    if (size === 6) return `${prefix}col-span-6`;
    if (size === 4) return `${prefix}col-span-4`;
    if (size === 3) return `${prefix}col-span-3`;
    if (size === 2) return `${prefix}col-span-2`;
    if (size === 1) return `${prefix}col-span-1`;
    return `${prefix}col-span-${size}`;
  };

  let classes = [];

  if (container) {
    classes.push('grid', 'grid-cols-12', getSpacingClass(spacing));
  }

  if (item) {
    classes.push(
      getColClass(xs),
      getColClass(sm, 'sm'),
      getColClass(md, 'md'),
      getColClass(lg, 'lg'),
      getColClass(xl, 'xl')
    );
  }

  const finalClasses = clsx(classes.filter(Boolean), className);

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
};

export default Grid;
