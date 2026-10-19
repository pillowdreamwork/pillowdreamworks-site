"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The 9 Details that turn a default button into one that feels ALIVE:
 * 1. Size: at least 44px (min-h-[44px] with generous padding)
 * 2. Shape: a full pill (rounded-full)
 * 3. Type: a real font (refined typography, tracking-wide, clear contrast)
 * 4. Color: almost black (#151C17 / rgba(21, 28, 23, 0.94))
 * 5. Signal: one red dot (luminous, pulsing vermilion dot indicator)
 * 6. Hover: the arrow turns (350ms smooth rotation)
 * 7. Light: a glow follows your cursor (radial gradient light overlay)
 * 8. Magnet: it leans toward you (smooth magnetic displacement toward pointer)
 * 9. Press: scale .97 (active:scale-[0.97])
 * + Spacing: ample room around text so labels are clean and easily readable
 */
export const liquidGlassVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 font-sans font-medium tracking-wide antialiased select-none cursor-pointer rounded-full transition-all duration-[350ms] ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] active:scale-[0.97] overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#151C17] text-[#FDFBF7] border border-white/15 shadow-[0_4px_20px_-3px_rgba(21,28,23,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(0,0,0,0.5)] backdrop-blur-xl hover:bg-[#1D2720] hover:shadow-[0_8px_28px_-4px_rgba(21,28,23,0.45),inset_0_1px_0_0_rgba(255,255,255,0.25)] hover:text-white",
        secondary:
          "bg-[#FDFBF7]/85 text-[#151C17] border border-[#24483B]/15 shadow-[0_2px_12px_-2px_rgba(32,41,35,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-xl hover:bg-[#FDFBF7] hover:border-[#24483B]/30 hover:shadow-[0_6px_20px_-2px_rgba(32,41,35,0.12)] hover:text-[#24483B]",
        subtle:
          "bg-white/40 text-[#151C17] border border-[#24483B]/12 backdrop-blur-md hover:bg-white/75 hover:border-[#24483B]/25 hover:shadow-xs hover:text-[#24483B]",
        vermilion:
          "bg-[#E85D3F] text-[#FDFBF7] border border-white/20 shadow-[0_4px_18px_-2px_rgba(232,93,63,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] backdrop-blur-xl hover:bg-[#D64E32] hover:shadow-[0_8px_24px_-2px_rgba(232,93,63,0.5)]",
        crisis:
          "bg-[#8B2626] text-[#FDFBF7] border border-white/20 shadow-[0_4px_18px_-2px_rgba(139,38,38,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-xl hover:bg-[#721F1F]",
        gold:
          "bg-[#C6A46A] text-[#151C17] font-semibold border border-white/30 shadow-[0_4px_18px_-2px_rgba(198,164,106,0.4),inset_0_1px_0_0_rgba(255,255,255,0.4)] backdrop-blur-xl hover:bg-[#B89456]",
      },
      size: {
        sm: "min-h-[44px] px-5 py-2 text-xs",
        md: "min-h-[44px] px-6 py-2.5 text-sm",
        lg: "min-h-[50px] px-8 py-3.5 text-base",
        xl: "min-h-[56px] px-9 py-4 text-base",
        icon: "min-h-[44px] min-w-[44px] size-11 p-0",
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
      href,
      external,
      signalDot,
      showArrow = false,
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

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovered(true);

      if (magnet) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.15;
        const deltaY = (y - centerY) * 0.15;
        setMagnetOffset({ x: deltaX, y: deltaY });
      }
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      setMagnetOffset({ x: 0, y: 0 });
    };

    const isPrimaryLike = variant === "primary" || variant === undefined;
    const shouldShowSignal = signalDot !== undefined ? signalDot : isPrimaryLike && size !== "icon";

    const inlineStyle: React.CSSProperties = {
      transform:
        magnetOffset.x !== 0 || magnetOffset.y !== 0
          ? `translate3d(${magnetOffset.x}px, ${magnetOffset.y}px, 0)`
          : undefined,
      transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
      ...props.style,
    };

    const classes = cn(
      liquidGlassVariants({ variant, size }),
      "[&_.button-arrow]:transition-transform [&_.button-arrow]:duration-[350ms] [&_.button-arrow]:ease-out group-hover:[&_.button-arrow]:rotate-45",
      "[&_svg.lucide-arrow-right]:transition-transform [&_svg.lucide-arrow-right]:duration-[350ms] [&_svg.lucide-arrow-right]:ease-out group-hover:[&_svg.lucide-arrow-right]:rotate-45",
      "[&_svg.lucide-arrow-up-right]:transition-transform [&_svg.lucide-arrow-up-right]:duration-[350ms] [&_svg.lucide-arrow-up-right]:ease-out group-hover:[&_svg.lucide-arrow-up-right]:rotate-45",
      className
    );

    const content = (
      <>
        {/* Detail 7: Cursor Light Glow */}
        {glow && (
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

        {/* Detail 5: Signal Red Dot */}
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

        {/* Detail 6: Hover Arrow Turns (350ms) */}
        {showArrow && (
          <ArrowRight className="button-arrow ml-1" />
        )}
      </>
    );

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
