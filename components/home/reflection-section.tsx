"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { Check, RotateCcw } from "lucide-react";

const PROMPTS = [
  "What pattern do you keep repeating, even though it no longer serves who you are becoming?",
  "Where in your life are you currently confusing high anxiety with high productivity?",
  "What is a boundary you know you need to establish, but have delayed out of fear of disappointment?",
];

export function ReflectionSection() {
  const [promptIndex, setPromptIndex] = React.useState(0);
  const [entry, setEntry] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);

  const activePrompt = PROMPTS[promptIndex];

  // Restore saved reflection if exists
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(`pdw_reflection_${promptIndex}`);
      if (saved) setEntry(saved);
      else setEntry("");
    } catch {
      // ignore
    }
  }, [promptIndex]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`pdw_reflection_${promptIndex}`, entry);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleNextPrompt = () => {
    setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
  };

  return (
    <section
      className="py-24 sm:py-32 bg-ivory border-b border-navy/10 relative overflow-hidden"
      aria-label="Participatory Workbook Reflection"
    >
      <Container size="narrow">
        {/* Editorial Sub-header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-sage-dark block">
            THE BLANK PAGE · EXERCISE SPECIMEN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy font-normal">
            The page is yours.
          </h2>
          <p className="text-sm text-navy/65 font-sans max-w-md mx-auto">
            Transition from observing the publication to participating in the inquiry. Your reflection remains confidential in your local browser session.
          </p>
        </div>

        {/* The Physical Blank Workbook Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-xl bg-cream/70 border border-navy/15 p-8 sm:p-12 shadow-sm space-y-8"
        >
          {/* Subtle lined paper texture styling */}
          <div className="flex items-center justify-between border-b border-navy/10 pb-4 text-xs font-mono text-navy/50">
            <span>SPECIMEN WORKBOOK PAGE · CH. 01</span>
            <button
              onClick={handleNextPrompt}
              className="inline-flex items-center gap-1.5 text-sage-dark hover:text-navy font-sans text-xs cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Prompt ({promptIndex + 1}/{PROMPTS.length})</span>
            </button>
          </div>

          {/* Active Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={promptIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif text-xl sm:text-2xl text-navy font-normal leading-relaxed italic">
                "{activePrompt}"
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* Writing Canvas */}
          <div className="space-y-4">
            <textarea
              value={entry}
              onChange={handleTextChange}
              placeholder="Write your honest observation here without self-censorship..."
              rows={5}
              className="w-full bg-transparent border-0 border-b border-navy/20 focus:border-navy focus:ring-0 text-navy placeholder:text-navy/35 font-sans text-sm sm:text-base leading-relaxed resize-none p-2 outline-none transition-colors"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono text-navy/40">
                {entry.trim().length > 0
                  ? `${entry.trim().split(/\s+/).length} words written`
                  : "Private session · Saved in local browser"}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={!entry.trim()}
                  className="px-5 py-2 rounded-md bg-navy hover:bg-navy-light text-ivory text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-gold" />
                      <span>Saved to Session</span>
                    </>
                  ) : (
                    <span>Save Reflection</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
