import { test, expect } from "@playwright/test";

async function settleImages(page: import("@playwright/test").Page) {
  const images = page.locator("img");
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

const ROUTES = [
  { name: "home", path: "/" },
  { name: "docs", path: "/docs" },
  { name: "desktop-views", path: "/docs/desktop-views" },
  { name: "download", path: "/download" },
  { name: "reference", path: "/reference" },
  { name: "changelog", path: "/changelog" },
  { name: "architecture", path: "/architecture" },
  { name: "roadmap", path: "/roadmap" },
];

for (const route of ROUTES) {
  test(`${route.name} — light`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState("networkidle");
    await settleImages(page);
    await expect(page).toHaveScreenshot(`${route.name}-light.png`, { fullPage: true });
  });

  test(`${route.name} — dark`, async ({ page }) => {
    await page.goto(route.path);
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
    await page.waitForLoadState("networkidle");
    await settleImages(page);
    await expect(page).toHaveScreenshot(`${route.name}-dark.png`, { fullPage: true });
  });
}

test("mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(page.getByRole("dialog", { name: /site navigation/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /site navigation/i })).toBeHidden();
});

test("desktop views remain readable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/docs/desktop-views");
  await expect(page.getByRole("heading", { name: "Every workspace, in one guide." })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(12);
  const overflows = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main *"))
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
  );
  expect(overflows).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("resources dropdown opens and links to architecture", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Resources", { exact: true }).click();
  // Scoped to the dropdown panel: its link's accessible name is the full
  // "Architecture Package graph, ..." (title + description spans both count),
  // so match by substring rather than the exact visible heading text.
  const panel = page.locator(".menu-panel");
  const architectureLink = panel.getByRole("link", { name: "Architecture" });
  await expect(architectureLink).toBeVisible();
  await architectureLink.click();
  await expect(page).toHaveURL(/\/architecture$/);
});
