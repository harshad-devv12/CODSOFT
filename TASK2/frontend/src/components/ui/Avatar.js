import React from 'react';
import clsx from 'clsx';

const Avatar = ({ 
  src, 
  alt, 
  children, 
  size = 'md', 
  className,
  ...props 
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  };

  const classes = clsx(
    'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium',
    sizes[size],
    className
  );

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={clsx(classes, 'object-cover')}
        {...props}
      />
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Avatar;
