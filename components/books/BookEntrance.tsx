"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookObject } from "./BookObject";
import { BOOKS } from "@/data/books";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";


interface BookEntranceProps {
  selectedBookId: string | null;
  onSelection: (id: string) => void;
}

export const BookEntrance = ({ selectedBookId, onSelection }: BookEntranceProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="library-heading"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#faf8f5] px-6 py-24 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.3 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <p className="mb-4 font-serif text-sm uppercase tracking-[0.3em] text-stone-500">
          PillowDreamWorks Foundation
        </p>
        <h1 id="library-heading" className="font-serif text-5xl leading-tight text-stone-900 md:text-7xl">
          The Shelf
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic text-stone-500">
          Two works. One library.
        </p>
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:items-end md:gap-24">
        {BOOKS.map((book) => (
          <BookObject
            key={book.id}
            book={book}
            selected={selectedBookId === book.id}
            receded={selectedBookId !== null && selectedBookId !== book.id}
            onSelect={onSelection}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.8, duration: reducedMotion ? 0.2 : 0.8 }}
        className="mt-14 flex flex-col items-center gap-5"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-mono">
          {selectedBookId ? "Selected Work · Continue Scrolling" : "Choose a book"}
        </span>

        {/* 2 Interactive Buttons for each book */}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          {BOOKS.map((book) => {
            const isSelected = selectedBookId === book.id;
            return (
              <LiquidGlassButton
                key={book.id}
                onClick={() => onSelection(book.id)}
                variant={isSelected ? "primary" : "secondary"}
                showArrow={true}
                size="md"
                className={`font-serif text-sm tracking-wide transition-all ${
                  isSelected ? "ring-2 ring-[#C6A46A] ring-offset-2 ring-offset-[#FAF8F5]" : ""
                }`}
              >
                <span>{book.title}</span>
              </LiquidGlassButton>
            );
          })}
        </div>

        <div className="h-10 w-px bg-stone-400/60 mt-1" />
      </motion.div>
    </section>
  );
};
