"use client";

import React from "react";
import { Book } from "@/data/books";
import { StoryScene, StoryStep } from "./StoryScene";
import { motion, useReducedMotion } from "motion/react";

export const FindingCentreJourney = ({ book }: { book: Book }) => {
  const reducedMotion = Boolean(useReducedMotion());

  // Sequence 1: Introductory Guidance (Welcome -> About -> How it Works -> Everyday Life -> Therapeutic Settings)
  const introSteps: StoryStep[] = [
    {
      id: "ftc-welcome",
      label: "01",
      title: "Welcome",
      text: "An invitation to pause, breathe, and begin a thoughtful creative exploration.",
      meta: "Orientation · Page 1",
      image: "/images/books/finding-centre/ftc-welcome.png",
      imageAlt: "Welcome page from Finding The Centre",
    },
    {
      id: "ftc-about",
      label: "02",
      title: "About This Book",
      text: "Bringing together Gestalt psychology, visual perception, and guided mindfulness.",
      meta: "Orientation · Page 2",
      image: "/images/books/finding-centre/ftc-about.png",
      imageAlt: "About This Book page from Finding The Centre",
    },
    {
      id: "ftc-how-it-works",
      label: "03",
      title: "How This Book Works",
      text: "Begin with an image. Notice what draws your attention, choose colors intuitively, and reflect.",
      meta: "Working Method · Page 3",
      image: "/images/books/finding-centre/ftc-how-it-works.png",
      imageAlt: "How This Book Works page from Finding The Centre",
    },
    {
      id: "ftc-everyday-life",
      label: "04",
      title: "Using This Book in Everyday Life",
      text: "Structured yet flexible practices for quiet personal breaks, emotional grounding, and creative mindfulness.",
      meta: "Daily Application · Page 4",
      image: "/images/books/finding-centre/ftc-everyday-life.png",
      imageAlt: "Using This Book in Everyday Life page from Finding The Centre",
    },
    {
      id: "ftc-therapeutic-settings",
      label: "05",
      title: "Using This Book in Therapeutic Settings",
      text: "A supportive conversational starting point for therapists, counselors, educators, and group facilitators.",
      meta: "Facilitator Resource · Page 5",
      image: "/images/books/finding-centre/ftc-therapeutic-settings.png",
      imageAlt: "Using This Book in Therapeutic Settings page from Finding The Centre",
    },
  ];

  // Sequence 2: Chapter 1 & Core Thematic Artworks (Numbered separately under distinct heading)
  const artworkSteps: StoryStep[] = [
    {
      id: "ftc-art-core-contour",
      label: "01",
      title: "The Core and the Contour",
      text: "Exploring the delicate relationship between the self and the surrounding world through figure-ground awareness.",
      meta: "Theme 1 · Core Artwork",
      image: "/images/books/finding-centre/ftc-core-contour.png",
      imageAlt: "The Core and the Contour page from Finding The Centre",
    },
    {
      id: "ftc-art-safe-heart",
      label: "02",
      title: "The Safe Heart",
      text: "Grounding in emotional safety, personal boundaries, and inner sanctuary through concentric framing.",
      meta: "Theme 1 · Reflection Plate",
      image: "/images/books/finding-centre/ftc-safe-heart.png",
      imageAlt: "The Safe Heart page from Finding The Centre",
    },
    {
      id: "ftc-art-home-inside",
      label: "03",
      title: "Home Inside Me",
      text: "Cultivating belonging, self-compassion, and quiet grounding within yourself through closure and balance.",
      meta: "Theme 1 · Guided Plate",
      image: "/images/books/finding-centre/ftc-home-inside.png",
      imageAlt: "Home Inside Me page from Finding The Centre",
    },
  ];

  return (
    <div className="relative bg-[#FAF8F5]">
      {/* ── PART 1: INTRODUCTORY SEQUENCE ── */}
      <div className="border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-8 text-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C6A46A]">
            Sequence 1 · Orientation & Practice
          </p>
          <h3 className="mt-3 font-serif text-3xl text-stone-900 md:text-4xl">
            Entering Finding The Centre
          </h3>
          <p className="mx-auto mt-3 max-w-xl font-serif text-base text-stone-600 italic">
            Five opening guides bridging perceptual psychology, creative mindfulness, and everyday practice.
          </p>
        </div>
        <StoryScene steps={introSteps} ariaLabel={`${book.title}: orientation guides`} tone="centre" showCounter={true} />
      </div>

      {/* ── PART 2: DISTINCT TRANSITION BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl px-6 py-28 text-center md:px-8"
      >
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#24483B]/10 text-[#24483B] font-mono text-xs uppercase tracking-[0.25em] font-semibold mb-4">
          Sequence 2 · Core Artworks
        </span>
        <h3 className="font-serif text-4xl text-stone-900 md:text-5xl lg:text-6xl leading-tight">
          Chapter 1: The Core and the Contour
        </h3>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-lg text-stone-600 leading-relaxed">
          The opening theme explores self-definition, boundaries, and how we distinguish ourselves from our surroundings. Notice the interplay of form and space across these three core plates.
        </p>
        <div className="mx-auto mt-10 h-12 w-px bg-stone-300" />
      </motion.div>

      {/* ── PART 2: CORE ARTWORK SEQUENCE (Separately numbered) ── */}
      <div className="border-t border-stone-200">
        <StoryScene steps={artworkSteps} ariaLabel={`${book.title}: core plates`} tone="centre" showCounter={true} />
      </div>
    </div>
  );
};
