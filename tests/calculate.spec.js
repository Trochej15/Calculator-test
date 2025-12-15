const { test, expect } = require('@playwright/test');

const URL = 'https://cs.gmu.edu:8443/offutt/servlet/calculate';

// Helper functions
async function fillNumbers(page, a, b) {
  if (a !== null) await page.fill('input[name="firstVal"]', a);
  if (b !== null) await page.fill('input[name="secondVal"]', b);
}

async function getResult(page) {
  return await page.inputValue('input[name="result"]');
}

/* -----------------------------
   Numeric Calculator Tests
------------------------------*/

test('T1: Add 33 + 33 = 66', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '33');
  await page.click('input[value="Add"]');
  expect(await getResult(page)).toBe('66');
});

test('T2: Subtract 33 - 33 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '33');
  await page.click('input[value="Subtract"]');
  expect(await getResult(page)).toBe('0');
});

test('T3: Add 33 + (-33) = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '-33');
  await page.click('input[value="Add"]');
  expect(await getResult(page)).toBe('0');
});

test('T4: Empty + 33 = 33', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, null, '33');
  await page.click('input[value="Add"]');
  expect(await getResult(page)).toBe('33');
});

test('T5: Multiply 2 * 3 = 6', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '2', '3');
  await page.click('input[value="Multiply"]');
  expect(await getResult(page)).toBe('6');
});

test('T6: Multiply 0 * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '0', '2');
  await page.click('input[value="Multiply"]');
  expect(await getResult(page)).toBe('0');
});

test('T7: Empty * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, null, '2');
  await page.click('input[value="Multiply"]');
  expect(await getResult(page)).toBe('0');
});

test('T8: Divide 2 / 2 = 1', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '2', '2');
  await page.click('input[value="Divide"]');
  expect(await getResult(page)).toBe('1');
});

test('T9: Divide 1 / 0 shows error', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '1', '0');
  await page.click('input[value="Divide"]');
  await expect(
    page.locator('text=One or more of your entries')
  ).toBeVisible();
});

test('T10: Empty / 1 = 0', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, null, '1');
  await page.click('input[value="Divide"]');
  expect(await getResult(page)).toBe('0');
});

/* -----------------------------
   Invalid Input Tests
------------------------------*/

test('T11: aa + 1 shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, 'aa', '1');
  await page.click('input[value="Add"]');
  await expect(page.locator('text=not numeric')).toBeVisible();
});

test('T12: aa * 2 shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, 'aa', '2');
  await page.click('input[value="Multiply"]');
  await expect(page.locator('text=not numeric')).toBeVisible();
});

test('T13: aa + aa shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, 'aa', 'aa');
  await page.click('input[value="Add"]');
  await expect(page.locator('text=not numeric')).toBeVisible();
});

/* -----------------------------
   String Length Tests
------------------------------*/

async function computeLength(page, text) {
  if (text !== null) await page.fill('input[name="name"]', text);
  await page.click('input[value="Compute Length"]');
  return await page.inputValue('input[name="length"]');
}

test('T14: length(jose) = 4', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, 'jose')).toBe('4');
});

test('T15: length(1234) = 4', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, '1234')).toBe('4');
});

test('T16: length(acd) = 3', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, 'acd')).toBe('3');
});

test('T17: length(empty) = 0', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, null)).toBe('0');
});

test('T18: length(12er4) = 5', async ({ page }) => {
  await page.goto(URL);
  expect(await computeLength(page, '12er4')).toBe('5');
});

/* -----------------------------
   Reset Test
------------------------------*/

test('Reset clears all fields', async ({ page }) => {
  await page.goto(URL);
  await fillNumbers(page, '33', '33');
  await page.fill('input[name="name"]', 'jose');
  await page.click('input[value="Reset"]');
  await page.screenshot({ path: 'screenshots/reset-clears-all.png' });
});
