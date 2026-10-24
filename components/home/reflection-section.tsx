"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { Check, RotateCcw } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

const PROMPTS = [
  "What pattern do you keep repeating, even though it no longer serves who you are becoming?",
  "Where in your life are you currently confusing high anxiety with high productivity?",
  "What is a boundary you know you need to establish, but have delayed out of fear of disappointment?",
  "What feeling do you most habitually suppress when faced with unexpected conflict?",
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
      id="reflection"
      className="py-24 sm:py-32 bg-[#FDFBF7] border-b border-[#24483B]/10 relative overflow-hidden scroll-mt-16"
      aria-label="Participatory Workbook Reflection"
    >
      <Container size="narrow">
        {/* Editorial Sub-header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#24483B] block font-semibold">
            THE BLANK PAGE · EXERCISE SPECIMEN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202923] font-normal">
            The page is yours.
          </h2>
          <p className="text-sm sm:text-base text-[#202923]/70 font-sans max-w-md mx-auto leading-relaxed">
            Transition from observing the publication to participating in the inquiry. Your reflection remains confidential in your local browser session.
          </p>
        </div>

        {/* The Physical Blank Workbook Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl bg-[#F5EFE6] border border-[#24483B]/15 p-8 sm:p-12 shadow-sm space-y-8"
        >
          {/* Subtle lined paper texture styling */}
          <div className="flex items-center justify-between border-b border-[#24483B]/10 pb-4 text-xs font-mono text-[#202923]/60">
            <span>SPECIMEN WORKBOOK PAGE · CH. 01</span>
            <LiquidGlassButton
              onClick={handleNextPrompt}
              className="inline-flex items-center gap-1.5 text-[#24483B] hover:text-[#1A3529] font-sans text-xs font-semibold cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Prompt ({promptIndex + 1}/{PROMPTS.length})</span>
            </LiquidGlassButton>
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
              <h3 className="font-serif text-xl sm:text-2xl text-[#202923] font-normal leading-relaxed italic">
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
              className="w-full bg-transparent border-0 border-b border-[#24483B]/20 focus:border-[#24483B] focus:ring-0 text-[#202923] placeholder:text-[#202923]/35 font-sans text-sm sm:text-base leading-relaxed resize-none p-2 outline-none transition-colors"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono text-[#202923]/50">
                {entry.trim().length > 0
                  ? `${entry.trim().split(/\s+/).length} words written`
                  : "Private session · Saved in local browser"}
              </span>

              <div className="flex items-center gap-3">
                <LiquidGlassButton
                  onClick={handleSave}
                  disabled={!entry.trim()}
                  variant="primary"
                  size="sm"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C6A46A]" />
                      <span>Saved to Session</span>
                    </>
                  ) : (
                    <span>Save Reflection</span>
                  )}
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
