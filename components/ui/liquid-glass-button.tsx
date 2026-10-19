"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const liquidGlassVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none cursor-pointer tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "liquid-glass-primary text-[#FDFBF7] font-medium shadow-sm hover:text-[#FFFFFF]",
        secondary:
          "liquid-glass-secondary text-[#24483B] font-medium hover:text-[#1A3529]",
        subtle:
          "liquid-glass-subtle text-[#202923] font-medium hover:text-[#24483B]",
        vermilion:
          "bg-[#E85D3F]/90 backdrop-blur-md text-[#FDFBF7] border border-white/20 shadow-sm hover:bg-[#E85D3F] hover:shadow-md",
        crisis:
          "bg-[#8B2626]/90 backdrop-blur-md text-[#FDFBF7] border border-white/20 shadow-sm hover:bg-[#8B2626] hover:shadow-md",
        gold:
          "bg-[#C6A46A]/90 backdrop-blur-md text-[#202923] border border-white/30 shadow-sm hover:bg-[#C6A46A] hover:text-[#1A3529] font-semibold",
      },
      size: {
        sm: "h-8 px-3.5 text-xs rounded-full min-h-[36px]",
        md: "h-11 px-5 text-sm rounded-full min-h-[44px]",
        lg: "h-12 px-7 text-base rounded-full min-h-[48px]",
        xl: "h-14 px-8 text-base rounded-full min-h-[52px]",
        icon: "size-10 rounded-full p-0 flex items-center justify-center min-w-[40px] min-h-[40px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidGlassVariants> {
  href?: string;
  external?: boolean;
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidGlassButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, variant, size, href, external, children, disabled, ...props }, ref) => {
  const classes = cn(liquidGlassVariants({ variant, size }), className);

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

LiquidGlassButton.displayName = "LiquidGlassButton";

// Backward compatibility aliases
export const LiquidButton = LiquidGlassButton;
export const MetalButton = LiquidGlassButton;
export const Button = LiquidGlassButton;
export default LiquidGlassButton;
