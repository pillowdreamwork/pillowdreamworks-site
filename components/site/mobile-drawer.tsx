"use client";

import * as React from "react";
import Link from "next/link";
import { X, ChevronDown, Sparkles, BookOpen, Compass, HeartHandshake, GraduationCap } from "lucide-react";
import { MAIN_NAVIGATION, FOUNDER_CONTACT } from "@/data/navigation";
import { CAMPAIGN_METADATA } from "@/data/pricing";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>("Books");

  // Prevent background scrolling when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-ivory shadow-2xl z-50 flex flex-col justify-between border-l border-navy/15 overflow-y-auto">
        <div className="p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-navy/10">
            <div>
              <span className="font-serif text-lg font-bold text-navy">PillowDreamWorks</span>
              <p className="text-xs text-navy/60">Foundation v2.0</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg hover:bg-navy/5 text-navy cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Campaign Banner */}
          <div className="mt-4 p-3 rounded-lg bg-gold/20 border border-gold/40 text-navy text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-gold-dark mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{CAMPAIGN_METADATA.badge}</span>
            </div>
            <p className="text-navy/80">{CAMPAIGN_METADATA.messaging}</p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {MAIN_NAVIGATION.map((item) => {
              if (item.children) {
                const isExpanded = expandedSection === item.label;
                return (
                  <div key={item.label} className="border-b border-navy/5 py-2">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between py-2 text-base font-medium text-navy text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-navy/50 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-3 mt-1 space-y-2 border-l-2 border-sage/40">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="block py-1.5 text-sm text-navy/80 hover:text-navy"
                          >
                            <span className="font-medium text-navy">{child.label}</span>
                            {child.description && (
                              <p className="text-xs text-navy/50">{child.description}</p>
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
                  onClick={onClose}
                  className="block py-3 text-base font-medium text-navy hover:text-sage-dark border-b border-navy/5"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contact / Emergency */}
        <div className="p-6 bg-cream border-t border-navy/10 space-y-3">
          <Link
            href="/services#crisis"
            onClick={onClose}
            className="block text-center py-2.5 px-4 rounded-md bg-[#8B2626] text-ivory text-sm font-semibold hover:bg-red-800"
          >
            Emergency & Crisis Access
          </Link>
          <div className="text-center text-xs text-navy/60">
            <p>Direct founder email: {FOUNDER_CONTACT.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
