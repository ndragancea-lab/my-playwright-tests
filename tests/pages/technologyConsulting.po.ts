import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

export class TechnologyConsultingPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly primaryCTA: Locator;
  readonly learnMoreButtons: Locator;
  readonly transformationButton: Locator;
  readonly solutionsDeployButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.locator('h1');
    this.primaryCTA = page.locator('a, button').filter({ hasText: /Define your strategy now|Jetzt Ihre KI-Strategie bewerten lassen|Évaluez votre stratégie IA maintenant|Définissez votre stratégie dès maintenant|Définissez votre stratégie maintenant|Definieer nu uw strategie/i }).first();
    this.learnMoreButtons = page.locator('button, a').filter({ hasText: /LEARN MORE|MEHR ERFAHREN|EN SAVOIR PLUS|DISCUTONS-EN|More information|Meer informatie/i });
    this.transformationButton = page.locator('a:visible, button:visible').filter({ hasText: /Begin transformation|Transformation starten|Commencer la transformation|Start transformatie/i }).first();
    this.solutionsDeployButton = page.locator('a:visible, button:visible').filter({ hasText: /Setzen Sie Ihre KI-Lösungen ein|Deploy your AI solutions/ }).first();
  }

  async goto(lang: string = 'en') {
    let path = '/services/technology-consulting';
    if (lang === 'de') path = '/de/services/technology-consulting';
    else if (lang === 'fr') path = '/fr/services/technology-consulting';
    else if (lang === 'nl') path = '/nl/services/technology-consulting';
    await this.page.goto(`${BASE_URL}${path}`);
  }

  /**
   * Check main page heading
   */
  async checkMainHeading(expectedHeading: string) {
    await expect(this.mainHeading).toContainText(expectedHeading);
  }

  /**
   * Check primary CTA button visibility
   */
  async checkPrimaryCTA() {
    await expect(this.primaryCTA).toBeVisible();
  }

  /**
   * Check "Learn More" buttons exist (may be in carousel, so visibility is optional)
   * For French: checks for "DISCUTONS-EN" button
   * For EN/DE: checks for "LEARN MORE" / "MEHR ERFAHREN" buttons
   */
  async checkLearnMoreButtons() {
    const count = await this.learnMoreButtons.count();
    // At least one button should exist (for French it's "DISCUTONS-EN", for others it's "LEARN MORE")
    expect(count).toBeGreaterThanOrEqual(1);
    
    // Verify at least one button exists in DOM (visibility optional for carousel)
    await expect(this.learnMoreButtons.first()).toBeAttached();
  }

  /**
   * Check transformation button
   */
  async checkTransformationButton() {
    await expect(this.transformationButton).toBeVisible();
  }

  /**
   * Check page sections exist (some may be in hidden carousel)
   */
  async checkPageSections(sections: string[]) {
    for (const section of sections) {
      // Check if text exists on page, regardless of visibility
      const element = this.page.getByText(section, { exact: false }).first();
      await expect(element).toBeAttached();
    }
  }

  /**
   * Check FAQ section
   */
  async checkFAQSection() {
    // FAQ might be in different formats, check for FAQ or localized version
    const faqLocator = this.page.locator('text=/FAQ|Veelgestelde vragen/i').first();
    await expect(faqLocator).toBeAttached();
  }
}

