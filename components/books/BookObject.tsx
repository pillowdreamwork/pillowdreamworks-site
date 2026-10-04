/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface BookObjectProps {
  book: Book;
  selected: boolean;
  /** True when another book has been chosen and this one should recede. */
  receded: boolean;
  onSelect: (id: string) => void;
}

export const BookObject = ({ book, selected, receded, onSelect }: BookObjectProps) => {
  const reducedMotion = useReducedMotion();

  const state = reducedMotion
    ? { opacity: receded ? 0.6 : 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 }
    : selected
      ? { opacity: 1, y: -24, scale: 1.06, rotateY: -4, rotateX: 1 }
      : receded
        ? { opacity: 0.55, y: 0, scale: 0.95, rotateY: -10, rotateX: 3 }
        : { opacity: 1, y: 0, scale: 1, rotateY: -8, rotateX: 2 };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(book.id)}
      aria-label={`Open ${book.title}`}
      className="relative flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-stone-900"
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={state}
      whileHover={reducedMotion ? undefined : { y: selected ? -28 : -6 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1400 }}
    >
      <img
        src={book.cover}
        alt={book.title}
        className="block h-[20rem] w-auto object-contain shadow-[0_18px_28px_-20px_rgba(40,30,20,0.5)] sm:h-[24rem] md:h-[30rem]"
      />

      <span className="mt-6 block max-w-[16rem] text-center">
        <span className="block font-serif text-xl text-stone-900 md:text-2xl">{book.title}</span>
        <span className="mt-1 block font-serif text-sm italic text-stone-500">{book.subtitle}</span>
      </span>
    </motion.button>
  );
};
