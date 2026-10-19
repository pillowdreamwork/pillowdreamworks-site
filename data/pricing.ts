// Centralized Pricing Architecture — Single Source of Truth for PillowDreamWorks Foundation
// This is the ONLY authoritative pricing file. Pages and components must read from here
// instead of hardcoding amounts. All campaign/discount logic has been removed.

const formatINR = (value: number): string => `₹${value.toLocaleString("en-IN")}`;
const formatUSD = (value: number): string =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/* ------------------------------------------------------------------ */
/* 1. BOOKS                                                            */
/* ------------------------------------------------------------------ */

export const BOOKS_PRICING = {
  toolkit: {
    title: "The Psychology Toolkit",
    subtitle: "80-Page Master Workbook & Reflection System (A4 Printable PDF)",
    inr: 1499,
    usd: 24.99,
    formattedInr: formatINR(1499),
    formattedUsd: formatUSD(24.99),
  },
  findingTheCentre: {
    title: "Finding The Centre",
    subtitle: "A therapeutic coloring & reflection workbook",
    ebook: {
      inr: 749,
      usd: 12.49,
      formattedInr: formatINR(749),
      formattedUsd: formatUSD(12.49),
    },
    print: {
      inr: 1499,
      usd: 24.99,
      formattedInr: formatINR(1499),
      formattedUsd: formatUSD(24.99),
    },
  },
  bundle: {
    title: "Complete Psychology & Inner Work Bundle",
    subtitle: "The Psychology Toolkit + Finding The Centre (eBook Edition)",
    inr: 1799,
    usd: 29.99,
    formattedInr: formatINR(1799),
    formattedUsd: formatUSD(29.99),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 2. PAID ASSESSMENTS — 16 practitioner-administered batteries        */
/*    Every instrument runs for a 60-minute session.                   */
/* ------------------------------------------------------------------ */

export type AssessmentCategory =
  | "Anxiety & Mood"
  | "Personality & Projective"
  | "Cognitive & Neuro"
  | "Clinical Diagnostics";

export interface PaidAssessmentPrice {
  id: string;
  code: string;
  name: string;
  category: AssessmentCategory;
  inr: number;
  usd: number;
  description: string;
  targetAge: string;
}

/** Authoritative price + metadata registry for every paid assessment. */
export const PAID_ASSESSMENTS: PaidAssessmentPrice[] = [
  {
    id: "ham-a",
    code: "HAM-A",
    name: "Hamilton Anxiety Rating Scale",
    category: "Anxiety & Mood",
    inr: 799,
    usd: 69,
    description:
      "Practitioner-administered rating scale covering both psychic anxiety (mental tension and worry) and somatic anxiety (physical sensations).",
    targetAge: "Adults (18+)",
  },
  {
    id: "bdi-ii",
    code: "BDI-II",
    name: "Beck Depression Inventory-II",
    category: "Anxiety & Mood",
    inr: 799,
    usd: 69,
    description:
      "21-item inventory reviewed with a practitioner, exploring attitudes and symptoms commonly associated with low mood over the preceding two weeks.",
    targetAge: "Adolescents & Adults (13+)",
  },
  {
    id: "ssct",
    code: "SSCT",
    name: "Sacks Sentence Completion Test",
    category: "Personality & Projective",
    inr: 1499,
    usd: 99,
    description:
      "Semi-structured projective exercise reviewing four life domains: Family, Relationships, Interpersonal, and Self-Concept.",
    targetAge: "Teens & Adults",
  },
  {
    id: "htp",
    code: "HTP",
    name: "House-Tree-Person Projective Technique",
    category: "Personality & Projective",
    inr: 1499,
    usd: 99,
    description:
      "Expressive drawing exercise reviewed collaboratively to reflect self-perception, environmental grounding, and family dynamics.",
    targetAge: "All ages",
  },
  {
    id: "hfdt",
    code: "HFDT",
    name: "Human Figure Drawing Test",
    category: "Personality & Projective",
    inr: 1499,
    usd: 99,
    description:
      "Drawing-based screening exercise reviewed with a practitioner to explore body image, emotional expression, and developmental themes.",
    targetAge: "Children & Adults",
  },
  {
    id: "caars",
    code: "CAARS",
    name: "Conners' Adult ADHD Rating Scales",
    category: "Clinical Diagnostics",
    inr: 1899,
    usd: 129,
    description:
      "Practitioner-reviewed rating scale examining attention, impulsivity, and executive functioning patterns in adults.",
    targetAge: "Adults (18+)",
  },
  {
    id: "panss",
    code: "PANSS",
    name: "Positive and Negative Syndrome Scale",
    category: "Clinical Diagnostics",
    inr: 2199,
    usd: 149,
    description:
      "Clinician-rated scale reviewed with a practitioner, covering symptom severity, thought structure, and general psychopathology.",
    targetAge: "Adults (18+)",
  },
  {
    id: "bender-ii",
    code: "Bender II",
    name: "Bender Visual-Motor Gestalt Test II",
    category: "Cognitive & Neuro",
    inr: 2299,
    usd: 149,
    description:
      "Practitioner-scored copying task reviewing visual-motor integration and perceptual functioning.",
    targetAge: "Ages 4 and above",
  },
  {
    id: "cat",
    code: "CAT",
    name: "Children's Apperception Test",
    category: "Personality & Projective",
    inr: 2499,
    usd: 199,
    description:
      "Child projective exercise using story-telling with animal and human figures, reviewed with a practitioner to explore emotional themes.",
    targetAge: "Children (3–10)",
  },
  {
    id: "16pf",
    code: "16PF",
    name: "Sixteen Personality Factor Questionnaire",
    category: "Personality & Projective",
    inr: 2999,
    usd: 199,
    description:
      "Practitioner-reviewed questionnaire covering 16 primary traits and the global factors used to describe personality style.",
    targetAge: "Adults (16+)",
  },
  {
    id: "tat",
    code: "TAT",
    name: "Thematic Apperception Test",
    category: "Personality & Projective",
    inr: 2999,
    usd: 249,
    description:
      "Narrative projective technique reviewed with a practitioner to explore drives, emotional conflicts, and interpersonal themes.",
    targetAge: "Adolescents & Adults",
  },
  {
    id: "caps-5",
    code: "CAPS-5",
    name: "Clinician-Administered PTSD Scale for DSM-5",
    category: "Clinical Diagnostics",
    inr: 2999,
    usd: 299,
    description:
      "Structured practitioner-administered interview reviewing trauma-related symptoms, frequency, and functional impact.",
    targetAge: "Adults (18+)",
  },
  {
    id: "rorschach",
    code: "ROR",
    name: "Rorschach Inkblot Assessment",
    category: "Personality & Projective",
    inr: 3499,
    usd: 349,
    description:
      "Projective instrument reviewed with a trained practitioner, exploring perceptual style, emotional regulation, and personality structure.",
    targetAge: "Adults & Adolescents",
  },
  {
    id: "mmpi",
    code: "MMPI",
    name: "Minnesota Multiphasic Personality Inventory",
    category: "Clinical Diagnostics",
    inr: 3999,
    usd: 399,
    description:
      "Broad-band clinical inventory reviewed with a practitioner, covering personality patterns, distress, and validity indicators.",
    targetAge: "Adults (18+)",
  },
  {
    id: "wais-iv",
    code: "WAIS-IV / MISIC",
    name: "Wechsler Adult Intelligence Scale / MISIC",
    category: "Cognitive & Neuro",
    inr: 4999,
    usd: 499,
    description:
      "Practitioner-administered cognitive battery covering verbal comprehension, perceptual reasoning, working memory, and processing speed.",
    targetAge: "Ages 16–90",
  },
  {
    id: "ados-2",
    code: "ADOS-2",
    name: "Autism Diagnostic Observation Schedule-2",
    category: "Clinical Diagnostics",
    inr: 4999,
    usd: 549,
    description:
      "Standardized practitioner-administered observation protocol reviewing social communication, interaction, and repetitive behaviours.",
    targetAge: "Toddlers to Adults",
  },
];

/** Keyed lookup so other data files can reuse the single source of truth. */
export const PAID_ASSESSMENT_PRICES: Record<string, { inr: number; usd: number }> =
  PAID_ASSESSMENTS.reduce(
    (acc, item) => {
      acc[item.id] = { inr: item.inr, usd: item.usd };
      return acc;
    },
    {} as Record<string, { inr: number; usd: number }>
  );

export interface AssessmentPricingItem {
  id: string;
  name: string;
  code: string;
  category: AssessmentCategory;
  inr: number;
  usd: number;
  formattedInr: string;
  formattedUsd: string;
  description: string;
  duration: string;
  targetAge: string;
  administration: "Practitioner-Administered";
  isPaid: true;
}

export const ASSESSMENT_DURATION = "60 minutes";

export const ASSESSMENTS_CATALOG: AssessmentPricingItem[] = PAID_ASSESSMENTS.map(
  (item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    category: item.category,
    inr: item.inr,
    usd: item.usd,
    formattedInr: formatINR(item.inr),
    formattedUsd: formatUSD(item.usd),
    description: item.description,
    duration: ASSESSMENT_DURATION,
    targetAge: item.targetAge,
    administration: "Practitioner-Administered",
    isPaid: true,
  })
);

/* ------------------------------------------------------------------ */
/* 3. SERVICES & COURSES                                               */
/*    Names, IDs, categories, PUBLIC visibility, payment models and    */
/*    durations are fixed. Flexible duration is false for every item.  */
/* ------------------------------------------------------------------ */

export type PaymentModel = "BOOKING_PAYMENT" | "PACKAGE_PURCHASE" | "DIRECT_PURCHASE";

export interface ServicePrice {
  id: string;
  title: string;
  category: string;
  model: PaymentModel;
  durationMinutes: number;
  flexibleDuration: false;
  visibility: "PUBLIC";
  description: string;
  inr: number;
  usd: number;
  formattedInr: string;
  formattedUsd: string;
}

export const SERVICES_PRICING = {
  counselling: {
    singleSession: {
      id: "COUNSELLING-01",
      title: "Counselling Session (50 min)",
      category: "Counselling",
      model: "BOOKING_PAYMENT",
      durationMinutes: 50,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Dedicated one-on-one consultation for emotional regulation, anxiety, and personal growth.",
      inr: 1499,
      usd: 18,
      formattedInr: formatINR(1499),
      formattedUsd: formatUSD(18),
    },
    package4: {
      id: "COUNSELLING-PKG4",
      title: "Counselling Package of 4",
      category: "Counselling Packages",
      model: "PACKAGE_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "A structured sequence of four sessions for sustained therapeutic alignment and coping skills.",
      inr: 5996,
      usd: 72,
      formattedInr: formatINR(5996),
      formattedUsd: formatUSD(72),
    },
    package8: {
      id: "COUNSELLING-PKG8",
      title: "Counselling Package of 8",
      category: "Counselling Packages",
      model: "PACKAGE_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Eight focused sessions for deeper, longer-term psychological guidance.",
      inr: 11992,
      usd: 144,
      formattedInr: formatINR(11992),
      formattedUsd: formatUSD(144),
    },
  },
  crisis: {
    call: {
      id: "CRISIS-01",
      title: "Crisis Stabilisation Call (40 min)",
      category: "Crisis Support",
      model: "BOOKING_PAYMENT",
      durationMinutes: 40,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "A scheduled, non-emergency support call focused on grounding, de-escalation, and stabilisation. This is not an emergency or crisis-response service. If you are in immediate danger, contact your local emergency number or a national helpline listed on this page.",
      inr: 399,
      usd: 5,
      formattedInr: formatINR(399),
      formattedUsd: formatUSD(5),
    },
    centreLine: {
      id: "CENTRELINE-01",
      title: "CentreLine Support (30 min)",
      category: "Support / Session",
      model: "BOOKING_PAYMENT",
      durationMinutes: 30,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Founder-led emotional check-ins and ongoing guidance through a structured session.",
      inr: 299,
      usd: 4,
      formattedInr: formatINR(299),
      formattedUsd: formatUSD(4),
    },
  },
  graphology: {
    basic: {
      id: "GRAPH-BASIC",
      title: "Graphology Basic Reading",
      category: "Graphology Reading",
      model: "DIRECT_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "A written reading covering baseline slant, margin discipline, and core personality tendencies.",
      inr: 399,
      usd: 5,
      formattedInr: formatINR(399),
      formattedUsd: formatUSD(5),
    },
    standard: {
      id: "GRAPH-STANDARD",
      title: "Graphology Standard Reading (25–30 min)",
      category: "Graphology Session",
      model: "BOOKING_PAYMENT",
      durationMinutes: 30,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "A live reading with a full stroke and pressure breakdown and an emotional balance review.",
      inr: 799,
      usd: 10,
      formattedInr: formatINR(799),
      formattedUsd: formatUSD(10),
    },
    deep: {
      id: "GRAPH-DEEP",
      title: "Graphology Deep Reading (45 min)",
      category: "Graphology Session",
      model: "BOOKING_PAYMENT",
      durationMinutes: 45,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "An in-depth stroke analysis paired with targeted handwriting realignment exercises.",
      inr: 1199,
      usd: 15,
      formattedInr: formatINR(1199),
      formattedUsd: formatUSD(15),
    },
  },
  courses: {
    crisisCounselling: {
      id: "COURSE-CRISIS",
      title: "Crisis Counselling Course",
      category: "Course",
      model: "DIRECT_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Self-paced curriculum covering de-escalation, safety planning, and emotional stabilisation.",
      inr: 999,
      usd: 12,
      formattedInr: formatINR(999),
      formattedUsd: formatUSD(12),
    },
    cognitiveCounselling: {
      id: "COURSE-COGNITIVE",
      title: "Cognitive Counselling Course",
      category: "Course",
      model: "DIRECT_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Self-paced curriculum covering cognitive distortions, belief work, and behavioural frameworks.",
      inr: 999,
      usd: 12,
      formattedInr: formatINR(999),
      formattedUsd: formatUSD(12),
    },
    bundle: {
      id: "COURSE-BUNDLE",
      title: "Complete Course Bundle",
      category: "Course",
      model: "DIRECT_PURCHASE",
      durationMinutes: 0,
      flexibleDuration: false,
      visibility: "PUBLIC",
      description:
        "Both the Crisis and Cognitive counselling courses together with all workbook resources.",
      inr: 1499,
      usd: 18,
      formattedInr: formatINR(1499),
      formattedUsd: formatUSD(18),
    },
  },
} as const;

/** Flat list of every service/course entry, in the fixed published order. */
export const SERVICES_REGISTRY: ServicePrice[] = [
  SERVICES_PRICING.counselling.singleSession,
  SERVICES_PRICING.counselling.package4,
  SERVICES_PRICING.counselling.package8,
  SERVICES_PRICING.crisis.call,
  SERVICES_PRICING.crisis.centreLine,
  SERVICES_PRICING.graphology.basic,
  SERVICES_PRICING.graphology.standard,
  SERVICES_PRICING.graphology.deep,
  SERVICES_PRICING.courses.crisisCounselling,
  SERVICES_PRICING.courses.cognitiveCounselling,
  SERVICES_PRICING.courses.bundle,
];

/* ------------------------------------------------------------------ */
/* 4. CHECKOUT STATUS — one honest, shared statement                   */
/* ------------------------------------------------------------------ */

/**
 * No live payment gateway is wired up yet. Until a verified checkout exists,
 * every purchase action must surface this exact notice rather than imply a
 * completed transaction.
 */
export const CHECKOUT_NOTICE =
  "Checkout is being prepared. Purchases are not available yet.";

export const CHECKOUT_AVAILABLE = false;

export function formattedPrice(inr: number, usd: number): string {
  return `${formatINR(inr)} / ${formatUSD(usd)}`;
}
