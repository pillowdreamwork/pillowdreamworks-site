"use client";

import React, { useState, useMemo, useId } from "react";
import Link from "next/link";
import {
  PSYCH_ASSESSMENTS,
  FullAssessmentItem,
  buildAssessmentInterpretation,
  AssessmentInterpretation,
} from "@/data/assessments-full-catalog";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  Printer,
  Calendar,
  Layers,
  HeartHandshake,
  Brain,
  Shield,
  FileText,
  Activity,
  Filter,
  User,
  Zap,
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
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-50 text-sage-700 text-xs font-semibold tracking-wide border border-sage-200">
          <Sparkles className="w-3.5 h-3.5 text-sage-600" />
          <span>177 Standardized Clinical & Self-Inventories</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-normal tracking-tight">
          The Comprehensive Assessment Centre
        </h1>
        <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-3xl mx-auto">
          Access all <strong>161 free self-administered screeners</strong> and <strong>16 clinician-administered projective batteries</strong> across 15 psychological domains. Each instrument generates personalized factor analysis, clinical discussion, synthesis conclusion, and itemized subscale metrics.
        </p>
      </div>

      {/* 2. FILTER & DISCOVERY TOOLBAR */}
      <div className="bg-cream/80 border border-navy/10 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        {/* Top Controls: Type Tabs & Counters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
          {/* Type Toggle Tabs */}
          <div className="flex items-center gap-1.5 bg-ivory p-1.5 rounded-xl border border-navy/10">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                typeFilter === "all"
                  ? "bg-navy text-ivory shadow-xs"
                  : "text-navy/70 hover:text-navy"
              }`}
            >
              All Instruments ({PSYCH_ASSESSMENTS.length})
            </button>
            <button
              onClick={() => setTypeFilter("free")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                typeFilter === "free"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-navy/70 hover:text-navy"
              }`}
            >
              Free Screeners ({freeCount})
            </button>
            <button
              onClick={() => setTypeFilter("paid")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                typeFilter === "paid"
                  ? "bg-navy text-ivory shadow-xs"
                  : "text-navy/70 hover:text-navy"
              }`}
            >
              Clinical Batteries ({paidCount})
            </button>
          </div>

          {/* Results Badge */}
          <div className="text-xs font-semibold text-navy/60 flex items-center gap-1.5 self-center sm:self-auto">
            <span>Showing</span>
            <strong className="text-navy text-sm font-serif">{filteredAssessments.length}</strong>
            <span>assessments</span>
          </div>
        </div>

        {/* Search & Domain Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Field */}
          <div className="md:col-span-8 relative">
            <label htmlFor={searchInputId} className="sr-only">Search assessments</label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search by instrument name, code, domain, or clinical keyword (e.g. anxiety, bdi, trauma, big five, rorschach)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ivory border border-navy/15 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>

          {/* Domain Dropdown */}
          <div className="md:col-span-4 relative">
            <label htmlFor={domainSelectId} className="sr-only">Filter by psychological domain</label>
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            <select
              id={domainSelectId}
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-ivory border border-navy/15 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All 15 Psychological Domains</option>
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
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-navy/70 border-t border-navy/10">
          <div className="flex items-center gap-1.5 text-navy font-semibold">
            <User className="w-3.5 h-3.5 text-sage-700" />
            <span>Personalize Report (Optional):</span>
          </div>
          <input
            type="text"
            placeholder="Your Name / Identifier"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-3 py-1 rounded-lg bg-ivory border border-navy/15 text-xs text-navy placeholder:text-navy/40 focus:outline-none focus:ring-1 focus:ring-navy/30"
          />
          <input
            type="text"
            placeholder="Age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            className="w-20 px-3 py-1 rounded-lg bg-ivory border border-navy/15 text-xs text-navy placeholder:text-navy/40 focus:outline-none focus:ring-1 focus:ring-navy/30"
          />
          <span className="text-[11px] text-navy/40 ml-auto hidden md:inline">
            🔒 Private & Client-side Only
          </span>
        </div>
      </div>

      {/* 3. ASSESSMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((item) => {
          const desc = Array.isArray(item.description) ? item.description.join(" ") : item.description;
          return (
            <div
              key={item.id}
              className="bg-ivory rounded-2xl p-6 border border-navy/15 hover:border-navy/30 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Badge & Domain */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-navy bg-cream px-2.5 py-0.5 rounded-full border border-navy/10">
                    {item.domain}
                  </span>
                  {item.isPaid ? (
                    <span className="px-2.5 py-0.5 bg-navy text-ivory text-[10px] font-bold rounded-full">
                      Clinical Battery
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                      FREE · {item.questions?.length || 0} Qs
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[10px] text-navy/50 uppercase tracking-wider font-semibold">
                    {item.breadcrumb}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-navy-light transition-colors mt-0.5 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-navy/70 leading-relaxed line-clamp-3">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] text-navy/60 pt-1">
                  <span className="px-2 py-0.5 bg-cream/70 rounded-md border border-navy/5">
                    {item.whoCanTake}
                  </span>
                  {item.duration && (
                    <span className="px-2 py-0.5 bg-cream/70 rounded-md border border-navy/5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-navy/40" />
                      {item.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-navy/10 space-y-3">
                {item.isPaid ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-navy/50">Fee:</span>
                      <div className="text-right">
                        <span className="font-serif font-bold text-base text-navy">
                          ₹{item.priceINR?.toLocaleString("en-IN") || "2,999"}
                        </span>
                        <span className="text-xs text-navy/50 ml-1">
                          (${item.priceUSD || 104})
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Diagnostic Session</span>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartTest(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy hover:bg-navy-light text-ivory text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    <span>Take Free Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. INTERACTIVE TEST MODAL / RESULTS RUNNER */}
      {activeTest && activeTest.questions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-ivory rounded-2xl border border-navy/20 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-navy/10 bg-cream/80 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] text-navy/50 font-bold uppercase tracking-wider">
                  {activeTest.breadcrumb}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy mt-1">
                  {activeTest.title}
                </h2>
                <p className="text-xs text-navy/60 mt-0.5">
                  {activeTest.whoCanTake} · Self-Administered · Free
                  {userName ? ` · Respondent: ${userName}` : ""}
                </p>
              </div>

              <button
                onClick={() => setActiveTest(null)}
                className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 text-lg font-bold cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Questionnaire OR Full Clinical Result Profile */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {!interpretationResult ? (
                /* QUESTIONNAIRE RUNNER */
                <form onSubmit={handleSubmitAnswers} className="space-y-6">
                  {/* Progress & Quick Question Jump Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-navy/60">
                      <span>
                        Prompt <strong className="text-navy">{currentQuestionIndex + 1}</strong> of {activeTest.questions.length}
                      </span>
                      <span>
                        Answered: <strong className="text-navy">{answers.filter((a) => a !== -1).length}</strong> / {activeTest.questions.length}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-navy/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sage-600 transition-all duration-300 rounded-full"
                        style={{
                          width: `${((answers.filter((a) => a !== -1).length) / activeTest.questions.length) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Question Jump Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeTest.questions.map((_, qIdx) => {
                        const isAnswered = answers[qIdx] !== -1;
                        const isCurrent = currentQuestionIndex === qIdx;
                        return (
                          <button
                            type="button"
                            key={qIdx}
                            onClick={() => setCurrentQuestionIndex(qIdx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center border ${
                              isCurrent
                                ? "bg-navy text-ivory border-navy ring-2 ring-navy/20"
                                : isAnswered
                                ? "bg-sage-100 text-sage-900 border-sage-300 hover:bg-sage-200"
                                : "bg-ivory text-navy/40 border-navy/15 hover:border-navy/40"
                            }`}
                            aria-label={`Jump to item ${qIdx + 1}`}
                          >
                            {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Question Card */}
                  <div className="bg-cream/60 rounded-xl p-5 sm:p-6 border border-navy/10 space-y-4">
                    <span className="text-[11px] font-semibold text-sage-700 uppercase tracking-wider block">
                      Item {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-navy font-bold leading-relaxed">
                      {activeTest.questions[currentQuestionIndex]}
                    </h3>

                    {/* Radio Options Grid */}
                    <div className="space-y-2.5 pt-2">
                      {activeTest.options?.map((optionText, optIdx) => {
                        const isSelected = answers[currentQuestionIndex] === optIdx;
                        return (
                          <button
                            type="button"
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-navy text-ivory border-navy shadow-xs"
                                : "bg-ivory text-navy/85 hover:bg-white border-navy/15 hover:border-navy/30"
                            }`}
                          >
                            <span>{optionText}</span>
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                                isSelected
                                  ? "border-ivory bg-ivory text-navy font-bold"
                                  : "border-navy/30 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons & Submit Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        className="px-4 py-2.5 rounded-xl border border-navy/20 text-xs font-semibold text-navy hover:bg-navy/5 disabled:opacity-30 cursor-pointer"
                      >
                        ← Previous
                      </button>

                      {currentQuestionIndex < activeTest.questions.length - 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          className="px-4 py-2.5 rounded-xl border border-navy/20 text-xs font-semibold text-navy hover:bg-navy/5 cursor-pointer"
                        >
                          Next →
                        </button>
                      )}
                    </div>

                    {/* Submit Button (Always accessible or prominent when answers complete) */}
                    <button
                      type="submit"
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                        answers.every((a) => a !== -1)
                          ? "bg-sage-700 hover:bg-sage-800 text-white ring-2 ring-sage-500/30"
                          : "bg-navy hover:bg-navy-light text-ivory"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {answers.every((a) => a !== -1)
                          ? "Submit Assessment & View Results"
                          : `Submit Assessment (${answers.filter((a) => a !== -1).length}/${activeTest.questions.length} Answered)`}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* COMPLETE INDIVIDUAL SCORING, FACTOR ANALYSIS, RESULT, DISCUSSION & CONCLUSION */
                <div className="space-y-8 animate-fadeIn">
                  {/* 1. HERO RESULT BANNER */}
                  <div className="bg-cream rounded-2xl p-6 border border-navy/15 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-navy/50 block">
                          {interpretationResult.category}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-navy mt-0.5">
                          {activeTest.title}
                        </h3>
                        <p className="text-xs text-navy/60 mt-0.5">
                          Results for {userName || "Valued Respondent"} · Self-Administered
                        </p>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide bg-navy text-ivory self-start sm:self-auto">
                        {interpretationResult.title}
                      </span>
                    </div>

                    <div className="bg-ivory rounded-xl p-4 border border-navy/10 space-y-2">
                      <div className="text-xs font-semibold text-navy/50 uppercase tracking-wider">
                        Result Statement
                      </div>
                      <p className="text-sm font-medium text-navy leading-relaxed">
                        {interpretationResult.statement}
                      </p>
                    </div>
                  </div>

                  {/* 2. FACTOR ANALYSIS & MEASURES TABLE */}
                  <div className="bg-ivory rounded-2xl p-6 border border-navy/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
                      <Layers className="w-4 h-4 text-navy" />
                      <h4 className="font-serif text-lg font-bold text-navy">
                        Itemized Measures & Factor Profile
                      </h4>
                    </div>

                    {/* Factor Progress Bars */}
                    <div className="space-y-3 pt-1">
                      {interpretationResult.rows.map((row, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-navy">{row.measure}</span>
                            <span className="text-navy/60 font-mono">
                              {row.score} / {row.maxScore} ({row.percentage.toFixed(1)}%) — <strong>{row.level}</strong>
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-navy/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-navy-700 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(0, row.percentage))}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-navy/65 leading-relaxed pt-0.5">
                            {row.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. CLINICAL INTERPRETATION & DISCUSSION */}
                  <div className="bg-ivory rounded-2xl p-6 border border-navy/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
                      <Brain className="w-4 h-4 text-navy" />
                      <h4 className="font-serif text-lg font-bold text-navy">
                        Detailed Clinical & Reflective Discussion
                      </h4>
                    </div>

                    <div className="space-y-3 text-sm text-navy/80 leading-relaxed">
                      <p className="font-medium text-navy/90">
                        {interpretationResult.interpretation}
                      </p>
                      {interpretationResult.discussion.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* 4. SYNTHESIS CONCLUSION */}
                  <div className="bg-sage-50/80 rounded-2xl p-6 border border-sage-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-700" />
                      <h4 className="font-serif text-lg font-bold text-sage-900">
                        Conclusion & Reflective Next Steps
                      </h4>
                    </div>
                    <p className="text-sm text-sage-900/90 leading-relaxed">
                      {interpretationResult.conclusion}
                    </p>
                  </div>

                  {/* 5. EDUCATIONAL DISCLAIMER */}
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{interpretationResult.note}</span>
                  </div>

                  {/* 6. ACTION BUTTONS */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied to Clipboard!" : "Copy Full Profile"}</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Profile</span>
                    </button>

                    <button
                      onClick={handleResetTest}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-navy text-ivory hover:bg-navy-light text-xs font-bold shadow-xs transition-all ml-auto"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Review Session (₹1,499)</span>
                    </Link>
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
