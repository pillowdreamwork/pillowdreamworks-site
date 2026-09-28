"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Layers,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Download,
  BookMarked,
  RotateCcw
} from "lucide-react";
import { BOOKS_PRICING, CAMPAIGN_METADATA } from "@/data/pricing";

export function BooksJourneyExperience() {
  // Active selected book: "toolkit" | "centre"
  const [selectedBook, setSelectedBook] = useState<"toolkit" | "centre">("toolkit");
  const [activeToolkitStage, setActiveToolkitStage] = useState(0);
  const [activeToolkitChapter, setActiveToolkitChapter] = useState(0);
  const [activeCentreTheme, setActiveCentreTheme] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Methodology Stages for The Psychology Toolkit
  const toolkitMethodology = [
    {
      step: "01",
      name: "Understand",
      tagline: "Decode baseline psychological architecture.",
      detail:
        "Map your nervous system's baseline triggers, emotional defense habits, and subconscious scripts without judgment.",
      exercise: "Core Baseline Diagnostic Worksheet (p. 12)",
    },
    {
      step: "02",
      name: "Reflect",
      tagline: "Structured inquiry replaces circular overthinking.",
      detail:
        "Identify automatic cognitive distortions (catastrophizing, all-or-nothing bias, mind reading) using guided prompts.",
      exercise: "Cognitive Distortion Audit Matrix (p. 28)",
    },
    {
      step: "03",
      name: "Practice",
      tagline: "Evidence-based somatic and cognitive interventions.",
      detail:
        "Deploy vagus nerve regulation, diaphragmatic down-regulation, and non-violent boundary assertion protocols in real time.",
      exercise: "Somatic De-escalation Protocol (p. 44)",
    },
    {
      step: "04",
      name: "Track",
      tagline: "Objective psychological measurement over time.",
      detail:
        "Record mood fluctuations, trigger frequencies, and relational friction points on structured clinical loggers.",
      exercise: "Daily Affective State Log (p. 58)",
    },
    {
      step: "05",
      name: "Grow",
      tagline: "Sustained behavioral compounding.",
      detail:
        "Integrate identity-level habits, psychological sovereignty, and evening reflection rituals into daily rhythm.",
      exercise: "Evening Sovereign Colophon (p. 74)",
    },
  ];

  // 5 Master Chapters for The Psychology Toolkit
  const toolkitChapters = [
    {
      number: "01",
      title: "Understanding Yourself",
      pages: "pp. 08–22",
      subtitle: "The Anatomy of Your Inner Landscape",
      summary:
        "Explores your core cognitive baseline, childhood conditioning anchors, and the hidden architecture of your emotional responses.",
      worksheets: ["The Self-Knowledge Matrix", "Conditioning Ledger", "Values Hierarchy Protocol"],
    },
    {
      number: "02",
      title: "Thoughts & Mindset",
      pages: "pp. 23–38",
      subtitle: "Cognitive Restructuring & Thought Reframing",
      summary:
        "Deconstructs cognitive distortions, negative self-talk spirals, and replaces cognitive rigidity with psychological flexibility.",
      worksheets: ["The Distortion Deconstructer", "Thought Evidence Auditor", "Perspective Shift Sheet"],
    },
    {
      number: "03",
      title: "Anxiety & Stress Physiology",
      pages: "pp. 39–52",
      subtitle: "Somatic Grounding & Autonomic Poise",
      summary:
        "Clinical tools to regulate the autonomic nervous system, calm hyper-arousal, and halt anticipatory panic spirals.",
      worksheets: ["Vagal Tone Activator", "Somatic Grounding Map", "Worry Confinement Box"],
    },
    {
      number: "04",
      title: "Relationships & Boundaries",
      pages: "pp. 53–66",
      subtitle: "Interpersonal Architecture & Attachment Poise",
      summary:
        "Identifies attachment dynamics, non-defensive communication strategies, and building clear emotional boundaries.",
      worksheets: ["Attachment Style Map", "Boundary Script Builder", "Conflict De-escalation Path"],
    },
    {
      number: "05",
      title: "Habits & Personal Growth",
      pages: "pp. 67–80",
      subtitle: "Behavioral Compounding & Evening Centering",
      summary:
        "How to anchor micro-habits, overcome executive resistance, and maintain lifelong psychological hygiene.",
      worksheets: ["Habit Loop Engineer", "Executive Resistance Breaker", "Evening Reflection Journal"],
    },
  ];

  // 5 Core Philosophical Themes for Finding The Centre
  const centreThemes = [
    {
      number: "01",
      title: "Returning to Zero",
      subtitle: "Stripping Away Peripheral Noise",
      quote: "Stillness is not the absence of momentum, but the arrival at equilibrium.",
      reflection:
        "How to silence the incessant pressure of external metrics and rediscover internal sovereignty when the world demands constant reaction.",
    },
    {
      number: "02",
      title: "Emotional Equilibrium",
      subtitle: "The Neutral Witness Perspective",
      quote: "Observe the wave without allowing yourself to become the storm.",
      reflection:
        "Cultivating the capacity to observe intense emotions with clinical curiosity rather than reactive identification.",
    },
    {
      number: "03",
      title: "Cognitive Quiet",
      subtitle: "Reclaiming Space Between Thoughts",
      quote: "When the mind ceases defending itself, clarity appears unbidden.",
      reflection:
        "Techniques for reducing cognitive clutter, intellectual fatigue, and the chronic fatigue of hyper-analysis.",
    },
    {
      number: "04",
      title: "The Relational Mirror",
      subtitle: "Solitude as the Foundation of Intimacy",
      quote: "You cannot meet another deeper than you have met yourself in quietness.",
      reflection:
        "Understanding how healthy solitude deepens interpersonal relationships without breeding detachment or emotional avoidance.",
    },
    {
      number: "05",
      title: "Daily Centering Ritual",
      subtitle: "Anchoring the Sovereign Mind",
      quote: "Equilibrium is not a destination; it is a practice renewed each morning.",
      reflection:
        "A practical 10-minute contemplative protocol for resetting mental posture before facing daily complexity.",
    },
  ];

  // FAQ Items
  const toolkitFaqs = [
    {
      q: "What format will I receive upon acquisition?",
      a: "You immediately receive the high-resolution, master A4 printable PDF workbook (80 pages) optimized for physical double-sided printing as well as digital note-taking apps (GoodNotes, Notability, Apple Books, Remarkable).",
    },
    {
      q: "Is this suitable for beginners or psychology students?",
      a: "Yes. The Toolkit is written without academic gatekeeping while preserving clinical precision. It is used equally by individuals pursuing self-inquiry and by psychology students and counseling trainees as an adjunct workbook.",
    },
    {
      q: "Does this book replace psychotherapy or clinical treatment?",
      a: "No. The Psychology Toolkit is an educational self-reflection and cognitive restructuring workbook. While grounded in clinical methodologies, it does not replace personalized medical or psychiatric care.",
    },
    {
      q: "How long does it take to complete the workbook?",
      a: "The Toolkit is designed as a self-paced 5-week or 10-week practice. Most readers spend 30–45 minutes with each chapter's exercises, returning to key worksheets whenever specific triggers arise.",
    },
  ];

  const centreFaqs = [
    {
      q: "What is the key difference between Finding The Centre and The Psychology Toolkit?",
      a: "The Psychology Toolkit is an active, structured workbook with worksheets and exercises (Understand → Reflect → Practice → Track → Grow). Finding The Centre is a reflective, philosophical handbook focused on mindfulness, cognitive quiet, and regaining stillness.",
    },
    {
      q: "What formats are available for Finding The Centre?",
      a: "Finding The Centre is available in both a Digital eBook edition (PDF & EPUB) and a Collector Hardcover Print edition for physical libraries.",
    },
    {
      q: "Can I read Finding The Centre before The Toolkit?",
      a: "Yes. Both volumes are standalone works created within the same intellectual world. Many readers begin with Finding The Centre to establish quiet, then use The Toolkit for structured cognitive exercises.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0F2038] font-sans antialiased">
      {/* ── 1. THE ENTRANCE: COEXISTING DUAL VOLUMES ── */}
      <section className="relative pt-24 pb-20 px-6 md:px-12 border-b border-[#0F2038]/8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038]/5 border border-[#0F2038]/10 text-xs font-mono text-[#0F2038]/70 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CBA258]" />
            <span>THE LIVING LIBRARY • TWO INTELLECTUAL PATHS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0F2038] tracking-tight max-w-4xl mx-auto leading-tight">
            Two books. One world of structured psychology.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#0F2038]/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Step between two companion journeys. Select a book to unfold its unique philosophy, chapter architecture, and reflective worksheets.
          </p>

          {/* ── 2. THE DUAL-SPINE PHYSICAL SELECTION INTERFACE ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 max-w-5xl mx-auto items-stretch">
            {/* Volume 1: The Psychology Toolkit */}
            <div
              onClick={() => setSelectedBook("toolkit")}
              className={`p-8 sm:p-10 rounded-[24px] transition-all duration-500 text-left flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                selectedBook === "toolkit"
                  ? "bg-[#0F2038] text-[#FDFBF7] shadow-2xl scale-[1.02] border-2 border-[#CBA258] z-10"
                  : "bg-[#F5EFE6] text-[#0F2038] opacity-60 hover:opacity-90 border border-[#0F2038]/15 hover:scale-[0.99]"
              }`}
            >
              {selectedBook === "toolkit" && (
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#CBA258]/10 rounded-full blur-3xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-current/15">
                  <span className="text-[11px] font-mono tracking-widest uppercase">
                    JOURNEY 01 // WORKBOOK
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono ${
                      selectedBook === "toolkit" ? "bg-[#CBA258] text-[#0F2038] font-bold" : "bg-black/10"
                    }`}
                  >
                    {selectedBook === "toolkit" ? "ACTIVE JOURNEY" : "CLICK TO CHOOSE"}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  <span className="text-xs font-mono tracking-widest text-[#CBA258] block uppercase">
                    THE PSYCHOLOGY PLAYBOOK — BOOK 1
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                    The Psychology<br />Toolkit
                  </h2>
                  <p className={`text-sm leading-relaxed ${selectedBook === "toolkit" ? "text-ivory/80" : "text-navy/70"}`}>
                    A structured, exploratory, and analytical clinical workbook built around the 5-stage framework: Understand → Reflect → Practice → Track → Grow.
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-current/15 flex items-center justify-between text-xs font-mono">
                <span>80 PAGES • 5 MASTER CHAPTERS</span>
                <span className="font-bold">₹{BOOKS_PRICING.toolkit.diwali.inr} (${BOOKS_PRICING.toolkit.diwali.usd})</span>
              </div>
            </div>

            {/* Volume 2: Finding The Centre */}
            <div
              onClick={() => setSelectedBook("centre")}
              className={`p-8 sm:p-10 rounded-[24px] transition-all duration-500 text-left flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                selectedBook === "centre"
                  ? "bg-[#1E3557] text-[#FDFBF7] shadow-2xl scale-[1.02] border-2 border-[#7B9B8A] z-10"
                  : "bg-[#F5EFE6] text-[#0F2038] opacity-60 hover:opacity-90 border border-[#0F2038]/15 hover:scale-[0.99]"
              }`}
            >
              {selectedBook === "centre" && (
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B9B8A]/20 rounded-full blur-3xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-current/15">
                  <span className="text-[11px] font-mono tracking-widest uppercase">
                    JOURNEY 02 // CONTEMPLATION
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono ${
                      selectedBook === "centre" ? "bg-[#7B9B8A] text-white font-bold" : "bg-black/10"
                    }`}
                  >
                    {selectedBook === "centre" ? "ACTIVE JOURNEY" : "CLICK TO CHOOSE"}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  <span className="text-xs font-mono tracking-widest text-[#7B9B8A] block uppercase">
                    REFLECTIVE FOLIO
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                    Finding The<br />Centre
                  </h2>
                  <p className={`text-sm leading-relaxed ${selectedBook === "centre" ? "text-ivory/80" : "text-navy/70"}`}>
                    A quieter, contemplative inquiry into emotional stillness, inner sovereignty, and regaining equilibrium during psychological upheaval.
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-current/15 flex items-center justify-between text-xs font-mono">
                <span>60 PAGES • EBOOK &amp; PRINT</span>
                <span className="font-bold">₹{BOOKS_PRICING.findingTheCentre.ebook.inr} (${BOOKS_PRICING.findingTheCentre.ebook.usd})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. UNFOLDING JOURNEY: THE PSYCHOLOGY TOOLKIT ── */}
      {selectedBook === "toolkit" && (
        <div className="animate-fadeIn">
          {/* Methodology: Understand -> Reflect -> Practice -> Track -> Grow */}
          <section className="py-24 px-6 md:px-12 bg-white border-b border-[#0F2038]/8">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono tracking-widest text-[#CBA258] uppercase block mb-3 font-bold">
                  THE METHODOLOGY // THE 5-STAGE FRAMEWORK
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0F2038] tracking-tight leading-tight">
                  Understand → Reflect → Practice → Track → Grow
                </h2>
                <p className="mt-4 text-base text-[#0F2038]/70 font-sans leading-relaxed">
                  The Toolkit is not a book you passively read. It is an active cognitive workbook where each stage transforms abstract psychology into actionable daily architecture.
                </p>
              </div>

              {/* Interactive 5-Stage Stepper */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {toolkitMethodology.map((stage, idx) => (
                  <div
                    key={stage.step}
                    onClick={() => setActiveToolkitStage(idx)}
                    className={`p-6 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] ${
                      activeToolkitStage === idx
                        ? "bg-[#0F2038] text-[#FDFBF7] border-[#0F2038] shadow-xl scale-[1.03]"
                        : "bg-[#FAFAFC] text-[#0F2038] hover:bg-[#F5EFE6] border-[#0F2038]/10"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-current/15">
                        <span className={`text-xs font-mono ${activeToolkitStage === idx ? "text-[#CBA258]" : "text-[#0F2038]/40"}`}>
                          STAGE {stage.step}
                        </span>
                        <span className="text-[10px] font-mono uppercase">
                          {activeToolkitStage === idx ? "EXPLORING" : ""}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-normal mt-4">{stage.name}</h3>
                      <p className={`mt-2 text-xs leading-relaxed ${activeToolkitStage === idx ? "text-ivory/70" : "text-navy/60"}`}>
                        {stage.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-current/10">
                      <span className={`text-[10px] font-mono block ${activeToolkitStage === idx ? "text-[#CBA258]" : "text-[#0F2038]/50"}`}>
                        {stage.exercise}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Stage Detailed Expansion */}
              <div className="mt-8 p-8 rounded-[24px] bg-[#0F2038] text-[#FDFBF7] border border-[#0F2038]/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-mono text-[#CBA258] uppercase">
                    STAGE {toolkitMethodology[activeToolkitStage].step} DEEP DIVE: {toolkitMethodology[activeToolkitStage].name.toUpperCase()}
                  </span>
                  <p className="text-base text-ivory/85 leading-relaxed font-sans">
                    {toolkitMethodology[activeToolkitStage].detail}
                  </p>
                </div>
                <div className="px-5 py-3 rounded-full bg-white/10 text-xs font-mono text-white whitespace-nowrap">
                  Included Worksheet: {toolkitMethodology[activeToolkitStage].exercise}
                </div>
              </div>
            </div>
          </section>

          {/* 5 Master Chapters Exploration */}
          <section className="py-24 px-6 md:px-12 bg-[#F5EFE6] border-b border-[#0F2038]/8">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono tracking-widest text-[#0F2038]/60 uppercase block mb-3 font-bold">
                  INSIDE THE 80-PAGE WORKBOOK
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0F2038] tracking-tight leading-tight">
                  The 5 Master Chapters
                </h2>
                <p className="mt-4 text-base text-[#0F2038]/70 leading-relaxed font-sans">
                  Step through the actual chapters, exercises, and structured worksheet templates contained inside The Psychology Toolkit.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Chapter Selector (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {toolkitChapters.map((ch, idx) => (
                    <button
                      key={ch.number}
                      onClick={() => setActiveToolkitChapter(idx)}
                      className={`text-left p-5 rounded-[18px] border transition-all duration-200 cursor-pointer ${
                        activeToolkitChapter === idx
                          ? "bg-[#0F2038] text-[#FDFBF7] border-[#0F2038] shadow-lg"
                          : "bg-white hover:bg-[#FDFBF7] text-[#0F2038] border-[#0F2038]/10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={activeToolkitChapter === idx ? "text-[#CBA258]" : "text-[#0F2038]/50"}>
                          CHAPTER {ch.number}
                        </span>
                        <span>{ch.pages}</span>
                      </div>
                      <h3 className="font-serif text-xl font-normal mt-2">{ch.title}</h3>
                    </button>
                  ))}
                </div>

                {/* Chapter Deep Preview (7 Cols) */}
                <div className="lg:col-span-7 p-8 sm:p-12 rounded-[24px] bg-white border border-[#0F2038]/15 shadow-xl text-[#0F2038]">
                  <div className="flex items-center justify-between pb-6 border-b border-[#0F2038]/10">
                    <span className="text-xs font-mono text-[#0F2038]/60 uppercase">
                      CHAPTER {toolkitChapters[activeToolkitChapter].number} OF 05
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0F2038]">
                      {toolkitChapters[activeToolkitChapter].pages}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-normal mt-6">
                    {toolkitChapters[activeToolkitChapter].title}
                  </h3>
                  <p className="text-sm font-mono text-[#0F2038]/60 mt-1">
                    {toolkitChapters[activeToolkitChapter].subtitle}
                  </p>

                  <p className="mt-6 text-sm text-[#0F2038]/80 leading-relaxed font-sans">
                    {toolkitChapters[activeToolkitChapter].summary}
                  </p>

                  {/* Included Worksheets */}
                  <div className="mt-8 p-6 rounded-2xl bg-[#FAFAFC] border border-[#0F2038]/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0F2038]/60 block mb-3 font-semibold">
                      INCLUDED PRINTABLE WORKSHEETS &amp; EXERCISES:
                    </span>
                    <div className="space-y-2">
                      {toolkitChapters[activeToolkitChapter].worksheets.map((ws, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-mono text-[#0F2038]">
                          <Check className="w-3.5 h-3.5 text-[#7B9B8A] shrink-0" />
                          <span>{ws}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Description, Audience & FAQ */}
          <section className="py-24 px-6 md:px-12 bg-white border-b border-[#0F2038]/8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left: Who it is for */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono tracking-widest text-[#0F2038]/60 uppercase block font-bold">
                  INTENDED AUDIENCE &amp; SCOPE
                </span>
                <h3 className="font-serif text-3xl font-normal text-[#0F2038]">
                  Who was this workbook created for?
                </h3>
                <p className="text-sm text-[#0F2038]/75 leading-relaxed font-sans">
                  The Psychology Toolkit was designed for individuals seeking structured self-reflection, psychology students, counselling interns, therapists, educators, and wellness practitioners.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    "Individuals seeking structured inner architecture without fluff",
                    "Psychology students & counselling interns building clinical foundations",
                    "Therapists & counselors seeking printable client reflection adjuncts",
                    "Educators & researchers interested in applied cognitive frameworks",
                  ].map((aud, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F2038]/80 font-sans">
                      <Check className="w-4 h-4 text-[#7B9B8A] shrink-0 mt-0.5" />
                      <span>{aud}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#0F2038]/10 text-xs text-[#0F2038]/70 leading-relaxed font-mono">
                  <strong>Clinical Notice:</strong> This workbook is an educational self-inquiry tool and does not replace emergency psychiatric intervention or personalized psychotherapy.
                </div>
              </div>

              {/* Right: FAQ Accordions */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#0F2038]/60 uppercase block font-bold mb-4">
                  FREQUENTLY ASKED QUESTIONS
                </span>

                {toolkitFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#0F2038]/10 bg-[#FAFAFC] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-normal text-[#0F2038] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0F2038]/50 transition-transform duration-200 ${
                          openFaqIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-[#0F2038]/75 leading-relaxed font-sans border-t border-[#0F2038]/5 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Transparent Journey Pricing */}
          <section className="py-24 px-6 md:px-12 bg-[#0F2038] text-[#FDFBF7] border-b border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono text-[#CBA258] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIWALI SPECIAL PRICE ACTIVE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                Acquire The Psychology Toolkit
              </h2>

              <p className="mt-4 text-sm sm:text-base text-ivory/70 max-w-xl mx-auto leading-relaxed">
                Receive the 80-page A4 printable master PDF and companion worksheet files instantly upon checkout.
              </p>

              <div className="mt-12 p-8 sm:p-12 rounded-[28px] bg-[#16253B] border border-white/15 shadow-2xl max-w-lg mx-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-[#CBA258] block">
                  DIGITAL MASTER WORKBOOK EDITION
                </span>

                <div className="mt-4 flex items-baseline justify-center gap-3">
                  <span className="font-serif text-5xl font-bold text-white">
                    ₹{BOOKS_PRICING.toolkit.diwali.inr}
                  </span>
                  <span className="text-sm text-ivory/60 font-mono">
                    / ${BOOKS_PRICING.toolkit.diwali.usd} USD
                  </span>
                </div>

                <span className="mt-2 text-xs font-mono text-emerald-300 block">
                  {BOOKS_PRICING.toolkit.diwali.savingsInr} • Instant Delivery
                </span>

                <div className="mt-8 space-y-2 text-left text-xs font-mono text-ivory/80 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#CBA258]" />
                    <span>80-Page Master A4 PDF (Print-ready)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#CBA258]" />
                    <span>15+ Structured Clinical Worksheets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#CBA258]" />
                    <span>Tablet &amp; iPad Note-Taking Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#CBA258]" />
                    <span>Direct Access to CentreLine Support</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/books/psychology-toolkit"
                    className="w-full text-center py-4 rounded-full bg-[#CBA258] text-[#0F2038] font-bold text-xs uppercase tracking-wider block hover:bg-[#E5BE78] transition-colors shadow-lg"
                  >
                    Acquire The Psychology Toolkit Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── 4. UNFOLDING JOURNEY: FINDING THE CENTRE ── */}
      {selectedBook === "centre" && (
        <div className="animate-fadeIn">
          {/* Contemplative Themes */}
          <section className="py-24 px-6 md:px-12 bg-white border-b border-[#0F2038]/8">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono tracking-widest text-[#7B9B8A] uppercase block mb-3 font-bold">
                  CONTEMPLATIVE INQUIRY // 5 CORE THEMES
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0F2038] tracking-tight leading-tight">
                  Quietness, Solitude &amp; Inner Equilibrium
                </h2>
                <p className="mt-4 text-base text-[#0F2038]/70 font-sans leading-relaxed">
                  Finding The Centre is an invitation to slow down. It offers a calm, spacious philosophy for navigating emotional turbulence without losing yourself.
                </p>
              </div>

              {/* Interactive Themes Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {centreThemes.map((theme, idx) => (
                    <button
                      key={theme.number}
                      onClick={() => setActiveCentreTheme(idx)}
                      className={`text-left p-5 rounded-[18px] border transition-all duration-200 cursor-pointer ${
                        activeCentreTheme === idx
                          ? "bg-[#1E3557] text-[#FDFBF7] border-[#1E3557] shadow-lg"
                          : "bg-white hover:bg-[#FDFBF7] text-[#0F2038] border-[#0F2038]/10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={activeCentreTheme === idx ? "text-[#7B9B8A]" : "text-[#0F2038]/50"}>
                          THEME {theme.number}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-normal mt-2">{theme.title}</h3>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-7 p-8 sm:p-12 rounded-[24px] bg-[#FAFAFC] border border-[#0F2038]/15 shadow-xl text-[#0F2038]">
                  <span className="text-xs font-mono text-[#7B9B8A] uppercase font-bold">
                    THEME {centreThemes[activeCentreTheme].number} // {centreThemes[activeCentreTheme].subtitle.toUpperCase()}
                  </span>

                  <h3 className="font-serif text-3xl font-normal mt-4">
                    {centreThemes[activeCentreTheme].title}
                  </h3>

                  <blockquote className="my-6 p-6 rounded-2xl bg-white border-l-4 border-[#7B9B8A] italic font-serif text-lg text-[#0F2038]/90">
                    &ldquo;{centreThemes[activeCentreTheme].quote}&rdquo;
                  </blockquote>

                  <p className="text-sm text-[#0F2038]/80 leading-relaxed font-sans">
                    {centreThemes[activeCentreTheme].reflection}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Formats & Pricing for Finding The Centre */}
          <section className="py-24 px-6 md:px-12 bg-[#1E3557] text-[#FDFBF7] border-b border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7B9B8A] block mb-4 font-bold">
                FORMATS &amp; ACQUISITION
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                Experience Finding The Centre
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto text-left">
                {/* eBook */}
                <div className="p-8 rounded-[24px] bg-white/10 border border-white/15 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#7B9B8A]">DIGITAL EDITION</span>
                    <h3 className="font-serif text-2xl font-normal text-white mt-2">eBook Edition</h3>
                    <p className="text-xs text-ivory/70 mt-2 font-sans">Instant PDF &amp; EPUB access for tablets, e-readers, and phones.</p>
                    <div className="mt-6">
                      <span className="font-serif text-3xl font-bold text-white">
                        ₹{BOOKS_PRICING.findingTheCentre.ebook.inr}
                      </span>
                      <span className="text-xs text-ivory/60 font-mono ml-2">(${BOOKS_PRICING.findingTheCentre.ebook.usd})</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/books/finding-the-centre"
                      className="w-full text-center py-3 rounded-full bg-white text-[#0F2038] font-bold text-xs uppercase tracking-wider block hover:bg-[#7B9B8A] hover:text-white transition-colors"
                    >
                      Acquire eBook
                    </Link>
                  </div>
                </div>

                {/* Print */}
                <div className="p-8 rounded-[24px] bg-white/10 border border-white/15 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#7B9B8A]">COLLECTOR PRINT</span>
                    <h3 className="font-serif text-2xl font-normal text-white mt-2">Hardcover Print</h3>
                    <p className="text-xs text-ivory/70 mt-2 font-sans">Premium archival hardcover edition delivered to your doorstep.</p>
                    <div className="mt-6">
                      <span className="font-serif text-3xl font-bold text-white">
                        ₹{BOOKS_PRICING.findingTheCentre.print.inr}
                      </span>
                      <span className="text-xs text-ivory/60 font-mono ml-2">(${BOOKS_PRICING.findingTheCentre.print.usd})</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/books/finding-the-centre"
                      className="w-full text-center py-3 rounded-full bg-white text-[#0F2038] font-bold text-xs uppercase tracking-wider block hover:bg-[#7B9B8A] hover:text-white transition-colors"
                    >
                      Order Hardcover
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── 5. DELIBERATE VISUAL BREAK & TRANSITION ── */}
      <div className="py-16 bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs font-mono text-[#0F2038]/30">
          <div className="w-12 h-px bg-[#0F2038]/15" />
          <span>Ψ PILLOWDREAMWORKS DUALITY</span>
          <div className="w-12 h-px bg-[#0F2038]/15" />
        </div>
      </div>

      {/* ── 6. THE BUNDLE DISCOVERY: THE COMPLETE PAIRING ── */}
      <section className="py-24 px-6 md:px-12 bg-[#0F2038] text-[#FDFBF7] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#142236] border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBA258]">
                <Sparkles className="w-4 h-4" />
                <span>THE COMPLETE COMPANION BUNDLE (SAVE 20%)</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
                The Psychology Toolkit + Finding The Centre
              </h2>

              <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-sans">
                Experience both sides of PillowDreamWorks: The structured clinical worksheets of The Toolkit paired with the quiet mindfulness philosophy of Finding The Centre.
              </p>

              {/* 2-Way Return Links to Explore Either Book */}
              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono">
                <button
                  onClick={() => {
                    setSelectedBook("toolkit");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="text-[#CBA258] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Review The Psychology Toolkit</span>
                </button>
                <span className="text-ivory/30">•</span>
                <button
                  onClick={() => {
                    setSelectedBook("centre");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="text-[#7B9B8A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Review Finding The Centre</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 shrink-0 text-center lg:text-right">
              <div>
                <span className="text-xs font-mono text-ivory/50 line-through block">
                  Regular Total: ₹{BOOKS_PRICING.bundle.regularValue.inr} (${BOOKS_PRICING.bundle.regularValue.usd})
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#CBA258]">
                  ₹{BOOKS_PRICING.bundle.price.inr}
                </span>
                <span className="text-xs font-mono text-ivory/70 block mt-1">
                  / ${BOOKS_PRICING.bundle.price.usd} USD ({BOOKS_PRICING.bundle.price.savingsInr})
                </span>
              </div>

              <Link
                href="/books/bundles"
                className="px-8 py-4 rounded-full bg-[#CBA258] text-[#0F2038] font-bold text-xs uppercase tracking-widest hover:bg-[#E5BE78] transition-colors shadow-lg"
              >
                Claim Dual Companion Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
