"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { TiltCard } from "@/components/ui/tilt-card";
import { TherapeuticSanctuaryCanvas } from "@/components/3d/therapeutic-sanctuary-canvas";
import { SERVICES_PRICING, CHECKOUT_NOTICE } from "@/data/pricing";
import {
  Phone,
  Check,
  Info,

  Compass,
  HeartHandshake,
  PenTool,
  GraduationCap,
} from "lucide-react";

/* ─── Scroll-reveal hook ─── */
function useScrollReveal(threshold = 0.12) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ServicesPage() {
  const hero = useScrollReveal(0.1);
  const counselling = useScrollReveal();
  const crisis = useScrollReveal();
  const graphology = useScrollReveal();
  const courses = useScrollReveal();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-ink relative overflow-hidden">

      {/* ═══ Ambient Background Orbs — Premium Glass Depth ═══ */}
      <div className="ambient-orb ambient-orb-sage w-[600px] h-[600px] top-[-120px] right-[-200px] animate-orb-drift" />
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-[40%] left-[-250px] animate-orb-drift" style={{ animationDelay: "-4s" }} />
      <div className="ambient-orb ambient-orb-vermilion w-[400px] h-[400px] bottom-[10%] right-[-150px] animate-orb-drift" style={{ animationDelay: "-8s" }} />
      <div className="ambient-orb ambient-orb-ivory w-[700px] h-[700px] top-[20%] left-[30%] animate-pulse-glow" />

      <div className="relative z-10 py-12 sm:py-20">
        <Container>

          {/* ═══════════════════════════════════════════════════════════════
               Hero — Premium Glassmorphism Editorial Header
             ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={hero.ref}
            className={`text-center max-w-4xl mx-auto space-y-6 mb-16 transition-all duration-1000 ease-out ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Vermilion-accented badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-hero-panel text-forest text-xs font-semibold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion shadow-[0_0_8px_rgba(232,93,63,0.7)]" />
              </span>
              <span>Clinical Care & Ongoing Guidance</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              Services & Therapeutic Support
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl mx-auto">
              Personalized, confidential guidance tailored to your emotional goals, scheduled stabilisation support, and structured reflection.
            </p>

            {/* Decorative vermilion rule */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-12 h-px bg-sage" />
              <div className="w-2 h-2 rounded-full bg-vermilion animate-pulse-glow" />
              <div className="w-12 h-px bg-sage" />
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               3D Therapeutic Sanctuary — Premium Glass Console
             ═══════════════════════════════════════════════════════════════ */}
          <div className="glass-3d-console rounded-3xl p-6 sm:p-8 space-y-6 mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forest/10 pb-4">
              <div>
                <div className="text-xs font-semibold text-forest uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-forest" />
                  <span>Interactive 3D Sanctuary</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-0.5">
                  Pillars of Clinical Care
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <LiquidGlassButton href="#counselling" variant="secondary" size="sm">
                  Jump to Counselling
                </LiquidGlassButton>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-forest/8" style={{ background: "linear-gradient(to bottom, rgba(245,239,230,0.4), rgba(253,251,247,0.7))" }}>
              <TherapeuticSanctuaryCanvas onSelectSculpture={scrollToSection} />
            </div>

            {/* Quick Navigator Tabs — premium glass pill cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <Link href="#counselling" className="block">
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="p-4 rounded-2xl glass-content-card text-left group cursor-pointer h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-semibold text-forest">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>1-on-1 Counselling</span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1.5 font-sans">{SERVICES_PRICING.crisis.centreLine.formattedInr}</p>
                      <div className="mt-auto w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-sage to-forest mt-2 transition-all duration-500" />
                    </div>
                  </TiltCard>
              </Link>

              <Link href="#crisis" className="block">
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="p-4 rounded-2xl glass-content-card text-left group cursor-pointer h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-semibold text-crisis">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Crisis & CentreLine</span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1.5 font-sans">Scheduled call & check-ins</p>
                      <div className="mt-auto w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-vermilion/60 to-crisis mt-2 transition-all duration-500" />
                    </div>
                  </TiltCard>
              </Link>

              <Link href="#graphology" className="block">
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="p-4 rounded-2xl glass-content-card text-left group cursor-pointer h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gold-dark">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Graphotherapy</span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1.5 font-sans">From ₹1,499 ($99)</p>
                      <div className="mt-auto w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold to-gold-dark mt-2 transition-all duration-500" />
                    </div>
                  </TiltCard>
              </Link>

              <Link href="#courses" className="block">
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="p-4 rounded-2xl glass-content-card text-left group cursor-pointer h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Masterclasses</span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1.5 font-sans">Curricula & bundles</p>
                      <div className="mt-auto w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-sage to-ink mt-2 transition-all duration-500" />
                    </div>
                  </TiltCard>
              </Link>
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               1. 1-on-1 Counselling Section — Glassmorphism Cards
             ═══════════════════════════════════════════════════════════════ */}
          <section
            id="counselling"
            ref={counselling.ref}
            className={`mb-24 scroll-mt-24 transition-all duration-1000 ease-out ${counselling.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="glass-section rounded-3xl p-8 sm:p-12 space-y-8">
              <div className="space-y-2">
                <Badge variant="navy">Individual Care</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
                  1-on-1 Counselling Sessions
                </h2>
                <p className="text-sm text-ink-muted max-w-xl">
                  Evidence-based, 50-minute clinical consultations for cognitive restructuring, emotional regulation, anxiety, and boundary architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Single Session */}
                <TiltCard maxTilt={5}>
                  <div className="h-full glass-hero-panel rounded-3xl p-7 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-forest block">
                        Single Consultation
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {SERVICES_PRICING.counselling.singleSession.title}
                      </h3>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        {SERVICES_PRICING.counselling.singleSession.description}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-forest/10">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="font-serif text-2xl font-bold text-ink">
                          {SERVICES_PRICING.counselling.singleSession.formattedInr}
                        </span>
                        <span className="text-xs text-ink-muted font-sans">
                          ({SERVICES_PRICING.counselling.singleSession.formattedUsd})
                        </span>
                      </div>
                      <LiquidGlassButton href="/contact" variant="primary" size="md">
                        Book 1 Session
                      </LiquidGlassButton>
                    </div>
                  </div>
                </TiltCard>

                {/* Package 4 */}
                <TiltCard maxTilt={5}>
                  <div className="h-full glass-hero-panel rounded-3xl p-7 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-forest block">
                        Month-Long Progress
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {SERVICES_PRICING.counselling.package4.title}
                      </h3>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        {SERVICES_PRICING.counselling.package4.description}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-forest/10">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="font-serif text-2xl font-bold text-ink">
                          {SERVICES_PRICING.counselling.package4.formattedInr}
                        </span>
                        <span className="text-xs text-ink-muted font-sans">
                          ({SERVICES_PRICING.counselling.package4.formattedUsd})
                        </span>
                      </div>
                      <LiquidGlassButton href="/contact" variant="secondary" size="md">
                        Select 4 Sessions
                      </LiquidGlassButton>
                    </div>
                  </div>
                </TiltCard>

                {/* Package 8 — Dark Premium Glass */}
                <TiltCard maxTilt={5}>
                  <div className="h-full glass-dark-card text-ivory rounded-3xl p-7 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
                          Deep Transformation
                        </span>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-vermilion" />
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-ivory">
                        {SERVICES_PRICING.counselling.package8.title}
                      </h3>
                      <p className="text-xs text-ivory/75 leading-relaxed font-sans">
                        {SERVICES_PRICING.counselling.package8.description}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/15">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="font-serif text-2xl font-bold text-gold">
                          {SERVICES_PRICING.counselling.package8.formattedInr}
                        </span>
                        <span className="text-xs text-ivory/70 font-sans">
                          ({SERVICES_PRICING.counselling.package8.formattedUsd})
                        </span>
                      </div>
                      <LiquidGlassButton href="/contact" variant="primary" size="md">
                        Select 8 Sessions
                      </LiquidGlassButton>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════════════════════════════════════
               2. Crisis & CentreLine Section — Glassmorphism Split Layout
             ═══════════════════════════════════════════════════════════════ */}
          <section
            id="crisis"
            ref={crisis.ref}
            className={`mb-24 scroll-mt-24 transition-all duration-1000 ease-out ${crisis.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Crisis Call — Warm Vermilion Glass */}
              <TiltCard maxTilt={4}>
                <div className="h-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6" style={{
                  background: "linear-gradient(165deg, rgba(253, 240, 237, 0.85) 0%, rgba(253, 244, 244, 0.78) 100%)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  border: "1px solid rgba(139, 38, 38, 0.12)",
                  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.5), 0 8px 32px -6px rgba(139, 38, 38, 0.08)"
                }}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="crisis">Scheduled Support Call</Badge>
                      <span className="text-xs font-semibold text-crisis-dark">Not an emergency-response service</span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-crisis-dark">
                      {SERVICES_PRICING.crisis.call.title}
                    </h3>

                    <p className="text-sm text-ink/80 leading-relaxed font-sans">
                      {SERVICES_PRICING.crisis.call.description}
                    </p>

                    <div className="p-4 rounded-2xl glass-content-card text-xs text-ink/80 space-y-2">
                      <div className="font-semibold text-crisis-dark flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>National crisis helplines:</span>
                      </div>
                      <ul className="space-y-1 font-mono text-[11px]">
                          <li><strong>India — Tele-MANAS:</strong> 14416</li>
                          <li><strong>India — Vandrevala Foundation:</strong> +91 9999 666 555</li>
                          <li><strong>United States — 988 Suicide & Crisis Lifeline:</strong> 988</li>
                      </ul>
                      <p className="text-[11px] text-ink-muted font-sans">
                        If you are in immediate danger, contact your local emergency number.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-crisis/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-serif text-3xl font-bold text-crisis">
                        {SERVICES_PRICING.crisis.call.formattedInr}
                      </span>
                      <span className="text-xs text-ink-muted ml-1">
                        ({SERVICES_PRICING.crisis.call.formattedUsd})
                      </span>
                    </div>

                    <LiquidGlassButton href="/contact" variant="primary" size="md">
                      Request Stabilisation Call
                    </LiquidGlassButton>
                  </div>
                </div>
              </TiltCard>

              {/* CentreLine — Sage Glass */}
              <TiltCard maxTilt={4}>
                <div id="centreline" className="h-full glass-hero-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6 scroll-mt-24">
                  <div className="space-y-4">
                    <Badge variant="sage">Ongoing Support</Badge>

                    <h3 className="font-serif text-3xl font-bold text-ink">
                      {SERVICES_PRICING.crisis.centreLine.title}
                    </h3>

                    <p className="text-sm text-ink-muted leading-relaxed font-sans">
                      {SERVICES_PRICING.crisis.centreLine.description}
                    </p>

                    <div className="space-y-2.5 pt-2 text-xs text-ink/80 font-sans">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                        <span>Steady, non-judgmental founder-led check-ins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                        <span>Designed for ongoing emotional poise between life transitions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                        <span>Parental/guardian consent required for minors under 18</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-forest/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-serif text-3xl font-bold text-ink">
                        {SERVICES_PRICING.crisis.centreLine.formattedInr}
                      </span>
                      <span className="text-xs text-ink-muted ml-1">
                        ({SERVICES_PRICING.crisis.centreLine.formattedUsd})
                      </span>
                    </div>

                    <LiquidGlassButton href="/contact" variant="secondary" size="md">
                      Join CentreLine
                    </LiquidGlassButton>
                  </div>
                </div>
              </TiltCard>
            </div>
          </section>


          {/* ═══════════════════════════════════════════════════════════════
               3. Graphotherapy Section — Gold-tinged Glassmorphism
             ═══════════════════════════════════════════════════════════════ */}
          <section
            id="graphology"
            ref={graphology.ref}
            className={`mb-24 scroll-mt-24 transition-all duration-1000 ease-out ${graphology.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="glass-section rounded-3xl p-8 sm:p-12 space-y-8">
              <div className="space-y-3">
                <Badge variant="gold">Subconscious Handwriting Analysis</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
                  Graphotherapy & Handwriting Realignment
                </h2>
                <p className="text-sm text-ink-muted max-w-2xl font-sans">
                  Discover how stroke patterns, margins, pressure, and letter formations reflect your subconscious emotional defenses and learn targeted realignment strokes.
                </p>
                {/* Vermilion accent separator */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-vermilion" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic */}
                <TiltCard maxTilt={5}>
                  <div className="h-full p-6 sm:p-7 rounded-2xl glass-hero-panel flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {SERVICES_PRICING.graphology.basic.title}
                      </h4>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        {SERVICES_PRICING.graphology.basic.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-forest/10 font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.graphology.basic.formattedInr}{" "}
                      <span className="text-xs font-sans font-normal text-ink-muted">
                        ({SERVICES_PRICING.graphology.basic.formattedUsd})
                      </span>
                    </div>
                  </div>
                </TiltCard>

                {/* Standard */}
                <TiltCard maxTilt={5}>
                  <div className="h-full p-6 sm:p-7 rounded-2xl glass-hero-panel flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {SERVICES_PRICING.graphology.standard.title}
                      </h4>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        {SERVICES_PRICING.graphology.standard.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-forest/10 font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.graphology.standard.formattedInr}{" "}
                      <span className="text-xs font-sans font-normal text-ink-muted">
                        ({SERVICES_PRICING.graphology.standard.formattedUsd})
                      </span>
                    </div>
                  </div>
                </TiltCard>

                {/* Deep */}
                <TiltCard maxTilt={5}>
                  <div className="h-full p-6 sm:p-7 rounded-2xl glass-hero-panel flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {SERVICES_PRICING.graphology.deep.title}
                      </h4>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        {SERVICES_PRICING.graphology.deep.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-forest/10 font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.graphology.deep.formattedInr}{" "}
                      <span className="text-xs font-sans font-normal text-ink-muted">
                        ({SERVICES_PRICING.graphology.deep.formattedUsd})
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════════════════════════════════════
               4. Psychology Courses — Premium Glassmorphism Tier Cards
             ═══════════════════════════════════════════════════════════════ */}
          <section
            id="courses"
            ref={courses.ref}
            className={`mb-16 scroll-mt-24 transition-all duration-1000 ease-out ${courses.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <SectionHeading
              eyebrow="Specialized Psychoeducational Training"
              title="Psychology Courses & Masterclasses"
              description="Self-paced, structured curricula for learners, coaches, and peer counselors."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TiltCard maxTilt={5}>
                <div className="h-full glass-hero-panel rounded-3xl p-7 flex flex-col justify-between">
                  <div className="space-y-3">
                    <Badge variant="navy">Curriculum 01</Badge>
                    <h4 className="font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.courses.crisisCounselling.title}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans">
                      De-escalation mechanics, suicide safety planning, and emotional stabilization methodologies.
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-forest/10 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.courses.crisisCounselling.formattedInr} ({SERVICES_PRICING.courses.crisisCounselling.formattedUsd})
                    </span>
                    <LiquidGlassButton href="/contact" variant="secondary" size="sm" showArrow>
                      Enroll
                    </LiquidGlassButton>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5}>
                <div className="h-full glass-hero-panel rounded-3xl p-7 flex flex-col justify-between">
                  <div className="space-y-3">
                    <Badge variant="navy">Curriculum 02</Badge>
                    <h4 className="font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.courses.cognitiveCounselling.title}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans">
                      Cognitive distortions, core belief disputation, and behavioral modification frameworks.
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-forest/10 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-ink">
                      {SERVICES_PRICING.courses.cognitiveCounselling.formattedInr} ({SERVICES_PRICING.courses.cognitiveCounselling.formattedUsd})
                    </span>
                    <LiquidGlassButton href="/contact" variant="secondary" size="sm" showArrow>
                      Enroll
                    </LiquidGlassButton>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5}>
                <div className="h-full glass-dark-card text-ivory rounded-3xl p-7 flex flex-col justify-between">
                  <div className="space-y-3">
                    <Badge variant="gold">Complete Bundle</Badge>
                    <h4 className="font-serif text-xl font-bold text-ivory">
                      {SERVICES_PRICING.courses.bundle.title}
                    </h4>
                    <p className="text-xs text-ivory/70 leading-relaxed font-sans">
                      Access both Crisis and Cognitive counselling masterclasses with all workbook resources.
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-white/15 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-gold">
                      {SERVICES_PRICING.courses.bundle.formattedInr} ({SERVICES_PRICING.courses.bundle.formattedUsd})
                    </span>
                    <LiquidGlassButton href="/contact" variant="primary" size="sm" showArrow>
                      Get Bundle
                    </LiquidGlassButton>
                  </div>
                </div>
              </TiltCard>
            </div>
          </section>


          {/* ═══════════════════════════════════════════════════════════════
               Checkout Status Notice — Glass Notice Bar
             ═══════════════════════════════════════════════════════════════ */}
          <div className="p-5 rounded-3xl glass-content-card border border-sage/20 flex items-start gap-3.5 text-sm text-ink-muted shadow-sm">
            <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <p className="font-sans leading-relaxed">
              <strong className="text-ink font-semibold">{CHECKOUT_NOTICE}</strong> Booking and course buttons
              above open the enquiry form; payment is not yet available.
            </p>
          </div>

        </Container>
      </div>
    </main>
  );
}