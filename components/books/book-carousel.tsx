"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKS_PRICING } from "@/data/pricing";

const SLIDES = [
  {
    id: "toolkit",
    badge: "Flagship 80-Page Workbook",
    title: "The Psychology Toolkit",
    subtitle: "A structured journey through cognitive reframing, somatic grounding, and boundary mastery.",
    tag: "A4 Printable Master PDF",
    priceInr: BOOKS_PRICING.toolkit.diwali.formattedInr,
    priceUsd: BOOKS_PRICING.toolkit.diwali.formattedUsd,
    regularInr: BOOKS_PRICING.toolkit.regular.formattedInr,
    href: "/books/psychology-toolkit",
    buttonText: "Explore The Toolkit",
    theme: "cream",
  },
  {
    id: "finding-the-centre",
    badge: "Philosophical Volume",
    title: "Finding The Centre",
    subtitle: "A handbook for inner stillness, emotional equilibrium, and poise in an overstimulated world.",
    tag: "eBook & Collector's Print Edition",
    priceInr: BOOKS_PRICING.findingTheCentre.ebook.formattedInr,
    priceUsd: BOOKS_PRICING.findingTheCentre.ebook.formattedUsd,
    href: "/books/finding-the-centre",
    buttonText: "View Formats & Details",
    theme: "navy",
  },
  {
    id: "bundle",
    badge: "Complete Ecosystem Bundle",
    title: "The Master Psychology Bundle",
    subtitle: "The Psychology Toolkit + Finding The Centre eBook at 20% combined savings.",
    tag: "Digital Ecosystem Access",
    priceInr: BOOKS_PRICING.bundle.price.formattedInr,
    priceUsd: BOOKS_PRICING.bundle.price.formattedUsd,
    regularInr: BOOKS_PRICING.bundle.regularValue.formattedInr,
    href: "/books/bundles",
    buttonText: "Claim Bundle Savings",
    theme: "sage",
  },
];

export function BookCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = SLIDES[currentIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Books Carousel"
    >
      <div className="overflow-hidden rounded-2xl shadow-xl border border-navy/15 bg-cream min-h-[380px] flex flex-col justify-between p-8 sm:p-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark">
                {slide.badge}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-navy/5 text-navy/70 border border-navy/10">
                {slide.tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-3xl sm:text-4xl text-navy font-bold">
                {slide.title}
              </h3>
              <p className="text-base sm:text-lg text-navy/75 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  {slide.priceInr}
                </span>
                <span className="text-sm text-navy/60">/ {slide.priceUsd} Global</span>
              </div>
              {slide.regularInr && (
                <span className="text-xs text-navy/50 line-through">
                  Regular {slide.regularInr}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action and Controls */}
        <div className="pt-8 mt-6 border-t border-navy/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link href={slide.href}>
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              <span>{slide.buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-navy" : "w-2 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                aria-label="Previous Book Slide"
                className="p-2 rounded-full bg-ivory border border-navy/15 text-navy hover:bg-navy/5 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Book Slide"
                className="p-2 rounded-full bg-ivory border border-navy/15 text-navy hover:bg-navy/5 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
