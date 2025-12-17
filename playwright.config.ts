import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // папка с тестами
  timeout: 30000,      // таймаут на тест — 30 секунд
  use: {
    headless: true, 
    baseURL: 'https://aie.griddynamics.com',   // запускать браузер в фоне
    // можно добавить другие настройки, если нужно
  },
});
