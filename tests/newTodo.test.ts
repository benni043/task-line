import { test, expect } from "@nuxt/test-utils/playwright";
import { addTodo, fillTodo, setAuthCookie } from "./utils";

test("can add todo", async ({ page, goto }) => {
  await setAuthCookie(page);
  await goto("/", { waitUntil: "hydration" });

  await addTodo(page, "new Todo");

  // check todo creation
  await expect(page.getByTestId("todos-container").first()).toBeVisible();
  await expect(page.getByTestId("todos-container").first()).toHaveText(
    "new Todo",
  );
});

test("can add todo via enter", async ({ page, goto }) => {
  await setAuthCookie(page);
  await goto("/", { waitUntil: "hydration" });

  await page.getByTestId("new-todo-button").click();
  await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

  await fillTodo(page, "new Todo");

  await page.keyboard.down("Enter");

  const response = await page.waitForResponse("/api/todos");
  expect(response.status()).toBe(200);

  // check todo creation
  await expect(page.getByTestId("todos-container").first()).toBeVisible();
  await expect(page.getByTestId("todos-container").first()).toHaveText(
    "new Todo",
  );
});

test("can add another todo", async ({ page, goto }) => {
  await setAuthCookie(page);
  await goto("/", { waitUntil: "hydration" });

  await page.getByTestId("new-todo-button").click();
  await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();

  await page.getByTestId("title-input").fill("new Todo");

  await page.getByTestId("submit-another-new-todo-button").click();

  await expect(page.getByTestId("new-todo-sheet").first()).toBeVisible();
  await expect(page.getByTestId("title-input").first()).toBeEmpty();

  await page.getByTestId("title-input").fill("new Todo 2");

  await page.getByTestId("submit-new-todo-button").click();

  // check todo creation
  const container = page.getByTestId("todos-container");
  await expect(container.first()).toBeVisible();
  await expect(container.getByTestId("todo").nth(0)).toHaveText("new Todo");
  await expect(container.getByTestId("todo").nth(1)).toHaveText("new Todo 2");
});

test("can add todo with notes", async ({ page, goto }) => {
  await setAuthCookie(page);
  await goto("/", { waitUntil: "hydration" });

  await addTodo(page, "new Todo", "some notes");

  // check todo creation
  await expect(page.getByTestId("todos-container")).toBeVisible();

  const todo = page.getByTestId("todos-container").getByTestId("todo");
  await expect(todo).toHaveText("new Todo");
  await expect(todo.getByTestId("note-icon")).toBeVisible();
});
