import { test } from '@playwright/test';
import { TechnologyConsultingPage } from '../pages/technologyConsulting.po';
import { HeaderPage } from '../pages/header.po';
import { FooterPage } from '../pages/footer.po';

const testData = [
  {
    lang: 'en',
    mainHeading: 'Tech & AI transformation consulting',
    primaryCTAText: 'Define your strategy now',
    sections: [
      'Technical & AI strategy',
      'Solutions implementation',
      'Enhancement & optimization',
      'Modern technology for impactful results',
      'Core Services',
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
    mainHeading: 'Tech & KI-Transformationsberatung',
    primaryCTAText: 'Jetzt Ihre KI-Strategie bewerten lassen',
    sections: [
      'Strategische KI-Bewertung',
      'Implementierung von KI-Lösungen',
      'Optimierung & Weiterentwicklung',
      'Moderne Technologie für wirkungsvolle Ergebnisse',
      'Kernleistungen',
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
    mainHeading: 'Conseil en transformation technologique et IA',
    primaryCTAText: 'Définissez votre stratégie dès maintenant',
    sections: [
      'Stratégie technologique et IA',
      'Mise en oeuvre des solutions',
      'Amélioration et optimisation',
      'Une technologie moderne pour des résultats concrets',
      'Services principaux',
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
    mainHeading: 'Tech & AI transformatieconsultancy',
    primaryCTAText: 'Definieer nu uw strategie',
    sections: [
      'Technologie',
      'Strategie',
      'Implementatie',
      'moderne',
      'Kern',
      'Services'
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
  test(`Check header on Technology Consulting page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const techConsulting = new TechnologyConsultingPage(page);
    const header = new HeaderPage(page);

    await techConsulting.goto(lang);

    // Check header components
    await header.checkLogoButton();
    await header.checkNavLinksVisibility(headerNavTexts);
    await header.checkLanguageButton();
    await header.checkLetsTalkButton(lang);
  });

  test(`Check footer on Technology Consulting page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const techConsulting = new TechnologyConsultingPage(page);
    const footer = new FooterPage(page);

    await techConsulting.goto(lang);
    await footer.scrollToFooter();

    // Check footer components
    await footer.checkMainFooterLinks(footerMainLinks);
    await footer.checkLinkedInLink();
    await footer.checkCopyright();
    await footer.checkEmailContact();
  });

  test(`Check main content on Technology Consulting page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const techConsulting = new TechnologyConsultingPage(page);

    await techConsulting.goto(lang);

    // Check main heading
    await techConsulting.checkMainHeading(mainHeading);

    // Check primary CTA
    await techConsulting.checkPrimaryCTA();

    // Check "Learn More" buttons
    await techConsulting.checkLearnMoreButtons();

    // Check transformation button
    await techConsulting.checkTransformationButton();

    // Check page sections
    await techConsulting.checkPageSections(sections);

    // Check FAQ section
    await techConsulting.checkFAQSection();
  });

  test(`Check buttons and links on Technology Consulting page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const techConsulting = new TechnologyConsultingPage(page);

    await techConsulting.goto(lang);

    // Verify primary CTA is clickable
    await techConsulting.checkPrimaryCTA();

    // Verify Learn More buttons are clickable
    await techConsulting.checkLearnMoreButtons();

    // Verify transformation button is clickable
    await techConsulting.checkTransformationButton();
  });
}

