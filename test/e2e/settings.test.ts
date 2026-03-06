import { describe, expect, test } from "vitest";
import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { setAuthCookie } from "./utils";

describe("edit Todo", async () => {
	await setup();

	test("can open settings", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("settings-button").click();
		expect(
			await page.getByTestId("settings-sheet").first().isVisible(),
		).toBeTruthy();
	});

	test("can switch language", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		await page.getByTestId("language-select").selectOption("de");
		await expect(page.waitForURL("/de")).resolves.toBeTruthy();
	});

	test("can add category", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		const addCategory = page.getByTestId("add-category");
		await addCategory.getByTestId("add-label-button").click();

		expect(
			await page.getByTestId("edit-label-modal").first().isVisible(),
		).toBeTruthy();

		await page.getByTestId("edit-label-name-input").fill("new Category");
		await page.getByTestId("edit-label-color-input").fill("#ff0000");

		await page.getByTestId("edit-label-save-button").click();

		expect(
			await page.getByTestId("edit-label-modal").first().isVisible(),
		).toBeFalsy();

		expect(
			await page.getByTestId("category-list").first().textContent(),
		).toContain("new Category");
	});

	test("can add tag", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		const addTag = page.getByTestId("add-tag");
		await addTag.getByTestId("add-label-button").click();

		expect(
			await page.getByTestId("edit-label-modal").first().isVisible(),
		).toBeTruthy();

		await page.getByTestId("edit-label-name-input").fill("new Tag");
		await page.getByTestId("edit-label-color-input").fill("#ff0000");

		await page.getByTestId("edit-label-save-button").click();

		expect(
			await page.getByTestId("edit-label-modal").first().isVisible(),
		).toBeFalsy();

		expect(await page.getByTestId("tag-list").first().textContent()).toContain(
			"new Tag",
		);
	});
});
