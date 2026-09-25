import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CAMPAIGN_METADATA, BOOKS_PRICING } from "@/data/pricing";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-24 bg-navy text-ivory relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-navy-light/40 blur-3xl pointer-events-none -z-10" />

      <Container size="narrow">
        <div className="text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{CAMPAIGN_METADATA.badge} Valid until {CAMPAIGN_METADATA.endDate}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ivory">
            Begin your journey of structured self-inquiry today.
          </h2>

          <p className="text-base sm:text-lg text-ivory/80 leading-relaxed max-w-2xl mx-auto font-sans">
            Get instant digital access to the 80-page master Psychology Toolkit workbook, explore clinical assessment frameworks, or connect for 1-on-1 therapeutic guidance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/books/psychology-toolkit">
              <Button size="lg" variant="gold" className="w-full sm:w-auto text-base group">
                <span>Claim Toolkit ({BOOKS_PRICING.toolkit.diwali.formattedInr} / {BOOKS_PRICING.toolkit.diwali.formattedUsd})</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/books">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-ivory border-ivory/30 hover:bg-ivory/10 hover:border-ivory text-base">
                View All Publications
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-ivory/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span>Instant Digital PDF Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span>Printable A4 + Tablet Ready</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
