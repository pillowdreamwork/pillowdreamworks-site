"use client";

import * as React from "react";
import Link from "next/link";
<<<<<<< HEAD
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
=======
import { Menu, ChevronDown, Sparkles } from "lucide-react";
import { MAIN_NAVIGATION } from "@/data/navigation";
>>>>>>> 30c7539 (Clean lint warnings and finalize production build)
import { MobileDrawer } from "./mobile-drawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Strict 7 Direct Destinations — Zero dropdowns, zero mega menus
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
            ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#0F2038]/10 py-3.5"
            : "bg-[#FDFBF7]/85 backdrop-blur-sm border-b border-[#0F2038]/5 py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Foundation Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#0F2038] text-[#FDFBF7] flex items-center justify-center font-serif text-sm font-bold shadow-xs group-hover:bg-[#1E3557] transition-colors">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#0F2038]">
                PillowDreamWorks
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#0F2038]/60 font-sans font-medium -mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Direct Navigation (Strict 7 Direct Links — No Dropdowns) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
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
                    isActive ? "text-[#0F2038] font-semibold" : "text-[#0F2038]/70 hover:text-[#0F2038]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CBA258] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Crisis Hotline Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:988"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B2626]/10 hover:bg-[#8B2626]/15 text-[#8B2626] font-mono text-xs border border-[#8B2626]/20 transition-colors"
              title="Immediate Crisis Protocol Support"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-pulse" />
              <span>Crisis Support: 988</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-lg text-[#0F2038] hover:bg-[#0F2038]/5 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Direct 7 links without submenus) */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
