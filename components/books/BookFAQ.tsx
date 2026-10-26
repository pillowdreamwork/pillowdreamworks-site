"use client";

import React, { useId, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Book, BookFaq } from "@/data/books";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BookFAQProps {
  book: Book;
}

interface FaqItemRowProps {
  faq: BookFaq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
  baseId: string;
}

function FaqItemRow({ faq, index, isOpen, onToggle, reducedMotion, baseId }: FaqItemRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  const buttonId = `${baseId}-q-${index}`;
  const panelId = `${baseId}-a-${index}`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsHovered(true);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setMagnetOffset({
      x: (x - centerX) * 0.04,
      y: (y - centerY) * 0.08,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setMagnetOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={rowRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full border-b border-stone-200 transition-colors duration-200 ${
        isHovered ? "bg-[#24483B]/[0.035]" : "bg-transparent"
      }`}
    >
      {/* Light glow following cursor within question row */}
      {isHovered && !reducedMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 overflow-hidden"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(198, 164, 106, 0.12), transparent 70%)`,
          }}
        />
      )}

      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          style={{
            transform: !reducedMotion && isHovered
              ? `translate3d(${magnetOffset.x.toFixed(1)}px, ${magnetOffset.y.toFixed(1)}px, 0)`
              : undefined,
            transition: "transform 200ms ease-out",
          }}
          className="group relative z-10 w-full cursor-pointer py-6 px-4 md:px-6 flex items-center justify-between gap-6 text-left border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24483B] focus-visible:ring-offset-2"
        >
          {/* Straight line horizontal layout: Number + Question in flow */}
          <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
            <span className="font-mono text-xs md:text-sm font-semibold text-[#C6A46A] shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-serif text-lg md:text-2xl transition-colors duration-200 leading-snug ${
                isHovered || isOpen ? "text-[#1A3529] font-medium" : "text-[#202923]"
              }`}
            >
              {faq.question}
            </span>
          </div>

          {/* Magnetic action button with light & rotating arrow / plus */}
          <div
            aria-hidden="true"
            className={`relative flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? "bg-[#24483B] text-white shadow-md"
                : isHovered
                  ? "bg-[#24483B] text-white shadow-sm scale-105"
                  : "bg-white text-stone-700 border border-stone-300"
            }`}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : isHovered ? 45 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Plus className="w-5 h-5 transition-transform duration-300" />
            </motion.div>
          </div>
        </button>
      </h3>

      {/* Answer disclosure panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-8 pt-2 pl-12 md:pl-16 max-w-4xl">
              <p className="font-serif text-base md:text-lg leading-relaxed text-stone-700">
                {faq.answer}
              </p>
              {faq.link && (
                <div className="mt-4">
                  <Link
                    href={faq.link.href}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#24483B] hover:text-[#C6A46A] transition-colors underline underline-offset-4"
                  >
                    <span>{faq.link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const BookFAQ = ({ book }: BookFAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const baseId = useId();

  if (book.faqs.length === 0) return null;

  return (
    <section aria-label={`${book.title}: questions`} className="border-t border-stone-300 bg-[#faf8f5] py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-serif text-4xl text-stone-900 md:text-6xl leading-tight">
            Common Inquiries &amp; Guidance
          </h2>
          <p className="mt-4 font-serif text-lg text-stone-600 max-w-2xl leading-relaxed">
            Essential clarity on format, methodology, therapeutic context, and how to make the most of {book.title}.
          </p>
        </motion.div>

        {/* Straight Line Flow Accordion */}
        <div className="border-t border-stone-300 shadow-xs rounded-2xl bg-white/60 backdrop-blur-sm overflow-hidden border border-stone-200/80">
          {book.faqs.map((faq, index) => (
            <FaqItemRow
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
              reducedMotion={reducedMotion}
              baseId={baseId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
