import { test, expect } from "@nuxt/test-utils/playwright";
import { setAuthCookie } from "./utils";

test.describe("settings", () => {
  test("can open settings", async ({ page, goto }) => {
    await setAuthCookie(page);
    await goto("/", { waitUntil: "hydration" });

    await page.getByTestId("settings-button").click();
    await expect(page.getByTestId("settings-sheet").first()).toBeVisible();
  });
});
