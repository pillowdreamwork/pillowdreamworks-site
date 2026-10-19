"use client";

import React, { useState, useMemo, useId } from "react";
import Link from "next/link";
import {
  PSYCH_ASSESSMENTS,
  FullAssessmentItem,
  buildAssessmentInterpretation,
  AssessmentInterpretation,
} from "@/data/assessments-full-catalog";
import { SERVICES_PRICING, CHECKOUT_NOTICE } from "@/data/pricing";
import { ASSESSMENT_FAQS, ASSESSMENT_RESULT_FAQS } from "@/data/assessment-faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Search,
  Copy,
  Check,
  RotateCcw,
  Printer,
  Calendar,
  Layers,
  Brain,
  Filter,
  User,
  Info,
  X,
} from "lucide-react";

export function AssessmentCentre() {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "free" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTest, setActiveTest] = useState<FullAssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [interpretationResult, setInterpretationResult] = useState<AssessmentInterpretation | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const searchInputId = useId();
  const domainSelectId = useId();

  // All unique domains across the 177 assessments
  const domains = useMemo(() => {
    const list = Array.from(new Set(PSYCH_ASSESSMENTS.map((a) => a.domain)));
    return ["all", ...list];
  }, []);

  // Filter logic
  const filteredAssessments = useMemo(() => {
    return PSYCH_ASSESSMENTS.filter((item) => {
      // Type filter
      if (typeFilter === "free" && item.isPaid) return false;
      if (typeFilter === "paid" && !item.isPaid) return false;

      // Domain filter
      if (selectedDomain !== "all" && item.domain !== selectedDomain) return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const desc = Array.isArray(item.description) ? item.description.join(" ") : item.description;
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.breadcrumb.toLowerCase().includes(q) ||
          (desc && desc.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [typeFilter, selectedDomain, searchQuery]);

  const freeCount = useMemo(() => PSYCH_ASSESSMENTS.filter((a) => !a.isPaid).length, []);
  const paidCount = useMemo(() => PSYCH_ASSESSMENTS.filter((a) => a.isPaid).length, []);

  const handleStartTest = (item: FullAssessmentItem) => {
    if (item.isPaid || !item.questions || item.questions.length === 0) return;
    setActiveTest(item);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(item.questions.length).fill(-1));
    setInterpretationResult(null);
  };

  const handleSelectOption = (questionIdx: number, optionVal: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionVal;
    setAnswers(newAnswers);

    if (activeTest && activeTest.questions) {
      const currentTest = activeTest;
      const currentScoring = activeTest.scoring;
      if (questionIdx < activeTest.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(questionIdx + 1);
        }, 180);
      } else {
        // Last question answered - check if all questions answered for auto-submit
        const allAnswered = newAnswers.every((a) => a !== -1);
        if (allAnswered && currentScoring) {
          setTimeout(() => {
            const scoringRes = currentScoring(newAnswers);
            const interp = buildAssessmentInterpretation(currentTest, scoringRes);
            setInterpretationResult(interp);
          }, 250);
        }
      }
    }
  };

  const handleSubmitAnswers = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeTest || !activeTest.scoring) return;

    if (answers.some((a) => a === -1)) {
      const firstUnanswered = answers.findIndex((a) => a === -1);
      if (firstUnanswered !== -1) {
        setCurrentQuestionIndex(firstUnanswered);
      }
      alert("Please answer all questions before submitting.");
      return;
    }

    const scoringRes = activeTest.scoring(answers);
    const interp = buildAssessmentInterpretation(activeTest, scoringRes);
    setInterpretationResult(interp);
  };

  const handleResetTest = () => {
    if (activeTest && activeTest.questions) {
      setAnswers(new Array(activeTest.questions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setInterpretationResult(null);
    }
  };

  const handleCopySummary = () => {
    if (!activeTest || !interpretationResult) return;
    const text = `
=== ${activeTest.title} ===
Respondent: ${userName || "Anonymous Respondent"}${userAge ? ` (Age: ${userAge})` : ""}
Domain: ${activeTest.domain}
Summary: ${interpretationResult.title}

STATEMENT:
${interpretationResult.statement}

INTERPRETATION:
${interpretationResult.interpretation}

DISCUSSION:
${interpretationResult.discussion.join("\n\n")}

CONCLUSION:
${interpretationResult.conclusion}

MEASURES BREAKDOWN:
${interpretationResult.rows.map((r) => `- ${r.measure}: ${r.score}/${r.maxScore} (${r.percentage.toFixed(1)}%) — ${r.level}\n  Meaning: ${r.meaning}`).join("\n")}

${interpretationResult.note}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* 1. EDITORIAL HEADER */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6B7A1]/20 text-[#24483B] text-xs font-semibold tracking-wide border border-[#A6B7A1]/40 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#24483B]" />
          <span>177 Standardized Clinical & Self-Inventories</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202923] font-normal tracking-tight">
          The Comprehensive Assessment Centre
        </h1>
        <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed max-w-3xl mx-auto font-sans">
          Access all <strong>161 free self-administered screeners</strong> and <strong>16 practitioner-administered batteries</strong> across 15 psychological domains. Each instrument generates personalized factor analysis, reflective discussion, a synthesis conclusion, and itemized subscale metrics.
        </p>
      </div>

      {/* Checkout / booking status notice */}
      <div className="p-5 rounded-3xl bg-[#F5EFE6]/80 backdrop-blur-md border border-[#24483B]/15 flex items-start gap-3.5 text-sm text-[#202923]/80 shadow-xs">
        <Info className="w-4 h-4 text-[#24483B] shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed">
          <strong className="text-[#202923] font-semibold">{CHECKOUT_NOTICE}</strong> Practitioner-administered
          assessments are currently arranged by enquiry, and free screeners can be taken here at
          no cost.
        </p>
      </div>

      {/* 2. FILTER & DISCOVERY TOOLBAR (LIQUID GLASS CONSOLE) */}
      <div className="bg-[#FDFBF7]/80 backdrop-blur-2xl border border-[#24483B]/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Top Controls: 3 Liquid Glass Pill Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 border-b border-[#24483B]/10 pb-6">
          {/* Alive Liquid-Glass Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 p-1.5 rounded-full bg-[#F5EFE6]/70 border border-[#24483B]/10 backdrop-blur-md">
            <LiquidGlassButton
              type="button"
              onClick={() => setTypeFilter("all")}
              variant={typeFilter === "all" ? "primary" : "subtle"}
              size="md"
              signalDot={typeFilter === "all"}
              className="px-5 text-xs sm:text-sm"
            >
              <span>All Instruments (177)</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              type="button"
              onClick={() => setTypeFilter("free")}
              variant={typeFilter === "free" ? "primary" : "subtle"}
              size="md"
              signalDot={typeFilter === "free"}
              className="px-5 text-xs sm:text-sm"
            >
              <span>Free Screeners ({freeCount})</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              type="button"
              onClick={() => setTypeFilter("paid")}
              variant={typeFilter === "paid" ? "primary" : "subtle"}
              size="md"
              signalDot={typeFilter === "paid"}
              className="px-5 text-xs sm:text-sm"
            >
              <span>Clinical Batteries ({paidCount})</span>
            </LiquidGlassButton>
          </div>

          {/* Results Badge */}
          <div className="text-xs font-semibold text-[#202923]/60 flex items-center gap-2 self-center lg:self-auto px-4 py-2 rounded-full bg-white/40 border border-[#24483B]/10">
            <span>Showing</span>
            <strong className="text-[#202923] text-sm font-serif">{filteredAssessments.length}</strong>
            <span>assessments</span>
          </div>
        </div>

        {/* Search & Domain Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Field (Liquid Glass Pill) */}
          <div className="md:col-span-8 relative">
            <label htmlFor={searchInputId} className="sr-only">Search assessments</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#202923]/40 pointer-events-none" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search by instrument name, code, domain, or clinical keyword (e.g. anxiety, bdi, trauma, big five, rorschach)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full bg-white/70 backdrop-blur-md border border-[#24483B]/15 text-sm text-[#202923] placeholder:text-[#202923]/40 focus:outline-none focus:ring-2 focus:ring-[#C6A46A] min-h-[44px] transition-all shadow-xs"
            />
          </div>

          {/* Domain Dropdown / Category Manual (Liquid Glass Pill) */}
          <div className="md:col-span-4 relative">
            <label htmlFor={domainSelectId} className="sr-only">Category manual — Filter by psychological domain</label>
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#202923]/40 pointer-events-none" />
            <select
              id={domainSelectId}
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/70 backdrop-blur-md border border-[#24483B]/15 text-xs sm:text-sm font-medium text-[#202923] focus:outline-none focus:ring-2 focus:ring-[#C6A46A] min-h-[44px] transition-all appearance-none cursor-pointer shadow-xs"
            >
              <option value="all">Category Manual: All 15 Domains</option>
              {domains
                .filter((d) => d !== "all")
                .map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Optional Intake Personalization */}
        <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-[#202923]/70 border-t border-[#24483B]/10">
          <div className="flex items-center gap-1.5 text-[#202923] font-semibold">
            <User className="w-3.5 h-3.5 text-[#24483B]" />
            <span>Personalize Report (Optional):</span>
          </div>
          <input
            type="text"
            placeholder="Your Name / Identifier"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#24483B]/15 text-xs text-[#202923] placeholder:text-[#202923]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A46A] min-h-[38px]"
          />
          <input
            type="text"
            placeholder="Age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            className="w-24 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#24483B]/15 text-xs text-[#202923] placeholder:text-[#202923]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A46A] min-h-[38px]"
          />
          <span className="text-[11px] text-[#202923]/50 ml-auto hidden md:inline">
            🔒 Private & Client-side Evaluation Only
          </span>
        </div>
      </div>

      {/* 3. ASSESSMENTS GRID (177 LIQUID GLASS CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((item) => {
          const desc = Array.isArray(item.description) ? item.description.join(" ") : item.description;
          return (
            <div
              key={item.id}
              className="bg-[#FDFBF7]/90 backdrop-blur-xl rounded-3xl p-7 border border-[#24483B]/15 hover:border-[#24483B]/35 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Badge & Domain */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#24483B] bg-[#F5EFE6] px-3 py-1 rounded-full border border-[#24483B]/10">
                    {item.domain}
                  </span>
                  {item.isPaid ? (
                    <span className="px-3 py-1 bg-[#151C17] text-[#FDFBF7] text-[10px] font-bold rounded-full border border-white/10 shadow-xs">
                      Clinical Battery
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200 shadow-xs">
                      FREE · {item.questions?.length || 0} Qs
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[10px] text-[#202923]/50 uppercase tracking-wider font-semibold">
                    {item.breadcrumb}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#202923] group-hover:text-[#24483B] transition-colors mt-0.5 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#202923]/75 leading-relaxed line-clamp-3 font-sans">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] text-[#202923]/65 pt-1">
                  <span className="px-3 py-1 bg-[#F5EFE6]/70 rounded-full border border-[#24483B]/10">
                    {item.whoCanTake}
                  </span>
                  {item.duration && (
                    <span className="px-3 py-1 bg-[#F5EFE6]/70 rounded-full border border-[#24483B]/10 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#202923]/40" />
                      {item.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Pure Liquid Glass Buttons with 9 Alive Details */}
              <div className="pt-6 mt-6 border-t border-[#24483B]/10 space-y-3">
                {item.isPaid ? (
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between px-1">
                      <span className="text-xs text-[#202923]/55">Professional Fee:</span>
                      <div className="text-right">
                        <span className="font-serif font-bold text-base text-[#202923]">
                          {typeof item.priceINR === "number" ? `₹${item.priceINR.toLocaleString("en-IN")}` : "—"}
                        </span>
                        <span className="text-xs text-[#202923]/50 ml-1">
                          {typeof item.priceUSD === "number" ? `($${item.priceUSD})` : ""}
                        </span>
                      </div>
                    </div>
                    <LiquidGlassButton
                      href="/contact"
                      variant="gold"
                      size="md"
                      className="w-full justify-between"
                      showArrow
                      signalDot={false}
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Enquire About Battery</span>
                      </span>
                    </LiquidGlassButton>
                  </div>
                ) : (
                  <LiquidGlassButton
                    type="button"
                    onClick={() => handleStartTest(item)}
                    variant="primary"
                    size="md"
                    className="w-full justify-between shadow-sm"
                    showArrow
                    signalDot
                  >
                    <span>Take Free Assessment</span>
                  </LiquidGlassButton>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. FAQ */}
      <section aria-labelledby="assessment-faq-heading" className="space-y-5 pt-4">
        <div className="mx-auto max-w-3xl space-y-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#24483B] block">
            Before you start
          </span>
          <h2 id="assessment-faq-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#202923]">
            Questions about the assessments
          </h2>
          <p className="text-sm text-[#202923]/70 font-sans">
            How answers, results, practitioner review and your data are actually handled.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion groups={[{ items: ASSESSMENT_FAQS }]} />
        </div>
      </section>

      {/* 5. INTERACTIVE TEST MODAL / RESULTS RUNNER (FULL LIQUID GLASS SANCTUARY) */}
      {activeTest && activeTest.questions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#151C17]/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FDFBF7]/95 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-[#24483B]/10 bg-[#F5EFE6]/80 backdrop-blur-md flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] text-[#202923]/50 font-bold uppercase tracking-wider">
                  {activeTest.breadcrumb}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#202923] mt-1">
                  {activeTest.title}
                </h2>
                <p className="text-xs text-[#202923]/60 mt-0.5 font-sans">
                  {activeTest.whoCanTake} · Self-Administered · Free
                  {userName ? ` · Respondent: ${userName}` : ""}
                </p>
              </div>

              <LiquidGlassButton
                type="button"
                onClick={() => setActiveTest(null)}
                variant="subtle"
                size="icon"
                signalDot={false}
                aria-label="Close modal"
                className="shrink-0"
              >
                <X className="w-4 h-4 text-[#202923]" />
              </LiquidGlassButton>
            </div>

            {/* Modal Body: Questionnaire OR Full Clinical Result Profile */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {!interpretationResult ? (
                /* QUESTIONNAIRE RUNNER */
                <form onSubmit={handleSubmitAnswers} className="space-y-6">
                  {/* Progress & Quick Question Jump Bar */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#202923]/70 font-sans">
                      <span>
                        Prompt <strong className="text-[#202923] font-semibold">{currentQuestionIndex + 1}</strong> of {activeTest.questions.length}
                      </span>
                      <span>
                        Answered: <strong className="text-[#202923] font-semibold">{answers.filter((a) => a !== -1).length}</strong> / {activeTest.questions.length}
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-[#202923]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#24483B] to-[#C6A46A] transition-all duration-300 rounded-full"
                        style={{
                          width: `${((answers.filter((a) => a !== -1).length) / activeTest.questions.length) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Question Jump Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeTest.questions.map((_, qIdx) => {
                        const isAnswered = answers[qIdx] !== -1;
                        const isCurrent = currentQuestionIndex === qIdx;
                        return (
                          <LiquidGlassButton
                            type="button"
                            key={qIdx}
                            onClick={() => setCurrentQuestionIndex(qIdx)}
                            variant={isCurrent ? "primary" : isAnswered ? "secondary" : "subtle"}
                            size="icon"
                            signalDot={false}
                            className={`size-9 min-h-[36px] min-w-[36px] text-xs font-bold ${
                              isCurrent ? "ring-2 ring-[#C6A46A]" : ""
                            }`}
                            aria-label={`Jump to item ${qIdx + 1}`}
                          >
                            <span>{qIdx + 1}</span>
                          </LiquidGlassButton>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Question Card (Liquid Glass Surface) */}
                  <div className="bg-[#F5EFE6]/75 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#24483B]/15 space-y-5 shadow-xs">
                    <span className="text-[11px] font-semibold text-[#24483B] uppercase tracking-wider block">
                      Item {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#202923] font-bold leading-relaxed">
                      {activeTest.questions[currentQuestionIndex]}
                    </h3>

                    {/* Radio Options Grid — Converted to Pure Liquid Glass Buttons with Alive Details */}
                    <div className="space-y-3 pt-2">
                      {activeTest.options?.map((optionText, optIdx) => {
                        const isSelected = answers[currentQuestionIndex] === optIdx;
                        return (
                          <button
                            type="button"
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                            className={`w-full text-left min-h-[50px] p-4 sm:px-6 sm:py-3.5 rounded-2xl sm:rounded-full border text-sm font-medium transition-all duration-[350ms] flex items-center justify-between gap-3.5 cursor-pointer active:scale-[0.97] group relative overflow-hidden ${
                              isSelected
                                ? "bg-[#151C17] text-[#FDFBF7] border-white/25 shadow-md font-semibold"
                                : "bg-white/60 text-[#202923] hover:bg-white/95 border-[#24483B]/15 hover:border-[#24483B]/35 shadow-xs"
                            }`}
                          >
                            {/* Inner cursor glow effect for each option */}
                            <span
                              className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: isSelected
                                  ? "radial-gradient(120px circle, rgba(255,255,255,0.18), transparent 70%)"
                                  : "radial-gradient(120px circle, rgba(36,72,59,0.08), transparent 70%)",
                              }}
                            />

                            <span className="flex items-center gap-3 relative z-10">
                              {/* Signal red dot when selected */}
                              {isSelected && (
                                <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E85D3F] opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E85D3F] shadow-[0_0_8px_rgba(232,93,63,0.9)]" />
                                </span>
                              )}
                              <span>{optionText}</span>
                            </span>

                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 relative z-10 ${
                                isSelected
                                  ? "border-white/40 bg-white/20 text-[#FDFBF7] font-bold"
                                  : "border-[#202923]/30 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons & Submit Bar with 9 Alive Details */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2.5">
                      <LiquidGlassButton
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        variant="subtle"
                        size="md"
                        signalDot={false}
                        className="px-5"
                      >
                        <span>← Previous</span>
                      </LiquidGlassButton>

                      {currentQuestionIndex < activeTest.questions.length - 1 && (
                        <LiquidGlassButton
                          type="button"
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          variant="secondary"
                          size="md"
                          showArrow
                          signalDot={false}
                          className="px-5"
                        >
                          <span>Next</span>
                        </LiquidGlassButton>
                      )}
                    </div>

                    {/* Submit Button (Almost Black Liquid Glass with Signal Red Dot & 350ms Arrow Turn) */}
                    <LiquidGlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      signalDot
                      showArrow
                      className="px-8 shadow-md"
                    >
                      <span>
                        {answers.every((a) => a !== -1)
                          ? "Submit Assessment & View Results"
                          : `Submit Assessment (${answers.filter((a) => a !== -1).length}/${activeTest.questions.length} Answered)`}
                      </span>
                    </LiquidGlassButton>
                  </div>
                </form>
              ) : (
                /* COMPLETE INDIVIDUAL SCORING, FACTOR ANALYSIS, RESULT, DISCUSSION & CONCLUSION */
                <div className="space-y-8 animate-fadeIn">
                  {/* 1. HERO RESULT BANNER */}
                  <div className="bg-[#F5EFE6]/85 backdrop-blur-xl rounded-3xl p-7 border border-[#24483B]/15 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24483B]/10 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#202923]/50 block">
                          {interpretationResult.category}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#202923] mt-0.5">
                          {activeTest.title}
                        </h3>
                        <p className="text-xs text-[#202923]/60 mt-0.5 font-sans">
                          Results for {userName || "Valued Respondent"} · Self-Administered
                        </p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-[#151C17] text-[#FDFBF7] self-start sm:self-auto border border-white/10 shadow-xs">
                        {interpretationResult.title}
                      </span>
                    </div>

                    <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#24483B]/10 space-y-2">
                      <div className="text-xs font-semibold text-[#202923]/50 uppercase tracking-wider">
                        Result Statement
                      </div>
                      <p className="text-sm font-medium text-[#202923] leading-relaxed font-sans">
                        {interpretationResult.statement}
                      </p>
                    </div>
                  </div>

                  {/* 2. FACTOR ANALYSIS & MEASURES TABLE */}
                  <div className="bg-[#FDFBF7]/90 backdrop-blur-xl rounded-3xl p-7 border border-[#24483B]/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-3">
                      <Layers className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Itemized Measures & Factor Profile
                      </h4>
                    </div>

                    {/* Factor Progress Bars */}
                    <div className="space-y-4 pt-1">
                      {interpretationResult.rows.map((row, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#202923]">{row.measure}</span>
                            <span className="text-[#202923]/60 font-mono">
                              {row.score} / {row.maxScore} ({row.percentage.toFixed(1)}%) — <strong>{row.level}</strong>
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-[#202923]/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#24483B] to-[#C6A46A] rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(0, row.percentage))}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-[#202923]/65 leading-relaxed pt-0.5 font-sans">
                            {row.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. CLINICAL INTERPRETATION & DISCUSSION */}
                  <div className="bg-[#FDFBF7]/90 backdrop-blur-xl rounded-3xl p-7 border border-[#24483B]/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-3">
                      <Brain className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Detailed Clinical & Reflective Discussion
                      </h4>
                    </div>

                    <div className="space-y-3.5 text-sm text-[#202923]/80 leading-relaxed font-sans">
                      <p className="font-medium text-[#202923]/95">
                        {interpretationResult.interpretation}
                      </p>
                      {interpretationResult.discussion.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* 4. SYNTHESIS CONCLUSION */}
                  <div className="bg-[#A6B7A1]/20 backdrop-blur-xl rounded-3xl p-7 border border-[#A6B7A1]/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#24483B]" />
                      <h4 className="font-serif text-lg font-bold text-[#1A3529]">
                        Conclusion & Reflective Next Steps
                      </h4>
                    </div>
                    <p className="text-sm text-[#1A3529]/90 leading-relaxed font-sans">
                      {interpretationResult.conclusion}
                    </p>
                  </div>

                  {/* 5. EDUCATIONAL DISCLAIMER */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed font-sans">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{interpretationResult.note}</span>
                  </div>

                  {/* 6. QUESTIONS ABOUT YOUR RESULTS */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-2">
                      <Info className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Questions about your results
                      </h4>
                    </div>
                    <FaqAccordion compact groups={[{ items: ASSESSMENT_RESULT_FAQS }]} />
                  </div>

                  {/* 7. ACTION BUTTONS (ALL LIQUID GLASS WITH 9 ALIVE DETAILS) */}
                  <div className="pt-4 flex flex-wrap items-center gap-3.5">
                    <LiquidGlassButton
                      type="button"
                      onClick={handleCopySummary}
                      variant="secondary"
                      size="md"
                      signalDot={false}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                      <span>{copied ? "Copied to Clipboard!" : "Copy Full Profile"}</span>
                    </LiquidGlassButton>

                    <LiquidGlassButton
                      type="button"
                      onClick={() => window.print()}
                      variant="subtle"
                      size="md"
                      signalDot={false}
                    >
                      <Printer className="w-3.5 h-3.5 mr-1" />
                      <span>Print Profile</span>
                    </LiquidGlassButton>

                    <LiquidGlassButton
                      type="button"
                      onClick={handleResetTest}
                      variant="subtle"
                      size="md"
                      signalDot={false}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      <span>Retake Assessment</span>
                    </LiquidGlassButton>

                    <LiquidGlassButton
                      href="/contact"
                      variant="primary"
                      size="md"
                      signalDot
                      showArrow
                      className="ml-auto px-7"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Review Session ({SERVICES_PRICING.counselling.singleSession.formattedInr})</span>
                      </span>
                    </LiquidGlassButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
