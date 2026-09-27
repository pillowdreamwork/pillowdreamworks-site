import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase rounded-full transition-colors",
  {
    variants: {
      variant: {
        default: "bg-navy/10 text-navy border border-navy/15",
        sage: "bg-sage/20 text-navy-dark border border-sage/40",
        gold: "bg-gold/25 text-navy font-semibold border border-gold/50",
        cream: "bg-cream text-navy/80 border border-navy/10",
        navy: "bg-navy text-ivory",
        crisis: "bg-red-100 text-red-900 border border-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
