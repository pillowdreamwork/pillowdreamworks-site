"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FOUNDER_CONTACT } from "@/data/navigation";

export function FounderSection() {
  return (
    <section className="py-24 sm:py-32 bg-ivory border-b border-navy/10 relative">
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
            <div className="w-full max-w-sm rounded-xl bg-navy text-ivory p-8 sm:p-10 border border-navy/40 shadow-xl space-y-6 text-center relative overflow-hidden">
              {/* Subtle gold top rule */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

              {/* Monogram Seal */}
              <div className="w-20 h-20 mx-auto rounded-full bg-ivory/10 border border-gold/40 text-gold flex items-center justify-center font-serif text-3xl font-medium tracking-tight">
                MG
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-normal text-ivory">
                  {FOUNDER_CONTACT.name}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-mono">
                  {FOUNDER_CONTACT.title}
                </p>
              </div>

              <p className="text-xs text-ivory/70 italic leading-relaxed font-serif px-2">
                "PillowDreamWorks exists to bridge the gulf between inaccessible clinical literature and the lived, quiet struggles of everyday human life."
              </p>

              <div className="pt-6 border-t border-ivory/10 flex justify-center items-center gap-4 text-xs font-mono">
                <a
                  href={FOUNDER_CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/90 hover:text-gold flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span className="text-ivory/20">/</span>
                <a
                  href={FOUNDER_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/90 hover:text-gold flex items-center gap-1 transition-colors"
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
            <span className="text-xs uppercase tracking-[0.25em] text-sage-dark font-mono block">
              The Founder's Colophon
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-normal leading-tight">
              Why PillowDreamWorks was established
            </h2>

            <div className="space-y-4 text-base text-navy/75 leading-relaxed font-sans">
              <p>
                Contemporary self-help frequently fractures into two extremes: dense academic papers inaccessible to non-practitioners, or generic pop-psychology affirmations that fail when real emotional crisis strikes.
              </p>
              <p>
                PillowDreamWorks was founded to build an enduring third path: rigorous behavioral science, clinical clarity, and practical psychological architecture, crafted with the editorial permanence of a classical press.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-cream/60 border-l-2 border-gold text-navy font-serif italic text-base sm:text-lg leading-relaxed">
              "To provide thoughtful minds with the architecture to understand their subconscious patterns, regulate their nervous systems, and build authentic resilience."
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button variant="primary" className="text-xs uppercase tracking-wider">
                  Read Foundation Story
                </Button>
              </Link>
              <a href={`mailto:${FOUNDER_CONTACT.email}`}>
                <Button variant="outline" className="text-xs uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Inquiry</span>
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
