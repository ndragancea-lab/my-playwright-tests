import { test } from '@playwright/test';
import { FooterPage } from '../pages/footer.po';

const testData = [
  {
    lang: 'en',
    mainLinks: [
      { text: 'Home Page' },
      { text: 'AI Development' },
      { text: 'Technology Consulting' },
      { text: 'Team Augmentation' },
      { text: 'Industry Solutions' },
    ],
    secondaryLinks: [
      { text: 'About us' },
      { text: 'Investors' },
      { text: 'Global offices' },
      { text: 'Privacy Policy' },
      { text: 'Terms of Use' },
      { text: 'Cookie List' },
      { text: 'CCPA' },
      { text: 'E-Verify' },
      { text: 'Health Plan Transparency' },
      { text: 'Responsible Disclosure Policy' },
      { text: 'Accessibility Statement' },
    ]
  },
  {
    lang: 'de',
    mainLinks: [
      { text: 'Startseite' },
      { text: 'KI-Entwicklung' },
      { text: 'Technologieberatung' },
      { text: 'Team-Erweiterung' },
      { text: 'Branchenspezifische Lösungen' },
    ],
    secondaryLinks: [
      { text: 'Über uns' },
      { text: 'Investoren' },
      { text: 'Globale Büros' },
      { text: 'Datenschutzrichtlinie' },
      { text: 'Nutzungsbedingungen' },
      { text: 'Cookie-Liste' },
      { text: 'Kalifornische Datenschutzbestimmungen' },
      { text: 'E-Überprüfung' },
      { text: 'Transparenz des Gesundheitsplans' },
      { text: 'Richtlinie zur verantwortungsvollen Offenlegung' },
      { text: 'Barrierefreiheitserklärung' },
    ]
  },
  {
    lang: 'fr',
    mainLinks: [
      { text: "Page d'accueil" },
      { text: 'Développement IA' },
      { text: 'Conseil technologique' },
      { text: 'Renforcement d\u2019équipes' },
      { text: 'Solutions industrielles' },
    ],
    secondaryLinks: [
      { text: 'À propos de nous' },
      { text: 'Investisseurs' },
      { text: 'Bureaux internationaux' },
      { text: 'Politique de confidentialité' },
      { text: 'Conditions d\u2019utilisation' },
      { text: 'Liste des cookies' },
      { text: 'CCPA' },
      { text: 'E-Verify' },
      { text: 'Transparence des régimes de santé' },
      { text: 'Politique de divulgation responsable' },
      { text: 'Déclaration d\'accessibilité' },
    ]
  },
  {
    lang: 'nl',
    mainLinks: [
      { text: 'AI-ontwikkeling' },
      { text: 'Technologie advies' },
      { text: 'Teamuitbreiding' },
      { text: 'Brancheoplossingen' },
    ],
    secondaryLinks: [
      { text: 'OVER ONS' },
      { text: 'INVESTEERDERS' },
      { text: 'GLOBALE KANTOREN' },
      { text: 'PRIVACYBELEID' },
      { text: 'GEBRUIKSVOORWAARDEN' },
      { text: 'COOKIELIJST' },
      { text: 'CCPA' },
      { text: 'E-Verify' },
      { text: 'TRANSPARANTIE ZORGPLAN' },
      { text: 'BELEID VERANTWOORDE BEKENDMAKING' },
      { text: 'TOEGANKELIJKHEIDSVERKLARING' },
    ]
  }
];

for (const { lang, mainLinks, secondaryLinks } of testData) {
  test(`Check main footer links for language ${lang.toUpperCase()}`, async ({ page }) => {
    const footer = new FooterPage(page);

    await footer.gotoWithLang(lang);
    await footer.scrollToFooter();
    await footer.checkMainFooterLinks(mainLinks);
  });

  test(`Check secondary footer links for language ${lang.toUpperCase()}`, async ({ page }) => {
    const footer = new FooterPage(page);

    await footer.gotoWithLang(lang);
    await footer.scrollToFooter();
    await footer.checkSecondaryFooterLinks(secondaryLinks);
  });

  test(`Check LinkedIn social link in footer for language ${lang.toUpperCase()}`, async ({ page }) => {
    const footer = new FooterPage(page);

    await footer.gotoWithLang(lang);
    await footer.scrollToFooter();
    await footer.checkLinkedInLink();
  });

  test(`Check copyright and contact email in footer for language ${lang.toUpperCase()}`, async ({ page }) => {
    const footer = new FooterPage(page);

    await footer.gotoWithLang(lang);
    await footer.scrollToFooter();
    await footer.checkCopyright();
    await footer.checkEmailContact();
  });
}

