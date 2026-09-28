"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Eye, Layers } from "lucide-react";

type ProjectCategory = "all" | "web" | "design" | "development" | "3d" | "animation" | "ar" | "concept";

interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  categories: ProjectCategory[];
  description: string;
  gradient: string;
  stats: string;
  featured?: boolean;
}

export function FeaturedWorkSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "All Works", value: "all" },
    { label: "Web", value: "web" },
    { label: "Design", value: "design" },
    { label: "Development", value: "development" },
    { label: "3D Visuals", value: "3d" },
    { label: "Animation", value: "animation" },
    { label: "AR Spatial", value: "ar" },
    { label: "Concept & R&D", value: "concept" },
  ];

  const projects: Project[] = [
    {
      id: "nike-kinetic",
      title: "Nike Kinetic World",
      client: "Nike Global Innovation",
      year: "2026",
      categories: ["3d", "web", "animation", "development"],
      description: "A real-time WebGL interactive shoe deconstruction experience powered by GPU compute shaders and particle cloth physics.",
      gradient: "from-zinc-950 via-[#12141D] to-zinc-900",
      stats: "60 FPS • 120k Particles • WebGPU",
      featured: true,
    },
    {
      id: "porsche-taycan",
      title: "Taycan Pure Velocity",
      client: "Porsche AG",
      year: "2026",
      categories: ["3d", "web", "development"],
      description: "Photorealistic 3D configurator with ray-traced lighting models and real-time aerodynamics simulation in the browser.",
      gradient: "from-[#0F141C] via-[#16202E] to-zinc-950",
      stats: "Sub-second 3D Asset Stream",
      featured: true,
    },
    {
      id: "apple-spatial",
      title: "Spatial Sound Realm",
      client: "Apple Spatial Audio",
      year: "2025",
      categories: ["ar", "concept", "3d"],
      description: "Interactive binaural soundscape exploration with volumetric 3D acoustics and fluid dynamic field visualizers.",
      gradient: "from-black via-[#0D1821] to-[#142838]",
      stats: "Spatial Audio Engine • WebXR",
    },
    {
      id: "balenciaga-meta",
      title: "Procedural Runway 09",
      client: "Balenciaga Paris",
      year: "2025",
      categories: ["3d", "animation", "design"],
      description: "Generative digital fashion show where clothing geometry dynamically mutates based on biometric and sonic inputs.",
      gradient: "from-zinc-950 via-[#181820] to-black",
      stats: "Procedural Geometry Mesh",
    },
    {
      id: "sony-spatial-flow",
      title: "Flow State Interface",
      client: "Sony Creative Lab",
      year: "2025",
      categories: ["web", "development", "animation", "design"],
      description: "Fluid micro-interaction design system and generative liquid interface exploring zero-latency web ergonomics.",
      gradient: "from-[#111319] via-[#0E1F29] to-black",
      stats: "Liquid Physics Shader",
    },
    {
      id: "moncler-arctic",
      title: "Arctic Dimension AR",
      client: "Moncler Genius",
      year: "2025",
      categories: ["ar", "concept", "web"],
      description: "Augmented reality glacial installation and interactive weather simulation created for global flagship activations.",
      gradient: "from-[#0B1520] via-[#102434] to-zinc-950",
      stats: "Volumetric Ice Particle Mesh",
    },
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
              <span>02 // PORTFOLIO ARCHIVE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black uppercase leading-[1.02]">
              FEATURED <br />
              <span className="text-zinc-400">STANDOUT WORK</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-zinc-600 max-w-md font-normal leading-relaxed">
            We partner with visionary brands to conceive, design, and engineer category-defining interactive experiences and real-time 3D environments.
          </p>
        </div>

        {/* Category Filters Pill Bar */}
        <div className="py-8 flex flex-wrap items-center gap-2 md:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black border border-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-[18px] bg-zinc-950 text-white overflow-hidden border border-[#2B2E3A]/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                project.featured && index === 0 ? "md:col-span-2 min-h-[460px] md:min-h-[520px]" : "min-h-[420px]"
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Background Ambient Visual Surface */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}
              />

              {/* Grid / Shader Lines subtle overlay */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00FFFF_1px,transparent_1px)] [background-size:28px_28px]" />

              {/* Top Meta Bar */}
              <div className="relative z-10 p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" />
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                    {project.client}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">{project.year}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#00FFFF] group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Center Abstract 3D Canvas / Geometry Icon Representation */}
              <div className="relative z-10 flex-1 flex items-center justify-center p-6">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full bg-[#00FFFF]/5 blur-xl group-hover:bg-[#00FFFF]/15 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                    <Layers className="w-8 h-8 text-[#00FFFF] group-hover:rotate-12 transition-transform duration-500" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      {project.stats}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Content Bar */}
              <div className="relative z-10 p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.categories.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-wider text-zinc-300 border border-white/10"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#00FFFF] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs md:text-sm text-zinc-400 max-w-xl font-normal line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Quick View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0F1117] border border-white/15 rounded-[20px] p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {selectedProject.client} • {selectedProject.year}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="py-6">
              <h3 className="text-3xl font-bold tracking-tight text-white">
                {selectedProject.title}
              </h3>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">TECHNOLOGY STACK</span>
                <span className="text-xs font-mono text-[#00FFFF]">{selectedProject.stats}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase font-bold hover:bg-[#00FFFF] transition-colors cursor-pointer"
              >
                Launch Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
