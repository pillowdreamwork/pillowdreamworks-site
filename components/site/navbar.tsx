"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
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

          {/* Right Action: Crisis Hotline Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:988"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B2626]/10 hover:bg-[#8B2626]/15 text-[#8B2626] font-mono text-xs border border-[#8B2626]/20 transition-all active:scale-95"
              title="Immediate Crisis Protocol Support"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-pulse" />
              <span className="font-semibold">Crisis: 988 / 14416</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-lg text-[#202923] hover:bg-[#24483B]/5 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
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
