"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";

const NOISE_FRAGMENTS = [
  { label: "unexamined expectations", tag: "NOISE" },
  { label: "catastrophic projections", tag: "NOISE" },
  { label: "contradictory advice", tag: "NOISE" },
  { label: "reactive burnout", tag: "NOISE" },
  { label: "somatic tension", tag: "NOISE" },
  { label: "unclear boundaries", tag: "NOISE" },
  { label: "algorithmic saturation", tag: "NOISE" },
  { label: "habitual paralysis", tag: "NOISE" },
];

const ARCHITECTURE_STEPS = [
  {
    step: "01",
    title: "UNDERSTAND",
    concept: "Deconstruct the Pattern",
    description: "Identify the underlying cognitive distortions, autonomic nervous system responses, and subconscious scripts driving daily behavior.",
  },
  {
    step: "02",
    title: "REFLECT",
    concept: "Create Quiet Space",
    description: "Engage in guided psychometric self-inquiry and structured journaling to separate objective reality from internal catastrophic narratives.",
  },
  {
    step: "03",
    title: "PRACTICE",
    concept: "Neuromuscular Action",
    description: "Apply targeted daily exercises, boundary protocols, and behavioral experiments that build durable psychological resilience.",
  },
];

const marginNotes = [
  {
    number: "01",
    observation: "Too much advice, too little structure.",
    expansion:
      "Most self-help saturates you with information without giving you a system to apply it. When real anxiety arrives, inspiration dissolves.",
  },
  {
    number: "02",
    observation: "Too many inputs, too little space to reflect.",
    expansion:
      "Constant information from algorithms, podcasts and well-meaning people crowds out the conditions needed to actually think.",
  },
  {
    number: "03",
    observation: "Too much terminology, too little translation.",
    expansion:
      "Clinical language that remains unexplained creates barriers rather than bridges to self-understanding.",
  },
  {
    number: "04",
    observation: "Too many disconnected tools, no continuous thread.",
    expansion:
      "An app here, a worksheet there, a YouTube video somewhere else — without architecture, fragments don't become insight.",
  },
];

export function ProblemSection() {
  return (
    <section
      className="py-24 md:py-32 bg-cream/40 border-b border-navy/8 relative overflow-hidden"
      aria-label="The Noise to Architecture Continuum"
    >
      <Container>
        {/* Eyebrow + Section Headline */}
        <div className="max-w-2xl mb-16">
          <motion.span
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-dark mb-4 font-mono"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            THE NOISE · PSYCHOLOGICAL ARCHITECTURE
          </motion.span>

          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-navy font-normal leading-[1.15] tracking-tight"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
          >
            From fragmented noise to inner structure.
          </motion.h2>
          <p className="mt-4 text-base text-navy/70 font-sans leading-relaxed">
            Modern psychology is often trapped between disconnected digital noise and overwhelming clinical textbooks. We replace the chaos with a clear three-stage continuum.
          </p>
        </div>

        {/* ── INTERACTIVE CONTINUUM SCENE: NOISE TO STRUCTURE ── */}
        <div className="my-12 p-8 sm:p-12 rounded-2xl bg-ivory border border-navy/12 space-y-12">
          {/* Phase A: The Scattered Fragments */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy/40 block">
              1. The Scattered Inputs (Everyday Experience)
            </span>
            <div className="flex flex-wrap gap-2.5">
              {NOISE_FRAGMENTS.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="px-3.5 py-1.5 rounded-full bg-cream/70 border border-navy/10 text-xs font-mono text-navy/70 inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-800/40" />
                  <span>{item.label}</span>
                </motion.span>
              ))}
            </div>
          </div>

          {/* Transition Connecting Line */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-navy/20" />
            </div>
            <span className="relative bg-ivory px-4 text-xs font-mono text-sage-dark uppercase tracking-widest">
              Synthesized through deliberate architecture ↓
            </span>
          </div>

          {/* Phase B: The 3 Structured Pillars (UNDERSTAND → REFLECT → PRACTICE) */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold block mb-6">
              2. The Three-Stage Continuum
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ARCHITECTURE_STEPS.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                  className="p-6 rounded-xl bg-cream/50 border border-navy/10 space-y-3 relative hover:border-navy/25 transition-all"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-navy/50">
                    <span className="text-gold-dark font-bold">[{step.step}]</span>
                    <span className="uppercase tracking-widest text-[10px] font-semibold text-navy/60">{step.concept}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Margin Notes — four editorial observations */}
        <div className="border-t border-navy/12 pt-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-navy/40 block mb-6">
            The Margin Notes
          </span>
          {marginNotes.map((note, idx) => (
            <motion.div
              key={note.number}
              className="grid grid-cols-12 gap-6 sm:gap-8 py-8 sm:py-10 border-b border-navy/8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: idx * 0.08,
              }}
            >
              {/* Number */}
              <div className="col-span-1">
                <span className="text-[11px] font-mono text-navy/30 block pt-1">
                  {note.number}
                </span>
              </div>

              {/* Observation + Expansion */}
              <div className="col-span-11 sm:col-span-6">
                <p className="font-serif text-xl sm:text-2xl text-navy font-normal leading-snug mb-3">
                  {note.observation}
                </p>
              </div>

              <div className="col-span-11 sm:col-span-5 col-start-2 sm:col-start-auto">
                <p className="text-sm text-navy/65 font-sans leading-relaxed">
                  {note.expansion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition statement into Books */}
        <motion.div
          className="mt-16 max-w-[48ch]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-serif text-xl sm:text-2xl text-navy font-normal leading-relaxed italic">
            What if the experience had architecture?
          </p>
          <p className="mt-3 text-sm text-navy/60 font-sans leading-relaxed">
            A structured system for understanding yourself — progressively, clearly and at your own pace.
          </p>
        </motion.div>

      </Container>
    </section>
  );
}
