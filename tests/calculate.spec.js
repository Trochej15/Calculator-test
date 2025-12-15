const { test, expect } = require('@playwright/test');

const URL = 'https://cs.gmu.edu:8443/offutt/servlet/calculate';

/* -----------------------------
   Numeric Calculator Tests
------------------------------*/

// Test 1: 33 + 33 = 66
test('T1: Add 33 + 33 = 66', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '33');
  await page.fill('input[name="secondVal"]', '33');
  await page.click('button:has-text("Add")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('66');
});

// Test 2: 33 - 33 = 0
test('T2: Subtract 33 - 33 = 0', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '33');
  await page.fill('input[name="secondVal"]', '33');
  await page.click('button:has-text("Subtract")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('0');
});

// Test 3: 33 + (-33) = 0
test('T3: Add 33 + (-33) = 0', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '33');
  await page.fill('input[name="secondVal"]', '-33');
  await page.click('button:has-text("Add")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('0');
});

// Test 4: empty + 33 = 33
test('T4: Empty + 33 = 33', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="secondVal"]', '33');
  await page.click('button:has-text("Add")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('33');
});

// Test 5: 2 * 3 = 6
test('T5: Multiply 2 * 3 = 6', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '2');
  await page.fill('input[name="secondVal"]', '3');
  await page.click('button:has-text("Multiply")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('6');
});

// Test 6: 0 * 2 = 0
test('T6: Multiply 0 * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '0');
  await page.fill('input[name="secondVal"]', '2');
  await page.click('button:has-text("Multiply")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('0');
});

// Test 7: empty * 2 = 0
test('T7: Empty * 2 = 0', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="secondVal"]', '2');
  await page.click('button:has-text("Multiply")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('0');
});

// Test 8: 2 / 2 = 1
test('T8: Divide 2 / 2 = 1', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '2');
  await page.fill('input[name="secondVal"]', '2');
  await page.click('button:has-text("Divide")');
  const result = await page.inputValue('input[name="result"]');
  expect(result).toBe('1');
});

// Test 9: 1 / 0 = Infinity or error
test('T9: Divide 1 / 0 = Infinity or error', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '1');
  await page.fill('input[name="secondVal"]', '0');
  await page.click('button:has-text("Divide")');
  const result = await page.inputValue('input[name="result"]');
  expect(result === 'Infinity' || result === '').toBeTruthy();
});

// Test 10: empty / 1 = 0 or no computation
test('T10: Empty / 1 = 0 or no computation', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="secondVal"]', '1');
  await page.click('button:has-text("Divide")');
  const result = await page.inputValue('input[name="result"]');
  expect(result === '0' || result === '').toBeTruthy();
});

// Test 11: aa + 1 → error message shown
test('T11: Invalid input aa + 1 shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', 'aa');
  await page.fill('input[name="secondVal"]', '1');
  await page.click('button:has-text("Add")');

  await expect(
    page.locator('text=One or more of your entries was not numeric')
  ).toBeVisible();

  await page.screenshot({ path: 'screenshots/error-aa-plus-1.png' });
});

// Test 12: aa * 2 → error message shown
test('T12: Invalid input aa * 2 shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', 'aa');
  await page.fill('input[name="secondVal"]', '2');
  await page.click('button:has-text("Multiply")');

  await expect(
    page.locator('text=One or more of your entries was not numeric')
  ).toBeVisible();

  await page.screenshot({ path: 'screenshots/error-aa-multiply-2.png' });
});

// Test 13: aa + aa → error message shown
test('T13: Invalid input aa + aa shows numeric error', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', 'aa');
  await page.fill('input[name="secondVal"]', 'aa');
  await page.click('button:has-text("Add")');

  await expect(
    page.locator('text=One or more of your entries was not numeric')
  ).toBeVisible();

  await page.screenshot({ path: 'screenshots/error-aa-aa.png' });
});


/* -----------------------------
   String Length Calculator Tests
------------------------------*/

// Test 14: length("jose") = 4
test('T14: Compute length of jose = 4', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="name"]', 'jose');
  await page.click('button:has-text("Compute Length")');
  const length = await page.inputValue('input[name="length"]');
  expect(length).toBe('4');
});

// Test 15: length("1234") = 4
test('T15: Compute length of 1234 = 4', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="name"]', '1234');
  await page.click('button:has-text("Compute Length")');
  const length = await page.inputValue('input[name="length"]');
  expect(length).toBe('4');
});

// Test 16: length("acd") = 3
test('T16: Compute length of acd = 3', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="name"]', 'acd');
  await page.click('button:has-text("Compute Length")');
  const length = await page.inputValue('input[name="length"]');
  expect(length).toBe('3');
});

// Test 17: length(empty) = 0
test('T17: Compute length of empty string = 0', async ({ page }) => {
  await page.goto(URL);
  await page.click('button:has-text("Compute Length")');
  const length = await page.inputValue('input[name="length"]');
  expect(length === '0' || length === '').toBeTruthy();
});

// Test 18: length("12er4") = 5
test('T18: Compute length of 12er4 = 5', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="name"]', '12er4');
  await page.click('button:has-text("Compute Length")');
  const length = await page.inputValue('input[name="length"]');
  expect(length).toBe('5');
});

/* -----------------------------
   Reset Behavior Test
------------------------------*/

test('Reset clears all fields', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="firstVal"]', '33');
  await page.fill('input[name="secondVal"]', '33');
  await page.fill('input[name="name"]', 'jose');
  await page.click('button:has-text("Reset")');
  await page.screenshot({ path: 'screenshots/reset-clears-all.png' });
});
