"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileCheck, ShieldCheck, Download } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { CAMPAIGN_METADATA, BOOKS_PRICING } from "@/data/pricing";

export function FinalCTASection() {
  return (
    <section className="py-24 sm:py-36 bg-navy text-ivory relative overflow-hidden">
      {/* Editorial Rule Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory/10 border border-gold/30 text-gold text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>{CAMPAIGN_METADATA.badge} · Valid until {CAMPAIGN_METADATA.endDate}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ivory max-w-2xl mx-auto">
            Begin your practice of structured self-inquiry today.
          </h2>

          <p className="text-base sm:text-lg text-ivory/75 leading-relaxed max-w-xl mx-auto font-sans">
            Gain immediate digital access to the 80-page master Psychology Toolkit workbook, explore clinical assessment frameworks, or reserve a 1-on-1 therapeutic consultation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/books/psychology-toolkit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-gold hover:bg-gold-light text-navy font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm group"
            >
              <span>Acquire Toolkit ({BOOKS_PRICING.toolkit.diwali.formattedInr} / {BOOKS_PRICING.toolkit.diwali.formattedUsd})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-ivory/10 hover:bg-ivory/15 text-ivory border border-ivory/20 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Explore All Publications</span>
            </Link>
          </div>

          {/* Delivery & Format Specification Strip */}
          <div className="pt-10 border-t border-ivory/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-ivory/60">
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-gold" />
              <span>Instant PDF Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-3.5 h-3.5 text-sage" />
              <span>Printable A4 & Tablet Layout</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Lifetime Updates Included</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
