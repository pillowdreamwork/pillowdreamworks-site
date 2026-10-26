"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { BOOKS, BUNDLE_PRICING, formatPrice } from "@/data/books";
import { PurchaseControl } from "./PurchaseControl";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";

interface BundleRevealProps {
  onReturn: () => void;
  onSelectBook?: (id: string) => void;
}

export const BundleReveal = ({ onReturn, onSelectBook }: BundleRevealProps) => {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  const first = BOOKS.find((b) => b.id === "finding-the-centre") ?? BOOKS[0];
  const second = BOOKS.find((b) => b.id === "psychology-toolkit") ?? BOOKS[1];

  const handleExplore = (id: string) => {
    if (onSelectBook) {
      onSelectBook(id);
    } else {
      document.getElementById(`world-${id}`)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="The complete library collection"
      className="border-t border-stone-300 bg-[#FAF8F5] py-28 md:py-36 relative overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#C6A46A]/15 text-[#8F7034] font-mono text-xs uppercase tracking-[0.25em] font-semibold mb-4">
          The Complete Library Bundle
        </span>

        <h2 className="font-serif text-4xl text-stone-900 md:text-6xl leading-tight">
          Two Complementary Works. One Unified Foundation.
        </h2>

        <p className="mx-auto mt-6 max-w-xl font-serif text-lg text-stone-600 leading-relaxed">
          {BUNDLE_PRICING.summary} Explore both works side-by-side or acquire the complete digital set.
        </p>

        {/* ── SQUARE MARKUPS WITH HORIZONTAL SCROLL & ANIMATION (Slightly separated) ── */}
        <div className="mt-14 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 overflow-x-auto pb-6 px-4">
            {/* Book 1 Square Markup */}
            <motion.div
              whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleExplore(first.id)}
              className="group relative flex flex-col items-center justify-between w-full max-w-[320px] aspect-square rounded-3xl bg-white p-6 shadow-lg border border-stone-200/90 hover:border-[#C6A46A]/60 hover:shadow-xl transition-all cursor-pointer text-left"
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C6A46A] font-semibold">
                  01 · Therapeutic Art
                </span>
                <span className="text-stone-400 group-hover:text-[#24483B] transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              <div className="my-auto flex items-center justify-center h-44 w-auto">
                <img
                  src={first.cover}
                  alt={`${first.title} square cover presentation`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-full pt-3 border-t border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  {first.title}
                </h3>
                <p className="font-serif text-xs italic text-stone-500 mt-0.5 truncate">
                  {first.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Book 2 Square Markup */}
            <motion.div
              whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleExplore(second.id)}
              className="group relative flex flex-col items-center justify-between w-full max-w-[320px] aspect-square rounded-3xl bg-white p-6 shadow-lg border border-stone-200/90 hover:border-[#C6A46A]/60 hover:shadow-xl transition-all cursor-pointer text-left"
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C6A46A] font-semibold">
                  02 · Applied Psychology
                </span>
                <span className="text-stone-400 group-hover:text-[#24483B] transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              <div className="my-auto flex items-center justify-center h-44 w-auto">
                <img
                  src={second.cover}
                  alt={`${second.title} square cover presentation`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-full pt-3 border-t border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  {second.title}
                </h3>
                <p className="font-serif text-xs italic text-stone-500 mt-0.5 truncate">
                  {second.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BUNDLE SPECIFICATION & INCLUSIONS ── */}
        <div className="mx-auto mt-12 max-w-md rounded-2xl bg-[#F7F4EE] p-6 border border-stone-300/80 text-left">
          <p className="font-mono text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
            What is Included
          </p>
          <ul className="space-y-2.5">
            {BUNDLE_PRICING.includes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 font-serif text-stone-800 text-sm sm:text-base">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6A46A] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bundle Price */}
        <div className="mt-10">
          <span className="block font-mono text-xs uppercase tracking-[0.25em] text-stone-500 mb-1">
            Complete Digital Collection
          </span>
          <p className="font-serif text-4xl sm:text-5xl text-stone-900 font-medium">
            {formatPrice(BUNDLE_PRICING.bundlePriceINR, BUNDLE_PRICING.bundlePriceUSD)}
          </p>
        </div>

        {/* Purchase Button */}
        <div className="mt-8 flex flex-col items-center">
          <PurchaseControl
            label="Purchase Complete Collection"
            checkoutUrl={BUNDLE_PRICING.checkoutUrl}
            onReturn={onReturn}
            variant="solid"
          />
        </div>

        {/* Explore Individual Books Navigation */}
        <nav aria-label="Explore individual books" className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => handleExplore(first.id)}
            className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-[#24483B] transition-colors underline underline-offset-4 cursor-pointer"
          >
            <span>Explore {first.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleExplore(second.id)}
            className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-[#24483B] transition-colors underline underline-offset-4 cursor-pointer"
          >
            <span>Explore {second.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </section>
  );
};
