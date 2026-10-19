"use client";

import * as React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { FOUNDER_CONTACT } from "@/data/navigation";

export function FounderSection() {
  return (
    <section
      id="founder"
      className="py-24 sm:py-32 bg-[#FDFBF7] border-b border-[#24483B]/10 relative scroll-mt-16"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Seal / Colophon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm rounded-2xl bg-[#24483B] text-[#FDFBF7] p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6 text-center relative overflow-hidden">
              {/* Subtle gold top rule */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6A46A]" />

              {/* Monogram Seal */}
              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-[#C6A46A]/50 text-[#C6A46A] flex items-center justify-center font-serif text-3xl font-medium tracking-tight">
                MG
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-normal text-[#FDFBF7]">
                  {FOUNDER_CONTACT.name}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A46A] font-mono font-semibold">
                  {FOUNDER_CONTACT.title}
                </p>
              </div>

              <p className="text-xs text-[#FDFBF7]/75 italic leading-relaxed font-serif px-2">
                "PillowDreamWorks exists to bridge the gulf between inaccessible clinical literature and the lived, quiet struggles of everyday human life."
              </p>

              <div className="pt-6 border-t border-white/10 flex justify-center items-center gap-4 text-xs font-mono">
                <a
                  href={FOUNDER_CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C6A46A] hover:text-[#FDFBF7] flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span className="text-white/20">/</span>
                <a
                  href={FOUNDER_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C6A46A] hover:text-[#FDFBF7] flex items-center gap-1 transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono block font-semibold">
              The Founder's Colophon
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202923] font-normal leading-tight">
              Why PillowDreamWorks was established
            </h2>

            <div className="space-y-4 text-base text-[#202923]/75 leading-relaxed font-sans">
              <p>
                Contemporary self-help frequently fractures into two extremes: dense academic papers inaccessible to non-practitioners, or generic pop-psychology affirmations that fail when real emotional crisis strikes.
              </p>
              <p>
                PillowDreamWorks was founded to build an enduring third path: rigorous behavioral science, clinical clarity, and practical psychological architecture, crafted with the editorial permanence of a classical press.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F5EFE6] border-l-4 border-[#C6A46A] text-[#202923] font-serif italic text-base sm:text-lg leading-relaxed">
              "To provide thoughtful minds with the architecture to understand their subconscious patterns, regulate their nervous systems, and build authentic resilience."
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <LiquidGlassButton href="/about" variant="primary" size="md">
                <span>Read Foundation Story</span>
              </LiquidGlassButton>
              <LiquidGlassButton href={`mailto:${FOUNDER_CONTACT.email}`} variant="subtle" size="md">
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Inquiry</span>
              </LiquidGlassButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
