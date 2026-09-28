"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Sparkles, Play, ArrowUpRight, Flame } from "lucide-react";

export function StudioLabsSection() {
  const [activeExperiment, setActiveExperiment] = useState(0);

  const experiments = [
    {
      title: "Raymarching SDF Volume 04",
      type: "GLSL Shader",
      status: "OPEN SOURCE",
      description: "Real-time signed distance field sphere distortion with subsurface scattering emulation.",
      params: "Triangles: 0 • Direct Pixel March • GLSL 3.0",
    },
    {
      title: "Quantum Spring Rigidity",
      type: "Verlet Physics",
      status: "EXPERIMENTAL",
      description: "High-density particle constraint solver executing at 120Hz on Web Workers.",
      params: "10,000 Nodes • Multi-threaded SIMD",
    },
    {
      title: "Neural Color Morphing",
      type: "WebGPU Compute",
      status: "R&D ALPHA",
      description: "Generative chromatic dispersion model responding to spatial audio frequency bins.",
      params: "WebGPU WGSL • 16-bit Float Precision",
    },
  ];

  return (
    <section id="labs" className="py-24 md:py-32 px-6 md:px-12 bg-[#090A0F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FFFF] uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 text-[#FF3333]" />
              <span>04 // LABS &amp; EXPERIMENTAL R&amp;D</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white leading-[1.02]">
              LUSION LABS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-cyan-300">
                PROTOTYPES
              </span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
            Our dedicated research division testing the bleeding edge of WebGPU, computational aesthetics, and real-time interactive physics.
          </p>
        </div>

        {/* Labs Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {experiments.map((exp, index) => (
            <div
              key={exp.title}
              onClick={() => setActiveExperiment(index)}
              className={`p-6 md:p-8 rounded-[18px] border transition-all duration-300 flex flex-col justify-between min-h-[340px] cursor-pointer group ${
                activeExperiment === index
                  ? "bg-zinc-900 border-[#00FFFF]/50 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                  : "bg-[#0E1017] hover:bg-zinc-900/80 border-white/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                    {exp.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    exp.status === "OPEN SOURCE" ? "text-[#00FFFF] border-[#00FFFF]/40 bg-[#00FFFF]/10" : "text-[#FF3333] border-[#FF3333]/40 bg-[#FF3333]/10"
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-white group-hover:text-[#00FFFF] transition-colors">
                  {exp.title}
                </h3>
                <p className="mt-3 text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">{exp.params}</span>
                <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#00FFFF] group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
