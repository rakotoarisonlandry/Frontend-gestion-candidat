import { test, expect } from "@playwright/test";

test("page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("text=Login")).toBeVisible();
});
test("page loads", async ({ page }) => {
  await page.goto("/candidates");

  await expect(page.locator("text=Candidates")).toBeVisible();
});
test("page loads", async ({ page }) => {
  await page.goto("/candidates");

  await expect(page.locator("text=Ajouter Candidat")).toBeVisible();
});
test("page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("text=invalid credentials")).toBeVisible();
});