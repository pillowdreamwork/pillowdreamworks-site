// src/components/ui/button.tsx
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'md',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-navy text-ivory hover:bg-navy/90',
    secondary: 'bg-cream text-navy border border-navy/10 hover:bg-cream/90',
    gold: 'bg-gold text-navy hover:bg-gold/90',
  }[variant];

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  const classes = cn(`${baseClasses} ${variantClasses} ${sizeClasses}`, className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as any}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
