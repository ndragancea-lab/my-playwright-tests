import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

export class TeamAugmentationPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly primaryCTA: Locator;
  readonly learnMoreButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.locator('h1');
    this.primaryCTA = page.locator('a, button').filter({ 
      hasText: /Start onboarding now|Vereinbaren Sie jetzt eine kostenlose Beratung|Commencer l['\u2019]intégration|Commencez l['\u2019]intégration|Start nu met onboarding/i 
    }).first();
    this.learnMoreButtons = page.locator('button, a').filter({ 
      hasText: /LEARN MORE|MEHR ERFAHREN|EN SAVOIR PLUS|DISCUTONS-EN|More information|Meer informatie/i 
    });
  }

  async goto(lang: string = 'en') {
    let path = '/services/team-augmentation';
    if (lang === 'de') path = '/de/services/team-augmentation';
    else if (lang === 'fr') path = '/fr/services/team-augmentation';
    else if (lang === 'nl') path = '/nl/services/team-augmentation';
    await this.page.goto(`${BASE_URL}${path}`);
  }

  /**
   * Check main page heading
   */
  async checkMainHeading(expectedHeading: string) {
    await expect(this.mainHeading).toContainText(expectedHeading);
  }

  /**
   * Check primary CTA button
   */
  async checkPrimaryCTA(expectedText: string) {
    // Check that button exists in DOM (may not be visible if above fold)
    await expect(this.primaryCTA).toBeAttached();
    // Check text content - use toContainText which handles partial matches
    await expect(this.primaryCTA).toContainText(expectedText, { ignoreCase: true });
  }

  /**
   * Check "Learn More" buttons exist (at least one)
   */
  async checkLearnMoreButtons() {
    const count = await this.learnMoreButtons.count();
    expect(count, 'At least one "Learn More" button should be present').toBeGreaterThan(0);
    // Check if at least one is attached to the DOM (may not be visible if in carousel)
    const firstButton = this.learnMoreButtons.first();
    await expect(firstButton).toBeAttached();
  }

  /**
   * Check page sections by text content
   */
  async checkPageSections(expectedSections: string[]) {
    for (const section of expectedSections) {
      // Check if text exists on page, regardless of visibility
      const element = this.page.getByText(section, { exact: false }).first();
      await expect(element).toBeAttached();
    }
  }
}

