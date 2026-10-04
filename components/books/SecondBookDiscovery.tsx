/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface SecondBookDiscoveryProps {
  currentBook: Book;
  nextBook: Book;
}

export const SecondBookDiscovery = ({ currentBook, nextBook }: SecondBookDiscoveryProps) => {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const r = <T,>(full: T[], still: T[]) => (reducedMotion ? still : full);

  const currentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.4, 0]);
  const currentScale = useTransform(scrollYProgress, [0, 0.5, 1], r([1, 0.88, 0.78], [1, 1, 1]));
  const currentX = useTransform(scrollYProgress, [0, 1], r([0, -120], [0, 0]));

  const nextOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const nextScale = useTransform(scrollYProgress, [0, 0.5, 1], r([0.85, 0.95, 1], [1, 1, 1]));
  const nextY = useTransform(scrollYProgress, [0, 1], r([80, 0], [0, 0]));

  return (
    <section ref={sectionRef} className="relative min-h-[180vh] bg-[#faf8f5]" aria-label="Another work in the library">
      <div className="sticky top-10 flex h-[calc(100svh-2.5rem)] items-center justify-center">
        <motion.div style={{ opacity: currentOpacity, scale: currentScale, x: currentX }} className="absolute">
          <img src={currentBook.cover} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-[22rem] w-auto object-contain md:h-[28rem]" />
        </motion.div>

        <motion.div style={{ opacity: nextOpacity, scale: nextScale, y: nextY }} className="absolute">
          <img src={nextBook.cover} alt={`${nextBook.title} cover`} loading="lazy" decoding="async" className="h-[24rem] w-auto object-contain md:h-[30rem]" />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 py-20 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 1 }}
          className="mx-auto max-w-2xl"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-500">Another work in the library</p>
          <h2 className="mb-6 font-serif text-4xl text-stone-900 md:text-6xl">{nextBook.title}</h2>
          <p className="font-serif text-xl italic text-stone-500">{nextBook.subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};
