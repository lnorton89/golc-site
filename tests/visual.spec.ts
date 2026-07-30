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

test("desktop views screenshot stage stays distinct from detail across themes and viewports", async ({
  page,
}) => {
  const cases = [
    { theme: "light", width: 1280, height: 900 },
    { theme: "dark", width: 1280, height: 900 },
    { theme: "light", width: 390, height: 844 },
    { theme: "dark", width: 390, height: 844 },
  ] as const;

  for (const testCase of cases) {
    await page.setViewportSize({ width: testCase.width, height: testCase.height });
    await page.goto("/docs/desktop-views");
    await page.evaluate((theme) => {
      document.documentElement.setAttribute("data-theme", theme);
    }, testCase.theme);

    const stage = page.getByTestId("desktop-view-screenshot-stage");
    const detail = page.getByTestId("desktop-view-detail");
    const image = stage.getByRole("img");
    await expect(stage).toBeVisible();
    await expect(detail).toBeVisible();
    await expect(image).toHaveJSProperty("complete", true);

    const layout = await page.evaluate(() => {
      const stageElement = document.querySelector<HTMLElement>(
        '[data-testid="desktop-view-screenshot-stage"]',
      );
      const detailElement = document.querySelector<HTMLElement>(
        '[data-testid="desktop-view-detail"]',
      );
      const imageElement = stageElement?.querySelector<HTMLImageElement>("img");
      const main = document.querySelector<HTMLElement>("main");
      if (!stageElement || !detailElement || !imageElement || !main) {
        throw new Error("Desktop Views stage, detail, image, or main element is missing");
      }

      const stageBox = stageElement.getBoundingClientRect();
      const detailBox = detailElement.getBoundingClientRect();
      const imageBox = imageElement.getBoundingClientRect();
      const stageStyles = getComputedStyle(stageElement);
      const detailStyles = getComputedStyle(detailElement);

      return {
        stageBottom: stageBox.bottom,
        detailTop: detailBox.top,
        insetTop: imageBox.top - stageBox.top,
        insetLeft: imageBox.left - stageBox.left,
        insetRight: stageBox.right - imageBox.right,
        stageBackground: stageStyles.backgroundColor,
        detailBackground: detailStyles.backgroundColor,
        lowerBorderWidth: Number.parseFloat(stageStyles.borderBottomWidth),
        documentOverflows:
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        mainOverflows: main.scrollWidth > main.clientWidth + 1,
      };
    });

    expect(layout.stageBottom).toBeLessThanOrEqual(layout.detailTop);
    expect(layout.insetTop).toBeGreaterThanOrEqual(12);
    expect(layout.insetLeft).toBeGreaterThanOrEqual(12);
    expect(layout.insetRight).toBeGreaterThanOrEqual(12);
    expect(layout.lowerBorderWidth).toBeGreaterThan(0);
    expect(layout.stageBackground).not.toBe(layout.detailBackground);
    expect(layout.documentOverflows).toBe(false);
    expect(layout.mainOverflows).toBe(false);
  }
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

test("docs navigation disclosure opens and reaches Desktop Views", async ({ page }) => {
  await page.goto("/");

  const docsTrigger = page.getByRole("button", { name: "Docs" });
  const docsOverview = page.getByRole("link", { name: "Docs overview" });
  const desktopViews = page.getByRole("link", { name: "Desktop Views" });

  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(docsOverview).toBeHidden();
  await docsTrigger.click();
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(docsOverview).toBeVisible();
  await expect(desktopViews).toBeVisible();

  await desktopViews.click();
  await expect(page).toHaveURL(/\/docs\/desktop-views$/);
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
});

test("docs navigation communicates family and exact-route state", async ({ page }) => {
  await page.goto("/docs");

  const docsTrigger = page.getByRole("button", { name: "Docs" });
  await expect(docsTrigger).toHaveAttribute("aria-current", "page");
  await docsTrigger.click();
  await expect(page.getByRole("link", { name: "Docs overview" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("link", { name: "Desktop Views", exact: true }),
  ).not.toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.goto("/docs/desktop-views");
  await expect(docsTrigger).toHaveAttribute("aria-current", "page");
  await docsTrigger.click();
  await expect(
    page.getByRole("link", { name: "Desktop Views", exact: true }),
  ).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("link", { name: "Docs overview" })).not.toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("docs navigation closes on Escape, outside click, and link activation", async ({
  page,
}) => {
  await page.goto("/");

  const docsTrigger = page.getByRole("button", { name: "Docs" });
  const docsOverview = page.getByRole("link", { name: "Docs overview" });

  await docsTrigger.click();
  await page.keyboard.press("Escape");
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/\/$/);

  await docsTrigger.click();
  await page.locator("main").click({ position: { x: 8, y: 8 } });
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/\/$/);

  await docsTrigger.click();
  await docsOverview.click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
});

test("docs navigation is grouped and navigable in the mobile dialog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();

  const dialog = page.getByRole("dialog", { name: /site navigation/i });
  await expect(dialog.getByText("Docs", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Docs overview" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Desktop Views" })).toBeVisible();

  await dialog.getByRole("link", { name: "Desktop Views" }).click();
  await expect(page).toHaveURL(/\/docs\/desktop-views$/);
  await expect(dialog).toBeHidden();
});
