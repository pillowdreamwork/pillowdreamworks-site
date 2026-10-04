"use client";

import React from "react";
import { motion } from "motion/react";

interface StoryTextProps {
  label: string;
  title: string;
  text?: string;
  meta?: string;
  reducedMotion: boolean;
  /** Slower, quieter rhythm (Finding The Centre). */
  slow?: boolean;
}

export const StoryText = ({ label, title, text, meta, reducedMotion, slow = false }: StoryTextProps) => {
  const duration = reducedMotion ? 0.15 : slow ? 1.4 : 0.7;
  return (
    <motion.article
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: slow ? 14 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{label}</p>

      <h3 className="mt-5 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">{title}</h3>

      <div className="mt-8 h-px w-16 bg-stone-300" />

      {text && <p className="mt-8 font-serif text-xl leading-relaxed text-stone-600">{text}</p>}
      {meta && <p className="mt-4 font-serif text-sm tracking-[0.15em] uppercase text-stone-500">{meta}</p>}
    </motion.article>
  );
};
