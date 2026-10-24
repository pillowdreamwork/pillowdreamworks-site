"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { SERVICES_PRICING } from "@/data/pricing";

export function ServicesPreviewSection() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#FDFBF7] border-b border-[#24483B]/10 relative scroll-mt-16"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono block mb-4 font-semibold">
            Practice & Consultations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202923] leading-tight">
            The Consulting Rooms
          </h2>
          <p className="mt-4 text-base text-[#202923]/75 font-sans leading-relaxed">
            Direct access to psychological guidance, a scheduled stabilisation call, ongoing confidential check-ins, and graphology readings.
          </p>
        </div>

        {/* 4 Specialized Rooms: Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Room 01: 1-on-1 Clinical Counselling */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between hover:border-[#24483B]/25 hover:shadow-md transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#24483B]/10">
                <span className="font-mono text-xs text-[#24483B] tracking-wider font-semibold">ROOM 01 · CLINICAL</span>
                <span className="text-xs font-medium text-[#202923] bg-white/60 px-3 py-1 rounded-full border border-[#24483B]/10">60 Min Session</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#202923] font-normal">
                1-on-1 Clinical Counselling
              </h3>
              <p className="text-sm text-[#202923]/75 leading-relaxed font-sans">
                Focused cognitive-behavioral and psychodynamic sessions addressing chronic anxiety, imposter syndrome, boundary maintenance, and difficult life transitions.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#202923]/50 block">Fee</span>
                <span className="font-serif text-xl font-bold text-[#202923]">
                  {SERVICES_PRICING.counselling.singleSession.formattedInr}
                </span>
                <span className="text-xs text-[#202923]/60 ml-1">/ session</span>
              </div>
              <LiquidGlassButton
                href="/services#counselling"
                variant="primary"
                size="sm"
                showArrow
              >
                Reserve Room
              </LiquidGlassButton>
            </div>
          </motion.div>

          {/* Room 02: Crisis Stabilization Protocol */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-2xl bg-[#8B2626]/5 border border-[#8B2626]/20 flex flex-col justify-between hover:border-[#8B2626]/40 hover:shadow-md transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#8B2626]/10">
                <span className="font-mono text-xs text-[#8B2626] tracking-wider font-semibold">ROOM 02 · SUPPORT</span>
                <span className="text-xs font-semibold text-[#8B2626] bg-[#8B2626]/10 px-3 py-1 rounded-full border border-[#8B2626]/20">Scheduled Call</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#202923] font-normal">
                Crisis Stabilisation Call
              </h3>
              <p className="text-sm text-[#202923]/80 leading-relaxed font-sans">
                A scheduled, non-emergency support call offering grounding and de-escalation during periods of overwhelm. Not an emergency-response service.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[#8B2626]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B2626] block font-semibold">Session rate</span>
                <span className="font-serif text-xl font-bold text-[#8B2626]">
                  {SERVICES_PRICING.crisis.call.formattedInr}
                </span>
                <span className="text-xs text-[#8B2626]/70 ml-1">/ call</span>
              </div>
              <LiquidGlassButton
                href="/services#crisis"
                variant="crisis"
                size="sm"
                showArrow
              >
                Request a Call
              </LiquidGlassButton>
            </div>
          </motion.div>

          {/* Room 03: CentreLine Support */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between hover:border-[#24483B]/25 hover:shadow-md transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#24483B]/10">
                <span className="font-mono text-xs text-[#24483B] tracking-wider font-semibold">ROOM 03 · ONGOING</span>
                <span className="text-xs font-medium text-[#202923] bg-white/60 px-3 py-1 rounded-full border border-[#24483B]/10">Founder Channel</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#202923] font-normal">
                CentreLine Async Guidance
              </h3>
              <p className="text-sm text-[#202923]/75 leading-relaxed font-sans">
                Confidential, deliberate check-ins with Manish Garg. Designed for founders and professionals navigating prolonged uncertainty, burnout, and strategic pressure.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#202923]/50 block">Retainer</span>
                <span className="font-serif text-xl font-bold text-[#202923]">
                  {SERVICES_PRICING.crisis.centreLine.formattedInr}
                </span>
                <span className="text-xs text-[#202923]/60 ml-1">/ check-in</span>
              </div>
              <LiquidGlassButton
                href="/services#centreline"
                variant="secondary"
                size="sm"
                showArrow
              >
                Enter CentreLine
              </LiquidGlassButton>
            </div>
          </motion.div>

          {/* Room 04: Subconscious Graphotherapy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between hover:border-[#24483B]/25 hover:shadow-md transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#24483B]/10">
                <span className="font-mono text-xs text-[#24483B] tracking-wider font-semibold">ROOM 04 · GRAPHOLOGY</span>
                <span className="text-xs font-medium text-[#202923] bg-white/60 px-3 py-1 rounded-full border border-[#24483B]/10">Stroke Analysis</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#202923] font-normal">
                Subconscious Graphotherapy
              </h3>
              <p className="text-sm text-[#202923]/75 leading-relaxed font-sans">
                Structured handwriting stroke analysis exploring baseline patterns and stress markers, with custom 30-day realignment penmanship drills.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#202923]/50 block">Starting From</span>
                <span className="font-serif text-xl font-bold text-[#202923]">
                  {SERVICES_PRICING.graphology.basic.formattedInr}
                </span>
                <span className="text-xs text-[#202923]/60 ml-1">/ dossier</span>
              </div>
              <LiquidGlassButton
                href="/services#graphology"
                variant="secondary"
                size="sm"
                showArrow
              >
                View Analysis Protocol
              </LiquidGlassButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
