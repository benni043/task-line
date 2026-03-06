import { describe, expect, test } from "vitest";
import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { setAuthCookie } from "./utils";

describe("app", async () => {
	await setup();

	test("has title", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		expect(await page.title()).toBe("TaskLine");
	});

	test("shows settings when not logged in", async () => {
		const page = await createPage();

		await page.goto(url("/"), { waitUntil: "hydration" });
		expect(await page.getByTestId("settings-sheet").isVisible()).toBe(true);
	});

	test("does not show settings when logged in", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		expect(await page.getByTestId("settings-sheet").isVisible()).toBe(false);
	});
});
