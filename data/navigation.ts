// Navigation and Global Site Data — PillowDreamWorks Foundation

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Books",
    href: "/books",
    children: [
      { label: "Books Hub", href: "/books", description: "Curated psychology publication library" },
      { label: "The Psychology Toolkit", href: "/books/psychology-toolkit", description: "80-page flagship workbook" },
      { label: "Finding The Centre", href: "/books/finding-the-centre", description: "eBook and collector print edition" },
      { label: "Complete Bundles", href: "/books/bundles", description: "Special value companion bundles" },
    ],
  },
  {
    label: "Assessments",
    href: "/assessments",
    children: [
      { label: "Assessment Centre", href: "/assessments", description: "16 clinical & projective instruments" },
      { label: "Anxiety & Mood", href: "/assessments?category=anxiety", description: "HAM-A, BDI-II, SIAS-6" },
      { label: "Personality & Projective", href: "/assessments?category=personality", description: "16PF, Rorschach, TAT, MMPI" },
      { label: "Cognitive & Neuro", href: "/assessments?category=cognitive", description: "WAIS-IV, Bender-II" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "1-on-1 Counselling", href: "/services#counselling", description: "50-minute clinical sessions" },
      { label: "Crisis Stabilization", href: "/services#crisis", description: "Immediate de-escalation calls" },
      { label: "CentreLine Support", href: "/services#centreline", description: "Ongoing grounded check-ins" },
      { label: "Graphotherapy", href: "/services#graphology", description: "Handwriting & stroke realignment" },
    ],
  },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "PsychSnaps", href: "/learn#psychsnaps", description: "Bite-sized visual psychology breakdowns" },
      { label: "Articles", href: "/learn#articles", description: "Deep-dive essays on human nature" },
      { label: "Founder Notes", href: "/learn#founder-notes", description: "Reflections by Manish Garg" },
      { label: "Resources", href: "/learn#resources", description: "Free guides, templates, and tools" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const EMERGENCY_INFO = {
  bannerText: "In severe emotional distress or danger?",
  actionText: "Get Immediate Crisis Support",
  href: "/services#crisis",
  phoneNumbers: [
    { country: "India (Tele-MANAS)", number: "14416 / 1800-891-4416" },
    { country: "India (KIRAN)", number: "1800-599-0019" },
    { country: "US & Canada (Crisis Lifeline)", number: "988" },
    { country: "UK (Emergency / NHS)", number: "111 / 999" },
    { country: "International Crisis", number: "befrienders.org" },
  ],
};

export const FOUNDER_CONTACT = {
  name: "Manish Garg",
  title: "Founder & Lead Psychologist",
  email: "mgmanishgarg3@gmail.com",
  linkedin: "https://www.linkedin.com/in/manish-garg-11757b238",
  instagram: "https://instagram.com/manish082_1",
  whatsapp: "https://wa.me/919999999999",
  tagline: "Calm on the surface. Ambition underneath.",
};

export const LEGAL_ROUTES = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Refund & Cancellation", href: "/legal/refund" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Cookie Policy", href: "/legal/cookie" },
];
