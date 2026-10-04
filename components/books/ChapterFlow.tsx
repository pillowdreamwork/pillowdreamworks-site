/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";

interface ChapterFlowProps {
  book: Book;
}

export const ChapterFlow = ({ book }: ChapterFlowProps) => {
  const reducedMotion = useReducedMotion();
  const { chapters } = book;

  return (
    <section aria-label={`${book.title}: chapters`} className="bg-[#faf8f5] py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9 }}
          className="mb-20"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Contents</p>
          <h2 className="font-serif text-5xl text-stone-900 md:text-6xl">Chapters</h2>
        </motion.div>

        <div>
          {chapters.map((chapter) => (
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
              className="grid grid-cols-1 gap-6 border-t border-stone-300 py-16 lg:grid-cols-[180px_1fr] lg:gap-12 lg:py-20"
            >
              <div>
                <span className="font-serif text-sm tracking-[0.3em] text-stone-500">{chapter.label}</span>
                {chapter.pages && <p className="mt-2 text-xs text-stone-500">Pages {chapter.pages}</p>}
              </div>

              <div>
                <h3 className="font-serif text-3xl text-stone-900 md:text-4xl">{chapter.title}</h3>
                {chapter.subtitle && (
                  <p className="mt-3 font-serif text-lg italic text-stone-500">{chapter.subtitle}</p>
                )}

                {chapter.image && (
                  <img
                    src={chapter.image}
                    alt={chapter.imageAlt ?? `${chapter.title}, page from ${book.title}`}
                    loading="lazy"
                    decoding="async"
                    className="mt-10 h-auto w-full max-w-md object-contain"
                  />
                )}

                {chapter.samplePages && chapter.samplePages.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 gap-8 border-t border-stone-200 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                    {chapter.samplePages.map((page) => (
                      <figure key={page.src}>
                        <img
                          src={page.src}
                          alt={`${chapter.title}: ${page.caption}, page from ${book.title}`}
                          loading="lazy"
                          decoding="async"
                          className="mx-auto h-auto max-h-[70svh] w-auto max-w-full object-contain"
                        />
                        <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
                          {page.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {chapter.keyContents && chapter.keyContents.length > 0 && (
                  <div className="mt-10 max-w-xl">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-stone-500">In this chapter</h4>
                    <ul className="mt-4 border-t border-stone-200">
                      {chapter.keyContents.map((content) => (
                        <li key={content} className="border-b border-stone-200 py-3 font-serif text-stone-700">
                          {content}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
