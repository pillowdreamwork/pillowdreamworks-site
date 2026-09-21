// PillowDreamWorks — Unified Psychological Assessments Database
// Covers 15 clinical domains with free self-inventories & practitioner diagnostic sessions

function buildFactorResults(scores, definitions) {
  return definitions.map((factor) => {
    const score = factor.indices.reduce((total, index) => {
      const value = Number(scores[index]);
      return total + (Number.isFinite(value) ? value : 0);
    }, 0);
    const maxScore = factor.indices.length * 3;
    const percentage = maxScore ? (score / maxScore) * 100 : 0;
    const level = percentage >= 66 ? 'High' : percentage >= 33 ? 'Moderate' : 'Low';
    return {
      name: factor.name,
      score,
      maxScore,
      level,
      percentage,
      meaning: factor.meaning
    };
  });
}

const PSYCH_ASSESSMENTS = [
  {
    id: "gad-7",
    domain: "Anxiety",
    title: "GAD-7 (Generalized Anxiety Disorder Screener)",
    breadcrumb: "Anxiety > Screening > GAD-7",
    description: "The gold-standard 7-item clinical tool to screen for generalized anxiety, uncontrollable worry, and physical tension.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","Several days","Over half the days","Nearly every day"],
    questions: [
      "Feeling nervous, anxious, or on edge?",
      "Not being able to stop or control worrying?",
      "Worrying too much about different things?",
      "Trouble relaxing or quieting your mind?",
      "Being so restless that it's hard to sit still?",
      "Becoming easily annoyed or irritable?",
      "Feeling afraid as if something awful might happen?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9,14];
      const lb = ["Minimal Anxiety","Mild Anxiety","Moderate Anxiety","Severe Anxiety"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 21, level, badge };
    }
  },
  {
    id: "oasis",
    domain: "Anxiety",
    title: "OASIS (Overall Anxiety Severity & Impairment Scale)",
    breadcrumb: "Anxiety > Impairment > OASIS",
    description: "Evaluates how frequently anxiety occurs, its intensity, and how much it interferes with work, school, and relationships.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["None / Not at all","Mild / Infrequent","Moderate","Severe / Frequent"],
    questions: [
      "In the past week, how often did you feel intense anxiety?",
      "When anxious, how severe was the physical and emotional distress?",
      "How often did you avoid places, tasks, or people due to anxiety?",
      "How much did anxiety impair your daily duties or work performance?",
      "How much did anxiety disrupt your social connections and family life?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8,12];
      const lb = ["Normal Range","Mild Impairment","Moderate Impairment","Severe Impairment"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "sias-6",
    domain: "Anxiety",
    title: "SIAS-6 (Social Interaction Anxiety Scale)",
    breadcrumb: "Anxiety > Social Anxiety > SIAS-6",
    description: "Screens for discomfort, self-consciousness, and avoidance during group interactions, authority conversations, or meeting strangers.",
    whoCanTake: "Teens & Adults (Ages 13+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","Slightly","Moderately","Very much"],
    questions: [
      "I get nervous if I have to speak to someone in authority.",
      "I find it difficult making eye contact with others in conversation.",
      "I become tense if I have to speak about myself in a group.",
      "I feel awkward and self-conscious when meeting strangers.",
      "I worry about saying something foolish when talking to peers.",
      "I hesitate to join groups or gatherings where I might be judged."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,12];
      const lb = ["Low Social Anxiety","Moderate Social Fear","High Social Anxiety"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 18, level, badge };
    }
  },
  {
    id: "pdss-short",
    domain: "Anxiety",
    title: "PDSS (Panic Disorder Severity Screener)",
    breadcrumb: "Anxiety > Panic > PDSS",
    description: "Evaluates sudden rushes of fear, racing heart, tightness in chest, and the constant dread of recurring panic attacks.",
    whoCanTake: "Adults (Ages 16+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["None (0)","Mild / Rare (1)","Moderate (2)","Severe / Frequent (3)"],
    questions: [
      "How many sudden surges of fear or panic did you experience this past week?",
      "How distressing were bodily symptoms (palpitations, trembling, breathlessness)?",
      "How much fear did you have about when the next panic attack might strike?",
      "Did you avoid specific crowded places or travel due to panic fear?",
      "How much did panic symptoms interfere with your daily routine or sleep?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3,7];
      const lb = ["Minimal Panic Symptoms","Moderate Panic Distress","Severe Panic Profile"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "hai-short",
    domain: "Anxiety",
    title: "HAI-Short (Health Anxiety Inventory)",
    breadcrumb: "Anxiety > Health Anxiety > HAI-Short",
    description: "Measures preoccupation with bodily sensations, persistent illness fears, and difficulty finding reassurance.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Rarely / Never","Sometimes","Often","Almost Always"],
    questions: [
      "I spend substantial time worrying about whether I have a serious illness.",
      "As soon as I notice a bodily sensation, I fear something is dangerously wrong.",
      "I frequently inspect my body or search medical forums for reassurance.",
      "Hearing of disease in others triggers acute worry about my own health.",
      "Medical reassurance relieves my worry for only a very short time."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Low Health Worry","Moderate Health Preoccupation","High Health Anxiety"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "pswq-brief",
    domain: "Anxiety",
    title: "Penn State Worry Questionnaire (PSWQ-Brief)",
    breadcrumb: "Anxiety > Chronic Worry > PSWQ",
    description: "Assesses excessive, generalized, and uncontrollable worry across multiple areas of everyday life.",
    whoCanTake: "Teens & Adults (Ages 13+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all typical","Somewhat typical","Moderately typical","Very typical"],
    questions: [
      "My worries overwhelm me.",
      "Many situations make me worry.",
      "I know I shouldn't worry about things, but I just can't help it.",
      "When under pressure, I worry about everything that could go wrong.",
      "I notice that I worry continuously until a task is completely finished."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [5,10];
      const lb = ["Low Worry","Moderate Worry","High Chronic Worry"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "ham-a",
    domain: "Anxiety",
    title: "HAM-A (Hamilton Anxiety Rating Scale Clinical Battery)",
    breadcrumb: "Anxiety > Clinical Assessment > HAM-A",
    description: "Gold-standard practitioner-administered clinical rating scale measuring psychic anxiety (mental tension, irritability) and somatic anxiety (physical complaints, cardiovascular sensations).",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 1499,
    priceUSD: 19,
    duration: "45 Mins Structured Clinical Interview",
    includes: [
      "1-on-1 Structured Diagnostic Interview with Manish Garg",
      "14-Item HAM-A Psychic & Somatic Symptom Rating",
      "Comprehensive Anxiety Severity Report",
      "Personalised Actionable Therapy Pathway"
]  },
  {
    id: "phq-9",
    domain: "Depression & Mood",
    title: "PHQ-9 (Patient Health Questionnaire)",
    breadcrumb: "Depression & Mood > Screening > PHQ-9",
    description: "Standardized 9-item diagnostic screener evaluating low mood frequency, anhedonia, fatigue, sleep patterns, and self-worth over the past 2 weeks.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","Several days","Over half the days","Nearly every day"],
    questions: [
      "Little interest or pleasure in doing things?",
      "Feeling down, depressed, or hopeless?",
      "Trouble falling or staying asleep, or sleeping too much?",
      "Feeling tired or having little energy?",
      "Poor appetite or overeating?",
      "Feeling bad about yourself — or that you are a failure?",
      "Trouble concentrating on things, such as reading or working?",
      "Moving or speaking so slowly or being fidgety/restless?",
      "Thoughts that you would be better off dead or of hurting yourself?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9,14];
      const lb = ["Minimal / None","Mild Low Mood","Moderate Low Mood","Moderately Severe to High"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 27, level, badge };
    }
  },
  {
    id: "phq-2",
    domain: "Depression & Mood",
    title: "PHQ-2 (Rapid 2-Item Mood Screener)",
    breadcrumb: "Depression & Mood > Rapid Screen > PHQ-2",
    description: "Ultra-brief 60-second primary mood screener for anhedonia and depressed affect.",
    whoCanTake: "All Ages (10+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Several days (1)","More than half days (2)","Nearly every day (3)"],
    questions: [
      "Over the past 2 weeks, have you felt down, depressed, or hopeless?",
      "Over the past 2 weeks, have you felt little interest or pleasure in doing things?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [2];
      const lb = ["Screen Negative (Minimal Symptoms)","Screen Positive (Further Evaluation Advised)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 6, level, badge };
    }
  },
  {
    id: "ces-d",
    domain: "Depression & Mood",
    title: "CES-D (Center for Epidemiologic Studies Depression Scale)",
    breadcrumb: "Depression & Mood > Affective State > CES-D",
    description: "Measures depressive feelings, worthlessness, loneliness, and lack of enthusiasm over the past week.",
    whoCanTake: "Adults (Ages 16+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Rarely (<1 day)","Some (1-2 days)","Occasionally (3-4 days)","Most of time (5-7 days)"],
    questions: [
      "I was bothered by things that usually don't bother me.",
      "I felt that I could not shake off the blues even with help from family or friends.",
      "I felt fearful or lonely in my daily life.",
      "My sleep was restless and unrefreshing.",
      "I felt sad or that I could not get going."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Normal Mood State","Mild Mood Distress","Elevated Depressive Symptoms"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "mdq",
    domain: "Depression & Mood",
    title: "MDQ (Mood Disorder & Bipolar Spectrum Questionnaire)",
    breadcrumb: "Depression & Mood > Bipolar Spectrum > MDQ",
    description: "Screens for alternating periods of abnormally high energy, impulsivity, reduced sleep need, and subsequent low mood.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["No (0)","Slightly (1)","Moderately (2)","Yes, Definitely (3)"],
    questions: [
      "Have you had times when you felt so high or hyper that other people thought you were not your normal self?",
      "Were you so irritable that you shouted at people or started intense arguments?",
      "Did you feel much more self-confident and grandiose than usual?",
      "Did you get much less sleep than usual and find you didn't really miss it?",
      "Were you much more talkative, or speaking much faster than usual?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Low Mood Cycling Probability","Moderate Cyclothymic Indicators","Elevated Bipolar Spectrum Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "bdi-ii",
    domain: "Depression & Mood",
    title: "BDI-II (Beck Depression Inventory Standardized Clinical Battery)",
    breadcrumb: "Depression & Mood > Clinical Assessment > BDI-II",
    description: "The premier clinician-administered 21-item psychometric instrument evaluating somatic, cognitive, and affective dimensions of depressive episodes.",
    whoCanTake: "Teens & Adults (Ages 13+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 1499,
    priceUSD: 19,
    duration: "45 Mins Clinical Evaluation",
    includes: [
      "Full 21-Item Standardized BDI-II Battery Administration",
      "Computerized Cognitive & Somatic Subscale Breakdown",
      "Formal Clinical Severity Scorecard & Diagnostic Profile",
      "Tailored Evidence-Based Intervention Roadmap"
]  },
  {
    id: "pss-10",
    domain: "Stress & Burnout",
    title: "PSS-10 (Perceived Stress Scale)",
    breadcrumb: "Stress & Burnout > Perceived Stress > PSS-10",
    description: "Measures how unpredictable, uncontrollable, and overloaded you find your life circumstances.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","Almost Never","Sometimes","Fairly Often","Very Often"],
    questions: [
      "Been upset because of something that happened unexpectedly?",
      "Felt unable to control important things in your life?",
      "Felt nervous and stressed?",
      "Felt confident about your ability to handle problems?",
      "Felt that things were going your way?",
      "Found that you could not cope with all the things you had to do?",
      "Been able to control irritations in your life?",
      "Felt that you were on top of things?",
      "Been angered because of things outside your control?",
      "Felt difficulties were piling up so high you could not overcome them?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [13,26];
      const lb = ["Low Perceived Stress","Moderate Stress","High Stress Overload"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 40, level, badge };
    }
  },
  {
    id: "mbi-self",
    domain: "Stress & Burnout",
    title: "MBI-Self (Maslach Burnout Inventory Check)",
    breadcrumb: "Stress & Burnout > Career > MBI-Self",
    description: "Evaluates emotional exhaustion, cynicism/detachment, and feelings of reduced personal accomplishment in career or study.",
    whoCanTake: "Working Professionals & Students",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","A few times a month","Once a week","Every day"],
    questions: [
      "I feel emotionally drained from my work or academic duties.",
      "I feel used up and depleted at the end of the day.",
      "I feel tired when I get up in the morning to face another workday.",
      "I have become more cynical and detached about my responsibilities.",
      "I feel my efforts make little meaningful difference."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Low Burnout Risk","Moderate Burnout","Severe Professional Exhaustion"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "caregiver-burden",
    domain: "Stress & Burnout",
    title: "Caregiver Fatigue & Burden Inventory",
    breadcrumb: "Stress & Burnout > Caregiving > Burden Check",
    description: "Measures emotional strain, health impacts, and isolation experienced while caring for dependent family members.",
    whoCanTake: "Caregivers & Family Members",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","Rarely","Sometimes","Often"],
    questions: [
      "I feel I don't have enough time for my own personal needs.",
      "I feel physically or emotionally drained by my caregiving duties.",
      "I worry that my personal health has suffered from taking care of others.",
      "I feel isolated or strained in my relationships.",
      "I feel overwhelmed with uncertainty regarding future responsibilities."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Low Caregiver Strain","Moderate Caregiver Strain","High Caregiver Fatigue"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "pcl-5",
    domain: "Trauma & PTSD",
    title: "PCL-5 (PTSD Checklist for DSM-5)",
    breadcrumb: "Trauma & PTSD > Screening > PCL-5",
    description: "Assesses intrusive memories, trauma avoidance, negative alterations in mood, and physiological hyperarousal.",
    whoCanTake: "Teens & Adults (Ages 15+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","A little bit","Moderately","Extremely"],
    questions: [
      "Repeated, disturbing, and unwanted memories of a stressful event?",
      "Feeling emotionally upset or bodily tense when reminded of the event?",
      "Trying hard to avoid memories, thoughts, or feelings related to the event?",
      "Feeling jumpy, super-alert, or easily startled by unexpected sounds?",
      "Feeling distant, cut off from other people, or emotionally numb?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9];
      const lb = ["Minimal Trauma Symptoms","Moderate Trauma Reactivity","High PTSD / Trauma Symptom Profile"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "ies-r",
    domain: "Trauma & PTSD",
    title: "IES-R (Impact of Event Scale-Revised Short)",
    breadcrumb: "Trauma & PTSD > Event Impact > IES-R",
    description: "Measures current subjective distress for any specific stressful or traumatic life experience.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","A little bit","Moderately","Quite a bit"],
    questions: [
      "Reminders brought back sudden emotional distress.",
      "I had trouble staying asleep or had distressing dreams about it.",
      "Pictures or thoughts about it popped into my mind unexpectedly.",
      "I felt irritable, jumpy, or angry without clear cause.",
      "I tried not to talk or think about what happened."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9];
      const lb = ["Normal Range","Moderate Trauma Impact","High Post-Trauma Distress"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "ace",
    domain: "Trauma & PTSD",
    title: "ACE (Adverse Childhood Experiences Screener)",
    breadcrumb: "Trauma & PTSD > Developmental > ACE",
    description: "Screens for childhood emotional neglect, familial distress, or physical boundary violations affecting adult well-being.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["No (0)","Occasionally (1)","Frequently (2)","Yes, Consistently (3)"],
    questions: [
      "Did you often feel that family members swore at, insulted, or humiliated you?",
      "Did you feel that you did not have someone in your home to protect or nurture you?",
      "Did your parents or guardians experience severe domestic conflict or separation?",
      "Did you live with anyone who struggled with chronic alcoholism or mental distress?",
      "Did you feel unsafe in your childhood home environment?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3,7];
      const lb = ["Low ACE Exposure","Moderate Childhood Adversity","Significant Developmental Trauma"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "caps-5",
    domain: "Trauma & PTSD",
    title: "CAPS-5 (Clinician-Administered PTSD Scale Diagnostic Battery)",
    breadcrumb: "Trauma & PTSD > Clinical Diagnosis > CAPS-5",
    description: "The international gold-standard clinical interview for comprehensive DSM-5 PTSD diagnosis, evaluating onset, duration, and symptom severity across all trauma clusters.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2999,
    priceUSD: 39,
    duration: "90 Mins Structured Clinical Interview",
    includes: [
      "Full CAPS-5 Clinician Diagnostic Interview with Manish Garg",
      "DSM-5 Trauma Cluster Severity Mapping (Intrusions, Avoidance, Cognition, Arousal)",
      "Comprehensive Formal Psychological Diagnostic Report",
      "Evidence-Based Trauma Rehabilitation & Somatic Therapy Plan"
]  },
  {
    id: "tipi-10",
    domain: "Personality",
    title: "Big Five Personality Inventory (TIPI-10)",
    breadcrumb: "Personality > Trait Profiles > Big Five",
    description: "Assesses the 5 core human personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "Extraversion: I see myself as extraverted, enthusiastic, and socially outgoing.",
      "Agreeableness: I see myself as sympathetic, warm-hearted, and trusting of others.",
      "Conscientiousness: I see myself as dependable, self-disciplined, and organized.",
      "Emotional Stability: I stay calm under pressure and rarely get easily upset or anxious.",
      "Openness to Experience: I am curious, imaginative, and open to creative ideas.",
      "Social Drive: I enjoy being active and engaged in group conversations.",
      "Execution Focus: I follow through on commitments thoroughly before taking on new ones.",
      "Resilience: I bounce back quickly after setbacks or criticisms."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [10,18];
      const lb = ["Introspective & Sensitive Trait Profile","Balanced Personality Trait Profile","High Emotional Resilience & Extraverted Openness"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }

      const factorMap = [
        { name: 'Extraversion', indices: [0, 5], maxScore: 6, meaning: 'This factor reflects how strongly the respondent tends to feel socially energetic and engagement-oriented within the current assessment.' },
        { name: 'Agreeableness', indices: [1, 6], maxScore: 6, meaning: 'This factor captures the degree to which the respondent appears warm, cooperative, and relationally considerate in social contexts.' },
        { name: 'Conscientiousness', indices: [2, 7], maxScore: 6, meaning: 'This factor reflects organization, follow-through, and efficiency in responsibilities, planning, and execution.' },
        { name: 'Emotional Stability', indices: [3], maxScore: 3, meaning: 'This factor indicates how easily the respondent may stay calm, resilient, and steady under pressure.' },
        { name: 'Openness', indices: [4], maxScore: 3, meaning: 'This factor captures curiosity, imagination, and willingness to engage with new ideas, experiences, or perspectives.' }
      ];

      const factors = buildFactorResults(scores, factorMap);

      return { score: sum, maxScore: 24, level, badge, factors };
    }
  },
  {
    id: "epq-r-short",
    domain: "Personality",
    title: "EPQ-R Short (Eysenck Personality Questionnaire Revised)",
    breadcrumb: "Personality > Biological Traits > EPQ-R",
    description: "Measures biological temperament dimensions: Extraversion, Neuroticism (emotional reactivity), and Tough-mindedness.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["No","Somewhat","Mostly","Yes, Definitely"],
    questions: [
      "Does your mood frequently go up and down without clear reason?",
      "Do you prefer talking things out spontaneously rather than solitary reflection?",
      "Are your feelings easily hurt by offhand comments from others?",
      "Do you enjoy taking calculated social risks or spontaneous adventures?",
      "Do you often feel a sense of restlessness or tension in quiet rooms?",
      "Are you considered a lively, energetic conversationalist by friends?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,12];
      const lb = ["Stable & Introspective","Balanced Emotional Temperament","High Reactive Emotionality"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      const factors = buildFactorResults(scores, [
        { name: 'Extraversion', indices: [1, 3, 5], meaning: 'This factor reflects social energy, liveliness, and willingness to engage openly with other people.' },
        { name: 'Emotional Reactivity', indices: [0, 2, 4], meaning: 'This factor reflects mood fluctuation, sensitivity to criticism, and tension or restlessness under pressure.' }
      ]);
      return { score: sum, maxScore: 18, level, badge, factors };
    }
  },
  {
    id: "mbti-style-16",
    domain: "Personality",
    title: "16-Personality Type Screener (MBTI Cognitive Style)",
    breadcrumb: "Personality > Typology > 16-Type Screener",
    description: "Identifies psychological preferences in perceiving information and reaching decisions (Introversion/Extraversion, Intuition/Sensing, Thinking/Feeling, Judging/Perceiving).",
    whoCanTake: "Teens & Adults (Ages 13+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "Recharge energy best in quiet solitary reflection rather than noisy crowds?",
      "Focus more on abstract possibilities and future patterns than concrete immediate facts?",
      "Prioritize logic, objective analysis, and fairness over personal emotional harmony?",
      "Prefer structured schedules and settled deadlines over spontaneous flexibility?",
      "Value truth and intellectual precision even if it causes temporary social friction?",
      "Feel more comfortable when decisions are finalised well in advance?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [8,14];
      const lb = ["Intuitive & Expressive Processing Style","Balanced Adaptable Cognitive Style","Structured Analytical & Objective Processing Style"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      const factors = buildFactorResults(scores, [
        { name: 'Introversion / Extraversion', indices: [0], meaning: 'This axis reflects the balance between quiet solitary recharging and preference for energetic social engagement.' },
        { name: 'Intuition / Sensing', indices: [1], meaning: 'This axis reflects preference for abstract possibilities and patterns versus concrete immediate information.' },
        { name: 'Thinking / Feeling', indices: [2, 4], meaning: 'This axis reflects the relative emphasis placed on objective analysis, precision, fairness, and interpersonal harmony.' },
        { name: 'Judging / Perceiving', indices: [3, 5], meaning: 'This axis reflects preference for structure, settled plans, and decisions versus flexibility and openness.' }
      ]);
      return { score: sum, maxScore: 18, level, badge, factors };
    }
  },
  {
    id: "sd3-short",
    domain: "Personality",
    title: "Dark Triad Screener (Machiavellianism, Narcissism, Psychopathy)",
    breadcrumb: "Personality > Dark Triad > SD3-Short",
    description: "Evaluates interpersonal opportunism, social grandiosity, and callousness indicators in interpersonal dynamics.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "I believe it is wise to tell people what they want to hear to get things done.",
      "I naturally enjoy being the center of attention and admired in public.",
      "I can easily detach my feelings from other people's problems.",
      "I am skilled at calculating social advantages in workplace politics.",
      "I insist on getting the respect that is owed to me.",
      "I rarely feel regret when outsmarting an opponent."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,12];
      const lb = ["Low Dark Triad Traits (High Empathy)","Moderate Strategic Pragmatism","Elevated Dark Triad Interpersonal Profile"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      const factors = buildFactorResults(scores, [
        { name: 'Machiavellianism', indices: [0, 3], meaning: 'This factor reflects strategic social calculation and willingness to shape interactions toward an advantage.' },
        { name: 'Narcissism', indices: [1, 4], meaning: 'This factor reflects desire for admiration, recognition, and status in interpersonal settings.' },
        { name: 'Psychopathy', indices: [2, 5], meaning: 'This factor reflects emotional detachment and reduced remorse as represented by the current items.' }
      ]);
      return { score: sum, maxScore: 18, level, badge, factors };
    }
  },
  {
    id: "type-ab",
    domain: "Personality",
    title: "Type A/B Behaviour Pattern & Stress Drive",
    breadcrumb: "Personality > Stress Style > Type A/B",
    description: "Assesses competitive drive, time urgency, impatience, and cardiac-stress vulnerability.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Rarely","Occasionally","Frequently","Almost Always"],
    questions: [
      "Do you find it difficult to sit and do nothing without feeling restless or guilty?",
      "Do you walk, eat, and talk rapidly, feeling that time is always slipping away?",
      "Do you get intensely irritated by slow drivers, queues, or delayed replies?",
      "Are you driven by competitive comparison and measuring personal success against others?",
      "Do you multi-task continuously even during leisure time?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Type B (Relaxed & Patient)","Balanced Stress Drive","Type A (High Urgency & Competitive Tension)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "16pf",
    domain: "Personality",
    title: "16PF (Cattell's 16 Personality Factor Questionnaire Battery)",
    breadcrumb: "Personality > Standardized Clinical > 16PF",
    description: "Standardized 185-item psychometric assessment measuring Cattell's 16 primary personality factors and 5 global dimensions for career, leadership, and therapeutic self-understanding.",
    whoCanTake: "Teens & Adults (Ages 16+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2999,
    priceUSD: 39,
    duration: "90 Mins Standardized Battery & Consultation",
    includes: [
      "Full 185-Item 16PF Standardized Questionnaire Administration",
      "Computerized 16 Primary Factor Sten Score Profile",
      "5 Global Factors Analysis (Extraversion, Anxiety, Tough-Mindedness, Independence, Self-Control)",
      "Comprehensive Formal Psychological Report with Manish Garg"
]  },
  {
    id: "rorschach",
    domain: "Personality",
    title: "Rorschach Inkblot Test (Comprehensive System Evaluation)",
    breadcrumb: "Personality > Projective Assessment > Rorschach",
    description: "Renowned 10-card projective psychodiagnostic test evaluating subconscious personality structure, perceptual accuracy, affective modulation, defense mechanisms, and latent emotional distress.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 3499,
    priceUSD: 45,
    duration: "60-90 Mins 1-on-1 Session + Exner Scoring Report",
    includes: [
      "1-on-1 Standardized 10-Card Clinical Administration by Manish Garg",
      "Exner Comprehensive System Structural Summary Scoring",
      "Detailed 5-Page In-Depth Psychodynamic Personality Report",
      "Post-Assessment Therapeutic Integration Consultation"
]  },
  {
    id: "tat",
    domain: "Personality",
    title: "TAT (Thematic Apperception Test Projective Battery)",
    breadcrumb: "Personality > Projective Narrative > TAT",
    description: "Standardized picture-card narrative test evaluating implicit motives, interpersonal conflict patterns, unconscious needs (achievement, affiliation, power), and environmental pressures.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2999,
    priceUSD: 39,
    duration: "60 Mins 1-on-1 Card Storytelling Session",
    includes: [
      "1-on-1 Standardized Card Administration Session with Manish Garg",
      "Murray's Need-Press System Story Analysis & Defense Coding",
      "Formal Psychodynamic Conflict & Relational Dynamics Report",
      "Actionable Therapeutic Recommendations"
]  },
  {
    id: "mmpi-2",
    domain: "Personality",
    title: "MMPI-2 (Minnesota Multiphasic Personality Inventory)",
    breadcrumb: "Personality > Clinical Diagnostics > MMPI-2",
    description: "The gold-standard 567-item standardized clinical diagnostic inventory measuring 10 clinical scales (Hypochondriasis, Depression, Hysteria, Psychopathy, Paranoia, Schizophrenia, Mania, Social Introversion) and validity scales.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 3999,
    priceUSD: 49,
    duration: "90 Mins Administration + Diagnostic Scoring",
    includes: [
      "Standardized 567-Item MMPI-2 Questionnaire Administration",
      "Computerized Validity Scales (L, F, K) & 10 Clinical Scales Scoring",
      "Comprehensive Formal Clinical Diagnostic Profile Chart",
      "1-on-1 Feedback Consultation & Psychiatric Referral Guidance"
]  },
  {
    id: "ssct",
    domain: "Personality",
    title: "SSCT (Sacks Sentence Completion Test Projective Inventory)",
    breadcrumb: "Personality > Projective Sentence > SSCT",
    description: "60-item projective sentence completion inventory assessing subconscious attitudes and unresolved conflicts across 4 critical domains: Family, Sex/Romance, Interpersonal, and Self-Concept.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 1999,
    priceUSD: 25,
    duration: "45 Mins Session & Scoring",
    includes: [
      "Full 60-Item SSCT Administration & Intake",
      "Four-Domain Conflict Severity Rating & Qualitative Coding",
      "Formal Psychodynamic Summary Report by Manish Garg",
      "Personalized Emotional Growth & Action Plan"
]  },
  {
    id: "htp",
    domain: "Personality",
    title: "HTP (House-Tree-Person) Clinical Art Evaluation",
    breadcrumb: "Personality > Projective Drawings > HTP Clinical",
    description: "Clinical projective drawing evaluation analyzing emotional boundaries (House), ego strength & grounding (Tree), and self-concept/body image (Person) with psychodynamic interpretation.",
    whoCanTake: "Children, Teens & Adults (All Ages)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 1999,
    priceUSD: 25,
    duration: "60 Mins Practitioner-Guided Session",
    includes: [
      "Live Guided Drawing Session with Manish Garg",
      "Psychodynamic Structural Analysis (Line pressure, sizing, omissions, placement)",
      "Formal Art Therapy Diagnostic Interpretive Report",
      "Custom Grapho-Art Therapy Workbook Exercises"
]  },
  {
    id: "hfdt",
    domain: "Personality",
    title: "HFDT (Human Figure Drawing Test) Clinical Evaluation",
    breadcrumb: "Personality > Projective Drawings > HFDT Clinical",
    description: "Clinical evaluation of human figure drawings analyzing developmental emotional indicators, subconscious anxiety, body perception, and interpersonal defensiveness.",
    whoCanTake: "Children, Teens & Adults (All Ages)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 1999,
    priceUSD: 25,
    duration: "45 Mins Practitioner Session",
    includes: [
      "1-on-1 Guided Drawing Intake & Inquiry",
      "Koppitz Emotional Indicator Analysis",
      "Formal Diagnostic Body Image & Ego Maturity Report",
      "Therapeutic Integration Recommendations"
]  },
  {
    id: "moca-style",
    domain: "Cognitive & Memory",
    title: "MoCA-Style Cognitive Orientation & Memory Screener",
    breadcrumb: "Cognitive & Memory > Screening > MoCA-Style",
    description: "Screens orientation to time/place, working memory, executive naming, and mental flexibility.",
    whoCanTake: "Adults & Seniors (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Frequent Difficulty (0)","Occasional Slip (1)","Good Control (2)","Flawless Performance (3)"],
    questions: [
      "Know the exact date, day, month, and current setting without hesitation?",
      "Can remember 3 unrelated words (e.g., Silk, Church, Red) after 5 minutes of distraction?",
      "Can count backward from 100 by 7s (100, 93, 86...) or spell a 5-letter word backward?",
      "Quickly name common everyday objects without searching for words?",
      "Can follow a multi-step sequential instruction without error?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,11];
      const lb = ["Elevated Cognitive Impairment Indicator","Mild Cognitive Fatigue / Gaps","Normal Cognitive Function"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "brain-fog",
    domain: "Cognitive & Memory",
    title: "Brain Fog & Cognitive Exhaustion Scale",
    breadcrumb: "Cognitive & Memory > Symptoms > Brain Fog",
    description: "Evaluates neuro-attentional sluggishness, mental clouding, word-finding pauses, and sensory fatigue.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","Rarely","Frequently","Almost Daily"],
    questions: [
      "Do you feel a cloudy sensation in your mind making clear thinking difficult?",
      "Do you frequently lose your train of thought in the middle of a sentence?",
      "Do you struggle to switch attention between two simple daily tasks?",
      "Does mental effort leave you physically drained by afternoon?",
      "Do bright lights or loud noises make it harder to process information?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9];
      const lb = ["Optimal Mental Clarity","Moderate Cognitive Fatigue","High Brain Fog & Neuro-Exhaustion"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "subjective-memory",
    domain: "Cognitive & Memory",
    title: "Subjective Memory Complaints Questionnaire",
    breadcrumb: "Cognitive & Memory > Everyday Memory > SMC",
    description: "Measures everyday memory slips, misplacing items, forgetting appointments, and recall delays.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","Rarely","Sometimes","Often"],
    questions: [
      "Do you forget where you put familiar items like keys, phone, or glasses?",
      "Do you forget names of people you have met recently?",
      "Do you enter a room and forget what you went in there for?",
      "Do you find yourself repeating the same story or question to someone?",
      "Do you need to write down things that you used to remember easily?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Normal Everyday Memory","Mild Memory Lapses","Noticeable Memory Difficulty"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "wais-iv",
    domain: "Cognitive & Memory",
    title: "WAIS-IV / MISIC Comprehensive Intelligence & Cognitive Battery",
    breadcrumb: "Cognitive & Memory > Standardized IQ > WAIS-IV",
    description: "The premier standardized clinical intelligence battery measuring Verbal Comprehension (VCI), Perceptual Reasoning (PRI), Working Memory (WMI), and Processing Speed (PSI).",
    whoCanTake: "Ages 6 to 16 (MISIC) & Ages 16+ (WAIS-IV)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 4999,
    priceUSD: 65,
    duration: "120 Mins Comprehensive Testing Session",
    includes: [
      "Full Standardized Subtest Battery Administration by Manish Garg",
      "Full-Scale IQ (FSIQ) and 4 Cognitive Index Scores Calculation",
      "Detailed 8-Page Clinical Psychometric Report",
      "Academic, Career & Cognitive Rehabilitation Roadmap"
]  },
  {
    id: "bender-gestalt",
    domain: "Cognitive & Memory",
    title: "Bender Visual-Motor Gestalt Test II",
    breadcrumb: "Cognitive & Memory > Neuropsychological > Bender-Gestalt",
    description: "Neuropsychological visual-motor integration assessment screening for developmental maturity, visual-spatial perception deficits, and organic brain function.",
    whoCanTake: "Children (Ages 4+) & Adults",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2999,
    priceUSD: 39,
    duration: "45 Mins Clinical Evaluation",
    includes: [
      "1-on-1 Standardized Card Reproduction Administration",
      "Pascall-Suttell / Koppitz Developmental Scoring",
      "Neuropsychological Visual-Motor Integration Report",
      "Cognitive Support & Educational Recommendations"
]  },
  {
    id: "asrs-v1",
    domain: "ADHD & Focus",
    title: "ASRS-v1.1 (WHO Adult ADHD Self-Report Screener)",
    breadcrumb: "ADHD & Focus > Inattention > ASRS-v1.1",
    description: "World Health Organization 6-item screening tool for executive dysfunction, task initiation delays, disorganization, and motor restlessness.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never / Rarely","Sometimes","Often","Very Often"],
    questions: [
      "How often do you have trouble wrapping up the final details of a project?",
      "How often do you have difficulty getting things in order when tasks require organization?",
      "How often do you have problems remembering appointments or daily obligations?",
      "When you have a task that requires sustained mental focus, how often do you avoid or delay starting?",
      "How often do you fidget or squirm with your hands or feet when sitting?",
      "How often do you feel overly active and compelled to do things as if driven by a motor?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [8,13];
      const lb = ["Low ADHD Likelihood","Moderate Executive Inattention","High ADHD Symptom Profile"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 18, level, badge };
    }
  },
  {
    id: "procrastination-scale",
    domain: "ADHD & Focus",
    title: "Procrastination & Volition Scale",
    breadcrumb: "ADHD & Focus > Volition > Procrastination",
    description: "Measures chronic avoidance of essential tasks, last-minute rushing, and paralysis by perfectionism.",
    whoCanTake: "Students & Working Adults",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "I delay starting tasks that I know are important to my long-term goals.",
      "I waste time on trivial activities when I should be working on deadlines.",
      "I often find myself scrambling at the last minute to finish commitments.",
      "I tell myself 'I will do it tomorrow' even when I have time right now.",
      "My tendency to delay causes me substantial personal stress and guilt."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [5,10];
      const lb = ["High Volitional Control","Moderate Procrastination Tendencies","Severe Chronic Procrastination"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "conners-adhd",
    domain: "ADHD & Focus",
    title: "Conners Adult ADHD Diagnostic Battery (CAARS)",
    breadcrumb: "ADHD & Focus > Clinical Evaluation > CAARS",
    description: "Standardized clinician-administered diagnostic assessment measuring Inattention/Memory Problems, Hyperactivity/Restlessness, Impulsivity/Emotional Lability, and Self-Concept.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2499,
    priceUSD: 30,
    duration: "60 Mins Diagnostic Evaluation",
    includes: [
      "Full Conners Adult ADHD Rating Scale (CAARS) Administration",
      "Standardized DSM-5 Diagnostic Criteria Mapping",
      "Comprehensive Formal Diagnostic Assessment Report",
      "Executive Function Coaching & Psychiatric Referral Guidance"
]  },
  {
    id: "aq-10",
    domain: "Autism & Neurodiversity",
    title: "AQ-10 (Autism Spectrum Quotient 10-Item Screener)",
    breadcrumb: "Autism & Neurodiversity > Spectrum > AQ-10",
    description: "NICE-recommended clinical screener evaluating social communication patterns, sensory details, and hyperfocus routines.",
    whoCanTake: "Teens & Adults (Ages 16+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Definitely Disagree","Slightly Disagree","Slightly Agree","Definitely Agree"],
    questions: [
      "I often notice small sounds or visual patterns that others do not.",
      "I usually focus more on the big picture rather than small details.",
      "I find it easy to do more than one thing at once.",
      "If there is an interruption, I can return to what I was doing very quickly.",
      "I find it easy to 'read between the lines' when someone is talking to me.",
      "I know how to tell if someone listening to me is getting bored.",
      "When I read a story, I find it difficult to figure out the characters' intentions.",
      "I like to collect information about categories of things.",
      "I find it easy to work out what someone is thinking just by looking at their face.",
      "I find it difficult to make new friends."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [10,18];
      const lb = ["Low Autism Trait Profile","Moderate Neurodiverse Profile","Significant Autistic Traits (Clinical Referral Advised)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 30, level, badge };
    }
  },
  {
    id: "hsp-scale",
    domain: "Autism & Neurodiversity",
    title: "HSP (Highly Sensitive Person Sensory Processing Scale)",
    breadcrumb: "Autism & Neurodiversity > Sensory > HSP Scale",
    description: "Evaluates sensory processing sensitivity, emotional depth, sensitivity to loud stimuli, and need for quiet retreat.",
    whoCanTake: "All Ages (12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all","Slightly","Moderately","Extremely"],
    questions: [
      "Are you easily overwhelmed by strong sensory input like bright lights or loud noises?",
      "Do you seem to be aware of subtleties in your environment that others miss?",
      "Do other people's moods deeply affect your emotional state?",
      "Do you have a rich, complex inner life and deep emotional reactions to art?",
      "Do you need to withdraw into a quiet, darkened room after a busy day?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9];
      const lb = ["Low Sensory Sensitivity","Moderate Sensory Awareness","Highly Sensitive Person (HSP)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "ados-2",
    domain: "Autism & Neurodiversity",
    title: "ADOS-2 (Autism Diagnostic Observation Schedule Battery)",
    breadcrumb: "Autism & Neurodiversity > Clinical Diagnosis > ADOS-2",
    description: "The international gold-standard standardized semi-structured observation assessment for autism spectrum diagnosis, evaluating social interaction, communication, and restricted interests.",
    whoCanTake: "Toddlers, Children, Teens & Adults",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 4999,
    priceUSD: 65,
    duration: "90 Mins Diagnostic Observation & Clinical Interview",
    includes: [
      "Module-Specific ADOS-2 Standardized Protocol Administration",
      "Social Affect (SA) and Restricted Repetitive Behavior (RRB) Scoring",
      "Formal Comprehensive Diagnostic Classification Report",
      "Post-Assessment Neurodiversity Affirming Support & Workplace Plan"
]  },
  {
    id: "pq-b",
    domain: "Schizophrenia & Psychosis",
    title: "PQ-B (Prodromal Questionnaire - Brief Psychosis Screener)",
    breadcrumb: "Schizophrenia & Psychosis > Early Risk > PQ-B",
    description: "Screens for early perceptual shifts, unusual sounds or shadows, ideas of reference, and ungrounded suspicions.",
    whoCanTake: "Teens & Adults (Ages 15+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Never","Rarely","Occasionally","Frequently"],
    questions: [
      "Have you seen things that other people could not see, like shadows or figures?",
      "Have you heard unusual sounds, murmurs, or whispers when nobody was around?",
      "Do you ever feel like people on TV or online are referring specifically to you?",
      "Do familiar places or people suddenly feel strangely altered, unreal, or robotic?",
      "Do thoughts ever feel so loud in your head that it seems others might hear them?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3,7];
      const lb = ["Low Perceptual Distortion Risk","Moderate Sensory Sensitivity","Elevated Perceptual Shift (Clinical Evaluation Advised)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "panss",
    domain: "Schizophrenia & Psychosis",
    title: "PANSS (Positive and Negative Syndrome Scale Clinical Interview)",
    breadcrumb: "Schizophrenia & Psychosis > Clinical Evaluation > PANSS",
    description: "Standardized 30-item clinical interview evaluating positive symptoms (delusions, hallucinations), negative symptoms (blunted affect, social withdrawal), and general psychopathology.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2999,
    priceUSD: 39,
    duration: "60 Mins Structured Clinical Interview",
    includes: [
      "30-Item Structured PANSS Clinical Interview with Manish Garg",
      "Positive, Negative, and General Psychopathology Index Scoring",
      "Formal Clinical Symptom Severity Profile",
      "Psychiatric Referral & Multidisciplinary Management Roadmap"
]  },
  {
    id: "cage-substance",
    domain: "Substance Use & Addictions",
    title: "CAGE & DAST Substance Screening Inventory",
    breadcrumb: "Substance Use & Addictions > Screener > CAGE",
    description: "Screens for substance misuse, loss of control, interpersonal criticism, guilt, and morning reliance.",
    whoCanTake: "Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["No (0)","Rarely (1)","Sometimes (2)","Yes, Definitely (3)"],
    questions: [
      "Have you ever felt you ought to Cut down on your alcohol or substance use?",
      "Have people Annoyed you by criticizing your drinking or substance habits?",
      "Have you ever felt Bad or Guilty about things you did while using?",
      "Have you ever used a substance first thing in the morning (Eye-opener) to steady nerves?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [2,6];
      const lb = ["Low Dependence Risk","Moderate Misuse Indicator","High Dependence Risk"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 12, level, badge };
    }
  },
  {
    id: "digital-addiction",
    domain: "Substance Use & Addictions",
    title: "Smartphone & Digital Screen Dependency Scale",
    breadcrumb: "Substance Use & Addictions > Behavioral > Digital Screen",
    description: "Evaluates compulsive screen-checking, anxiety when separated from your phone, and interference with real-world relationships.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree","Slightly Agree","Moderately Agree","Strongly Agree"],
    questions: [
      "I check my phone first thing when waking up and last thing before sleeping.",
      "I feel restless, anxious, or irritable when separated from my phone.",
      "I spend more time on social media or games than I originally planned.",
      "Screen time has interfered with my sleep, exercise, or real-life conversations.",
      "I have tried unsuccessfully to cut down my daily screen time."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,9];
      const lb = ["Healthy Digital Balance","Moderate Screen Dependency","High Digital Compulsion"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "motivation-scale",
    domain: "Motivation & Self-Growth",
    title: "Academic & Work Motivation Scale (AMS)",
    breadcrumb: "Motivation & Self-Growth > Drive > Motivation Scale",
    description: "Measures intrinsic curiosity, external reward orientation, and amotivation across career and personal development.",
    whoCanTake: "Students & Working Professionals",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "I pursue projects because I enjoy the process of learning and mastering skills.",
      "I am motivated primarily by external recognition, grades, or financial compensation.",
      "I feel deep personal satisfaction when overcoming complex intellectual challenges.",
      "I often feel like I am working hard without knowing why or what the end purpose is.",
      "I set clear learning milestones to stretch my capabilities."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [10];
      const lb = ["Mixed Motivation / External Reliance","High Intrinsic Drive & Purpose"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "grit-scale",
    domain: "Motivation & Self-Growth",
    title: "Short Grit & Perseverance Scale",
    breadcrumb: "Motivation & Self-Growth > Perseverance > Grit Scale",
    description: "Measures passion and perseverance for long-term goals despite obstacles, plateaus, and discouragement.",
    whoCanTake: "All Ages (12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not like me at all","Somewhat like me","Mostly like me","Very much like me"],
    questions: [
      "New ideas and projects sometimes distract me from previous ones.",
      "Setbacks don't discourage me; I don't give up easily.",
      "I am a hard worker and finish whatever I begin.",
      "I have achieved a goal that took years of consistent work.",
      "I maintain focus on projects that take more than a few months to complete."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,10];
      const lb = ["Easily Diverted / Low Grit","Moderate Perseverance","High Grit & Tenacity"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "rses-10",
    domain: "Self-Concept & Identity",
    title: "RSES (Rosenberg Self-Esteem Scale)",
    breadcrumb: "Self-Concept & Identity > Self-Worth > RSES",
    description: "The global benchmark 10-item instrument assessing core self-worth, self-respect, and self-acceptance.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Strongly Disagree","Disagree","Agree","Strongly Agree"],
    questions: [
      "I feel that I am a person of worth, at least on an equal plane with others.",
      "I feel that I have a number of good qualities.",
      "All in all, I am inclined to feel that I am a failure.",
      "I am able to do things as well as most other people.",
      "I feel I do not have much to be proud of.",
      "I take a positive attitude toward myself.",
      "On the whole, I am satisfied with myself.",
      "I wish I could have more respect for myself.",
      "I certainly feel useless at times.",
      "At times I think I am no good at all."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [11,19];
      const lb = ["Low Self-Worth & Self-Doubt","Moderate Self-Esteem","High Healthy Self-Esteem"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 30, level, badge };
    }
  },
  {
    id: "self-concept-clarity",
    domain: "Self-Concept & Identity",
    title: "Self-Concept Clarity & Agency Scale",
    breadcrumb: "Self-Concept & Identity > Clarity > SCCS",
    description: "Evaluates the stability and certainty of your personal identity, core beliefs, and values across social roles.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "My beliefs about myself often change rapidly depending on who I am with.",
      "I feel confident in my ability to handle unexpected life challenges.",
      "In general, I have a clear sense of who I am and what I stand for.",
      "When I make plans, I am certain I can carry them through to completion."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [8];
      const lb = ["Fluctuating Identity & Self-Doubt","High Self-Concept Clarity & Inner Agency"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 12, level, badge };
    }
  },
  {
    id: "attachment-ecr",
    domain: "Relationships & Attachment",
    title: "ECR-Short (Adult Attachment Style Screener)",
    breadcrumb: "Relationships & Attachment > Attachment > ECR-Short",
    description: "Measures attachment anxiety (fear of abandonment) and attachment avoidance (fear of emotional vulnerability).",
    whoCanTake: "Teens & Adults (Ages 15+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Disagree Strongly","Disagree","Agree","Agree Strongly"],
    questions: [
      "I worry that romantic partners or close friends will leave me.",
      "I prefer not to show a partner how I feel deep down.",
      "I want to get very close, but fear being hurt or rejected.",
      "I feel comfortable depending on romantic partners.",
      "I worry that I care more about others than they care about me."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [5,10];
      const lb = ["Secure Attachment Profile","Anxious-Preoccupied Attachment Tendencies","High Attachment Insecurity / Avoidance"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "relationship-satisfaction",
    domain: "Relationships & Attachment",
    title: "Relationship Health & Satisfaction Index",
    breadcrumb: "Relationships & Attachment > Couple Health > Satisfaction",
    description: "Evaluates emotional closeness, mutual respect, communication safety, and alignment in romantic relationships.",
    whoCanTake: "Couples & Adults (Ages 18+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Unsatisfied","Somewhat Satisfied","Mostly Satisfied","Very Satisfied"],
    questions: [
      "How satisfied are you with the level of emotional closeness in your relationship?",
      "How well do you and your partner resolve disagreements without hostility?",
      "How respected do you feel when voicing your personal needs?",
      "How aligned are you on major lifestyle, financial, and future decisions?",
      "How safe do you feel sharing your most vulnerable feelings with your partner?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [6,11];
      const lb = ["Relationship Distress / Vulnerability","Moderate Satisfaction (Growth Areas)","Thriving & Secure Relationship"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "sdq-short",
    domain: "Children & Adolescents",
    title: "SDQ (Strengths & Difficulties Screener for Youth)",
    breadcrumb: "Children & Adolescents > Emotional Health > SDQ",
    description: "Screens for emotional symptoms, conduct problems, hyperactivity, and peer relationship dynamics in children and teens.",
    whoCanTake: "Parents, Teachers & Teens (Ages 8-17)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not True","Somewhat True","Certainly True"],
    questions: [
      "Often complains of headaches, stomach-aches, or sickness when stressed.",
      "Many worries or often seems worried.",
      "Constantly fidgeting, squirming, or restless.",
      "Easily distracted, finds it difficult to concentrate.",
      "Gets on better with adults than with other young people."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3,6];
      const lb = ["Close to Average (Normal Range)","Slightly Elevated Difficulty","High Difficulties (Evaluation Recommended)"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 10, level, badge };
    }
  },
  {
    id: "cat-child",
    domain: "Children & Adolescents",
    title: "CAT (Children's Apperception Test Projective Battery)",
    breadcrumb: "Children & Adolescents > Projective Assessment > CAT",
    description: "Child projective assessment for ages 3 to 10 using standardized animal picture cards to evaluate developmental anxieties, sibling rivalry, parental attachment, and emotional conflicts.",
    whoCanTake: "Children (Ages 3-10)",
    administration: "Practitioner-Administered (Paid)",
    isPaid: true,
    priceINR: 2499,
    priceUSD: 30,
    duration: "60 Mins Play/Story Session",
    includes: [
      "1-on-1 Child Storytelling Session with Manish Garg",
      "Standardized Developmental Conflict & Ego Defense Coding",
      "In-Depth Parent Feedback Consultation",
      "Child Emotional Wellbeing & Therapy Roadmap"
]  },
  {
    id: "grapho-pressure",
    domain: "Graphotherapy & Handwriting",
    title: "Heavy Pen Pressure & Emotional Tension Check",
    breadcrumb: "Graphotherapy & Handwriting > Tension > Pen Pressure",
    description: "Analyzes indentation depth, ink stroke weight, and subconscious emotional retention in physical writing strokes.",
    whoCanTake: "All Ages (10+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Rarely / Never","Occasionally","Frequently","Strongly Yes"],
    questions: [
      "Does your handwriting leave deep grooves felt on the back of the paper?",
      "Do you press so hard that ballpoint tips break or wrists cramp after one page?",
      "Do you hold onto past grievances or arguments for a long period?",
      "Do you feel physical muscle tightness in your neck, jaw, or shoulders when writing?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3];
      const lb = ["Balanced Pressure Stroke","High Physical Pressure & Emotional Retention"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 12, level, badge };
    }
  },
  {
    id: "grapho-tbar",
    domain: "Graphotherapy & Handwriting",
    title: "Letter 't' Bar Elevation & Goal Ambition Check",
    breadcrumb: "Graphotherapy & Handwriting > Ambition > t-Bar Check",
    description: "Examines the height of your lowercase 't' crossbars to evaluate self-worth, ambition, and fear of failure.",
    whoCanTake: "All Ages (10+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["No / High Crossings","Slightly Low","Noticeably Low","Extremely Low Crossings"],
    questions: [
      "Are your 't' bars crossed near the bottom half of the stem?",
      "Do you frequently hesitate to set ambitious personal or career goals?",
      "Do you feel your achievements never quite reflect your true potential?",
      "Are your 't' bars faint, weak, or uncrossed entirely?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3];
      const lb = ["High Goal Ambition Trait","Low Goal Elevation & Self-Doubt Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 12, level, badge };
    }
  },
  {
    id: "grapho-slant",
    domain: "Graphotherapy & Handwriting",
    title: "Emotional Slant & Expressiveness Analysis",
    breadcrumb: "Graphotherapy & Handwriting > Slant > Expressiveness",
    description: "Analyzes rightward, vertical, or leftward letter slope to identify emotional reserve vs. demonstrative expression.",
    whoCanTake: "All Ages (10+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Vertical / Balanced","Slight Right Slant","Extreme Right Slant","Leftward Slant"],
    questions: [
      "Does your handwriting lean heavily to the right (>45 degrees)?",
      "Do you react impulsively when your feelings are hurt?",
      "Do you find it hard to hide your emotional reactions from others?",
      "Do you make quick decisions based on immediate gut feelings rather than cold logic?"
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [3];
      const lb = ["Balanced Emotional Expression","High Emotional Expressiveness / Impulsive Reaction"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 12, level, badge };
    }
  },
  {
    id: "scale_301",
    domain: "Anxiety",
    title: "Panic Triggers Scale #1",
    breadcrumb: "Anxiety > Panic Triggers > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring panic triggers indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice panic triggers indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with panic triggers.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_302",
    domain: "Anxiety",
    title: "Panic Triggers Scale #2",
    breadcrumb: "Anxiety > Panic Triggers > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring panic triggers indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice panic triggers indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with panic triggers.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_303",
    domain: "Anxiety",
    title: "Anticipatory Worry Scale #1",
    breadcrumb: "Anxiety > Anticipatory Worry > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring anticipatory worry indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice anticipatory worry indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with anticipatory worry.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_304",
    domain: "Anxiety",
    title: "Anticipatory Worry Scale #2",
    breadcrumb: "Anxiety > Anticipatory Worry > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring anticipatory worry indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice anticipatory worry indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with anticipatory worry.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_305",
    domain: "Anxiety",
    title: "Agoraphobic Avoidance Scale #1",
    breadcrumb: "Anxiety > Agoraphobic Avoidance > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring agoraphobic avoidance indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice agoraphobic avoidance indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with agoraphobic avoidance.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_306",
    domain: "Anxiety",
    title: "Agoraphobic Avoidance Scale #2",
    breadcrumb: "Anxiety > Agoraphobic Avoidance > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring agoraphobic avoidance indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice agoraphobic avoidance indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with agoraphobic avoidance.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_307",
    domain: "Anxiety",
    title: "Somatic Tension Scale #1",
    breadcrumb: "Anxiety > Somatic Tension > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring somatic tension indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice somatic tension indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with somatic tension.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_308",
    domain: "Anxiety",
    title: "Somatic Tension Scale #2",
    breadcrumb: "Anxiety > Somatic Tension > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring somatic tension indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice somatic tension indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with somatic tension.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_309",
    domain: "Depression & Mood",
    title: "Seasonal Affective Scale #1",
    breadcrumb: "Depression & Mood > Seasonal Affective > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring seasonal affective indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice seasonal affective indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with seasonal affective.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_310",
    domain: "Depression & Mood",
    title: "Seasonal Affective Scale #2",
    breadcrumb: "Depression & Mood > Seasonal Affective > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring seasonal affective indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice seasonal affective indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with seasonal affective.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_311",
    domain: "Depression & Mood",
    title: "Vitality & Energy Scale #1",
    breadcrumb: "Depression & Mood > Vitality & Energy > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring vitality & energy indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice vitality & energy indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with vitality & energy.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_312",
    domain: "Depression & Mood",
    title: "Vitality & Energy Scale #2",
    breadcrumb: "Depression & Mood > Vitality & Energy > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring vitality & energy indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice vitality & energy indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with vitality & energy.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_313",
    domain: "Depression & Mood",
    title: "Dysthymic Tendency Scale #1",
    breadcrumb: "Depression & Mood > Dysthymic Tendency > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring dysthymic tendency indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice dysthymic tendency indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with dysthymic tendency.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_314",
    domain: "Depression & Mood",
    title: "Dysthymic Tendency Scale #2",
    breadcrumb: "Depression & Mood > Dysthymic Tendency > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring dysthymic tendency indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice dysthymic tendency indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with dysthymic tendency.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_315",
    domain: "Depression & Mood",
    title: "Emotional Numbness Scale #1",
    breadcrumb: "Depression & Mood > Emotional Numbness > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring emotional numbness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional numbness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional numbness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_316",
    domain: "Depression & Mood",
    title: "Emotional Numbness Scale #2",
    breadcrumb: "Depression & Mood > Emotional Numbness > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring emotional numbness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional numbness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional numbness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_317",
    domain: "Stress & Burnout",
    title: "Compassion Fatigue Scale #1",
    breadcrumb: "Stress & Burnout > Compassion Fatigue > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring compassion fatigue indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice compassion fatigue indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with compassion fatigue.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_318",
    domain: "Stress & Burnout",
    title: "Compassion Fatigue Scale #2",
    breadcrumb: "Stress & Burnout > Compassion Fatigue > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring compassion fatigue indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice compassion fatigue indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with compassion fatigue.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_319",
    domain: "Stress & Burnout",
    title: "Executive Overwhelm Scale #1",
    breadcrumb: "Stress & Burnout > Executive Overwhelm > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring executive overwhelm indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice executive overwhelm indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with executive overwhelm.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_320",
    domain: "Stress & Burnout",
    title: "Executive Overwhelm Scale #2",
    breadcrumb: "Stress & Burnout > Executive Overwhelm > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring executive overwhelm indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice executive overwhelm indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with executive overwhelm.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_321",
    domain: "Stress & Burnout",
    title: "Sleep-Stress Index Scale #1",
    breadcrumb: "Stress & Burnout > Sleep-Stress Index > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring sleep-stress index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sleep-stress index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sleep-stress index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_322",
    domain: "Stress & Burnout",
    title: "Sleep-Stress Index Scale #2",
    breadcrumb: "Stress & Burnout > Sleep-Stress Index > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring sleep-stress index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sleep-stress index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sleep-stress index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_323",
    domain: "Stress & Burnout",
    title: "Workload Recovery Scale #1",
    breadcrumb: "Stress & Burnout > Workload Recovery > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring workload recovery indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice workload recovery indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with workload recovery.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_324",
    domain: "Stress & Burnout",
    title: "Workload Recovery Scale #2",
    breadcrumb: "Stress & Burnout > Workload Recovery > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring workload recovery indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice workload recovery indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with workload recovery.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_325",
    domain: "Trauma & PTSD",
    title: "Trigger Sensitivity Scale #1",
    breadcrumb: "Trauma & PTSD > Trigger Sensitivity > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring trigger sensitivity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice trigger sensitivity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with trigger sensitivity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_326",
    domain: "Trauma & PTSD",
    title: "Trigger Sensitivity Scale #2",
    breadcrumb: "Trauma & PTSD > Trigger Sensitivity > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring trigger sensitivity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice trigger sensitivity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with trigger sensitivity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_327",
    domain: "Trauma & PTSD",
    title: "Somatic Hyperarousal Scale #1",
    breadcrumb: "Trauma & PTSD > Somatic Hyperarousal > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring somatic hyperarousal indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice somatic hyperarousal indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with somatic hyperarousal.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_328",
    domain: "Trauma & PTSD",
    title: "Somatic Hyperarousal Scale #2",
    breadcrumb: "Trauma & PTSD > Somatic Hyperarousal > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring somatic hyperarousal indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice somatic hyperarousal indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with somatic hyperarousal.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_329",
    domain: "Trauma & PTSD",
    title: "Dissociative Tendency Scale #1",
    breadcrumb: "Trauma & PTSD > Dissociative Tendency > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring dissociative tendency indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice dissociative tendency indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with dissociative tendency.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_330",
    domain: "Trauma & PTSD",
    title: "Dissociative Tendency Scale #2",
    breadcrumb: "Trauma & PTSD > Dissociative Tendency > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring dissociative tendency indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice dissociative tendency indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with dissociative tendency.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_331",
    domain: "Trauma & PTSD",
    title: "Safety Appraisal Scale #1",
    breadcrumb: "Trauma & PTSD > Safety Appraisal > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring safety appraisal indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice safety appraisal indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with safety appraisal.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_332",
    domain: "Trauma & PTSD",
    title: "Safety Appraisal Scale #2",
    breadcrumb: "Trauma & PTSD > Safety Appraisal > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring safety appraisal indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice safety appraisal indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with safety appraisal.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_333",
    domain: "Personality",
    title: "Assertiveness Profile Scale #1",
    breadcrumb: "Personality > Assertiveness Profile > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring assertiveness profile indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice assertiveness profile indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with assertiveness profile.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_334",
    domain: "Personality",
    title: "Assertiveness Profile Scale #2",
    breadcrumb: "Personality > Assertiveness Profile > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring assertiveness profile indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice assertiveness profile indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with assertiveness profile.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_335",
    domain: "Personality",
    title: "Perfectionism Index Scale #1",
    breadcrumb: "Personality > Perfectionism Index > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring perfectionism index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice perfectionism index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with perfectionism index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_336",
    domain: "Personality",
    title: "Perfectionism Index Scale #2",
    breadcrumb: "Personality > Perfectionism Index > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring perfectionism index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice perfectionism index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with perfectionism index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_337",
    domain: "Personality",
    title: "Emotional Boundary Scale Scale #1",
    breadcrumb: "Personality > Emotional Boundary Scale > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring emotional boundary scale indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional boundary scale indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional boundary scale.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_338",
    domain: "Personality",
    title: "Emotional Boundary Scale Scale #2",
    breadcrumb: "Personality > Emotional Boundary Scale > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring emotional boundary scale indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional boundary scale indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional boundary scale.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_339",
    domain: "Personality",
    title: "Social Adaptability Scale #1",
    breadcrumb: "Personality > Social Adaptability > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring social adaptability indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social adaptability indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social adaptability.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_340",
    domain: "Personality",
    title: "Social Adaptability Scale #2",
    breadcrumb: "Personality > Social Adaptability > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring social adaptability indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social adaptability indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social adaptability.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_341",
    domain: "Cognitive & Memory",
    title: "Attentional Control Scale #1",
    breadcrumb: "Cognitive & Memory > Attentional Control > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring attentional control indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice attentional control indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with attentional control.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_342",
    domain: "Cognitive & Memory",
    title: "Attentional Control Scale #2",
    breadcrumb: "Cognitive & Memory > Attentional Control > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring attentional control indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice attentional control indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with attentional control.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_343",
    domain: "Cognitive & Memory",
    title: "Working Memory Retention Scale #1",
    breadcrumb: "Cognitive & Memory > Working Memory Retention > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring working memory retention indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice working memory retention indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with working memory retention.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_344",
    domain: "Cognitive & Memory",
    title: "Working Memory Retention Scale #2",
    breadcrumb: "Cognitive & Memory > Working Memory Retention > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring working memory retention indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice working memory retention indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with working memory retention.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_345",
    domain: "Cognitive & Memory",
    title: "Mental Flexibility Scale #1",
    breadcrumb: "Cognitive & Memory > Mental Flexibility > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring mental flexibility indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice mental flexibility indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with mental flexibility.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_346",
    domain: "Cognitive & Memory",
    title: "Mental Flexibility Scale #2",
    breadcrumb: "Cognitive & Memory > Mental Flexibility > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring mental flexibility indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice mental flexibility indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with mental flexibility.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_347",
    domain: "Cognitive & Memory",
    title: "Multitasking Fatigue Scale #1",
    breadcrumb: "Cognitive & Memory > Multitasking Fatigue > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring multitasking fatigue indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice multitasking fatigue indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with multitasking fatigue.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_348",
    domain: "Cognitive & Memory",
    title: "Multitasking Fatigue Scale #2",
    breadcrumb: "Cognitive & Memory > Multitasking Fatigue > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring multitasking fatigue indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice multitasking fatigue indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with multitasking fatigue.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_349",
    domain: "ADHD & Focus",
    title: "Time Blindness Scale #1",
    breadcrumb: "ADHD & Focus > Time Blindness > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring time blindness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice time blindness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with time blindness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_350",
    domain: "ADHD & Focus",
    title: "Time Blindness Scale #2",
    breadcrumb: "ADHD & Focus > Time Blindness > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring time blindness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice time blindness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with time blindness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_351",
    domain: "ADHD & Focus",
    title: "Task Initiation Barrier Scale #1",
    breadcrumb: "ADHD & Focus > Task Initiation Barrier > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring task initiation barrier indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice task initiation barrier indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with task initiation barrier.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_352",
    domain: "ADHD & Focus",
    title: "Task Initiation Barrier Scale #2",
    breadcrumb: "ADHD & Focus > Task Initiation Barrier > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring task initiation barrier indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice task initiation barrier indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with task initiation barrier.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_353",
    domain: "ADHD & Focus",
    title: "Sensory Distraction Scale #1",
    breadcrumb: "ADHD & Focus > Sensory Distraction > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring sensory distraction indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory distraction indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory distraction.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_354",
    domain: "ADHD & Focus",
    title: "Sensory Distraction Scale #2",
    breadcrumb: "ADHD & Focus > Sensory Distraction > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring sensory distraction indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory distraction indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory distraction.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_355",
    domain: "ADHD & Focus",
    title: "Hyperfocus Pattern Scale #1",
    breadcrumb: "ADHD & Focus > Hyperfocus Pattern > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring hyperfocus pattern indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice hyperfocus pattern indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with hyperfocus pattern.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_356",
    domain: "ADHD & Focus",
    title: "Hyperfocus Pattern Scale #2",
    breadcrumb: "ADHD & Focus > Hyperfocus Pattern > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring hyperfocus pattern indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice hyperfocus pattern indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with hyperfocus pattern.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_357",
    domain: "Autism & Neurodiversity",
    title: "Sensory Overload Screen Scale #1",
    breadcrumb: "Autism & Neurodiversity > Sensory Overload Screen > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring sensory overload screen indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory overload screen indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory overload screen.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_358",
    domain: "Autism & Neurodiversity",
    title: "Sensory Overload Screen Scale #2",
    breadcrumb: "Autism & Neurodiversity > Sensory Overload Screen > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring sensory overload screen indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory overload screen indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory overload screen.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_359",
    domain: "Autism & Neurodiversity",
    title: "Social Masking Index Scale #1",
    breadcrumb: "Autism & Neurodiversity > Social Masking Index > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring social masking index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social masking index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social masking index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_360",
    domain: "Autism & Neurodiversity",
    title: "Social Masking Index Scale #2",
    breadcrumb: "Autism & Neurodiversity > Social Masking Index > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring social masking index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social masking index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social masking index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_361",
    domain: "Autism & Neurodiversity",
    title: "Routine Preference Scale #1",
    breadcrumb: "Autism & Neurodiversity > Routine Preference > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring routine preference indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice routine preference indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with routine preference.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_362",
    domain: "Autism & Neurodiversity",
    title: "Routine Preference Scale #2",
    breadcrumb: "Autism & Neurodiversity > Routine Preference > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring routine preference indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice routine preference indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with routine preference.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_363",
    domain: "Autism & Neurodiversity",
    title: "Interoception Awareness Scale #1",
    breadcrumb: "Autism & Neurodiversity > Interoception Awareness > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring interoception awareness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice interoception awareness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with interoception awareness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_364",
    domain: "Autism & Neurodiversity",
    title: "Interoception Awareness Scale #2",
    breadcrumb: "Autism & Neurodiversity > Interoception Awareness > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring interoception awareness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice interoception awareness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with interoception awareness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_365",
    domain: "Schizophrenia & Psychosis",
    title: "Perceptual Clarity Scale #1",
    breadcrumb: "Schizophrenia & Psychosis > Perceptual Clarity > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring perceptual clarity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice perceptual clarity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with perceptual clarity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_366",
    domain: "Schizophrenia & Psychosis",
    title: "Perceptual Clarity Scale #2",
    breadcrumb: "Schizophrenia & Psychosis > Perceptual Clarity > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring perceptual clarity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice perceptual clarity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with perceptual clarity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_367",
    domain: "Schizophrenia & Psychosis",
    title: "Ideas of Reference Screen Scale #1",
    breadcrumb: "Schizophrenia & Psychosis > Ideas of Reference Screen > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring ideas of reference screen indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice ideas of reference screen indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with ideas of reference screen.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_368",
    domain: "Schizophrenia & Psychosis",
    title: "Ideas of Reference Screen Scale #2",
    breadcrumb: "Schizophrenia & Psychosis > Ideas of Reference Screen > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring ideas of reference screen indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice ideas of reference screen indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with ideas of reference screen.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_369",
    domain: "Schizophrenia & Psychosis",
    title: "Thought Coherence Scale #1",
    breadcrumb: "Schizophrenia & Psychosis > Thought Coherence > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring thought coherence indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice thought coherence indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with thought coherence.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_370",
    domain: "Schizophrenia & Psychosis",
    title: "Thought Coherence Scale #2",
    breadcrumb: "Schizophrenia & Psychosis > Thought Coherence > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring thought coherence indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice thought coherence indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with thought coherence.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_371",
    domain: "Schizophrenia & Psychosis",
    title: "Sensory Grounding Scale #1",
    breadcrumb: "Schizophrenia & Psychosis > Sensory Grounding > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring sensory grounding indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory grounding indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory grounding.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_372",
    domain: "Schizophrenia & Psychosis",
    title: "Sensory Grounding Scale #2",
    breadcrumb: "Schizophrenia & Psychosis > Sensory Grounding > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring sensory grounding indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice sensory grounding indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with sensory grounding.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_373",
    domain: "Substance Use & Addictions",
    title: "Craving Severity Scale #1",
    breadcrumb: "Substance Use & Addictions > Craving Severity > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring craving severity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice craving severity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with craving severity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_374",
    domain: "Substance Use & Addictions",
    title: "Craving Severity Scale #2",
    breadcrumb: "Substance Use & Addictions > Craving Severity > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring craving severity indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice craving severity indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with craving severity.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_375",
    domain: "Substance Use & Addictions",
    title: "Behavioral Compulsion Scale #1",
    breadcrumb: "Substance Use & Addictions > Behavioral Compulsion > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring behavioral compulsion indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice behavioral compulsion indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with behavioral compulsion.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_376",
    domain: "Substance Use & Addictions",
    title: "Behavioral Compulsion Scale #2",
    breadcrumb: "Substance Use & Addictions > Behavioral Compulsion > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring behavioral compulsion indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice behavioral compulsion indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with behavioral compulsion.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_377",
    domain: "Substance Use & Addictions",
    title: "Social Trigger Awareness Scale #1",
    breadcrumb: "Substance Use & Addictions > Social Trigger Awareness > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring social trigger awareness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social trigger awareness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social trigger awareness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_378",
    domain: "Substance Use & Addictions",
    title: "Social Trigger Awareness Scale #2",
    breadcrumb: "Substance Use & Addictions > Social Trigger Awareness > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring social trigger awareness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice social trigger awareness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with social trigger awareness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_379",
    domain: "Substance Use & Addictions",
    title: "Recovery Self-Efficacy Scale #1",
    breadcrumb: "Substance Use & Addictions > Recovery Self-Efficacy > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring recovery self-efficacy indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice recovery self-efficacy indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with recovery self-efficacy.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_380",
    domain: "Substance Use & Addictions",
    title: "Recovery Self-Efficacy Scale #2",
    breadcrumb: "Substance Use & Addictions > Recovery Self-Efficacy > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring recovery self-efficacy indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice recovery self-efficacy indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with recovery self-efficacy.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_381",
    domain: "Motivation & Self-Growth",
    title: "Goal Setting Horizon Scale #1",
    breadcrumb: "Motivation & Self-Growth > Goal Setting Horizon > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring goal setting horizon indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice goal setting horizon indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with goal setting horizon.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_382",
    domain: "Motivation & Self-Growth",
    title: "Goal Setting Horizon Scale #2",
    breadcrumb: "Motivation & Self-Growth > Goal Setting Horizon > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring goal setting horizon indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice goal setting horizon indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with goal setting horizon.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_383",
    domain: "Motivation & Self-Growth",
    title: "Resilience Under Plateau Scale #1",
    breadcrumb: "Motivation & Self-Growth > Resilience Under Plateau > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring resilience under plateau indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice resilience under plateau indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with resilience under plateau.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_384",
    domain: "Motivation & Self-Growth",
    title: "Resilience Under Plateau Scale #2",
    breadcrumb: "Motivation & Self-Growth > Resilience Under Plateau > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring resilience under plateau indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice resilience under plateau indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with resilience under plateau.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_385",
    domain: "Motivation & Self-Growth",
    title: "Action Orientation Scale #1",
    breadcrumb: "Motivation & Self-Growth > Action Orientation > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring action orientation indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice action orientation indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with action orientation.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_386",
    domain: "Motivation & Self-Growth",
    title: "Action Orientation Scale #2",
    breadcrumb: "Motivation & Self-Growth > Action Orientation > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring action orientation indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice action orientation indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with action orientation.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_387",
    domain: "Motivation & Self-Growth",
    title: "Autonomy & Mastery Scale #1",
    breadcrumb: "Motivation & Self-Growth > Autonomy & Mastery > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring autonomy & mastery indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice autonomy & mastery indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with autonomy & mastery.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_388",
    domain: "Motivation & Self-Growth",
    title: "Autonomy & Mastery Scale #2",
    breadcrumb: "Motivation & Self-Growth > Autonomy & Mastery > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring autonomy & mastery indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice autonomy & mastery indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with autonomy & mastery.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_389",
    domain: "Self-Concept & Identity",
    title: "Imposter Syndrome Scale #1",
    breadcrumb: "Self-Concept & Identity > Imposter Syndrome > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring imposter syndrome indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice imposter syndrome indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with imposter syndrome.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_390",
    domain: "Self-Concept & Identity",
    title: "Imposter Syndrome Scale #2",
    breadcrumb: "Self-Concept & Identity > Imposter Syndrome > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring imposter syndrome indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice imposter syndrome indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with imposter syndrome.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_391",
    domain: "Self-Concept & Identity",
    title: "Body Image Neutrality Scale #1",
    breadcrumb: "Self-Concept & Identity > Body Image Neutrality > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring body image neutrality indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice body image neutrality indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with body image neutrality.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_392",
    domain: "Self-Concept & Identity",
    title: "Body Image Neutrality Scale #2",
    breadcrumb: "Self-Concept & Identity > Body Image Neutrality > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring body image neutrality indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice body image neutrality indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with body image neutrality.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_393",
    domain: "Self-Concept & Identity",
    title: "Self-Compassion Index Scale #1",
    breadcrumb: "Self-Concept & Identity > Self-Compassion Index > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring self-compassion index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice self-compassion index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with self-compassion index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_394",
    domain: "Self-Concept & Identity",
    title: "Self-Compassion Index Scale #2",
    breadcrumb: "Self-Concept & Identity > Self-Compassion Index > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring self-compassion index indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice self-compassion index indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with self-compassion index.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_395",
    domain: "Self-Concept & Identity",
    title: "Value Congruence Scale #1",
    breadcrumb: "Self-Concept & Identity > Value Congruence > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring value congruence indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice value congruence indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with value congruence.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_396",
    domain: "Self-Concept & Identity",
    title: "Value Congruence Scale #2",
    breadcrumb: "Self-Concept & Identity > Value Congruence > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring value congruence indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice value congruence indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with value congruence.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_397",
    domain: "Relationships & Attachment",
    title: "Codependency Check Scale #1",
    breadcrumb: "Relationships & Attachment > Codependency Check > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring codependency check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice codependency check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with codependency check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_398",
    domain: "Relationships & Attachment",
    title: "Codependency Check Scale #2",
    breadcrumb: "Relationships & Attachment > Codependency Check > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring codependency check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice codependency check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with codependency check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_399",
    domain: "Relationships & Attachment",
    title: "Trust Vulnerability Scale #1",
    breadcrumb: "Relationships & Attachment > Trust Vulnerability > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring trust vulnerability indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice trust vulnerability indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with trust vulnerability.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_400",
    domain: "Relationships & Attachment",
    title: "Trust Vulnerability Scale #2",
    breadcrumb: "Relationships & Attachment > Trust Vulnerability > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring trust vulnerability indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice trust vulnerability indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with trust vulnerability.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_401",
    domain: "Relationships & Attachment",
    title: "Conflict De-escalation Scale #1",
    breadcrumb: "Relationships & Attachment > Conflict De-escalation > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring conflict de-escalation indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice conflict de-escalation indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with conflict de-escalation.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_402",
    domain: "Relationships & Attachment",
    title: "Conflict De-escalation Scale #2",
    breadcrumb: "Relationships & Attachment > Conflict De-escalation > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring conflict de-escalation indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice conflict de-escalation indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with conflict de-escalation.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_403",
    domain: "Relationships & Attachment",
    title: "Emotional Boundary Scale #1",
    breadcrumb: "Relationships & Attachment > Emotional Boundary > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring emotional boundary indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional boundary indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional boundary.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_404",
    domain: "Relationships & Attachment",
    title: "Emotional Boundary Scale #2",
    breadcrumb: "Relationships & Attachment > Emotional Boundary > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring emotional boundary indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice emotional boundary indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with emotional boundary.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_405",
    domain: "Children & Adolescents",
    title: "Academic Exam Stress Scale #1",
    breadcrumb: "Children & Adolescents > Academic Exam Stress > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring academic exam stress indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice academic exam stress indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with academic exam stress.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_406",
    domain: "Children & Adolescents",
    title: "Academic Exam Stress Scale #2",
    breadcrumb: "Children & Adolescents > Academic Exam Stress > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring academic exam stress indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice academic exam stress indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with academic exam stress.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_407",
    domain: "Children & Adolescents",
    title: "Peer Pressure Resistance Scale #1",
    breadcrumb: "Children & Adolescents > Peer Pressure Resistance > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring peer pressure resistance indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice peer pressure resistance indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with peer pressure resistance.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_408",
    domain: "Children & Adolescents",
    title: "Peer Pressure Resistance Scale #2",
    breadcrumb: "Children & Adolescents > Peer Pressure Resistance > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring peer pressure resistance indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice peer pressure resistance indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with peer pressure resistance.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_409",
    domain: "Children & Adolescents",
    title: "Family Communication Scale #1",
    breadcrumb: "Children & Adolescents > Family Communication > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring family communication indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice family communication indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with family communication.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_410",
    domain: "Children & Adolescents",
    title: "Family Communication Scale #2",
    breadcrumb: "Children & Adolescents > Family Communication > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring family communication indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice family communication indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with family communication.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_411",
    domain: "Children & Adolescents",
    title: "Digital Wellness Scale #1",
    breadcrumb: "Children & Adolescents > Digital Wellness > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring digital wellness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice digital wellness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with digital wellness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_412",
    domain: "Children & Adolescents",
    title: "Digital Wellness Scale #2",
    breadcrumb: "Children & Adolescents > Digital Wellness > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring digital wellness indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice digital wellness indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with digital wellness.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_413",
    domain: "Graphotherapy & Handwriting",
    title: "Baseline Stability Check Scale #1",
    breadcrumb: "Graphotherapy & Handwriting > Baseline Stability Check > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring baseline stability check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice baseline stability check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with baseline stability check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_414",
    domain: "Graphotherapy & Handwriting",
    title: "Baseline Stability Check Scale #2",
    breadcrumb: "Graphotherapy & Handwriting > Baseline Stability Check > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring baseline stability check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice baseline stability check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with baseline stability check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_415",
    domain: "Graphotherapy & Handwriting",
    title: "Margin Space Trait Scale #1",
    breadcrumb: "Graphotherapy & Handwriting > Margin Space Trait > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring margin space trait indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice margin space trait indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with margin space trait.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_416",
    domain: "Graphotherapy & Handwriting",
    title: "Margin Space Trait Scale #2",
    breadcrumb: "Graphotherapy & Handwriting > Margin Space Trait > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring margin space trait indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice margin space trait indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with margin space trait.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_417",
    domain: "Graphotherapy & Handwriting",
    title: "Lower Zone Loop Check Scale #1",
    breadcrumb: "Graphotherapy & Handwriting > Lower Zone Loop Check > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring lower zone loop check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice lower zone loop check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with lower zone loop check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_418",
    domain: "Graphotherapy & Handwriting",
    title: "Lower Zone Loop Check Scale #2",
    breadcrumb: "Graphotherapy & Handwriting > Lower Zone Loop Check > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring lower zone loop check indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice lower zone loop check indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with lower zone loop check.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_419",
    domain: "Graphotherapy & Handwriting",
    title: "Upper Zone Extension Scale #1",
    breadcrumb: "Graphotherapy & Handwriting > Upper Zone Extension > Scale #1",
    description: "Clinically informed self-administered questionnaire measuring upper zone extension indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice upper zone extension indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with upper zone extension.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  },
  {
    id: "scale_420",
    domain: "Graphotherapy & Handwriting",
    title: "Upper Zone Extension Scale #2",
    breadcrumb: "Graphotherapy & Handwriting > Upper Zone Extension > Scale #2",
    description: "Clinically informed self-administered questionnaire measuring upper zone extension indicators and emotional adaptation.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    administration: "Self-Administered (Free)",
    isPaid: false,
    options: ["Not at all (0)","Sometimes (1)","Often (2)","Almost Always (3)"],
    questions: [
      "I notice upper zone extension indicators when under significant pressure.",
      "This experience sometimes interferes with my daily clarity and calm.",
      "I find it helpful to practice grounding exercises when dealing with upper zone extension.",
      "I am proactive about seeking structured strategies to improve this area.",
      "I would value tailored guidance from Manish Garg to manage this."
],
    scoring: (scores) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      const th = [4,8];
      const lb = ["Minimal Indicator","Moderate Level","High Severity Indicator"];
      let level = lb[lb.length - 1];
      for (let i = 0; i < th.length; i++) {
        if (sum <= th[i]) { level = lb[i]; break; }
      }
      let badge = 'bg-blue-100 text-blue-800';
      if (level.toLowerCase().includes('minimal') || level.toLowerCase().includes('low') || level.toLowerCase().includes('normal') || level.toLowerCase().includes('clear') || level.toLowerCase().includes('thriving')) {
        badge = 'bg-emerald-100 text-emerald-800';
      } else if (level.toLowerCase().includes('moderate') || level.toLowerCase().includes('mild') || level.toLowerCase().includes('balanced')) {
        badge = 'bg-amber-100 text-amber-800';
      } else {
        badge = 'bg-red-100 text-red-800';
      }
      return { score: sum, maxScore: 15, level, badge };
    }
  }
];

function getFullAssessmentCatalog() {
  return [...PSYCH_ASSESSMENTS];
}
