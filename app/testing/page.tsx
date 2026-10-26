"use client";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";


// TEST-ONLY HARNESS
// Renders the real PSYCH_ASSESSMENTS catalog and its scoring/interpretation
// engine behind a stable DOM contract so tests/assessment-centre.spec.js can
// exercise every instrument end-to-end. This page is not part of the public
// product surface and is intentionally excluded from navigation.

import * as React from "react";
import {
  PSYCH_ASSESSMENTS,
  buildAssessmentInterpretation,
  type AssessmentInterpretation,
  type FactorResult,
  type FullAssessmentItem,
} from "@/data/assessments-full-catalog";

interface HarnessResult {
  title: string;
  score: number;
  maxScore: number;
  level: string;
  interp: AssessmentInterpretation;
  factors: FactorResult[];
}

export default function TestingHarnessPage() {
  const [unlocked, setUnlocked] = React.useState(false);
  const [activeTest, setActiveTest] = React.useState<FullAssessmentItem | null>(null);
  const [result, setResult] = React.useState<HarnessResult | null>(null);

  // Expose the catalog for direct scoring assertions in tests.
  React.useEffect(() => {
    (window as unknown as { PSYCH_ASSESSMENTS?: FullAssessmentItem[] }).PSYCH_ASSESSMENTS =
      PSYCH_ASSESSMENTS;
  }, []);

  const openAssessment = (item: FullAssessmentItem) => {
    if (item.isPaid || !item.questions || !item.scoring) return;
    setResult(null);
    setActiveTest(item);
  };

  const closeModal = () => {
    setActiveTest(null);
    setResult(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeTest || !activeTest.questions || !activeTest.scoring) return;
    const form = event.currentTarget;
    const scores = activeTest.questions.map((_, index) => {
      const selected = form.querySelector(
        `input[name="q-${index}"]:checked`
      ) as HTMLInputElement | null;
      return selected ? Number(selected.value) : -1;
    });
    if (scores.some((value) => value === -1)) {
      window.alert("Please answer all questions before submitting.");
      return;
    }
    const scoring = activeTest.scoring(scores);
    const interp = buildAssessmentInterpretation(activeTest, scoring);
    setResult({
      title: activeTest.title,
      score: scoring.score,
      maxScore: scoring.maxScore,
      level: scoring.level,
      interp,
      factors: Array.isArray(scoring.factors) ? scoring.factors : [],
    });
  };

  const freeAssessments = React.useMemo(
    () => PSYCH_ASSESSMENTS.filter((item) => !item.isPaid),
    []
  );

  return (
    <main className="mx-auto max-w-5xl p-8 text-navy">
      <h1 className="font-serif text-2xl font-bold">Assessment Centre Test Harness</h1>

      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setUnlocked(true);
        }}
      >
        <div>
          <label htmlFor="intake-name">Name</label>
          <input id="intake-name" name="name" className="border p-1" />
        </div>
        <div>
          <label htmlFor="intake-email">Email</label>
          <input id="intake-email" name="email" className="border p-1" />
        </div>
        <div>
          <label htmlFor="intake-age">Age</label>
          <input id="intake-age" name="age" className="border p-1" />
        </div>
        <div>
          <label htmlFor="intake-gender">Gender</label>
          <select id="intake-gender" name="gender" className="border p-1">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <input id="intake-privacy-consent" type="checkbox" name="consent" />
          <label htmlFor="intake-privacy-consent">I consent to the privacy terms</label>
        </div>
        <LiquidGlassButton type="submit" className="border px-3 py-1">
          Unlock Assessments
        </LiquidGlassButton>
      </form>

      <div
        id="assessment-suite-container"
        className={`mt-8 grid grid-cols-2 gap-2 ${unlocked ? "" : "hidden"}`}
      >
        {freeAssessments.map((item) => (
          <LiquidGlassButton
            key={item.id}
            type="button"
            data-assess-id={item.id}
            onClick={() => openAssessment(item)}
            className="border p-2 text-left text-xs"
          >
            {item.title}
          </LiquidGlassButton>
        ))}
      </div>

      {activeTest && (
        <div
          id="active-assessment-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6">
            <div className="flex items-start justify-between">
              <h4 className="font-serif text-lg font-bold">{activeTest.title}</h4>
              <LiquidGlassButton type="button" aria-label="Close" onClick={closeModal}>
                ✕
              </LiquidGlassButton>
            </div>

            <div id="active-assessment-modal-content" className="mt-4">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeTest.questions?.map((question, qIndex) => (
                    <fieldset key={qIndex} className="space-y-1">
                      <legend className="text-sm font-semibold">
                        {qIndex + 1}. {question}
                      </legend>
                      {activeTest.options?.map((option, oIndex) => (
                        <label key={oIndex} className="block text-xs">
                          <input
                            type="radio"
                            name={`q-${qIndex}`}
                            value={oIndex}
                            defaultChecked={false}
                          />{" "}
                          {option}
                        </label>
                      ))}
                    </fieldset>
                  ))}
                  <LiquidGlassButton type="submit" className="border px-3 py-1">
                    Submit
                  </LiquidGlassButton>
                </form>
              ) : (
                <div id="active-test-results-output" className="space-y-4 text-sm">
                  <p>
                    Score: {result.score} / {result.maxScore}
                  </p>
                  <h4>{result.title}{" "}</h4>
                  <svg width="120" height="20" role="img" aria-label="score bar">
                    <rect
                      width={Math.max(
                        0,
                        Math.min(120, (result.score / (result.maxScore || 1)) * 120)
                      )}
                      height="20"
                      fill="#0F2038"
                    />
                  </svg>

                  <div>
                    <h5 className="font-bold">Important Note{" "}</h5>
                    <p>{result.interp.note}{" "}</p>
                  </div>

                  <div>
                    <h5 className="font-bold">Results at a Glance{" "}</h5>
                    <p>Overall Profile: {result.interp.overallProfile}{" "}</p>
                  </div>

                  {result.factors.length > 1 && (
                    <div aria-label="Individual factor scores" className="space-y-1">
                      <h5 className="font-bold">Factor Interpretation{" "}</h5>
                      {result.factors.map((factor, index) => (
                        <div key={index}>
                          <strong>{factor.name}</strong>: {factor.score} / {factor.maxScore} —{" "}
                          {factor.level} — {factor.meaning}{" "}
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <h5 className="font-bold">Interpretation{" "}</h5>
                    <p>{result.interp.interpretation}{" "}</p>
                  </div>

                  <div>
                    <h5 className="font-bold">Discussion{" "}</h5>
                    {result.interp.discussion.map((paragraph, index) => (
                      <p key={index}>{paragraph}{" "}</p>
                    ))}
                  </div>

                  <div>
                    <h5 className="font-bold">Conclusion{" "}</h5>
                    <p>{result.interp.conclusion}{" "}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
