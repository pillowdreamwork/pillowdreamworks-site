export interface BookFormat {
  id: string;
  type: string;
  priceINR: number;
  priceUSD: number;
  /** Only wording that follows directly from the format itself. */
  description?: string;
  /** Set only when an approved checkout destination exists. */
  checkoutUrl?: string;
}

export interface BookChapter {
  id: string;
  /** "01", "02" … or a word such as "Resources" for the closing section. */
  label: string;
  numbered: boolean;
  title: string;
  subtitle?: string;
  pages?: string;
  image?: string;
  imageAlt?: string;
  samplePages?: BookScrollItem[];
  keyContents?: string[];
}

export interface BookScrollItem {
  src: string;
  /** Neutral label derived from the asset, never invented copy. */
  caption: string;
}

export interface BookFact {
  label: string;
  value: string;
}

export interface BookFaq {
  question: string;
  answer: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  cover: string;
  coverSecondary?: string;
  /** Text printed on the cover, reproduced verbatim. */
  coverText?: string[];
  pricing: {
    currency: 'INR' | 'USD';
    formats: BookFormat[];
  };
  scrollJourney: BookScrollItem[];
  chapters: BookChapter[];
  detailsImages: { title: string; src: string }[];
  facts: BookFact[];
  faqs: BookFaq[];
  personality: 'toolkit' | 'centre';
}

export const BOOKS: Book[] = [
  {
    id: 'finding-the-centre',
    title: 'Finding The Centre',
    subtitle: 'A Therapeutic Coloring & Reflection Workbook',
    author: 'Manish Garg',
    description:
      'A gentle guide to a calmer, kinder you. Combining beautiful illustrations with reflective prompts to encourage emotional wellbeing.',
    cover: '/images/books/finding-centre/ftc-welcome.jpg',
    coverSecondary: '/images/books/finding-centre/ftc-cover-cream.png',
    coverText: [
      'for Children, Teens & Adults',
      '10 Themes for Mindfulness, Emotional Wellbeing & Self-Reflection',
    ],
    pricing: {
      currency: 'INR',
      formats: [
        { id: 'ebook', type: 'eBook', priceINR: 749, priceUSD: 12.49, description: 'Digital edition.' },
        { id: 'paperback', type: 'Paperback', priceINR: 1499, priceUSD: 24.99, description: 'Printed edition.' },
      ],
    },
    scrollJourney: [
      { src: '/images/books/finding-centre/ftc-welcome.png', caption: 'Welcome' },
      { src: '/images/books/finding-centre/ftc-about.png', caption: 'About This Book' },
      { src: '/images/books/finding-centre/ftc-how-it-works.png', caption: 'How This Book Works' },
      { src: '/images/books/finding-centre/ftc-everyday-life.png', caption: 'Using This Book in Everyday Life' },
      { src: '/images/books/finding-centre/ftc-therapeutic-settings.png', caption: 'Using This Book in Therapeutic Settings' },
    ],
    chapters: [
      { id: 'ftc-1', label: '01', numbered: true, title: 'The Safe Heart', image: '/images/books/finding-centre/ftc-safe-heart.png', imageAlt: 'The Safe Heart page from Finding The Centre' },
      { id: 'ftc-2', label: '02', numbered: true, title: 'Home Inside Me', image: '/images/books/finding-centre/ftc-home-inside.png', imageAlt: 'Home Inside Me page from Finding The Centre' },
      { id: 'ftc-3', label: '03', numbered: true, title: 'The Core and the Contour', image: '/images/books/finding-centre/ftc-core-contour.png', imageAlt: 'The Core and the Contour page from Finding The Centre' },
    ],
    detailsImages: [
      { title: 'Cream cover', src: '/images/books/finding-centre/ftc-cover-cream.png' },
    ],
    facts: [
      { label: 'Author', value: 'Manish Garg' },
      { label: 'Editions', value: 'eBook · Paperback' },
      { label: 'On the cover', value: 'for Children, Teens & Adults — 10 Themes for Mindfulness, Emotional Wellbeing & Self-Reflection' },
    ],
    faqs: [
      {
        question: 'Who is Finding The Centre for?',
        answer:
          'The book is presented for Children, Teens & Adults. It is designed as a coloring and reflection workbook for personal exploration and emotional wellbeing.',
      },
      {
        question: 'Do I need artistic experience?',
        answer:
          'No particular artistic experience is presented as a requirement. The workbook combines coloring with reflection, allowing the reader to engage with the pages at their own pace.',
      },
      {
        question: 'Can this replace professional therapy?',
        answer:
          'No. This book is a supportive, creative resource. It is not intended to replace professional psychological assessment, diagnosis, or treatment.',
      },
      {
        question: 'Which editions are available?',
        answer: 'Finding The Centre is available as an eBook and as a Paperback.',
      },
    ],
    personality: 'centre',
  },
  {
    id: 'psychology-toolkit',
    title: 'The Psychology Toolkit',
    subtitle: 'Book 1: The Psychology Playbook',
    author: 'Manish Garg',
    description:
      'Practical tools for emotional wellbeing. Bringing together psychology, habits, and mindfulness for everyday resilience.',
    cover: '/images/books/psychology-toolkit/pt-cover.png',
    pricing: {
      currency: 'INR',
      formats: [
        { id: 'digital', type: 'Digital PDF', priceINR: 1499, priceUSD: 24.99, description: 'Delivered as a digital PDF.' },
      ],
    },
    scrollJourney: [
      { src: '/images/books/psychology-toolkit/about/pt-about-workbook.png', caption: 'About This Workbook' },
      { src: '/images/books/psychology-toolkit/about/pt-contents.png', caption: 'Table of Contents' },
      { src: '/images/books/psychology-toolkit/about/pt-founder.png', caption: 'Selected publication page' },
    ],
    chapters: [
      {
        id: 'pt-1', label: '01', numbered: true,
        title: 'Understanding Your Mind',
        subtitle: 'Emotions, self-awareness & emotional regulation',
        pages: '6–20',
        image: '/images/books/psychology-toolkit/chapter-1/pt-ch1-opener.png',
        imageAlt: 'Chapter 1 opener page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/chapter-1/pt-ch1-lesson1.png', caption: 'Chapter 1 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-1/pt-ch1-lesson5.png', caption: 'Chapter 1 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-1/pt-ch1-worksheet.png', caption: 'Chapter 1 · Worksheet' },
        ],
        keyContents: ['Chapter Opener', 'What Is Psychology?', 'The Brain & Behaviour', 'Understanding Emotions', 'Why We Feel Emotions', 'Triggers • Exercises • Review'],
      },
      {
        id: 'pt-2', label: '02', numbered: true,
        title: 'Thoughts & Mindset',
        subtitle: 'Recognising thinking patterns & building resilience',
        pages: '21–35',
        image: '/images/books/psychology-toolkit/chapter-2/pt-ch2-opener.png',
        imageAlt: 'Chapter 2 opener page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/chapter-2/pt-ch2-lesson1.png', caption: 'Chapter 2 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-2/pt-ch2-lesson5.png', caption: 'Chapter 2 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-2/pt-ch2-worksheet.png', caption: 'Chapter 2 · Worksheet' },
        ],
        keyContents: ['Chapter Opener', 'Understanding Thoughts', 'Cognitive Distortions', 'Reframing Your Thoughts', 'Exercises • Reflection • Summary'],
      },
      {
        id: 'pt-3', label: '03', numbered: true,
        title: 'Anxiety & Stress',
        subtitle: 'Practical tools for emotional regulation',
        pages: '36–50',
        image: '/images/books/psychology-toolkit/chapter-3/pt-ch3-opener.png',
        imageAlt: 'Chapter 3 opener page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/chapter-3/pt-ch3-lesson1.png', caption: 'Chapter 3 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-3/pt-ch3-lesson5.png', caption: 'Chapter 3 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-3/pt-ch3-worksheet.png', caption: 'Chapter 3 · Worksheet' },
        ],
        keyContents: ['Chapter Opener', 'Understanding Anxiety', 'The Stress Response', 'Calming Your Nervous System', 'Coping Strategies', 'Worksheets • Tools • Review'],
      },
      {
        id: 'pt-4', label: '04', numbered: true,
        title: 'Relationships & Boundaries',
        subtitle: 'Building healthier connections',
        pages: '51–65',
        image: '/images/books/psychology-toolkit/chapter-4/pt-ch4-opener.png',
        imageAlt: 'Chapter 4 opener page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/chapter-4/pt-ch4-lesson1.png', caption: 'Chapter 4 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-4/pt-ch4-lesson5.png', caption: 'Chapter 4 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-4/pt-ch4-worksheet.png', caption: 'Chapter 4 · Worksheet' },
        ],
        keyContents: ['Chapter Opener', 'Healthy vs Unhealthy Relationships', 'Setting & Maintaining Boundaries', 'Communication Skills', 'Self-Respect & Saying No', 'Exercises • Support Map • Review'],
      },
      {
        id: 'pt-5', label: '05', numbered: true,
        title: 'Habits & Personal Growth',
        subtitle: 'Turning awareness into daily action',
        pages: '66–75',
        image: '/images/books/psychology-toolkit/chapter-5/pt-ch5-opener.png',
        imageAlt: 'Chapter 5 opener page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/chapter-5/pt-ch5-lesson1.png', caption: 'Chapter 5 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-5/pt-ch5-lesson5.png', caption: 'Chapter 5 · Lesson page' },
          { src: '/images/books/psychology-toolkit/chapter-5/pt-ch5-worksheet.png', caption: 'Chapter 5 · Worksheet' },
        ],
        keyContents: ['Chapter Opener', 'The Science of Habits', 'Building Positive Habits', 'Values & Goal Setting', 'Creating Your Routine', 'Habit Tracker • Exercises • Future You'],
      },
      {
        id: 'pt-6', label: 'Resources', numbered: false,
        title: 'Resources & Closing',
        subtitle: 'Continue your journey beyond this workbook',
        pages: '76–80',
        image: '/images/books/psychology-toolkit/closing/pt-final-reflection.png',
        imageAlt: 'Final reflection page from The Psychology Toolkit',
        samplePages: [
          { src: '/images/books/psychology-toolkit/closing/pt-resources.png', caption: 'Resources' },
          { src: '/images/books/psychology-toolkit/closing/pt-thank-you.png', caption: 'Thank You' },
        ],
        keyContents: ['Recommended Books & Resources', 'Psychology Tools Index', '30-Day Progress Review', 'Final Reflection & Commitment', 'Thank You • Foundation Resources'],
      },
    ],
    detailsImages: [],
    facts: [
      { label: 'Author', value: 'Manish Garg' },
      { label: 'Format', value: 'Digital PDF' },
      { label: 'Structure', value: 'Five chapters, followed by Resources & Closing' },
    ],
    faqs: [
      {
        question: 'What does the workbook cover?',
        answer:
          'Five chapters — Understanding Your Mind, Thoughts & Mindset, Anxiety & Stress, Relationships & Boundaries, and Habits & Personal Growth — followed by a Resources & Closing section.',
      },
      {
        question: 'Is this workbook a substitute for clinical diagnosis?',
        answer:
          'No. The Psychology Toolkit is designed for self-reflection and personal development. It does not provide clinical diagnoses or medical advice.',
      },
      {
        question: 'What format is the workbook delivered in?',
        answer: 'It is delivered as a digital PDF.',
      },
    ],
    personality: 'toolkit',
  },
];

const findingTheCentre = BOOKS.find((book) => book.id === 'finding-the-centre');
const psychologyToolkit = BOOKS.find((book) => book.id === 'psychology-toolkit');

if (!findingTheCentre || !psychologyToolkit) {
  throw new Error('The Books catalog must include both published books.');
}

export const FINDING_THE_CENTRE = {
  id: findingTheCentre.id,
  title: findingTheCentre.title,
  tagline: findingTheCentre.subtitle,
  overview: findingTheCentre.description,
  keyThemes: findingTheCentre.chapters.map((chapter) => chapter.title),
  audience: 'Children, Teens & Adults',
};

export const PSYCHOLOGY_TOOLKIT = {
  id: psychologyToolkit.id,
  title: psychologyToolkit.title,
  tagline: psychologyToolkit.subtitle,
  overview: psychologyToolkit.description,
  journey: psychologyToolkit.chapters.map((chapter) => ({
    step: chapter.label,
    label: chapter.title,
    description: chapter.subtitle ?? '',
  })),
  chapters: psychologyToolkit.chapters
    .filter((chapter) => chapter.numbered)
    .map((chapter) => ({
      number: chapter.label,
      title: chapter.title,
      tagline: chapter.subtitle ?? '',
      description: chapter.subtitle ?? '',
      exercises: chapter.keyContents ?? [],
      keyTakeaway: chapter.subtitle ?? '',
    })),
  audiences: [] as { title: string; desc: string }[],
  faqs: psychologyToolkit.faqs.map((faq) => ({
    q: faq.question,
    a: faq.answer,
  })),
};

export const BUNDLE_PRICING = {
  currency: 'INR' as const,
  bundlePriceINR: 1799,
  bundlePriceUSD: 29.99,
  includes: ['Finding The Centre eBook', 'The Psychology Toolkit Digital PDF'],
  summary: 'A shared digital collection bringing both works together.',
  /** Set only when an approved checkout destination exists. */
  checkoutUrl: undefined as string | undefined,
};

export const formatPrice = (priceINR: number, priceUSD: number): string =>
  `₹${priceINR.toLocaleString('en-IN')} / $${priceUSD.toFixed(2)}`;
