// src/components/ui/container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'wide';
  className?: string;
}

export function Container({ children, size = 'wide', className = '' }: ContainerProps) {
  const sizeClass = size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';
  return (
    <div className={`${sizeClass} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
