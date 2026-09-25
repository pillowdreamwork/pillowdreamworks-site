const fs = require('fs');

const rawCode = fs.readFileSync('./data/assessments-data-raw.js', 'utf8');

const header = `// PillowDreamWorks — Unified Psychological Assessments Database
// Complete 177 Clinical & Self-Inventories: 161 Free Screeners + 16 Practitioner Batteries
// Covers all 15 Clinical Domains with full Factor Analysis, Result, Discussion, and Conclusion engines.

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

export function buildFactorResults(scores: number[], definitions: FactorDefinition[]): FactorResult[] {
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

function safeNumber(value: any, fallback = 0): number {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function calculatePercentage(score: number, maxScore: number): number {
  const parsedScore = safeNumber(score, 0);
  const parsedMax = safeNumber(maxScore, 0);
  if (!parsedMax) return 0;
  const pct = (parsedScore / parsedMax) * 100;
  return Number.isFinite(pct) ? pct : 0;
}

function formatAssessmentPercentage(value: number): string {
  if (!Number.isFinite(value)) return '0.0%';
  return \`\${Math.max(0, Math.min(100, value)).toFixed(1)}%\`;
}

export function buildMeasureRows(item: FullAssessmentItem, result: AssessmentScoringResult, score: number, maxScore: number, percentage: number) {
  const rows: Array<{
    measure: string;
    score: number;
    maxScore: number;
    percentage: number;
    level: string;
    meaning: string;
  }> = [];
  const level = result && result.level ? String(result.level) : 'Current range';
  const sourceFactors = Array.isArray(result?.factors) && result.factors.length > 0
    ? result.factors
    : (Array.isArray(item?.factors) ? (item.factors as any) : []);

  if (sourceFactors.length > 0) {
    sourceFactors.forEach((factor: any) => {
      const factorScore = safeNumber(factor.score, 0);
      const factorMax = safeNumber(factor.maxScore, factorScore || 1);
      const factorPct = calculatePercentage(factorScore, factorMax);
      rows.push({
        measure: factor.label || factor.name || 'Factor',
        score: factorScore,
        maxScore: factorMax,
        percentage: factorPct,
        level: factor.level || level,
        meaning: factor.meaning || 'This factor reflects the pattern reported in this assessment.'
      });
    });
    return rows;
  }

  const desc = Array.isArray(item?.description) ? item.description.join(' ') : item?.description;

  rows.push({
    measure: item?.title || 'Overall score',
    score,
    maxScore,
    percentage,
    level,
    meaning: desc || 'This score reflects the pattern captured in this assessment.'
  });

  return rows;
}

export function buildAssessmentInterpretation(item: FullAssessmentItem, result: AssessmentScoringResult, percentage?: number): AssessmentInterpretation {
  const score = safeNumber(result.score, 0);
  const maxScore = safeNumber(result.maxScore, 0) || 1;
  const levelLabel = result.level ? String(result.level) : 'Current range';
  const safePercentage = Number.isFinite(percentage) ? (percentage as number) : calculatePercentage(score, maxScore);
  const normalisedSummary = \`\${score} out of \${maxScore}\`;
  const domainText = item?.domain ? item.domain.toLowerCase() : 'assessment';
  const lowerText = /low|minimal|normal|clear|not elevated|lower/.test(String(levelLabel).toLowerCase()) ? 'lower' : /moderate|mild|mixed|borderline/.test(String(levelLabel).toLowerCase()) ? 'moderate' : 'higher';
  const rawDesc = Array.isArray(item?.description) ? item.description.join(' ') : item?.description;
  const assessmentSentence = rawDesc ? rawDesc.replace(/\\s+/g, ' ').trim() : 'This assessment explores the pattern described in the respondent’s answers.';
  const sourceFactors = Array.isArray(result?.factors) ? result.factors : [];
  const rows = buildMeasureRows(item, result, score, maxScore, safePercentage);

  if (sourceFactors.length > 1) {
    const orderedFactors = [...sourceFactors].sort((a, b) => safeNumber(b.percentage) - safeNumber(a.percentage));
    const strongest = orderedFactors[0];
    const lowest = orderedFactors[orderedFactors.length - 1];
    const middle = orderedFactors.slice(1, -1);
    const factorSummary = sourceFactors.map((factor) => \`\${factor.name} is \${safeNumber(factor.score)} out of \${safeNumber(factor.maxScore) || 1} (\${formatAssessmentPercentage(safeNumber(factor.percentage))}, \${factor.level || 'current range'})\`).join('; ');
    const middleText = middle.length > 0 ? middle.map((factor) => \`\${factor.name} at \${factor.level || 'the current range'}\`).join(', ') : 'the remaining factors';
    const profile = \`For \${item?.title || 'this assessment'}, the results are \${factorSummary}. \${strongest.name} is the relative high point and \${lowest.name} is comparatively lower; \${middleText} falls between them. The useful finding is the contrast among factors, not the raw combined total.\`;
    const discussion = [
      \`\${strongest.name} is the relative high point at \${safeNumber(strongest.score)} out of \${safeNumber(strongest.maxScore) || 1}; this may be a resource in situations measured by \${item?.title || 'the assessment'}.\`,
      \`\${lowest.name} is comparatively lower at \${safeNumber(lowest.score)} out of \${safeNumber(lowest.maxScore) || 1}; explore when that area is less available or less important to the respondent.\`,
      \`The contrast between \${strongest.name} and \${lowest.name} is the clearest feature of this profile.\`,
      \`The middle results (\${middleText}) add context rather than a separate conclusion.\`,
      \`In practice, the pattern may appear differently across relationships, study, work, or stressful situations.\`,
      \`Ask for a recent example in which the strongest factor helped the respondent respond effectively.\`,
      \`Ask for a contrasting example in which the lower factor created effort, uncertainty, or a need for support.\`,
      \`Check whether the pattern feels stable or reflects a recent situation, mood, or role demand.\`,
      \`Use the item wording to test the profile collaboratively rather than assigning a fixed personality label.\`,
      \`The profile is a structured reflection aid and should be considered alongside the person's context and other information.\`
    ];
    const conclusion = [
      \`Overall, \${strongest.name} is the clearest relative strength and \${lowest.name} is the main area for reflection in this \${item?.title || 'profile'}.\`,
      \`\${middleText} provides additional context to that contrast.\`,
      \`The result describes this response pattern within the assessment; it is not a diagnosis or a fixed description of the person.\`,
      \`Next, explore one recent situation that illustrates the contrast between the high and lower factors.\`
    ].join(' ');

    return {
      title: \`Your factor profile for \${item?.title || 'this assessment'} is ready.\`,
      statement: \`The individual factor results are shown first. \${profile}\`,
      interpretation: \`This \${domainText} assessment contains \${sourceFactors.length} separately scored factors. \${profile} The scores show where the response pattern is relatively stronger and lower within the assessment's current ranges. Read each factor with its own score, maximum, percentage, level, and meaning; the overall sum is not a substitute for that profile.\`,
      discussion,
      conclusion,
      note: 'This is an educational screening tool and does not constitute a formal diagnosis. It is intended to support reflective discussion, supervision, and self-understanding rather than to establish a clinical condition.',
      rows,
      overallProfile: profile,
      category: item?.domain || 'Assessment'
    };
  }

  const titleLine = \`Your score is \${normalisedSummary} on the \${item?.title || 'assessment'} measure.\`;
  const statement = \`This falls within the \${levelLabel} range for this \${domainText} assessment, indicating a \${lowerText} level of the reported concern or pattern relative to the current scoring framework.\`;

  const interpretationParagraph = [
    \`\${item?.title || 'This assessment'} measures \${assessmentSentence.replace(/[.?!]+$/, '')}.\`,
    \`The obtained score is \${normalisedSummary} (\${formatAssessmentPercentage(safePercentage)}), which falls in the \${levelLabel} range used by this assessment.\`,
    \`Within this scoring framework, that band may indicate a \${lowerText} level of the measured experiences or traits; it does not establish a diagnosis.\`,
    \`The result is most informative when linked to the specific items that contributed to it and to the situations in which the respondent notices the measured pattern.\`,
    \`For a trainee or practitioner, the next step is to check whether the score fits the person's recent functioning, distress, frequency, and impact on relationships, study, work, or daily routines.\`,
    \`Use the result to focus the conversation, not to replace clinical judgement or broader assessment.\`
  ].join(' ');

  const discussion = [
    \`The \${levelLabel.toLowerCase()} band is the central finding for \${item?.title || 'this assessment'} and should be understood within its \${normalisedSummary} range.\`,
    \`Explore which items or experiences contributed most to the score rather than treating the total as a complete account of the person.\`,
    \`Ask how often the measured pattern occurs, how intense it is, and whether it changes across settings.\`,
    \`Ask what effect it has on relationships, study, work, sleep, routines, or decision-making, where relevant to this measure.\`,
    \`Check whether the result reflects a recent stressor, a longer-standing pattern, or a situation-specific response.\`,
    \`Invite the respondent to identify one example that fits the score and one example that does not.\`,
    \`Discuss existing coping strategies and conditions under which the measured difficulty or strength becomes more manageable.\`,
    \`Use the assessment as a focused conversation prompt and compare it with other information before drawing conclusions.\`
  ];

  const conclusion = [
    \`Overall, \${item?.title || 'this assessment'} produced a \${score} out of \${maxScore} result in the \${levelLabel} range.\`,
    \`This may indicate a \${lowerText} level of the measured pattern within the assessment's scoring framework.\`,
    \`The main point for reflection is how the result appears in the respondent's actual situations and functioning.\`,
    \`Use it to guide the next conversation and decide whether further assessment or support is appropriate.\`
  ].join(' ');

  const note = 'This is an educational screening tool and does not constitute a formal diagnosis. It is intended to support reflective discussion, supervision, and self-understanding rather than to establish a clinical condition.';

  return {
    title: titleLine,
    statement,
    interpretation: interpretationParagraph,
    discussion,
    conclusion,
    note,
    rows,
    overallProfile: \`\${item?.title || 'This assessment'} produced a \${score} out of \${maxScore} result in the \${levelLabel} range. The profile should be checked against the respondent's examples, context, and reported impact.\`,
    category: item?.domain || 'Assessment'
  };
}

`;

// Find where PSYCH_ASSESSMENTS array ends
const startMarker = 'const PSYCH_ASSESSMENTS = [';
const startIndex = rawCode.indexOf(startMarker);
const arrayBody = rawCode.slice(startIndex + startMarker.length);
const endMarker = '\n];\n\nfunction getFullAssessmentCatalog';
const endIndex = arrayBody.indexOf(endMarker);

let cleanArray = '';
if (endIndex !== -1) {
  cleanArray = arrayBody.slice(0, endIndex);
} else {
  const lastBracket = arrayBody.lastIndexOf('];');
  cleanArray = arrayBody.slice(0, lastBracket);
}

const footer = `
export const PSYCH_ASSESSMENTS: FullAssessmentItem[] = [
${cleanArray}
];

export const allCatalogAssessments: FullAssessmentItem[] = PSYCH_ASSESSMENTS;

export function getFullAssessmentCatalog(): FullAssessmentItem[] {
  return [...PSYCH_ASSESSMENTS];
}
`;

const finalTs = header + '\n' + footer;

fs.writeFileSync('./data/assessments-full-catalog.ts', finalTs, 'utf8');
console.log('Successfully generated data/assessments-full-catalog.ts with conclusion string fix!');
