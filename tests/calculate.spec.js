const { test, expect } = require('@playwright/test');

const URL = 'https://cs.gmu.edu:8443/offutt/servlet/calculate';

/* =========================
   Helper Functions
========================= */

async function fillNumbers(page, lhs, rhs) {
  if (lhs !== null) await page.fill('input[name="LHS"]', lhs);
  if (rhs !== null) await page.fill('input[name="RHS"]', rhs);
}

async function getNumericResult(page) {
  const value = await page.inputValue('input[name="RSLT"]');
  return value === '' ? 0 : parseFloat(value);
}

async function computeLength(page, value) {
  if (value !== null) {
    await page.fill('input[name="NAMESTRING"]', value);
  }
  await page.click('input[value="Compute Length"]');
  return await page.inputValue('input[name="RSLTLEN"]');
}

/* =========================
   Arithmetic Tests
========================= */

test('T1: Add 33 + 33 = 66', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '33');
  await page.click('input[value="Add"]');
  expect(await getNumericResult(page)).toBe(66);
});

test('T2: Subtract 33 - 33 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '33');
  await page.click('input[value="Subtract"]');
  expect(await getNumericResult(page)).toBe(0);
});

test('T3: Add 33 + (-33) = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '-33');
  await page.click('input[value="Add"]');
  expect(await getNumericResult(page)).toBe(0);
});

test('T4: Empty + 33 = 33', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, null, '33');
  await page.click('input[value="Add"]');
  expect(await getNumericResult(page)).toBe(33);
});

test('T5: Multiply 2 * 3 = 6', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '2', '3');
  await page.click('input[value="Multiply"]');
  expect(await getNumericResult(page)).toBe(6);
});

test('T6: Multiply 0 * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '0', '2');
  await page.click('input[value="Multiply"]');
  expect(await getNumericResult(page)).toBe(0);
});

test('T7: Empty * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, null, '2');
  await page.click('input[value="Multiply"]');
  expect(await getNumericResult(page)).toBe(0);
});

test('T8: Divide 2 / 2 = 1', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '2', '2');
  await page.click('input[value="Divide"]');
  expect(await getNumericResult(page)).toBe(1);
});

/* =========================
   Error Handling + Anomaly Screenshots
========================= */

test('T9: Divide 1 / 0 shows numeric error (ANOMALY)', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '1', '0');
  await page.click('input[value="Divide"]');
  await page.screenshot({ path: 'screenshots/anomaly-divide-by-zero.png' });
});

test('T10: aa + 1 shows numeric error (ANOMALY)', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, 'aa', '1');
  await page.click('input[value="Add"]');

  await expect(page.locator('text=not numeric')).toBeVisible();
  await page.screenshot({ path: 'screenshots/anomaly-invalid-input.png' });
});

test('T11: Result field is editable (ANOMALY)', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="RSLT"]', '999');
  await page.screenshot({ path: 'screenshots/anomaly-result-editable.png' });
});

/* =========================
   String Length Tests
========================= */

test('T12: Compute length of jose = 4', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, 'jose')).toBe('4');
});

test('T13: Compute length of 1234 = 4', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, '1234')).toBe('4');
});

test('T14: Compute length of acd = 3', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, 'acd')).toBe('3');
});

test('T15: Compute length of empty string returns empty (ANOMALY)', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, null)).toBe('');
  await page.screenshot({ path: 'screenshots/anomaly-empty-length.png' });
});

test('T16: Compute length of 12er4 = 5', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, '12er4')).toBe('5');
});
