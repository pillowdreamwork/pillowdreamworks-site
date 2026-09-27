import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "subtle" | "gold" | "sage" | "navy";
}

export function Divider({ className, variant = "subtle", ...props }: DividerProps) {
  const variantClasses = {
    subtle: "border-navy/10",
    gold: "border-gold/30",
    sage: "border-sage/40",
    navy: "border-navy/20",
  };

  return (
    <hr
      className={cn("w-full border-t my-8 sm:my-12", variantClasses[variant], className)}
      {...props}
    />
  );
}
