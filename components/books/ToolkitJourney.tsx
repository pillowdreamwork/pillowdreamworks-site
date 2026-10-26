"use client";

import React, { useState } from "react";
import { Book } from "@/data/books";
import { StoryScene, StoryStep } from "./StoryScene";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Eye, BookOpen } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

interface ChapterCardData {
  num: string;
  title: string;
  subtitle: string;
  pages: string;
  openerImage: string;
  innerPages: {
    src: string;
    caption: string;
    label: string;
  }[];
}

const TOOLKIT_CHAPTERS: ChapterCardData[] = [
  {
    num: "01",
    title: "Understanding Your Mind",
    subtitle: "Emotions, self-awareness and emotional regulation",
    pages: "Pages 6–20",
    openerImage: "/images/books/psychology-toolkit/chapter-1/pt-ch1-opener.png",
    innerPages: [
      {
        src: "/images/books/psychology-toolkit/chapter-1/pt-ch1-lesson1.png",
        caption: "What Are Emotions?",
        label: "Lesson 1",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-1/pt-ch1-lesson5.png",
        caption: "Recognising Emotional Triggers",
        label: "Lesson 5",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-1/pt-ch1-worksheet.png",
        caption: "Thought Reframe Worksheet",
        label: "Worksheet",
      },
    ],
  },
  {
    num: "02",
    title: "Thoughts & Mindset",
    subtitle: "Recognizing thinking patterns and building resilience",
    pages: "Pages 21–35",
    openerImage: "/images/books/psychology-toolkit/chapter-2/pt-ch2-opener.png",
    innerPages: [
      {
        src: "/images/books/psychology-toolkit/chapter-2/pt-ch2-lesson1.png",
        caption: "Understanding Thoughts & Mindset",
        label: "Lesson 1",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-2/pt-ch2-lesson5.png",
        caption: "Cognitive Distortions & Reframing",
        label: "Lesson 5",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-2/pt-ch2-worksheet.png",
        caption: "Reframing Your Thoughts Worksheet",
        label: "Worksheet",
      },
    ],
  },
  {
    num: "03",
    title: "Anxiety & Stress",
    subtitle: "Practical tools for emotional regulation",
    pages: "Pages 36–50",
    openerImage: "/images/books/psychology-toolkit/chapter-3/pt-ch3-opener.png",
    innerPages: [
      {
        src: "/images/books/psychology-toolkit/chapter-3/pt-ch3-lesson1.png",
        caption: "The Stress Response & The Body",
        label: "Lesson 1",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-3/pt-ch3-lesson5.png",
        caption: "Calming Your Nervous System",
        label: "Lesson 5",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-3/pt-ch3-worksheet.png",
        caption: "Coping Strategies & Emotional Regulation Worksheet",
        label: "Worksheet",
      },
    ],
  },
  {
    num: "04",
    title: "Relationships & Boundaries",
    subtitle: "Building healthier connections and clear boundaries",
    pages: "Pages 51–65",
    openerImage: "/images/books/psychology-toolkit/chapter-4/pt-ch4-opener.png",
    innerPages: [
      {
        src: "/images/books/psychology-toolkit/chapter-4/pt-ch4-lesson1.png",
        caption: "Healthy vs Unhealthy Relationships",
        label: "Lesson 1",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-4/pt-ch4-lesson5.png",
        caption: "Setting & Maintaining Boundaries",
        label: "Lesson 5",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-4/pt-ch4-worksheet.png",
        caption: "Relationship Support Map & Review Worksheet",
        label: "Worksheet",
      },
    ],
  },
  {
    num: "05",
    title: "Habits & Personal Growth",
    subtitle: "Turning awareness into daily intentional action",
    pages: "Pages 66–75",
    openerImage: "/images/books/psychology-toolkit/chapter-5/pt-ch5-opener.png",
    innerPages: [
      {
        src: "/images/books/psychology-toolkit/chapter-5/pt-ch5-lesson1.png",
        caption: "The Science of Habits & Behaviour",
        label: "Lesson 1",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-5/pt-ch5-lesson5.png",
        caption: "Values Alignment & Creating Routines",
        label: "Lesson 5",
      },
      {
        src: "/images/books/psychology-toolkit/chapter-5/pt-ch5-worksheet.png",
        caption: "Habit Tracker & Future Self Worksheet",
        label: "Worksheet",
      },
    ],
  },
];

const CLOSING_DATA = {
  num: "06",
  title: "Resources & Closing",
  subtitle: "Extend your learning journey beyond this workbook",
  pages: "Pages 76–80",
  openerImage: "/images/books/psychology-toolkit/closing/pt-final-reflection.png",
  innerPages: [
    {
      src: "/images/books/psychology-toolkit/closing/pt-resources.png",
      caption: "Recommended Books & Psychology Tools Index",
      label: "Reference",
    },
    {
      src: "/images/books/psychology-toolkit/closing/pt-thank-you.png",
      caption: "Final Reflection, Commitment & Thank You",
      label: "Closing",
    },
  ],
};

function ChapterInteractiveRow({ chapter }: { chapter: ChapterCardData }) {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const totalPages = chapter.innerPages.length;

  const handlePrev = () => {
    setActivePageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setActivePageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentInnerPage = chapter.innerPages[activePageIndex];

  return (
    <article className="border-t border-stone-300/80 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
                Chapter {chapter.num}
              </span>
              <span className="text-stone-400">·</span>
              <span className="font-mono text-xs text-stone-500">{chapter.pages}</span>
            </div>
            <h3 className="mt-2 font-serif text-3xl text-stone-900 md:text-5xl leading-tight">
              {chapter.title}
            </h3>
            <p className="mt-2 font-serif text-lg italic text-stone-600 max-w-xl">
              {chapter.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500">
              Inner Pages ({activePageIndex + 1} / {totalPages})
            </span>
          </div>
        </div>

        {/* Dual Layout: Centered Chapter Opener + Interactive Horizontal Page Viewer with Arrows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Central Chapter Opener Image */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md border border-stone-200/70">
            <div className="relative w-full flex items-center justify-center max-h-[60svh] overflow-hidden">
              <img
                src={chapter.openerImage}
                alt={`${chapter.title} opener plate`}
                loading="lazy"
                decoding="async"
                className="max-h-[55svh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-wider text-stone-500 uppercase">
              Chapter {chapter.num} · Opener Plate
            </p>
          </div>

          {/* Horizontal Scrolling Page Viewer with Arrow Controls */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F7F4EE] p-6 sm:p-8 border border-stone-200/80 shadow-md">
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C6A46A]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#24483B] font-semibold">
                  {currentInnerPage.label}
                </span>
              </div>
              <span className="font-serif text-xs text-stone-500 italic truncate max-w-[200px]">
                {currentInnerPage.caption}
              </span>
            </div>

            {/* Inner Page Preview with smooth transitions */}
            <div className="relative w-full flex items-center justify-center min-h-[46svh] max-h-[55svh] overflow-hidden my-2">
              <motion.img
                key={currentInnerPage.src}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                src={currentInnerPage.src}
                alt={`${currentInnerPage.caption} from ${chapter.title}`}
                loading="lazy"
                decoding="async"
                className="max-h-[50svh] w-auto object-contain rounded-lg shadow-md border border-stone-200/60"
              />
            </div>

            {/* Arrow Navigation Controls with Magnetic Light Hover */}
            <div className="w-full flex items-center justify-between pt-5 mt-3 border-t border-stone-200">
              <div className="flex items-center gap-1.5">
                {chapter.innerPages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActivePageIndex(dotIdx)}
                    className={`h-2 transition-all rounded-full cursor-pointer ${
                      dotIdx === activePageIndex ? "w-6 bg-[#24483B]" : "w-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to page ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous inner page"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm border border-stone-300 hover:bg-[#24483B] hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next inner page"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm border border-stone-300 hover:bg-[#24483B] hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export const ToolkitJourney = ({ book }: { book: Book }) => {
  const reducedMotion = Boolean(useReducedMotion());

  // Sequence 1: Under One Roof (About the Author, Contents, About this Workbook)
  const introSteps: StoryStep[] = [
    {
      id: "pt-founder",
      label: "01",
      title: "About the Author",
      text: "Written and curated by Manish Garg, founder of PillowDreamWorks. Bridging foundational psychological concepts with everyday self-development tools.",
      meta: "Foundation Colophon · Page 1",
      image: "/images/books/psychology-toolkit/about/pt-founder.png",
      imageAlt: "Founder profile page from The Psychology Toolkit",
    },
    {
      id: "pt-contents",
      label: "02",
      title: "Table of Contents",
      text: "An 80-page, A4 psychology and wellbeing workbook created to make psychological concepts accessible through guided learning, structured exercises, and practical reflection.",
      meta: "Architectural Overview · Page 2",
      image: "/images/books/psychology-toolkit/about/pt-contents.png",
      imageAlt: "Table of Contents page from The Psychology Toolkit",
    },
    {
      id: "pt-about-workbook",
      label: "03",
      title: "About This Workbook",
      text: "The practical journey: Understand → Reflect → Practice → Track → Grow. Each chapter introduces a different area of personal understanding and development.",
      meta: "Methodology · Page 3",
      image: "/images/books/psychology-toolkit/about/pt-about-workbook.png",
      imageAlt: "About This Workbook page from The Psychology Toolkit",
    },
  ];

  return (
    <div className="relative bg-[#FAF8F5]">
      {/* ── SEQUENCE 1: UNDER ONE ROOF (About Author, Contents, About Workbook) ── */}
      <div className="border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-8 text-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C6A46A]">
            Sequence 1 · Under One Roof
          </p>
          <h3 className="mt-3 font-serif text-3xl text-stone-900 md:text-5xl">
            The Psychology Toolkit
          </h3>
          <p className="mx-auto mt-3 max-w-xl font-serif text-base text-stone-600 italic">
            Foundational colophon, complete table of contents, and practical learning methodology.
          </p>
        </div>
        <StoryScene steps={introSteps} ariaLabel={`${book.title}: overview`} showCounter={true} />
      </div>

      {/* ── SEQUENCE 2: CHAPTERS 1 TO 5 (Opener in Middle + Horizontal Page Viewer) ── */}
      <div className="bg-[#FAF8F5]">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-8 text-center md:px-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#24483B]/10 text-[#24483B] font-mono text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            Sequence 2 · Five-Chapter Practical Journey
          </span>
          <h3 className="font-serif text-4xl text-stone-900 md:text-5xl lg:text-6xl leading-tight">
            Chapters 1 to 5
          </h3>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-stone-600 leading-relaxed">
            Scroll vertically to traverse all five chapters. Use the horizontal arrow controls to inspect inner lesson pages and reflection worksheets for each chapter.
          </p>
        </div>

        {TOOLKIT_CHAPTERS.map((chapter) => (
          <ChapterInteractiveRow key={chapter.num} chapter={chapter} />
        ))}
      </div>

      {/* ── SEQUENCE 3: RESOURCES & CLOSING (Separate Section with Horizontal Arrow Scroll) ── */}
      <div className="border-t border-stone-300 bg-[#F4F1EA]">
        <ChapterInteractiveRow chapter={CLOSING_DATA} />
      </div>
    </div>
  );
};
