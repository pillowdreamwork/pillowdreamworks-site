import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FileText, Sparkles, MessageSquare } from "lucide-react";

export function LearnPreviewSection() {
  const articles = [
    {
      category: "PsychSnaps",
      title: "The Anxiety Paradox: Why Fighting Panic Intensifies It",
      excerpt: "Understanding the physiological feedback loop of the sympathetic nervous system and how passive somatic acceptance neutralizes adrenaline rushes.",
      readTime: "4 min read",
      date: "Editorial Release",
    },
    {
      category: "Founder Notes",
      title: "Solitude vs. Isolation: The Architecture of Inner Poise",
      excerpt: "Why deliberate, quiet self-inquiry generates psychological resilience, while reactive digital hyper-connectedness drains cognitive stamina.",
      readTime: "6 min read",
      date: "By Manish Garg",
    },
    {
      category: "Cognitive Science",
      title: "The 5 Invisible Cognitive Distortions Governing Daily Decisions",
      excerpt: "How catastrophic projections, emotional reasoning, and unexamined 'should' statements distort your perception of baseline reality.",
      readTime: "5 min read",
      date: "Workbook Companion",
    },
  ];

  return (
    <section className="py-24 bg-ivory border-b border-navy/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Editorial Insights & PsychSnaps"
            title="The Learn Hub"
            description="Clear, jargon-free psychological lessons, practical reflection essays, and founder notes designed to illuminate human behavior."
            className="mb-0"
          />
          <Link href="/learn" className="mt-4 md:mt-0">
            <Button variant="secondary" className="text-sm">
              Explore All Articles & Snaps
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="bg-cream/50 rounded-2xl p-7 border border-navy/10 flex flex-col justify-between hover:border-navy/25 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-navy/60">
                  <Badge variant="sage" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy group-hover:text-navy-light transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-navy/75 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-navy/10 flex items-center justify-between">
                <span className="text-xs font-mono text-navy/50">{item.date}</span>
                <Link
                  href="/learn"
                  className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-sage-dark flex items-center gap-1 transition-colors"
                >
                  <span>Read Note</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
