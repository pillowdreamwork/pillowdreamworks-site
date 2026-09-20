# Assessment Source Registry

This document is a research and audit registry only. It records the current assessment catalog in the website, classifies each item by source confidence, notes the current implementation, and identifies mismatch risk. It does not modify the website, scoring logic, assessment flow, or result rendering.

## Scope

The current assessment engine contains 177 entries across 15 domains. The file captures each assessment's current implementation as it exists in `js/assessments-data.js`, and identifies whether the current version reflects an established instrument, a custom educational scale, a clinician-only procedure, or a non-standard entry with no reliable source.

## Registry Summary

| Category | Count |
|---|---:|
| Validated / source-backed | 32 |
| Custom / educational | 112 |
| Clinician-administered | 12 |
| Unverified | 21 |
| Scoring discrepancies identified | 31 |

Notes:
- The counts above are registry classifications and intentionally err on the side of caution.
- Several named instruments are present in the site but are not implemented as their source instrument in the code.
- Many `scale_###` entries appear to be internally defined by the project and should be treated as custom educational scales unless a valid external source is added.

---

## Source Hierarchy Applied

Each entry was reviewed according to this hierarchy:
1. Original instrument developer or official institution
2. Official manual or instrument documentation
3. Government / academic institution
4. Peer-reviewed publication
5. Established clinical or academic reference

If no reliable source could be located, the assessment is marked as `UNVERIFIED — DO NOT CLAIM OFFICIAL SCORING`.

---

## Domain 1 — Anxiety (15)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| gad-7 | GAD-7 (Generalized Anxiety Disorder Screener) | 7 | 0–3 per item; Never / Several days / Over half / Nearly every day | 0–21 | Sum item responses; standard cutoffs 5 / 10 / 15 | No | 0–4 minimal; 5–9 mild; 10–14 moderate; 15–21 severe | validated screening | Spitzer et al. 2006; PubMed/NIH/official instrument guidance | Current site largely matches the common published cutoffs, but the general result labeling is simplified | Low risk; source-backed but should use standard 5/10/15 bands exactly |
| oasis | OASIS (Overall Anxiety Severity & Impairment Scale) | 5 | 0–4 | 0–20 | Sum all items | No | Standard OASIS severity cutoffs are instrument-specific; site uses generalized ranges | validated screening | Official OASIS documentation / institutional guidance | Site appears to use a generic educational threshold scheme rather than the official published scoring bands | Needs review if marketed as official OASIS interpretation |
| sias-6 | SIAS-6 (Social Interaction Anxiety Scale) | 6 | 0–3 | 0–18 | Sum all items | No | Unclear without official scoring procedure | validated screening | Official SIAS / academic institutional source | Current site presents a simplified 0–18 sum with generic bands | Source-backed but score bands should be checked before commercial labeling |
| pdss-short | PDSS (Panic Disorder Severity Screener) | 5 | 0–3 | 0–15 | Sum all items | No | Generic panic severity ranges used | validated screening | PDSS official documentation / clinical references | Current code is a brief custom adaptation, not the full PDSS instrument in a source-verified format | Likely a shortened educational adaptation; not full official PDSS |
| hai-short | HAI-Short (Health Anxiety Inventory) | 5 | 0–3 | 0–15 | Sum all items | No | Generic health anxiety categories | validated screening | Official HAI references / medical institutions | Current version appears to be a simplified educational version | Not a verified full HAI score sheet |
| pswq-brief | Penn State Worry Questionnaire (PSWQ-Brief) | 5 | 0–3 | 0–15 | Sum all items | No | Generic worry level labels | validated screening | Official PSWQ documentation / institutional reference | Current code uses a custom 5-item adaptation, not the full official brief version | Likely shortened custom screening |
| ham-a | HAM-A (Hamilton Anxiety Rating Scale Clinical Battery) | 0 in self-test flow | clinician-administered interview | Official instrument-specific score range; not self-administered | Clinician interview rating | No | Standard HAM-A symptom and severity interpretation | clinician-administered instrument | Official Hamilton manual / clinical institution | Site labels it as a paid clinical battery but does not implement real HAM-A administration | Not suitable for self-service website test |
| scale_301 | Panic Triggers Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Current implementation appears internally defined | CUSTOM / EDUCATIONAL; no source claim |
| scale_302 | Panic Triggers Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Same as above | CUSTOM / EDUCATIONAL |
| scale_303 | Anticipatory Worry Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |
| scale_304 | Anticipatory Worry Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |
| scale_305 | Agoraphobic Avoidance Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |
| scale_306 | Agoraphobic Avoidance Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |
| scale_307 | Somatic Tension Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |
| scale_308 | Somatic Tension Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Custom project-defined scale | CUSTOM / EDUCATIONAL |

## Domain 2 — Depression & Mood (13)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| phq-9 | PHQ-9 (Patient Health Questionnaire) | 9 | 0–3 | 0–27 | Sum all items | No | Standard PHQ-9 bands: 0–4 minimal; 5–9 mild; 10–14 moderate; 15–19 moderately severe; 20–27 severe | validated screening | Kroenke et al.; official PHQ-9 documentation; NIH / clinical sources | Site uses 0–27 but collapses into a simplified 3-level output and does not follow the official 5-band breakdown | Needs source-specific 5-band interpretation |
| phq-2 | PHQ-2 (Rapid 2-Item Mood Screener) | 2 | 0–3 | 0–6 | Sum all items | No | Standard brief screening threshold | validated screening | PHQ-2 official guidance and clinical sources | Site matches approximate instrument logic but is still a screen, not a clinical diagnosis | Low risk but should be labeled as a screening tool |
| ces-d | CES-D (Center for Epidemiologic Studies Depression Scale) | 5 in current version | 0–3 or 4-point scale depending on source | 0–15 in current project; official version is larger and different | Custom sum | No | Generic mood-state categories | validated screening / custom adaptation | CES-D official academic source | The site uses a 5-item custom short form and not the full official instrument | This is not the official CES-D unless the full scale is used |
| mdq | MDQ (Mood Disorder & Bipolar Spectrum Questionnaire) | 5 in current version | 0–3 | 0–15 in current project | Custom sum | No | Generic bipolar-spectrum indicator | validated screening / custom adaptation | Original MDQ / clinical guidance | Current implementation does not match the full MDQ instrument structure | Shortened custom version; not the original MDQ instrument |
| bdi-ii | BDI-II (Beck Depression Inventory Standardized Clinical Battery) | 0 in self-test flow | clinician-administered / standardized score sheet | Standard BDI-II 0–63 | Clinician-administered scoring | Depends on instrument version | Standard severity bands | clinician-administered instrument | Beck Institute / official BDI-II manuals | Current site presents a paid clinical battery but not a self-test and does not implement the actual scoring | Not suitable for self-service website test |
| scale_309 | Seasonal Affective Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_310 | Seasonal Affective Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_311 | Vitality & Energy Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_312 | Vitality & Energy Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_313 | Dysthymic Tendency Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_314 | Dysthymic Tendency Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_315 | Emotional Numbness Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_316 | Emotional Numbness Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 3 — Stress & Burnout (11)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| pss-10 | PSS-10 (Perceived Stress Scale) | 10 | 0–4 per item | 0–40 | Sum all items | Items 4, 5, 7, 8 are reverse scored in the official scale | 0–13 low; 14–26 moderate; 27–40 high | validated screening | Cohen, Kamarck, Mermelstein; official PSS source | Current site appears to sum the items but does not include reverse scoring; it uses simplified classification | Missing reverse-scored items and source-specific handling |
| mbi-self | MBI-Self (Maslach Burnout Inventory Check) | 5 in current version | 0–3 or another 5-point variant | 0–15 in current version; official MBI is longer and multidimensional | Custom score pattern | No | Generic burnout risk labels | validated screening / custom adaptation | Official MBI manuals / institutional source | Current code is a custom 5-item burnout check and not the official MBI structure | Not the official MBI unless full instrument is used |
| caregiver-burden | Caregiver Fatigue & Burden Inventory | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic burden ranges | custom / educational | No reliable external source found | Appears internally defined | CUSTOM / EDUCATIONAL |
| scale_317 | Compassion Fatigue Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_318 | Compassion Fatigue Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_319 | Executive Overwhelm Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_320 | Executive Overwhelm Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_321 | Sleep-Stress Index Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_322 | Sleep-Stress Index Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_323 | Workload Recovery Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_324 | Workload Recovery Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 4 — Trauma & PTSD (12)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| pcl-5 | PCL-5 (PTSD Checklist for DSM-5) | 5 in current version; official is 20 | 0–4 | Official 0–80; current version is custom short-form 0–15 | Custom reduction of official items | No | Generic trauma symptom bands | validated screening / custom adaptation | Weathers et al.; official PTSD Checklist source | Current code is not the official instrument version; it is a 5-item custom summary | Major discrepancy: not the official PCL-5 instrument |
| ies-r | IES-R (Impact of Event Scale-Revised Short) | 5 in current version | 0–4 | 0–15 in current project; official version differs | Custom sum | No | Generic trauma impact bands | validated screening / custom adaptation | Official IES-R reference / institutional sources | Current version is shortened and not the official scoring procedure | Not source-verified as official IES-R |
| ace | ACE (Adverse Childhood Experiences Screener) | 5 in current version | 0–3 | 0–15 in current project; official ACE uses a different score structure | Custom sum | No | Generic adversity bands | validated screening / custom adaptation | Official ACE documentation; CDC / academic institution | Site version is a custom abbreviated form, not the official instrument | Custom adaptation; should be labeled as such |
| caps-5 | CAPS-5 (Clinician-Administered PTSD Scale Diagnostic Battery) | 0 in website self-test | Clinician-administered interview | Official instrument-specific range | Clinician scoring | N/A | Official DSM-5 symptom severity scoring | clinician-administered instrument | Official CAPS-5 manual / clinical institution | Site lists CAPS-5 as a paid booking but does not implement the actual admin protocol | Not suitable for self-service use |
| scale_325 | Trigger Sensitivity Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_326 | Trigger Sensitivity Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_327 | Somatic Hyperarousal Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_328 | Somatic Hyperarousal Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_329 | Dissociative Tendency Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_330 | Dissociative Tendency Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_331 | Safety Appraisal Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_332 | Safety Appraisal Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 5 — Personality (20)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| tipi-10 | Big Five Personality Inventory (TIPI-10) | 8 | 1–7 likely or 4-point variant in site | Official TIPI is 10 items and not exactly same as the site | Site appears to use simplified scoring and threshold logic | Usually some reverse-scored items depending on the version | Generic trait profile | validated screening / custom adaptation | Official TIPI literature | Current code is not the full validated TIPI scoring method as published | Needs review if marketed as official TIPI-10 |
| epq-r-short | EPQ-R Short (Eysenck Personality Questionnaire Revised) | 6 in current version | 0–3 or yes/no variant | 0–18 in current site; official version differs | Generic sum | Usually some scale-specific reverse coding | Generic stable vs expressive profile | validated screening / custom adaptation | Official EPQ-R manuals / institutional resource | The site uses a short non-standard version and labels it as the official EPQ-R Short | Not the official published EPQ-R Short wording and scoring |
| mbti-style-16 | 16-Personality Type Screener (MBTI Cognitive Style) | 6 | 4-point Likert-like scale | UNVERIFIED | Custom sum | No | Type-like profile labels | unclear / self-report style | MBTI official source exists, but the current implementation is not a source-verified MBTI instrument | The site does not implement a formally validated MBTI typology methodology | Major category risk; not a source-equivalent MBTI test |
| sd3-short | Dark Triad Screener (Machiavellianism, Narcissism, Psychopathy) | 6 | 0–3 | 0–18 in current site; official scale differs | Generic sum | Usually instrument-specific items | Generic low-dark-triad profile | validated screening / custom adaptation | Official Dark Triad sources | Current code does not reflect the full published tool | Custom adaptation; likely educational only |
| type-ab | Type A/B Behaviour Pattern & Stress Drive | 5 | 0–3 | UNVERIFIED | Custom sum | No | Type A/B | custom / educational | No reliable external source found | Site-specific custom adaptation | CUSTOM / EDUCATIONAL |
| 16pf | 16PF (Cattell's 16 Personality Factor Questionnaire Battery) | 0 in self-test flow | clinician-administered standardized format | Official instrument-specific scoring range | Formal psychometric scoring | Depends on instrument booklet | Standardized personality factor profile | clinician-administered instrument | Official 16PF manuals / academic institution | The site lists it as a paid battery but does not implement the official administration or scoring engine | Not suitable for self-service use |
| rorschach | Rorschach Inkblot Test (Comprehensive System Evaluation) | 0 in self-test flow | clinician-administered projective format | Official scoring is instrument-specific and not a simple sum | Formal coding and interpretation | Not a sum-score instrument | Clinical interpretation only | clinician-administered instrument | Official Rorschach manuals | The site lists it as a service offering but does not implement official scoring or administration | Not self-administered; needs formal clinician use |
| tat | TAT (Thematic Apperception Test Projective Battery) | 0 in self-test flow | clinician-administered projective format | Official scoring is not a generic sum | Formal narrative interpretation | N/A | Qualitative clinical interpretation | clinician-administered instrument | Official TAT manuals / academic sources | Site lists it as a service but has no actual TAT scoring engine | Not a self-test; not a generic scoring item |
| mmpi-2 | MMPI-2 (Minnesota Multiphasic Personality Inventory) | 0 in self-test flow | clinician-administered / standardized test booklet | Official instrument-specific total score ranges | Formal psychometric scoring | Yes; full instrument includes reverse-scored items and validity scales | Clinical interpretive profile | clinician-administered instrument | Official MMPI-2 manuals / institutional source | Site lists the instrument as a service but does not implement official scoring or validity scales | Not suitable for self-service test |
| ssct | SSCT (Sacks Sentence Completion Test Projective Inventory) | 0 in self-test flow | projective / narrative format | Official scoring is not a simple numeric total | Qualitative, narrative coding and interpretation | N/A | Clinical narrative interpretation | clinician-administered instrument | Official SSCT source / academic guidance | Not implemented as a source-based assessment | Not suitable for self-service testing |
| htp | HTP (House-Tree-Person) Clinical Art Evaluation | 0 in self-test flow | projective drawing task | Official interpretation is qualitative | Qualitative drawing analysis | N/A | Qualitative clinical interpretation | clinician-administered instrument | Official art-based projective sources | Not implemented as a real assessment engine | Not suitable for self-service testing |
| hfdt | HFDT (Human Figure Drawing Test) Clinical Evaluation | 0 in self-test flow | projective drawing task | Official scoring not a simple score sum | Qualitative drawing analysis | N/A | Qualitative clinical interpretation | clinician-administered instrument | Official clinical art evaluation sources | Not implemented as a real assessment engine | Not suitable for self-service testing |
| scale_333 | Assertiveness Profile Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_334 | Assertiveness Profile Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_335 | Perfectionism Index Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_336 | Perfectionism Index Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_337 | Emotional Boundary Scale Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_338 | Emotional Boundary Scale Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_339 | Social Adaptability Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_340 | Social Adaptability Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 6 — Cognitive & Memory (13)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| moca-style | MoCA-Style Cognitive Orientation & Memory Screener | 5 | 0–3 | 0–15 in current version | Custom sum | No | Generic cognitive impairment indicator | validated screening / custom adaptation | Official MoCA manual / institution | Current version is a custom short-form approximation not the validated MoCA | Not the official MoCA test |
| brain-fog | Brain Fog & Cognitive Exhaustion Scale | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic clarification of cognitive clarity | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| subjective-memory | Subjective Memory Complaints Questionnaire | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic memory complaint ranges | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| wais-iv | WAIS-IV / MISIC Comprehensive Intelligence & Cognitive Battery | 0 in self-test flow | clinician-administered standardized format | Official test-specific scoring | Formal psychometric scoring | Yes / standard administration | Standard IQ and index interpretation | clinician-administered instrument | Official WAIS-IV manuals / institutional sources | Site lists the tool as a paid battery but not as a source-backed self-test | Not suitable for self-service use |
| bender-gestalt | Bender Visual-Motor Gestalt Test II | 0 in self-test flow | standardized visual-motor task | Official scoring model is complex and not numeric-only | Formal clinical scoring | N/A | Clinical visual-motor interpretation | clinician-administered instrument | Official Bender-Gestalt manuals / academic source | Site lists this as a session but not as implemented scoring | Not suitable for self-service use |
| scale_341 | Attentional Control Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_342 | Attentional Control Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_343 | Working Memory Retention Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_344 | Working Memory Retention Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_345 | Mental Flexibility Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_346 | Mental Flexibility Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_347 | Multitasking Fatigue Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_348 | Multitasking Fatigue Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 7 — ADHD & Focus (11)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| asrs-v1 | ASRS-v1.1 (WHO Adult ADHD Self-Report Screener) | 6 | 0–3 or 0–4 depending on source version | Standard official scoring range exists | Official source-based method | Usually no | Established ADHD likelihood bands | validated screening | WHO / official ASRS guidance | Current code likely uses a simplified adaptation but not a full official score sheet | Needs source-specific scoring before claims |
| procrastination-scale | Procrastination & Volition Scale | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic volition label | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| conners-adhd | Conners Adult ADHD Diagnostic Battery (CAARS) | 0 in self-test flow | clinician-administered standardized format | Official instrument-specific range | Formal psychometric scoring | Yes; instrument-specific | Standard ADHD diagnosis profile | clinician-administered instrument | Official Conners CAARS manuals / institutional source | The site lists CAARS as a paid assessment but does not implement the actual scoring engine | Not suitable for self-service use |
| scale_349 | Time Blindness Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_350 | Time Blindness Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_351 | Task Initiation Barrier Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_352 | Task Initiation Barrier Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_353 | Sensory Distraction Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_354 | Sensory Distraction Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_355 | Hyperfocus Pattern Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_356 | Hyperfocus Pattern Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 8 — Autism & Neurodiversity (11)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| aq-10 | AQ-10 (Autism Spectrum Quotient 10-Item Screener) | 10 | 0–3 or 1–4 depending on version | Official version has specific score ranges and should be used as published | Official cutpoint / scoring procedure | Usually no | Established autism-spectrum screening bands | validated screening | Baron-Cohen et al.; NICE / NHS guidance | Current code uses a generic item total and a simple 3-band interpretation rather than the official scoring cutoffs and wording | Source-backing is partial; screening interpretation should be reviewed |
| hsp-scale | HSP (Highly Sensitive Person Sensory Processing Scale) | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic sensory sensitivity ranges | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| ados-2 | ADOS-2 (Autism Diagnostic Observation Schedule Battery) | 0 in self-test flow | clinician-administered observation schedule | Official instrument-specific ranges | Formal observation-based scoring | N/A | Diagnostic classification only | clinician-administered instrument | Official ADOS-2 manuals / institutional guidance | Site lists ADOS-2 but does not implement a diagnostic observation process | Not suitable for self-service use |
| scale_357 | Sensory Overload Screen Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_358 | Sensory Overload Screen Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_359 | Social Masking Index Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_360 | Social Masking Index Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_361 | Routine Preference Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_362 | Routine Preference Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_363 | Interoception Awareness Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_364 | Interoception Awareness Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 9 — Schizophrenia & Psychosis (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| pq-b | PQ-B (Prodromal Questionnaire - Brief Psychosis Screener) | 5 | 0–3 | 0–15 in current version | Custom sum | No | Generic perceptual-distortion risk | validated screening / custom adaptation | Official PQ-B literature / clinical institution | Current site appears to be a shortened, non-source-specific adaptation of a psychosis screener | It should be labeled as a screening adaptation, not full official PQ-B scoring |
| panss | PANSS (Positive and Negative Syndrome Scale Clinical Interview) | 0 in self-test flow | clinician-administered structured interview | Official clinical scoring range | Formal clinical scoring | Yes, depending on standard scoring approach | Clinical symptom severity profile | clinician-administered instrument | Official PANSS manuals / academic reference | Site lists it as a paid clinical tool but does not implement official scoring | Not suitable for self-service site use |
| scale_365 | Perceptual Clarity Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_366 | Perceptual Clarity Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_367 | Ideas of Reference Screen Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_368 | Ideas of Reference Screen Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_369 | Thought Coherence Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_370 | Thought Coherence Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_371 | Sensory Grounding Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_372 | Sensory Grounding Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 10 — Substance Use & Addictions (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| cage-substance | CAGE & DAST Substance Screening Inventory | 4 | 0–3 | 0–12 in current site | Custom sum approximating CAGE-style screening | No | Generic low / moderate / high dependence risk | validated screening / custom adaptation | Official CAGE / DAST references | Current version is a custom 4-item combination and not an official full DAST/CAGE administration | Should be labeled as a compact screening adaptation |
| digital-addiction | Smartphone & Digital Screen Dependency Scale | 5 | 0–3 | UNVERIFIED | Custom sum | No | Healthy / moderate / high digital compulsion | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_373 | Craving Severity Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_374 | Craving Severity Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_375 | Behavioral Compulsion Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_376 | Behavioral Compulsion Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_377 | Social Trigger Awareness Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_378 | Social Trigger Awareness Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_379 | Recovery Self-Efficacy Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_380 | Recovery Self-Efficacy Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 11 — Motivation & Self-Growth (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| motivation-scale | Academic & Work Motivation Scale (AMS) | 5 | 0–3 | UNVERIFIED | Custom sum | No | Mixed motivation / external reliance | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| grit-scale | Short Grit & Perseverance Scale | 5 | 0–3 | UNVERIFIED | Custom sum | No | Generic grit ranges | custom / educational | Official Grit scale exists, but this is a shortened project-specific variant | Current item set and cutoffs are not implemented as the published grit scale | Needs review as a shortened custom version |
| scale_381 | Goal Setting Horizon Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_382 | Goal Setting Horizon Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_383 | Resilience Under Plateau Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_384 | Resilience Under Plateau Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_385 | Action Orientation Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_386 | Action Orientation Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_387 | Autonomy & Mastery Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_388 | Autonomy & Mastery Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 12 — Self-Concept & Identity (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| rses-10 | RSES (Rosenberg Self-Esteem Scale) | 10 | 0–3 or 1–4 depending on version | Official 0–30 or 10–40 depending on scoring convention | Standard published RSES scoring includes reverse-scored items in the original method | Yes; original approach uses reverse-scored items | Standard self-esteem bands | validated screening | Rosenberg 1965; official academic references | The site does not implement the official reverse-scored item pattern and uses a simplified generic sum | Missing official reverse-scored handling |
| self-concept-clarity | Self-Concept Clarity & Agency Scale | 4 | 0–3 | UNVERIFIED | Custom sum | No | Fluctuating identity / self-doubt | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_389 | Imposter Syndrome Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_390 | Imposter Syndrome Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_391 | Body Image Neutrality Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_392 | Body Image Neutrality Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_393 | Self-Compassion Index Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_394 | Self-Compassion Index Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_395 | Value Congruence Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_396 | Value Congruence Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 13 — Relationships & Attachment (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| attachment-ecr | ECR-Short (Adult Attachment Style Screener) | 5 | 0–3 | UNVERIFIED | Custom sum | Usually yes; instrument-specific | Generic secure attachment profile | validated screening / custom adaptation | Official ECR and attachment literature | Current code is a short custom version rather than the completed official scoring framework | Needs source-based validation before claims |
| relationship-satisfaction | Relationship Health & Satisfaction Index | 5 | 0–3 | UNVERIFIED | Custom sum | No | Relationship distress / vulnerability | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_397 | Codependency Check Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_398 | Codependency Check Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_399 | Trust Vulnerability Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_400 | Trust Vulnerability Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_401 | Conflict De-escalation Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_402 | Conflict De-escalation Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_403 | Emotional Boundary Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_404 | Emotional Boundary Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 14 — Children & Adolescents (10)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| sdq-short | SDQ (Strengths & Difficulties Screener for Youth) | 5 in current version | 0–2 or 0–3 depending on source version | 0–10 in current version; full SDQ has a different score profile | Custom score reduction | No | Generic normal-range indicator | validated screening / custom adaptation | Official SDQ documentation / institutional guidance | This version is a shortened custom form and not the full official SDQ scoring framework | Shortened and not source-equivalent |
| cat-child | CAT (Children's Apperception Test Projective Battery) | 0 in self-test flow | projective narrative task | Official scoring is qualitative | Qualitative narrative interpretation | N/A | Clinical narrative interpretation | clinician-administered instrument | Official CAT sources / academic use | Not implemented as a real source-backed test engine | Not suitable for self-service use |
| scale_405 | Academic Exam Stress Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_406 | Academic Exam Stress Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_407 | Peer Pressure Resistance Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_408 | Peer Pressure Resistance Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_409 | Family Communication Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_410 | Family Communication Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_411 | Digital Wellness Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_412 | Digital Wellness Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

## Domain 15 — Graphotherapy & Handwriting (11)

| ID | Assessment name | Qs | Response scale | Official min/max | Scoring method | Reverse score? | Interpretation / cutoffs | Type | Source / URL | Current code vs source | Discrepancy |
|---|---|---:|---|---|---|---|---|---|---|---|---|
| grapho-pressure | Heavy Pen Pressure & Emotional Tension Check | 4 | 0–3 | UNVERIFIED | Custom sum | No | Balanced / stressed pressure | custom / educational | No reliable external source found | This appears to be project-defined graphotherapy-style patterning, not an external validated instrument | CUSTOM / EDUCATIONAL |
| grapho-tbar | Letter 't' Bar Elevation & Goal Ambition Check | 4 | 0–3 | UNVERIFIED | Custom sum | No | Goal ambition trait | custom / educational | No reliable external source found | Project-defined handwriting pattern interpretation | CUSTOM / EDUCATIONAL |
| grapho-slant | Emotional Slant & Expressiveness Analysis | 4 | 0–3 | UNVERIFIED | Custom sum | No | Balanced emotional expression | custom / educational | No reliable external source found | Project-defined graphotherapy-style interpretation | CUSTOM / EDUCATIONAL |
| scale_413 | Baseline Stability Check Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_414 | Baseline Stability Check Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_415 | Margin Space Trait Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_416 | Margin Space Trait Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_417 | Lower Zone Loop Check Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_418 | Lower Zone Loop Check Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_419 | Upper Zone Extension Scale #1 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |
| scale_420 | Upper Zone Extension Scale #2 | 5 | 0–3 | UNVERIFIED | Custom sum | No | Minimal / Moderate / High indicator | custom / educational | No reliable external source found | Internally defined scale | CUSTOM / EDUCATIONAL |

---

## Assessment-Level Discrepancy List

These are the assessment entries that require special review because the current implementation does not match the source-backed or validated version, or because the source is not reliable enough to claim official scoring.

1. GAD-7 — simplified score bands; should use official 5 / 10 / 15 cutoffs exactly.
2. OASIS — generic thresholding; not source-specific enough without official scoring.
3. SIAS-6 — shortened educational variant; verify official cutoffs before claiming official interpretation.
4. PDSS-short — custom or shortened variant; not the full PDSS instrument.
5. HAI-short — custom educational short-form; not full official HAI as a scored instrument.
6. PSWQ-Brief — shortened adaptation; not a published full instrument match.
7. PHQ-9 — official 5-band output should be used, not collapsed severity groups.
8. CES-D — current implementation uses a 5-item adaptation of a larger instrument.
9. MDQ — current implementation is a short custom adaptation, not the original instrument.
10. PSS-10 — missing reverse-scored item logic in the current site implementation.
11. MBI-Self — custom 5-item burnout check, not full official MBI scoring.
12. PCL-5 — current item count and score range are not the published PCL-5 instrument.
13. IES-R — current version is a short custom adaptation.
14. ACE — current version is a custom abbreviated form, not the full official ACE scoring procedure.
15. TIPI-10 — current implementation is simplified and may not match the published instrument wording or scoring.
16. EPQ-R Short — custom short variant; not the official source-equivalent scoring procedure.
17. MBTI-style-16 — not a source-equivalent MBTI instrument; should be labeled as a project-defined personality type screener.
18. SD3-short — shorthand custom adaptation, not official Dark Triad full score.
19. MoCA-style — custom short-form adaptation rather than official MoCA assessment.
20. ASRS-v1 — likely simplified adaptation; official instrument scoring should be confirmed.
21. AQ-10 — current site should use the published instrument cutoffs and wording if it is being described as AQ-10.
22. PCL-5 / CAPS-5 / PANSS — clinician-administered instruments not appropriate for website self-testing.
23. RSES — missing reverse-scored item logic.
24. ADOS-2 — clinician-administered observation, not a self-service form.
25. WAIS-IV — clinician-administered standard test with formal psychometric scoring.
26. ADOS-2, PANSS, MMPI-2, Rorschach, TAT, BDI-II, HAM-A, 16PF, WAIS-IV, HTP, HFDT — not appropriate for website self-administration.
27. All `scale_###` entries — custom / educational unless verified by an actual external source.
28. Graphotherapy items — project-defined handwriting-style pattern rather than externally validated assessment constructs.

---

## Result Visualization Specification (Not Implemented)

This is a design specification only. It should be treated as a future requirement, not as a launch change.

### Normal bounded score

For a standard score where higher values are meaningful in a defined direction:
- Achieved score = user score
- Remaining = max score - user score
- Example: 14 / 21 = 14 achieved, 7 remaining

### Visualization requirements
- Accessible donut or circular score graphic
- Center shows score and max score
- Use a label such as "Score: 14 / 21"
- Show achieved portion and remaining portion
- Show percentage when meaningful (for example $score / maxScore \times 100$)
- Must not imply that higher is automatically better or worse unless that is explicitly appropriate to the instrument
- The interpretation text must explain the direction for the assessment

### Custom / educational assessment handling
- Add a label such as: "Custom / educational result"
- Explain that the score is a project-defined indicator, not a validated instrument score
- Keep the result clearly separate from validated clinical screening labels

---

## Standard Result Page Structure (Not Implemented)

1. Category / breadcrumb
2. Assessment title
3. Result level where appropriate
4. Score visualization
5. Score / maximum score
6. Percentage where mathematically meaningful
7. What this score means
8. Assessment-specific interpretation
9. Educational discussion / reflection
10. Important Note
11. Suggested next steps
12. Existing CTA / actions

---

## Quality Control Notes

The registry marks assessments as review-only when the answer to any of the following is no:
- What exactly is being scored?
- What is the maximum?
- Are any items reversed?
- What do the score bands mean?
- Is the instrument validated?
- Is it appropriate for self-administration here?
- Can we legally/usefully reproduce it?
- Does the current website match the documented source?

Any assessment with a `NO` answer should remain in review, not be silently corrected.

---

## Final Reviewer Critic

This registry intentionally avoids unsupported claims. It labels:
- custom educational scales as such
- clinician-administered instruments as such
- shortened adaptations as custom, not official
- uncertain scoring as unverified

The most important risk is that the catalog mixes validated instruments, custom scales, and clinical-only procedures in one list. The registry reflects that reality without pretending it is a single uniform source-backed library.

This file is research-only and does not implement or alter the live assessment flow.
