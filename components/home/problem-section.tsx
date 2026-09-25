import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2, XCircle } from "lucide-react";

export function ProblemSection() {
  const painPoints = [
    "Surface-level wellness apps offering generic positive affirmations that fail during genuine emotional distress.",
    "Unstructured blank journaling that leads to rumination and repetitive anxiety loops rather than resolution.",
    "Overwhelming clinical jargon that creates barriers rather than practical psychological self-understanding.",
    "Fragmented mental health advice scattered across social algorithms without systematic progression.",
  ];

  const foundationApproaches = [
    "Evidence-grounded cognitive restructuring exercises tested across clinical and educational settings.",
    "Clear, structured prompt architectures that guide the mind through deliberate stages of reflection.",
    "Calm, editorial clarity that explains why your nervous system and subconscious react the way they do.",
    "A continuous, progressive 5-chapter roadmap: Understand → Reflect → Practice → Track → Grow.",
  ];

  return (
    <section className="py-20 bg-ivory border-b border-navy/10">
      <Container>
        <SectionHeading
          eyebrow="The Reader Context"
          title="Why generic wellness advice keeps you feeling stuck"
          description="Most self-help gives you inspiration without architecture. When real anxiety, boundary friction, or cognitive fatigue strikes, motivation dissolves. You need a structured psychological system."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* What doesn't work */}
          <div className="bg-red-50/50 rounded-2xl p-6 sm:p-8 border border-red-900/10 space-y-6">
            <div className="flex items-center gap-2 text-red-900 font-serif text-xl font-bold">
              <XCircle className="w-5 h-5 text-red-800" />
              <h3>The Fragmented Approach</h3>
            </div>
            <ul className="space-y-4">
              {painPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-navy/80 leading-relaxed">
                  <span className="text-red-700 font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The PillowDreamWorks Approach */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-navy/15 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-navy font-serif text-xl font-bold">
              <CheckCircle2 className="w-5 h-5 text-sage-dark" />
              <h3>The Foundation Methodology</h3>
            </div>
            <ul className="space-y-4">
              {foundationApproaches.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-navy/90 leading-relaxed font-medium">
                  <span className="text-sage-dark font-bold mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
