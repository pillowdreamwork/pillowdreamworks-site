"use client";

import * as React from "react";
import Link from "next/link";
<<<<<<< HEAD
import { usePathname } from "next/navigation";
import { X, PhoneCall } from "lucide-react";
=======
import { X, ChevronDown, Sparkles } from "lucide-react";
import { MAIN_NAVIGATION, FOUNDER_CONTACT } from "@/data/navigation";
import { CAMPAIGN_METADATA } from "@/data/pricing";
>>>>>>> 30c7539 (Clean lint warnings and finalize production build)

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/", description: "The entrance to the library & core manifesto" },
    { label: "Books", href: "/books", description: "Finding The Centre & The Psychology Toolkit" },
    { label: "Assessments", href: "/assessments", description: "177 Standardized Clinical Scales Archive" },
    { label: "Services", href: "/services", description: "Counselling, Crisis Protocol & Graphotherapy" },
    { label: "Learn", href: "/learn", description: "The Journal, PsychSnaps & clinical essays" },
    { label: "About", href: "/about", description: "Behind the Library & founding philosophy" },
    { label: "Contact", href: "/contact", description: "Correspondence & direct inquiries" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#FDFBF7] text-[#0F2038] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#0F2038]/10">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#0F2038] text-[#FDFBF7] flex items-center justify-center font-serif text-xs font-bold">
              Ψ
            </span>
            <span className="font-serif font-bold text-[#0F2038]">PillowDreamWorks</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#0F2038]/5 text-[#0F2038]"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-6 flex flex-col gap-2">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#0F2038] text-[#FDFBF7]"
                    : "hover:bg-[#F5EFE6] text-[#0F2038]"
                }`}
              >
                <div className="font-serif text-lg font-medium">{item.label}</div>
                <div className={`text-xs mt-0.5 ${isActive ? "text-[#FDFBF7]/70" : "text-[#0F2038]/60"}`}>
                  {item.description}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer / Crisis Hotline */}
        <div className="pt-6 border-t border-[#0F2038]/10 flex flex-col gap-3">
          <a
            href="tel:988"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8B2626]/10 text-[#8B2626] font-mono text-xs border border-[#8B2626]/20 font-bold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Crisis Support: Call 988 / 14416</span>
          </a>
          <p className="text-center text-[11px] font-mono text-[#0F2038]/40">
            PillowDreamWorks Foundation • Edition 2026
          </p>
        </div>
      </div>
    </div>
  );
}
