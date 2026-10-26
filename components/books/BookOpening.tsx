/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';interface BookOpeningProps {
  book: Book;
}

export const BookOpening = ({ book }: BookOpeningProps) => {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, reducedMotion ? 1 : 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -20]);

  const coverY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [15, -30]);
  const coverScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.98, 1.02]);
  const coverOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, reducedMotion ? 1 : 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[170vh] bg-[#faf8f5]" aria-label={`${book.title}: opening`}>
      <div className="sticky top-12 flex h-[calc(100svh-3rem)] flex-col items-center justify-center px-6 text-center">
        {/* Title above image */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="mb-4 max-w-3xl shrink-0"
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#C6A46A]">
            PillowDreamWorks Foundation
          </p>
          <h2 className="font-serif text-4xl text-stone-900 md:text-6xl lg:text-7xl leading-tight">
            {book.title}
          </h2>
          <p className="mt-2 font-serif text-lg md:text-xl italic text-stone-600 max-w-xl mx-auto">
            {book.subtitle}
          </p>
        </motion.div>

        {/* Front page image below the title while scrolling */}
        <motion.div
          style={{ y: coverY, scale: coverScale, opacity: coverOpacity }}
          className="relative flex items-center justify-center max-h-[50svh] md:max-h-[58svh] w-auto my-2"
        >
          <img
            src={book.cover}
            alt={`${book.title} front page cover`}
            loading="eager"
            decoding="async"
            className="h-full max-h-[50svh] md:max-h-[58svh] w-auto object-contain rounded-lg shadow-xl border border-stone-200/60"
          />
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity }}
          className="mt-3 shrink-0"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            {book.author}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
