// FAQ set for the public Assessment Centre. Answers describe what this site
// actually does today:
//   - the 161 free screeners score entirely in the browser (no upload, no
//     account, no server-side storage — see app/legal/privacy §1),
//   - answers live in component state only, so leaving the page discards them,
//   - the 16 paid batteries are practitioner-administered 60-minute sessions
//     arranged by enquiry; no automated result is produced for them,
//   - the site is not monitored for emergencies.
// Nothing here may promise practitioner review, storage or diagnostic status
// that the product does not actually provide.

export interface AssessmentFaqItem {
  id: string;
  question: string;
  answer: string;
  /** Optional follow-up link rendered beneath the answer. */
  link?: { href: string; label: string };
}

export const ASSESSMENT_FAQS: AssessmentFaqItem[] = [
  {
    id: 'diagnosis',
    question: 'Is this a diagnosis?',
    answer:
      'No. An automated score on this site is not a diagnosis — not unless a specific service is lawfully provided as a diagnostic service by an appropriately qualified professional. An automated score alone is never a diagnosis. Use these results for reflection, education and pre-consultation screening.',
  },
  {
    id: 'saved',
    question: 'Will my answers be saved?',
    answer:
      'No. For every free screener, your answers and score are calculated locally in your browser and are never transmitted to our servers, stored in an account, or written to disk by this site. Closing or refreshing the page discards them.',
  },
  {
    id: 'visible',
    question: 'Can anyone else see my results?',
    answer:
      'Not unless you choose to share them. Free screener results never leave your browser, so we cannot see them and they are not shared with anyone. If you book a practitioner session you decide what to share; practitioner-administered assessments are carried out with your informed consent, and results are not shared with third parties without your consent except where required by law.',
    link: { href: '/legal/privacy', label: 'Read the Privacy Policy' },
  },
  {
    id: 'stop',
    question: 'Can I stop halfway through?',
    answer:
      'Yes. You can close the assessment or leave the page at any time. Because your answers are held only in this browser tab and are never uploaded, stopping discards them — nothing partial is saved or stored.',
  },
  {
    id: 'retake',
    question: 'Can I retake an assessment?',
    answer:
      'Yes — you may retake any free screener as often as you like. A retake starts from a blank set of answers and previous results are not stored. Use Copy Full Profile or Print Profile on the results view if you want to keep a copy.',
  },
  {
    id: 'disagree',
    question: 'What if I disagree with the result?',
    answer:
      'Automated results are limited: they score your answers against a fixed framework, not your full life context. Treat the result as a prompt for reflection rather than a label. If it does not fit your experience, consider discussing it with a qualified professional.',
    link: { href: '/contact', label: 'Contact us to talk it through' },
  },
  {
    id: 'high-stakes',
    question: 'Can I use results for diagnosis, employment or academic decisions?',
    answer:
      'No. These are self-administered screeners for personal reflection and educational insight. Do not use them, on their own, as the basis for diagnosis, employment, academic, insurance or other high-stakes decisions — those require appropriate professional assessment.',
  },
  {
    id: 'uncomfortable',
    question: 'What happens if an assessment makes me uncomfortable?',
    answer:
      'Pause or stop whenever you need to — you can close the assessment at any time. This website is not continuously monitored and is not an emergency service. If you are in immediate danger or in a mental-health crisis, contact your local emergency number or a national helpline: India — Tele-MANAS 14416; India — Vandrevala Foundation +91 9999 666 555; United States — 988.',
    link: { href: '/services#crisis', label: 'See crisis support information' },
  },
  {
    id: 'catalog-scope',
    question: 'How is the psychological assessment library structured?',
    answer:
      'The PillowDreamWorks library contains over 1,600 validated psychological scales, structured self-inventories, and clinical batteries organized into over 20 focused domains—including Anxiety, Depression, Emotional Regulation, Cognitive Style, Neurodevelopment, Relationships, and Educational Dynamics. Each tool provides immediate structured insights, factor score profiles, and guided reflective questions.',
  },
  {
    id: 'free-vs-paid',
    question: 'What is the difference between a free screener and a clinical battery?',
    answer:
      'Free screeners are self-administered instruments that run entirely and privately in your browser to support self-awareness, personal journaling, and educational clarity. Clinical batteries (e.g., HAM-A, BDI-II, PCL-R) represent practitioner-administered diagnostic frameworks that include comprehensive clinical interviews, observational scoring, and professional consultation with a qualified psychologist.',
  },
  {
    id: 'youth-assessments',
    question: 'Are there assessments tailored for children and adolescents?',
    answer:
      'Yes. Instruments in the Children, Youth, and Education domains include age-appropriate self-reports as well as observer/parent/teacher-rated scales (e.g., SCAS, RCADS, DSRS-C). For younger participants, guided completion alongside a parent, educator, or practitioner is strongly recommended.',
  },
  {
    id: 'saving-results',
    question: 'How can I save or print my completed assessment summary?',
    answer:
      'When you complete any screener, the results dashboard provides immediate "Copy Summary" and "Print Profile" options. Because results are never stored on our servers to protect your privacy, we recommend saving or printing your summary before closing the browser tab if you wish to share it with your therapist or doctor.',
  },
  {
    id: 'delete',
    question: 'How do I delete my data?',
    answer:
      'Free screener answers never leave your browser, so there is nothing about them stored with us to delete. If you have sent us personal details — for example through the contact or booking enquiry form — email mgmanishgarg3@gmail.com with the subject line "Privacy Request" to request access, correction or deletion; requests are acknowledged within 30 days. See the Privacy Policy for the details and any legal or operational limits.',
    link: { href: '/legal/privacy', label: 'Read the Privacy Policy' },
  },
  {
    id: 'practitioner',
    question: 'Are paid assessments reviewed by a practitioner?',
    answer:
      'Yes. Practitioner batteries are arranged by direct clinical consultation. During these 45–60 minute sessions, a qualified mental health practitioner conducts the structured evaluation, synthesizes behavioral observations, and provides an itemized clinical report with personalized recommendations.',
  },
];

/** Subset shown inside the results view, where people ask about their score. */
const RESULT_VIEW_IDS = [
  'diagnosis',
  'saved',
  'visible',
  'retake',
  'disagree',
  'high-stakes',
  'delete',
];

export const ASSESSMENT_RESULT_FAQS: AssessmentFaqItem[] = ASSESSMENT_FAQS.filter(
  (faq) => RESULT_VIEW_IDS.includes(faq.id)
);
