import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { ArrowUpRight, Mail, Compass, BookOpen, HeartHandshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Foundation — PillowDreamWorks Foundation",
  description:
    "Learn about the philosophy, mission, and founder story of PillowDreamWorks Foundation, founded by Manish Garg.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            The Foundation Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-navy">
            Calm on the surface. <br />
            <span className="italic text-navy/90">Ambition underneath.</span>
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            PillowDreamWorks Foundation is an independent psychology publishing house and psychological institute dedicated to evidence-grounded inner sovereignty.
          </p>
        </div>

        {/* Founder Story Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Card: Founder Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-navy text-ivory rounded-3xl p-8 sm:p-10 shadow-2xl border border-navy-light/40 space-y-6 w-full max-w-sm text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gold text-navy flex items-center justify-center font-serif text-4xl font-bold shadow-inner">
                  MG
                </div>

                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-ivory">
                    {FOUNDER_CONTACT.name}
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-gold font-semibold">
                    {FOUNDER_CONTACT.title}
                  </p>
                </div>

                <p className="text-xs text-ivory/75 italic leading-relaxed">
                  "True psychological strength is not the absence of emotion, but the ability to remain poised and deliberate while experiencing it."
                </p>

                <div className="pt-4 border-t border-ivory/15 flex justify-center items-center gap-4 text-xs">
                  <a
                    href={FOUNDER_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline flex items-center gap-0.5"
                  >
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <span className="text-ivory/30">•</span>
                  <a
                    href={FOUNDER_CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline flex items-center gap-0.5"
                  >
                    Instagram <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Text */}
            <div className="lg:col-span-7 space-y-6 text-base text-navy/80 leading-relaxed font-sans">
              <h3 className="font-serif text-3xl font-bold text-navy">
                Why PillowDreamWorks Exists
              </h3>
              <p>
                Modern culture pushes us into binary traps: either frantic hustle culture that celebrates burnout, or passive pop-wellness that offers hollow affirmations.
              </p>
              <p>
                PillowDreamWorks was founded on a different thesis: that ambitious, high-agency individuals deserve rigorous psychological tools. We believe that clarity, cognitive structure, and emotional regulation are the bedrock of enduring achievement.
              </p>
              <p>
                Our flagship 80-page workbook, <strong className="text-navy font-semibold">The Psychology Toolkit</strong>, and companion volume, <strong className="text-navy font-semibold">Finding The Centre</strong>, provide the tactile architecture for daily self-inquiry.
              </p>
              <div className="p-6 rounded-2xl bg-cream border border-navy/15 text-navy font-serif italic text-lg shadow-xs">
                "We do not promise magical overnight cures. We provide the structural scaffolds for lifelong psychological sovereignty."
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-20 py-12 border-t border-b border-navy/10 bg-cream/40 rounded-3xl p-8 sm:p-12">
          <SectionHeading
            eyebrow="Core Philosophy"
            title="The 4 Foundation Pillars"
            description="Guiding principles behind all our publications, screening tools, and counselling protocols."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-ivory rounded-xl p-6 border border-navy/10 space-y-3">
              <span className="font-serif text-2xl font-bold text-sage-dark block">01</span>
              <h4 className="font-serif text-lg font-bold text-navy">Evidence Over Trends</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Grounding every exercise in established cognitive behavioral, psychodynamic, and somatic science.
              </p>
            </div>
            <div className="bg-ivory rounded-xl p-6 border border-navy/10 space-y-3">
              <span className="font-serif text-2xl font-bold text-sage-dark block">02</span>
              <h4 className="font-serif text-lg font-bold text-navy">Editorial Dignity</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Crafting publications and digital interfaces with intentional beauty, typography, and calm whitespace.
              </p>
            </div>
            <div className="bg-ivory rounded-xl p-6 border border-navy/10 space-y-3">
              <span className="font-serif text-2xl font-bold text-sage-dark block">03</span>
              <h4 className="font-serif text-lg font-bold text-navy">Zero False Claims</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Complete transparency. We never manufacture fake testimonials, exaggerated clinical stats, or artificial scarcity.
              </p>
            </div>
            <div className="bg-ivory rounded-xl p-6 border border-navy/10 space-y-3">
              <span className="font-serif text-2xl font-bold text-sage-dark block">04</span>
              <h4 className="font-serif text-lg font-bold text-navy">Compassionate Poise</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Meeting emotional distress with grounded steadiness, practical de-escalation, and clear boundaries.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Connect with the Foundation
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/books">
              <Button variant="primary">Explore Books Ecosystem</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary">Direct Inquiries</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
