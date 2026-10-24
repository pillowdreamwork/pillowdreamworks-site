"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  glassmorphism?: boolean;
}

/**
 * 3D Tilt Card with hardware-accelerated perspective, smooth spring interpolation,
 * dynamic specular reflection glare overlay, and optional liquid ivory/cream glassmorphism.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
  glare = true,
  glassmorphism = false,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setCoords({ x: tiltX, y: tiltY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform",
        glassmorphism &&
          "bg-[#FAF9F5]/70 backdrop-blur-xl border border-[#24483B]/15 shadow-sm rounded-3xl",
        className
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) translateZ(6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {children}
      {glare && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
