// src/components/ui/section-heading.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Text alignment: "left", "center", or "right". Defaults to "center". */
  align?: "left" | "center" | "right";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  const alignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <div className={cn(className, alignmentClass)}>
      {eyebrow && (
        <p className="text-sm font-medium text-sage-dark uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold mb-4 text-navy", alignmentClass)}>
        {title}
      </h2>
      {description && (
        <p className={cn("text-base text-navy/70 max-w-2xl mx-auto", alignmentClass)}>
          {description}
        </p>
      )}
    </div>
  );
}
