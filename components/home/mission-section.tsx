import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookOpen, Compass, HeartHandshake, GraduationCap, ArrowRight } from "lucide-react";

export function MissionSection() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Guided Publications",
      description: "Tactile, rigorously structured workbooks bridging cognitive science with practical everyday journaling.",
      href: "/books",
      cta: "Explore Books",
    },
    {
      icon: Compass,
      title: "Assessment Centre",
      description: "16 standardized clinical screening and projective psychometrics for structured self-awareness.",
      href: "/assessments",
      cta: "View Catalog",
    },
    {
      icon: HeartHandshake,
      title: "Direct Counselling",
      description: "Confidential 1-on-1 therapeutic guidance, crisis stabilization calls, and steady CentreLine support.",
      href: "/services",
      cta: "See Services",
    },
    {
      icon: GraduationCap,
      title: "Psychology Learning",
      description: "PsychSnaps, essays, and founder notes designed to illuminate human behavior without jargon.",
      href: "/learn",
      cta: "Start Reading",
    },
  ];

  return (
    <section className="py-20 bg-cream/60 border-b border-navy/10">
      <Container>
        <SectionHeading
          eyebrow="Foundation Architecture"
          title="An integrated psychological ecosystem"
          description="PillowDreamWorks is not an isolated product or temporary wellness trend. It is a cohesive foundation designed to support your psychological journey across multiple modalities."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-ivory rounded-xl p-6 sm:p-7 border border-navy/10 shadow-xs flex flex-col justify-between hover:border-navy/25 hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center group-hover:bg-navy group-hover:text-ivory transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-navy/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-navy/5">
                  <Link
                    href={pillar.href}
                    className="text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1 group-hover:text-sage-dark transition-colors"
                  >
                    <span>{pillar.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
