"use client";

import React, { useState } from "react";
import { Compass, Sparkles, Cpu, Code2, ArrowRight } from "lucide-react";

export function StudioApproachSection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "01",
      title: "Art Direction",
      tagline: "Emotional clarity through restrained typography and cinematic pacing.",
      description:
        "Every project begins with a bespoke aesthetic manifesto. We strip away decorative clutter to let confident typography, generous whitespace, and purposeful contrast command attention.",
      icon: Compass,
      metric: "PIXEL PERFECTION",
    },
    {
      id: "02",
      title: "Real-Time 3D",
      tagline: "Interactive WebGL, custom GLSL shaders, and procedural physics.",
      description:
        "We build living mathematical surfaces that respond to human touch, scroll momentum, and spatial coordinates. Real-time 3D transforms passive viewers into active participants.",
      icon: Sparkles,
      metric: "60 FPS GUARANTEE",
    },
    {
      id: "03",
      title: "Motion Craft",
      tagline: "Natural physics, organic dampening, and seamless kinetic transitions.",
      description:
        "Motion is our narrative language. Every scroll trigger, hover reaction, and state change is choregraphed with spring-physics curves rather than mechanical linear easing.",
      icon: Cpu,
      metric: "SPRING PHYSICS DYNAMICS",
    },
    {
      id: "04",
      title: "Creative Engineering",
      tagline: "WebGPU, Next.js architecture, zero-latency micro-interactions.",
      description:
        "We engineer high-performance web systems that load instantaneously, support extreme visual fidelity across all devices, and scale gracefully without compromise.",
      icon: Code2,
      metric: "SUB-SECOND LOAD",
    },
  ];

  return (
    <section id="approach" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
            <span>03 // STUDIO PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black uppercase leading-[1.02]">
            DESIGN × MOTION <br />
            <span className="text-zinc-400">3D × CODE</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
            We don’t separate art from engineering. We believe the most compelling digital experiences occur at the exact intersection of visionary aesthetics and flawless code execution.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pillar Selector List */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {pillars.map((pillar, index) => {
              const isSelected = activePillar === index;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(index)}
                  className={`p-6 md:p-8 rounded-[16px] border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white border-zinc-900 shadow-xl"
                      : "bg-zinc-50 hover:bg-zinc-100 text-black border-zinc-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono ${isSelected ? "text-[#00FFFF]" : "text-zinc-400"}`}>
                        [{pillar.id}]
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-[#00FFFF]" : "text-zinc-400"}`} />
                  </div>

                  <p className={`mt-3 text-sm leading-relaxed ${isSelected ? "text-zinc-300" : "text-zinc-600"}`}>
                    {pillar.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Active Pillar Focus Panel */}
          <div className="lg:col-span-6 sticky top-28 rounded-[20px] bg-zinc-950 text-white p-8 md:p-12 border border-[#2B2E3A]/50 shadow-2xl flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00FFFF]">
                  PILLAR [{pillars[activePillar].id}] — {pillars[activePillar].title.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300">
                  {pillars[activePillar].metric}
                </span>
              </div>

              <h4 className="mt-8 text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                &ldquo;{pillars[activePillar].tagline}&rdquo;
              </h4>

              <p className="mt-6 text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                {pillars[activePillar].description}
              </p>
            </div>

            {/* Bottom Visual Benchmark Badge */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-ping" />
                <span>ACTIVE PIPELINE SPECIFICATION</span>
              </div>
              <span className="text-zinc-500">LUSION CORE SYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
