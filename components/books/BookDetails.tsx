/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book } from "@/data/books";
import { BookOpen, CheckCircle2, HeartHandshake, Sparkles, Brain, Shield, Compass } from "lucide-react";

interface BookDetailsProps {
  book: Book;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  const reducedMotion = useReducedMotion();
  const isCentre = book.id === "finding-the-centre";

  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" } as const,
    transition: { duration: reducedMotion ? 0.2 : 0.8 },
  };

  return (
    <section aria-label={`${book.title}: comprehensive guide`} className="border-t border-stone-300 bg-[#faf8f5] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* ── FINDING THE CENTRE EDITORIAL SPECIFICATION ── */}
        {isCentre ? (
          <div>
            {/* 1. Above 'About this book': Special Cover Plate (without mentioning cream cover) */}
            <motion.div {...reveal} className="mb-20 flex flex-col items-center text-center">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-stone-200/80">
                <img
                  src="/images/books/finding-centre/ftc-cover-cream.png"
                  alt="Finding The Centre Workbook Edition"
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto max-h-[30rem] w-auto max-w-full object-contain rounded-xl"
                />
              </div>
              <div className="mt-4 h-8 w-px bg-stone-300" />
            </motion.div>

            {/* 2. Main Title and Subtitle */}
            <motion.div {...reveal} className="max-w-4xl mx-auto text-center mb-16">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C6A46A] font-mono font-semibold">
                About This Book · Complete Editorial Guide
              </p>
              <h2 className="font-serif text-5xl leading-tight text-stone-900 md:text-6xl lg:text-7xl">
                Finding The Centre
              </h2>
              <p className="mt-4 font-serif text-2xl italic text-stone-600 md:text-3xl">
                A Therapeutic Coloring &amp; Reflection Workbook for Children, Teens &amp; Adults
              </p>

              <div className="mt-8 rounded-2xl bg-[#F4F1EA] p-6 sm:p-8 border border-stone-300/80 text-center">
                <p className="font-serif text-xl sm:text-2xl text-[#24483B] font-medium leading-snug">
                  &ldquo;Ten psychological themes. Beautifully detailed coloring pages. A space to understand yourself a little better.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* 3. Introduction & Gestalt Philosophy */}
            <motion.div {...reveal} className="max-w-4xl mx-auto space-y-6 text-stone-700 font-serif text-lg leading-relaxed mb-20">
              <p>
                What if coloring could become more than a creative break? What if it could also offer a way to slow down, notice your experiences, explore different perspectives, and ask meaningful questions about yourself?
              </p>
              <p>
                <em>Finding The Centre</em> is a psychology-inspired coloring and reflection workbook that brings together <strong>Gestalt psychology, visual perception, creative expression, mindfulness, and guided self-reflection</strong>. Designed for children, teenagers, and adults, it offers a structured yet flexible way to explore psychological ideas through illustrations, colors, patterns, and thoughtful questions.
              </p>
              <p>
                Rather than asking you to understand yourself through words alone, this workbook invites you to begin with an image. Notice what draws your attention, choose the colors that feel right to you, and reflect on what the experience brings to mind. There is no single correct interpretation, no artistic standard to meet, and no pressure to complete the journey in a particular way.
              </p>
            </motion.div>

            {/* 4. The Psychology Behind the Pages */}
            <motion.div {...reveal} className="mb-20 rounded-3xl bg-white p-8 sm:p-12 border border-stone-200/90 shadow-sm">
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
                  Theoretical Architecture
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
                  The Psychology Behind the Pages
                </h3>
                <p className="mt-4 font-serif text-base sm:text-lg text-stone-600 leading-relaxed">
                  The ten chapters are organized around different themes connected to how we perceive, organize, and make meaning of our experiences. The book draws inspiration from <strong>Gestalt psychology and principles of visual perception</strong>, including figure–ground organization, closure, bistable perception, similarity, continuity, Prägnanz (simplicity), pareidolia, and concentric framing.
                </p>
                <p className="mt-3 font-serif text-base sm:text-lg text-stone-600 leading-relaxed">
                  These concepts offer more than interesting visual patterns. They provide accessible starting points for reflecting on how we distinguish ourselves from our surroundings, make sense of incomplete experiences, hold contrasting perspectives, recognize patterns, and find a sense of focus and balance.
                </p>
              </div>

              {/* 10 Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-200">
                {[
                  { n: "01", t: "The Core and the Contour", d: "Exploring the relationship between the self and the surrounding world." },
                  { n: "02", t: "The Unspoken Whole", d: "Reflecting on incompleteness, meaning, and the possibilities held in what remains unfinished." },
                  { n: "03", t: "Holding Dualities", d: "Making room for different perspectives and feelings that may coexist." },
                  { n: "04", t: "The Inner Sanctuary", d: "Exploring safety, personal space, boundaries, and inner grounding." },
                  { n: "05", t: "Rhythm & Repetition", d: "Noticing patterns, continuity, and the calming potential of mindful creative activity." },
                  { n: "06", t: "Patterns & Perspectives", d: "Exploring how patterns and viewpoints shape what we notice." },
                  { n: "07", t: "Connections & Compassion", d: "Reflecting on relationships, understanding, and our connections with others." },
                  { n: "08", t: "Resilience & Inner Strength", d: "Making space for strengths, challenges, and personal growth." },
                  { n: "09", t: "Dreams, Purpose & Possibilities", d: "Exploring imagination, aspirations, and possible directions for growth." },
                  { n: "10", t: "Integration & A Kinder Tomorrow", d: "Bringing together insights from the journey and considering what you wish to carry forward." },
                ].map((item) => (
                  <div key={item.n} className="flex gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/60">
                    <span className="font-mono text-sm font-semibold text-[#C6A46A] shrink-0 pt-0.5">{item.n}</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-stone-900">{item.t}</h4>
                      <p className="mt-1 font-serif text-sm text-stone-600 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. More Than Coloring: 3-Page Reflection Guide */}
            <motion.div {...reveal} className="mb-20">
              <div className="max-w-3xl mb-10">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
                  Three-Tier Methodology
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
                  More Than Coloring: A Three-Page Reflection Guide in Every Chapter
                </h3>
                <p className="mt-3 font-serif text-base sm:text-lg text-stone-600 leading-relaxed">
                  Each chapter includes a dedicated three-page interpretation and reflection guide, making the workbook especially useful for readers who want to engage with the ideas behind the artwork.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#24483B] font-semibold bg-[#24483B]/10 px-2.5 py-1 rounded-full inline-block mb-4">
                      Page 1
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">Understanding the Chapter</h4>
                    <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
                      Discover what the chapter explores, why its central perceptual principle matters, and how its ten recurring reflection areas—including self-awareness, identity, emotions, strengths, challenges, relationships, environment, balance, perspective, and growth—connect with everyday experiences.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#24483B] font-semibold bg-[#24483B]/10 px-2.5 py-1 rounded-full inline-block mb-4">
                      Page 2
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">Personal Reflection for Children &amp; Adults</h4>
                    <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
                      Age-appropriate questions encourage children and adults to reflect on what caught their attention, which parts of an illustration they enjoyed, how the coloring experience felt, and what the activity brought to mind. Children are offered accessible prompts, while adults explore their experiences in greater depth.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#24483B] font-semibold bg-[#24483B]/10 px-2.5 py-1 rounded-full inline-block mb-4">
                      Page 3
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">A Guide for Practitioners</h4>
                    <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
                      Designed as a supportive resource for therapists, counselors, educators, and facilitators, this page includes chapter-specific therapeutic objectives, observation points, suggested open-ended questions, exploration activities, and space for session notes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 6. Settings & Reflection Not Diagnosis */}
            <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="rounded-2xl bg-[#F7F4EE] p-8 border border-stone-300/80">
                <h4 className="font-serif text-2xl text-stone-900 mb-4">Created for Different Readers and Settings</h4>
                <p className="font-serif text-base text-stone-700 leading-relaxed">
                  Whether you are a psychology student interested in Gestalt principles, a parent looking for meaningful creative activities, an educator supporting reflection in the classroom, or a mental health practitioner seeking an additional resource for guided conversations, <em>Finding The Centre</em> offers a flexible way to bring creativity and psychological ideas together.
                </p>
                <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed">
                  Use it at home, during a quiet personal break, in educational settings, or as an optional activity within appropriate therapeutic and occupational therapy contexts. Children and adults have their own coloring tracks.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF0E6] p-8 border border-[#C6A46A]/40">
                <div className="flex items-center gap-2 text-[#8B2626] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                  <Shield className="w-4 h-4" />
                  Ethical Demarcation
                </div>
                <h4 className="font-serif text-2xl text-stone-900 mb-4">A Workbook for Reflection, Not Diagnosis</h4>
                <p className="font-serif text-base text-stone-700 leading-relaxed">
                  <em>Finding The Centre</em> is an educational and reflective resource. Its illustrations, color choices, and reflection prompts are not diagnostic tests, and they should not be used to infer a person&apos;s psychological condition from their drawings.
                </p>
                <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed">
                  The practitioner guides are intended to support conversation and self-awareness, not replace professional assessment, clinical judgment, or medical treatment.
                </p>
              </div>
            </motion.div>

            {/* 7. Closing Invocations and Credits */}
            <motion.div {...reveal} className="rounded-2xl bg-[#24483B] text-[#FDFBF7] p-8 sm:p-12 text-center">
              <p className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                Pause. Breathe. Reflect. Create. Grow.
              </p>
              <p className="mt-4 font-serif text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                Let each page become an opportunity to notice something new, approach yourself with greater kindness, and explore the many ways we make meaning of our inner and outer worlds.
              </p>
              <p className="mt-6 font-serif text-xl italic text-[#C6A46A]">
                Finding The Centre — a little space for creativity, a little time for reflection, and a kinder way to meet yourself.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-stone-300">
                Written and curated by <strong className="text-white">Manish Garg</strong>, founder of <strong className="text-white">PillowDreamWorks</strong>.
              </p>
            </motion.div>
          </div>
        ) : (
          /* ── THE PSYCHOLOGY TOOLKIT EDITORIAL SPECIFICATION ── */
          <div>
            {/* 1. Main Title and Subtitle */}
            <motion.div {...reveal} className="max-w-4xl mx-auto text-center mb-16">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C6A46A] font-mono font-semibold">
                About This Workbook · Practical Architecture
              </p>
              <h2 className="font-serif text-5xl leading-tight text-stone-900 md:text-6xl lg:text-7xl">
                The Psychology Toolkit
              </h2>
              <p className="mt-4 font-serif text-2xl italic text-stone-600 md:text-3xl">
                Practical Tools for Emotional Wellbeing, Self-Awareness &amp; Personal Growth
              </p>

              <div className="mt-8 rounded-2xl bg-[#F4F1EA] p-6 sm:p-8 border border-stone-300/80 text-center">
                <p className="font-serif text-xl sm:text-2xl text-[#24483B] font-medium leading-snug">
                  &ldquo;Understand yourself. Reflect on your patterns. Practice new skills. Build habits that support a healthier, more self-aware life.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* 2. Intro Questions & Overview */}
            <motion.div {...reveal} className="max-w-4xl mx-auto space-y-6 text-stone-700 font-serif text-lg leading-relaxed mb-20">
              <p>
                Why do we react the way we do? How do our thoughts influence our emotions? What can we do when stress, anxiety, or overthinking becomes difficult to manage? And how can we build healthier relationships and habits that support the person we want to become?
              </p>
              <p>
                <em>The Psychology Toolkit</em> is an 80-page, A4 psychology and wellbeing workbook created to make psychological concepts more accessible through guided learning, structured exercises, reflection, and practical activities. Written and curated by Manish Garg, it brings together foundational psychology concepts and everyday self-development tools in a format designed to help readers turn awareness into action.
              </p>
              <p>
                Rather than simply reading about psychology, you are invited to engage with it. Explore how you think and feel, recognize patterns in your everyday experiences, work through guided exercises, and identify small steps you can practice in daily life.
              </p>
            </motion.div>

            {/* 3. A Five-Chapter Journey */}
            <motion.div {...reveal} className="mb-20 rounded-3xl bg-white p-8 sm:p-12 border border-stone-200 shadow-sm">
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
                  Progressive Progression
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
                  A Five-Chapter Journey Through Psychology and Everyday Life
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#24483B] bg-[#24483B]/10 px-4 py-2 rounded-full w-fit">
                  <span>Understand</span>
                  <span>→</span>
                  <span>Reflect</span>
                  <span>→</span>
                  <span>Practice</span>
                  <span>→</span>
                  <span>Track</span>
                  <span>→</span>
                  <span>Grow</span>
                </div>
                <p className="mt-4 font-serif text-base sm:text-lg text-stone-600 leading-relaxed">
                  Each chapter introduces a different area of personal understanding and development, helping you connect psychological ideas with real-life experiences.
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-stone-200">
                {[
                  {
                    num: "1",
                    title: "Understanding Your Mind",
                    subtitle: "Emotions, self-awareness and emotional regulation",
                    body: "Begin by exploring psychology, the relationship between the brain and behavior, and the role emotions play in everyday life. Learn to notice emotional experiences, recognize triggers, and reflect on the patterns that influence your responses. This chapter provides a foundation for greater self-awareness: understanding what you feel, what may contribute to those feelings, and how you can respond with more intention.",
                  },
                  {
                    num: "2",
                    title: "Thoughts & Mindset",
                    subtitle: "Recognizing thinking patterns and building resilience",
                    body: "Our interpretations of events can influence how we feel and what we do next. This chapter introduces thoughts, cognitive distortions, and the practice of reframing unhelpful thinking patterns. Through reflection and exercises, readers are encouraged to examine their assumptions, consider alternative perspectives, and develop a more balanced approach to everyday challenges.",
                  },
                  {
                    num: "3",
                    title: "Anxiety & Stress",
                    subtitle: "Practical tools for emotional regulation",
                    body: "Stress and anxiety can affect attention, emotions, physical sensations, and daily routines. This chapter explores the stress response and introduces practical approaches to calming the body, understanding anxious experiences, and choosing coping strategies. The goal is not to eliminate every uncomfortable feeling, but to build a more informed and thoughtful response to challenging moments.",
                  },
                  {
                    num: "4",
                    title: "Relationships & Boundaries",
                    subtitle: "Building healthier connections",
                    body: "Our relationships influence how we communicate, understand ourselves, and relate to others. This chapter explores healthy and unhealthy relationship patterns, setting and maintaining boundaries, communication skills, self-respect, and saying no. Guided exercises and a support map encourage readers to reflect on their relationships, consider their needs, and identify ways to communicate more clearly and respectfully.",
                  },
                  {
                    num: "5",
                    title: "Habits & Personal Growth",
                    subtitle: "Turning awareness into daily action",
                    body: "Personal growth often develops through small, repeated choices rather than dramatic changes. This chapter introduces the science of habits, positive habit-building, values, goal setting, and routine creation. With exercises, a habit tracker, and future-focused reflection, readers can turn intentions into practical steps and review their progress over time.",
                  },
                ].map((ch) => (
                  <div key={ch.num} className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm font-bold text-[#C6A46A]">{ch.num}.</span>
                      <h4 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold">{ch.title}</h4>
                    </div>
                    <p className="font-serif text-sm sm:text-base italic text-stone-600 mb-3">{ch.subtitle}</p>
                    <p className="font-serif text-base text-stone-700 leading-relaxed">{ch.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Designed to Put Psychology into Practice */}
            <motion.div {...reveal} className="mb-20 rounded-3xl bg-[#F7F4EE] p-8 sm:p-12 border border-stone-300/80">
              <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
                Designed to Help You Put Psychology into Practice
              </h3>
              <p className="font-serif text-base sm:text-lg text-stone-700 leading-relaxed mb-6">
                The Psychology Toolkit combines explanations with opportunities to apply what you learn. Across its chapters, the workbook includes guided exercises, reflection activities, worksheets, practical tools, and review opportunities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Recognize emotional triggers and reflect on your responses.",
                  "Explore how thinking patterns influence feelings and behavior.",
                  "Practice reframing thoughts and considering alternative perspectives.",
                  "Reflect on stress and identify coping approaches that suit your needs.",
                  "Examine relationship boundaries and communication habits.",
                  "Clarify personal values and set meaningful goals.",
                  "Build routines and monitor habits over time.",
                  "Extend learning with recommended books, 30-day review, and tools index.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/70">
                    <CheckCircle2 className="w-5 h-5 text-[#24483B] shrink-0 mt-0.5" />
                    <span className="font-serif text-sm sm:text-base text-stone-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Who Is This Workbook For? */}
            <motion.div {...reveal} className="mb-20">
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A] font-semibold">
                  Audience Scope
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
                  Who Is This Workbook For?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    t: "Psychology Enthusiasts & Students",
                    d: "Readers who want an accessible, practical way to connect psychological concepts with real-life everyday experiences.",
                  },
                  {
                    t: "Self-Awareness & Personal Development",
                    d: "People looking to reflect deeply on their emotions, thoughts, habit loops, and interpersonal relationships.",
                  },
                  {
                    t: "Readers Navigating Stress",
                    d: "Individuals seeking practical, evidence-grounded coping strategies, emotional regulation tools, and grounded routines.",
                  },
                  {
                    t: "Educators, Facilitators & Practitioners",
                    d: "Wellbeing professionals seeking structured worksheets that support appropriate educational discussions.",
                  },
                ].map((aud, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                    <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">{aud.t}</h4>
                    <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">{aud.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 6. Continued Growth & Note on Wellbeing */}
            <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="rounded-2xl bg-[#F7F4EE] p-8 border border-stone-300/80">
                <h4 className="font-serif text-2xl text-stone-900 mb-4">A Practical Resource for Continued Growth</h4>
                <p className="font-serif text-base text-stone-700 leading-relaxed">
                  Psychology becomes especially meaningful when we connect what we learn with what we experience. The Psychology Toolkit is built around that connection: understand a concept, reflect on how it relates to you, practice a useful skill, and return to review what you have learned.
                </p>
                <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed">
                  You can work through the chapters in sequence or revisit a topic when you want to focus on a particular area of your life.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF0E6] p-8 border border-[#C6A46A]/40">
                <div className="flex items-center gap-2 text-[#8B2626] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                  <Shield className="w-4 h-4" />
                  Ethical Note
                </div>
                <h4 className="font-serif text-2xl text-stone-900 mb-4">A Note on Wellbeing</h4>
                <p className="font-serif text-base text-stone-700 leading-relaxed">
                  <em>The Psychology Toolkit</em> is an educational and self-reflection resource, not a diagnostic test or a substitute for psychological assessment, professional counseling, or medical care.
                </p>
                <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed">
                  Its activities are intended to support learning and personal reflection; they do not guarantee particular outcomes or replace individualized professional guidance.
                </p>
              </div>
            </motion.div>

            {/* 7. Closing Invocations and Credits */}
            <motion.div {...reveal} className="rounded-2xl bg-[#24483B] text-[#FDFBF7] p-8 sm:p-12 text-center">
              <p className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                Learn with curiosity. Reflect with honesty. Practice with intention. Grow one step at a time.
              </p>
              <p className="mt-4 font-serif text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                The Psychology Toolkit — practical psychology for a more self-aware, thoughtful, and intentional everyday life.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[#C6A46A]">
                Written and curated by <strong className="text-white">Manish Garg</strong> | <strong className="text-white">PillowDreamWorks</strong>
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
