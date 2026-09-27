import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  surface = "cream",
  hover = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  surface?: "ivory" | "cream" | "navy" | "transparent";
  hover?: boolean;
}) {
  const surfaceStyles = {
    ivory: "bg-ivory border border-navy/10 text-navy",
    cream: "bg-cream border border-navy/10 text-navy",
    navy: "bg-navy text-ivory border border-navy-light/40",
    transparent: "bg-transparent border border-navy/15 text-navy",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 sm:p-8 transition-all duration-300",
        surfaceStyles[surface],
        hover && "hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5 mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-serif text-xl sm:text-2xl font-normal leading-snug", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-navy/70 leading-relaxed", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 pt-4 border-t border-navy/10 flex items-center justify-between", className)} {...props}>{children}</div>;
}
