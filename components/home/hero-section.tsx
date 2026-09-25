"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { CAMPAIGN_METADATA, BOOKS_PRICING } from "@/data/pricing";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  // Proximity depth physics on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle physical displacements
  const bookRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const bookRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const bookTranslateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const bookTranslateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const paperLayerTranslateX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-ivory border-b border-navy/8"
      aria-label="PillowDreamWorks Foundation introduction"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Editorial Copy (58%) ── */}
          <motion.div
            className="lg:col-span-7 space-y-8 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Brand label */}
            <motion.span
              variants={itemVariants}
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-dark"
            >
              PillowDreamWorks Foundation
            </motion.span>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-navy font-normal leading-[1.12] tracking-tight"
            >
              A place for psychology, reflection and the work of becoming.
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-navy/70 leading-relaxed font-sans max-w-[54ch]"
            >
              We publish structured workbooks, clinical assessment frameworks, and psychological journals designed to give your inner life clear architecture.
            </motion.p>

            {/* Action Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
            >
              <Link
                href="/books/psychology-toolkit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-navy hover:bg-navy-light text-ivory font-semibold text-xs uppercase tracking-wider transition-colors group shadow-xs"
              >
                <span>Acquire The Psychology Toolkit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/assessments"
                className="text-xs uppercase tracking-wider font-semibold text-navy/70 hover:text-navy transition-colors py-2 px-1"
              >
                Explore Psychometric Archive →
              </Link>
            </motion.div>

            {/* Publication Specs Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-navy/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-navy/55"
            >
              <span>{CAMPAIGN_METADATA.badge}: ₹{BOOKS_PRICING.toolkit.diwali.inr} (${BOOKS_PRICING.toolkit.diwali.usd})</span>
              <span>·</span>
              <span>80 Pages (5 Master Chapters)</span>
              <span>·</span>
              <span>Instant Digital Delivery</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: The Publication Object with Proximity Physics (42%) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              style={{
                rotateX: bookRotateX,
                rotateY: bookRotateY,
                x: bookTranslateX,
                y: bookTranslateY,
                transformPerspective: 1000,
              }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] select-none"
            >
              {/* Layer behind: drifting paper layer */}
              <motion.div
                style={{ x: paperLayerTranslateX }}
                className="absolute -inset-2 rounded-xl bg-cream/70 border border-navy/8 -rotate-1 -z-10 shadow-xs"
              />

              {/* Publication Cover Container */}
              <div className="relative rounded-xl bg-navy text-ivory p-8 sm:p-10 shadow-2xl border border-navy-light/30 overflow-hidden">
                {/* Physical Book Spine Gradient Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-navy-dark/60 to-transparent pointer-events-none" />

                {/* Cover Header */}
                <div className="space-y-2 mb-10 pl-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold block">
                    FOUNDATION MASTER PUBLICATION
                  </span>
                  <div className="h-px w-8 bg-gold/40" />
                </div>

                {/* Cover Title */}
                <div className="space-y-3 mb-12 pl-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-ivory">
                    The Psychology<br />Toolkit
                  </h2>
                  <p className="text-xs text-ivory/65 font-sans leading-relaxed">
                    A clinical workbook for cognitive restructuring, emotional regulation, and daily practice.
                  </p>
                </div>

                {/* Five Chapter Spine Indices */}
                <div className="space-y-1.5 pl-2 pb-6 border-b border-ivory/10 font-mono text-[11px] text-ivory/60">
                  <div className="flex items-center justify-between">
                    <span>01 Understanding Yourself</span>
                    <span className="text-gold/80">Ch. I</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>02 Thoughts & Mindset</span>
                    <span className="text-gold/80">Ch. II</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>03 Anxiety & Stress</span>
                    <span className="text-gold/80">Ch. III</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>04 Relationships & Boundaries</span>
                    <span className="text-gold/80">Ch. IV</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>05 Habits & Personal Growth</span>
                    <span className="text-gold/80">Ch. V</span>
                  </div>
                </div>

                {/* Cover Footer */}
                <div className="pt-4 pl-2 flex items-center justify-between text-[11px] font-mono text-ivory/40">
                  <span>80 PAGES · 5 CHAPTERS</span>
                  <span className="text-gold font-semibold">EDITION 2026</span>
                </div>
              </div>

              {/* Sub-label */}
              <p className="text-center text-xs font-mono text-navy/40 mt-4">
                Companion volume:{" "}
                <Link href="/books/finding-the-centre" className="text-navy/70 hover:underline">
                  Finding The Centre
                </Link>
              </p>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
