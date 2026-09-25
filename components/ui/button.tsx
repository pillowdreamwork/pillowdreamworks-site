"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer select-none rounded-md tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-navy text-ivory hover:bg-navy-light shadow-sm active:bg-navy-dark",
        secondary: "bg-cream text-navy border border-navy/15 hover:bg-navy/5 active:bg-navy/10",
        gold: "bg-gold text-navy font-semibold hover:bg-gold-dark/90 hover:text-ivory shadow-sm active:bg-gold-dark",
        sage: "bg-sage text-navy font-medium hover:bg-sage-dark hover:text-ivory active:bg-sage-dark",
        outline: "border border-navy/25 bg-transparent text-navy hover:bg-navy/5 hover:border-navy",
        ghost: "bg-transparent text-navy hover:bg-navy/5 active:bg-navy/10",
        link: "text-navy underline-offset-4 hover:underline p-0 h-auto font-normal",
        crisis: "bg-red-900/90 text-ivory hover:bg-red-800 shadow-sm border border-red-700/50",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
