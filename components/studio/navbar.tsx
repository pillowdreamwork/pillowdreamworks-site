"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

interface StudioNavbarProps {
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onOpenReel: () => void;
}

export function StudioNavbar({ isAudioActive, onToggleAudio, onOpenReel }: StudioNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/85 backdrop-blur-xl border-b border-zinc-900/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Studio Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-black"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black group-hover:bg-[#00FFFF] transition-colors duration-300" />
            <span className="font-sans font-extrabold tracking-tight">LUSION</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded-md ml-1">
              STUDIO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
            <a
              href="#work"
              className="hover:text-black transition-colors duration-200 relative group py-1"
            >
              <span>Featured Work</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#approach"
              className="hover:text-black transition-colors duration-200 relative group py-1"
            >
              <span>Approach</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#labs"
              className="hover:text-black transition-colors duration-200 relative group py-1 flex items-center gap-1"
            >
              <span>Labs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333]" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>

            <button
              onClick={onOpenReel}
              className="hover:text-black transition-colors duration-200 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 border border-zinc-300/80 hover:border-zinc-900 px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-ping" />
              <span>Play Reel</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {/* Audio Soundscape Toggle Button */}
            <button
              onClick={onToggleAudio}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono transition-all cursor-pointer border border-zinc-200"
              title="Toggle interactive audio waves"
            >
              {isAudioActive ? (
                <>
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#00FFFF] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#00FFFF] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#00FFFF] animate-pulse delay-150" />
                  </span>
                  <span className="font-semibold text-[#008888]">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-500">SOUND: OFF</span>
                </>
              )}
            </button>

            {/* Primary Action Paper Pill CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-[#1A1D26] text-white text-xs md:text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_6px_10px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00FFFF]" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full md:hidden bg-zinc-100 text-zinc-900 hover:bg-zinc-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white/95 backdrop-blur-2xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12 animate-fadeIn">
          <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-black">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00FFFF] transition-colors"
            >
              Featured Work
            </a>
            <a
              href="#approach"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00FFFF] transition-colors"
            >
              Studio Approach
            </a>
            <a
              href="#labs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00FFFF] transition-colors flex items-center gap-2"
            >
              <span>Labs &amp; R&amp;D</span>
              <span className="w-2 h-2 rounded-full bg-[#FF3333]" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReel();
              }}
              className="text-left text-xl text-zinc-600 hover:text-black"
            >
              Play Showreel 2026
            </button>
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-zinc-200">
            <button
              onClick={onToggleAudio}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 text-sm font-mono"
            >
              <span>Interactive Ambient Sound</span>
              <span>{isAudioActive ? "AUDIO ON" : "MUTED"}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-4 rounded-full bg-black text-white font-bold"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </>
  );
}
