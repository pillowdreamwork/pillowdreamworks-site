"use client";

import * as React from "react";
import { ArrowRight, FileCheck, ShieldCheck, Download } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { BOOKS_PRICING } from "@/data/pricing";

export function FinalCTASection() {
  return (
    <section
      id="invitation"
      className="py-24 sm:py-36 bg-[#202923] text-[#FDFBF7] relative overflow-hidden scroll-mt-16"
    >
      {/* Editorial Rule Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A46A]/30 to-transparent" />

      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C6A46A]/30 text-[#C6A46A] text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46A] animate-pulse" />
            <span>Foundation Publications & Clinical Services</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FDFBF7] max-w-2xl mx-auto">
            Begin your practice of structured self-inquiry today.
          </h2>

          <p className="text-base sm:text-lg text-[#FDFBF7]/75 leading-relaxed max-w-xl mx-auto font-sans">
            Gain immediate digital access to the 80-page master Psychology Toolkit workbook, explore clinical assessment frameworks, or reserve a 1-on-1 therapeutic consultation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LiquidGlassButton
              href="/books/psychology-toolkit"
              variant="primary"
              size="lg"
              showArrow
            >
              <span>Acquire Toolkit ({BOOKS_PRICING.toolkit.formattedInr} / {BOOKS_PRICING.toolkit.formattedUsd})</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              href="/books"
              variant="secondary"
              size="lg"
              showArrow
            >
              <span>Explore All Publications</span>
            </LiquidGlassButton>
          </div>

          {/* Delivery & Format Specification Strip */}
          <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#FDFBF7]/60">
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-[#C6A46A]" />
              <span>Instant PDF Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-3.5 h-3.5 text-[#A6B7A1]" />
              <span>Printable A4 & Tablet Layout</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6B7A1]" />
              <span>Lifetime Updates Included</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
