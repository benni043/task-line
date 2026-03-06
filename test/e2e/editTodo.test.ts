import { createPage, setup, url } from "@nuxt/test-utils/e2e";
import { describe, expect, test } from "vitest";
import { addTodo, editTodo, setAuthCookie } from "./utils";

describe("edit Todo", async () => {
	await setup();

	test("can edit todo title", async () => {
		const page = await createPage();

		await setAuthCookie(page);
		await page.goto(url("/"), { waitUntil: "hydration" });

		await addTodo(page, "new Todo");

		const todo = page.getByTestId("todos-container").getByTestId("todo");
		expect(await todo.textContent()).toContain("new Todo");

		await editTodo(page, todo, "edited Todo");
		expect(await todo.textContent()).toContain("edited Todo");
	});
});
