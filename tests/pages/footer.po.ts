import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

export class FooterPage {
  readonly page: Page;
  readonly mainFooterLinks: Locator;
  readonly secondaryFooterLinks: Locator;
  readonly linkedInLink: Locator;
  readonly copyrightText: Locator;
  readonly emailContact: Locator;

  constructor(page: Page) {
    this.page = page;
    // Main service links in footer (AI Development, Technology Consulting, etc.)
    this.mainFooterLinks = page.locator('footer nav a, footer a[href*="/services"]').first();
    // Secondary footer links (About us, Privacy Policy, Terms, etc.)
    this.secondaryFooterLinks = page.locator('footer a').filter({ hasText: /About us|Investors|Global offices|Privacy Policy|Terms of Use|Cookie List|CCPA|Accessibility Statement/ });
    // Social media link
    this.linkedInLink = page.locator('footer a[href*="linkedin"]');
    // Copyright text
    this.copyrightText = page.locator('footer').getByText(/Copyright © \d{4} Grid Dynamics/);
    // Email contact
    this.emailContact = page.locator('footer').getByText('aie@griddynamics.com');
  }

  /**
   * Navigate to home page with language support
   */
  async gotoWithLang(lang: string = 'en') {
    const suffix = lang === 'de' ? '/de' : lang === 'fr' ? '/fr' : lang === 'nl' ? '/nl' : '';
    await this.page.goto(`${BASE_URL}${suffix}`);
  }

  /**
   * Scroll to footer
   */
  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
  }

  /**
   * Check main footer service links
   */
  async checkMainFooterLinks(expectedLinks: { text: string }[]) {
    for (const { text } of expectedLinks) {
      const link = this.page.locator('footer').getByText(text, { exact: true });
      await expect(link).toBeVisible();
    }
  }

  /**
   * Check secondary footer links (About us, Privacy, etc.)
   */
  async checkSecondaryFooterLinks(expectedLinks: { text: string; href?: string }[]) {
    for (const { text, href } of expectedLinks) {
      const link = this.page.locator('footer a').filter({ hasText: text }).nth(0);
      await expect(link).toBeVisible();
      if (href) {
        await expect(link).toHaveAttribute('href', href);
      }
    }
  }

  /**
   * Check LinkedIn link
   */
  async checkLinkedInLink() {
    await expect(this.linkedInLink).toBeVisible();
    await expect(this.linkedInLink).toHaveAttribute('href', /linkedin/);
  }

  /**
   * Check copyright text
   */
  async checkCopyright() {
    await expect(this.copyrightText).toBeVisible();
  }

  /**
   * Check email contact
   */
  async checkEmailContact() {
    await expect(this.emailContact).toBeVisible();
  }

  /**
   * Click footer link by text
   */
  async clickFooterLink(text: string) {
    await this.page.locator(`footer a:has-text("${text}")`).click();
  }
}

