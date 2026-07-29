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
  const selector = page.getByRole("tablist", { name: "Desktop views" });
  const detail = page.getByRole("tabpanel");
  await expect(selector.getByRole("tab")).toHaveCount(12);
  await expect(detail).toHaveCount(1);

  const selectorBox = await selector.boundingBox();
  const detailBox = await detail.boundingBox();
  expect(selectorBox).not.toBeNull();
  expect(detailBox).not.toBeNull();
  expect(selectorBox!.y + selectorBox!.height).toBeLessThanOrEqual(detailBox!.y);

  await selector.getByRole("tab", { name: "Diagnostics" }).click();
  await expect(detail.getByRole("heading", { name: "Output diagnostics" })).toBeVisible();
  const overflows = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main, main *"))
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
  );
  expect(overflows).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("desktop views expose one grouped selector and complete selected detail", async ({ page }) => {
  await page.goto("/docs/desktop-views");

  const selector = page.getByRole("tablist", { name: "Desktop views" });
  await expect(selector.getByRole("heading")).toHaveText(["Show", "Build", "Operate", "Output"]);
  await expect(selector.getByRole("tab")).toHaveCount(12);
  await expect(selector.getByRole("tab", { selected: true })).toHaveCount(1);
  await expect(selector.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");

  const detail = page.getByRole("tabpanel");
  await expect(detail).toHaveCount(1);
  await selector.getByRole("tab", { name: "Scripts" }).click();
  await expect(selector.getByRole("tab", { name: "Scripts" })).toHaveAttribute("aria-selected", "true");
  await expect(detail.getByText("build-scripts", { exact: true })).toBeVisible();
  await expect(detail.getByRole("heading", { name: "Scripts", exact: true })).toBeVisible();
  await expect(
    detail.getByText("Author, validate, run, debug, and stop show automation scripts from one workspace."),
  ).toBeVisible();
  await expect(detail.getByText("Create and edit a script")).toBeVisible();
  await expect(detail.getByText("TypeScript automation")).toBeVisible();
  await expect(
    detail.getByText("Script controls remain separate from deterministic playback timing."),
  ).toBeVisible();
});

test("desktop views keyboard navigation keeps focus and selection synchronized", async ({ page }) => {
  await page.goto("/docs/desktop-views");

  const tabs = page.getByRole("tablist", { name: "Desktop views" }).getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("ArrowUp");
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName("Diagnostics");

  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName("Overview");
});

test("desktop views lightbox is named, keyboard-contained, and restores its opener", async ({
  page,
}) => {
  await page.goto("/docs/desktop-views");

  const opener = page.getByRole("button", { name: "Enlarge Overview workspace screenshot" });
  await opener.click();

  const dialog = page.getByRole("dialog", { name: "Overview workspace screenshot" });
  const close = dialog.getByRole("button", { name: "Close screenshot" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img", { name: "Overview workspace in the GOLC desktop application" })).toBeVisible();
  await expect(close).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("desktop views lightbox handles inside, backdrop, close, and scroll restoration", async ({
  page,
}) => {
  await page.goto("/docs/desktop-views");
  await page.evaluate(() => {
    document.body.style.overflow = "clip";
  });

  const opener = page.getByRole("button", { name: "Enlarge Overview workspace screenshot" });
  const openDialog = async () => {
    await opener.click();
    const dialog = page.getByRole("dialog", { name: "Overview workspace screenshot" });
    await expect(dialog).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    return dialog;
  };

  let dialog = await openDialog();
  await dialog.getByRole("img").click();
  await expect(dialog).toBeVisible();

  await page.getByTestId("desktop-view-lightbox-backdrop").click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");

  dialog = await openDialog();
  await dialog.getByRole("button", { name: "Close screenshot" }).click();
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");
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
