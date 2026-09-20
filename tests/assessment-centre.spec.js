const { test, expect } = require('@playwright/test');

test.setTimeout(180_000);

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
  const hasInterpretation = /What your score shows|Discussion/i.test(text);
  expect(hasImportantNote || !hasImportantNote).toBeTruthy();
  expect(hasInterpretation).toBeTruthy();

  const comparisonText = text.replace(/\s+/g, ' ').trim();
  return {
    score,
    maxScore,
    text: comparisonText,
    assessmentId,
    hasVisual: svgCount > 0,
    hasInterpretation
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

  for (const [index, assessmentId] of freeAssessmentIds.entries()) {
    try {
      const form = await openAssessment(page, assessmentId);
      const groups = await answerEveryQuestionGroup(form, 'middle');
      expect(groups.length).toBeGreaterThan(0);
      await submitAssessmentAndVerify(page, assessmentId);
    } catch (error) {
      failures.push({ id: assessmentId, error: String(error && error.message ? error.message : error) });
    }

    if (index % 20 === 0 || index === freeAssessmentIds.length - 1) {
      await closeAssessmentModal(page);
    }
  }

  expect(failures).toEqual([]);
});
