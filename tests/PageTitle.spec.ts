import { test, expect } from '@playwright/test';

test('Check page title', async ({ page }) => {
  await page.goto('https://aie.griddynamics.com');
  await expect(page).toHaveTitle('AI-enabled Solutions for European Small and Medium Businesses | AI Engineering');
});
