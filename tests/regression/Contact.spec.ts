import { test } from '@playwright/test';
import { ContactPage } from '../pages/contact.po';
import { HeaderPage } from '../pages/header.po';
import { FooterPage } from '../pages/footer.po';

const testData = [
  {
    lang: 'en',
    pageHeading: "Contact us",
    // Updated to match current site snapshot which uses a shorter sentence
    pageDescription: 'Ready to boost your business?',
    formLabels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      jobTitle: 'Job Title',
      companyName: 'Company Name',
      message: 'Message',
      submit: 'Submit'
    },
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
    pageHeading: "Kontaktieren Sie uns",
    // Updated to match current site snapshot
    pageDescription: 'Bereit, Ihr Geschäft voranzubringen?',
    formLabels: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      jobTitle: 'Position',
      companyName: 'Name des Unternehmens',
      message: 'Nachricht',
      submit: 'Senden'
    },
    headerNavTexts: [
      'KI-ENTWICKLUNG',
      'TECHNOLOGIE-BERATUNG',
      'TEAM-ERWEITERUNG',
      'BRANCHENLÖSUNGEN'
    ],
    footerMainLinks: [
      { text: 'Startseite' },
      { text: 'KI-Entwicklung' },
      { text: 'Technologieberatung' },
      { text: 'Team-Erweiterung' },
      { text: 'Branchenspezifische Lösungen' },
    ]
  },
  {
    lang: 'fr',
    pageHeading: "Contactez-nous",
    pageDescription: 'Prêt à booster votre activité grâce à des solutions basées sur l\'IA ?',
    formLabels: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'E-mail',
      phone: 'Téléphone',
      jobTitle: 'Intitulé du post',
      companyName: 'Nom de l\u2019entreprise',
      message: 'Message',
      submit: 'Envoyer'
    },
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
    pageHeading: "CONTACT ONS",
    pageDescription: 'Klaar om uw bedrijf te versterken met AI-enabled oplossingen?',
    formLabels: {
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      email: 'E-mail',
      phone: 'Telefoon',
      jobTitle: 'Functietitel',
      companyName: 'Bedrijfsnaam',
      message: 'Bericht',
      submit: 'Verzenden'
    },
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

for (const { lang, pageHeading, pageDescription, formLabels, headerNavTexts, footerMainLinks } of testData) {
  test(`Check header on contact page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const contact = new ContactPage(page);
    const header = new HeaderPage(page);

    await contact.goto(lang);

    // Check header components
    await header.checkLogoButton();
    await header.checkNavLinksVisibility(headerNavTexts);
    await header.checkLanguageButton();
    await header.checkLetsTalkButton(lang);
  });

  test(`Check footer on contact page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const contact = new ContactPage(page);
    const footer = new FooterPage(page);

    await contact.goto(lang);
    await footer.scrollToFooter();

    // Check footer components
    await footer.checkMainFooterLinks(footerMainLinks);
    await footer.checkLinkedInLink();
    await footer.checkCopyright();
    await footer.checkEmailContact();
  });

  test(`Check page heading and description on contact page for language ${lang.toUpperCase()}`, async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.goto(lang);
    await contact.checkPageHeading(pageHeading);
    await contact.checkPageDescription(pageDescription);
  });

  test(`Check contact form fields for language ${lang.toUpperCase()}`, async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.goto(lang);
    await contact.checkFormFieldsVisible();
    await contact.checkFormLabels(formLabels);
  });
}

