"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer select-none tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "liquid-glass-primary text-[#FDFBF7] shadow-sm hover:text-white",
        secondary: "liquid-glass-secondary text-[#24483B] hover:text-[#1A3529]",
        gold: "bg-[#C6A46A]/90 text-[#202923] font-semibold border border-white/30 backdrop-blur-md shadow-sm hover:bg-[#C6A46A]",
        sage: "liquid-glass-secondary text-[#202923] border-[#A6B7A1]/40 hover:border-[#A6B7A1]",
        outline: "liquid-glass-subtle text-[#202923] hover:text-[#24483B]",
        ghost: "bg-transparent text-[#202923] hover:bg-[#24483B]/5 active:bg-[#24483B]/10",
        link: "text-[#24483B] underline-offset-4 hover:underline p-0 h-auto font-normal",
        crisis: "bg-[#8B2626] text-[#FDFBF7] hover:bg-[#6D1B1B] shadow-sm border border-red-700/50",
      },
      size: {
        sm: "h-8 px-3.5 text-xs rounded-full min-h-[36px]",
        md: "h-11 px-5 text-sm rounded-full min-h-[44px]",
        lg: "h-12 px-7 text-base rounded-full min-h-[48px]",
        icon: "size-10 rounded-full p-0 flex items-center justify-center min-w-[40px] min-h-[40px]",
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
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, variant, size, href, external, children, disabled, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const isExternal =
      external ??
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("https://wa.me"));

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-disabled={disabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-disabled={disabled}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={disabled}
      type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || "button"}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
