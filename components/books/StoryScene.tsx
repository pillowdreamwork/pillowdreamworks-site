/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { StoryImage } from "./StoryImage";
import { StoryText } from "./StoryText";

export interface StoryStep {
  id: string;
  label: string;
  title: string;
  text?: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
}

interface StorySceneProps {
  steps: StoryStep[];
  ariaLabel: string;
  /** "centre" = quieter: slower text, minimal scale travel, no counter, mirrored layout. */
  tone?: "default" | "centre";
  showCounter?: boolean;
}

/**
 * Desktop: sticky visual frame + scroll-linked narrative (visual state is driven by
 * scroll progress). Mobile: plain IMAGE → TEXT sequence, no sticky behaviour.
 */
export const StoryScene = ({ steps, ariaLabel, tone = "default", showCounter = true }: StorySceneProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());
  const centre = tone === "centre";
  const count = steps.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!Number.isFinite(value)) return;
    const next = Math.min(count - 1, Math.max(0, Math.round(value * (count - 1))));
    setActiveIndex(next);
  });

  const surface = centre ? "bg-[#f4f1ea]" : "bg-[#faf8f5]";

  return (
    <section ref={sectionRef} aria-label={ariaLabel} className={`relative ${surface}`}>
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className={centre ? "order-2" : ""}>
          <div className="sticky top-10 flex h-[calc(100svh-2.5rem)] flex-col">
            <div className="relative flex-1 overflow-hidden">
              {steps.map((step, index) => (
                <StoryImage
                  key={step.id}
                  src={step.image}
                  alt={step.imageAlt}
                  label={step.label}
                  meta={step.meta}
                  index={index}
                  count={count}
                  progress={scrollYProgress}
                  active={index === activeIndex}
                  reducedMotion={reducedMotion}
                  scaleDelta={centre ? 0.012 : 0.02}
                  priority={index === 0}
                />
              ))}
            </div>
            {showCounter && !centre && (
              <div className="px-14 pb-8">
                <div className="h-px w-full bg-stone-200">
                  <motion.div
                    className="h-px origin-left bg-stone-900"
                    style={{ scaleX: reducedMotion ? 1 : scrollYProgress }}
                  />
                </div>
                <p className="mt-3 text-xs tracking-[0.25em] text-stone-500" aria-hidden="true">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={centre ? "order-1" : ""}>
          {steps.map((step) => (
            <div key={step.id} className="flex min-h-[100svh] items-center px-16 py-24">
              <StoryText
                label={step.label}
                title={step.title}
                text={step.text}
                meta={step.meta}
                reducedMotion={reducedMotion}
                slow={centre}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: IMAGE → TEXT, no sticky behaviour */}
      <div className="lg:hidden">
        {steps.map((step, index) => (
          <article key={step.id} className="border-t border-stone-200 px-6 py-16">
            {step.image && (
              <img
                src={step.image}
                alt={step.imageAlt ?? ""}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="mx-auto mb-10 max-h-[70svh] w-auto max-w-full object-contain"
              />
            )}
            <StoryText
              label={step.label}
              title={step.title}
              text={step.text}
              meta={step.meta}
              reducedMotion={reducedMotion}
              slow={centre}
            />
          </article>
        ))}
      </div>
    </section>
  );
};
