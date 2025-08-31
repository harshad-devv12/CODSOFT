import React from 'react';
import clsx from 'clsx';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

const Alert = ({ 
  variant = 'info', 
  children, 
  className,
  onClose,
  ...props 
}) => {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500'
    }
  };

  const { container, icon: Icon, iconColor } = variants[variant];

  return (
    <div 
      className={clsx(
        'flex items-start p-4 rounded-xl border',
        container,
        className
      )}
      {...props}
    >
      <Icon className={clsx('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', iconColor)} />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 p-1 hover:bg-black hover:bg-opacity-10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
