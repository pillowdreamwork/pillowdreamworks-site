"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Heart, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';const rows = [
  {
    number: "01",
    title: "Guided Books",
    description: "Structured workbooks and reflective volumes for progressive self-exploration",
    href: "/books",
  },
  {
    number: "02",
    title: "Assessments",
    description: "177 standardised psychological screening instruments with instant factor scoring",
    href: "/assessments",
  },
  {
    number: "03",
    title: "Consulting Rooms",
    description: "1-on-1 confidential counselling, crisis stabilization protocols, and graphotherapy",
    href: "/services",
  },
  {
    number: "04",
    title: "Learning Hub",
    description: "PsychSnaps, clinical essays, and reflective frameworks for daily application",
    href: "/learn",
  },
];

const VALUES = [
  { icon: Heart, label: "Compassion & Dignity", desc: "Non-judgmental spaces honoring lived experiences." },
  { icon: Compass, label: "Personal Autonomy", desc: "Equipping individuals with tools to direct their growth." },
  { icon: Shield, label: "Ethical Responsibility", desc: "Transparent methodologies and strict privacy safeguards." },
  { icon: Sparkles, label: "Everyday Accessibility", desc: "Demystifying clinical psychology into clear daily practice." },
];

export function MissionSection() {
  return (
    <section
      id="mission"
      className="py-24 md:py-32 bg-[#FDFBF7] border-b border-[#24483B]/10 scroll-mt-16"
      aria-label="What PillowDreamWorks creates"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left: Mission Statement ── */}
          <div className="lg:col-span-5 space-y-6">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3 py-1 rounded-full border border-[#24483B]/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              The Foundation Mission
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-[#202923] font-normal leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
            >
              What we place into the world.
            </motion.h2>

            <motion.p
              className="text-base text-[#202923]/75 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            >
              Our mission is to make psychology and emotional wellbeing easier to understand and apply in everyday life through accessible learning, practical workbooks, reflective activities, and responsible wellbeing resources.
            </motion.p>

            <motion.div
              className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 space-y-2 text-xs text-[#202923]/70 font-sans"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            >
              <strong className="text-[#202923] font-serif text-sm block">Vision</strong>
              <p className="leading-relaxed">
                A world where people can explore their thoughts, emotions and personal growth with greater understanding, dignity, curiosity and less stigma.
              </p>
            </motion.div>
          </div>

          {/* ── Right: Library Index & Core Pillars ── */}
          <div className="lg:col-span-7 space-y-10">
            <div className="border-t border-[#24483B]/15">
              {rows.map((row, idx) => (
                <motion.div
                  key={row.number}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.07,
                  }}
                >
                  <Link
                    href={row.href}
                    id={`foundation-row-${row.number}`}
                    className="group flex items-center gap-6 py-6 sm:py-7 border-b border-[#24483B]/10 hover:border-[#24483B]/30 transition-colors duration-200"
                  >
                    {/* Number */}
                    <span className="text-xs font-mono text-[#24483B]/40 w-8 shrink-0 group-hover:text-[#24483B] transition-colors duration-200 font-semibold">
                      {row.number}
                    </span>

                    {/* Title */}
                    <span className="font-serif text-xl sm:text-2xl text-[#202923] font-normal leading-tight group-hover:text-[#24483B] transition-colors duration-200 w-36 sm:w-48 shrink-0">
                      {row.title}
                    </span>

                    {/* Description */}
                    <span className="hidden sm:block text-xs sm:text-sm text-[#202923]/60 font-sans leading-relaxed group-hover:text-[#202923]/80 transition-colors duration-200 flex-1">
                      {row.description}
                    </span>

                    {/* Arrow */}
                    <ArrowRight className="w-4 h-4 text-[#24483B]/40 group-hover:text-[#24483B] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-auto" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.label}
                    className="p-4 rounded-xl bg-[#F5EFE6]/60 border border-[#24483B]/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-[#24483B]">
                      <Icon className="w-4 h-4" />
                      <span className="font-serif text-sm font-semibold text-[#202923]">{val.label}</span>
                    </div>
                    <p className="text-xs text-[#202923]/65 leading-relaxed font-sans">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
