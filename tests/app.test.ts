import { expect, test } from "@nuxt/test-utils/playwright";
import { setAuthCookie } from "./utils";

test("has title", async ({ page, goto }) => {
  await setAuthCookie(page);
  await goto("/", { waitUntil: "hydration" });
  await expect(page).toHaveTitle("TaskLine");
});
