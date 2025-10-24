import { expect, test } from "@nuxt/test-utils/playwright";
import { addTodo, editTodo, setAuthCookie } from "./utils";

test("can edit todo title", async ({ page, goto }) => {
	await setAuthCookie(page);
	await goto("/", { waitUntil: "hydration" });

	await addTodo(page, "new Todo");

	const todo = page.getByTestId("todos-container").getByTestId("todo");
	await expect(todo).toHaveText("new Todo");

	await editTodo(page, todo, "edited Todo");
	await expect(todo).toHaveText("edited Todo");
});
