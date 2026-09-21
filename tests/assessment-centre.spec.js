const { test, expect } = require('@playwright/test');

test.setTimeout(300_000);

async function fillIntake(page, name, email) {
  await page.locator('#intake-name').fill(name);
  await page.locator('#intake-email').fill(email);
  await page.locator('#intake-age').fill('35');
  await page.locator('#intake-gender').selectOption('Prefer not to say');
  await page.locator('#intake-privacy-consent').check();
  await page.getByRole('button', { name: /Unlock Assessments/i }).click();
  await page.waitForSelector('#assessment-suite-container:not(.hidden)');
}

async function openAssessment(page, assessmentId) {
  await page.evaluate((id) => {
    const trigger = document.querySelector(`[data-assess-id="${id}"]`);
    if (!trigger) {
      throw new Error(`Missing assess trigger for ${id}`);
    }
    trigger.click();
  }, assessmentId);
  await page.waitForSelector('#active-assessment-modal-content form');
  const form = page.locator('#active-assessment-modal-content form');
  await expect(form).toBeVisible();
  return form;
}

async function answerEveryQuestionGroup(form, strategy = 'first') {
  const grouped = await form.evaluate((node, mode) => {
    const radios = Array.from(node.querySelectorAll('input[type="radio"]'));
    const groups = new Map();

    radios.forEach((radio) => {
      const key = radio.name;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(radio);
    });

    const results = [];
    for (const [name, options] of groups.entries()) {
      const values = options.map((option) => Number(option.value));
      const selectedIndex = mode === 'minimum'
        ? 0
        : mode === 'maximum'
          ? values.length - 1
          : Math.max(0, Math.min(values.length - 1, Math.floor(values.length / 2)));

      options.forEach((option, index) => {
        option.checked = index === selectedIndex;
      });

      results.push({
        group: name,
        checkedCount: options.filter((option) => option.checked).length,
        total: options.length,
        selectedValue: options[selectedIndex]?.value ?? null
      });
    }

    return results;
  }, strategy);

  const valid = grouped.every((group) => group.checkedCount === 1 && Number.isFinite(Number(group.selectedValue)));
  expect(valid).toBeTruthy();
  return grouped;
}

async function submitAssessmentAndVerify(page, assessmentId) {
  const submitButton = page.locator('#active-assessment-modal-content button[type="submit"]');
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  const output = page.locator('#active-test-results-output');
  await expect(output).toBeVisible();

  const text = await output.textContent();
  expect(text).toBeTruthy();
  expect(text).not.toMatch(/NaN|Infinity|-Infinity/i);

  const scoreMatch = text.match(/(\d+)\s*\/\s*(\d+)/);
  expect(scoreMatch).not.toBeNull();
  const score = Number(scoreMatch[1]);
  const maxScore = Number(scoreMatch[2]);
  expect(Number.isFinite(score)).toBeTruthy();
  expect(Number.isFinite(maxScore)).toBeTruthy();
  expect(score).toBeGreaterThanOrEqual(0);
  expect(score).toBeLessThanOrEqual(maxScore);
  expect(text).toMatch(/What your score shows|Discussion|Important Note/i);

  const svgCount = await output.locator('svg').count();
  expect(svgCount).toBeGreaterThan(0);

  const hasImportantNote = /Important Note/i.test(text);
  const hasResultsAtAGlance = /Results at a Glance|Results At a Glance/i.test(text);
  const hasInterpretation = /Interpretation|What your score shows/i.test(text);
  const hasDiscussion = /Discussion/i.test(text);
  const hasConclusion = /Conclusion/i.test(text);
  expect(hasImportantNote).toBeTruthy();
  expect(hasResultsAtAGlance).toBeTruthy();
  expect(hasInterpretation).toBeTruthy();
  expect(hasDiscussion).toBeTruthy();
  expect(hasConclusion).toBeTruthy();
  expect(text).toContain((await page.locator('#active-assessment-modal-content h4').textContent()).trim());
  expect(text).not.toMatch(/This result is for this assessment/i);

  const factorResults = await page.evaluate((id) => {
    const item = PSYCH_ASSESSMENTS.find((assessment) => assessment.id === id);
    if (!item) throw new Error(`Missing assessment ${id}`);
    const scores = Array(item.questions.length).fill(Math.floor(item.options.length / 2));
    const result = item.scoring(scores);
    return Array.isArray(result.factors) ? result.factors : [];
  }, assessmentId);
  if (factorResults.length > 1) {
    expect(text).toMatch(/Results at a Glance/i);
    expect(text).toMatch(/Overall Profile/i);
    expect(text).toMatch(/Factor Interpretation/i);
    await expect(output.locator('[aria-label="Individual factor scores"]')).toBeVisible();
    for (const factor of factorResults) {
      expect(text).toContain(factor.name);
      expect(text).toContain(`${factor.score} / ${factor.maxScore}`);
      expect(text).toContain(factor.level);
      expect(text).toContain(factor.meaning);
    }
  }

  const comparisonText = text.replace(/\s+/g, ' ').trim();
  return {
    score,
    maxScore,
    text: comparisonText,
    assessmentId,
    hasVisual: svgCount > 0,
    hasInterpretation,
    factorCount: factorResults.length
  };
}

async function closeAssessmentModal(page) {
  const modal = page.locator('#active-assessment-modal');
  try {
    if (await modal.isVisible().catch(() => false)) {
      await page.locator('#active-assessment-modal button[aria-label="Close"]').click();
    }
  } catch (_error) {
    // Ignore cleanup issues when the modal is already closed.
  }
}

test('free assessment centre smoke sweep', async ({ page }) => {
  await page.goto('/testing.html');
  await fillIntake(page, 'Automation User', 'automation@example.com');

  const freeAssessmentIds = await page.evaluate(() => {
    return PSYCH_ASSESSMENTS.filter(item => !item.isPaid).map(item => item.id);
  });

  expect(freeAssessmentIds.length).toBe(161);

  const failures = [];
  const factorCounts = {};

  for (const [index, assessmentId] of freeAssessmentIds.entries()) {
    try {
      const form = await openAssessment(page, assessmentId);
      const groups = await answerEveryQuestionGroup(form, 'middle');
      expect(groups.length).toBeGreaterThan(0);
      const result = await submitAssessmentAndVerify(page, assessmentId);
      if (result.factorCount > 1) factorCounts[assessmentId] = result.factorCount;
    } catch (error) {
      failures.push({ id: assessmentId, error: String(error && error.message ? error.message : error) });
    }

    if (index % 20 === 0 || index === freeAssessmentIds.length - 1) {
      await closeAssessmentModal(page);
    }
  }

  expect(failures).toEqual([]);
  expect(Object.keys(factorCounts).sort()).toEqual(['epq-r-short', 'mbti-style-16', 'sd3-short', 'tipi-10']);
  expect(Object.values(factorCounts).every((count) => count > 1)).toBeTruthy();
  console.log(`Validated ${freeAssessmentIds.length} free assessments; factor profiles: ${JSON.stringify(factorCounts)}`);
});
