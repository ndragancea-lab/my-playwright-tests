import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';
import { HeaderPage } from '../pages/header.po'; 

test('Check LETS TALK button', async ({ page }) => {
  const header = new HeaderPage(page);
  await header.gotoHome();

  await expect(header.letsTalkButton).toBeVisible();
  await expect(header.letsTalkButton).toBeEnabled();

  await Promise.all([
    page.waitForURL(`${BASE_URL}/contact`),
    header.clickLetsTalk(),
  ]);

  await expect(page).toHaveURL(`${BASE_URL}/contact`);
});