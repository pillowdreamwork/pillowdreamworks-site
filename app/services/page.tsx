"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { TherapeuticSanctuaryCanvas } from "@/components/3d/therapeutic-sanctuary-canvas";
import { SERVICES_PRICING, CHECKOUT_NOTICE } from "@/data/pricing";
import {
  Phone,
  Check,
  Info,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Compass,
  HeartHandshake,
  PenTool,
  GraduationCap,
} from "lucide-react";

export default function ServicesPage() {
  const [show3d, setShow3d] = React.useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A2A4A] py-12 sm:py-20">
      <Container>
        {/* Header & Editorial Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8FA89E]/20 text-[#24483B] text-xs font-semibold tracking-wide border border-[#8FA89E]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#24483B]" />
            <span>Clinical Care &amp; Ongoing Guidance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A2A4A]">
            Services &amp; Therapeutic Support
          </h1>
          <p className="text-base sm:text-lg text-[#1A2A4A]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Personalized, confidential guidance tailored to your emotional goals, scheduled stabilisation support, and structured reflection.
          </p>
        </div>

        {/* 3D Therapeutic Sanctuary Console */}
        <div className="bg-[#F5F1E9]/80 backdrop-blur-2xl border border-[#24483B]/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#24483B]/10 pb-4">
            <div>
              <div className="text-xs font-semibold text-[#24483B] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#24483B]" />
                <span>Interactive 3D Sanctuary</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2A4A] mt-0.5">
                Pillars of Clinical Care
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => setShow3d(!show3d)}
                variant="outline"
                size="sm"
              >
                <span>{show3d ? "Hide 3D Space" : "Show 3D Space"}</span>
              </Button>
            </div>
          </div>

          {show3d && (
            <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#F5F1E9]/40 to-[#FAF9F5]/70 border border-[#24483B]/10">
              <TherapeuticSanctuaryCanvas onSelectSculpture={scrollToSection} />
            </div>
          )}

          {/* Quick Navigator Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("counselling")}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#24483B]/15 hover:border-[#24483B]/30 transition-all text-left group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#24483B]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>1-on-1 Counselling</span>
              </div>
              <p className="text-[11px] text-[#1A2A4A]/60 mt-1">From ₹799 ($69)</p>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("crisis")}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#24483B]/15 hover:border-[#24483B]/30 transition-all text-left group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B2626]">
                <Phone className="w-3.5 h-3.5" />
                <span>Crisis &amp; CentreLine</span>
              </div>
              <p className="text-[11px] text-[#1A2A4A]/60 mt-1">Scheduled call &amp; check-ins</p>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("graphology")}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#24483B]/15 hover:border-[#24483B]/30 transition-all text-left group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880]">
                <PenTool className="w-3.5 h-3.5" />
                <span>Graphotherapy</span>
              </div>
              <p className="text-[11px] text-[#1A2A4A]/60 mt-1">From ₹1,499 ($99)</p>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("courses")}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#24483B]/15 hover:border-[#24483B]/30 transition-all text-left group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A2A4A]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Masterclasses</span>
              </div>
              <p className="text-[11px] text-[#1A2A4A]/60 mt-1">Curricula &amp; Bundles</p>
            </button>
          </div>
        </div>

        {/* 1. 1-on-1 Counselling Section */}
        <section id="counselling" className="mb-24 scroll-mt-24">
          <div className="bg-[#F5F1E9] rounded-3xl p-8 sm:p-12 border border-[#24483B]/15 shadow-sm space-y-8">
            <div className="space-y-2">
              <Badge variant="navy">Individual Care</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2A4A]">
                1-on-1 Counselling Sessions
              </h2>
              <p className="text-sm text-[#1A2A4A]/70 max-w-xl">
                Evidence-based, 50-minute clinical consultations for cognitive restructuring, emotional regulation, anxiety, and boundary architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Single Session */}
              <TiltCard maxTilt={5}>
                <div className="h-full bg-[#FAF9F5] rounded-3xl p-7 border border-[#24483B]/15 flex flex-col justify-between hover:border-[#24483B]/35 shadow-xs">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#24483B] block">
                      Single Consultation
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.counselling.singleSession.title}
                    </h3>
                    <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                      {SERVICES_PRICING.counselling.singleSession.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#24483B]/10">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-[#1A2A4A]">
                        {SERVICES_PRICING.counselling.singleSession.formattedInr}
                      </span>
                      <span className="text-xs text-[#1A2A4A]/60 font-sans">
                        ({SERVICES_PRICING.counselling.singleSession.formattedUsd})
                      </span>
                    </div>
                    <Button asChild variant="primary" className="w-full">
                      <Link href="/contact">Book 1 Session</Link>
                    </Button>
                  </div>
                </div>
              </TiltCard>

              {/* Package 4 */}
              <TiltCard maxTilt={5}>
                <div className="h-full bg-[#FAF9F5] rounded-3xl p-7 border border-[#24483B]/15 flex flex-col justify-between hover:border-[#24483B]/35 shadow-xs">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#24483B] block">
                      Month-Long Progress
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.counselling.package4.title}
                    </h3>
                    <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                      {SERVICES_PRICING.counselling.package4.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#24483B]/10">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-[#1A2A4A]">
                        {SERVICES_PRICING.counselling.package4.formattedInr}
                      </span>
                      <span className="text-xs text-[#1A2A4A]/60 font-sans">
                        ({SERVICES_PRICING.counselling.package4.formattedUsd})
                      </span>
                    </div>
                    <Button asChild variant="secondary" className="w-full">
                      <Link href="/contact">Select 4 Sessions</Link>
                    </Button>
                  </div>
                </div>
              </TiltCard>

              {/* Package 8 */}
              <TiltCard maxTilt={5}>
                <div className="h-full bg-[#151C17] text-[#FAF9F5] rounded-3xl p-7 border border-white/20 flex flex-col justify-between shadow-xl">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] block">
                      Deep Transformation
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#FAF9F5]">
                      {SERVICES_PRICING.counselling.package8.title}
                    </h3>
                    <p className="text-xs text-[#FAF9F5]/75 leading-relaxed font-sans">
                      {SERVICES_PRICING.counselling.package8.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/15">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-[#C5A880]">
                        {SERVICES_PRICING.counselling.package8.formattedInr}
                      </span>
                      <span className="text-xs text-[#FAF9F5]/70 font-sans">
                        ({SERVICES_PRICING.counselling.package8.formattedUsd})
                      </span>
                    </div>
                    <Button asChild variant="gold" className="w-full">
                      <Link href="/contact">Select 8 Sessions</Link>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* 2. Crisis & CentreLine Section */}
        <section id="crisis" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crisis Call */}
            <TiltCard maxTilt={4}>
              <div className="h-full bg-red-50/70 rounded-3xl p-8 sm:p-10 border border-red-900/15 flex flex-col justify-between space-y-6 shadow-xs">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="crisis">Scheduled Support Call</Badge>
                    <span className="text-xs font-semibold text-red-900">Not an emergency-response service</span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-red-950">
                    {SERVICES_PRICING.crisis.call.title}
                  </h3>

                  <p className="text-sm text-[#1A2A4A]/80 leading-relaxed font-sans">
                    {SERVICES_PRICING.crisis.call.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF9F5]/90 border border-red-900/10 text-xs text-[#1A2A4A]/80 space-y-2">
                    <div className="font-semibold text-red-950 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>National crisis helplines:</span>
                    </div>
                    <ul className="space-y-1 font-mono text-[11px]">
                      <li><strong>India — Tele-MANAS:</strong> 14416</li>
                      <li><strong>India — Vandrevala Foundation:</strong> +91 9999 666 555</li>
                      <li><strong>United States — 988 Suicide &amp; Crisis Lifeline:</strong> 988</li>
                    </ul>
                    <p className="text-[11px] text-[#1A2A4A]/60 font-sans">
                      If you are in immediate danger, contact your local emergency number.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-red-900/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-serif text-3xl font-bold text-red-900">
                      {SERVICES_PRICING.crisis.call.formattedInr}
                    </span>
                    <span className="text-xs text-[#1A2A4A]/60 ml-1">
                      ({SERVICES_PRICING.crisis.call.formattedUsd})
                    </span>
                  </div>

                  <Button asChild variant="crisis">
                    <Link href="/contact">Request Stabilisation Call</Link>
                  </Button>
                </div>
              </div>
            </TiltCard>

            {/* CentreLine */}
            <TiltCard maxTilt={4}>
              <div id="centreline" className="h-full bg-[#F5F1E9] rounded-3xl p-8 sm:p-10 border border-[#24483B]/15 flex flex-col justify-between space-y-6 scroll-mt-24 shadow-xs">
                <div className="space-y-4">
                  <Badge variant="sage">Ongoing Support</Badge>

                  <h3 className="font-serif text-3xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.crisis.centreLine.title}
                  </h3>

                  <p className="text-sm text-[#1A2A4A]/75 leading-relaxed font-sans">
                    {SERVICES_PRICING.crisis.centreLine.description}
                  </p>

                  <div className="space-y-2.5 pt-2 text-xs text-[#1A2A4A]/80 font-sans">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#24483B] shrink-0" />
                      <span>Steady, non-judgmental founder-led check-ins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#24483B] shrink-0" />
                      <span>Designed for ongoing emotional poise between life transitions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#24483B] shrink-0" />
                      <span>Parental/guardian consent required for minors under 18</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#24483B]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-serif text-3xl font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.crisis.centreLine.formattedInr}
                    </span>
                    <span className="text-xs text-[#1A2A4A]/60 ml-1">
                      ({SERVICES_PRICING.crisis.centreLine.formattedUsd})
                    </span>
                  </div>

                  <Button asChild variant="secondary">
                    <Link href="/contact">Join CentreLine</Link>
                  </Button>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* 3. Graphotherapy Section */}
        <section id="graphology" className="mb-24 scroll-mt-24">
          <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-[#24483B]/15 shadow-sm space-y-8">
            <div className="space-y-2">
              <Badge variant="gold">Subconscious Handwriting Analysis</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2A4A]">
                Graphotherapy &amp; Handwriting Realignment
              </h2>
              <p className="text-sm text-[#1A2A4A]/70 max-w-2xl font-sans">
                Discover how stroke patterns, margins, pressure, and letter formations reflect your subconscious emotional defenses and learn targeted realignment strokes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic */}
              <TiltCard maxTilt={5}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#F5F1E9] border border-[#24483B]/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.graphology.basic.title}
                    </h4>
                    <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                      {SERVICES_PRICING.graphology.basic.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#24483B]/10 font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.graphology.basic.formattedInr}{" "}
                    <span className="text-xs font-sans font-normal text-[#1A2A4A]/60">
                      ({SERVICES_PRICING.graphology.basic.formattedUsd})
                    </span>
                  </div>
                </div>
              </TiltCard>

              {/* Standard */}
              <TiltCard maxTilt={5}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#F5F1E9] border border-[#24483B]/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.graphology.standard.title}
                    </h4>
                    <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                      {SERVICES_PRICING.graphology.standard.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#24483B]/10 font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.graphology.standard.formattedInr}{" "}
                    <span className="text-xs font-sans font-normal text-[#1A2A4A]/60">
                      ({SERVICES_PRICING.graphology.standard.formattedUsd})
                    </span>
                  </div>
                </div>
              </TiltCard>

              {/* Deep */}
              <TiltCard maxTilt={5}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#F5F1E9] border border-[#24483B]/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-[#1A2A4A]">
                      {SERVICES_PRICING.graphology.deep.title}
                    </h4>
                    <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                      {SERVICES_PRICING.graphology.deep.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#24483B]/10 font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.graphology.deep.formattedInr}{" "}
                    <span className="text-xs font-sans font-normal text-[#1A2A4A]/60">
                      ({SERVICES_PRICING.graphology.deep.formattedUsd})
                    </span>
                  </div>
                </div>
              </TiltCard>
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
            <TiltCard maxTilt={5}>
              <div className="h-full bg-[#F5F1E9] rounded-3xl p-7 border border-[#24483B]/10 flex flex-col justify-between">
                <div className="space-y-3">
                  <Badge variant="navy">Curriculum 01</Badge>
                  <h4 className="font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.courses.crisisCounselling.title}
                  </h4>
                  <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                    De-escalation mechanics, suicide safety planning, and emotional stabilization methodologies.
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#24483B]/10 flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.courses.crisisCounselling.formattedInr} ({SERVICES_PRICING.courses.crisisCounselling.formattedUsd})
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Enroll</Link>
                  </Button>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={5}>
              <div className="h-full bg-[#F5F1E9] rounded-3xl p-7 border border-[#24483B]/10 flex flex-col justify-between">
                <div className="space-y-3">
                  <Badge variant="navy">Curriculum 02</Badge>
                  <h4 className="font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.courses.cognitiveCounselling.title}
                  </h4>
                  <p className="text-xs text-[#1A2A4A]/70 leading-relaxed font-sans">
                    Cognitive distortions, core belief disputation, and behavioral modification frameworks.
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#24483B]/10 flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#1A2A4A]">
                    {SERVICES_PRICING.courses.cognitiveCounselling.formattedInr} ({SERVICES_PRICING.courses.cognitiveCounselling.formattedUsd})
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Enroll</Link>
                  </Button>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={5}>
              <div className="h-full bg-[#151C17] text-[#FAF9F5] rounded-3xl p-7 border border-white/20 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <Badge variant="gold">Complete Bundle</Badge>
                  <h4 className="font-serif text-xl font-bold text-[#FAF9F5]">
                    {SERVICES_PRICING.courses.bundle.title}
                  </h4>
                  <p className="text-xs text-[#FAF9F5]/70 leading-relaxed font-sans">
                    Access both Crisis and Cognitive counselling masterclasses with all workbook resources.
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-white/15 flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#C5A880]">
                    {SERVICES_PRICING.courses.bundle.formattedInr} ({SERVICES_PRICING.courses.bundle.formattedUsd})
                  </span>
                  <Button asChild variant="gold" size="sm">
                    <Link href="/contact">Get Bundle</Link>
                  </Button>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Checkout Status Notice */}
        <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#24483B]/15 flex items-start gap-3 text-sm text-[#1A2A4A]/80 shadow-xs">
          <Info className="w-4 h-4 text-[#24483B] shrink-0 mt-0.5" />
          <p className="font-sans">
            <strong className="text-[#1A2A4A]">{CHECKOUT_NOTICE}</strong> Booking and course buttons
            above open the enquiry form; payment is not yet available.
          </p>
        </div>
      </Container>
    </main>
  );
}
