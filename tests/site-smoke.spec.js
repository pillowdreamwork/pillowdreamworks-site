const { test, expect } = require('@playwright/test');

const ROUTES = [
  '/',
  '/about',
  '/assessments',
  '/books',
  '/books/bundles',
  '/books/finding-the-centre',
  '/books/psychology-toolkit',
  '/contact',
  '/learn',
  '/legal/cookie',
  '/legal/disclaimer',
  '/legal/privacy',
  '/legal/refund',
  '/legal/terms',
  '/pricing',
  '/services',
  '/studio',
];

test('every route responds, has a heading, a language and no nested interactive HTML', async ({ page }) => {
  for (const route of ROUTES) {
    const response = await page.goto(route);
    expect(response && response.status(), `status for ${route}`).toBe(200);

    await expect(page.locator('h1').first(), `h1 on ${route}`).toBeVisible();

    const lang = await page.evaluate(() => document.documentElement.getAttribute('lang'));
    expect(lang, `document lang on ${route}`).toBeTruthy();

    const imagesMissingAlt = await page.evaluate(
      () => Array.from(document.querySelectorAll('img')).filter((img) => !img.hasAttribute('alt')).length
    );
    expect(imagesMissingAlt, `images missing alt on ${route}`).toBe(0);

    // Anchors and buttons must never nest inside one another.
    const nestedInteractive = await page.evaluate(() => {
      const offenders = [];
      const bad = 'a a, a button, button a, button button, a [role="button"], [role="button"] a';
      document.querySelectorAll(bad).forEach((el) => offenders.push(`${el.tagName}:${el.textContent.trim().slice(0, 40)}`));
      return offenders;
    });
    expect(nestedInteractive, `nested interactive elements on ${route}`).toEqual([]);
  }
});

test('pricing and safety content matches the published single source', async ({ page }) => {
  await page.goto('/pricing');
  const pricingInr = await page.locator('body').innerText();
  for (const expected of ['₹799', '₹1,899', '₹2,299', '₹2,499', '₹2,999', '₹3,499', '₹3,999', '₹4,999', '₹1,799', '₹1,499', '₹999', 'Checkout is being prepared']) {
    expect(pricingInr, `pricing page (INR) should show ${expected}`).toContain(expected);
  }
  for (const legacy of ['Diwali', '₹1,079', '₹1,224', '₹1,348', '20% OFF', 'Save ₹']) {
    expect(pricingInr, `pricing page must not contain legacy value ${legacy}`).not.toContain(legacy);
  }

  await page.getByRole('button', { name: /International/i }).click();
  const pricingUsd = await page.locator('body').innerText();
  for (const expected of ['$69', '$129', '$149', '$199', '$249', '$299', '$349', '$399', '$499', '$549', '$29.99', '$24.99', '$12.49']) {
    expect(pricingUsd, `pricing page (USD) should show ${expected}`).toContain(expected);
  }

  await page.goto('/services');
  const services = await page.locator('body').innerText();
  expect(services).toContain('Crisis Stabilisation Call');
  expect(services).toContain('Not an emergency-response service');
  expect(services).toContain('14416');
  expect(services).toContain('+91 9999 666 555');
  expect(services).toContain('988');
  for (const removed of ['KIRAN', '1800-599-0019', 'UK']) {
    expect(services, `services page must not contain ${removed}`).not.toContain(removed);
  }

  await page.goto('/assessments');
  const assessments = await page.locator('body').innerText();
  expect(assessments).toContain('Checkout is being prepared. Purchases are not available yet.');

  await page.goto('/books/bundles');
  const bundles = await page.locator('body').innerText();
  expect(bundles).toContain('₹1,799');
  expect(bundles).toContain('$29.99');
  expect(bundles).toContain('Checkout is being prepared');

  await page.goto('/legal/privacy');
  const privacy = await page.locator('body').innerText();
  expect(privacy).toContain('Under legal review');
  expect(privacy).toContain('Privacy Request');
  expect(privacy).toContain('Guardian Consent');
});

test('book and assessment FAQs publish the required questions', async ({ page }) => {
  // Assessment Centre: all ten required questions are visible next to the
  // descriptions, together with a real privacy-request route.
  await page.goto('/assessments');
  let text = await page.locator('body').innerText();
  const assessmentQuestions = [
    'Is this a diagnosis?',
    'Will my answers be saved?',
    'Can anyone else see my results?',
    'Can I stop halfway through?',
    'Can I retake an assessment?',
    'What if I disagree with the result?',
    'Can I use results for diagnosis, employment or academic decisions?',
    'What happens if an assessment makes me uncomfortable?',
    'How do I delete my data?',
    'Are paid assessments reviewed by a practitioner?',
  ];
  for (const question of assessmentQuestions) {
    expect(text, `assessment FAQ should include ${question}`).toContain(question);
  }

  // Answer text sits behind the accordion — expand before asserting it.
  await page.getByRole('button', { name: 'How do I delete my data?', exact: true }).click();
  text = await page.locator('body').innerText();
  expect(text, 'privacy request route').toContain('mgmanishgarg3@gmail.com');
  expect(text, 'privacy request subject line').toContain('Privacy Request');

  await page
    .getByRole('button', { name: 'What happens if an assessment makes me uncomfortable?', exact: true })
    .click();
  text = await page.locator('body').innerText();
  expect(text, 'approved helplines').toContain('14416');
  expect(text, 'Vandrevala number').toContain('+91 9999 666 555');
  expect(text, 'US lifeline').toContain('988');
  expect(text, 'not monitored for emergencies').toContain('not an emergency service');

  // Psychology Toolkit product page: book questions + shared buying group.
  await page.goto('/books/psychology-toolkit');
  text = await page.locator('body').innerText();
  for (const question of [
    'What exactly is The Psychology Toolkit?',
    'What will I learn from it?',
    'Is it a textbook or a practical workbook?',
    'Can I print it?',
    'Can I share the PDF with friends or students?',
    'Choosing a book, buying, and delivery',
    'Which book should I choose first?',
    'Can I get a refund?',
  ]) {
    expect(text, `toolkit FAQ should include ${question}`).toContain(question);
  }

  // Finding The Centre product page: its own questions + buying group.
  await page.goto('/books/finding-the-centre');
  text = await page.locator('body').innerText();
  for (const question of [
    'What is Finding The Centre?',
    'What makes it different from The Psychology Toolkit?',
    'Is it only for children?',
    'Will I receive a physical book if I buy the eBook?',
    'Choosing a book, buying, and delivery',
    'What is included in the bundle?',
  ]) {
    expect(text, `centre FAQ should include ${question}`).toContain(question);
  }

  // Bundle page: buying, delivery and currency questions.
  await page.goto('/books/bundles');
  text = await page.locator('body').innerText();
  for (const question of [
    'How do I receive a digital purchase?',
    'What if my payment succeeds but I do not receive the book?',
    'Can I buy from outside India?',
    'Are the prices in different currencies automatically converted?',
  ]) {
    expect(text, `bundle FAQ should include ${question}`).toContain(question);
  }
});

test('no page leaks legacy campaign pricing', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const text = await page.locator('body').innerText();
    expect(text, `legacy campaign text on ${route}`).not.toMatch(/Diwali/i);
  }
});

test('key pages do not overflow horizontally on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ['/', '/pricing', '/services', '/assessments', '/books', '/books/bundles', '/contact']) {
    await page.goto(route);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `horizontal overflow on ${route} (${overflow}px)`).toBeLessThanOrEqual(1);
  }
});
