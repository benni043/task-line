import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { expect } from "@playwright/test";
import { describe, test } from "vitest";
import { addTodo, fillTodo, setAuthCookie } from "./utils";

describe("new Todo", async () => {
	await setup();

	test("can add todo", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo");

		// check todo creation
		await expect(page.getByTestId("todos-container").first()).toBeVisible();
		await expect(page.getByTestId("todos-container").first()).toContainText(
			"new Todo",
		);
	});

	test("can add todo via enter", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("new-todo-button").click();
		await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

		await fillTodo(page, "new Todo");

		await page.keyboard.down("Enter");

		const response = await page.waitForResponse("/api/todos");
		expect(response.status()).toBe(200);

		// check todo creation
		await expect(page.getByTestId("todos-container").first()).toBeVisible();
		await expect(page.getByTestId("todos-container").first()).toContainText(
			"new Todo",
		);
	});

	test("can add another todo", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("new-todo-button").click();
		await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

		await page.getByTestId("title-input").fill("new Todo");

		await page.getByTestId("submit-another-new-todo-button").click();

		await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();
		await expect(page.getByTestId("title-input").first()).toHaveText("");

		await page.getByTestId("title-input").fill("new Todo 2");

		await page.getByTestId("submit-new-todo-button").click();

		// check todo creation
		const container = page.getByTestId("todos-container");
		await expect(container.first()).toBeVisible();
		await expect(container.getByTestId("todo").nth(0)).toContainText(
			"new Todo",
		);
		await expect(container.getByTestId("todo").nth(1)).toContainText(
			"new Todo 2",
		);
	});

	test("can add todo with notes", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo", "some notes");

		// check todo creation
		await expect(page.getByTestId("todos-container")).toBeVisible();

		const todo = page.getByTestId("todos-container").getByTestId("todo");
		await expect(todo).toContainText("new Todo");
		await expect(todo.getByTestId("note-icon")).toBeVisible();
	});
});
