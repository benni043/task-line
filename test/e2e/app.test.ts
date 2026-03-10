import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { describe, test } from "vitest";
import { setAuthCookie } from "./utils";
import { expect } from "@playwright/test";

describe("app", async () => {
	await setup();

	test("has title", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		expect(page).toHaveTitle("TaskLine");
	});

	test("shows settings when not logged in", async () => {
		const page = await createPage();

		await page.goto(url("/"), { waitUntil: "hydration" });
		await expect(page.getByTestId("settings-sheet")).toBeVisible();
	});

	test("does not show settings when logged in", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await expect(page.getByTestId("settings-sheet")).not.toBeVisible();
	});
});
