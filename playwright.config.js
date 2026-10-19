const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 300_000,
  expect: { timeout: 15_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  webServer: {
    // The harness is client-rendered, so it must be served from a production
    // build (next dev does not hydrate reliably in headless CI containers).
    command: 'npm run build && npx next start -p 4173',
    url: 'http://127.0.0.1:4173/testing',
    reuseExistingServer: true,
    timeout: 300_000
  }
});
