"use client";

import React, { useState, useMemo, useId, useEffect, useRef } from "react";

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
import { TiltCard } from "@/components/ui/tilt-card";

import {
  AssessmentRegistrationGate,
  ParticipantProfile,
} from "./assessment-registration-gate";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
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
  Phone,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

// Clinical and evidentiary usage priority rank (Gold standard instruments first)
const MOST_USED_ASSESSMENT_IDS: Record<string, number> = {
  "gad-7": 1000,
  "phq-9": 990,
  "bdi-ii": 980,
  "ham-a": 970,
  "dass-21": 960,
  "dass-42": 950,
  "audit": 940,
  "cage": 930,
  "cage-substance": 930,
  "pss-10": 920,
  "rosenberg-ses": 910,
  "tipi-10": 900,
  "mbti-style-16": 890,
  "pcl-5": 880,
  "isi": 870,
  "who-5": 860,
  "swls": 850,
  "cd-risc-10": 840,
  "wais-iv": 830,
  "mmpi-2": 820,
  "rorschach": 810,
  "tat": 800,
  "16pf": 790,
  "aq-10": 780,
  "asrs": 770,
  "conners-adhd": 760,
  "panss": 750,
  "ucla-loneliness": 740,
  "y-bocs": 730,
  "hads": 720,
  "bai": 710,
  "ghq-12": 700,
  "stai-y": 690,
  "sd3-short": 680,
  "bender-gestalt": 670,
  "cat-child": 660,
  "caps-5": 650,
  "ados-2": 640,
  "ssct": 630,
  "htp": 620,
  "hfdt": 610,
};

function getUsageRank(item: FullAssessmentItem): number {
  if (MOST_USED_ASSESSMENT_IDS[item.id] !== undefined) {
    return MOST_USED_ASSESSMENT_IDS[item.id];
  }
  // Core instruments with custom batteries
  if (Array.isArray(item.questions) && item.questions.length > 0 && !item.id.startsWith("scale_")) {
    return 300;
  }
  // Base catalog practitioner batteries
  if (item.isPaid) {
    return 200;
  }
  // Standard catalog screeners
  return 100;
}

export function AssessmentCentre() {
  // Classification and Filtering
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "free">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Registration & Consent State
  const [profile, setProfile] = useState<ParticipantProfile | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [pendingAssessment, setPendingAssessment] = useState<FullAssessmentItem | null>(null);

  // Active Assessment Runner State
  const [activeTest, setActiveTest] = useState<FullAssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [interpretationResult, setInterpretationResult] = useState<AssessmentInterpretation | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [ageWarning, setAgeWarning] = useState<string | null>(null);

  // Trigger ref for focus restoration
  const triggerButtonRef = useRef<HTMLElement | null>(null);

  const searchInputId = useId();
  const domainSelectId = useId();

  // Expose catalog to window for testing / automated assertions
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { PSYCH_ASSESSMENTS?: FullAssessmentItem[] }).PSYCH_ASSESSMENTS =
        PSYCH_ASSESSMENTS;
    }
  }, []);

  // Sync tab filter from URL query param (?tab=free or ?tab=paid)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") || params.get("filter");
      if (tabParam === "free" || tabParam === "paid" || tabParam === "all") {
        setActiveTab(tabParam as "all" | "paid" | "free");
      }
    }
  }, []);

  // Escape key handler and focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeTest) {
          handleCloseTestModal();
        } else if (isRegistrationOpen) {
          setIsRegistrationOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTest, isRegistrationOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeTest || isRegistrationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeTest, isRegistrationOpen]);

  // All unique domains in alphabetical order
  const domains = useMemo(() => {
    const list = Array.from(new Set(PSYCH_ASSESSMENTS.map((a) => a.domain)))
      .filter((d): d is string => Boolean(d && d.trim()))
      .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
    return ["all", ...list];
  }, []);

  // Filtered Assessments: most used gold-standard instruments first, then alphabetical
  const filteredAssessments = useMemo(() => {
    const matched = PSYCH_ASSESSMENTS.filter((item) => {
      // Tab filter
      if (activeTab === "free" && item.isPaid) return false;
      if (activeTab === "paid" && !item.isPaid) return false;

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

    return matched.sort((a, b) => {
      const rankA = getUsageRank(a);
      const rankB = getUsageRank(b);
      if (rankB !== rankA) return rankB - rankA;
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    });
  }, [activeTab, selectedDomain, searchQuery]);

  const freeCount = useMemo(() => PSYCH_ASSESSMENTS.filter((a) => !a.isPaid).length, []);
  const paidCount = useMemo(() => PSYCH_ASSESSMENTS.filter((a) => a.isPaid).length, []);

  const handleTabChange = (tab: "all" | "paid" | "free") => {
    setActiveTab(tab);
    if (selectedDomain !== "all") {
      const remaining = PSYCH_ASSESSMENTS.filter((item) => {
        if (tab === "free" && item.isPaid) return false;
        if (tab === "paid" && !item.isPaid) return false;
        return item.domain === selectedDomain;
      });
      if (remaining.length === 0) {
        setSelectedDomain("all");
      }
    }
  };

  // Initiate starting an assessment
  const handleInitiateAssessment = (item: FullAssessmentItem, e?: React.MouseEvent) => {
    if (e?.currentTarget) {
      triggerButtonRef.current = e.currentTarget as HTMLElement;
    }

    // Check if participant has completed registration & consent gate
    if (!profile) {
      setPendingAssessment(item);
      setIsRegistrationOpen(true);
      return;
    }

    launchAssessment(item, profile);
  };

  const launchAssessment = (item: FullAssessmentItem, userProf: ParticipantProfile) => {
    // Age check safeguard for sensitive / adult-only instruments
    if (userProf.age < 18) {
      const isAdultRestricted =
        item.isPaid ||
        item.id === "mmpi-2" ||
        item.id === "caps-5" ||
        item.id === "sd3-short" ||
        item.id === "cage-substance" ||
        item.id.includes("trauma") ||
        item.domain === "Clinical Diagnostics";

      if (isAdultRestricted) {
        setAgeWarning(
          `This instrument ("${item.title}") is validated specifically for adults aged 18 and older. For participants under 18, standardized child/youth instruments (such as SDQ Youth Screener) should be selected, or consultation arranged with a qualified child psychologist accompanied by a parent/guardian.`
        );
        return;
      }
    }

    setAgeWarning(null);

    if (item.isPaid) {
      // Direct to contact with assessment pre-selected
      window.location.href = `/contact?assessment=${encodeURIComponent(item.id)}`;
      return;
    }

    if (!item.questions || item.questions.length === 0) return;

    setActiveTest(item);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(item.questions.length).fill(-1));
    setInterpretationResult(null);
  };

  const handleRegistrationSuccess = (newProfile: ParticipantProfile) => {
    setProfile(newProfile);
    setIsRegistrationOpen(false);
    if (pendingAssessment) {
      launchAssessment(pendingAssessment, newProfile);
      setPendingAssessment(null);
    }
  };

  const handleCloseTestModal = () => {
    setActiveTest(null);
    setInterpretationResult(null);
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  };

  // PHQ-9 Critical self-harm thoughts check
  const isPhq9SelfHarmTriggered = useMemo(() => {
    if (!activeTest || activeTest.id !== "phq-9") return false;
    // Item 9 is index 8: "Thoughts that you would be better off dead, or of hurting yourself in some way"
    return answers[8] !== undefined && answers[8] > 0;
  }, [activeTest, answers]);

  const handleSelectOption = (questionIdx: number, optionVal: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionVal;
    setAnswers(newAnswers);

    if (activeTest && activeTest.questions) {
      if (questionIdx < activeTest.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(questionIdx + 1);
        }, 180);
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
Respondent: ${profile?.name || "Participant"}${profile?.age ? ` (Age: ${profile.age})` : ""}
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
          <span>{PSYCH_ASSESSMENTS.length} Validated Psychological Scales &amp; Clinical Batteries</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#202923] font-normal tracking-tight">
          The Comprehensive Assessment Centre
        </h1>
        <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed max-w-3xl mx-auto font-sans">
          Explore{" "}
          <button
            type="button"
            onClick={() => {
              handleTabChange("free");
              const el = document.getElementById("assessment-suite-container");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24483B]/10 hover:bg-[#24483B] text-[#24483B] hover:text-[#FDFBF7] font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer border border-[#24483B]/20 shadow-xs hover:shadow-md align-middle"
            title="Filter by Free Scales / Screeners"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            <span>{freeCount} Free Scales / Screeners</span>
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => {
              handleTabChange("paid");
              const el = document.getElementById("assessment-suite-container");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A46A]/20 hover:bg-[#C6A46A] text-[#121214] font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer border border-[#C6A46A]/40 shadow-xs hover:shadow-md align-middle"
            title="Filter by Practitioner Clinical Batteries"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
            <span>{paidCount} Clinical Batteries</span>
          </button>{" "}
          across {domains.length - 1} psychological domains. Each generates itemized factor profiles, clinical synthesis, and reflective discussion.
        </p>
      </div>

      {/* 2. INSTRUMENT EXPLORER */}
      <div className="glass-section border border-sage/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">

        {/* Top Controls: 3 Liquid Glass Pill Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 border-b border-sage/15 pb-6 pt-2">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full glass-pill border border-sage/20 backdrop-blur-xl">
            <LiquidGlassButton
              type="button"
              onClick={() => handleTabChange("all")}
              variant={activeTab === "all" ? "primary" : "subtle"}
              size="md"
              signalDot={activeTab === "all"}
              className="px-4 text-xs sm:text-sm"
            >
              <span>All Instruments ({PSYCH_ASSESSMENTS.length})</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              type="button"
              onClick={() => handleTabChange("free")}
              variant={activeTab === "free" ? "primary" : "subtle"}
              size="md"
              signalDot={activeTab === "free"}
              className="px-4 text-xs sm:text-sm"
            >
              <span>Free Scales ({freeCount})</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              type="button"
              onClick={() => handleTabChange("paid")}
              variant={activeTab === "paid" ? "primary" : "subtle"}
              size="md"
              signalDot={activeTab === "paid"}
              className="px-4 text-xs sm:text-sm"
            >
              <span>Clinical Batteries ({paidCount})</span>
            </LiquidGlassButton>
          </div>

          {/* Results Counter */}
          <div className="text-xs font-semibold text-ink-muted flex items-center gap-2 self-center lg:self-auto px-4 py-2 rounded-full glass-content-card border border-sage/20 shadow-xs">
            <span>Displaying</span>
            <strong className="text-forest text-sm font-serif">{filteredAssessments.length}</strong>
            <span>instruments</span>
          </div>
        </div>

        {/* Search & Domain Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <label htmlFor={searchInputId} className="sr-only">Search assessments</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/50 pointer-events-none" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search by instrument name, code, domain, or clinical keyword (e.g. anxiety, bdi, trauma, big five, rorschach)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full glass-input text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-gold min-h-[44px] transition-all shadow-xs"
            />
          </div>

          <div className="md:col-span-4 relative">
            <label htmlFor={domainSelectId} className="sr-only">Filter by psychological domain</label>
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/50 pointer-events-none" />
            <select
              id={domainSelectId}
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full glass-input text-xs sm:text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-gold min-h-[44px] transition-all appearance-none cursor-pointer shadow-xs"
            >
              <option value="all">Filter Domain: All {domains.length - 1} Domains</option>
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

        {/* Participant Registration Banner & Session Status */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#202923]/70 border-t border-[#24483B]/10">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#24483B]" />
            {profile ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Registered: {profile.name} (Age: {profile.age})</span>
              </span>
            ) : (
              <span>Registration Gate: Required before assessment participation</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!profile ? (
              <LiquidGlassButton
                type="button"
                onClick={() => setIsRegistrationOpen(true)}
                variant="primary"
                size="sm"
                showArrow
              >
                Complete Registration
              </LiquidGlassButton>
            ) : (
              <LiquidGlassButton
                type="button"
                onClick={() => setIsRegistrationOpen(true)}
                variant="subtle"
                size="sm"
              >
                Update Profile
              </LiquidGlassButton>
            )}
            <span className="text-[11px] text-[#202923]/50 hidden sm:inline">
              🔒 Client-side Evaluation Only
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Notice */}
      <div className="p-5 rounded-3xl glass-content-card border border-sage/20 flex items-start gap-3.5 text-sm text-ink-muted shadow-sm">
        <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed">
          <strong className="text-ink font-semibold">{CHECKOUT_NOTICE}</strong> Practitioner-administered
          assessments are currently arranged by enquiry, and free screeners can be taken here at
          no cost.
        </p>
      </div>

      {/* Age Restriction Alert if triggered */}
      {ageWarning && (
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-300 text-amber-950 flex items-start justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed font-sans">
              <strong className="font-serif text-sm text-amber-950 block">
                Age Safeguard Notice
              </strong>
              <p>{ageWarning}</p>
            </div>
          </div>
          <LiquidGlassButton
            type="button"
            onClick={() => setAgeWarning(null)}
            className="text-amber-800 hover:text-amber-950 text-xs font-semibold cursor-pointer"
          >
            Dismiss
          </LiquidGlassButton>
        </div>
      )}

      {/* 3. ASSESSMENTS GRID */}
      <div
        id="assessment-suite-container"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAssessments.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-[#F5EFE6]/50 rounded-3xl border border-[#24483B]/10 space-y-4">
            <HelpCircle className="w-8 h-8 text-[#24483B]/40 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                No assessments found
              </h3>
              <p className="text-sm text-[#202923]/70 font-sans max-w-md mx-auto">
                No assessments match your current search query or filter. Try a broader keyword or reset the domain filter.
              </p>
            </div>
            <LiquidGlassButton
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedDomain("all");
                setActiveTab("all");
              }}
              variant="secondary"
              size="sm"
            >
              <span>Reset All Filters</span>
            </LiquidGlassButton>
          </div>
        ) : (
          filteredAssessments.map((item) => {
            const desc = Array.isArray(item.description) ? item.description.join(" ") : item.description;

            return (
              <TiltCard
                key={item.id}
                maxTilt={6}
                className="glass-card rounded-3xl p-7 border border-sage/20 hover:border-forest/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-forest bg-sage/10 px-3 py-1 rounded-full border border-sage/25">
                      {item.domain}
                    </span>
                    {item.isPaid ? (
                      <span className="px-3 py-1 bg-ink text-ivory text-[10px] font-bold rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-vermilion animate-pulse-glow" />
                        <span>Clinical Battery</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-sage/15 text-forest text-[10px] font-bold rounded-full border border-sage/30 shadow-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                        <span>{item.questions?.length || 0} Qs · Self-Report</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-[10px] text-ink-muted/60 uppercase tracking-wider font-semibold">
                      {item.breadcrumb}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors mt-0.5 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 font-sans">
                    {desc}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] text-ink-muted/80 pt-1">
                    <span className="px-3 py-1 glass-pill rounded-full border border-sage/15">
                      {item.whoCanTake}
                    </span>
                    {item.duration && (
                      <span className="px-3 py-1 glass-pill rounded-full border border-sage/15 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-ink-muted/50" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-sage/15 space-y-3 relative z-20">
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
                        type="button"
                        data-assess-id={item.id}
                        onClick={(e) => handleInitiateAssessment(item, e)}
                        variant="gold"
                        size="md"
                        className="w-full justify-between relative z-20 shadow-xs hover:shadow-md"
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
                      data-assess-id={item.id}
                      onClick={(e) => handleInitiateAssessment(item, e)}
                      variant="primary"
                      size="md"
                      className="w-full justify-between shadow-sm relative z-20 hover:shadow-md"
                      showArrow
                      signalDot
                    >
                      <span>Take Free Assessment</span>
                    </LiquidGlassButton>
                  )}
                </div>
              </TiltCard>
            );
          })
        )}
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
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

      {/* 5. REGISTRATION & INFORMED CONSENT GATE MODAL */}
      <AssessmentRegistrationGate
        isOpen={isRegistrationOpen}
        onClose={() => {
          setIsRegistrationOpen(false);
          setPendingAssessment(null);
        }}
        onSuccess={handleRegistrationSuccess}
        targetAssessmentTitle={pendingAssessment?.title}
        targetAssessmentIsPaid={pendingAssessment?.isPaid}
      />

      {/* 6. ACCESSIBLE TEST MODAL & RESULTS RUNNER */}
      {activeTest && activeTest.questions && (
        <div
          id="active-assessment-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-assessment-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#151C17]/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="glass-surface text-ink rounded-3xl border border-white/60 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-sage/15 glass-content-card flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] text-[#202923]/50 font-bold uppercase tracking-wider">
                  {activeTest.breadcrumb}
                </div>
                <h2 id="active-assessment-title" className="font-serif text-xl sm:text-2xl font-bold text-[#202923] mt-1">
                  {activeTest.title}
                </h2>
                <p className="text-xs text-[#202923]/60 mt-0.5 font-sans">
                  {activeTest.whoCanTake} · Self-Administered · Free
                  {profile ? ` · Respondent: ${profile.name}` : ""}
                </p>
              </div>

              <LiquidGlassButton
                type="button"
                onClick={handleCloseTestModal}
                variant="subtle"
                size="icon"
                signalDot={false}
                aria-label="Close"
                className="shrink-0"
              >
                <X className="w-4 h-4 text-[#202923]" />
              </LiquidGlassButton>
            </div>

            {/* CRITICAL PHQ-9 CRISIS INTERCEPTOR */}
            {isPhq9SelfHarmTriggered && (
              <div className="p-4 sm:p-5 bg-[#8B2626] text-[#FDFBF7] border-b border-red-900/30 flex items-start gap-3.5 animate-fadeIn">
                <Phone className="w-5 h-5 text-red-200 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1.5 text-xs leading-relaxed">
                  <div className="font-serif text-sm font-bold tracking-wide">
                    Immediate Crisis &amp; Safety Resources Available 24/7
                  </div>
                  <p className="text-white/90">
                    You indicated thoughts of self-harm. Please know that you are not alone and direct, confidential human support is available immediately. This automated screener cannot assess crisis risk.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold">
                    <span className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
                      India — Tele-MANAS: <strong>14416</strong>
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
                      Vandrevala Foundation: <strong>+91 9999 666 555</strong>
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
                      United States: <strong>988</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Questionnaire OR Full Clinical Result Profile */}
            <div id="active-assessment-modal-content" className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {!interpretationResult ? (
                /* QUESTIONNAIRE RUNNER */
                <form onSubmit={handleSubmitAnswers} className="space-y-6">
                  {/* Progress & Item Navigator */}
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

                  {/* Active Question Prompt */}
                  <div className="bg-[#F5EFE6]/80 rounded-3xl p-6 sm:p-7 border border-[#24483B]/15 space-y-5 shadow-xs">
                    <span className="text-[11px] font-semibold text-[#24483B] uppercase tracking-wider block">
                      Item {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#202923] font-bold leading-relaxed">
                      {activeTest.questions[currentQuestionIndex]}
                    </h3>

                    {/* Radio Options Grid */}
                    <div className="space-y-3 pt-2">
                      {activeTest.options?.map((optionText, optIdx) => {
                        const isSelected = answers[currentQuestionIndex] === optIdx;
                        return (
                          <label
                            key={optIdx}
                            className={`w-full text-left min-h-[50px] p-4 sm:px-6 sm:py-3.5 rounded-2xl sm:rounded-full border text-sm font-medium transition-all duration-[350ms] flex items-center justify-between gap-3.5 cursor-pointer active:scale-[0.97] group relative overflow-hidden select-none ${
                              isSelected
                                ? "bg-[#151C17] text-[#FDFBF7] border-white/25 shadow-md font-semibold"
                                : "bg-white/70 text-[#202923] hover:bg-white border-[#24483B]/15 hover:border-[#24483B]/35 shadow-xs"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${currentQuestionIndex}`}
                              value={optIdx}
                              checked={isSelected}
                              onChange={() => handleSelectOption(currentQuestionIndex, optIdx)}
                              className="sr-only"
                            />

                            <span className="flex items-center gap-3 relative z-10">
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
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Modal Controls */}
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
                /* CLINICAL RESULT & FACTOR OUTPUT */
                <div id="active-test-results-output" className="space-y-8 animate-fadeIn">
                  {/* Hero Result Banner */}
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
                          Results for {profile?.name || "Participant"} · Self-Administered
                        </p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-[#151C17] text-[#FDFBF7] self-start sm:self-auto border border-white/10 shadow-xs">
                        {interpretationResult.title}
                      </span>
                    </div>

                    {/* Overall Score / Maximum Display */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xs text-[#202923]/60 uppercase tracking-wider font-semibold">
                        Overall Score:
                      </span>
                      <strong className="font-serif text-2xl text-[#24483B]">
                        {interpretationResult.rows[0]?.score ?? 0} / {interpretationResult.rows[0]?.maxScore ?? 0}
                      </strong>
                    </div>

                    <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#24483B]/10 space-y-2">
                      <div className="text-xs font-semibold text-[#202923]/50 uppercase tracking-wider">
                        What your score shows
                      </div>
                      <p className="text-sm font-medium text-[#202923] leading-relaxed font-sans">
                        {interpretationResult.statement}
                      </p>
                    </div>
                  </div>

                  {/* Factor Analysis & Measures Table */}
                  <div className="bg-[#FDFBF7] rounded-3xl p-7 border border-[#24483B]/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-3">
                      <Layers className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Itemized Measures &amp; Factor Profile
                      </h4>
                    </div>

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
                            <svg className="w-full h-full" aria-hidden="true">
                              <rect width="100%" height="100%" fill="#E5E0D8" />
                              <rect
                                width={`${Math.min(100, Math.max(0, row.percentage))}%`}
                                height="100%"
                                fill="#24483B"
                              />
                            </svg>
                          </div>
                          <p className="text-[11px] text-[#202923]/65 leading-relaxed pt-0.5 font-sans">
                            {row.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Interpretation & Discussion */}
                  <div className="bg-[#FDFBF7] rounded-3xl p-7 border border-[#24483B]/15 space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-3">
                      <Brain className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Discussion
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

                  {/* Synthesis Conclusion */}
                  <div className="bg-[#A6B7A1]/20 rounded-3xl p-7 border border-[#A6B7A1]/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#24483B]" />
                      <h4 className="font-serif text-lg font-bold text-[#1A3529]">
                        Conclusion
                      </h4>
                    </div>
                    <p className="text-sm text-[#1A3529]/90 leading-relaxed font-sans">
                      {interpretationResult.conclusion}
                    </p>
                  </div>

                  {/* Important Note / Educational Disclaimer */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed font-sans">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Important Note:</strong>
                      <span>{interpretationResult.note}</span>
                    </div>
                  </div>

                  {/* Questions About Your Results Accordion */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 border-b border-[#24483B]/10 pb-2">
                      <Info className="w-4 h-4 text-[#202923]" />
                      <h4 className="font-serif text-lg font-bold text-[#202923]">
                        Questions about your results
                      </h4>
                    </div>
                    <FaqAccordion compact groups={[{ items: ASSESSMENT_RESULT_FAQS }]} />
                  </div>

                  {/* Result Actions */}
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
