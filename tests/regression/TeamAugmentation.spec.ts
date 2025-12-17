import { test } from '@playwright/test';
import { TeamAugmentationPage } from '../pages/teamAugmentation.po';
import { HeaderPage } from '../pages/header.po';
import { FooterPage } from '../pages/footer.po';

const testData = [
  {
    lang: 'en',
    mainHeading: 'Hire and scale your team of expert software engineers',
    primaryCTAText: 'Start onboarding now',
    sections: [
      'Engineering team',
      'Complete development',
      'Skills',
      'FAQ'
    ],
    headerNavTexts: [
      'AI DEVELOPMENT',
      'TECHNOLOGY CONSULTING',
      'TEAM AUGMENTATION',
      'INDUSTRY SOLUTIONS'
    ],
    footerMainLinks: [
      { text: 'Home Page' },
      { text: 'AI Development' },
      { text: 'Technology Consulting' },
      { text: 'Team Augmentation' },
      { text: 'Industry Solutions' },
    ]
  },
  {
    lang: 'de',
    mainHeading: 'Stellen Sie Ihr Expertenteam aus Software-Ingenieuren ein und skalieren Sie es',
    primaryCTAText: 'Vereinbaren Sie jetzt eine kostenlose Beratung',
    sections: [
      'Erweiterung',
      'Entwicklungsteams',
      'Kompetenzen',
      'FAQ'
    ],
    headerNavTexts: [
      'KI-ENTWICKLUNG',
      'TECHNOLOGIE-BERATUNG',
      'TEAM-ERWEITERUNG',
      'BRANCHENLÖSUNGEN'
    ],
    footerMainLinks: [
      { text: 'Startseite' },
      { text: 'KI-ENTWICKLUNG' },
      { text: 'TECHNOLOGIE-BERATUNG' },
      { text: 'TEAM-ERWEITERUNG' },
      { text: 'BRANCHENLÖSUNGEN' },
    ]
  },
  {
    lang: 'fr',
    mainHeading: 'Recrutez et développez votre équipe d\u2019ingénieurs logiciels experts',
    primaryCTAText: 'Commencez l\u2019intégration',
    sections: [
      'Extension',
      'Équipes',
      'Compétences',
      'FAQ'
    ],
    headerNavTexts: [
      'Développement IA',
      'Conseil technologique',
      'Renforcement d\u2019équipes',
      'Solutions industrielles'
    ],
    footerMainLinks: [
      { text: "Page d'accueil" },
      { text: 'Développement IA' },
      { text: 'Conseil technologique' },
      { text: 'Renforcement d\u2019équipes' },
      { text: 'Solutions industrielles' },
    ]
  },
  {
    lang: 'nl',
    mainHeading: 'Huur en schaal uw team van expert software engineers',
    primaryCTAText: 'Start nu met onboarding',
    sections: [
      'Engineering team',
      'Complete development',
      'Skills'
    ],
    headerNavTexts: [
      'AI-ontwikkeling',
      'Technologie advies',
      'Teamuitbreiding',
      'Brancheoplossingen'
    ],
    footerMainLinks: [
      { text: 'AI-ontwikkeling' },
      { text: 'Technologie advies' },
      { text: 'Teamuitbreiding' },
      { text: 'Brancheoplossingen' },
    ]
  }
];

for (const { lang, mainHeading, primaryCTAText, sections, headerNavTexts, footerMainLinks } of testData) {
  test(`Check header on Team Augmentation page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const teamAugmentation = new TeamAugmentationPage(page);
    const header = new HeaderPage(page);

    await teamAugmentation.goto(lang);

    // Check header components
    await header.checkLogoButton();
    await header.checkNavLinksVisibility(headerNavTexts);
    await header.checkLanguageButton();
    await header.checkLetsTalkButton(lang);
  });

  test(`Check footer on Team Augmentation page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const teamAugmentation = new TeamAugmentationPage(page);
    const footer = new FooterPage(page);

    await teamAugmentation.goto(lang);
    await footer.scrollToFooter();

    // Check footer components
    await footer.checkMainFooterLinks(footerMainLinks);
    await footer.checkLinkedInLink();
    await footer.checkCopyright();
    await footer.checkEmailContact();
  });

  test(`Check main content on Team Augmentation page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const teamAugmentation = new TeamAugmentationPage(page);

    await teamAugmentation.goto(lang);

    // Check main heading
    await teamAugmentation.checkMainHeading(mainHeading);

    // Check primary CTA
    await teamAugmentation.checkPrimaryCTA(primaryCTAText);

    // Check page sections
    await teamAugmentation.checkPageSections(sections);
  });

  test(`Check buttons and links on Team Augmentation page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const teamAugmentation = new TeamAugmentationPage(page);

    await teamAugmentation.goto(lang);

    // Check "Learn More" buttons exist
    await teamAugmentation.checkLearnMoreButtons();
  });
}

