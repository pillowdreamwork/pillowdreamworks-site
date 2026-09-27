"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";

const rows = [
  {
    number: "01",
    title: "Books",
    description: "Guided publications for structured self-exploration",
    href: "/books",
  },
  {
    number: "02",
    title: "Assessments",
    description: "Standardised psychological screening instruments",
    href: "/assessments",
  },
  {
    number: "03",
    title: "Services",
    description: "Counselling, crisis support and CentreLine",
    href: "/services",
  },
  {
    number: "04",
    title: "Learn",
    description: "PsychSnaps, essays and reflective resources",
    href: "/learn",
  },
];

export function MissionSection() {
  return (
    <section
      className="py-24 md:py-32 bg-ivory border-b border-navy/8"
      aria-label="What PillowDreamWorks creates"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left: Statement ── */}
          <div className="lg:col-span-4">
            <motion.span
              className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-dark mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              The Foundation
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-navy font-normal leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
            >
              What we<br />
              place into<br />
              the world.
            </motion.h2>

            <motion.p
              className="mt-5 text-sm text-navy/60 leading-relaxed font-sans max-w-[36ch]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            >
              Books. Tools. Questions. Spaces to reflect. Different forms —
              one intention: making psychology easier to explore, understand and use.
            </motion.p>
          </div>

          {/* ── Right: Library Index ── */}
          <div className="lg:col-span-8">
            <div className="border-t border-navy/12">
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
                    className="group flex items-center gap-6 py-6 sm:py-7 border-b border-navy/10 hover:border-navy/20 transition-colors duration-200"
                  >
                    {/* Number */}
                    <span className="text-[11px] font-mono text-navy/25 w-8 shrink-0 group-hover:text-navy/40 transition-colors duration-200">
                      {row.number}
                    </span>

                    {/* Title */}
                    <span className="font-serif text-xl sm:text-2xl text-navy font-normal leading-tight group-hover:text-navy/80 transition-colors duration-200 w-36 sm:w-44 shrink-0">
                      {row.title}
                    </span>

                    {/* Description */}
                    <span className="hidden sm:block text-sm text-navy/50 font-sans leading-relaxed group-hover:text-navy/65 transition-colors duration-200 flex-1">
                      {row.description}
                    </span>

                    {/* Arrow */}
                    <ArrowRight className="w-4 h-4 text-navy/25 group-hover:text-sage-dark group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-auto" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
