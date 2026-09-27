import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES_PRICING } from "@/data/pricing";
import { EMERGENCY_INFO } from "@/data/navigation";
import {
  HeartHandshake,
  PhoneCall,
  MessageSquareHeart,
  PenTool,
  GraduationCap,
  ShieldCheck,
  Phone,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Clinical Services & Counselling — PillowDreamWorks Foundation",
  description:
    "Explore confidential 1-on-1 psychotherapy sessions, emergency crisis stabilization calls, CentreLine support, graphotherapy, and psychology courses.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Clinical Care & Ongoing Guidance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Services & Therapeutic Support
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            Personalized, confidential clinical guidance tailored to your emotional goals, crisis stabilization, and subconscious realignment.
          </p>
        </div>

        {/* 1. 1-on-1 Counselling Section */}
        <section id="counselling" className="mb-24 scroll-mt-24">
          <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-navy/15 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="navy">Individual Care</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  1-on-1 Counselling Sessions
                </h2>
                <p className="text-sm text-navy/70 max-w-xl">
                  Evidence-based, 50-minute clinical consultations for cognitive restructuring, emotional regulation, anxiety, and boundary architecture.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Single Session */}
              <div className="bg-ivory rounded-2xl p-6 border border-navy/10 flex flex-col justify-between hover:border-navy/30 transition-all">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark block">
                    Single Consultation
                  </span>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    {SERVICES_PRICING.counselling.singleSession.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {SERVICES_PRICING.counselling.singleSession.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-navy/10 flex items-baseline justify-between">
                  <span className="font-serif text-2xl font-bold text-navy">
                    {SERVICES_PRICING.counselling.singleSession.formattedInr}
                  </span>
                  <span className="text-xs text-navy/60 font-sans">
                    ({SERVICES_PRICING.counselling.singleSession.formattedUsd})
                  </span>
                </div>
                <Button variant="primary" className="mt-4 w-full">
                  Book 1 Session
                </Button>
              </div>

              {/* Package 4 */}
              <div className="bg-ivory rounded-2xl p-6 border border-navy/10 flex flex-col justify-between hover:border-navy/30 transition-all relative">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark block">
                    Month-Long Progress
                  </span>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    {SERVICES_PRICING.counselling.package4.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {SERVICES_PRICING.counselling.package4.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-navy/10 flex items-baseline justify-between">
                  <span className="font-serif text-2xl font-bold text-navy">
                    {SERVICES_PRICING.counselling.package4.formattedInr}
                  </span>
                  <span className="text-xs text-navy/60 font-sans">
                    ({SERVICES_PRICING.counselling.package4.formattedUsd})
                  </span>
                </div>
                <Button variant="secondary" className="mt-4 w-full">
                  Select 4 Sessions
                </Button>
              </div>

              {/* Package 8 */}
              <div className="bg-navy text-ivory rounded-2xl p-6 border border-navy-light/40 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
                    Deep Transformation
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ivory">
                    {SERVICES_PRICING.counselling.package8.title}
                  </h3>
                  <p className="text-xs text-ivory/75 leading-relaxed">
                    {SERVICES_PRICING.counselling.package8.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-ivory/15 flex items-baseline justify-between">
                  <span className="font-serif text-2xl font-bold text-gold">
                    {SERVICES_PRICING.counselling.package8.formattedInr}
                  </span>
                  <span className="text-xs text-ivory/70 font-sans">
                    ({SERVICES_PRICING.counselling.package8.formattedUsd})
                  </span>
                </div>
                <Button variant="gold" className="mt-4 w-full">
                  Select 8 Sessions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Crisis & CentreLine Section */}
        <section id="crisis" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crisis Call */}
            <div className="bg-red-50/60 rounded-3xl p-8 sm:p-10 border border-red-900/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="crisis">Immediate De-escalation</Badge>
                  <span className="text-xs font-semibold text-red-900">Rapid Response</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-red-950">
                  {SERVICES_PRICING.crisis.call.title}
                </h3>

                <p className="text-sm text-navy/80 leading-relaxed">
                  {SERVICES_PRICING.crisis.call.description}
                </p>

                <div className="p-4 rounded-xl bg-ivory/80 border border-red-900/10 text-xs text-navy/80 space-y-2">
                  <div className="font-semibold text-red-950 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Free National Emergency Lines:</span>
                  </div>
                  <p>Tele-MANAS: 14416 • KIRAN: 1800-599-0019 • US: 988 • UK: 111</p>
                </div>
              </div>

              <div className="pt-6 border-t border-red-900/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-3xl font-bold text-red-900">
                    {SERVICES_PRICING.crisis.call.formattedInr}
                  </span>
                  <span className="text-xs text-navy/60 ml-1">
                    ({SERVICES_PRICING.crisis.call.formattedUsd})
                  </span>
                </div>

                <Button variant="crisis">Request Stabilization</Button>
              </div>
            </div>

            {/* CentreLine */}
            <div id="centreline" className="bg-cream rounded-3xl p-8 sm:p-10 border border-navy/15 flex flex-col justify-between space-y-6 scroll-mt-24">
              <div className="space-y-4">
                <Badge variant="sage">Ongoing Support</Badge>

                <h3 className="font-serif text-3xl font-bold text-navy">
                  {SERVICES_PRICING.crisis.centreLine.title}
                </h3>

                <p className="text-sm text-navy/75 leading-relaxed">
                  {SERVICES_PRICING.crisis.centreLine.description}
                </p>

                <div className="space-y-2 pt-2 text-xs text-navy/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                    <span>Steady, non-judgmental founder-led check-ins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                    <span>Designed for ongoing emotional poise between life transitions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                    <span>Parental/guardian consent required for minors under 18</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-3xl font-bold text-navy">
                    {SERVICES_PRICING.crisis.centreLine.formattedInr}
                  </span>
                  <span className="text-xs text-navy/60 ml-1">
                    ({SERVICES_PRICING.crisis.centreLine.formattedUsd})
                  </span>
                </div>

                <Button variant="secondary">Join CentreLine</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Graphotherapy Section */}
        <section id="graphology" className="mb-24 scroll-mt-24">
          <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-navy/15 shadow-sm space-y-8">
            <div className="space-y-2">
              <Badge variant="gold">Subconscious Handwriting Analysis</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Graphotherapy & Handwriting Realignment
              </h2>
              <p className="text-sm text-navy/70 max-w-2xl">
                Discover how stroke patterns, margins, pressure, and letter formations reflect your subconscious emotional defenses and learn targeted realignment strokes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Basic */}
              <div className="p-6 rounded-2xl bg-cream border border-navy/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-navy">
                    {SERVICES_PRICING.graphology.basic.title}
                  </h4>
                  <p className="text-xs text-navy/70">
                    {SERVICES_PRICING.graphology.basic.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-navy/10 font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.graphology.basic.formattedInr} <span className="text-xs font-sans font-normal text-navy/60">({SERVICES_PRICING.graphology.basic.formattedUsd})</span>
                </div>
              </div>

              {/* Standard */}
              <div className="p-6 rounded-2xl bg-cream border border-navy/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-navy">
                    {SERVICES_PRICING.graphology.standard.title}
                  </h4>
                  <p className="text-xs text-navy/70">
                    {SERVICES_PRICING.graphology.standard.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-navy/10 font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.graphology.standard.formattedInr} <span className="text-xs font-sans font-normal text-navy/60">({SERVICES_PRICING.graphology.standard.formattedUsd})</span>
                </div>
              </div>

              {/* Deep */}
              <div className="p-6 rounded-2xl bg-cream border border-navy/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-navy">
                    {SERVICES_PRICING.graphology.deep.title}
                  </h4>
                  <p className="text-xs text-navy/70">
                    {SERVICES_PRICING.graphology.deep.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-navy/10 font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.graphology.deep.formattedInr} <span className="text-xs font-sans font-normal text-navy/60">({SERVICES_PRICING.graphology.deep.formattedUsd})</span>
                </div>
              </div>

              {/* Master Package */}
              <div className="p-6 rounded-2xl bg-navy text-ivory border border-navy-light/40 flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                    Launch Edition
                  </span>
                  <h4 className="font-serif text-lg font-bold text-ivory">
                    {SERVICES_PRICING.graphology.masterPackage.title}
                  </h4>
                  <p className="text-xs text-ivory/70">
                    Deep Analysis + Finding The Centre + Toolkit + Tracking Plan.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-ivory/15">
                  <span className="text-xs text-ivory/50 line-through block">Value ₹4,471</span>
                  <span className="font-serif text-2xl font-bold text-gold">
                    {SERVICES_PRICING.graphology.masterPackage.formattedInr}
                  </span>
                  <span className="text-xs text-ivory/70 font-sans ml-1">
                    ({SERVICES_PRICING.graphology.masterPackage.formattedUsd})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Psychology Courses */}
        <section id="courses" className="mb-16 scroll-mt-24">
          <SectionHeading
            eyebrow="Specialized Psychoeducational Training"
            title="Psychology Courses & Masterclasses"
            description="Self-paced, structured curricula for learners, coaches, and peer counselors."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream rounded-2xl p-7 border border-navy/10 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="navy">Curriculum 01</Badge>
                <h4 className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.courses.crisisCounselling.title}
                </h4>
                <p className="text-xs text-navy/70 leading-relaxed">
                  De-escalation mechanics, suicide safety planning, and emotional stabilization methodologies.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-navy/10 flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.courses.crisisCounselling.formattedInr} ({SERVICES_PRICING.courses.crisisCounselling.formattedUsd})
                </span>
                <Button variant="outline" size="sm">Enroll</Button>
              </div>
            </div>

            <div className="bg-cream rounded-2xl p-7 border border-navy/10 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="navy">Curriculum 02</Badge>
                <h4 className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.courses.cognitiveCounselling.title}
                </h4>
                <p className="text-xs text-navy/70 leading-relaxed">
                  Cognitive distortions, core belief disputation, and behavioral modification frameworks.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-navy/10 flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-navy">
                  {SERVICES_PRICING.courses.cognitiveCounselling.formattedInr} ({SERVICES_PRICING.courses.cognitiveCounselling.formattedUsd})
                </span>
                <Button variant="outline" size="sm">Enroll</Button>
              </div>
            </div>

            <div className="bg-navy text-ivory rounded-2xl p-7 border border-navy-light/40 flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <Badge variant="gold">Complete Bundle</Badge>
                <h4 className="font-serif text-xl font-bold text-ivory">
                  {SERVICES_PRICING.courses.bundle.title}
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Access both Crisis and Cognitive counselling masterclasses with all workbook resources.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-ivory/15 flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-gold">
                  {SERVICES_PRICING.courses.bundle.formattedInr} ({SERVICES_PRICING.courses.bundle.formattedUsd})
                </span>
                <Button variant="gold" size="sm">Get Bundle</Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
