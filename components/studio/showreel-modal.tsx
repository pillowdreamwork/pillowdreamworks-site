"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  const chapters = [
    { title: "Real-time 3D & WebGL", client: "Nike Kinetic", duration: "0:14" },
    { title: "Spatial Interaction Design", client: "Sony Audio", duration: "0:28" },
    { title: "Procedural Fashion Worlds", client: "Balenciaga", duration: "0:42" },
    { title: "Raytraced Physics Engine", client: "Porsche Studio", duration: "1:00" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Simulate video playback progress
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentChapter((c) => (c + 1) % chapters.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, chapters.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn p-4 md:p-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FFFF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Reel Container */}
      <div className="relative w-full max-w-5xl bg-[#090A0F] border border-white/10 rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/70 font-mono">
              Lusion Reel 2026 // {chapters[currentChapter].client}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#00FFFF]" />}
              <span>{isMuted ? "MUTED" : "AUDIO ON"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#00FFFF] transition-colors cursor-pointer"
              aria-label="Close Showreel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Presentation Area */}
        <div className="relative aspect-video w-full bg-[#050608] flex items-center justify-center overflow-hidden group">
          {/* Animated 3D Grid backdrop simulating real-time rendering */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#00FFFF_1px,transparent_1px)] [background-size:24px_24px] animate-[pulse_4s_ease-in-out_infinite]" />

          {/* Dynamic Scene Visual based on Chapter */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHAPTER 0{currentChapter + 1} — {chapters[currentChapter].title.toUpperCase()}</span>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
              {chapters[currentChapter].client}
            </h3>
            <p className="mt-3 text-sm text-zinc-400 font-mono">
              Real-time WebGL Shader System • 60fps Dynamic Tessellation
            </p>
          </div>

          {/* Central Play/Pause overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 cursor-pointer shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 translate-x-0.5" />}
          </button>
        </div>

        {/* Bottom Timeline & Chapter Selector */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex flex-col gap-3">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FFFF] to-cyan-400 transition-all duration-100 ease-linear rounded-full shadow-[0_0_10px_#00FFFF]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex gap-4">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.client}
                  onClick={() => {
                    setCurrentChapter(idx);
                    setProgress(0);
                  }}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    currentChapter === idx ? "text-[#00FFFF] font-semibold" : "text-zinc-500"
                  }`}
                >
                  0{idx + 1}. {ch.client}
                </button>
              ))}
            </div>
            <div>0{currentChapter + 1} / 0{chapters.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
