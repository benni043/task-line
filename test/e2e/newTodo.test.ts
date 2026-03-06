import { describe, expect, test } from "vitest";
import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { addTodo, fillTodo, setAuthCookie } from "./utils";

describe("edit Todo", async () => {
	await setup();

	test("can add todo", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo");

		// check todo creation
		expect(await page.getByTestId("todos-container").first().isVisible()).toBe(
			true,
		);
		expect(
			await page.getByTestId("todos-container").first().textContent(),
		).toContain("new Todo");
	});

	test("can add todo via enter", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("new-todo-button").click();
		expect(await page.getByTestId("new-todo-sheet").first().isVisible()).toBe(
			true,
		);

		await fillTodo(page, "new Todo");

		await page.keyboard.down("Enter");

		const response = await page.waitForResponse("/api/todos");
		expect(response.status()).toBe(200);

		// check todo creation
		expect(await page.getByTestId("todos-container").first().isVisible()).toBe(
			true,
		);
		expect(
			await page.getByTestId("todos-container").first().textContent(),
		).toContain("new Todo");
	});

	test("can add another todo", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await page.getByTestId("new-todo-button").click();
		expect(await page.getByTestId("new-todo-sheet").first().isVisible()).toBe(
			true,
		);

		await page.getByTestId("title-input").fill("new Todo");

		await page.getByTestId("submit-another-new-todo-button").click();

		expect(await page.getByTestId("new-todo-sheet").first().isVisible()).toBe(
			true,
		);
		expect(await page.getByTestId("title-input").first().textContent()).toBe(
			"",
		);

		await page.getByTestId("title-input").fill("new Todo 2");

		await page.getByTestId("submit-new-todo-button").click();

		// check todo creation
		const container = page.getByTestId("todos-container");
		expect(await container.first().isVisible()).toBe(true);
		expect(await container.getByTestId("todo").nth(0).textContent()).toContain(
			"new Todo",
		);
		expect(await container.getByTestId("todo").nth(1).textContent()).toContain(
			"new Todo 2",
		);
	});

	test("can add todo with notes", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo", "some notes");

		// check todo creation
		expect(await page.getByTestId("todos-container").isVisible()).toBe(true);

		const todo = page.getByTestId("todos-container").getByTestId("todo");
		expect(await todo.textContent()).toContain("new Todo");
		expect(await todo.getByTestId("note-icon").isVisible()).toBe(true);
	});
});
