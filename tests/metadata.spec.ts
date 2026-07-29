import { expect, test } from "@playwright/test";

test("desktop views social image metadata resolves to a 1200x630 PNG", async ({
  page,
  request,
}) => {
  const pageResponse = await page.goto("/docs/desktop-views");
  expect(pageResponse?.status()).toBe(200);

  const ogImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  const twitterImage = await page
    .locator('meta[name="twitter:image"]')
    .getAttribute("content");

  expect(ogImage).toMatch(
    /^https:\/\/golc-site\.netlify\.app\/desktop-views-og\.png$/,
  );
  expect(twitterImage).toBe(ogImage);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    "630",
  );

  const imageUrl = new URL(ogImage!);
  const imageResponse = await request.get(`${imageUrl.pathname}${imageUrl.search}`);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toBe("image/png");

  const image = await imageResponse.body();
  expect(image.subarray(0, 8)).toEqual(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  );
  expect(image.readUInt32BE(16)).toBe(1200);
  expect(image.readUInt32BE(20)).toBe(630);
});
