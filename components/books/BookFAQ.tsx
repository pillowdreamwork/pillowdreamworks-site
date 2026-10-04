"use client";

import React, { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface BookFAQProps {
  book: Book;
}

export const BookFAQ = ({ book }: BookFAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const baseId = useId();

  if (book.faqs.length === 0) return null;

  return (
    <section aria-label={`${book.title}: questions`} className="border-t border-stone-300 bg-[#faf8f5] py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">{book.title}</p>
          <h2 className="font-serif text-5xl text-stone-900 md:text-6xl">Questions</h2>
        </motion.div>

        <div className="border-t border-stone-300">
          {book.faqs.map((faq, index) => {
            const open = activeIndex === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;

            return (
              <div key={faq.question} className="border-b border-stone-200">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(open ? null : index)}
                    className="group grid min-h-14 w-full cursor-pointer grid-cols-[2.5rem_1fr_3rem] items-center gap-4 border-0 bg-transparent py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900 md:grid-cols-[3rem_1fr_3rem] md:gap-6"
                  >
                    <span className="font-serif text-sm text-stone-500 transition-colors group-hover:text-stone-900">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-xl text-stone-800 transition-colors group-hover:text-stone-900 md:text-2xl">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center justify-self-end text-stone-600"
                    >
                      <motion.span
                        animate={{ rotate: open && !reducedMotion ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-serif text-3xl leading-none"
                      >
                        {open && reducedMotion ? "−" : "+"}
                      </motion.span>
                    </span>
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",
                  }}
                  transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="max-w-3xl pb-8 pl-[3.5rem] pr-12 font-serif text-lg leading-relaxed text-stone-600 md:pl-[4.5rem]">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
