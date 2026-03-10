import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { describe, test } from "vitest";
import { addTodo, editTodo, setAuthCookie } from "./utils";
import { expect } from "@playwright/test";

describe("edit Todo", async () => {
	await setup();

	test("can edit todo title", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo");

		const todo = page.getByTestId("todos-container").getByTestId("todo");
		await expect(todo).toContainText("new Todo");

		await editTodo(page, todo, "edited Todo");
		await expect(todo).toContainText("edited Todo");
	});
});
