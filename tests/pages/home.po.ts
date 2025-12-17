import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly customSolutionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customSolutionButton = page.locator('a[data-cta-location="home_hero_cta"]');
  }

  async goto() {
    await this.page.goto('https://aie.griddynamics.com');
  }

  async clickGetCustomSolution() {
    await this.customSolutionButton.click();
  }
}