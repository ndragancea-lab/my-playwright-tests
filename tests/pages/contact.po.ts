import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

export class ContactPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly phoneDropdown: Locator;
  readonly jobTitleInput: Locator;
  readonly companyNameInput: Locator;
  readonly messageInput: Locator;
  readonly consentCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.phoneDropdown = page.locator('select[name="phone"], button:has-text("Albania"), button:has-text("Germany")').first();
    this.jobTitleInput = page.locator('input[name="jobTitle"]');
    this.companyNameInput = page.locator('input[name="company"]');
    this.messageInput = page.locator('textarea[name="message"]');
    this.consentCheckbox = page.locator('input[name="acceptTerms"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto(lang: string = 'en') {
    let path = '/contact';
    if (lang === 'de') path = '/de/contact';
    else if (lang === 'fr') path = '/fr/contact';
    else if (lang === 'nl') path = '/nl/contact';
    await this.page.goto(`${BASE_URL}${path}`);
  }

  /**
   * Check all form fields are visible
   */
  async checkFormFieldsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.jobTitleInput).toBeVisible();
    await expect(this.companyNameInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.consentCheckbox).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Check form field labels
   */
  async checkFormLabels(expectedLabels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    message: string;
    submit: string;
  }) {
    // Check labels by finding label elements specifically
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.firstName }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.lastName }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.email }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.phone }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.jobTitle }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.companyName }).first()).toBeVisible();
    await expect(this.page.locator('label').filter({ hasText: expectedLabels.message }).first()).toBeVisible();
    await expect(this.submitButton).toContainText(expectedLabels.submit);
  }

  /**
   * Check page heading
   */
  async checkPageHeading(expectedHeading: string) {
    await expect(this.page.locator('h3').filter({ hasText: expectedHeading })).toBeVisible();
  }

  /**
   * Check page description
   */
  async checkPageDescription(expectedText: string) {
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }
}

