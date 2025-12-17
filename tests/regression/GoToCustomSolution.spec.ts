import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.po';
import { BASE_URL } from '../../config';

test('Get your custom solution button navigates to /contact', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.customSolutionButton).toBeVisible();
  await expect(home.customSolutionButton).toHaveAttribute('href', '/contact');
  await expect(home.customSolutionButton).toHaveText('Get your custom solution');

  await Promise.all([
    page.waitForURL(`${BASE_URL}/contact`),
    home.clickGetCustomSolution(),
  ]);

  await expect(page).toHaveURL(`${BASE_URL}/contact`);
});