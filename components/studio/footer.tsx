"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Send } from "lucide-react";

export function StudioFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLondon, setTimeLondon] = useState("");
  const [timeTokyo, setTimeTokyo] = useState("");
  const [timeNY, setTimeNY] = useState("");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeLondon(
        now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setTimeTokyo(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
      setTimeNY(
        now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-white text-black border-t border-zinc-200 pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
          {/* Column 1: Brand & Live Clocks */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                <span className="w-2.5 h-2.5 rounded-full bg-black" />
                <span>LUSION</span>
              </div>
              <p className="mt-4 text-sm text-zinc-600 max-w-sm font-normal leading-relaxed">
                Creative production studio pioneering real-time 3D, generative graphics, and interactive digital storytelling.
              </p>
            </div>

            {/* Live Studio Clocks */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col gap-2 font-mono text-xs text-zinc-500">
              <div className="flex items-center justify-between">
                <span>LON (UTC+1)</span>
                <span className="text-black font-semibold">{timeLondon || "12:00:00"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>TYO (UTC+9)</span>
                <span className="text-black font-semibold">{timeTokyo || "20:00:00"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NYC (UTC-4)</span>
                <span className="text-black font-semibold">{timeNY || "07:00:00"}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Labs */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              NAVIGATION
            </span>
            <a href="#work" className="text-sm font-medium text-zinc-700 hover:text-black transition-colors">
              Featured Work
            </a>
            <a href="#approach" className="text-sm font-medium text-zinc-700 hover:text-black transition-colors">
              Our Approach
            </a>
            <a href="#labs" className="text-sm font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1.5">
              <span>Lusion Labs R&amp;D</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333]" />
            </a>
            <a href="#contact" className="text-sm font-medium text-zinc-700 hover:text-black transition-colors">
              Contact &amp; Inquiries
            </a>
          </div>

          {/* Column 3: Social Channels */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              SOCIALS
            </span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1"
            >
              <span>Twitter / X</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 block">
                NEWSLETTER &amp; DISPATCHES
              </span>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Receive quarterly releases on our GLSL shaders, 3D case studies, and WebGPU prototypes.
              </p>

              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[#F0F1FA] text-black placeholder:text-zinc-400 text-xs font-mono border border-zinc-200 focus:outline-none focus:border-[#00FFFF] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-[#00FFFF]" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-[11px] font-mono text-[#008888] animate-fadeIn">
                  ✓ Joined the dispatch registry.
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mt-8 text-xs font-mono text-zinc-500">
              <p>51.5074° N, 0.1278° W</p>
              <p>Studio 4B, London &amp; Remote Global</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 LUSION STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="text-zinc-400">DESIGN SYSTEM: LUSION.CO SPEC</span>
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
