import { test, expect } from '@playwright/test';
import { AiDevelopmentPage } from '../pages/aiDevelopment.po';

test('AI Development page — loads and CTA leads to contact', async ({ page }) => {
  const aiPage = new AiDevelopmentPage(page);
  //await page.setViewportSize({ width: 1280, height: 800 });
  await aiPage.goto();
  await aiPage.verifyContentVisible();
  await aiPage.clickAllCtaButtons();

  //await expect(page).toHaveURL(/\/contact$/);
});
