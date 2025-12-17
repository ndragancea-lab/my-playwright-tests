import { Page, Locator, expect } from '@playwright/test';

export class AiDevelopmentPage {
  readonly page: Page;
  readonly exploreAISolButton:Locator;
  readonly heading: Locator;
  readonly infographicBlocks: Locator;
  readonly infographicBlocks1: Locator;
  readonly infographicBlocks2: Locator;
  readonly ctaButtons: Locator;
  readonly ctaButtons1: Locator;
  readonly ctaButtons2: Locator;


  constructor(page: Page) {
   this.page = page;
    this.exploreAISolButton = page.locator("section[class='w-full bg-dark relative overflow-visible py-25 md:py-20 lg:py-24'] div[class='hidden lg:flex w-full flex-row gap-[9.17%]'] span[class='font-normal text-[24px] md:text-[36px] leading-[29px] md:leading-[43px] tracking-[-0.02em] text-[#081319] whitespace-normal md:whitespace-nowrap']");
    this.heading = page.locator('h1:has-text("Transform your business with AI, data, and cloud solutions")');
    this.infographicBlocks = page.locator('text=AI solutions');
    this.infographicBlocks1 = page.locator('text=Cloud infrastructure');
    this.infographicBlocks2 = page.locator('text=Data platform');
    this.ctaButtons = page.locator("body > main:nth-child(2) > section:nth-child(2) > section:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(2)");
    this.ctaButtons1 = page.locator("body > main:nth-child(2) > section:nth-child(2) > section:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(2)");
    this.ctaButtons2 = page.locator("body > main:nth-child(2) > section:nth-child(2) > section:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(2)");
  }
async clickByJS(locator: Locator) {
  await this.page.evaluate((el) => {
    (el as HTMLElement).click();
  }, await locator.elementHandle());
}

  async goto() {
   await this.page.goto('https://aie.griddynamics.com/services/ai-development');
   // await this.page.goto('https://gd-gcp-tools-ai-engineering-dev-725600019517.europe-west1.run.app/');
  }

  async verifyContentVisible() {

    await expect(this.heading).toBeVisible();
    await this.clickByJS(this.infographicBlocks.first());
    await this.clickByJS(this.infographicBlocks1.first());
    await this.clickByJS(this.infographicBlocks2.first());
  }

  async clickCtaButton(locator: Locator) {
    console.log(`Кликаю по кнопке:}` ,locator);
  await Promise.all([
    this.page.waitForURL(/\/contact$/),
    locator.click(),
  ]);
  await this.page.goBack();  // Возвращаемся обратно
  await this.page.waitForLoadState('load');
}

async clickAllCtaButtons() {
  await this.clickCtaButton(this.ctaButtons);
  await this.clickCtaButton(this.ctaButtons1);
  await this.clickCtaButton(this.ctaButtons2);
  await this.clickCtaButton(this.exploreAISolButton);
}
}