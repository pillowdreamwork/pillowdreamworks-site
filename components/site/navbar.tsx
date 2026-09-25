"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Sparkles, BookOpen, Compass, HeartHandshake, GraduationCap } from "lucide-react";
import { MAIN_NAVIGATION } from "@/data/navigation";
import { CAMPAIGN_METADATA } from "@/data/pricing";
import { MobileDrawer } from "./mobile-drawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-xs border-b border-navy/10 py-3"
            : "bg-ivory/80 backdrop-blur-sm border-b border-navy/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Foundation Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-navy text-ivory flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-navy-light transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-navy">
                PillowDreamWorks
              </span>
              <span className="text-[10px] uppercase tracking-widest text-navy/60 font-sans font-medium">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {MAIN_NAVIGATION.map((item) => {
              if (item.children) {
                const isOpen = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 text-navy/85 hover:text-navy py-2 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 w-64 bg-ivory rounded-xl shadow-xl border border-navy/10 p-3 mt-1 space-y-1 animate-in fade-in-50 duration-150">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block p-2.5 rounded-lg hover:bg-cream transition-colors group"
                          >
                            <div className="text-sm font-medium text-navy group-hover:text-navy-light">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="text-xs text-navy/55 line-clamp-1 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-navy/85 hover:text-navy py-2 transition-colors hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/books/psychology-toolkit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/20 hover:bg-gold/30 text-navy font-semibold text-xs border border-gold/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Diwali 30% Off</span>
            </Link>

            <Link
              href="/books"
              className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-navy text-ivory text-xs font-medium hover:bg-navy-light shadow-xs transition-colors"
            >
              Explore Books
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-navy/5 cursor-pointer"
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
