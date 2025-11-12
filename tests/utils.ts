import { expect } from "@nuxt/test-utils/playwright";
import type { Locator, Page } from "@playwright/test";

export async function setAuthCookie(_page: Page) {
	throw new Error("not implemented");

	//await page.context().addCookies([
	//{
	//	name: "token",
	//	value: "",
	//});
}

export async function addTodo(page: Page, title: string, note?: string) {
	await page.getByTestId("new-todo-button").click();
	await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

	await fillTodo(page, title, note);

	const responsePromise = page.waitForResponse("/api/todos");
	await page.getByTestId("submit-new-todo-button").click();
	const response = await responsePromise;
	expect(response.status()).toBe(200);
}

export async function editTodo(
	page: Page,
	todo: Locator,
	title: string,
	note?: string,
) {
	await todo.click();
	await expect(page.getByTestId("edit-todo-sheet").first()).toBeVisible();

	await fillTodo(page, title, note);

	const responsePromise = page.waitForResponse("/api/todos");
	await page.getByTestId("submit-edit-todo-button").click();
	const response = await responsePromise;
	expect(response.status()).toBe(200);
}

export async function fillTodo(page: Page, title: string, note?: string) {
	await page.getByTestId("title-input").fill(title);

	if (note) {
		await page.getByTestId("note-input").fill(note);
	}
}
