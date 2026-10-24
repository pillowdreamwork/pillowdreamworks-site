"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button component embodying the 9 Alive Details:
 * 1. Size: at least 44px
 * 2. Shape: full pill (rounded-full)
 * 3. Type: real font, clean tracking and readability
 * 4. Color: almost black / liquid-glass surfaces
 * 5. Signal: one red dot (configurable)
 * 6. Hover: arrow turns (350ms)
 * 7. Light: glow follows cursor
 * 8. Magnet: leans toward cursor
 * 9. Press: scale .97
 */
export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 font-sans font-medium tracking-wide antialiased select-none cursor-pointer rounded-full transition-all duration-[350ms] ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] active:scale-[0.97] overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#151C17] text-[#FDFBF7] border border-white/15 shadow-[0_4px_20px_-3px_rgba(21,28,23,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(0,0,0,0.5)] backdrop-blur-xl hover:bg-[#1D2720] hover:text-white",
        secondary:
          "bg-[#FDFBF7]/85 text-[#151C17] border border-[#24483B]/15 shadow-[0_2px_12px_-2px_rgba(32,41,35,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-xl hover:bg-[#FDFBF7] hover:border-[#24483B]/30 hover:text-[#24483B]",
        gold:
          "bg-[#C6A46A] text-[#151C17] font-semibold border border-white/30 shadow-[0_4px_18px_-2px_rgba(198,164,106,0.4),inset_0_1px_0_0_rgba(255,255,255,0.4)] backdrop-blur-xl hover:bg-[#B89456]",
        sage:
          "bg-[#A6B7A1]/25 text-[#151C17] border border-[#A6B7A1]/40 backdrop-blur-md hover:bg-[#A6B7A1]/40 hover:border-[#A6B7A1]",
        outline:
          "bg-white/40 text-[#151C17] border border-[#24483B]/15 backdrop-blur-md hover:bg-white/75 hover:border-[#24483B]/30 hover:text-[#24483B]",
        ghost:
          "bg-transparent text-[#151C17] hover:bg-[#24483B]/5 active:bg-[#24483B]/10",
        link:
          "text-[#24483B] underline-offset-4 hover:underline p-0 h-auto font-normal rounded-none",
        crisis:
          "bg-[#8B2626] text-[#FDFBF7] border border-white/20 shadow-[0_4px_18px_-2px_rgba(139,38,38,0.4)] backdrop-blur-xl hover:bg-[#721F1F]",
      },
      size: {
        sm: "min-h-[44px] px-5 py-2 text-xs",
        md: "min-h-[44px] px-6 py-2.5 text-sm",
        lg: "min-h-[50px] px-8 py-3.5 text-base",
        icon: "min-h-[44px] min-w-[44px] size-11 p-0",
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
  signalDot?: boolean;
  magnet?: boolean;
  glow?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
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

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovered(true);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (magnet) {
        const deltaX = (x - centerX) * 0.15;
        const deltaY = (y - centerY) * 0.15;
        setMagnetOffset({ x: deltaX, y: deltaY });
      }

      // Interactive 3D Perspective Tilt Physics
      const normX = (x - centerX) / Math.max(centerX, 1);
      const normY = (y - centerY) / Math.max(centerY, 1);
      setTiltAngle({
        rotateX: -normY * 6.5,
        rotateY: normX * 6.5,
      });
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      setMagnetOffset({ x: 0, y: 0 });
      setTiltAngle({ rotateX: 0, rotateY: 0 });
    };

    const isPrimaryLike = variant === "primary" || variant === undefined;
    const shouldShowSignal = signalDot !== undefined ? signalDot : isPrimaryLike && size !== "icon";

    const inlineStyle: React.CSSProperties = {
      transform: isHovered
        ? `perspective(600px) translate3d(${magnetOffset.x}px, ${magnetOffset.y}px, 6px) rotateX(${tiltAngle.rotateX.toFixed(2)}deg) rotateY(${tiltAngle.rotateY.toFixed(2)}deg)`
        : "perspective(600px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)",
      transformStyle: "preserve-3d",
      transition: isHovered
        ? "transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease"
        : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
      ...props.style,
    };

    const classes = cn(
      buttonVariants({ variant, size }),
      "[&_.button-arrow]:transition-transform [&_.button-arrow]:duration-[350ms] [&_.button-arrow]:ease-out group-hover:[&_.button-arrow]:rotate-45",
      "[&_svg.lucide-arrow-right]:transition-transform [&_svg.lucide-arrow-right]:duration-[350ms] [&_svg.lucide-arrow-right]:ease-out group-hover:[&_svg.lucide-arrow-right]:rotate-45",
      "[&_svg.lucide-arrow-up-right]:transition-transform [&_svg.lucide-arrow-up-right]:duration-[350ms] [&_svg.lucide-arrow-up-right]:ease-out group-hover:[&_svg.lucide-arrow-up-right]:rotate-45",
      className
    );

    const innerContent = (
      <>
        {glow && variant !== "link" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden"
            style={{
              background: isHovered
                ? `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), transparent 70%)`
                : undefined,
            }}
          />
        )}

        {shouldShowSignal && (
          <span
            className="relative flex h-2 w-2 shrink-0 items-center justify-center mr-0.5"
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E85D3F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E85D3F] shadow-[0_0_8px_rgba(232,93,63,0.9)]" />
          </span>
        )}

        {children}
      </>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLButtonElement>}
          className={classes}
          style={inlineStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          {...(props as React.HTMLAttributes<HTMLElement>)}
        >
          {children}
        </Slot>
      );
    }

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
            {innerContent}
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
          {innerContent}
        </Link>
      );
    }

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
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";
