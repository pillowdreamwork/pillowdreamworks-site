import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { ArrowUpRight, Compass, Heart, Shield, Sparkles, BookOpen, Users, Brain, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Foundation — PillowDreamWorks Foundation",
  description:
    "Discover the mission, vision, core goals, and values of PillowDreamWorks Foundation, an educational psychology and wellbeing resource ecosystem founded by Manish Garg.",
};

const VALUES = [
  { icon: Heart, name: "Compassion", desc: "Approaching every individual's emotional landscape with empathy, dignity, and warmth." },
  { icon: Sparkles, name: "Accessibility", desc: "Removing jargon and making transformative psychological tools clear, practical, and available." },
  { icon: Brain, name: "Curiosity", desc: "Encouraging open-ended inquiry into our subconscious patterns without shame or rigidity." },
  { icon: Users, name: "Inclusion", desc: "Designing thoughtful resources suitable for diverse ages, backgrounds, and life stages." },
  { icon: Shield, name: "Privacy", desc: "Protecting individual confidentiality with private, non-invasive digital and offline tools." },
  { icon: Compass, name: "Personal Autonomy", desc: "Empowering individuals to direct their own growth, reflection, and inner development." },
  { icon: Eye, name: "Transparency", desc: "Honest disclosures regarding what our educational tools can and cannot do." },
  { icon: BookOpen, name: "Ethical Responsibility", desc: "Holding our publications and practices to rigorous ethical and non-harm standards." },
];

const GOALS = [
  { num: "01", title: "Improve Psychological Literacy", desc: "Demystify complex psychological concepts into accessible everyday language and actionable mental frameworks." },
  { num: "02", title: "Encourage Self-Awareness & Reflection", desc: "Provide reflective workbooks and blank canvases that facilitate deep, structured self-inquiry." },
  { num: "03", title: "Accessibility Across Age Groups", desc: "Make guided wellbeing tools available for children, teenagers, university students, and adults." },
  { num: "04", title: "Support Parents & Educators", desc: "Equip families and teachers with conversational exercises that build emotional resilience at home and in classrooms." },
  { num: "05", title: "Connect Knowledge with Everyday Practice", desc: "Bridge the gap between academic theory and practical, daily somatic and cognitive habits." },
  { num: "06", title: "Responsible & Transparent Resource Use", desc: "Foster clear understanding of psychological assessments as educational screening tools, not clinical diagnoses." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3.5 py-1.5 rounded-full border border-[#24483B]/10">
            About PillowDreamWorks Foundation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#202923] leading-tight">
            Calm on the surface. <br />
            <span className="italic text-[#24483B]">Ambition underneath.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            An educational and wellbeing resource ecosystem dedicated to making psychology and emotional wellbeing easier to understand, reflect upon, and apply in daily life.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="p-8 sm:p-12 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#24483B] font-semibold block">
                Our Mission
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#202923]">
                Translating Psychology into Daily Life
              </h2>
              <p className="text-base text-[#202923]/75 leading-relaxed font-sans">
                To make psychology and emotional wellbeing easier to understand and apply in everyday life through accessible learning, practical workbooks, reflective activities, and responsible wellbeing resources.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-12 rounded-2xl bg-[#24483B] text-[#FDFBF7] border border-white/10 space-y-4 shadow-md">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A46A] font-semibold block">
                Our Vision
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#FDFBF7]">
                A World of Curiosity & Less Stigma
              </h2>
              <p className="text-base text-[#FDFBF7]/80 leading-relaxed font-sans">
                A world where people can explore their thoughts, emotions, and personal growth with greater understanding, dignity, curiosity, and less stigma.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Founder Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#24483B] text-[#FDFBF7] rounded-2xl p-8 sm:p-10 shadow-2xl border border-white/10 space-y-6 w-full max-w-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6A46A]" />
                <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-[#C6A46A]/50 text-[#C6A46A] flex items-center justify-center font-serif text-3xl font-medium shadow-inner">
                  MG
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-[#FDFBF7]">
                    {FOUNDER_CONTACT.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#C6A46A] font-mono font-semibold">
                    {FOUNDER_CONTACT.title}
                  </p>
                </div>

                <p className="text-xs text-[#FDFBF7]/75 italic leading-relaxed font-serif px-2">
                  "True psychological strength is not the absence of emotion, but the ability to remain poised, curious, and deliberate while experiencing it."
                </p>

                <div className="pt-4 border-t border-white/10 flex justify-center items-center gap-4 text-xs font-mono">
                  <a
                    href={FOUNDER_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C6A46A] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    href={FOUNDER_CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C6A46A] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Instagram <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Col: The Founder Narrative */}
            <div className="lg:col-span-7 space-y-6 text-base text-[#202923]/80 leading-relaxed font-sans">
              <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono font-semibold block">
                The Narrative
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#202923] font-normal">
                Building an Educational Ecosystem
              </h2>
              <p>
                Modern self-help frequently fractures into two extremes: dense academic literature that remains locked behind university paywalls, or sensationalized wellness content that offers fleeting slogans without operational architecture.
              </p>
              <p>
                PillowDreamWorks was founded by Manish Garg to build a quiet, enduring alternative: rigorous behavioral psychology and reflective exercises published with the timeless care of an editorial press.
              </p>
              <p>
                From guided workbooks such as <strong className="text-[#202923] font-semibold">The Psychology Toolkit</strong> and <strong className="text-[#202923] font-semibold">Finding The Centre</strong> to our 177-scale educational assessment repository, every initiative is built around personal autonomy, self-discovery, and cognitive clarity.
              </p>
              <div className="p-6 rounded-xl bg-[#F5EFE6] border-l-4 border-[#C6A46A] text-[#202923] font-serif italic text-base leading-relaxed">
                "We position the foundation as an educational and wellbeing resource ecosystem — designed to empower people with clear scaffolds for self-reflection and personal becoming."
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Goals Section */}
        <section className="mb-24 py-16 px-8 sm:px-12 bg-[#F5EFE6]/60 border border-[#24483B]/10 rounded-3xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono font-semibold block mb-3">
              Core Direction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202923] font-normal">
              Our Key Objectives
            </h2>
            <p className="mt-3 text-sm text-[#202923]/70 font-sans">
              How we translate our vision into concrete, accessible contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOALS.map((goal) => (
              <div
                key={goal.num}
                className="p-6 rounded-xl bg-[#FDFBF7] border border-[#24483B]/10 space-y-2.5 shadow-xs"
              >
                <span className="text-xs font-mono font-bold text-[#C6A46A] block">
                  [{goal.num}]
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#202923]">
                  {goal.title}
                </h3>
                <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                  {goal.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono font-semibold block mb-3">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202923] font-normal">
              Values We Live By
            </h2>
            <p className="mt-3 text-sm text-[#202923]/70 font-sans">
              Eight unwavering standards that guide every workbook, assessment, and consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.name}
                  className="p-6 rounded-xl bg-[#FDFBF7] border border-[#24483B]/10 space-y-3 hover:border-[#24483B]/25 transition-all shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#DCE7DD]/60 flex items-center justify-center text-[#24483B]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#202923]">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Important Ethical Boundary Notice */}
        <section className="mb-20 p-8 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/15 text-sm text-[#202923]/80 leading-relaxed font-sans">
          <strong className="text-[#202923] font-serif text-base block mb-2">
            Professional & Ethical Boundary Notice
          </strong>
          <p className="mb-2">
            PillowDreamWorks Foundation is an educational and personal wellbeing resource ecosystem. Our publications, reflective exercises, and psychometric screening tools are created to foster psychological literacy and personal growth.
          </p>
          <p>
            They are not a replacement for clinical psychiatric evaluation, formal medical diagnosis, psychotherapy, or emergency crisis care. If you are experiencing acute distress or thoughts of self-harm, please connect immediately with certified emergency helplines such as 988 or 14416 (Tele-MANAS).
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center space-y-5 pt-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#202923]">
            Explore the Resources
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <LiquidGlassButton href="/books" variant="primary" size="md">
              <span>Browse Guided Books</span>
            </LiquidGlassButton>
            <LiquidGlassButton href="/contact" variant="secondary" size="md">
              <span>Direct Inquiries</span>
            </LiquidGlassButton>
          </div>
        </div>
      </Container>
    </main>
  );
}
