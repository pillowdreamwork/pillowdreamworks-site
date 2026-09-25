import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SERVICES_PRICING } from "@/data/pricing";
import { HeartHandshake, PhoneCall, MessageSquareHeart, PenTool, ArrowRight } from "lucide-react";

export function ServicesPreviewSection() {
  return (
    <section className="py-24 bg-cream/60 border-b border-navy/10">
      <Container>
        <SectionHeading
          eyebrow="Clinical & Personalized Guidance"
          title="Therapeutic services & compassionate check-ins"
          description="Direct access to qualified psychological care, emergency stabilization, ongoing emotional support, and subconscious graphotherapy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Counselling */}
          <div className="bg-ivory rounded-2xl p-6 sm:p-7 border border-navy/10 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                1-on-1 Counselling
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                50-minute clinical sessions for anxiety, cognitive restructuring, boundary management, and personal transitions.
              </p>
              <div className="pt-2">
                <span className="font-serif text-2xl font-bold text-navy">
                  {SERVICES_PRICING.counselling.singleSession.formattedInr}
                </span>
                <span className="text-xs text-navy/60"> / 50 min session</span>
              </div>
            </div>
            <div className="pt-6 mt-4 border-t border-navy/10">
              <Link href="/services#counselling">
                <Button variant="outline" size="sm" className="w-full">
                  Book Session
                </Button>
              </Link>
            </div>
          </div>

          {/* Crisis Call */}
          <div className="bg-red-50/50 rounded-2xl p-6 sm:p-7 border border-red-900/15 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-900 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-red-950">
                Crisis Stabilization
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Rapid de-escalation and grounding call during intense emotional panic or acute distress.
              </p>
              <div className="pt-2">
                <span className="font-serif text-2xl font-bold text-red-900">
                  {SERVICES_PRICING.crisis.call.formattedInr}
                </span>
                <span className="text-xs text-navy/60"> / immediate call</span>
              </div>
            </div>
            <div className="pt-6 mt-4 border-t border-red-900/10">
              <Link href="/services#crisis">
                <Button variant="crisis" size="sm" className="w-full">
                  Emergency Support
                </Button>
              </Link>
            </div>
          </div>

          {/* CentreLine */}
          <div className="bg-ivory rounded-2xl p-6 sm:p-7 border border-navy/10 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-sage/20 text-navy-dark flex items-center justify-center">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                CentreLine Support
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Steady, confidential founder check-ins and ongoing guidance via structured messaging channels.
              </p>
              <div className="pt-2">
                <span className="font-serif text-2xl font-bold text-navy">
                  {SERVICES_PRICING.crisis.centreLine.formattedInr}
                </span>
                <span className="text-xs text-navy/60"> / ongoing check-in</span>
              </div>
            </div>
            <div className="pt-6 mt-4 border-t border-navy/10">
              <Link href="/services#centreline">
                <Button variant="secondary" size="sm" className="w-full">
                  Join CentreLine
                </Button>
              </Link>
            </div>
          </div>

          {/* Graphotherapy */}
          <div className="bg-ivory rounded-2xl p-6 sm:p-7 border border-navy/10 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-gold/25 text-navy flex items-center justify-center">
                <PenTool className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Graphotherapy
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                In-depth subconscious handwriting stroke analysis paired with neuromuscular alignment exercises.
              </p>
              <div className="pt-2">
                <span className="font-serif text-2xl font-bold text-navy">
                  From {SERVICES_PRICING.graphology.basic.formattedInr}
                </span>
                <span className="text-xs text-navy/60"> / handwriting report</span>
              </div>
            </div>
            <div className="pt-6 mt-4 border-t border-navy/10">
              <Link href="/services#graphology">
                <Button variant="outline" size="sm" className="w-full">
                  Learn Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
