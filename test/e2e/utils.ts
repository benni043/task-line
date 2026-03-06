import { url, type NuxtPage } from "@nuxt/test-utils";
import { auth } from "../../server/utils/auth";
import { expect } from "vitest";
import { Locator } from "@playwright/test";

export async function setAuthCookie(page: NuxtPage) {
	const ctx = await auth.$context;
	const test = ctx.test;

	const user = test.createUser();
	const savedUser = await test.saveUser(user);
	const { cookies } = await test.login({
		userId: savedUser.id,
	});

	await page.context().addCookies(cookies);
}

export async function addTodo(page: NuxtPage, title: string, note?: string) {
	await page.getByTestId("new-todo-button").click();
	expect(await page.getByTestId("new-todo-sheet").first().isVisible()).toBe(
		true,
	);

	await fillTodo(page, title, note);

	const responsePromise = page.waitForResponse(url("/api/todos"));
	await page.getByTestId("submit-new-todo-button").click();

	const response = await responsePromise;

	expect(response.status()).toBe(200);
}

export async function editTodo(
	page: NuxtPage,
	todo: Locator,
	title: string,
	note?: string,
) {
	await todo.click();
	expect(await page.getByTestId("edit-todo-sheet").first().isVisible()).toBe(
		true,
	);

	await fillTodo(page, title, note);

	const responsePromise = page.waitForResponse("/api/todos");
	await page.getByTestId("submit-edit-todo-button").click();
	const response = await responsePromise;
	expect(response.status()).toBe(200);
}

export async function fillTodo(page: NuxtPage, title: string, note?: string) {
	await page.getByTestId("title-input").fill(title);

	if (note) {
		await page.getByTestId("note-input").fill(note);
	}
}
