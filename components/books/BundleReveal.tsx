"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { BOOKS, BUNDLE_PRICING, formatPrice } from "@/data/books";
import { PurchaseControl } from "./PurchaseControl";

interface BundleRevealProps {
  onReturn: () => void;
}

export const BundleReveal = ({ onReturn }: BundleRevealProps) => {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  // Two covers converge on a shared shelf line as the section scrolls into place.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-90, -6]);
  const rightX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [90, 6]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-4, -1]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [4, 1]);

  const first = BOOKS.find((b) => b.id === "finding-the-centre") ?? BOOKS[0];
  const second = BOOKS.find((b) => b.id === "psychology-toolkit") ?? BOOKS[1];

  const goTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(`world-${id}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const linkClass =
    "inline-flex min-h-12 items-center font-serif text-sm uppercase tracking-[0.18em] text-stone-700 underline underline-offset-4 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900";

  return (
    <section ref={sectionRef} aria-label="The complete library" className="border-t border-stone-300 bg-[#faf8f5] py-32">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-500">The complete library</p>

        <div className="flex items-end justify-center gap-0 md:gap-2">
          <motion.img
            src={first.cover}
            alt={`${first.title} cover`}
            loading="lazy"
            decoding="async"
            style={{ x: leftX, rotate: leftRotate, transformOrigin: "bottom right" }}
            className="h-[16rem] w-auto object-contain shadow-[0_18px_28px_-20px_rgba(40,30,20,0.5)] md:h-[26rem]"
          />
          <motion.img
            src={second.cover}
            alt={`${second.title} cover`}
            loading="lazy"
            decoding="async"
            style={{ x: rightX, rotate: rightRotate, transformOrigin: "bottom left" }}
            className="h-[16rem] w-auto object-contain shadow-[0_18px_28px_-20px_rgba(40,30,20,0.5)] md:h-[26rem]"
          />
        </div>

        <div className="mx-auto mt-4 h-px w-full max-w-xl bg-stone-400" aria-hidden="true" />

        <h2 className="mt-16 font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
          {first.title}
          <span className="my-3 block font-serif text-2xl italic text-stone-500 md:text-3xl">+</span>
          {second.title}
        </h2>

        <p className="mx-auto mt-8 max-w-md font-serif text-lg text-stone-600">{BUNDLE_PRICING.summary}</p>

        <ul className="mx-auto mt-10 max-w-sm border-t border-stone-300 text-left">
          {BUNDLE_PRICING.includes.map((item) => (
            <li key={item} className="border-b border-stone-200 py-3 font-serif text-stone-700">
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-12 font-serif text-4xl text-stone-900 md:text-5xl">
          {formatPrice(BUNDLE_PRICING.bundlePriceINR, BUNDLE_PRICING.bundlePriceUSD)}
        </p>

        <div className="mt-8 flex flex-col items-center">
          <PurchaseControl
            label="Purchase Collection"
            checkoutUrl={BUNDLE_PRICING.checkoutUrl}
            onReturn={onReturn}
            variant="solid"
          />
        </div>

        <nav aria-label="Explore the individual books" className="mt-12 flex flex-col items-center gap-1 md:flex-row md:justify-center md:gap-10">
          <a href={`#world-${first.id}`} onClick={goTo(first.id)} className={linkClass}>
            Explore {first.title}
          </a>
          <a href={`#world-${second.id}`} onClick={goTo(second.id)} className={linkClass}>
            Explore {second.title}
          </a>
        </nav>
      </div>
    </section>
  );
};
