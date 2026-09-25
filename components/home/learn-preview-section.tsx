"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";

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
    <section className="py-24 sm:py-32 bg-cream/40 border-b border-navy/10 relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-sage-dark font-mono block mb-4">
              The Folio & PsychSnaps
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy leading-tight">
              The Reading Room
            </h2>
            <p className="mt-4 text-base text-navy/70 font-sans leading-relaxed">
              Jargon-free psychological essays, somatic field notes, and cognitive blueprints curated for deliberate thinkers.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-navy hover:text-sage-dark transition-colors font-semibold group shrink-0"
          >
            <span>Browse Complete Folio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Publication Split: Left = Lead Essay Folio, Right = Dispatch Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Featured Lead Essay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 bg-ivory p-8 sm:p-12 rounded-xl border border-navy/12 space-y-6 flex flex-col justify-between hover:border-navy/25 transition-all shadow-xs"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-navy/10 text-xs text-navy/60 font-mono">
                <span className="text-sage-dark uppercase tracking-widest font-semibold">{FEATURED_ESSAY.tag}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {FEATURED_ESSAY.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-navy font-normal leading-snug">
                {FEATURED_ESSAY.title}
              </h3>

              <p className="text-base text-navy/75 leading-relaxed font-sans">
                {FEATURED_ESSAY.excerpt}
              </p>

              <blockquote className="pl-4 border-l-2 border-sage text-sm italic text-navy/80 font-serif">
                "The mind cannot be bullied into tranquility. Peace is not an exertion of force; it is the cessation of unnecessary battle."
              </blockquote>
            </div>

            <div className="pt-8 mt-6 border-t border-navy/10 flex items-center justify-between">
              <span className="text-xs text-navy/50 font-mono">By {FEATURED_ESSAY.author} · {FEATURED_ESSAY.date}</span>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy hover:text-navy-light group transition-colors"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dispatch Ledger Stack with Unfold Interaction */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy/40 block mb-2">
              Psychology in Motion (Click to unfold insight)
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
                  className="p-6 rounded-lg bg-ivory border border-navy/10 hover:border-navy/25 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-navy/50 mb-2">
                    <span className="text-sage-dark font-semibold">[{item.code}] · {item.tag}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-navy group-hover:text-navy-light transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-navy/70 leading-relaxed font-sans mb-3">
                    {item.excerpt}
                  </p>

                  <button
                    onClick={() => toggleSnap(item.code)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-sage-dark hover:text-navy transition-colors cursor-pointer py-1"
                  >
                    <span>{isOpen ? "Close Insight" : "Unfold Practical Insight"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3.5 rounded-md bg-cream/70 border-l-2 border-gold text-xs font-sans text-navy/85 leading-relaxed">
                          <strong className="block font-mono text-[10px] uppercase text-navy/50 mb-1">
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
