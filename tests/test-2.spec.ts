import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('ค้นหา', { exact: true }).click();
  await page.getByLabel('ค้นหา', { exact: true }).fill('Hello World');

  
});