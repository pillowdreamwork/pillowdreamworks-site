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
  /** Optional follow-up link rendered under the answer. */
  link?: { href: string; label: string };
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
        question: 'What is Finding The Centre?',
        answer:
          'It is a therapeutic coloring and reflection workbook organised around ten themes for mindfulness, emotional wellbeing and self-reflection. The cover describes it as intended for children, teens and adults.',
      },
      {
        question: 'What makes it different from The Psychology Toolkit?',
        answer:
          'Finding The Centre focuses on coloring, reflection and a more creative way of engaging with wellbeing themes. The Psychology Toolkit is organised around learning about psychological concepts and practising structured self-reflection.',
      },
      {
        question: 'Is it only for children?',
        answer:
          'No. Its cover identifies children, teens and adults as intended audiences. Adults can use it independently; children should use it in an age-appropriate way, with suitable adult support where needed.',
      },
      {
        question: 'Do I need to know how to draw or color?',
        answer:
          'No. The workbook is intended for coloring and reflection, not artistic performance. You do not need to treat the activity as a test or aim for a perfect result.',
      },
      {
        question: 'Can I use it when I feel stressed or overwhelmed?',
        answer:
          'You may find the coloring and reflection activities a useful way to pause and reflect. Individual responses vary, and the workbook is not an emergency intervention or a substitute for professional care. In a crisis, contact a national helpline such as Tele-MANAS 14416 (India) or 988 (United States) instead.',
      },
      {
        question: 'Can a parent, teacher or counsellor use it with someone else?',
        answer:
          'It may be used as a guided activity where appropriate, subject to the workbook\'s licence and the person\'s comfort. It is not presented as a validated clinical intervention — treat it as a guided creative activity, not a treatment.',
      },
      {
        question: 'Can this replace professional therapy?',
        answer:
          'No. This book is a supportive, creative resource. It is not intended to replace professional psychological assessment, diagnosis, or treatment.',
      },
      {
        question: 'Is it available digitally or in print?',
        answer:
          'The product range includes an eBook and a paperback. Check the selected product option carefully before ordering, because format and delivery differ.',
      },
      {
        question: 'Will I receive a physical book if I buy the eBook?',
        answer:
          'No. The eBook and paperback are different product formats. Select the paperback if you want a physical copy.',
      },
      {
        question: 'Can I use the workbook in a classroom or professional practice?',
        answer:
          'Personal purchase does not automatically grant permission for mass photocopying, redistribution or commercial use. Check the applicable licence and seek permission where required.',
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
        question: 'What exactly is The Psychology Toolkit?',
        answer:
          'It is an educational workbook designed to help readers explore psychological concepts, understand their thinking and emotions, and practise self-reflection through structured material and exercises. It is Book 1 of the Psychology Playbook Series.',
      },
      {
        question: 'Who is it for?',
        answer:
          'It is intended for readers interested in psychology, self-awareness and personal development. It is educational material, not a replacement for individual psychological assessment or therapy.',
      },
      {
        question: 'What will I learn from it?',
        answer:
          'The workbook covers six areas: understanding your mind; thoughts and mindset; anxiety and stress; relationships and boundaries; habits and personal growth; and resources for continuing your learning.',
      },
      {
        question: 'Is it a textbook or a practical workbook?',
        answer:
          'It is a structured learning workbook with lessons, worksheets and reflection exercises. Review the sample pages on this site to decide whether its explanations and exercises fit your learning style.',
      },
      {
        question: 'Can it help me manage anxiety?',
        answer:
          'It includes educational material and practical exercises related to anxiety and stress. People differ in what they find helpful, and the workbook does not diagnose or treat a mental health condition.',
      },
      {
        question: 'Do I need a psychology background?',
        answer:
          'No. No specialist background is assumed; the workbook is written for general readers. Review the sample pages to see whether the language and depth suit you.',
      },
      {
        question: 'Is it suitable for psychology students or aspiring counsellors?',
        answer:
          'It may be useful as supplementary learning and reflection material. It is not professional certification, clinical training, or a substitute for supervised practice.',
      },
      {
        question: 'What format will I receive?',
        answer:
          'The current product is a digital PDF (80 pages), published at ₹1,499 / $24.99. Checkout is being prepared — purchases are not available yet, and the product page will confirm the final file format and delivery method before buying becomes possible.',
      },
      {
        question: 'Can I print it?',
        answer:
          'It is supplied as an A4 printable PDF. Printing depends on the supplied file and your printer settings; the licence that comes with the product governs what printing is permitted.',
      },
      {
        question: 'Can I share the PDF with friends or students?',
        answer:
          'Not automatically. A purchase does not grant redistribution or commercial-use rights. Refer to the licence supplied with the product.',
      },
      {
        question: 'Is this workbook a substitute for clinical diagnosis?',
        answer:
          'No. The Psychology Toolkit is designed for self-reflection and personal development. It does not provide clinical diagnoses or medical advice.',
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
  faqs: findingTheCentre.faqs,
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

/**
 * Shared buying FAQ set: choosing between the books, bundle contents,
 * delivery, refunds, international availability and currency handling.
 * Answers state only what this site actually does today.
 */
export const BOOK_BUYING_FAQS: BookFaq[] = [
  {
    question: 'Which book should I choose first?',
    answer:
      'Choose The Psychology Toolkit if you want structured learning about psychological concepts and personal development. Choose Finding The Centre if you prefer a coloring-and-reflection approach. You can also review the sample pages and product descriptions on this site before deciding.',
  },
  {
    question: 'What is included in the bundle?',
    answer:
      'The bundle is both digital products: the Finding The Centre eBook and The Psychology Toolkit digital PDF, for ₹1,799 / $29.99. It does not include the paperback unless a product page explicitly says otherwise.',
  },
  {
    question: 'How do I receive a digital purchase?',
    answer:
      'Checkout is being prepared. Purchases are not available yet, so no delivery workflow has been finalised or promised. When checkout opens, the product page will state the exact delivery method before you pay. Until then you can enquire through the contact page.',
  },
  {
    question: 'What if my payment succeeds but I do not receive the book?',
    answer:
      'No payments are taken on this site yet, so this cannot happen today. After checkout opens, contact support through the verified contact route with your order reference — never send full card details.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Refunds are handled according to the published policy. Eligibility depends on the product, the circumstances and applicable consumer law; the website does not promise or deny a refund outside that policy.',
    link: { href: '/legal/refund', label: 'Read the Refund & Cancellation Policy' },
  },
  {
    question: 'Can I buy from outside India?',
    answer:
      'Published prices are shown in INR (India) and USD (Global). Checkout is not live yet, so international availability is not confirmed; the site will display only the countries, currencies and payment methods that are genuinely supported once checkout opens.',
  },
  {
    question: 'Are the prices in different currencies automatically converted?',
    answer:
      'No live conversion happens. INR and USD figures are separate published prices for each market — for example, the bundle is ₹1,799 in India and $29.99 globally. The amount charged at checkout must be clear before payment.',
  },
];

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
