import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test('Check language switching in header (en → de)', async ({ page }) => {
  await page.goto(BASE_URL);

  // Кнопка выбора языка
  const langButton = page.locator('button[aria-label^="Current language"]');
  await expect(langButton).toBeVisible();
  await expect(langButton).toHaveText('en');

  // Открываем список языков
  await langButton.click();

  // Кнопка переключения на de
  const deButton = page.locator('button[aria-label="Change language to de"]');
  await expect(deButton).toBeVisible();

  // Кликаем и ждём перехода
  await Promise.all([
    page.waitForURL(`${BASE_URL}/de`),
    deButton.click(),
  ]);

  // Проверяем URL
  await expect(page).toHaveURL(`${BASE_URL}/de`);

  // Проверяем, что кнопка теперь отображает de
  const newLangButton = page.locator('button[aria-label^="Current language"]');
  await expect(newLangButton).toHaveText('de');
});