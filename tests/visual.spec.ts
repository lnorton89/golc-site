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
  await expect(selector.getByRole("tab")).toHaveCount(19);
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
      const pageStyles = getComputedStyle(document.body);
      const imageStyles = getComputedStyle(imageElement);
      const canvas = document.createElement("canvas");
      const sampleSize = 8;
      canvas.width = sampleSize * 2;
      canvas.height = sampleSize * 2;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        throw new Error("Canvas context is unavailable");
      }
      context.drawImage(
        imageElement,
        0,
        0,
        sampleSize,
        sampleSize,
        0,
        0,
        sampleSize,
        sampleSize,
      );
      context.drawImage(
        imageElement,
        imageElement.naturalWidth - sampleSize,
        0,
        sampleSize,
        sampleSize,
        sampleSize,
        0,
        sampleSize,
        sampleSize,
      );
      context.drawImage(
        imageElement,
        0,
        imageElement.naturalHeight - sampleSize,
        sampleSize,
        sampleSize,
        0,
        sampleSize,
        sampleSize,
        sampleSize,
      );
      context.drawImage(
        imageElement,
        imageElement.naturalWidth - sampleSize,
        imageElement.naturalHeight - sampleSize,
        sampleSize,
        sampleSize,
        sampleSize,
        sampleSize,
        sampleSize,
        sampleSize,
      );
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const screenshotEdge = [0, 0, 0];
      let opaquePixels = 0;
      for (let offset = 0; offset < pixels.length; offset += 4) {
        if (pixels[offset + 3] === 0) continue;
        screenshotEdge[0] += pixels[offset];
        screenshotEdge[1] += pixels[offset + 1];
        screenshotEdge[2] += pixels[offset + 2];
        opaquePixels += 1;
      }
      if (opaquePixels === 0) {
        throw new Error("Screenshot edge sampling returned no opaque pixels");
      }
      const averageScreenshotEdge = screenshotEdge.map((value) => value / opaquePixels);
      const stageRgb = stageStyles.backgroundColor.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
      if (!stageRgb || stageRgb.length !== 3) {
        throw new Error(`Unable to parse stage color: ${stageStyles.backgroundColor}`);
      }
      const colorDistance = Math.sqrt(
        stageRgb.reduce(
          (sum, channel, index) => sum + (channel - averageScreenshotEdge[index]) ** 2,
          0,
        ),
      );
      const luminance = (rgb: number[]) =>
        0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

      return {
        stageBottom: stageBox.bottom,
        detailTop: detailBox.top,
        insetTop: imageBox.top - stageBox.top,
        insetLeft: imageBox.left - stageBox.left,
        insetRight: stageBox.right - imageBox.right,
        stageBackground: stageStyles.backgroundColor,
        detailBackground: detailStyles.backgroundColor,
        pageBackground: pageStyles.backgroundColor,
        colorDistance,
        luminanceDistance: Math.abs(luminance(stageRgb) - luminance(averageScreenshotEdge)),
        lowerBorderWidth: Number.parseFloat(stageStyles.borderBottomWidth),
        imageBorderWidth: Number.parseFloat(imageStyles.borderTopWidth),
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
    expect(layout.imageBorderWidth).toBeGreaterThan(0);
    expect(layout.stageBackground).not.toBe(layout.detailBackground);
    expect(layout.stageBackground).not.toBe(layout.pageBackground);
    // A modest objective floor catches the reported warm-gray blending while
    // leaving the stage visually subordinate to the captured application.
    expect(layout.colorDistance).toBeGreaterThanOrEqual(24);
    expect(layout.luminanceDistance).toBeGreaterThanOrEqual(8);
    expect(layout.documentOverflows).toBe(false);
    expect(layout.mainOverflows).toBe(false);
  }
});

test("desktop views expose one grouped selector and complete selected detail", async ({ page }) => {
  await page.goto("/docs/desktop-views");

  const selector = page.getByRole("tablist", { name: "Desktop views" });
  await expect(selector.getByRole("heading")).toHaveText([
    "Show",
    "Guided Setup",
    "Build",
    "Operate",
    "Perform",
    "Output",
  ]);
  await expect(selector.getByRole("tab")).toHaveCount(19);
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

test("dropdown parity covers computed presentation and disclosure interactions", async ({ page }) => {
  await page.goto("/");

  const docs = page.getByTestId("desktop-dropdown-docs");
  const resources = page.getByTestId("desktop-dropdown-resources");
  const docsTrigger = docs.getByRole("button", { name: "Docs" });
  const resourcesTrigger = resources.getByRole("button", { name: "Resources" });

  const triggerPresentation = async (trigger: typeof docsTrigger) =>
    trigger.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const styles = getComputedStyle(element);
      const chevron = element.querySelector("svg");
      if (!chevron) throw new Error("Dropdown chevron is missing");
      const chevronBox = chevron.getBoundingClientRect();
      return {
        height: box.height,
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
        gap: styles.gap,
        fontWeight: styles.fontWeight,
        color: styles.color,
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        outlineOffset: styles.outlineOffset,
        chevronWidth: chevronBox.width,
        chevronHeight: chevronBox.height,
        chevronTransform: getComputedStyle(chevron).transform,
      };
    });

  await docsTrigger.focus();
  const docsTriggerStyles = await triggerPresentation(docsTrigger);
  await resourcesTrigger.focus();
  const resourcesTriggerStyles = await triggerPresentation(resourcesTrigger);
  expect(docsTriggerStyles).toEqual(resourcesTriggerStyles);

  const panelPresentation = async (container: typeof docs) => {
    const panel = container.getByTestId("desktop-dropdown-panel");
    await panel.evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );
    const firstLink = panel.getByRole("link").first();
    const label = firstLink.getByTestId("desktop-dropdown-item-label");
    const body = firstLink.getByTestId("desktop-dropdown-item-body");
    return panel.evaluate((element, childData) => {
      const trigger = element.parentElement?.querySelector("summary");
      const link = element.querySelector("a");
      const labelElement = link?.querySelector('[data-testid="desktop-dropdown-item-label"]');
      const bodyElement = link?.querySelector('[data-testid="desktop-dropdown-item-body"]');
      if (!trigger || !link || !labelElement || !bodyElement) {
        throw new Error("Dropdown presentation elements are missing");
      }
      const box = element.getBoundingClientRect();
      const triggerBox = trigger.getBoundingClientRect();
      const styles = getComputedStyle(element);
      const linkStyles = getComputedStyle(link);
      const labelStyles = getComputedStyle(labelElement);
      const bodyStyles = getComputedStyle(bodyElement);
      return {
        width: box.width,
        padding: styles.padding,
        borderRadius: styles.borderRadius,
        borderWidth: styles.borderWidth,
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        topOffset: box.top - triggerBox.bottom,
        rightOffset: triggerBox.right - box.right,
        itemPadding: linkStyles.padding,
        labelFontSize: labelStyles.fontSize,
        labelFontWeight: labelStyles.fontWeight,
        bodyFontSize: bodyStyles.fontSize,
        childData,
      };
    }, { labelCount: await label.count(), bodyCount: await body.count() });
  };

  await docsTrigger.click();
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "true");
  const docsPanelStyles = await panelPresentation(docs);
  await resourcesTrigger.click();
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(resourcesTrigger).toHaveAttribute("aria-expanded", "true");
  const resourcesPanelStyles = await panelPresentation(resources);
  expect(docsPanelStyles).toEqual(resourcesPanelStyles);
  expect(docsPanelStyles.childData).toEqual({ labelCount: 1, bodyCount: 1 });

  await page.keyboard.press("Escape");
  await expect(resourcesTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(resourcesTrigger).toBeFocused();

  await docsTrigger.focus();
  await page.keyboard.press("Enter");
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(docs.getByRole("link").first()).toBeFocused();
  await page.locator("main").click({ position: { x: 8, y: 8 } });
  await expect(docsTrigger).toHaveAttribute("aria-expanded", "false");

  await resourcesTrigger.focus();
  await page.keyboard.press("Space");
  await expect(resourcesTrigger).toHaveAttribute("aria-expanded", "true");
  await resources.getByRole("link", { name: /Architecture/ }).click();
  await expect(page).toHaveURL(/\/architecture$/);
  await expect(resourcesTrigger).toHaveAttribute("aria-expanded", "false");
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

  const docs = page.getByTestId("desktop-dropdown-docs");
  const docsTrigger = page.getByRole("button", { name: "Docs" });
  await expect(docsTrigger).toHaveAttribute("aria-current", "page");
  await docsTrigger.click();
  await expect(page.getByRole("link", { name: "Docs overview" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    docs.getByRole("link", { name: /Desktop Views/ }),
  ).not.toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.goto("/docs/desktop-views");
  await expect(docsTrigger).toHaveAttribute("aria-current", "page");
  await docsTrigger.click();
  await expect(
    docs.getByRole("link", { name: /Desktop Views/ }),
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
