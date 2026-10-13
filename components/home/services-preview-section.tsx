"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SERVICES_PRICING } from "@/data/pricing";

export function ServicesPreviewSection() {
  return (
    <section className="py-24 sm:py-32 bg-ivory border-b border-navy/10 relative">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-sage-dark font-mono block mb-4">
            Practice & Consultations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy leading-tight">
            The Consulting Rooms
          </h2>
          <p className="mt-4 text-base text-navy/70 font-sans leading-relaxed">
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
            className="p-8 sm:p-10 rounded-xl bg-cream/40 border border-navy/10 flex flex-col justify-between hover:border-navy/25 hover:bg-cream/60 transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-navy/10">
                <span className="font-mono text-xs text-navy/50 tracking-wider">ROOM 01 · CLINICAL</span>
                <span className="text-xs font-medium text-navy/70 bg-navy/5 px-2.5 py-1 rounded-sm">50 Min Session</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-navy font-normal">
                1-on-1 Clinical Counselling
              </h3>
              <p className="text-sm text-navy/75 leading-relaxed font-sans">
                Focused cognitive-behavioral and psychodynamic sessions addressing chronic anxiety, imposter syndrome, boundary maintenance, and difficult life transitions.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-navy/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy/50 block">Fee</span>
                <span className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.counselling.singleSession.formattedInr}
                </span>
                <span className="text-xs text-navy/60 ml-1">/ session</span>
              </div>
              <Link
                href="/services#counselling"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy hover:text-navy-light group-hover:translate-x-0.5 transition-all"
              >
                <span>Reserve Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Room 02: Crisis Stabilization Protocol */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-xl bg-red-950/5 border border-red-900/20 flex flex-col justify-between hover:border-red-900/35 transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-red-900/10">
                <span className="font-mono text-xs text-red-900/70 tracking-wider">ROOM 02 · SUPPORT</span>
                <span className="text-xs font-medium text-red-950 bg-red-900/10 px-2.5 py-1 rounded-sm">Scheduled Call</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-red-950 font-normal">
                Crisis Stabilisation Call
              </h3>
              <p className="text-sm text-navy/80 leading-relaxed font-sans">
                A scheduled, non-emergency support call offering grounding and de-escalation during periods of overwhelm. Not an emergency-response service.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-red-900/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-red-900/70 block">Session rate</span>
                <span className="font-serif text-xl font-bold text-red-950">
                  {SERVICES_PRICING.crisis.call.formattedInr}
                </span>
                <span className="text-xs text-red-900/70 ml-1">/ call</span>
              </div>
              <Link
                href="/services#crisis"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-red-950 hover:text-red-800 transition-colors"
              >
                <span>Request a Call</span>
                <Phone className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Room 03: CentreLine Support */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-xl bg-cream/40 border border-navy/10 flex flex-col justify-between hover:border-navy/25 hover:bg-cream/60 transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-navy/10">
                <span className="font-mono text-xs text-navy/50 tracking-wider">ROOM 03 · ONGOING</span>
                <span className="text-xs font-medium text-navy/70 bg-navy/5 px-2.5 py-1 rounded-sm">Founder Channel</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-navy font-normal">
                CentreLine Async Guidance
              </h3>
              <p className="text-sm text-navy/75 leading-relaxed font-sans">
                Confidential, deliberate check-ins with Manish Garg. Designed for founders and professionals navigating prolonged uncertainty, burnout, and strategic pressure.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-navy/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy/50 block">Retainer</span>
                <span className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.crisis.centreLine.formattedInr}
                </span>
                <span className="text-xs text-navy/60 ml-1">/ check-in</span>
              </div>
              <Link
                href="/services#centreline"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy hover:text-navy-light group-hover:translate-x-0.5 transition-all"
              >
                <span>Enter CentreLine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Room 04: Subconscious Graphotherapy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-xl bg-cream/40 border border-navy/10 flex flex-col justify-between hover:border-navy/25 hover:bg-cream/60 transition-all group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-navy/10">
                <span className="font-mono text-xs text-navy/50 tracking-wider">ROOM 04 · GRAPHOLOGY</span>
                <span className="text-xs font-medium text-navy/70 bg-navy/5 px-2.5 py-1 rounded-sm">Stroke Analysis</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-navy font-normal">
                Subconscious Graphotherapy
              </h3>
              <p className="text-sm text-navy/75 leading-relaxed font-sans">
                Structured handwriting stroke analysis exploring baseline patterns and stress markers, with custom 30-day realignment penmanship drills.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-navy/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy/50 block">Starting From</span>
                <span className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.graphology.basic.formattedInr}
                </span>
                <span className="text-xs text-navy/60 ml-1">/ dossier</span>
              </div>
              <Link
                href="/services#graphology"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy hover:text-navy-light group-hover:translate-x-0.5 transition-all"
              >
                <span>View Analysis Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
