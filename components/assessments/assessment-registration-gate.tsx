"use client";

import * as React from "react";
import Link from "next/link";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import {
  ShieldCheck,
  X,
  Info,
} from "lucide-react";

export interface ParticipantProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  education: string;
  occupation: string;
  marketingConsent: boolean;
  registeredAt: string;
}

interface AssessmentRegistrationGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: ParticipantProfile) => void;
  targetAssessmentTitle?: string;
  targetAssessmentIsPaid?: boolean;
}

export function AssessmentRegistrationGate({
  isOpen,
  onClose,
  onSuccess,
  targetAssessmentTitle,
  targetAssessmentIsPaid,
}: AssessmentRegistrationGateProps) {
  const [step, setStep] = React.useState<"profile" | "consent">("profile");

  // Form Fields
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("Prefer not to say");
  const [education, setEducation] = React.useState("Prefer not to say");
  const [occupation, setOccupation] = React.useState("Prefer not to say");

  // Consent Checkboxes
  const [acknowledgedPurpose, setAcknowledgedPurpose] = React.useState(false);
  const [dataConsent, setDataConsent] = React.useState(false);
  const [marketingConsent, setMarketingConsent] = React.useState(false);

  // Errors
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateProfile = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = "Full name is required to personalize your report.";
    }

    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please provide a valid email address.";
    }

    const numAge = parseInt(age, 10);
    if (!age || isNaN(numAge)) {
      errs.age = "Numeric age in years is required.";
    } else if (numAge < 6 || numAge > 120) {
      errs.age = "Please provide a valid age between 6 and 120.";
    }

    if (!gender) {
      errs.gender = "Please select an option (or 'Prefer not to say').";
    }

    if (!education) {
      errs.education = "Please select an education background.";
    }

    if (!occupation) {
      errs.occupation = "Please select an occupation.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateProfile()) {
      setStep("consent");
    }
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledgedPurpose || !dataConsent) {
      setErrors({
        consent: "You must acknowledge the assessment purpose and provide data processing consent to proceed.",
      });
      return;
    }

    const profile: ParticipantProfile = {
      name: name.trim(),
      email: email.trim(),
      age: parseInt(age, 10),
      gender,
      education,
      occupation,
      marketingConsent,
      registeredAt: new Date().toISOString(),
    };

    onSuccess(profile);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#151C17]/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="glass-surface text-ink max-w-2xl w-full rounded-3xl border border-white/60 shadow-2xl overflow-hidden my-6 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 glass-content-card border-b border-sage/15 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest text-ivory">
                {targetAssessmentIsPaid ? "Clinical Intake Gate" : "Mandatory Assessment Intake"}
              </span>
              <span className="text-xs text-ink-muted/70 font-sans">
                Step {step === "profile" ? "1 of 2: Profile" : "2 of 2: Informed Consent"}
              </span>
            </div>

            <h2 id="registration-gate-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#202923]">
              {step === "profile" ? "Participant Registration" : "Explicit Informed Consent"}
            </h2>

            {targetAssessmentTitle && (
              <p className="text-xs text-[#24483B] font-semibold mt-1">
                Selected: {targetAssessmentTitle}
              </p>
            )}
          </div>

          <LiquidGlassButton
            type="button"
            onClick={onClose}
            aria-label="Decline and close registration"
            className="p-2 rounded-full hover:bg-black/5 text-[#202923]/60 hover:text-[#202923] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </LiquidGlassButton>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {step === "profile" ? (
            <form onSubmit={handleNextToConsent} className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Ethical Psychometrics & Client-Only Evaluation</span>
                </div>
                <p>
                  PillowDreamWorks operates in a private, client-side session mode. Your demographic details and answers are processed in your local browser session and are not stored in any external database or transmitted to advertising third parties. Refreshing or closing this browser tab immediately clears your session.
                </p>
              </div>

              {/* Required Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-name" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Full Name</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="intake-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
                  />
                  {errors.name && <p className="text-[11px] text-red-600 font-medium">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-email" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Email Address</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="intake-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 font-medium">{errors.email}</p>}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-age" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Age (Years)</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="intake-age"
                    name="age"
                    type="number"
                    min="6"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
                  />
                  {errors.age && <p className="text-[11px] text-red-600 font-medium">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-gender" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Gender Identity</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="intake-gender"
                    name="gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] focus:outline-none focus:ring-2 focus:ring-[#C6A46A] cursor-pointer"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer to self-describe">Prefer to self-describe</option>
                  </select>
                  {errors.gender && <p className="text-[11px] text-red-600 font-medium">{errors.gender}</p>}
                </div>

                {/* Education */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-education" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Education Level</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="intake-education"
                    name="education"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] focus:outline-none focus:ring-2 focus:ring-[#C6A46A] cursor-pointer"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="School">School / Secondary</option>
                    <option value="Undergraduate">Undergraduate Degree</option>
                    <option value="Postgraduate">Postgraduate / Master / Doctorate</option>
                    <option value="Vocational / Technical">Vocational / Technical Certification</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.education && <p className="text-[11px] text-red-600 font-medium">{errors.education}</p>}
                </div>

                {/* Occupation */}
                <div className="space-y-1.5">
                  <label htmlFor="intake-occupation" className="text-xs font-semibold text-[#202923] flex items-center gap-1">
                    <span>Current Occupation</span>
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="intake-occupation"
                    name="occupation"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#24483B]/20 text-sm text-[#202923] focus:outline-none focus:ring-2 focus:ring-[#C6A46A] cursor-pointer"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Student">Student</option>
                    <option value="Employed">Employed (Full-time / Part-time)</option>
                    <option value="Self-employed">Self-employed / Entrepreneur</option>
                    <option value="Homemaker / Caregiver">Homemaker / Caregiver</option>
                    <option value="Unemployed">Seeking Employment / Between Roles</option>
                    <option value="Retired">Retired</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.occupation && <p className="text-[11px] text-red-600 font-medium">{errors.occupation}</p>}
                </div>
              </div>

              {/* Contextual Disclosure Notice */}
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 text-xs text-[#202923]/75 space-y-1.5 font-sans leading-relaxed">
                <div className="font-semibold text-[#202923] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#24483B]" />
                  <span>Demographic Use Transparency</span>
                </div>
                <p>
                  Gender, education, and occupation are collected as contextual profile information only. They are <strong>never used</strong> to calculate scores, bias interpretation bands, or generate psychiatric conclusions unless a specific instrument&apos;s published manual explicitly mandates it. We do not invent demographic profiling or data mining.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#24483B]/10">
                <LiquidGlassButton
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#202923]/60 hover:text-[#202923] cursor-pointer"
                >
                  Cancel &amp; Return to Catalog
                </LiquidGlassButton>

                <LiquidGlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  showArrow
                  signalDot
                >
                  <span>Continue to Informed Consent</span>
                </LiquidGlassButton>
              </div>
            </form>
          ) : (
            /* STEP 2: EXPLICIT INFORMED CONSENT */
            <form onSubmit={handleCompleteRegistration} className="space-y-6">
              {/* 7 Structured Disclosures */}
              <div className="space-y-3.5 text-xs text-[#202923]/80 font-sans leading-relaxed">
                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">1. Purpose &amp; Processing</strong>
                  <p>
                    Profile information supports your registration, eligibility checks, and report identification. Assessment responses are processed solely to calculate the selected instrument&apos;s score and factor synthesis.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">2. Information Collected &amp; Flow</strong>
                  <p>
                    Name and age identify your report. Email ensures communication continuity if you request a consultation. Gender, education, and occupation remain non-scoring context. Answers and calculated scores exist only in your current browser tab.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">3. Use &amp; Automated Scoring</strong>
                  <p>
                    Free assessments utilize automated client-side scoring logic. No human clinician automatically reviews free self-inventories unless you separately book a clinical consultation.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">4. Storage, Access &amp; Zero Remote Databases</strong>
                  <p>
                    All assessment responses remain exclusively in your local browser session (RAM/session storage). Information is never transmitted to an external database, remote server, or commercial tracker.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">5. Sharing &amp; Non-Sale of Data</strong>
                  <p>
                    PillowDreamWorks Foundation never sells assessment data, profile information, or answers to any third party, broker, or advertiser.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#24483B]/10 space-y-1">
                  <strong className="text-[#202923] block text-sm font-serif">6. Immediate Retention &amp; Deletion Policy</strong>
                  <p>
                    Closing or refreshing this browser tab immediately clears your profile and responses. For formal privacy questions or requests, you may email <strong>mgmanishgarg3@gmail.com</strong> with subject &ldquo;Privacy Request&rdquo;.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-amber-950">
                  <strong className="text-amber-950 block text-sm font-serif">7. Critical Clinical Limitations</strong>
                  <p>
                    Automated self-inventories are psychoeducational screening tools. They do <strong>not</strong> constitute a psychiatric diagnosis, medical evaluation, or emergency service. Some items may touch sensitive feelings; you are free to stop at any time.
                  </p>
                </div>
              </div>

              {/* Consent Controls */}
              <div className="space-y-3.5 pt-2 border-t border-[#24483B]/10">
                {/* Control 1: Purpose & Limitations */}
                <label className="flex items-start gap-3 text-xs text-[#202923] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acknowledgedPurpose}
                    onChange={(e) => setAcknowledgedPurpose(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#24483B]/30 text-[#24483B] focus:ring-[#C6A46A] cursor-pointer"
                  />
                  <span>
                    <strong>Required:</strong> I understand that automated assessments are educational screening tools and not a psychiatric diagnosis, medical advice, or emergency crisis service.
                  </span>
                </label>

                {/* Control 2: Data Processing Consent */}
                <label className="flex items-start gap-3 text-xs text-[#202923] cursor-pointer">
                  <input
                    id="intake-privacy-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={dataConsent}
                    onChange={(e) => setDataConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#24483B]/30 text-[#24483B] focus:ring-[#C6A46A] cursor-pointer"
                  />
                  <span>
                    <strong>Required:</strong> I consent to the local session processing of my responses to calculate this assessment result, in accordance with the{" "}
                    <Link href="/legal/privacy" target="_blank" className="text-[#24483B] underline font-semibold">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/disclaimer" target="_blank" className="text-[#24483B] underline font-semibold">
                      Assessment Disclaimer
                    </Link>.
                  </span>
                </label>

                {/* Control 3: Optional Marketing */}
                <label className="flex items-start gap-3 text-xs text-[#202923]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#24483B]/30 text-[#24483B] focus:ring-[#C6A46A] cursor-pointer"
                  />
                  <span>
                    Optional: I would like to receive thoughtful educational articles and foundation essays from The Reading Room. (Never required to unlock assessments).
                  </span>
                </label>
              </div>

              {errors.consent && (
                <p className="text-xs text-red-600 font-semibold">{errors.consent}</p>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#24483B]/10">
                <LiquidGlassButton
                  type="button"
                  onClick={() => setStep("profile")}
                  className="text-xs font-semibold text-[#202923]/60 hover:text-[#202923] cursor-pointer"
                >
                  ← Back to Profile
                </LiquidGlassButton>

                <LiquidGlassButton
                  type="submit"
                  disabled={!acknowledgedPurpose || !dataConsent}
                  variant="primary"
                  size="md"
                  signalDot
                  showArrow
                >
                  <span>Unlock Assessments</span>
                </LiquidGlassButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
