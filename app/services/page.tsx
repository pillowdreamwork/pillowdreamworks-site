import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { SERVICES_PRICING } from "@/data/pricing";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { Phone, Check, ShieldAlert, ArrowRight, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Clinical Services & Counselling — PillowDreamWorks Foundation",
  description:
    "Explore confidential 1-on-1 psychotherapy sessions, emergency crisis stabilization calls, CentreLine support, graphotherapy, and psychology courses.",
};

function getWhatsAppLink(message: string) {
  return `${FOUNDER_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3.5 py-1.5 rounded-full border border-[#24483B]/10">
            Clinical Care & Consultations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#202923] leading-tight">
            The Consulting Rooms
          </h1>
          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Personalized, confidential clinical guidance tailored to your emotional goals, crisis stabilization, and subconscious realignment.
          </p>
        </div>

        {/* 1. 1-on-1 Counselling Section */}
        <section id="counselling" className="mb-24 scroll-mt-24">
          <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#24483B]/10 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#24483B]/10">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#24483B] font-semibold block">
                  ROOM 01 · INDIVIDUAL CARE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#202923]">
                  1-on-1 Counselling Sessions
                </h2>
                <p className="text-sm text-[#202923]/70 max-w-xl leading-relaxed">
                  Evidence-based, 50-minute clinical consultations for cognitive restructuring, emotional regulation, anxiety, and boundary architecture.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#24483B] bg-white/70 px-4 py-2 rounded-full border border-[#24483B]/10 self-start md:self-center font-semibold">
                <Clock className="w-4 h-4" />
                <span>50-Min Video Consultations</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Single Session */}
              <div className="bg-[#FDFBF7] rounded-2xl p-7 border border-[#24483B]/10 flex flex-col justify-between hover:border-[#24483B]/30 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#24483B] block">
                    Single Consultation
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#202923]">
                    {SERVICES_PRICING.counselling.singleSession.title}
                  </h3>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {SERVICES_PRICING.counselling.singleSession.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#24483B]/10">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#202923]">
                      {SERVICES_PRICING.counselling.singleSession.formattedInr}
                    </span>
                    <span className="text-xs text-[#202923]/60 font-sans">
                      ({SERVICES_PRICING.counselling.singleSession.formattedUsd})
                    </span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to schedule a 1-on-1 Single Counselling Session.")}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    <span>Book 1 Session</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Package 4 */}
              <div className="bg-[#FDFBF7] rounded-2xl p-7 border border-[#24483B]/10 flex flex-col justify-between hover:border-[#24483B]/30 hover:shadow-md transition-all relative">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#24483B] block">
                    Month-Long Progress
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#202923]">
                    {SERVICES_PRICING.counselling.package4.title}
                  </h3>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {SERVICES_PRICING.counselling.package4.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#24483B]/10">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#202923]">
                      {SERVICES_PRICING.counselling.package4.formattedInr}
                    </span>
                    <span className="text-xs text-[#202923]/60 font-sans">
                      ({SERVICES_PRICING.counselling.package4.formattedUsd})
                    </span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to inquire about the 4-Session Counselling Package.")}
                    variant="secondary"
                    size="md"
                    className="w-full"
                  >
                    <span>Select 4 Sessions</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Package 8 */}
              <div className="bg-[#24483B] text-[#FDFBF7] rounded-2xl p-7 border border-white/10 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A46A] block">
                    Deep Transformation
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#FDFBF7]">
                    {SERVICES_PRICING.counselling.package8.title}
                  </h3>
                  <p className="text-xs text-[#FDFBF7]/75 leading-relaxed font-sans">
                    {SERVICES_PRICING.counselling.package8.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-white/15">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C6A46A]">
                      {SERVICES_PRICING.counselling.package8.formattedInr}
                    </span>
                    <span className="text-xs text-[#FDFBF7]/70 font-sans">
                      ({SERVICES_PRICING.counselling.package8.formattedUsd})
                    </span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to reserve the 8-Session Deep Transformation Counselling Package.")}
                    variant="gold"
                    size="md"
                    className="w-full"
                  >
                    <span>Select 8 Sessions</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </LiquidGlassButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Crisis & CentreLine Section */}
        <section id="crisis" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crisis Call */}
            <div className="bg-[#8B2626]/5 rounded-3xl p-8 sm:p-10 border border-[#8B2626]/20 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2626] bg-[#8B2626]/10 px-3 py-1 rounded-full border border-[#8B2626]/20">
                    Immediate De-escalation
                  </span>
                  <span className="text-xs font-mono text-[#8B2626] font-bold">Rapid Response</span>
                </div>

                <h3 className="font-serif text-3xl font-normal text-[#202923]">
                  {SERVICES_PRICING.crisis.call.title}
                </h3>

                <p className="text-sm text-[#202923]/80 leading-relaxed font-sans">
                  {SERVICES_PRICING.crisis.call.description}
                </p>

                <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#8B2626]/15 text-xs text-[#202923]/80 space-y-2">
                  <div className="font-semibold text-[#8B2626] flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Free National Emergency Hotlines (24/7):</span>
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed">
                    India: 14416 (Tele-MANAS) • KIRAN: 1800-599-0019 • US/Canada: 988 • UK: 111 / 999
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#8B2626]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#8B2626]">
                    {SERVICES_PRICING.crisis.call.formattedInr}
                  </span>
                  <span className="text-xs text-[#202923]/60 ml-1">
                    ({SERVICES_PRICING.crisis.call.formattedUsd})
                  </span>
                </div>

                <LiquidGlassButton
                  href={getWhatsAppLink("URGENT: Requesting Immediate Crisis De-escalation Call.")}
                  variant="vermilion"
                  size="md"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  <span>Request Stabilization</span>
                </LiquidGlassButton>
              </div>
            </div>

            {/* CentreLine */}
            <div id="centreline" className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-10 border border-[#24483B]/15 flex flex-col justify-between space-y-6 scroll-mt-24">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#24483B] bg-[#DCE7DD]/60 px-3 py-1 rounded-full border border-[#24483B]/10">
                  Ongoing Support
                </span>

                <h3 className="font-serif text-3xl font-normal text-[#202923]">
                  {SERVICES_PRICING.crisis.centreLine.title}
                </h3>

                <p className="text-sm text-[#202923]/75 leading-relaxed font-sans">
                  {SERVICES_PRICING.crisis.centreLine.description}
                </p>

                <div className="space-y-2 pt-2 text-xs text-[#202923]/80">
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

              <div className="pt-6 border-t border-[#24483B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#202923]">
                    {SERVICES_PRICING.crisis.centreLine.formattedInr}
                  </span>
                  <span className="text-xs text-[#202923]/60 ml-1">
                    ({SERVICES_PRICING.crisis.centreLine.formattedUsd})
                  </span>
                </div>

                <LiquidGlassButton
                  href={getWhatsAppLink("Hello Manish, I would like to apply for CentreLine Ongoing Async Guidance.")}
                  variant="primary"
                  size="md"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>Join CentreLine</span>
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Graphotherapy Section */}
        <section id="graphology" className="mb-24 scroll-mt-24">
          <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-12 border border-[#24483B]/15 shadow-sm space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#24483B] font-semibold block">
                Subconscious Handwriting Analysis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#202923]">
                Graphotherapy & Handwriting Realignment
              </h2>
              <p className="text-sm text-[#202923]/70 max-w-2xl leading-relaxed">
                Discover how stroke patterns, margins, pressure, and letter formations reflect your subconscious emotional defenses and learn targeted realignment strokes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Basic */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.basic.title}
                  </h4>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {SERVICES_PRICING.graphology.basic.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#24483B]/10 space-y-3">
                  <div className="font-serif text-xl font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.basic.formattedInr} <span className="text-xs font-sans font-normal text-[#202923]/60">({SERVICES_PRICING.graphology.basic.formattedUsd})</span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to order the Basic Graphotherapy Handwriting Review.")}
                    variant="subtle"
                    size="sm"
                    className="w-full"
                  >
                    <span>Order Basic Review</span>
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Standard */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.standard.title}
                  </h4>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {SERVICES_PRICING.graphology.standard.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#24483B]/10 space-y-3">
                  <div className="font-serif text-xl font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.standard.formattedInr} <span className="text-xs font-sans font-normal text-[#202923]/60">({SERVICES_PRICING.graphology.standard.formattedUsd})</span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to order the Standard Graphotherapy Analysis Dossier.")}
                    variant="subtle"
                    size="sm"
                    className="w-full"
                  >
                    <span>Order Standard</span>
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Deep */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.deep.title}
                  </h4>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {SERVICES_PRICING.graphology.deep.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#24483B]/10 space-y-3">
                  <div className="font-serif text-xl font-bold text-[#202923]">
                    {SERVICES_PRICING.graphology.deep.formattedInr} <span className="text-xs font-sans font-normal text-[#202923]/60">({SERVICES_PRICING.graphology.deep.formattedUsd})</span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to order the Comprehensive Deep Graphotherapy Analysis.")}
                    variant="subtle"
                    size="sm"
                    className="w-full"
                  >
                    <span>Order Deep Analysis</span>
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Master Package */}
              <div className="p-6 rounded-2xl bg-[#24483B] text-[#FDFBF7] border border-white/10 flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A46A]">
                    Launch Edition Bundle
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#FDFBF7]">
                    {SERVICES_PRICING.graphology.masterPackage.title}
                  </h4>
                  <p className="text-xs text-[#FDFBF7]/75 leading-relaxed font-sans">
                    Deep Analysis + Finding The Centre + Toolkit + Tracking Plan.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/15 space-y-3">
                  <div>
                    <span className="text-xs text-[#FDFBF7]/50 line-through block">Value ₹4,471</span>
                    <span className="font-serif text-2xl font-bold text-[#C6A46A]">
                      {SERVICES_PRICING.graphology.masterPackage.formattedInr}
                    </span>
                    <span className="text-xs text-[#FDFBF7]/70 font-sans ml-1">
                      ({SERVICES_PRICING.graphology.masterPackage.formattedUsd})
                    </span>
                  </div>
                  <LiquidGlassButton
                    href={getWhatsAppLink("Hello PillowDreamWorks, I would like to acquire the Complete Master Graphology Bundle.")}
                    variant="gold"
                    size="sm"
                    className="w-full"
                  >
                    <span>Acquire Master Bundle</span>
                  </LiquidGlassButton>
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
            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/10 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#24483B] font-semibold block">Curriculum 01</span>
                <h4 className="font-serif text-xl font-bold text-[#202923]">
                  {SERVICES_PRICING.courses.crisisCounselling.title}
                </h4>
                <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                  De-escalation mechanics, suicide safety planning, and emotional stabilization methodologies.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#24483B]/10 flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-[#202923]">
                  {SERVICES_PRICING.courses.crisisCounselling.formattedInr} ({SERVICES_PRICING.courses.crisisCounselling.formattedUsd})
                </span>
                <LiquidGlassButton
                  href={getWhatsAppLink("Hello PillowDreamWorks, I would like to enroll in the Crisis Counselling Masterclass.")}
                  variant="subtle"
                  size="sm"
                >
                  <span>Enroll</span>
                </LiquidGlassButton>
              </div>
            </div>

            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/10 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#24483B] font-semibold block">Curriculum 02</span>
                <h4 className="font-serif text-xl font-bold text-[#202923]">
                  {SERVICES_PRICING.courses.cognitiveCounselling.title}
                </h4>
                <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                  Cognitive distortions, core belief disputation, and behavioral modification frameworks.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#24483B]/10 flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-[#202923]">
                  {SERVICES_PRICING.courses.cognitiveCounselling.formattedInr} ({SERVICES_PRICING.courses.cognitiveCounselling.formattedUsd})
                </span>
                <LiquidGlassButton
                  href={getWhatsAppLink("Hello PillowDreamWorks, I would like to enroll in the Cognitive Counselling Masterclass.")}
                  variant="subtle"
                  size="sm"
                >
                  <span>Enroll</span>
                </LiquidGlassButton>
              </div>
            </div>

            <div className="bg-[#24483B] text-[#FDFBF7] rounded-2xl p-7 border border-white/10 flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A46A] font-semibold block">Complete Bundle</span>
                <h4 className="font-serif text-xl font-bold text-[#FDFBF7]">
                  {SERVICES_PRICING.courses.bundle.title}
                </h4>
                <p className="text-xs text-[#FDFBF7]/75 leading-relaxed font-sans">
                  Access both Crisis and Cognitive counselling masterclasses with all workbook resources.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/15 flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-[#C6A46A]">
                  {SERVICES_PRICING.courses.bundle.formattedInr} ({SERVICES_PRICING.courses.bundle.formattedUsd})
                </span>
                <LiquidGlassButton
                  href={getWhatsAppLink("Hello PillowDreamWorks, I would like to acquire the Complete Counselling Masterclasses Bundle.")}
                  variant="gold"
                  size="sm"
                >
                  <span>Get Bundle</span>
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
