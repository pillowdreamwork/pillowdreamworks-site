/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface BookOpeningProps {
  book: Book;
}

export const BookOpening = ({ book }: BookOpeningProps) => {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const coverY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, -70]);
  const coverScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.96, 1.04]);
  // Fully visible at progress 0, so the opening never starts on an empty frame.
  const coverOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, reducedMotion ? 1 : 0]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], reducedMotion ? [1, 1, 1] : [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], reducedMotion ? [0, 0] : [40, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[180vh] bg-[#faf8f5]" aria-label={`${book.title}: opening`}>
      <div className="sticky top-10 flex h-[calc(100svh-2.5rem)] items-center justify-center">
        <motion.div style={{ y: coverY, scale: coverScale, opacity: coverOpacity }} className="relative">
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            loading="eager"
            decoding="async"
            className="h-[60svh] w-auto object-contain md:h-[70svh]"
          />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 py-20 text-center md:px-8">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <h2 className="mb-6 font-serif text-5xl text-stone-900 md:text-7xl">{book.title}</h2>
          <p className="mx-auto max-w-2xl font-serif text-xl italic text-stone-500">{book.subtitle}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-stone-500">{book.author}</p>
        </motion.div>
      </div>
    </section>
  );
};
