import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className,
  noPadding,
}) => {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        className
      )}
    >
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between p-4 border-b border-gray-200">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {actions && <div className="ml-4">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? undefined : 'p-4'}>{children}</div>
    </div>
  );
};
