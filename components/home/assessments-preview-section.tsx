import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENTS_CATALOG } from "@/data/pricing";
import { ArrowRight, Compass, ShieldAlert, Sparkles } from "lucide-react";

export function AssessmentsPreviewSection() {
  const featuredAssessments = ASSESSMENTS_CATALOG.slice(0, 6);

  return (
    <section className="py-24 bg-ivory border-b border-navy/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Clinical & Self-Discovery Psychometrics"
            title="The Assessment Centre"
            description="Explore 177 standardized psychometric scales (161 free self-screeners + 16 comprehensive clinical batteries) across 15 domains with instant scoring, factor profiles, clinical discussions, and structured conclusions."
            className="mb-0"
          />
          <Link href="/assessments" className="mt-4 md:mt-0">
            <Button variant="secondary" className="text-sm">
              Explore All 177 Assessments
            </Button>
          </Link>
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-sage-light/60 border border-sage/30 text-xs text-navy/80 mb-8 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-sage-dark shrink-0" />
          <span>
            <strong>Educational Notice:</strong> All assessments are designed for structured psychological self-reflection, screening, and educational insight. They do not constitute autonomous medical or psychiatric diagnosis without practitioner clinical oversight.
          </span>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAssessments.map((test) => (
            <div
              key={test.id}
              className="bg-cream/70 rounded-xl p-6 border border-navy/10 hover:border-navy/25 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="navy" className="text-[10px]">
                    {test.code}
                  </Badge>
                  <span className="text-xs text-navy/60">{test.duration}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-navy group-hover:text-navy-light transition-colors">
                  {test.name}
                </h3>

                <p className="text-xs text-navy/70 leading-relaxed line-clamp-3">
                  {test.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-navy/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-navy/50 block">Pricing</span>
                  <span className="font-serif text-base font-bold text-navy">
                    {test.formattedInr}
                  </span>
                  <span className="text-[11px] text-navy/60 font-sans ml-1">
                    ({test.formattedUsd})
                  </span>
                </div>

                <Link
                  href={`/assessments#${test.id}`}
                  className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-sage-dark flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
