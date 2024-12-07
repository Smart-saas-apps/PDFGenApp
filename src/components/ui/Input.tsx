import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  return (
    <div className={twMerge('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{leftIcon}</span>
          </div>
        )}
        <input
          className={twMerge(
            'block rounded-md shadow-sm',
            'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{rightIcon}</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
