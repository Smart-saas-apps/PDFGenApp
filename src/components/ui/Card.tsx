import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  noPadding,
  title,
  description,
  footer,
  actions,
}) => {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        'transition duration-200 ease-in-out',
        'hover:shadow-md',
        className
      )}
    >
      {(title || description || actions) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};
