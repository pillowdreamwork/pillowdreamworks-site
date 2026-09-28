"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Brain,
  HeartHandshake,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Clock,
  Compass,
  Check,
  Flame,
  Volume2,
  VolumeX,
  Play,
  X,
  Search,
  Filter,
  Layers,
  Send,
  HelpCircle,
  Activity,
  AlertTriangle,
  Award,
  FileText
} from "lucide-react";
import { Canvas3DHero } from "@/components/studio/canvas-3d-hero";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";
import { CAMPAIGN_METADATA, BOOKS_PRICING } from "@/data/pricing";

interface AssessmentSample {
  id: string;
  title: string;
  code: string;
  domain: string;
  category: "clinical" | "cognitive" | "emotional" | "career" | "relationship" | "crisis";
  questionsCount: number;
  duration: string;
  description: string;
  factors: string[];
  clinicalBasis: string;
  sampleQuestion: string;
  isFree: boolean;
}

export function FoundationExperience() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentSample | null>(null);
  const [activeTestStep, setActiveTestStep] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [activeChapterTab, setActiveChapterTab] = useState<number>(0);

  // Live Clocks for Global Foundation
  const [timeLondon, setTimeLondon] = useState("");
  const [timeDelhi, setTimeDelhi] = useState("");
  const [timeNY, setTimeNY] = useState("");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeLondon(
        now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setTimeDelhi(
        now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
      setTimeNY(
        now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  // 177 Standardized Clinical & Psychometric Scales Catalog Representative Sample
  const sampleAssessments: AssessmentSample[] = [
    {
      id: "gad-7",
      title: "Generalized Anxiety Continuum Scale",
      code: "GAD-701",
      domain: "Anxiety & Stress Physiology",
      category: "clinical",
      questionsCount: 7,
      duration: "3 Mins",
      description: "Standardized psychometric screening measuring somatic tension, autonomic arousal, and uncontrollable cognitive worry loops.",
      factors: ["Somatic Tension", "Cognitive Apprehension", "Autonomic Hyperarousal"],
      clinicalBasis: "Standardized Clinical Psychometrics • Spitzer et al. Protocol",
      sampleQuestion: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
      isFree: true,
    },
    {
      id: "phq-9",
      title: "Depressive Affect & Vitality Metric",
      code: "PHQ-902",
      domain: "Mood & Affective Regulation",
      category: "clinical",
      questionsCount: 9,
      duration: "4 Mins",
      description: "Standardized clinical assessment for anhedonia, sleep architecture disruption, psychomotor agitation, and cognitive fatigue.",
      factors: ["Anhedonia Level", "Psychomotor Energy", "Cognitive Dysphoria"],
      clinicalBasis: "Kroenke et al. Clinical Criteria • Validated Diagnostic Axis",
      sampleQuestion: "Little interest or pleasure in doing activities that previously brought fulfilment?",
      isFree: true,
    },
    {
      id: "burnout-cbi",
      title: "Copenhagen Executive Burnout Scale",
      code: "CBI-304",
      domain: "Occupational Resilience",
      category: "career",
      questionsCount: 14,
      duration: "5 Mins",
      description: "Deconstructs personal, work-related, and client-facing burnout into actionable cognitive exhaustion vectors.",
      factors: ["Personal Fatigue", "Workplace Alienation", "Cynicism Index"],
      clinicalBasis: "Copenhagen Psychosocial Taxonomy",
      sampleQuestion: "Do you feel worn out and emotionally drained at the end of the working day?",
      isFree: true,
    },
    {
      id: "attachment-ecr",
      title: "Adult Attachment Dynamics Ledger",
      code: "ECR-501",
      domain: "Relational Architecture",
      category: "relationship",
      questionsCount: 12,
      duration: "5 Mins",
      description: "Maps attachment anxiety versus attachment avoidance in intimate relationships, identifying hyper-activating strategies.",
      factors: ["Anxious Attachment", "Avoidant Attachment", "Relational Security"],
      clinicalBasis: "Brennan & Fraley Relational Geometry Model",
      sampleQuestion: "I worry a lot about my relationships and fear abandonment when distance appears.",
      isFree: true,
    },
    {
      id: "cognitive-distortions",
      title: "Automatic Cognitive Distortions Inventory",
      code: "CDI-108",
      domain: "Cognitive Restructuring",
      category: "cognitive",
      questionsCount: 15,
      duration: "6 Mins",
      description: "Identifies primary cognitive biases including catastrophizing, black-and-white thinking, emotional reasoning, and mind reading.",
      factors: ["Catastrophizing", "All-or-Nothing", "Mind Reading Bias"],
      clinicalBasis: "Beck Cognitive Therapy Matrix",
      sampleQuestion: "When one negative event occurs, do you tend to view it as a never-ending pattern of defeat?",
      isFree: true,
    },
    {
      id: "emotional-granularity",
      title: "Affective Granularity & Regulation Scale",
      code: "AGR-202",
      domain: "Emotional Intelligence",
      category: "emotional",
      questionsCount: 10,
      duration: "4 Mins",
      description: "Measures the precision with which you differentiate distinct emotional states and deploy cognitive reappraisal.",
      factors: ["Differentiation Precision", "Reappraisal Velocity", "Suppression Cost"],
      clinicalBasis: "Barrett Constructive Emotion Framework",
      sampleQuestion: "Can you accurately distinguish between anxiety, exhaustion, and sadness in real time?",
      isFree: true,
    },
    {
      id: "crisis-triage",
      title: "Acute Psychological Triage Protocol",
      code: "CRISIS-999",
      domain: "Emergency Intervention",
      category: "crisis",
      questionsCount: 5,
      duration: "2 Mins",
      description: "Immediate safety screening for individuals in extreme distress, emotional overwhelm, or acute despair.",
      factors: ["Acute Overwhelm", "Support Availability", "Safety Horizon"],
      clinicalBasis: "Emergency Crisis Psychological Standard",
      sampleQuestion: "Are you feeling overwhelmed to the point of being unable to keep yourself safe right now?",
      isFree: true,
    },
  ];

  const filteredAssessments = useMemo(() => {
    return sampleAssessments.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toolkitChapters = [
    { number: "01", title: "Understanding Yourself", pages: "pp. 08–22", focus: "Core psychological architecture, cognitive baselines, emotional triggers." },
    { number: "02", title: "Thoughts & Mindset", pages: "pp. 23–38", focus: "Cognitive restructuring, cognitive distortions inventory, reframing protocols." },
    { number: "03", title: "Anxiety & Stress Physiology", pages: "pp. 39–52", focus: "Vagus nerve stimulation, autonomic down-regulation, somatic anchoring." },
    { number: "04", title: "Relationships & Boundaries", pages: "pp. 53–66", focus: "Attachment geometry, non-violent assertion, interpersonal boundary setting." },
    { number: "05", title: "Habits & Personal Growth", pages: "pp. 67–80", focus: "Behavioral compounding, identity-based habits, reflective evening journal." },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0D14] selection:bg-[#00FFFF] selection:text-black font-sans antialiased">
      {/* ── 0. TOP CRISIS BANNER ── */}
      <div className="bg-[#0D1017] text-white py-2 px-6 border-b border-white/10 text-xs font-mono flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
            <span className="text-zinc-300">IN CRISIS? IMMEDIATE CLINICAL SUPPORT:</span>
            <a href="tel:988" className="text-[#00FFFF] hover:underline font-bold">
              CALL 988 (USA)
            </a>
            <span className="text-zinc-600">|</span>
            <a href="tel:14416" className="text-[#00FFFF] hover:underline font-bold">
              TELE-MANAS 14416 (INDIA)
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-zinc-400">
            <span>PILLOWDREAMWORKS PSYCHOLOGY FOUNDATION</span>
            <span>•</span>
            <span className="text-white">EDITION 2026</span>
          </div>
        </div>
      </div>

      {/* ── 1. GLOBAL FLOATING NAVIGATION ── */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-zinc-900/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Mark */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-serif font-bold text-sm group-hover:bg-[#00FFFF] group-hover:text-black transition-colors duration-300 shadow-sm">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-black">
                PILLOWDREAMWORKS
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 -mt-1">
                PSYCHOLOGY FOUNDATION
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-700">
            <a href="#library" className="hover:text-black transition-colors relative group py-1">
              <span>Living Library</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#assessments" className="hover:text-black transition-colors relative group py-1">
              <span>177 Assessments</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#services" className="hover:text-black transition-colors relative group py-1">
              <span>Clinical Rooms</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#reflection" className="hover:text-black transition-colors relative group py-1 flex items-center gap-1.5">
              <span>The Blank Page</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" />
            </a>
            <a href="#founder" className="hover:text-black transition-colors relative group py-1">
              <span>Colophon</span>
            </a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAudioActive(!isAudioActive)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono transition-all cursor-pointer border border-zinc-200"
              title="Toggle interactive breathing audio waves"
            >
              {isAudioActive ? (
                <>
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#00FFFF] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#00FFFF] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#00FFFF] animate-pulse delay-150" />
                  </span>
                  <span className="font-semibold text-zinc-900">BREATHING SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-500">SOUND: OFF</span>
                </>
              )}
            </button>

            <Link
              href="/books/psychology-toolkit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-[#1A1D26] text-white text-xs md:text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_6px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
            >
              <span>Get The Toolkit</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00FFFF]" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION: 3D MIND-SPHERE + DECLARATIVE MANIFESTO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-20 pb-16 px-6 md:px-12 bg-white text-black overflow-hidden border-b border-zinc-200">
        {/* Real-Time Interactive 3D Mind-Sphere Canvas */}
        <Canvas3DHero isPlayingAudio={isAudioActive} />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 border border-zinc-200 backdrop-blur-md text-xs font-mono text-zinc-700">
            <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
            <span className="uppercase tracking-wider">LIVING PSYCHOLOGY FOUNDATION • EST. 2026</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span>177 CLINICAL SCALES</span>
            <span>•</span>
            <span>2 MASTER WORKBOOKS</span>
            <span>•</span>
            <span className="text-black font-semibold">15 DOMAINS ACTIVE</span>
          </div>
        </div>

        {/* Hero Headline & Manifesto */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 md:py-16">
          <div className="max-w-4xl">
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#008888] font-bold block mb-4">
              CALM ON THE SURFACE. AMBITION UNDERNEATH.
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight text-black leading-[1.02] uppercase select-none">
              A PLACE FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-600">
                PSYCHOLOGY,
              </span> <br />
              REFLECTION &amp; THE <br />
              <span className="relative inline-block text-black">
                WORK OF BECOMING.
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#00FFFF] via-cyan-300 to-transparent" />
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-2xl font-normal leading-relaxed tracking-tight">
              We publish structured clinical workbooks, 177 standardized psychometric frameworks, and therapeutic journals designed to give your inner life clear architecture.
            </p>
          </div>

          {/* Action Row with Liquid Glass & Metal Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <LiquidButton
              size="xl"
              className="border border-zinc-300/80 hover:border-black text-black font-bold shadow-sm"
              onClick={() => {
                const el = document.getElementById("assessments");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#00FFFF]" />
                <span>Explore 177 Clinical Assessments</span>
              </span>
            </LiquidButton>

            <Link href="/books/psychology-toolkit">
              <MetalButton variant="primary">
                Acquire The Psychology Toolkit (₹{BOOKS_PRICING.toolkit.diwali.inr})
              </MetalButton>
            </Link>
          </div>
        </div>

        {/* Bottom Telemetry & Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-zinc-200/80 pt-6">
          <a
            href="#library"
            className="group flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 hover:text-black transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-zinc-200 group-hover:border-black flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-black" />
            </span>
            <span className="uppercase">SCROLL TO ENTER THE LIVING LIBRARY</span>
          </a>

          <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-zinc-400">
            <span>[ 01 / 06 ]</span>
            <span>DIWALI CELEBRATION EDITION ACTIVE</span>
          </div>
        </div>
      </section>

      {/* ── 3. SECTION 02: THE LIVING LIBRARY EXHIBITION (BOOKS) ── */}
      <section id="library" className="py-24 md:py-32 px-6 md:px-12 bg-[#FAFAFC] text-black border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
                <span>02 // THE LIVING LIBRARY</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase leading-tight">
                PHYSICAL &amp; DIGITAL <br />
                <span className="text-zinc-400">PUBLICATIONS</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 max-w-md font-normal leading-relaxed">
              Every publication is crafted with rigorous clinical foundations, structured reflective worksheets, and cognitive architecture.
            </p>
          </div>

          {/* Master 2-Book Exhibition Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
            {/* Book 1: The Psychology Toolkit (7 Cols) */}
            <div className="lg:col-span-7 rounded-[22px] bg-zinc-950 text-white p-8 md:p-12 relative overflow-hidden border border-[#2B2E3A]/40 shadow-2xl flex flex-col justify-between">
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FFFF]/10 rounded-full blur-[100px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-widest text-[#00FFFF] uppercase">
                    MASTER WORKBOOK • 80 PAGES
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300">
                    DIWALI: ₹{BOOKS_PRICING.toolkit.diwali.inr} (${BOOKS_PRICING.toolkit.diwali.usd})
                  </span>
                </div>

                <h3 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  The Psychology Toolkit
                </h3>
                <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
                  A comprehensive clinical workbook for cognitive restructuring, emotional regulation, and daily psychological practice across 5 definitive master chapters.
                </p>

                {/* Chapter Navigation Tabs */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 block">
                    TABLE OF CONTENTS // INTERACTIVE PREVIEW
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {toolkitChapters.map((ch, idx) => (
                      <button
                        key={ch.number}
                        onClick={() => setActiveChapterTab(idx)}
                        className={`text-left p-3 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          activeChapterTab === idx
                            ? "bg-white/15 border-[#00FFFF]/50 text-white"
                            : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[#00FFFF]">CH. {ch.number}</span>
                          <span>{ch.pages}</span>
                        </div>
                        <p className="mt-1 font-sans font-medium text-white truncate">{ch.title}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300">
                    <span className="font-mono text-[#00FFFF] block mb-1">
                      CHAPTER {toolkitChapters[activeChapterTab].number} FOCUS:
                    </span>
                    {toolkitChapters[activeChapterTab].focus}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/books/psychology-toolkit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00FFFF] transition-colors"
                >
                  <span>Acquire Toolkit Now</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </Link>
                <span className="text-xs font-mono text-zinc-500">Instant PDF &amp; Worksheet Delivery</span>
              </div>
            </div>

            {/* Book 2: Finding The Centre (5 Cols) */}
            <div className="lg:col-span-5 rounded-[22px] bg-white text-black p-8 md:p-12 relative overflow-hidden border border-zinc-300/80 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                  <span className="text-[10px] font-mono tracking-widest text-[#008888] font-bold uppercase">
                    COMPANION FOLIO • 60 PAGES
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-mono text-zinc-700">
                    ₹{BOOKS_PRICING.findingTheCentre.ebook.inr} (${BOOKS_PRICING.findingTheCentre.ebook.usd})
                  </span>
                </div>

                <h3 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-black leading-tight">
                  Finding The Centre
                </h3>
                <p className="mt-4 text-sm text-zinc-600 font-normal leading-relaxed">
                  A foundational inquiry into mindfulness, grounding rituals, and regaining equilibrium during psychological upheaval.
                </p>

                <div className="mt-8 space-y-3 font-mono text-xs text-zinc-600 border-t border-zinc-200 pt-6">
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span>01 Returning to Zero</span>
                    <span className="font-semibold text-black">Ch. I</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span>02 Emotional Equilibrium</span>
                    <span className="font-semibold text-black">Ch. II</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span>03 Cognitive Quiet</span>
                    <span className="font-semibold text-black">Ch. III</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>04 Daily Centering Ritual</span>
                    <span className="font-semibold text-black">Ch. IV</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between">
                <Link
                  href="/books/finding-the-centre"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  <span>Explore Finding The Centre</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00FFFF]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION 03: THE 177 STANDARDIZED PSYCHOMETRIC ARCHIVE ── */}
      <section id="assessments" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
                <span>03 // THE PSYCHOMETRIC ARCHIVE</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase leading-tight">
                177 STANDARDIZED <br />
                <span className="text-zinc-400">CLINICAL SCALES</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 max-w-md font-normal leading-relaxed">
              Explore 161 free screenings and 16 diagnostic protocols across 15 domains with complete factor analysis and instantaneous scoring.
            </p>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="py-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search bar */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by assessment name, scale code (e.g. GAD-7), or domain..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All 177 Scales", value: "all" },
                { label: "Clinical", value: "clinical" },
                { label: "Cognitive", value: "cognitive" },
                { label: "Emotional", value: "emotional" },
                { label: "Career & Burnout", value: "career" },
                { label: "Relationships", value: "relationship" },
                { label: "Crisis Safety", value: "crisis" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black border border-zinc-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assessments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredAssessments.map((assessment) => (
              <div
                key={assessment.id}
                onClick={() => {
                  setSelectedAssessment(assessment);
                  setActiveTestStep(0);
                  setSelectedAnswer(null);
                }}
                className="group p-6 rounded-[18px] bg-zinc-50 hover:bg-zinc-950 text-black hover:text-white border border-zinc-200 hover:border-zinc-900 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200 group-hover:border-white/10">
                    <span className="text-[11px] font-mono tracking-widest text-[#008888] group-hover:text-[#00FFFF] font-semibold">
                      {assessment.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 group-hover:bg-white/10 text-[10px] font-mono">
                      {assessment.duration} • {assessment.questionsCount} Qs
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight line-clamp-2">
                    {assessment.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600 group-hover:text-zinc-400 leading-relaxed line-clamp-3">
                    {assessment.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {assessment.factors.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md bg-zinc-200/70 group-hover:bg-white/10 text-[10px] font-mono text-zinc-700 group-hover:text-zinc-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 group-hover:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400">
                    {assessment.isFree ? "FREE STANDARDIZED TEST" : "CLINICAL PROTOCOL"}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-black group-hover:bg-[#00FFFF] text-white group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white text-xs font-mono uppercase tracking-widest font-bold hover:bg-zinc-800 transition-all shadow-md"
            >
              <span>View Complete 177 Psychometric Archive</span>
              <ArrowRight className="w-4 h-4 text-[#00FFFF]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. SECTION 04: THE CONSULTING ROOMS & CLINICAL PROTOCOLS ── */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-[#090C14] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FFFF] uppercase tracking-widest mb-3">
                <HeartHandshake className="w-3.5 h-3.5 text-[#00FFFF]" />
                <span>04 // CLINICAL GUIDANCE</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
                THE CONSULTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                  ROOMS &amp; PROTOCOLS
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
              Confidential, structured therapeutic protocols grounded in cognitive-behavioral architecture, graphotherapy, and crisis safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {/* Room 1: 1-on-1 Counselling */}
            <div className="p-8 rounded-[20px] bg-[#121622] border border-white/10 flex flex-col justify-between min-h-[380px] shadow-xl">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#00FFFF] uppercase block pb-3 border-b border-white/10">
                  ROOM 01 // INDIVIDUAL THERAPY
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
                  1-on-1 Psychological Counselling
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Private 50-minute clinical sessions focusing on anxiety down-regulation, cognitive restructuring, life transitions, and self-actualization.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  Sessions Conducted Online • Secure Encrypted Video
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/services"
                  className="w-full text-center py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider block hover:bg-[#00FFFF] transition-colors"
                >
                  Schedule Initial Consultation
                </Link>
              </div>
            </div>

            {/* Room 2: Graphotherapy & Handwriting Analysis */}
            <div className="p-8 rounded-[20px] bg-[#121622] border border-white/10 flex flex-col justify-between min-h-[380px] shadow-xl">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#CBA258] uppercase block pb-3 border-b border-white/10">
                  ROOM 02 // GRAPHOTHERAPY
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
                  Subconscious Handwriting Analysis
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Graphological analysis decoding emotional defense mechanisms, baseline stress markers, and neuromuscular handwriting retraining protocols.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  Full 12-Page Diagnostic Report Included
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/services"
                  className="w-full text-center py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider block hover:bg-[#CBA258] transition-colors"
                >
                  Order Graphotherapy Audit
                </Link>
              </div>
            </div>

            {/* Room 3: CentreLine Crisis Protocol */}
            <div className="p-8 rounded-[20px] bg-[#1A1215] border border-[#FF3333]/30 flex flex-col justify-between min-h-[380px] shadow-xl">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#FF3333] uppercase block pb-3 border-b border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
                  ROOM 03 // EMERGENCY SAFETY
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
                  CentreLine Emergency Protocol
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Immediate safety resources, step-by-step emotional grounding anchors, and instant links to regional 24/7 psychiatric emergency services.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-[#FF3333]/15 border border-[#FF3333]/30 text-xs font-mono text-red-200">
                  Free 24/7 Confidential Assistance
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a
                  href="tel:988"
                  className="w-full text-center py-3 rounded-full bg-[#FF3333] text-white font-bold text-xs uppercase tracking-wider block hover:bg-red-600 transition-colors"
                >
                  Access Crisis Protocol Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SECTION 05: THE BLANK PAGE (PARTICIPATORY REFLECTION) ── */}
      <section id="reflection" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#008888] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // THE BLANK PAGE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase leading-tight">
            WHAT NEEDS YOUR <br />
            <span className="text-zinc-400">ATTENTION TODAY?</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto font-normal leading-relaxed">
            Write one unedited thought. Psychological progress begins by giving form to the unsaid. Your entry remains 100% private in your browser session.
          </p>

          <div className="mt-10 p-8 rounded-[24px] bg-[#FAFAFC] border border-zinc-200 shadow-lg text-left">
            <textarea
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="What feeling, dilemma, or quiet aspiration has been lingering in the background of your mind?"
              className="w-full p-4 rounded-xl bg-white border border-zinc-200 text-sm font-sans focus:outline-none focus:border-black text-black placeholder:text-zinc-400 resize-none leading-relaxed"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-500">
                {reflectionText.length} characters written • Private local session
              </span>

              <button
                onClick={() => {
                  if (!reflectionText) return;
                  setReflectionSaved(true);
                  setTimeout(() => setReflectionSaved(false), 3000);
                }}
                className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {reflectionSaved ? "✓ Thought Captured" : "Anchor This Thought"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 06: FOUNDER COLOPHON ── */}
      <section id="founder" className="py-24 md:py-32 px-6 md:px-12 bg-[#FAFAFC] text-black border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-zinc-950 text-white flex flex-col items-center justify-center text-center p-6 border-4 border-zinc-200 shadow-2xl">
                <span className="font-serif text-5xl md:text-6xl font-bold text-white">MG</span>
                <span className="text-[10px] font-mono tracking-widest text-[#00FFFF] uppercase mt-2">
                  FOUNDER &amp; AUTHOR
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <span>06 // THE FOUNDER&apos;S COLOPHON</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase leading-tight">
                MANISH GARG &amp; THE <br />
                <span className="text-zinc-400">PILLOWDREAMWORKS MISSION</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                PillowDreamWorks was founded on a simple conviction: psychological insight should not be locked behind academic jargon or superficial social media platitudes. We build rigorous tools for individuals who want calm on the surface, but carry intense creative and intellectual ambition underneath.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs text-zinc-600">
                <span className="px-3 py-1.5 rounded-full bg-zinc-200/80">AUTHOR: The Psychology Toolkit</span>
                <span className="px-3 py-1.5 rounded-full bg-zinc-200/80">CURATOR: 177 Standardized Scales</span>
                <span className="px-3 py-1.5 rounded-full bg-zinc-200/80">CLINICAL GRAPHOTHERAPIST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. GLOBAL FOOTER WITH LIVING TIMEZONE CLOCKS ── */}
      <footer className="bg-white text-black pt-20 pb-12 px-6 md:px-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
            {/* Col 1: Foundation info & Clocks */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-serif text-xs">
                    Ψ
                  </div>
                  <span>PILLOWDREAMWORKS FOUNDATION</span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-zinc-600 max-w-sm font-normal leading-relaxed">
                  Dedicated to psychological rigor, self-discovery, standardized clinical psychometrics, and structured living.
                </p>
              </div>

              {/* Living Foundation Clocks */}
              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col gap-2 font-mono text-xs text-zinc-500">
                <div className="flex items-center justify-between">
                  <span>NEW DELHI (IST / UTC+5:30)</span>
                  <span className="text-black font-semibold">{timeDelhi || "12:00:00"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>LONDON (UTC+1)</span>
                  <span className="text-black font-semibold">{timeLondon || "07:30:00"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NEW YORK (EST / UTC-4)</span>
                  <span className="text-black font-semibold">{timeNY || "02:30:00"}</span>
                </div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                FOUNDATION ARCHIVE
              </span>
              <Link href="/books/psychology-toolkit" className="text-sm font-medium text-zinc-700 hover:text-black">
                The Psychology Toolkit (80 Pages)
              </Link>
              <Link href="/books/finding-the-centre" className="text-sm font-medium text-zinc-700 hover:text-black">
                Finding The Centre (60 Pages)
              </Link>
              <Link href="/assessments" className="text-sm font-medium text-zinc-700 hover:text-black">
                177 Standardized Scales Ledger
              </Link>
              <Link href="/services" className="text-sm font-medium text-zinc-700 hover:text-black">
                Consulting Rooms &amp; Graphotherapy
              </Link>
              <Link href="/learn" className="text-sm font-medium text-zinc-700 hover:text-black">
                PsychSnaps &amp; Publications
              </Link>
            </div>

            {/* Col 3: Crisis & Support Protocol */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF3333] mb-2 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                CRISIS PROTOCOLS
              </span>
              <a href="tel:988" className="text-sm font-medium text-zinc-700 hover:text-red-600">
                USA Crisis: 988
              </a>
              <a href="tel:14416" className="text-sm font-medium text-zinc-700 hover:text-red-600">
                India Crisis: 14416
              </a>
              <a href="tel:111" className="text-sm font-medium text-zinc-700 hover:text-red-600">
                UK Crisis: 111
              </a>
              <Link href="/contact" className="text-sm font-medium text-zinc-700 hover:text-black mt-2">
                Foundation Inquiries
              </Link>
            </div>

            {/* Col 4: Newsletter Registry */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 block">
                  FOUNDATION DISPATCHES
                </span>
                <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                  Receive monthly clinical essays, PsychSnaps, and psychometric research updates directly from the founder.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for joining the PillowDreamWorks Foundation dispatch.");
                  }}
                  className="relative"
                >
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    required
                    className="w-full px-4 py-3 rounded-full bg-zinc-100 text-black placeholder:text-zinc-400 text-xs font-mono border border-zinc-200 focus:outline-none focus:border-black pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              <div className="mt-8 text-xs font-mono text-zinc-500">
                <p>New Delhi &amp; Global Remote</p>
                <p>Curated by Manish Garg</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <div>
              © 2026 PILLOWDREAMWORKS FOUNDATION. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-6">
              <Link href="/legal/privacy" className="hover:text-black">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-black">Terms of Service</Link>
              <Link href="/legal/refund" className="hover:text-black">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── 9. INTERACTIVE ASSESSMENT RUNNER MODAL ── */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0F1118] border border-white/15 rounded-[24px] p-6 sm:p-10 text-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  {selectedAssessment.code} • {selectedAssessment.domain}
                </span>
              </div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#00FFFF] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Test Content */}
            <div className="py-6">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {selectedAssessment.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {selectedAssessment.description}
              </p>

              {/* Sample Question Runner */}
              <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                  <span className="text-[#00FFFF]">SAMPLE ITEM 01 OF {selectedAssessment.questionsCount}</span>
                  <span>{selectedAssessment.duration} TOTAL</span>
                </div>

                <p className="text-base sm:text-lg font-medium text-white leading-snug">
                  &ldquo;{selectedAssessment.sampleQuestion}&rdquo;
                </p>

                {/* Likert Scale Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
                  {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedAnswer(i)}
                      className={`p-3 rounded-xl text-xs font-mono text-center border transition-all cursor-pointer ${
                        selectedAnswer === i
                          ? "bg-[#00FFFF] text-black font-bold border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Factor Breakdown */}
              <div className="mt-6 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>FACTORS MEASURED:</span>
                <span className="text-[#00FFFF]">{selectedAssessment.factors.join(" • ")}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">{selectedAssessment.clinicalBasis}</span>
              <Link
                href="/assessments"
                className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00FFFF] transition-colors"
              >
                Launch Full Standardized Scale
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
