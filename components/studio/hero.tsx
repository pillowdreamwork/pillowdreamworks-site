"use client";

import React from "react";
import { Play, ArrowDown, Sparkles } from "lucide-react";
import { Canvas3DHero } from "./canvas-3d-hero";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface HeroProps {
  onOpenReel: () => void;
  isAudioActive: boolean;
}

export function StudioHero({ onOpenReel, isAudioActive }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 bg-white text-black overflow-hidden">
      {/* 3D Interactive WebGL/Canvas Matrix */}
      <Canvas3DHero isPlayingAudio={isAudioActive} />

      {/* Top Tag & Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-100/90 border border-zinc-200 backdrop-blur-md text-xs font-mono text-zinc-700">
          <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
          <span className="uppercase tracking-wider">CREATIVE TECHNOLOGY &amp; REAL-TIME 3D</span>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span>LONDON // TOKYO // NEW YORK</span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-700 font-semibold">AVAILABLE Q3/Q4 2026</span>
        </div>
      </div>

      {/* Main Confident Hero Headline */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 md:py-16">
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-black tracking-tighter text-black leading-[0.96] uppercase select-none">
            WE SHAPE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-600">
              EXPERIENCES
            </span> <br />
            IN <span className="inline-flex items-center text-black">3D</span> &amp; THE <br className="hidden sm:inline" />
            <span className="relative inline-block text-black">
              INTERACTIVE WEB
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#00FFFF] via-cyan-300 to-transparent" />
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-2xl font-normal leading-relaxed tracking-tight">
            We are a creative studio merging real-time graphics, generative physics, and uncompromising art direction to craft unforgettable digital worlds.
          </p>
        </div>

        {/* CTA & Showreel Interaction Bar */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Primary Play Reel Button */}
          <button
            onClick={onOpenReel}
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white text-sm font-semibold tracking-tight shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#00FFFF] group-hover:text-black text-white flex items-center justify-center transition-colors">
              <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest">Play Showreel 2026</span>
          </button>

          {/* Liquid Glass Interactive Button */}
          <LiquidButton
            size="lg"
            className="border border-zinc-300/80 hover:border-black text-black font-semibold shadow-sm"
            onClick={() => {
              const el = document.getElementById("work");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00FFFF]" />
              <span>Explore Selected Work</span>
            </span>
          </LiquidButton>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-zinc-200/80 pt-6">
        <a
          href="#work"
          className="group flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 hover:text-black transition-colors"
        >
          <span className="w-8 h-8 rounded-full border border-zinc-200 group-hover:border-black flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-black" />
          </span>
          <span className="uppercase">SCROLL TO EXPLORE SELECTED WORK</span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-zinc-400">
          <span>[ 01 / 05 ]</span>
          <span>THREE.JS • GLSL • WEBGL</span>
        </div>
      </div>
    </section>
  );
}
