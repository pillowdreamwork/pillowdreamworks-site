/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface BookDetailsProps {
  book: Book;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" } as const,
    transition: { duration: reducedMotion ? 0.2 : 0.9 },
  };

  return (
    <section aria-label={`${book.title}: about`} className="border-t border-stone-300 bg-[#faf8f5] py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Colophon */}
        <motion.div {...reveal} className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto max-h-[34rem] w-auto max-w-full object-contain lg:mx-0"
          />

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">About this book</p>
            <h2 className="font-serif text-5xl leading-tight text-stone-900 md:text-6xl">{book.title}</h2>
            <p className="mt-4 font-serif text-xl italic text-stone-600">{book.subtitle}</p>
            <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-stone-700">{book.description}</p>

            <dl className="mt-12 max-w-xl">
              {book.facts.map((fact) => (
                <div key={fact.label} className="border-t border-stone-300 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.25em] text-stone-500">{fact.label}</dt>
                  <dd className="mt-2 font-serif text-xl text-stone-900">{fact.value}</dd>
                </div>
              ))}
              <div className="border-t border-stone-300" />
            </dl>
          </div>
        </motion.div>

        {/* Selected pages: real assets, alternating editorial sequence */}
        {book.detailsImages.length > 0 && (
          <div className="mt-32">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Selected pages</p>
            <div>
              {book.detailsImages.map((item, index) => {
                const flip = index % 2 === 1;
                return (
                  <motion.figure
                    key={item.src}
                    {...reveal}
                    className="grid grid-cols-1 items-center gap-8 border-t border-stone-300 py-16 lg:grid-cols-2 lg:gap-20"
                  >
                    <div className={flip ? "lg:order-2" : ""}>
                      <img
                        src={item.src}
                        alt={item.title === "Selected page" ? `Selected page ${index + 1} of ${book.detailsImages.length} from ${book.title}` : `${item.title}, page from ${book.title}`}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto h-auto max-h-[80svh] w-auto max-w-full object-contain"
                      />
                    </div>
                    <figcaption className={flip ? "lg:order-1" : ""}>
                      <p className="text-xs tracking-[0.3em] text-stone-500">
                        {String(index + 1).padStart(2, "0")} / {String(book.detailsImages.length).padStart(2, "0")}
                      </p>
                      <p className="mt-4 font-serif text-3xl text-stone-900 md:text-4xl">{item.title}</p>
                    </figcaption>
                  </motion.figure>
                );
              })}
              <div className="border-t border-stone-300" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
