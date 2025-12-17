import { test } from '@playwright/test';
import { HeaderPage } from '../pages/header.po';

const testData = [
  {
    lang: 'en',
    expectedNavTexts: [
      'AI DEVELOPMENT',
      'TECHNOLOGY CONSULTING',
      'TEAM AUGMENTATION',
      'INDUSTRY SOLUTIONS'
    ],
    expectedNavLinks: [
      { text: 'AI DEVELOPMENT', href: '/services/ai-development' },
      { text: 'TECHNOLOGY CONSULTING', href: '/services/technology-consulting' },
      { text: 'TEAM AUGMENTATION', href: '/services/team-augmentation' },
      { text: 'INDUSTRY SOLUTIONS', href: '/services/industry-solution' },
    ]
  },
  {
    lang: 'de',
    expectedNavTexts: [
      'KI-ENTWICKLUNG',
      'TECHNOLOGIE-BERATUNG',
      'TEAM-ERWEITERUNG',
      'BRANCHENLÖSUNGEN'
    ],
    expectedNavLinks: [
      { text: 'KI-ENTWICKLUNG', href: '/de/services/ai-development' },
      { text: 'TECHNOLOGIE-BERATUNG', href: '/de/services/technology-consulting' },
      { text: 'TEAM-ERWEITERUNG', href: '/de/services/team-augmentation' },
      { text: 'BRANCHENLÖSUNGEN', href: '/de/services/industry-solution' },
    ]
  },
  {
    lang: 'fr',
    expectedNavTexts: [
      'Développement IA',
      'Conseil technologique',
      'Renforcement d\u2019équipes',
      'Solutions industrielles'
    ],
    expectedNavLinks: [
      { text: 'Développement IA', href: '/fr/services/ai-development' },
      { text: 'Conseil technologique', href: '/fr/services/technology-consulting' },
      { text: 'Renforcement d\u2019équipes', href: '/fr/services/team-augmentation' },
      { text: 'Solutions industrielles', href: '/fr/services/industry-solution' },
    ]
  },
  {
    lang: 'nl',
    expectedNavTexts: [
      'AI-ONTWIKKELING',
      'TECHNOLOGIE ADVIES',
      'TEAMUITBREIDING',
      'BRANCHEOPLOSSINGEN'
    ],
    expectedNavLinks: [
      { text: 'AI-ONTWIKKELING', href: '/nl/services/ai-development' },
      { text: 'TECHNOLOGIE ADVIES', href: '/nl/services/technology-consulting' },
      { text: 'TEAMUITBREIDING', href: '/nl/services/team-augmentation' },
      { text: 'BRANCHEOPLOSSINGEN', href: '/nl/services/industry-solution' },
    ]
  }
];

for (const { lang, expectedNavTexts, expectedNavLinks } of testData) {
  test(`Check header components for language ${lang.toUpperCase()}`, async ({ page }) => {
    const header = new HeaderPage(page);

    await header.gotoWithLang(lang);

    // Check logo button
    await header.checkLogoButton();

    // Check navigation links visibility and text
    await header.checkNavLinksVisibility(expectedNavTexts);

    // Check language button
    await header.checkLanguageButton();

    // Check Let's Talk button
    await header.checkLetsTalkButton(lang);
  });

  test(`Check navigation in header for language ${lang.toUpperCase()}`, async ({ page }) => {
    const header = new HeaderPage(page);

    await header.gotoWithLang(lang);
    await header.checkNavLinks(expectedNavLinks);
  });

  test(`Check Let's Talk button for language ${lang.toUpperCase()}`, async ({ page }) => {
    const header = new HeaderPage(page);

    await header.gotoWithLang(lang);
    await header.checkLetsTalkNavigation(lang);
  });
}

