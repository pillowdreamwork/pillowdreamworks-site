// Interactive Free Screening Tools & Factor Calculators
// Ported directly from verified baseline assessments-data.js

export interface InteractiveAssessment {
  id: string;
  code: string;
  title: string;
  domain: string;
  description: string;
  whoCanTake: string;
  duration: string;
  options: string[];
  questions: string[];
  scoring: (scores: number[]) => {
    score: number;
    maxScore: number;
    level: string;
    description: string;
    badgeColor: "emerald" | "amber" | "red" | "blue";
  };
}

export const INTERACTIVE_SCREENERS: InteractiveAssessment[] = [
  {
    id: "gad-7",
    code: "GAD-7",
    title: "Generalized Anxiety Disorder Screener",
    domain: "Anxiety & Worry",
    description: "The gold-standard 7-item clinical tool to screen for generalized anxiety, uncontrollable worry, and physical tension.",
    whoCanTake: "Teens & Adults (Ages 12+)",
    duration: "3–5 minutes",
    options: ["Not at all (0)", "Several days (+1)", "Over half the days (+2)", "Nearly every day (+3)"],
    questions: [
      "Feeling nervous, anxious, or on edge?",
      "Not being able to stop or control worrying?",
      "Worrying too much about different things?",
      "Trouble relaxing or quieting your mind?",
      "Being so restless that it's hard to sit still?",
      "Becoming easily annoyed or irritable?",
      "Feeling afraid as if something awful might happen?",
    ],
    scoring: (scores: number[]) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      let level = "Severe Anxiety";
      let badgeColor: "emerald" | "amber" | "red" | "blue" = "red";
      let description = "Scores in this range suggest significant anxiety that warrants structured therapeutic support or clinical consultation.";

      if (sum <= 4) {
        level = "Minimal Anxiety";
        badgeColor = "emerald";
        description = "Scores in this range reflect baseline healthy anxiety with minimal functional disruption.";
      } else if (sum <= 9) {
        level = "Mild Anxiety";
        badgeColor = "amber";
        description = "Scores suggest mild situational tension. Structured journaling in The Psychology Toolkit can be highly supportive.";
      } else if (sum <= 14) {
        level = "Moderate Anxiety";
        badgeColor = "amber";
        description = "Notable persistent worry. Consider somatic grounding exercises and 1-on-1 counselling for proactive coping.";
      }

      return { score: sum, maxScore: 21, level, description, badgeColor };
    },
  },
  {
    id: "oasis",
    code: "OASIS",
    title: "Overall Anxiety Severity & Impairment Scale",
    domain: "Functional Impairment",
    description: "Evaluates how frequently anxiety occurs, its intensity, and how much it interferes with work, school, and relationships.",
    whoCanTake: "Teens & Adults (Ages 14+)",
    duration: "2–4 minutes",
    options: ["None / Not at all (0)", "Mild / Infrequent (+1)", "Moderate (+2)", "Severe / Frequent (+3)"],
    questions: [
      "In the past week, how often did you feel intense anxiety or panic?",
      "When anxious, how severe was the physical and emotional distress?",
      "How often did you avoid places, tasks, or people due to anxiety?",
      "How much did anxiety impair your daily duties or work performance?",
      "How much did anxiety disrupt your social connections and family life?",
    ],
    scoring: (scores: number[]) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      let level = "Severe Impairment";
      let badgeColor: "emerald" | "amber" | "red" | "blue" = "red";
      let description = "Anxiety is significantly impacting daily vocational and relational functioning.";

      if (sum <= 4) {
        level = "Normal Range";
        badgeColor = "emerald";
        description = "No notable functional impairment reported from anxiety over the preceding week.";
      } else if (sum <= 8) {
        level = "Mild Impairment";
        badgeColor = "amber";
        description = "Occasional disruption to concentration or social tasks.";
      } else if (sum <= 12) {
        level = "Moderate Impairment";
        badgeColor = "amber";
        description = "Frequent avoidance behaviors and fatigue stemming from emotional strain.";
      }

      return { score: sum, maxScore: 15, level, description, badgeColor };
    },
  },
  {
    id: "sias-6",
    code: "SIAS-6",
    title: "Social Interaction Anxiety Scale (Short)",
    domain: "Social & Interpersonal",
    description: "Assesses distress, fear of scrutiny, and conversational tension during social and relational interactions.",
    whoCanTake: "Adolescents & Adults (16+)",
    duration: "3 minutes",
    options: ["Not at all characteristic (0)", "Slightly (+1)", "Moderately (+2)", "Extremely characteristic (+3)"],
    questions: [
      "I get nervous if I have to speak with someone in authority (boss, teacher, interviewer).",
      "I find it difficult to make eye contact with others in group settings.",
      "I worry that I will express myself poorly or stumble over my words.",
      "I tense up if I meet an acquaintance on the street unexpectedly.",
      "I feel self-conscious and uneasy when eating or drinking in front of people.",
      "I worry about being seen as awkward or uninteresting at social gatherings.",
    ],
    scoring: (scores: number[]) => {
      const sum = scores.reduce((a, b) => a + b, 0);
      let level = "High Social Anxiety";
      let badgeColor: "emerald" | "amber" | "red" | "blue" = "red";
      let description = "High sensitivity to social evaluation. Boundary work and cognitive disputation can provide profound relief.";

      if (sum <= 5) {
        level = "Low / Baseline";
        badgeColor = "emerald";
        description = "Typical social poise and comfort navigating public conversations.";
      } else if (sum <= 10) {
        level = "Moderate Social Tension";
        badgeColor = "amber";
        description = "Situational nervousness during high-stakes evaluations or unfamiliar gatherings.";
      }

      return { score: sum, maxScore: 18, level, description, badgeColor };
    },
  },
];
