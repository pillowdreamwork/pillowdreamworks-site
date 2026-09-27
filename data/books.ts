// Books Ecosystem Data — PillowDreamWorks Foundation

export interface BookChapter {
  number: string;
  title: string;
  tagline: string;
  description: string;
  exercises: string[];
  keyTakeaway: string;
}

export const PSYCHOLOGY_TOOLKIT = {
  id: "psychology-toolkit",
  title: "The Psychology Toolkit",
  subtitle: "80-Page Master Workbook & Reflection Architecture",
  format: "Printable A4 Master PDF (80 Pages)",
  tagline: "Understand yourself with the precision of a psychologist and the compassion of a guide.",
  overview:
    "An 80-page, master-crafted psychological workbook engineered for deep self-reflection, cognitive restructuring, and emotional sovereignty. Spanning five structured chapters, each module bridges evidence-based psychology with actionable reflection tools.",
  journey: [
    { step: "01", label: "Understand", description: "Map your subconscious triggers, cognitive biases, and psychological baseline." },
    { step: "02", label: "Reflect", description: "Engage with guided prompt architectures designed to bypass surface rationalizations." },
    { step: "03", label: "Practice", description: "Apply cognitive reframing, somatic grounding, and boundary assertions daily." },
    { step: "04", label: "Track", description: "Measure emotional patterns and cognitive shifts across 30-day reflection loops." },
    { step: "05", label: "Grow", description: "Integrate long-term psychological resilience and grounded self-direction." },
  ],
  chapters: [
    {
      number: "01",
      title: "Understanding Yourself",
      tagline: "Self-Knowledge, Core Values & Emotional Baseline",
      description: "Deconstruct your behavioral schemas, subconscious scripts, and inner critic mechanisms to uncover what truly drives your emotional responses.",
      exercises: ["The Core Value Matrix", "Subconscious Script Audit", "The Persona vs Self Canvas"],
      keyTakeaway: "Clarity on why you react before you choose how to respond.",
    },
    {
      number: "02",
      title: "Thoughts & Mindset",
      tagline: "Cognitive Distortions, Reframing & Mental Models",
      description: "Identify catastrophic thinking, all-or-nothing cognitive traps, and emotional reasoning. Learn clinical cognitive reframing techniques.",
      exercises: ["The Distortion Identifier", "Belief Disputation Log", "Alternative Narrative Builder"],
      keyTakeaway: "Thoughts are hypotheses, not immutable facts.",
    },
    {
      number: "03",
      title: "Anxiety & Stress",
      tagline: "Nervous System Grounding, Worry Windows & Somatics",
      description: "Master somatic de-escalation protocols, physiological sigh mechanics, and boundary containment for generalized anxiety and panic triggers.",
      exercises: ["The Somatic Panic Protocol", "Structured Worry Window", "The Sensory Grounding Wheel"],
      keyTakeaway: "Regulate the nervous system first; reason with the mind second.",
    },
    {
      number: "04",
      title: "Relationships & Boundaries",
      tagline: "Attachment Dynamics, Communication & Boundary Architecture",
      description: "Examine anxious/avoidant attachment triggers, clarify non-negotiable boundaries, and learn compassionate assertiveness scripts.",
      exercises: ["The Boundary Clarity Blueprint", "Attachment Trigger Map", "Clean Communication Scripting"],
      keyTakeaway: "Boundaries preserve relationships; lack of boundaries breeds resentment.",
    },
    {
      number: "05",
      title: "Habits & Personal Growth",
      tagline: "Behavioral Momentum, Dopamine Stewardship & Identity Shift",
      description: "Design low-friction behavioral loops, protect mental focus from sensory fragmentation, and align daily actions with personal mastery.",
      exercises: ["The Micro-Habit Catalyst", "Dopamine Friction Audit", "The 90-Day Identity Blueprint"],
      keyTakeaway: "Sustainable growth is engineered through systems, not momentary motivation.",
    },
  ] as BookChapter[],
  samplePages: [
    { page: "Page 12", title: "Core Values Spectrum", preview: "A structured calibration matrix evaluating authentic versus inherited life priorities." },
    { page: "Page 28", title: "Cognitive Thought Record", preview: "A 5-column clinical table deconstructing automatic thoughts, evidence, and balanced alternatives." },
    { page: "Page 45", title: "Nervous System Somatic Log", preview: "Visual body mapping for tracking physiological tension and applying vagal stimulation protocols." },
    { page: "Page 62", title: "Boundary Assertiveness Canvas", preview: "Scripting frameworks for setting respectful, unshakeable limits in professional and personal relationships." },
  ],
  audiences: [
    { title: "Self-Development Readers", desc: "Seeking deeper, evidence-backed tools beyond surface-level motivational books." },
    { title: "Psychology Students & Learners", desc: "Wanting practical applications of cognitive and psychodynamic frameworks." },
    { title: "Reflective Journalers", desc: "Looking for structured prompts and clinical exercises rather than blank pages." },
    { title: "Individuals in Therapy", desc: "Using the workbook as an empowering companion between counselling sessions." },
  ],
  faqs: [
    {
      q: "Is this a physical book or a digital download?",
      a: "The Psychology Toolkit is delivered instantly as an ultra-high-resolution, print-ready A4 PDF. You can print it or complete it on any tablet/iPad app (GoodNotes, Notability, Apple Books, etc.).",
    },
    {
      q: "How long does it take to complete the workbook?",
      a: "Most readers take 4 to 8 weeks, dedicating 15–20 minutes each day to one exercise and its reflection prompts.",
    },
    {
      q: "Can this replace individual psychotherapy?",
      a: "No. The Toolkit is an educational self-reflection and psychoeducational resource. It is designed to complement personal growth or therapy, not replace clinical treatment.",
    },
    {
      q: "What is included with the Diwali Special offer?",
      a: "You receive the complete 80-page master PDF, 5 structured chapters, all reflection templates, plus direct access to the CentreLine support pathway.",
    },
  ],
};

export const FINDING_THE_CENTRE = {
  id: "finding-the-centre",
  title: "Finding The Centre",
  subtitle: "A Handbook for Grounded Living, Psychological Poise, and Inner Solitude",
  tagline: "When everything around you is accelerating, stillness is the ultimate rebellion.",
  overview:
    "An intimate, philosophical, and psychological exploration of inner grounding. Written with editorial warmth and deep psychological insight, Finding The Centre guides readers through finding stillness in an overstimulated, hyper-reactive world.",
  formats: [
    {
      name: "eBook Edition (PDF / ePub)",
      inr: 349,
      usd: 14.99,
      description: "Instant digital access formatted for e-readers, tablets, and phones.",
    },
    {
      name: "Collector's Print Edition",
      inr: 1449,
      usd: 24.99,
      description: "Premium tactile hardcover publication with bespoke typography, creamy archival paper, and ribbon bookmark.",
    },
  ],
  keyThemes: [
    "The Architecture of Solitude — Distinguishing productive solitude from painful isolation.",
    "Quieting the Internalised Noise — Unhooking from digital hyper-vigilance and comparison.",
    "The Neutral Compass — Making high-stakes life decisions from a state of emotional equilibrium.",
    "The Art of Returning — How to regain your centre within minutes when life destabilizes you.",
  ],
  audience: "Ideal for thoughtful thinkers, founders, creators, and individuals navigating intense transitions seeking a steady anchor.",
};
