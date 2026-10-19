"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { BOOKS_PRICING } from "@/data/pricing";

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
  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll parallax bindings (0.2x background, 0.4x book elevation)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bookScrollY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Proximity depth physics on desktop cursor hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Physical displacements
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
      ref={sectionRef}
      id="prelude"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-[#FDFBF7] border-b border-[#24483B]/10 scroll-mt-16"
      aria-label="PillowDreamWorks Foundation introduction"
    >
      {/* ── BACKGROUND PARALLAX LAYER (0.2x speed) ── */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-end overflow-hidden"
      >
        <div className="w-[600px] h-[600px] rounded-full border border-[#24483B]/[0.05] absolute -right-24 -top-24 flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full border border-[#24483B]/[0.04] flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full border border-[#C6A46A]/[0.06] flex items-center justify-center">
              <span className="font-serif text-[180px] text-[#24483B]/[0.025] select-none">
                Ψ
              </span>
            </div>
          </div>
        </div>
      </motion.div>

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
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3 py-1 rounded-full border border-[#24483B]/10"
            >
              <span>PillowDreamWorks Foundation</span>
            </motion.span>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] text-[#202923] font-normal leading-[1.12] tracking-tight"
            >
              A place for psychology, reflection and the work of becoming.
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-[54ch]"
            >
              We publish structured workbooks, clinical assessment frameworks, and psychological journals designed to give your inner life clear, reassuring architecture.
            </motion.p>

            {/* Action Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <LiquidGlassButton
                href="/books/psychology-toolkit"
                variant="primary"
                size="lg"
              >
                <span>Acquire The Psychology Toolkit</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </LiquidGlassButton>

              <LiquidGlassButton
                href="/assessments"
                variant="subtle"
                size="lg"
              >
                <span>Explore 177 Psychometric Scales →</span>
              </LiquidGlassButton>
            </motion.div>

            {/* Publication Specs Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[#24483B]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#202923]/60"
            >
              <span className="font-semibold text-[#24483B]">
                The Psychology Toolkit: {BOOKS_PRICING.toolkit.formattedInr} ({BOOKS_PRICING.toolkit.formattedUsd})
              </span>
              <span>·</span>
              <span>80 Pages (5 Master Chapters)</span>
              <span>·</span>
              <span>Instant Digital PDF Delivery</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Publication Object with Proximity Physics + Scroll Parallax ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{ y: bookScrollY }}
              className="w-full max-w-[340px] sm:max-w-[380px]"
            >
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
                className="relative w-full select-none"
              >
                {/* Layer behind: drifting paper layer */}
                <motion.div
                  style={{ x: paperLayerTranslateX }}
                  className="absolute -inset-2 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 -rotate-1 -z-10 shadow-sm"
                />

                {/* Publication Cover Container */}
                <div className="relative rounded-2xl bg-[#24483B] text-[#FDFBF7] p-8 sm:p-10 shadow-2xl border border-white/10 overflow-hidden">
                  {/* Physical Book Spine Gradient Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-[#1A3529]/60 to-transparent pointer-events-none" />

                  {/* Cover Header */}
                  <div className="space-y-2 mb-10 pl-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C6A46A] block font-semibold">
                      FOUNDATION MASTER PUBLICATION
                    </span>
                    <div className="h-px w-8 bg-[#C6A46A]/50" />
                  </div>

                  {/* Cover Title */}
                  <div className="space-y-3 mb-12 pl-2">
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-[#FDFBF7]">
                      The Psychology<br />Toolkit
                    </h2>
                    <p className="text-xs text-[#FDFBF7]/70 font-sans leading-relaxed">
                      A clinical workbook for cognitive restructuring, emotional regulation, and daily practice.
                    </p>
                  </div>

                  {/* Five Chapter Spine Indices */}
                  <div className="space-y-1.5 pl-2 pb-6 border-b border-white/10 font-mono text-[11px] text-[#FDFBF7]/70">
                    <div className="flex items-center justify-between">
                      <span>01 Understanding Your Mind</span>
                      <span className="text-[#C6A46A]">Ch. I</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>02 Thoughts & Mindset</span>
                      <span className="text-[#C6A46A]">Ch. II</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>03 Anxiety & Stress</span>
                      <span className="text-[#C6A46A]">Ch. III</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>04 Relationships & Boundaries</span>
                      <span className="text-[#C6A46A]">Ch. IV</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>05 Habits & Personal Growth</span>
                      <span className="text-[#C6A46A]">Ch. V</span>
                    </div>
                  </div>

                  {/* Cover Footer */}
                  <div className="pt-4 pl-2 flex items-center justify-between text-[11px] font-mono text-[#FDFBF7]/50">
                    <span>80 PAGES · 5 CHAPTERS</span>
                    <span className="text-[#C6A46A] font-semibold">EDITION 2026</span>
                  </div>
                </div>

                {/* Sub-label */}
                <p className="text-center text-xs font-mono text-[#202923]/60 mt-4">
                  Companion volume:{" "}
                  <Link href="/books/finding-the-centre" className="text-[#24483B] font-semibold hover:underline">
                    Finding The Centre
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* ── Scroll invitation indicator at bottom ── */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="pt-12 flex flex-col items-center justify-center gap-1.5 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-[#24483B]/60 select-none pointer-events-none"
        >
          <span>Scroll to begin narrative</span>
          <ChevronDown className="w-4 h-4 text-[#C6A46A] animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
