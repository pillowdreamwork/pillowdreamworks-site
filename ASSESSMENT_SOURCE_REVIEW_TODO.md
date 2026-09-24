# Assessment Source Review TODO

This file tracks assessments that may require future source verification before any clinical or public-facing claims are made beyond the current educational screening usage.

## High-priority source review list

- GAD-7
- OASIS
- SIAS-6
- PDSS-short
- HAI-short
- PSWQ-Brief
- PHQ-9
- CES-D
- MDQ
- PSS-10
- MBI-Self
- PCL-5
- IES-R
- ACE
- TIPI-10
- EPQ-R Short
- MBTI-style-16
- SD3-short
- MoCA-style
- ASRS-v1
- AQ-10
- RSES
- all `scale_###` custom entries
- graphotherapy / handwriting pattern entries

## Clinical-only instruments that should remain out of self-service flows unless re-validated

- HAM-A
- BDI-II
- CAPS-5
- PANSS
- MMPI-2
- Rorschach
- TAT
- ADOS-2
- WAIS-IV
- 16PF
- HTP
- HFDT
- CAT-child

## Action required before future claims

1. Confirm the exact official wording of the instrument.
2. Confirm whether the current code matches the official item set, scoring logic, and interpretation bands.
3. Verify whether reverse-scored items are included.
4. Decide whether the assessment is a strict official instrument, a short-form adaptation, or a custom educational scale.
5. Label each item appropriately before any public claim about diagnosis, cutoffs, or validity.

## Implementation note

This list is intentionally separate from the live scoring engine. The current task does not change assessment scoring or public result logic; it only records future review needs.
