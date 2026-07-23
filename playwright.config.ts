import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "html",
  expect: {
    toHaveScreenshot: {
      // A tiny per-pixel tolerance absorbs font antialiasing/subpixel jitter
      // across machines without masking a real visual regression.
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    },
  },
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  webServer: {
    // No -s/--single: that rewrites every 404 to index.html, which would
    // mask real broken routes instead of just serving this static export's
    // clean URLs (serve resolves /docs to docs.html by default already).
    command: "npx serve out -l 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],
});
