import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { ArrowUpRight, Mail } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-24 bg-cream/70 border-b border-navy/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Founder Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl bg-navy text-ivory p-8 shadow-2xl border border-navy-light/40 space-y-6 text-center">
                {/* Founder Initial Monogram Avatar */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gold text-navy flex items-center justify-center font-serif text-4xl font-bold shadow-inner">
                  MG
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-ivory">
                    {FOUNDER_CONTACT.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gold font-semibold">
                    {FOUNDER_CONTACT.title}
                  </p>
                </div>

                <p className="text-xs text-ivory/75 italic leading-relaxed">
                  "I created PillowDreamWorks to bridge the gap between abstract academic psychology and the lived, quiet struggles of everyday human ambition."
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
          </div>

          {/* Right Column: Founder Story & Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
              Founder Story & Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-navy font-bold leading-tight">
              Why PillowDreamWorks was founded
            </h2>

            <div className="space-y-4 text-base text-navy/80 leading-relaxed font-sans">
              <p>
                Most modern self-help oscillates between two extremes: clinical textbooks filled with unapproachable academic jargon, or pop-psychology affirmations that disintegrate under genuine emotional crisis.
              </p>
              <p>
                PillowDreamWorks Foundation was born out of a desire to create something enduring. Real psychological tools crafted with the editorial dignity of an independent publishing house and the technical precision of clinical behavioral science.
              </p>
              <p>
                Whether you are working through <strong className="text-navy font-semibold">The Psychology Toolkit</strong>, exploring your cognitive patterns in the <strong className="text-navy font-semibold">Assessment Centre</strong>, or connecting for <strong className="text-navy font-semibold">1-on-1 Counselling</strong>, the mission remains constant:
              </p>
            </div>

            <div className="p-5 rounded-xl bg-ivory border border-navy/15 text-navy font-serif italic text-lg shadow-xs">
              "To give thoughtful individuals the architecture to understand their minds, regulate their nervous systems, and build meaningful lives without compromise."
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link href="/about">
                <Button variant="primary">Read Full Foundation Story</Button>
              </Link>
              <a href={`mailto:${FOUNDER_CONTACT.email}`}>
                <Button variant="outline" className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span>Email Manish</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
