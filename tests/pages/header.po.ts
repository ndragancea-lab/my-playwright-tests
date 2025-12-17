import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

export class HeaderPage {
  readonly page: Page;
  readonly logoButton: Locator;
  readonly navLinks: Locator;
  readonly letsTalkButton: Locator;
  readonly languageButton: Locator;
  readonly languageOptionDe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoButton = page.locator('button[aria-label="Go to homepage"]:visible');
    this.navLinks = page.locator('a[data-cta-location="header_nav"]');
    this.letsTalkButton = page.locator('button[data-cta-location="header_cta"]:visible');
    this.languageButton = page.locator('button[aria-label^="Current language"]');
    this.languageOptionDe = page.locator('button[aria-label="Change language to de"]');
  }

  /**
   * Старый метод без языка (по умолчанию EN)
   */
  async gotoHome() {
    await this.page.goto(BASE_URL);
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  /**
   * Новый метод: переход с учётом языка
   */
  async gotoWithLang(lang: string = 'en') {
    const suffix = lang === 'de' ? '/de' : lang === 'fr' ? '/fr' : lang === 'nl' ? '/nl' : '';
    await this.page.goto(`${BASE_URL}${suffix}`);
  }

  async clickLetsTalk() {
    await this.letsTalkButton.click();
  }

  async changeLanguageToDe() {
    await this.languageButton.click();
    await this.languageOptionDe.click();
  }

  async clickNavLink(text: string) {
    await this.page.locator(`a[data-cta-location="header_nav"]:has-text("${text}")`).click();
  }

  /**
   * Check all header navigation links
   */
  async checkNavLinks(expectedLinks: { text: string; href: string }[]) {
    await expect(this.navLinks).toHaveCount(expectedLinks.length);

    for (let i = 0; i < expectedLinks.length; i++) {
      const link = this.navLinks.nth(i);
      await expect(link).toHaveText(expectedLinks[i].text);
      await expect(link).toHaveAttribute('href', expectedLinks[i].href);

      await Promise.all([
        this.page.waitForURL(`**${expectedLinks[i].href}`),
        link.click(),
      ]);

      await expect(this.page).toHaveURL(new RegExp(`${expectedLinks[i].href}$`));

      await this.page.goBack();
    }
  }

  /**
   * Check logo button visibility and state
   */
  async checkLogoButton() {
    await expect(this.logoButton).toBeVisible();
    await expect(this.logoButton).toBeEnabled();
  }

  /**
   * Check navigation links visibility and text
   */
  async checkNavLinksVisibility(expectedTexts: string[]) {
    await expect(this.navLinks).toHaveCount(expectedTexts.length);

    for (let i = 0; i < expectedTexts.length; i++) {
      await expect(this.navLinks.nth(i)).toHaveText(expectedTexts[i]);
      await expect(this.navLinks.nth(i)).toBeVisible();
    }
  }

  /**
   * Check language button visibility
   */
  async checkLanguageButton() {
    await expect(this.languageButton).toBeVisible();
  }

  /**
   * Check Let's Talk button and its functionality
   */
  async checkLetsTalkButton(lang: string = 'en') {
    await expect(this.letsTalkButton).toBeVisible();
    await expect(this.letsTalkButton).toBeEnabled();
  }

  /**
   * Check Let's Talk button navigation
   */
  async checkLetsTalkNavigation(lang: string = 'en') {
    await this.letsTalkButton.click();
    let expectedPath = '/contact';
    if (lang === 'de') expectedPath = '/de/contact';
    else if (lang === 'fr') expectedPath = '/fr/contact';
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }
}
