import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 pb-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 pt-0 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-lg font-semibold leading-none tracking-tight ${className}`} 
    {...props}
  >
    {children}
  </h3>
);
