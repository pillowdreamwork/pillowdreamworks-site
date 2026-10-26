"use client";

import * as React from "react";

import { ArrowRight, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

const FEATURED_ESSAY = {
  tag: "LEAD ESSAY · VOL. 04",
  title: "The Anxiety Paradox: Why Fighting Panic Intensifies the Loop",
  excerpt: "Understanding the neurochemical feedback loop of the sympathetic nervous system. When you fight physiological alarm, the amygdala interprets resistance as proof of immediate danger. Passive somatic surrender remains the only true de-escalation mechanism.",
  readTime: "6 min read",
  author: "Manish Garg",
  date: "Autumn Editorial",
};

const DISPATCHES = [
  {
    code: "SNAP-01",
    tag: "Founder Notes",
    title: "Solitude vs. Isolation: The Architecture of Inner Poise",
    excerpt: "Deliberate, quiet self-inquiry generates cognitive stamina, whereas reactive digital hyper-connectedness exhausts the nervous system.",
    unfoldInsight: "When isolated, you feel rejected by the world. When solitary, you have returned to yourself. The practice is scheduling 30 minutes of intentional device-free reflection daily.",
    readTime: "4 min read",
  },
  {
    code: "SNAP-02",
    tag: "Cognitive Science",
    title: "The 5 Invisible Distortions Governing High-Stakes Decisions",
    excerpt: "Catastrophic forecasting and implicit 'should' statements quietly distort perception of baseline reality in leadership.",
    unfoldInsight: "Replace 'This will ruin everything' with 'This is an unexpected variable requiring standard triage.' Separate objective data from emotional urgency.",
    readTime: "5 min read",
  },
  {
    code: "SNAP-03",
    tag: "Behavioral Design",
    title: "Why Willpower Fails: Building Systems Over Will",
    excerpt: "How structural environment cues consistently defeat conscious motivation, and why friction reduction creates lasting habit loops.",
    unfoldInsight: "Motivation is an emotion with a short half-life. Design your physical desk and digital environment so the desired action has zero friction.",
    readTime: "5 min read",
  },
];

export function LearnPreviewSection() {
  const [unfoldedSnap, setUnfoldedSnap] = React.useState<string | null>(null);

  const toggleSnap = (code: string) => {
    setUnfoldedSnap((prev) => (prev === code ? null : code));
  };

  return (
    <section
      id="reading-room"
      className="py-24 sm:py-32 bg-[#F5EFE6]/60 border-b border-[#24483B]/10 relative scroll-mt-16"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono block mb-4 font-semibold">
              The Folio & PsychSnaps
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202923] leading-tight">
              The Reading Room
            </h2>
            <p className="mt-4 text-base text-[#202923]/75 font-sans leading-relaxed">
              Jargon-free psychological essays, somatic field notes, and cognitive blueprints curated for deliberate thinkers.
            </p>
          </div>

          <LiquidGlassButton
            href="/learn"
            variant="secondary"
            size="md"
          >
            <span>Browse Complete Folio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </LiquidGlassButton>
        </div>

        {/* Publication Split: Left = Lead Essay Folio, Right = Dispatch Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Featured Lead Essay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 bg-[#FDFBF7] p-8 sm:p-12 rounded-2xl border border-[#24483B]/12 space-y-6 flex flex-col justify-between hover:border-[#24483B]/25 transition-all shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#24483B]/10 text-xs text-[#202923]/60 font-mono">
                <span className="text-[#24483B] uppercase tracking-widest font-semibold">{FEATURED_ESSAY.tag}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#24483B]" /> {FEATURED_ESSAY.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#202923] font-normal leading-snug">
                {FEATURED_ESSAY.title}
              </h3>

              <p className="text-base text-[#202923]/75 leading-relaxed font-sans">
                {FEATURED_ESSAY.excerpt}
              </p>

              <blockquote className="pl-4 border-l-2 border-[#C6A46A] text-sm italic text-[#202923]/80 font-serif">
                "The mind cannot be bullied into tranquility. Peace is not an exertion of force; it is the cessation of unnecessary battle."
              </blockquote>
            </div>

            <div className="pt-8 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
              <span className="text-xs text-[#202923]/50 font-mono">By {FEATURED_ESSAY.author} · {FEATURED_ESSAY.date}</span>
              <LiquidGlassButton
                href="/learn"
                variant="secondary"
                size="sm"
                showArrow
              >
                Read Full Essay
              </LiquidGlassButton>
            </div>
          </motion.div>

          {/* Right Column: Dispatch Ledger Stack with Unfold Interaction */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#202923]/50 block mb-2 font-semibold">
              Psychology in Motion (Click to inspect)
            </span>
            {DISPATCHES.map((item, index) => {
              const isOpen = unfoldedSnap === item.code;
              return (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                  className="p-6 rounded-xl bg-[#FDFBF7] border border-[#24483B]/10 hover:border-[#24483B]/25 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#202923]/50 mb-2">
                    <span className="text-[#24483B] font-semibold">[{item.code}] · {item.tag}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#202923] group-hover:text-[#24483B] transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans mb-3">
                    {item.excerpt}
                  </p>

                  <LiquidGlassButton
                    onClick={() => toggleSnap(item.code)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#24483B] hover:text-[#1A3529] transition-colors cursor-pointer py-1 font-medium"
                  >
                    <span>{isOpen ? "Close Insight" : "Unfold Practical Insight"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </LiquidGlassButton>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3.5 rounded-lg bg-[#F5EFE6] border-l-2 border-[#C6A46A] text-xs font-sans text-[#202923]/85 leading-relaxed">
                          <strong className="block font-mono text-[10px] uppercase text-[#202923]/60 mb-1">
                            Somatic & Behavioral Directive:
                          </strong>
                          {item.unfoldInsight}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
