"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Sparkles } from "lucide-react";

export function StudioCTASection() {
  const [copied, setCopied] = useState(false);
  const email = "hello@lusion.co";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[24px] bg-zinc-950 text-white p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl border border-zinc-800">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FFFF]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FFFF] uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // INITIATE COLLABORATION</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.98]">
              LET&apos;S CREATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                SOMETHING
              </span> <br />
              <span className="text-[#00FFFF]">UNFORGETTABLE.</span>
            </h2>

            <p className="mt-8 text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Have a bold vision for a real-time 3D web experience, brand launch, or interactive campaign? We are currently booking select projects for Q3/Q4 2026.
            </p>

            {/* Action Bar */}
            <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Direct Mailto Button */}
              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20—%20Lusion%20Studio`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-tight hover:bg-[#00FFFF] transition-all duration-300 shadow-[0_8px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Start a Project Inquiry</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>

              {/* Copy Email Quick Pill */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/15 transition-all cursor-pointer"
                title="Click to copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00FFFF]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : email}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
