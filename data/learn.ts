// Learn Hub & PsychSnaps Data — PillowDreamWorks Foundation

export interface LearnItem {
  id: string;
  category: "PsychSnaps" | "Articles" | "Founder Notes" | "Resources";
  title: string;
  tagline: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
}

export const LEARN_CATALOG: LearnItem[] = [
  {
    id: "anxiety-paradox",
    category: "PsychSnaps",
    title: "The Anxiety Paradox: Why Fighting Panic Intensifies It",
    tagline: "Somatic Physiology & Adrenaline Feedback Loops",
    excerpt: "When you resist anxiety with panic, the amygdala interprets your internal resistance as external danger, releasing more cortisol.",
    content: [
      "The sympathetic nervous system operates on an objective feedback loop. When adrenaline enters the bloodstream, heart rate accelerates and respiration becomes shallow.",
      "If you respond to these sensations with panic ('I must stop this right now!'), your brain interprets your internal terror as confirmation that a real threat is present.",
      "The physiological antidote is somatic neutrality: unclench the jaw, drop the shoulders, and allow the sensations to peak without adding cognitive catastrophizing.",
    ],
    readTime: "3 min read",
    date: "September 2026",
  },
  {
    id: "solitude-vs-isolation",
    category: "Founder Notes",
    title: "The Architecture of Solitude vs. The Pain of Isolation",
    tagline: "By Manish Garg — Reflections on Inner Poise",
    excerpt: "Isolation is the agonizing feeling of being cut off from others. Solitude is the sovereign joy of being grounded with oneself.",
    content: [
      "In an overstimulated culture, quiet has become an emergency rather than a sanctuary. People reach for screens the instant external stimulation subsides.",
      "When we fail to cultivate productive solitude, we become entirely dependent on external validation to regulate our internal emotional states.",
      "Finding The Centre was written to restore this lost practice: turning silence into a grounded workshop of the mind.",
    ],
    readTime: "6 min read",
    date: "September 2026",
  },
  {
    id: "cognitive-distortions",
    category: "Articles",
    title: "The 5 Invisible Cognitive Distortions Distorting Daily Decisions",
    tagline: "Cognitive Behavioral Therapy (CBT) Frameworks",
    excerpt: "How catastrophic projections, unexamined 'should' statements, and emotional reasoning create chronic underlying fatigue.",
    content: [
      "1. All-or-Nothing Framing: Evaluating nuanced life progress in binary black-or-white extremes.",
      "2. Mind Reading: Assuming negative judgments from peers without objective observational evidence.",
      "3. Catastrophizing: Projecting the worst possible outcome and treating it as an inevitable certainty.",
      "4. Emotional Reasoning: Concluding that because you feel anxious, the objective environment must be dangerous.",
      "5. Tyranny of the 'Should': Imposing unrealistic, borrowed expectations on your daily emotional rhythm.",
    ],
    readTime: "7 min read",
    date: "August 2026",
  },
  {
    id: "boundary-scripting",
    category: "PsychSnaps",
    title: "Clean Boundary Scripting: How to Say No Without Over-Explaining",
    tagline: "Interpersonal Effectiveness & Boundary Architecture",
    excerpt: "Over-explaining your boundaries invites negotiation. Clean boundaries are polite, unequivocal, and grounded.",
    content: [
      "When you offer multiple excuses for declining a request, you signal to others that your boundary is conditional and open to negotiation.",
      "Clean boundary formula: 'I won't be able to take that on this week, but thank you for thinking of me.'",
      "Notice the absence of fabricated emergencies. Authentic boundaries protect your capacity so your 'yes' retains true value.",
    ],
    readTime: "4 min read",
    date: "September 2026",
  },
  {
    id: "nervous-system-reset",
    category: "Resources",
    title: "The 3-Minute Vagal Reset: Physiological Sigh Protocol",
    tagline: "Downloadable Somatic Reflection Card",
    excerpt: "A clinically verified breathing pattern that rapidly offloads carbon dioxide and stimulates parasympathetic tone.",
    content: [
      "Step 1: Take two consecutive deep inhales through the nose (one deep, followed by a second sharp top-up inhale).",
      "Step 2: Release a slow, unforced, extended exhale through the mouth.",
      "Step 3: Repeat 3 to 5 times. Notice the involuntary drop in shoulder tension and cardiac deceleration.",
    ],
    readTime: "2 min practice",
    date: "Workbook Companion",
  },
];
