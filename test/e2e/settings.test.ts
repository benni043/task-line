import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { describe, test } from "vitest";
import { setAuthCookie } from "./utils";
import { expect } from "@playwright/test";

describe("edit Todo", async () => {
	await setup();

	test("can open settings", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("settings-button").click();
		await expect(page.getByTestId("settings-sheet").first()).toBeVisible();
	});

	test("can switch language", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		await page.getByTestId("language-select").selectOption("de");
		await expect(page).toHaveURL("/de");
	});

	test("can add category", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		const addCategory = page.getByTestId("add-category");
		await addCategory.getByTestId("add-label-button").click();

		await expect(page.getByTestId("edit-label-modal").first()).toBeVisible();

		await page.getByTestId("edit-label-name-input").fill("new Category");
		await page.getByTestId("edit-label-color-input").fill("#ff0000");

		await page.getByTestId("edit-label-save-button").click();

		await expect(page.getByTestId("edit-label-modal").first()).toBeHidden();

		await expect(page.getByTestId("category-list").first()).toContainText(
			"new Category",
		);
	});

	test("can add tag", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });
		await page.getByTestId("settings-button").click();

		const addTag = page.getByTestId("add-tag");
		await addTag.getByTestId("add-label-button").click();

		await expect(page.getByTestId("edit-label-modal").first()).toBeVisible();

		await page.getByTestId("edit-label-name-input").fill("new Tag");
		await page.getByTestId("edit-label-color-input").fill("#ff0000");

		await page.getByTestId("edit-label-save-button").click();

		await expect(page.getByTestId("edit-label-modal").first()).toBeHidden();

		await expect(page.getByTestId("tag-list").first()).toContainText("new Tag");
	});
});
