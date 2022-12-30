import { test, expect } from "@playwright/test";

test("Test if calculator calculates on submit", async ({ page }) => {
  //# is a locator of the field.
  await page.goto("/");
  // await page.locator("#first").type("1")
  await page.type("#first", "1");
  await page.type("#second", "2");
  //   await page.click("#operation");
  await page.locator("#operation").selectOption("multiply");
  await page.click("button[type='submit']");
  //await page.click('text=Calculate')

  const result = await page.locator("#result");
  await expect(result).toContainText("2");
});

test("Test if calculator only takes numbers else throws error", async ({
  page,
}) => {
  await page.goto("/");
  await page.type("#first", "fsdfsdfdsf");
  await page.type("#second", "2");
  await page.locator("#operation").selectOption("add");
  await page.click("button[type='submit']");

  const result = await page.locator("#result");
  await expect(result).toContainText("params");
});
