"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { BOOKS_PRICING } from "@/data/pricing";

const CHAPTER_DETAILS = [
  {
    num: "01",
    title: "Understanding Yourself",
    tools: "Self-concept audit, Core values matrix, Behavioral baseline tracker",
  },
  {
    num: "02",
    title: "Thoughts & Mindset",
    tools: "Cognitive distortion filter, ABCDE reframing protocol, Belief deconstruction",
  },
  {
    num: "03",
    title: "Anxiety & Stress",
    tools: "Autonomic nervous system mapping, Somatic grounding drills, Worry postponement",
  },
  {
    num: "04",
    title: "Relationships & Boundaries",
    tools: "Boundary scripts, Attachment inventory, Non-defensive communication formula",
  },
  {
    num: "05",
    title: "Habits & Personal Growth",
    tools: "Friction-reduction blueprint, Relapse prevention plans, Identity-based rituals",
  },
];

const slides = [
  {
    id: "toolkit",
    label: "The Psychology Toolkit",
    eyebrow: "Flagship Publication · 80-page A4 PDF",
    description:
      "A structured clinical workbook across five master chapters — designed for self-inquiry, cognitive restructuring, and daily psychological poise.",
    priceInr: BOOKS_PRICING.toolkit.diwali.formattedInr,
    priceUsd: BOOKS_PRICING.toolkit.diwali.formattedUsd,
    priceNote: "Diwali festival edition price",
    href: "/books/psychology-toolkit",
    cta: "Acquire master workbook",
    bgClass: "bg-cream/60",
    textClass: "text-navy",
  },
  {
    id: "finding-the-centre",
    label: "Finding The Centre",
    eyebrow: "Philosophical · Reflective Volume",
    description:
      "A contemplative volume for emotional stillness, grounded self-reflection, and inner alignment in an accelerating world.",
    priceLines: [
      { format: "eBook (Instant Download)", price: BOOKS_PRICING.findingTheCentre.ebook.formattedInr },
      { format: "Collector's Print Edition", price: BOOKS_PRICING.findingTheCentre.print.formattedInr },
    ],
    href: "/books/finding-the-centre",
    cta: "View editions & format details",
    bgClass: "bg-navy",
    textClass: "text-ivory",
  },
];

export function BooksPreviewSection() {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [activeChapter, setActiveChapter] = React.useState(0);
  const slideCount = slides.length;

  const go = React.useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + slideCount) % slideCount);
    },
    [slideCount],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const slide = slides[current];
  const isNavy = slide.bgClass === "bg-navy";

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 30 : -30,
    }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -30 : 30,
    }),
  };

  return (
    <section
      className="py-24 md:py-32 bg-ivory border-b border-navy/8 relative"
      aria-label="Publications showcase"
    >
      <Container>
        {/* Header with Title and Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-[48ch]">
            <motion.span
              className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-dark mb-3 font-mono"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Shelf · Foundation Publications
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-navy font-normal leading-tight tracking-tight"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
            >
              Two complementary works.
            </motion.h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/books"
              className="text-xs uppercase tracking-wider font-semibold text-navy/70 hover:text-navy flex items-center gap-1.5 transition-colors mr-2"
            >
              <span>View All Publications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Shelf Slider Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy hover:bg-navy/5 transition-colors cursor-pointer"
                aria-label="Previous publication"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy hover:bg-navy/5 transition-colors cursor-pointer"
                aria-label="Next publication"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Shelf Display Frame */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Publications Shelf"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`${slide.bgClass} p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border border-navy/10 rounded-2xl`}
            >
              {/* Left Column: Publication Physical Spine / Specimen */}
              <div className="lg:col-span-6 space-y-6">
                <div
                  className={`border rounded-xl p-7 sm:p-8 ${
                    isNavy ? "border-ivory/15 bg-navy-light/40" : "border-navy/12 bg-ivory"
                  }`}
                >
                  <span
                    className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-3 ${
                      isNavy ? "text-gold" : "text-sage-dark font-semibold"
                    }`}
                  >
                    {slide.eyebrow}
                  </span>
                  <h3
                    className={`font-serif text-2xl sm:text-3xl font-normal leading-tight mb-6 ${
                      isNavy ? "text-ivory" : "text-navy"
                    }`}
                  >
                    {slide.label}
                  </h3>

                  {/* Interactive Chapter Spine — Toolkit only */}
                  {slide.id === "toolkit" ? (
                    <div className="space-y-3 pt-4 border-t border-navy/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-navy/50 block">
                        Interactive Chapter Spine (Click to inspect)
                      </span>
                      <div className="space-y-1.5">
                        {CHAPTER_DETAILS.map((ch, idx) => {
                          const isSelected = activeChapter === idx;
                          return (
                            <button
                              key={ch.num}
                              onClick={() => setActiveChapter(idx)}
                              className={`w-full text-left p-2.5 rounded-md text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-navy text-ivory font-semibold shadow-xs"
                                  : "hover:bg-cream text-navy/70"
                              }`}
                            >
                              <span>{ch.num} {ch.title}</span>
                              <span className={`text-[10px] ${isSelected ? "text-gold" : "text-navy/40"}`}>
                                Ch. {ch.num}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Chapter Exercise Preview Drawer */}
                      <div className="p-3.5 rounded-lg bg-cream/70 border border-navy/10 text-xs font-sans text-navy/80 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sage-dark block font-semibold">
                          Exercises & Protocols inside Ch. {CHAPTER_DETAILS[activeChapter].num}:
                        </span>
                        <p className="leading-relaxed">
                          {CHAPTER_DETAILS[activeChapter].tools}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-4 border-t border-ivory/15 text-xs text-ivory/70 font-sans leading-relaxed">
                      <p className="italic">
                        "There is always another way to look at where you are."
                      </p>
                      <p>
                        Structured in 12 poetic movements examining identity, digital silence, cognitive equilibrium, and emotional restoration.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Description + Transparent Pricing + Acquisition Button */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <h4
                    className={`font-serif text-xl sm:text-2xl font-normal leading-snug ${
                      isNavy ? "text-ivory" : "text-navy"
                    }`}
                  >
                    Publication Description
                  </h4>
                  <p
                    className={`text-base leading-relaxed font-sans ${
                      isNavy ? "text-ivory/75" : "text-navy/75"
                    }`}
                  >
                    {slide.description}
                  </p>
                </div>

                {/* Price Display */}
                <div>
                  {"priceInr" in slide && (
                    <div className={`pt-6 border-t ${isNavy ? "border-ivory/10" : "border-navy/10"}`}>
                      {slide.priceNote && (
                        <span className={`block text-xs font-mono mb-1 ${isNavy ? "text-gold" : "text-sage-dark font-semibold"}`}>
                          {slide.priceNote}
                        </span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className={`font-serif text-3xl font-normal ${isNavy ? "text-ivory" : "text-navy"}`}>
                          {slide.priceInr}
                        </span>
                        {slide.priceUsd && (
                          <span className={`text-sm font-sans ${isNavy ? "text-ivory/50" : "text-navy/50"}`}>
                            ({slide.priceUsd})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {"priceLines" in slide && slide.priceLines && (
                    <div className={`pt-6 border-t space-y-2.5 ${isNavy ? "border-ivory/10" : "border-navy/10"}`}>
                      {slide.priceLines.map((line) => (
                        <div key={line.format} className="flex items-center justify-between text-sm">
                          <span className={isNavy ? "text-ivory/70 font-sans" : "text-navy/70 font-sans"}>
                            {line.format}
                          </span>
                          <span className={`font-serif text-lg font-medium ${isNavy ? "text-gold" : "text-navy"}`}>
                            {line.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-8">
                    <Link
                      href={slide.href}
                      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs group ${
                        isNavy
                          ? "bg-gold hover:bg-gold-light text-navy"
                          : "bg-navy hover:bg-navy-light text-ivory"
                      }`}
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
