"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PillowDreamWorks Premium Liquid-Magnetic Button System:
 * - Height: min 44px, target 52px for primary buttons
 * - Shape: Fully rounded pill (border-radius: 9999px)
 * - Background: Almost black #121214 (with frosted liquid specular highlight)
 * - Text: White/light grey using Space Grotesk 500 (font-medium)
 * - Accent: Vermilion red #FF3E3E circular arrow element at the right
 * - Spacing: Generous horizontal padding, perfectly centered text
 * - Magnet: Leans toward cursor without excessive movement (disabled on touch)
 * - Light: Soft glow follows cursor within button
 * - Press: scale 0.97 with smooth return
 * - Hover: Arrow rotates 45deg over 350ms, circular element shifts toward pointer
 * - Reduced motion & Touchscreens respected
 */
export const liquidGlassVariants = cva(
  "group relative inline-flex items-center justify-center text-center font-display font-medium tracking-wide antialiased select-none cursor-pointer rounded-full transition-all duration-[350ms] ease-out disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E3E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5] active:scale-[0.97] overflow-hidden leading-tight",
  {
    variants: {
      variant: {
        primary:
          "bg-[#121214] text-[#FDFBF7] border border-white/15 shadow-[0_4px_24px_-3px_rgba(18,18,20,0.45),inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_0_0_rgba(0,0,0,0.6)] backdrop-blur-xl hover:bg-[#1A1A1E] hover:shadow-[0_8px_32px_-4px_rgba(18,18,20,0.6),inset_0_1px_0_0_rgba(255,255,255,0.32)] hover:text-white",
        secondary:
          "bg-[#FDFBF7]/90 text-[#121214] border border-[#24483B]/15 shadow-[0_2px_14px_-2px_rgba(32,41,35,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] backdrop-blur-xl hover:bg-[#FDFBF7] hover:border-[#24483B]/30 hover:shadow-[0_6px_24px_-2px_rgba(32,41,35,0.14)] hover:text-[#24483B]",
        subtle:
          "bg-white/50 text-[#121214] border border-[#24483B]/12 backdrop-blur-md hover:bg-white/85 hover:border-[#24483B]/25 hover:shadow-xs hover:text-[#24483B]",
        outline:
          "bg-white/40 text-[#121214] border border-[#24483B]/15 backdrop-blur-md hover:bg-white/80 hover:border-[#24483B]/30 hover:text-[#24483B]",
        ghost:
          "bg-transparent text-[#121214] hover:bg-[#24483B]/5 active:bg-[#24483B]/10",
        gold:
          "bg-[#C6A46A] text-[#121214] border border-white/30 shadow-[0_4px_20px_-2px_rgba(198,164,106,0.4),inset_0_1px_0_0_rgba(255,255,255,0.45)] backdrop-blur-xl hover:bg-[#B89456]",
        sage:
          "bg-[#8FA89E]/25 text-[#121214] border border-[#8FA89E]/40 backdrop-blur-md hover:bg-[#8FA89E]/40 hover:border-[#8FA89E]",
        crisis:
          "bg-[#8B2626] text-[#FDFBF7] border border-white/20 shadow-[0_4px_20px_-2px_rgba(139,38,38,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] backdrop-blur-xl hover:bg-[#721F1F]",
        vermilion:
          "bg-[#FF3E3E] text-white border border-white/25 shadow-[0_4px_20px_-2px_rgba(255,62,62,0.45),inset_0_1px_0_0_rgba(255,255,255,0.3)] backdrop-blur-xl hover:bg-[#E63535]",
        link:
          "text-[#24483B] underline-offset-4 hover:underline p-0 h-auto font-normal rounded-none",
      },
      size: {
        sm: "min-h-[44px] px-5 py-2 text-xs sm:text-sm gap-2",
        md: "min-h-[52px] px-7 py-3 text-sm sm:text-base gap-3",
        lg: "min-h-[56px] px-8 py-3.5 text-base gap-3.5",
        xl: "min-h-[60px] px-9 py-4 text-base sm:text-lg gap-4",
        icon: "min-h-[44px] min-w-[44px] size-11 p-0 justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface LiquidGlassButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">,
    VariantProps<typeof liquidGlassVariants> {
  asChild?: boolean;
  href?: string;
  external?: boolean;
  signalDot?: boolean;
  showArrow?: boolean;
  magnet?: boolean;
  glow?: boolean;
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidGlassButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      href,
      external,
      signalDot,
      showArrow,
      magnet = true,
      glow = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const [magnetOffset, setMagnetOffset] = React.useState({ x: 0, y: 0 });
    const [tiltAngle, setTiltAngle] = React.useState({ rotateX: 0, rotateY: 0 });
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    const prefersReducedMotion = React.useRef(false);

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        setIsTouchDevice(
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
        );
        prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
    }, []);

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (disabled || isTouchDevice || prefersReducedMotion.current) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovered(true);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (magnet) {
        const deltaX = (x - centerX) * 0.12;
        const deltaY = (y - centerY) * 0.12;
        setMagnetOffset({ x: deltaX, y: deltaY });
      }

      // Subtle, tactile 3D perspective tilt (max 5.5 degrees)
      const normX = (x - centerX) / Math.max(centerX, 1);
      const normY = (y - centerY) / Math.max(centerY, 1);
      setTiltAngle({
        rotateX: -normY * 5.5,
        rotateY: normX * 5.5,
      });
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      setMagnetOffset({ x: 0, y: 0 });
      setTiltAngle({ rotateX: 0, rotateY: 0 });
    };

    // Determine circular arrow visibility:
    // By default, action buttons (primary, secondary, gold, crisis, vermilion) show the red circular arrow unless explicitly set to false or size is icon
    const isPrimaryAction =
      variant === "primary" ||
      variant === "secondary" ||
      variant === "gold" ||
      variant === "crisis" ||
      variant === "vermilion";

    const shouldShowArrow =
      size !== "icon" &&
      size !== "sm" &&
      variant !== "link" &&
      variant !== "ghost" &&
      (showArrow !== undefined ? showArrow : isPrimaryAction);

    // Explicit showArrow override for small/subtle when requested
    const renderArrow = showArrow !== undefined ? showArrow : shouldShowArrow;

    const inlineStyle: React.CSSProperties = {
      transform:
        !prefersReducedMotion.current && !isTouchDevice && isHovered
          ? `perspective(600px) translate3d(${magnetOffset.x.toFixed(1)}px, ${magnetOffset.y.toFixed(1)}px, 4px) rotateX(${tiltAngle.rotateX.toFixed(2)}deg) rotateY(${tiltAngle.rotateY.toFixed(2)}deg)`
          : undefined,
      transformStyle: "preserve-3d",
      transition: isHovered
        ? "transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease"
        : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
      ...props.style,
    };

    const classes = cn(
      liquidGlassVariants({ variant, size }),
      className
    );

    const content = (
      <>
        {/* Soft cursor-following light glow within button */}
        {glow && !isTouchDevice && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden"
            style={{
              background: isHovered
                ? `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), transparent 70%)`
                : undefined,
            }}
          />
        )}

        {/* Optional signal dot */}
        {signalDot && (
          <span
            className="relative flex h-2 w-2 shrink-0 items-center justify-center mr-0.5"
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3E3E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3E3E] shadow-[0_0_8px_rgba(255,62,62,0.9)]" />
          </span>
        )}

        <span className="relative z-10 flex min-w-0 items-center gap-2">
          {children}
        </span>

        {/* Circular Vermilion Red (#FF3E3E) Arrow Accent */}
        {renderArrow && (
          <span
            aria-hidden="true"
            className="button-arrow-circle relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF3E3E] text-white shrink-0 ml-1.5 shadow-[0_0_14px_rgba(255,62,62,0.45)] transition-all duration-[350ms] ease-out group-hover:scale-105 group-hover:translate-x-0.5"
          >
            <ArrowRight className="button-arrow w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-[350ms] ease-out group-hover:rotate-45" />
          </span>
        )}
      </>
    );

    // If asChild is requested, use Radix Slot
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={classes}
          style={inlineStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    // Direct href link: Never nest a button inside an anchor!
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
            style={inlineStyle}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-disabled={disabled}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          style={inlineStyle}
          aria-disabled={disabled}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    // Interactive button element
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        style={inlineStyle}
        disabled={disabled}
        type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || "button"}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";

export const LiquidButton = LiquidGlassButton;
export const MetalButton = LiquidGlassButton;
export const Button = LiquidGlassButton;
export const buttonVariants = liquidGlassVariants;
