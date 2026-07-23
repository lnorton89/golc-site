import { test, expect } from "@playwright/test";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "docs", path: "/docs" },
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
    await expect(page).toHaveScreenshot(`${route.name}-light.png`, { fullPage: true });
  });

  test(`${route.name} — dark`, async ({ page }) => {
    await page.goto(route.path);
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
    await page.waitForLoadState("networkidle");
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
