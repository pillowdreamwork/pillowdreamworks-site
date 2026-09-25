"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  ALL_ASSESSMENTS_CATALOG,
  computeAssessmentInterpretation,
  InteractiveAssessmentItem,
  AssessmentInterpretation,
} from "@/data/assessments-interactive";
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
} from "lucide-react";

export function AssessmentCentre() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTest, setActiveTest] = useState<InteractiveAssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [interpretationResult, setInterpretationResult] = useState<AssessmentInterpretation | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const searchInputId = useId();

  const categories = [
    { id: "all", label: "All Instruments", icon: Layers },
    { id: "anxiety", label: "Anxiety & Worry", icon: Activity },
    { id: "mood", label: "Mood & Depression", icon: HeartHandshake },
    { id: "personality", label: "Personality & Traits", icon: Brain },
    { id: "trauma", label: "Trauma & Stress", icon: Shield },
    { id: "cognitive", label: "Cognitive & ADHD", icon: FileText },
    { id: "projective", label: "Projective Batteries", icon: BookOpen },
  ];

  const filteredAssessments = ALL_ASSESSMENTS_CATALOG.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory ||
      (selectedCategory === "projective" && (item.category === "projective" || item.category === "clinical"));

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleStartTest = (item: InteractiveAssessmentItem) => {
    setActiveTest(item);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(item.questions.length).fill(-1));
    setInterpretationResult(null);
  };

  const handleSelectOption = (questionIdx: number, optionVal: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionVal;
    setAnswers(newAnswers);

    // Auto-advance if not on last question
    if (activeTest && questionIdx < activeTest.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(questionIdx + 1);
      }, 180);
    }
  };

  const handleSubmitAnswers = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTest) return;

    // Validate that all questions are answered
    if (answers.some((a) => a === -1)) {
      alert("Please answer all questions before generating your clinical profile.");
      return;
    }

    const result = computeAssessmentInterpretation(activeTest, answers);
    setInterpretationResult(result);
  };

  const handleResetTest = () => {
    if (activeTest) {
      setAnswers(new Array(activeTest.questions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setInterpretationResult(null);
    }
  };

  const handleCopySummary = () => {
    if (!activeTest || !interpretationResult) return;
    const text = `
=== ${activeTest.title} (${activeTest.code}) ===
Score: ${interpretationResult.scoreSummary} (${interpretationResult.percentage}%)
Category: ${interpretationResult.levelLabel}

RESULT:
${interpretationResult.statement}

DISCUSSION:
${interpretationResult.discussion.join("\n\n")}

CONCLUSION:
${interpretationResult.conclusion}

RECOMMENDATIONS:
${interpretationResult.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

${interpretationResult.educationalDisclaimer}
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
          <span>Standardized Self-Inventories & Projective Psychometrics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-normal tracking-tight">
          Psychological Assessment Centre
        </h1>
        <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-2xl mx-auto">
          Explore evidence-backed screening instruments, personality models, and clinician-administered projective batteries. Complete free interactive inventories to receive comprehensive factor breakdowns, clinical discussion, and tailored conclusions.
        </p>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="bg-cream/80 border border-navy/10 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">Search assessments</label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search by instrument name, domain, or keyword (e.g. anxiety, big five, trauma, adhd)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ivory border border-navy/15 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>

          {/* Counter pill */}
          <div className="text-xs font-semibold text-navy/60 shrink-0 px-3 py-2 bg-ivory rounded-xl border border-navy/10 flex items-center gap-1.5">
            <span>Showing</span>
            <strong className="text-navy">{filteredAssessments.length}</strong>
            <span>of {ALL_ASSESSMENTS_CATALOG.length} instruments</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-navy text-ivory shadow-xs font-semibold"
                    : "bg-ivory text-navy/70 hover:text-navy hover:bg-cream border border-navy/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ASSESSMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((item) => (
          <div
            key={item.id}
            className="bg-ivory rounded-2xl p-6 border border-navy/15 hover:border-navy/30 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Row: Domain & Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sage-700 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200">
                  {item.code || item.domain}
                </span>
                <div className="flex items-center gap-1 text-xs text-navy/50 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-navy group-hover:text-navy-light transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-navy/60 mt-0.5">{item.domain} · {item.whoCanTake}</p>
              </div>

              <p className="text-xs text-navy/75 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* Bottom Row: Administration & Action */}
            <div className="pt-5 mt-5 border-t border-navy/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-navy/60">
                  {item.administration}
                </span>
                {item.isPaid ? (
                  <span className="font-serif font-bold text-navy">
                    ₹{item.priceInr?.toLocaleString()} <span className="font-sans text-[11px] font-normal text-navy/50">(${item.priceUsd})</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Free Screener
                  </span>
                )}
              </div>

              {item.isPaid ? (
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Practitioner Battery</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleStartTest(item)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy hover:bg-navy-light text-ivory text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Take Interactive Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. INTERACTIVE TEST MODAL / RUNNER */}
      {activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-ivory rounded-2xl border border-navy/20 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-navy/10 bg-cream/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-navy text-ivory text-[10px] font-bold font-mono">
                    {activeTest.code}
                  </span>
                  <span className="text-xs text-sage-700 font-semibold uppercase tracking-wider">
                    {activeTest.domain}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy mt-1">
                  {activeTest.title}
                </h2>
                <p className="text-xs text-navy/60 mt-0.5">{activeTest.whoCanTake} · Self-Administered · Free</p>
              </div>

              <button
                onClick={() => setActiveTest(null)}
                className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 text-lg font-bold cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Questionnaire or Result Dashboard */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {!interpretationResult ? (
                /* QUESTIONNAIRE RUNNER */
                <form onSubmit={handleSubmitAnswers} className="space-y-6">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between text-xs text-navy/60">
                    <span>
                      Question <strong className="text-navy">{currentQuestionIndex + 1}</strong> of {activeTest.questions.length}
                    </span>
                    <span>
                      Answered: {answers.filter((a) => a !== -1).length} / {activeTest.questions.length}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-navy/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sage-600 transition-all duration-300 rounded-full"
                      style={{
                        width: `${((currentQuestionIndex + 1) / activeTest.questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Active Question Card */}
                  <div className="bg-cream/60 rounded-xl p-5 sm:p-6 border border-navy/10 space-y-4">
                    <span className="text-xs font-semibold text-sage-700 uppercase tracking-wider block">
                      Prompt {currentQuestionIndex + 1}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-navy font-bold leading-relaxed">
                      {activeTest.questions[currentQuestionIndex]}
                    </h3>

                    {/* Radio Options */}
                    <div className="space-y-2.5 pt-2">
                      {activeTest.options.map((optionText, optIdx) => {
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

                  {/* Question Stepper Navigation */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl border border-navy/20 text-xs font-semibold text-navy hover:bg-navy/5 disabled:opacity-30 cursor-pointer"
                    >
                      ← Previous Question
                    </button>

                    {currentQuestionIndex < activeTest.questions.length - 1 ? (
                      <button
                        type="button"
                        disabled={answers[currentQuestionIndex] === -1}
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                        className="px-5 py-2 rounded-xl bg-navy text-ivory text-xs font-semibold hover:bg-navy-light disabled:opacity-30 cursor-pointer"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={answers.some((a) => a === -1)}
                        className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Generate Clinical Profile</span>
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* COMPREHENSIVE CLINICAL RESULT DASHBOARD */
                <div className="space-y-8 animate-fadeIn">
                  {/* 1. HERO RESULT BANNER */}
                  <div className="bg-cream rounded-2xl p-6 border border-navy/15 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-sage-700 block">
                          Official Clinical Assessment Profile
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-navy mt-0.5">
                          {activeTest.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                            interpretationResult.badgeColor === "emerald"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : interpretationResult.badgeColor === "amber"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-red-100 text-red-900 border border-red-300"
                          }`}
                        >
                          {interpretationResult.levelLabel}
                        </span>
                      </div>
                    </div>

                    {/* Score Bar & Numeric Metric */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="sm:col-span-1 bg-ivory rounded-xl p-4 border border-navy/10 text-center">
                        <span className="text-[11px] uppercase tracking-wider text-navy/50 font-bold block">
                          Total Score
                        </span>
                        <div className="font-serif text-3xl font-bold text-navy my-1">
                          {interpretationResult.scoreSummary}
                        </div>
                        <span className="text-xs text-navy/60 font-semibold">
                          {interpretationResult.percentage}% Elevation
                        </span>
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <div className="flex justify-between text-xs text-navy/70 font-medium">
                          <span>Severity Range Scale</span>
                          <span>{interpretationResult.levelLabel}</span>
                        </div>
                        <div className="w-full h-3 bg-navy/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              interpretationResult.percentage <= 33
                                ? "bg-emerald-600"
                                : interpretationResult.percentage <= 66
                                ? "bg-amber-600"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${interpretationResult.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-navy/70 leading-relaxed pt-1">
                          {interpretationResult.statement}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. FACTOR PROFILE BREAKDOWN (IF MULTI-FACTOR) */}
                  {interpretationResult.factorResults.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-sage-700" />
                        <h4 className="font-serif text-lg font-bold text-navy">
                          Factor Analysis & Subscale Profile
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {interpretationResult.factorResults.map((f, idx) => (
                          <div
                            key={idx}
                            className="bg-cream/60 rounded-xl p-4 border border-navy/10 space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-semibold text-sm text-navy block">
                                  {f.name}
                                </span>
                                <span className="text-xs text-navy/50">
                                  {f.score} / {f.maxScore} points ({f.percentage}%)
                                </span>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  f.level === "Low"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : f.level === "Moderate"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {f.level}
                              </span>
                            </div>

                            <div className="w-full h-2 bg-navy/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-navy-700 rounded-full transition-all duration-300"
                                style={{ width: `${f.percentage}%` }}
                              />
                            </div>

                            <p className="text-xs text-navy/70 leading-relaxed">
                              {f.meaning}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. DISCUSSION SECTION */}
                  <div className="bg-ivory rounded-2xl p-6 border border-navy/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
                      <Brain className="w-4 h-4 text-navy" />
                      <h4 className="font-serif text-lg font-bold text-navy">
                        Clinical & Reflective Discussion
                      </h4>
                    </div>

                    <div className="space-y-3 text-sm text-navy/80 leading-relaxed">
                      {interpretationResult.discussion.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* 4. CONCLUSION SECTION */}
                  <div className="bg-sage-50/70 rounded-2xl p-6 border border-sage-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-700" />
                      <h4 className="font-serif text-lg font-bold text-sage-900">
                        Conclusion & Next Steps
                      </h4>
                    </div>
                    <p className="text-sm text-sage-900/90 leading-relaxed">
                      {interpretationResult.conclusion}
                    </p>
                  </div>

                  {/* 5. RECOMMENDATIONS */}
                  <div className="bg-cream rounded-2xl p-6 border border-navy/15 space-y-3">
                    <h4 className="font-serif text-base font-bold text-navy">
                      Structured Psychological Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {interpretationResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-navy/80 leading-relaxed">
                          <span className="w-4 h-4 rounded-full bg-navy text-ivory text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 6. MEASURES TABLE */}
                  <div className="bg-ivory rounded-2xl p-5 border border-navy/15 space-y-3 overflow-x-auto">
                    <h4 className="font-serif text-base font-bold text-navy">
                      Detailed Metrics & Subscale Table
                    </h4>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-navy/15 text-navy/50 uppercase tracking-wider">
                          <th className="py-2 px-3 font-semibold">Measure</th>
                          <th className="py-2 px-3 font-semibold">Score</th>
                          <th className="py-2 px-3 font-semibold">Max</th>
                          <th className="py-2 px-3 font-semibold">Percentage</th>
                          <th className="py-2 px-3 font-semibold">Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy/10 text-navy/80">
                        {interpretationResult.measuresTable.map((m, idx) => (
                          <tr key={idx} className="hover:bg-cream/50">
                            <td className="py-2.5 px-3 font-medium text-navy">{m.measure}</td>
                            <td className="py-2.5 px-3">{m.score}</td>
                            <td className="py-2.5 px-3">{m.maxScore}</td>
                            <td className="py-2.5 px-3">{m.percentage}%</td>
                            <td className="py-2.5 px-3">
                              <span className="font-bold">{m.level}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 7. EDUCATIONAL DISCLAIMER */}
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{interpretationResult.educationalDisclaimer}</span>
                  </div>

                  {/* 8. ACTION BUTTONS */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream border border-navy/20 hover:bg-navy hover:text-ivory text-xs font-semibold text-navy transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
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
                      <span>Retake Screener</span>
                    </button>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-navy text-ivory hover:bg-navy-light text-xs font-bold shadow-xs transition-all ml-auto"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Review Consultation (₹1,499)</span>
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
