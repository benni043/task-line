import { type NuxtPage, url } from "@nuxt/test-utils";
import { expect, type Locator } from "@playwright/test";
import { auth } from "../../server/utils/auth";

export async function setAuthCookie(page: NuxtPage) {
	const ctx = await auth.$context;
	const test = ctx.test;

	const user = test.createUser();
	const savedUser = await test.saveUser(user);
	const cookies = await test.getCookies({
		userId: savedUser.id,
	});

	await page.context().addCookies(
		cookies.map((cookie) => {
			cookie.domain = "127.0.0.1";
			return cookie;
		}),
	);
}

export async function addTodo(page: NuxtPage, title: string, note?: string) {
	await page.getByTestId("new-todo-button").click();
	await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

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
	await expect(page.getByTestId("edit-todo-sheet").first()).toBeVisible();

	await fillTodo(page, title, note);

	const responsePromise = page.waitForResponse("/api/todos");
	await page.getByTestId("submit-edit-todo-button").click();
	const response = await responsePromise;
	expect(response.status()).toBe(200);
}

export async function fillTodo(page: NuxtPage, title: string, note?: string) {
	if (note) {
		await page.getByTestId("note-input").fill(note);
	}

	await page.getByTestId("title-input").fill(title);
}
