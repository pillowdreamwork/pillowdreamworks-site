"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { MobileDrawer } from "./mobile-drawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Books", href: "/books" },
    { label: "Assessments", href: "/assessments" },
    { label: "Services", href: "/services" },
    { label: "Learn", href: "/learn" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#24483B]/10 py-3"
            : "bg-[#FDFBF7]/85 backdrop-blur-sm border-b border-[#24483B]/6 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Foundation Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#24483B] text-[#FDFBF7] flex items-center justify-center font-serif text-sm font-bold shadow-xs group-hover:bg-[#1A3529] transition-colors">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#202923]">
                PillowDreamWorks
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#24483B]/70 font-sans font-semibold -mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Direct Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-[#24483B] font-semibold"
                      : "text-[#202923]/70 hover:text-[#24483B]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A46A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Crisis Hotline Pill & Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <LiquidGlassButton
              href="tel:988"
              variant="crisis"
              size="sm"
              showArrow={false}
              signalDot
              className="font-mono text-xs"
              title="US 988 Suicide & Crisis Lifeline / India 14416"
            >
              <span>Crisis: 988</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              href="/books/psychology-toolkit"
              variant="primary"
              size="sm"
              showArrow
              className="text-xs shadow-sm"
            >
              <span>Get Toolkit</span>
            </LiquidGlassButton>
          </div>

          {/* Mobile Menu Button */}
          <LiquidGlassButton
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            variant="subtle"
            size="icon"
            showArrow={false}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5 text-ink" />
          </LiquidGlassButton>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
