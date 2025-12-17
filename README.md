# Playwright Test Suite

This repository contains end-to-end tests for the AIE Grid Dynamics website using Playwright with TypeScript.

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** version 18 or higher
- **npm** (comes with Node.js) or **yarn**

You can check your Node.js version by running:
```bash
node --version
```

## Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd my-playwright-tests
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install:
   - Playwright test framework
   - Playwright browsers (Chromium, Firefox, WebKit)

3. **Install Playwright browsers** (if not installed automatically):
   ```bash
   npx playwright install
   ```

   Or install only Chromium (faster, smaller):
   ```bash
   npx playwright install chromium
   ```

## Project Structure

```
my-playwright-tests/
├── config.ts                 # Base URL configuration
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── tests/
│   ├── pages/                # Page Object Models (POM)
│   │   ├── contact.po.ts
│   │   ├── footer.po.ts
│   │   ├── header.po.ts
│   │   ├── home.po.ts
│   │   ├── teamAugmentation.po.ts
│   │   └── technologyConsulting.po.ts
│   ├── regression/          # Regression test suites
│   │   ├── Contact.spec.ts
│   │   ├── FooterLinks.spec.ts
│   │   ├── Header.spec.ts
│   │   ├── TeamAugmentation.spec.ts
│   │   └── ...
│   └── PageTitle.spec.ts
└── README.md                 # This file
```

## Configuration

### Base URL

The base URL is configured in `config.ts`:
```typescript
export const BASE_URL = 'https://aie.griddynamics.com';
```

To use a different base URL, modify this file or use environment variables.

### Playwright Configuration

Main configuration is in `playwright.config.ts`:
- Test directory: `./tests`
- Default timeout: 30 seconds
- Headless mode: enabled by default
- Base URL: `https://aie.griddynamics.com`

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode (see browser)

```bash
npx playwright test --headed
```

### Run Specific Test File

```bash
npx playwright test tests/regression/Contact.spec.ts
```

### Run Tests for Specific Language

Use grep to filter tests:
```bash
npx playwright test --grep "EN"
npx playwright test --grep "DE"
npx playwright test --grep "FR"
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

This opens Playwright Inspector where you can:
- Step through tests
- Inspect selectors
- View network requests
- See console logs

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

Interactive UI mode for running and debugging tests.

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with Specific Reporter

```bash
# List reporter (shows only test names)
npx playwright test --reporter=list

# Line reporter (shows progress)
npx playwright test --reporter=line

# HTML reporter (generates HTML report)
npx playwright test --reporter=html
```

After running with HTML reporter, view the report:
```bash
npx playwright show-report
```

## Test Suites

### Regression Tests

Located in `tests/regression/`:

- **Contact.spec.ts** - Contact form validation for EN/DE/FR
- **FooterLinks.spec.ts** - Footer links validation for EN/DE/FR
- **Header.spec.ts** - Header navigation and components for EN/DE/FR
- **TeamAugmentation.spec.ts** - Team Augmentation page tests for EN/DE/FR
- **TechnologyConsulting.spec.ts** - Technology Consulting page tests for EN/DE/FR
- **LanguageSwitcher.spec.ts** - Language switching functionality
- **LetsTalk.spec.ts** - "Let's Talk" button functionality
- **GoToCustomSolution.spec.ts** - Custom solution button navigation
- **AiDevCommon.spec.ts** - AI Development common tests

### Page Title Test

- **PageTitle.spec.ts** - Page title validation

## Page Object Model (POM)

The project uses Page Object Model pattern for better maintainability:

- **HeaderPage** (`header.po.ts`) - Header navigation and components
- **FooterPage** (`footer.po.ts`) - Footer links and components
- **ContactPage** (`contact.po.ts`) - Contact form interactions
- **HomePage** (`home.po.ts`) - Home page elements
- **TeamAugmentationPage** (`teamAugmentation.po.ts`) - Team Augmentation page
- **TechnologyConsultingPage** (`technologyConsulting.po.ts`) - Technology Consulting page

## Localization

Tests support multiple languages:
- **EN** (English)
- **DE** (German / Deutsch)
- **FR** (French / Français)

Each test suite includes language-specific test data and validations.

## Troubleshooting

### Tests Fail with Timeout

Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

Or for specific test:
```typescript
test.setTimeout(60000);
```

### Browser Not Found

Install browsers:
```bash
npx playwright install
```

### Network Issues

If tests fail due to network issues:
1. Check your internet connection
2. Verify the base URL is accessible: `https://aie.griddynamics.com`
3. Check if the website is down

### Tests Fail on Different Machine

1. Ensure Node.js version matches (18+)
2. Install all dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`
4. Check if base URL is accessible from your network

### View Test Results

After running tests, view HTML report:
```bash
npx playwright show-report
```

View test traces (if enabled):
```bash
npx playwright show-trace trace.zip
```

## Environment Variables

You can override configuration using environment variables:

```bash
# Use different base URL
BASE_URL=https://staging.example.com npx playwright test

# Run in non-headless mode
HEADLESS=false npx playwright test
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright TypeScript Guide](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Playwright documentation
3. Check test output and error messages
4. Contact the development team

## License

ISC

