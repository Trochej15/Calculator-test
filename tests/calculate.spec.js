const { test } = require('@playwright/test');

const URL = 'https://cs.gmu.edu:8443/offutt/servlet/calculate';


test('ANOMALY: Invalid numeric input accepted', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="LHS"]', 'aa');
  await page.fill('input[name="RHS"]', '1');
  await page.click('input[value="Add"]');
  await page.screenshot({ path: 'screenshots/anomaly-invalid-input.png' });
});

test('ANOMALY: Result field is editable', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="RSLT"]', '999');
  await page.screenshot({ path: 'screenshots/anomaly-result-editable.png' });
});

test('ANOMALY: Empty string length produces empty output', async ({ page }) => {
  await page.goto(URL);
  await page.click('input[value="Compute Length"]');
  await page.screenshot({ path: 'screenshots/anomaly-empty-length.png' });
});
