// PillowDreamWorks — Psychometric Types & Definitions

export interface FactorDefinition {
  name: string;
  indices: number[];
  meaning: string;
}

export interface FactorResult {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  meaning: string;
}

export interface AssessmentScoringResult {
  score: number;
  maxScore: number;
  level: string;
  badge?: string;
  factors?: FactorResult[];
}

export interface FullAssessmentItem {
  id: string;
  domain: string;
  title: string;
  breadcrumb: string;
  description: string | string[];
  whoCanTake: string;
  administration: string;
  isPaid: boolean;
  priceINR?: number;
  priceUSD?: number;
  duration?: string;
  includes?: string[];
  options?: string[];
  questions?: string[];
  factors?: FactorDefinition[];
  scoring?: (scores: number[]) => AssessmentScoringResult;
}

export interface AssessmentInterpretation {
  title: string;
  statement: string;
  interpretation: string;
  discussion: string[];
  conclusion: string;
  note: string;
  rows: Array<{
    measure: string;
    score: number;
    maxScore: number;
    percentage: number;
    level: string;
    meaning: string;
  }>;
  overallProfile: string;
  category: string;
}
