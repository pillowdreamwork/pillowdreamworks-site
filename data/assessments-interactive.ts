// PillowDreamWorks Unified Psychological Assessments Engine
// Full clinical assessment catalog, scoring models, factor analysis, and interpretation generator

export interface AssessmentFactorDefinition {
  name: string;
  indices: number[];
  meaning: string;
}

export interface AssessmentFactorResult {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: "Low" | "Moderate" | "High";
  meaning: string;
}

export interface AssessmentInterpretation {
  scoreSummary: string;
  levelLabel: string;
  percentage: number;
  badgeColor: "emerald" | "amber" | "red" | "blue";
  statement: string;
  factorResults: AssessmentFactorResult[];
  discussion: string[];
  conclusion: string;
  recommendations: string[];
  measuresTable: Array<{
    measure: string;
    score: number;
    maxScore: number;
    percentage: number;
    level: string;
    meaning: string;
  }>;
  educationalDisclaimer: string;
}

export interface InteractiveAssessmentItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  category: "anxiety" | "mood" | "personality" | "trauma" | "cognitive" | "relationships" | "graphology" | "projective" | "clinical";
  breadcrumb: string;
  description: string;
  whoCanTake: string;
  duration: string;
  administration: "Self-Administered (Free)" | "Practitioner-Administered Battery" | "Clinical Projective Assessment";
  isPaid: boolean;
  priceInr?: number;
  priceUsd?: number;
  options: string[];
  questions: string[];
  factors?: AssessmentFactorDefinition[];
  scoreLevels: Array<{
    threshold: number;
    label: string;
    badgeColor: "emerald" | "amber" | "red" | "blue";
    description: string;
  }>;
  customScoring?: (scores: number[]) => {
    score: number;
    maxScore: number;
    level: string;
    badgeColor: "emerald" | "amber" | "red" | "blue";
    factors?: AssessmentFactorResult[];
  };
}

// -------------------------------------------------------------
// CORE SCORING & INTERPRETATION UTILITIES
// -------------------------------------------------------------

export function computeAssessmentInterpretation(
  item: InteractiveAssessmentItem,
  scores: number[]
): AssessmentInterpretation {
  const sum = scores.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const maxScore = (item.questions.length * (item.options.length - 1)) || 1;
  const percentage = Math.min(100, Math.max(0, Math.round((sum / maxScore) * 100)));

  // Determine score level
  let currentLevel = item.scoreLevels[item.scoreLevels.length - 1];
  for (const lvl of item.scoreLevels) {
    if (sum <= lvl.threshold) {
      currentLevel = lvl;
      break;
    }
  }

  // Factor calculations if defined
  let factorResults: AssessmentFactorResult[] = [];
  if (item.factors && item.factors.length > 0) {
    factorResults = item.factors.map((factor) => {
      const fScore = factor.indices.reduce((tot, idx) => {
        const val = scores[idx];
        return tot + (Number.isFinite(val) ? val : 0);
      }, 0);
      const fMax = factor.indices.length * (item.options.length - 1);
      const fPct = fMax > 0 ? Math.round((fScore / fMax) * 100) : 0;
      const fLevel: "Low" | "Moderate" | "High" =
        fPct >= 66 ? "High" : fPct >= 33 ? "Moderate" : "Low";

      return {
        name: factor.name,
        score: fScore,
        maxScore: fMax,
        percentage: fPct,
        level: fLevel,
        meaning: factor.meaning,
      };
    });
  }

  // Structured Statement
  const statement = `Your total score is ${sum} out of ${maxScore} (${percentage}%), which places your responses in the ${currentLevel.label} range for this ${item.domain.toLowerCase()} inventory. ${currentLevel.description}`;

  // Structured Discussion (Multi-paragraph clinical exploration)
  const discussion: string[] = [];

  if (factorResults.length > 1) {
    const sortedFactors = [...factorResults].sort((a, b) => b.percentage - a.percentage);
    const strongest = sortedFactors[0];
    const lowest = sortedFactors[sortedFactors.length - 1];

    discussion.push(
      `Factor Analysis Breakdown: This inventory evaluates ${factorResults.length} distinct psychological subscales. The most prominent domain in your response profile is "${strongest.name}" (${strongest.score}/${strongest.maxScore}, ${strongest.percentage}% — ${strongest.level}), while "${lowest.name}" (${lowest.score}/${lowest.maxScore}, ${lowest.percentage}% — ${lowest.level}) represents the lowest reported elevation.`
    );

    discussion.push(
      `Situational & Relational Dynamics: The contrast between high ${strongest.name} and lower ${lowest.name} indicates that your cognitive and emotional energy is predominantly channelled through ${strongest.meaning.toLowerCase()} In daily contexts (such as work demands, personal relationships, or unfamiliar stressors), this pattern may manifest as heightened sensitivity in specific situations while maintaining relative stability in others.`
    );

    discussion.push(
      `Reflective Inquiry: Consider when this pattern first emerged. Did your highest factor (${strongest.name}) become an adaptive coping strategy in response to past demands? How might developing intentional boundaries or somatic regulation help balance the lower areas (${lowest.name})?`
    );
  } else {
    discussion.push(
      `Profile Exploration: Your overall response distribution reflects ${currentLevel.label.toLowerCase()} manifestations within the ${item.title} framework. Rather than viewing this score in isolation, it is most meaningful when linked to the specific situations, thoughts, and physiological triggers that contributed to each rating.`
    );

    discussion.push(
      `Cognitive & Somatic Patterns: Individuals scoring within this band frequently experience predictable cycles between perceived situational demands and internal coping reserves. Exploring the specific triggers that provoke peak distress can transform this screening into actionable self-awareness.`
    );
  }

  // Structured Conclusion
  const conclusion = factorResults.length > 1
    ? `In summary, your responses on the ${item.code || item.title} highlight "${factorResults[0]?.name}" as your primary area of cognitive focus and "${factorResults[factorResults.length - 1]?.name}" as a secondary baseline. This profile provides a structured blueprint for self-reflection and therapeutic dialogue rather than a static psychological label.`
    : `Overall, your score on the ${item.title} falls in the ${currentLevel.label} category. Use these insights as a starting point to identify emotional triggers, cultivate grounding habits, and discuss findings with a qualified counsellor if needed.`;

  // Tailored Recommendations
  const recommendations: string[] = [
    `Engage with Chapter ${item.category === "anxiety" ? "3 (Anxiety & Somatic Regulation)" : item.category === "mood" ? "2 (Cognitive Reframing)" : "1 (Self-Knowledge)"} in The Psychology Toolkit workbook for structured exercises.`,
    `Track your daily emotional fluctuations and note specific triggers that elevate your scores throughout the week.`,
    `Consider booking a 1-on-1 confidential counselling session or crisis stabilization call to explore personalized coping strategies.`,
    `Save or export this assessment summary to discuss during your next clinical or self-development review.`,
  ];

  // Measures Table
  const measuresTable = factorResults.length > 0
    ? factorResults.map((f) => ({
        measure: f.name,
        score: f.score,
        maxScore: f.maxScore,
        percentage: f.percentage,
        level: f.level,
        meaning: f.meaning,
      }))
    : [
        {
          measure: item.title,
          score: sum,
          maxScore: maxScore,
          percentage: percentage,
          level: currentLevel.label,
          meaning: currentLevel.description,
        },
      ];

  const educationalDisclaimer =
    "Educational & Screening Notice: This inventory is an educational self-reflection and screening instrument. It does not constitute a formal psychiatric or medical diagnosis. For clinical diagnostic evaluations or acute distress, consultation with a licensed psychologist or medical practitioner is required.";

  return {
    scoreSummary: `${sum} / ${maxScore}`,
    levelLabel: currentLevel.label,
    percentage,
    badgeColor: currentLevel.badgeColor,
    statement,
    factorResults,
    discussion,
    conclusion,
    recommendations,
    measuresTable,
    educationalDisclaimer,
  };
}

// -------------------------------------------------------------
// UNIFIED ASSESSMENTS CATALOG
// -------------------------------------------------------------

export const ALL_ASSESSMENTS_CATALOG: InteractiveAssessmentItem[] = [
  // 1. ANXIETY & WORRY
  {
    id: "gad-7",
    code: "GAD-7",
    title: "Generalized Anxiety Disorder Screener",
    domain: "Anxiety & Worry",
    category: "anxiety",
    breadcrumb: "Anxiety > Screening > GAD-7",
    description: "The gold-standard 7-item clinical tool to screen for generalized anxiety, uncontrollable worry, and physical tension.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    duration: "3–5 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)", "Several days (1)", "Over half the days (2)", "Nearly every day (3)"],
    questions: [
      "Feeling nervous, anxious, or on edge?",
      "Not being able to stop or control worrying?",
      "Worrying too much about different things?",
      "Trouble relaxing or quieting your mind?",
      "Being so restless that it is hard to sit still?",
      "Becoming easily annoyed or irritable?",
      "Feeling afraid as if something awful might happen?",
    ],
    factors: [
      { name: "Cognitive Worry & Apprehension", indices: [0, 1, 2, 6], meaning: "Mental rumination, anticipation of catastrophe, and uncontrollable circular thoughts." },
      { name: "Somatic & Motor Tension", indices: [3, 4, 5], meaning: "Physical restlessness, inability to relax muscular tension, and irritability." },
    ],
    scoreLevels: [
      { threshold: 4, label: "Minimal Anxiety", badgeColor: "emerald", description: "Baseline healthy anxiety with minimal disruption to daily routines." },
      { threshold: 9, label: "Mild Anxiety", badgeColor: "amber", description: "Mild situational tension. Proactive self-care and journaling can prevent escalation." },
      { threshold: 14, label: "Moderate Anxiety", badgeColor: "amber", description: "Notable persistent worry affecting concentration and relaxation. Structured coping tools recommended." },
      { threshold: 21, label: "Severe Anxiety", badgeColor: "red", description: "Significant emotional and somatic distress warranting professional therapeutic support." },
    ],
  },
  {
    id: "oasis",
    code: "OASIS",
    title: "Overall Anxiety Severity & Impairment Scale",
    domain: "Functional Impairment",
    category: "anxiety",
    breadcrumb: "Anxiety > Impairment > OASIS",
    description: "Evaluates how frequently anxiety occurs, its intensity, and how much it interferes with work, school, and relationships.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    duration: "2–4 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["None / Not at all (0)", "Mild / Infrequent (1)", "Moderate (2)", "Severe / Frequent (3)"],
    questions: [
      "In the past week, how often did you feel intense anxiety or panic?",
      "When anxious, how severe was the physical and emotional distress?",
      "How often did you avoid places, tasks, or people due to anxiety?",
      "How much did anxiety impair your daily duties or work performance?",
      "How much did anxiety disrupt your social connections and family life?",
    ],
    factors: [
      { name: "Anxiety Frequency & Intensity", indices: [0, 1], meaning: "Direct subjective severity and occurrence of acute emotional distress." },
      { name: "Behavioral Avoidance & Life Impairment", indices: [2, 3, 4], meaning: "The extent to which anxiety limits vocational, social, and functional participation." },
    ],
    scoreLevels: [
      { threshold: 4, label: "Normal Range", badgeColor: "emerald", description: "No notable functional impairment reported from anxiety over the preceding week." },
      { threshold: 8, label: "Mild Impairment", badgeColor: "amber", description: "Occasional disruption to concentration or social tasks." },
      { threshold: 12, label: "Moderate Impairment", badgeColor: "amber", description: "Frequent avoidance behaviors and fatigue stemming from emotional strain." },
      { threshold: 15, label: "Severe Impairment", badgeColor: "red", description: "Anxiety is significantly impacting daily vocational and relational functioning." },
    ],
  },
  {
    id: "sias-6",
    code: "SIAS-6",
    title: "Social Interaction Anxiety Scale",
    domain: "Social & Interpersonal",
    category: "anxiety",
    breadcrumb: "Anxiety > Social > SIAS-6",
    description: "Assesses distress, fear of scrutiny, and conversational tension during social and relational interactions.",
    whoCanTake: "Adolescents & Adults (16+)",
    duration: "3 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all characteristic (0)", "Slightly (1)", "Moderately (2)", "Extremely characteristic (3)"],
    questions: [
      "I get nervous if I have to speak with someone in authority (boss, teacher, interviewer).",
      "I find it difficult to make eye contact with others in group settings.",
      "I worry that I will express myself poorly or stumble over my words.",
      "I tense up if I meet an acquaintance on the street unexpectedly.",
      "I feel self-conscious and uneasy when eating or drinking in front of people.",
      "I worry about being seen as awkward or uninteresting at social gatherings.",
    ],
    factors: [
      { name: "Performance & Authority Anxiety", indices: [0, 2, 4], meaning: "Fear of being judged when speaking or performing tasks in public view." },
      { name: "Interpersonal Initiation & Contact", indices: [1, 3, 5], meaning: "Social friction and discomfort during spontaneous peer encounters and eye contact." },
    ],
    scoreLevels: [
      { threshold: 5, label: "Low / Baseline", badgeColor: "emerald", description: "Typical social poise and comfort navigating public conversations." },
      { threshold: 10, label: "Moderate Social Tension", badgeColor: "amber", description: "Situational nervousness during high-stakes evaluations or unfamiliar gatherings." },
      { threshold: 18, label: "High Social Anxiety", badgeColor: "red", description: "High sensitivity to social evaluation. Boundary work and cognitive disputation can provide profound relief." },
    ],
  },

  // 2. MOOD & DEPRESSION
  {
    id: "phq-9",
    code: "PHQ-9",
    title: "Patient Health Questionnaire (Depression Screener)",
    domain: "Mood & Depressive Symptoms",
    category: "mood",
    breadcrumb: "Mood > Screening > PHQ-9",
    description: "The premier 9-item clinical instrument screening for depressive mood, anhedonia, low energy, and sleep alterations.",
    whoCanTake: "Adolescents & Adults (Ages 12+)",
    duration: "4–6 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)", "Several days (1)", "Over half the days (2)", "Nearly every day (3)"],
    questions: [
      "Little interest or pleasure in doing things you usually enjoy?",
      "Feeling down, depressed, hopeless, or empty?",
      "Trouble falling asleep, staying asleep, or sleeping too much?",
      "Feeling tired, lethargic, or having very little physical energy?",
      "Poor appetite, skipping meals, or overeating?",
      "Feeling bad about yourself — that you are a failure or have let others down?",
      "Trouble concentrating on things like reading, work, or decisions?",
      "Moving or speaking noticeably slowly, or being unusually fidgety/restless?",
      "Thoughts that you would be better off dead or wanting to hurt yourself?",
    ],
    factors: [
      { name: "Cognitive & Affective Core", indices: [0, 1, 5, 8], meaning: "Loss of interest, persistent dysphoria, self-blame, and feelings of worthlessness." },
      { name: "Neurovegetative & Somatic", indices: [2, 3, 4, 6, 7], meaning: "Sleep architecture changes, energy depletion, appetite shifts, and motor slowing." },
    ],
    scoreLevels: [
      { threshold: 4, label: "Minimal / None", badgeColor: "emerald", description: "Normal mood baseline with healthy vitality and emotional resilience." },
      { threshold: 9, label: "Mild Depressive Symptoms", badgeColor: "amber", description: "Subclinical mood dip. Behavioral activation and structured journaling can restore rhythm." },
      { threshold: 14, label: "Moderate Depression", badgeColor: "amber", description: "Notable impact on vitality, focus, and motivation. Therapeutic guidance is recommended." },
      { threshold: 19, label: "Moderately Severe", badgeColor: "red", description: "Substantial burden on daily living. Clinical consultation strongly advised." },
      { threshold: 27, label: "Severe Depression", badgeColor: "red", description: "Severe mood disruption. Comprehensive psychological and medical support is indicated." },
    ],
  },
  {
    id: "bdi-ii",
    code: "BDI-II",
    title: "Beck Depression Inventory-II (Clinical Screener)",
    domain: "Depression Severity",
    category: "mood",
    breadcrumb: "Mood > Clinical > BDI-II",
    description: "Standardized psychometric inventory measuring cognitive, affective, and somatic dimensions of depressive states.",
    whoCanTake: "Teens & Adults (Ages 13+)",
    duration: "8–12 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    priceInr: 1499,
    priceUsd: 55,
    options: ["0 - Absent", "1 - Mild", "2 - Moderate", "3 - Severe"],
    questions: [
      "Sadness: Feeling sorrowful, tearful, or unable to shake unhappiness.",
      "Pessimism: Feeling discouraged about the future or expecting things to worsen.",
      "Past Failure: Feeling like a complete failure or that you have failed more than others.",
      "Loss of Pleasure: Inability to enjoy hobbies, achievements, or companionship.",
      "Guilt Feelings: Feeling perpetually guilty, bad, or unworthy.",
      "Punishment Feelings: Feeling you are being punished or deserve to be punished.",
      "Self-Dislike: Disappointment in oneself, self-criticism, or self-reproach.",
      "Self-Criticalness: Blaming oneself for all faults or shortcomings.",
      "Loss of Energy: Feeling too fatigued or exhausted to do everyday tasks.",
      "Irritability: Snapping at others or feeling unusually impatient.",
    ],
    factors: [
      { name: "Cognitive Self-Evaluative", indices: [1, 2, 4, 5, 6, 7], meaning: "Pessimism, guilt schemas, self-punishment, and hyper-critical internal dialogues." },
      { name: "Affective & Somatic Fatigue", indices: [0, 3, 8, 9], meaning: "Anhedonia, emotional sorrow, irritability, and pervasive loss of physical energy." },
    ],
    scoreLevels: [
      { threshold: 7, label: "Minimal Depression", badgeColor: "emerald", description: "Normal variation in emotional state." },
      { threshold: 14, label: "Mild Depression", badgeColor: "amber", description: "Mild depressive symptoms requiring supportive self-care." },
      { threshold: 22, label: "Moderate Depression", badgeColor: "amber", description: "Moderate depressive symptoms with significant daily impact." },
      { threshold: 30, label: "Severe Depression", badgeColor: "red", description: "Severe depression requiring structured clinical care." },
    ],
  },

  // 3. PERSONALITY & PROJECTIVE
  {
    id: "tipi-10",
    code: "TIPI-10",
    title: "Ten-Item Big Five Personality Inventory",
    domain: "Personality Structure",
    category: "personality",
    breadcrumb: "Personality > Big Five > TIPI-10",
    description: "Brief psychometric measure of the Big Five personality traits: Extraversion, Agreeableness, Conscientiousness, Emotional Stability, and Openness.",
    whoCanTake: "All Ages (14+)",
    duration: "3–5 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree strongly (0)", "Disagree moderately (1)", "Neither agree nor disagree (2)", "Agree moderately (3)"],
    questions: [
      "Extraverted, enthusiastic (Outgoing, talkative, high social energy)",
      "Critical, quarrelsome (Prone to challenge others or debate)",
      "Dependable, self-disciplined (Organized, persevering, goal-oriented)",
      "Anxious, easily upset (Prone to worry, emotionally reactive)",
      "Open to new experiences, complex (Creative, philosophical, imaginative)",
      "Reserved, quiet (Reflective, introspective, enjoys solitude)",
      "Sympathetic, warm (Compassionate, empathetic, considerate)",
      "Disorganized, careless (Spontaneous, flexible, less structured)",
      "Calm, emotionally stable (Even-tempered, resilient under pressure)",
      "Conventional, uncreative (Practical, traditional, grounded in routine)",
    ],
    factors: [
      { name: "Extraversion & Social Energy", indices: [0, 5], meaning: "Orientation toward external stimulation versus internal reflection." },
      { name: "Agreeableness & Empathy", indices: [1, 6], meaning: "Compassionate interpersonal trust versus critical debate orientation." },
      { name: "Conscientiousness & Order", indices: [2, 7], meaning: "Disciplined execution and self-regulation versus spontaneous flexibility." },
      { name: "Emotional Stability & Poise", indices: [3, 8], meaning: "Nervous system equilibrium and stress resilience under pressure." },
      { name: "Openness to Experience", indices: [4, 9], meaning: "Intellectual curiosity, aesthetic appreciation, and cognitive complexity." },
    ],
    scoreLevels: [
      { threshold: 10, label: "Balanced Trait Profile", badgeColor: "emerald", description: "Your personality traits exhibit adaptable, flexible expression across different life settings." },
      { threshold: 20, label: "Differentiated Profile", badgeColor: "blue", description: "Clear distinct personality strengths showing pronounced traits." },
      { threshold: 30, label: "Highly Differentiated", badgeColor: "emerald", description: "Strong trait markers across the Big Five spectrum." },
    ],
  },
  {
    id: "16pf",
    code: "16PF",
    title: "16 Personality Factor Questionnaire",
    domain: "Personality Factor Modeling",
    category: "personality",
    breadcrumb: "Personality > Comprehensive > 16PF",
    description: "Cattell's comprehensive personality assessment evaluating 16 primary traits and 5 global leadership factors.",
    whoCanTake: "Adults (18+)",
    duration: "35–50 mins",
    administration: "Practitioner-Administered Battery",
    isPaid: true,
    priceInr: 2999,
    priceUsd: 104,
    options: ["Rarely (0)", "Sometimes (1)", "Frequently (2)", "Almost Always (3)"],
    questions: [
      "Warmth: I feel genuinely connected to and interested in other people's lives.",
      "Reasoning: I enjoy solving complex abstract problems with rigorous logic.",
      "Emotional Stability: I recover quickly from sudden setbacks and unexpected stress.",
      "Dominance: I naturally take charge and voice opinions during group decisions.",
      "Liveliness: I bring infectious enthusiasm and spontaneous playfulness to tasks.",
      "Rule-Consciousness: I place high value on adhering strictly to ethical codes and rules.",
      "Social Boldness: I feel zero hesitation introducing myself to strangers.",
      "Sensitivity: I am deeply attuned to subtleties in art, language, and human feeling.",
      "Vigilance: I carefully assess people's underlying motives before trusting them.",
      "Abstractedness: I spend significant time exploring imaginative, visionary ideas.",
    ],
    factors: [
      { name: "Interpersonal Warmth & Connection", indices: [0, 4, 6], meaning: "Social approachability, warmth, and expressive relational ease." },
      { name: "Cognitive Independence & Reasoning", indices: [1, 8, 9], meaning: "Analytical reasoning, intellectual discernment, and strategic foresight." },
      { name: "Ego Strength & Emotional Stability", indices: [2, 3, 5, 7], meaning: "Poise under pressure, self-assertion, ethical alignment, and empathy." },
    ],
    scoreLevels: [
      { threshold: 10, label: "Standard Profile", badgeColor: "blue", description: "Balanced distribution across Cattell's primary personality traits." },
      { threshold: 20, label: "Elevated Trait Focus", badgeColor: "emerald", description: "Clear, pronounced strengths across interpersonal and analytical axes." },
      { threshold: 30, label: "Specialized Leadership Profile", badgeColor: "emerald", description: "Strong individual markers reflecting specialized operational style." },
    ],
  },

  // 4. TRAUMA & STRESS
  {
    id: "pcl-5",
    code: "PCL-5",
    title: "PTSD Checklist for DSM-5 (Symptom Screener)",
    domain: "Trauma & Stress",
    category: "trauma",
    breadcrumb: "Trauma > Screening > PCL-5",
    description: "20-item standardized measure monitoring post-traumatic stress symptoms across Intrusion, Avoidance, Cognition/Mood, and Arousal.",
    whoCanTake: "Adults (18+)",
    duration: "5–8 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)", "A little bit (1)", "Moderately (2)", "Quite a bit (3)"],
    questions: [
      "Repeated, disturbing, and unwanted memories of the stressful experience?",
      "Repeated, disturbing dreams of the stressful experience?",
      "Suddenly feeling or acting as if the stressful experience were happening again (flashbacks)?",
      "Feeling very upset when something reminded you of the stressful experience?",
      "Having strong physical reactions (heart racing, sweating) when reminded of the event?",
      "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      "Avoiding external reminders (people, places, conversations, objects) of the event?",
      "Trouble remembering important parts of the stressful experience?",
      "Strong negative beliefs about yourself, other people, or the world?",
      "Blaming yourself or someone else for the stressful event or what happened after?",
      "Feeling distant or cut off from other people?",
      "Being 'superalert', watchful, or constantly on guard (hypervigilance)?",
    ],
    factors: [
      { name: "Cluster B: Intrusions & Re-experiencing", indices: [0, 1, 2, 3, 4], meaning: "Involuntary memories, flashbacks, nightmares, and somatic distress reactions." },
      { name: "Cluster C: Active Avoidance", indices: [5, 6], meaning: "Deliberate suppression of thoughts and physical avoidance of triggering environments." },
      { name: "Cluster D & E: Negative Cognitions & Hyperarousal", indices: [7, 8, 9, 10, 11], meaning: "Worldview shifts, alienation, hypervigilance, and heightened startle response." },
    ],
    scoreLevels: [
      { threshold: 9, label: "Minimal / Subthreshold", badgeColor: "emerald", description: "Low level of traumatic intrusion." },
      { threshold: 18, label: "Mild Trauma Reactivity", badgeColor: "amber", description: "Situational reactivity to past stressors." },
      { threshold: 27, label: "Moderate Trauma Symptoms", badgeColor: "amber", description: "Notable intrusion and hypervigilance affecting nervous system balance." },
      { threshold: 36, label: "Elevated Trauma Profile", badgeColor: "red", description: "Significant trauma burden. Trauma-informed clinical care (EMDR/Somatic/CBT) indicated." },
    ],
  },
  {
    id: "caps-5",
    code: "CAPS-5",
    title: "Clinician-Administered PTSD Scale for DSM-5",
    domain: "Diagnostic Trauma Battery",
    category: "trauma",
    breadcrumb: "Trauma > Diagnostic > CAPS-5",
    description: "The gold-standard structured clinical interview assessing PTSD symptom frequency, intensity, and functional impairment.",
    whoCanTake: "Adults (18+)",
    duration: "45–60 mins",
    administration: "Practitioner-Administered Battery",
    isPaid: true,
    priceInr: 2999,
    priceUsd: 174,
    options: ["0 - Inactive", "1 - Mild", "2 - Moderate", "3 - Severe"],
    questions: [
      "Involuntary intrusive memories causing physiological or emotional distress.",
      "Trauma-related distressing dreams or night terrors.",
      "Dissociative reactions (flashbacks) with loss of present-moment awareness.",
      "Marked psychological distress at exposure to internal/external cues.",
      "Avoidance of trauma-related internal stimuli (thoughts/feelings).",
      "Avoidance of external stimuli (conversations, locations, individuals).",
      "Persistent negative emotional state (fear, horror, anger, guilt, shame).",
      "Markedly diminished interest or participation in significant activities.",
      "Hypervigilance and exaggerated startle response.",
      "Problems with concentration and sleep disturbance.",
    ],
    factors: [
      { name: "Intrusive Memory & Reactivity", indices: [0, 1, 2, 3], meaning: "Direct cognitive and somatic re-experiencing." },
      { name: "Avoidance & Emotional Numbing", indices: [4, 5, 6, 7], meaning: "Protective constriction of emotional range and behavioral avoidance." },
      { name: "Arousal & Reactivity", indices: [8, 9], meaning: "Autonomic nervous system dysregulation and hyperarousal." },
    ],
    scoreLevels: [
      { threshold: 8, label: "Subclinical", badgeColor: "emerald", description: "Symptoms do not reach diagnostic threshold." },
      { threshold: 16, label: "Mild PTSD Profile", badgeColor: "amber", description: "Mild clinical presentation with manageable daily impact." },
      { threshold: 24, label: "Moderate PTSD Profile", badgeColor: "amber", description: "Moderate clinical PTSD profile warranting trauma therapy." },
      { threshold: 30, label: "Severe PTSD Profile", badgeColor: "red", description: "Severe PTSD profile requiring dedicated multi-session trauma intervention." },
    ],
  },

  // 5. COGNITIVE & NEURODIVERGENCE
  {
    id: "asrs-v1",
    code: "ASRS-v1.1",
    title: "Adult ADHD Self-Report Scale",
    domain: "Executive Function & Attention",
    category: "cognitive",
    breadcrumb: "Cognitive > Neurodivergence > ASRS-v1.1",
    description: "WHO standardized 6-item screening tool for adult ADHD symptoms of inattention, executive dysfunction, and hyperactivity.",
    whoCanTake: "Adults (18+)",
    duration: "3–5 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)"],
    questions: [
      "Trouble wrapping up the final details of a project once the challenging parts are done?",
      "Difficulty getting things in order when you have to do a task that requires organization?",
      "Problems remembering appointments, obligations, or daily deadlines?",
      "Avoiding or delaying tasks that require a lot of sustained mental effort or focus?",
      "Fidgeting or squirming with your hands/feet when you have to sit for a long time?",
      "Feeling overly active and compelled to do things, as if driven by a motor?",
    ],
    factors: [
      { name: "Inattention & Executive Organization", indices: [0, 1, 2, 3], meaning: "Working memory challenges, task initiation friction, and organizational fatigue." },
      { name: "Hyperactivity & Motor Restlessness", indices: [4, 5], meaning: "Internal restlessness, difficulty remaining still, and feeling perpetually driven." },
    ],
    scoreLevels: [
      { threshold: 4, label: "Low Likelihood", badgeColor: "emerald", description: "Executive functioning within typical parameters." },
      { threshold: 9, label: "Moderate Traits", badgeColor: "amber", description: "Notable executive friction that benefits from structural scaffolding and timer tools." },
      { threshold: 18, label: "High Likelihood of ADHD Traits", badgeColor: "red", description: "Responses strongly align with adult ADHD characteristics. Formal clinical evaluation recommended." },
    ],
  },
  {
    id: "aq-10",
    code: "AQ-10",
    title: "Autism Spectrum Quotient (Short Screener)",
    domain: "Neurodivergence & Sensory",
    category: "cognitive",
    breadcrumb: "Cognitive > Neurodivergence > AQ-10",
    description: "Standardized 10-item clinical screening questionnaire for autistic traits, communication preferences, and sensory focus.",
    whoCanTake: "Teens & Adults (16+)",
    duration: "4 mins",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Definitely Disagree (0)", "Slightly Disagree (1)", "Slightly Agree (2)", "Definitely Agree (3)"],
    questions: [
      "I often notice small sounds when others do not.",
      "I usually concentrate more on the whole picture rather than small details.",
      "I find it easy to do more than one thing at once.",
      "If there is an interruption, I can switch back very quickly.",
      "I find it easy to 'read between the lines' when someone is talking to me.",
      "I know how to tell if someone listening to me is getting bored.",
      "When reading a story, I find it difficult to work out characters' intentions.",
      "I like to collect information about categories of things (types of cars, birds, books).",
      "I find it easy to work out what someone is thinking or feeling just by their face.",
      "I find it difficult to make new friends.",
    ],
    factors: [
      { name: "Sensory & Detail Orientation", indices: [0, 1, 7], meaning: "Heightened perceptual acuity and focused interest in categorical systems." },
      { name: "Social Communication & Theory of Mind", indices: [4, 5, 6, 8, 9], meaning: "Direct versus implicit communication preferences and social reading cues." },
      { name: "Attention Switching & Multi-tasking", indices: [2, 3], meaning: "Hyperfocus depth versus cognitive flexibility during unexpected task shifts." },
    ],
    scoreLevels: [
      { threshold: 10, label: "Typical Neurotype", badgeColor: "emerald", description: "Low elevation of autistic traits." },
      { threshold: 19, label: "Moderate Neurodivergent Traits", badgeColor: "blue", description: "Subtle sensory or communication specificities." },
      { threshold: 30, label: "Significant Autistic Traits", badgeColor: "amber", description: "Significant alignment with autistic neurotype. Comprehensive diagnostic assessment available." },
    ],
  },

  // 6. CLINICAL & PROJECTIVE BATTERIES (PRACTITIONER ADMINISTERED)
  {
    id: "rorschach",
    code: "ROR",
    title: "Rorschach Inkblot Diagnostic Assessment",
    domain: "Projective Personality & Perception",
    category: "projective",
    breadcrumb: "Projective > Personality > Rorschach",
    description: "Standardized projective psychological instrument examining perceptual style, cognitive processing, affect modulation, and unconscious drivers via CS scoring.",
    whoCanTake: "Adolescents & Adults (16+)",
    duration: "60–90 mins",
    administration: "Practitioner-Administered Battery",
    isPaid: true,
    priceInr: 3499,
    priceUsd: 209,
    options: ["Practitioner Rating Only"],
    questions: [
      "Card I: Initial orientation to unstructured stimulus and boundary definition.",
      "Card II: Response to chromatic color (red) and aggressive/affective charge.",
      "Card III: Human movement perception and interpersonal schema representation.",
      "Card IV: The 'Father Card' — response to massive shading, authority, and power.",
      "Card V: Reality testing benchmark card (Winged bat/butterfly percepts).",
      "Card VI: Tactile texture processing and relational intimacy regulation.",
      "Card VII: The 'Mother Card' — affective softness, maternal imagery, and openness.",
      "Card VIII: Whole chromatic color integration and emotional responsiveness.",
      "Card IX: Diffuse chromatic challenge and cognitive complexity under ambiguity.",
      "Card X: Multi-element cognitive integration and gestalt synthesis.",
    ],
    scoreLevels: [
      { threshold: 10, label: "Comprehensive Clinical Battery", badgeColor: "blue", description: "Administered live on Zoom with full Exner Comprehensive System (CS) diagnostic report." },
    ],
  },
  {
    id: "tat",
    code: "TAT",
    title: "Thematic Apperception Test",
    domain: "Narrative & Motivational Schema",
    category: "projective",
    breadcrumb: "Projective > Narrative > TAT",
    description: "Projective narrative instrument revealing dominant emotional conflicts, social motives (Achievement, Affiliation, Power), and relational defence mechanisms.",
    whoCanTake: "Children, Teens & Adults (10+)",
    duration: "45–60 mins",
    administration: "Practitioner-Administered Battery",
    isPaid: true,
    priceInr: 2999,
    priceUsd: 174,
    options: ["Practitioner Rating Only"],
    questions: [
      "Card 1: Boy and Violin — Ego ideal, ambition, and task mastery under authority.",
      "Card 2: Country Scene — Generational conflict, autonomy versus familial duty.",
      "Card 3BM: Crouched Figure — Despair, loss, vulnerability, and internal conflict.",
      "Card 4: Man and Woman — Heterosexual intimacy, conflict, and impulse control.",
      "Card 6BM: Mother and Son — Maternal attachment, guilt, and adult independence.",
      "Card 7BM: Older and Younger Man — Father-son identification, mentorship, and advice.",
      "Card 8BM: Operation Scene — Aggression, surgical rescue, and ambition fantasies.",
      "Card 13MF: Young Woman in Bed — Guilt, sexuality, grief, and destructive drive.",
    ],
    scoreLevels: [
      { threshold: 10, label: "Practitioner Diagnostic Session", badgeColor: "blue", description: "Narrative transcription and psychoanalytic motivational schema report." },
    ],
  },
  {
    id: "mmpi-2",
    code: "MMPI-2",
    title: "Minnesota Multiphasic Personality Inventory",
    domain: "Clinical Psychopathology",
    category: "clinical",
    breadcrumb: "Clinical > Psychopathology > MMPI-2",
    description: "The gold-standard empirical psychometric evaluating clinical personality structures, somatic concerns, mood disorders, and defensive response validity.",
    whoCanTake: "Adults (18+)",
    duration: "60–90 mins",
    administration: "Practitioner-Administered Battery",
    isPaid: true,
    priceInr: 3999,
    priceUsd: 209,
    options: ["Practitioner Rating Only"],
    questions: [
      "Scale 1 (Hs - Hypochondriasis): Somatic preoccupation and physical focus.",
      "Scale 2 (D - Depression): Poor morale, lack of hope, and cognitive slowing.",
      "Scale 3 (Hy - Hysteria): Somatic vulnerability under interpersonal stress.",
      "Scale 4 (Pd - Psychopathic Deviate): Social conformity and authority friction.",
      "Scale 5 (Mf - Masculinity/Femininity): Gender role rigidity versus flexibility.",
      "Scale 6 (Pa - Paranoia): Interpersonal sensitivity, mistrust, and vigilance.",
      "Scale 7 (Pt - Psychasthenia): Anxiety, obsessive rumination, and perfectionism.",
      "Scale 8 (Sc - Schizophrenia): Perceptual alienation and cognitive eccentricity.",
      "Scale 9 (Ma - Hypomania): Energy elevation, grandiosity, and impulsivity.",
      "Scale 0 (Si - Social Introversion): Social withdrawal versus sociability.",
    ],
    scoreLevels: [
      { threshold: 10, label: "Full Clinical T-Score Profile", badgeColor: "blue", description: "Comprehensive computerized T-score profile with validity indices (L, F, K)." },
    ],
  },
];
