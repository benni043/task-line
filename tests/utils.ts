import type { Locator, Page } from "@playwright/test";
import { v4 } from "uuid";
import { Auth } from "~~/shared/auth";
import { expect } from "@nuxt/test-utils/playwright";

export async function setAuthCookie(page: Page) {
  await page.context().addCookies([
    {
      name: "token",
      value: Auth.createRaw(
        v4(),
        "test@example.com",
        "",
        "30s",
        process.env.JWT_SECRET!,
      ),
      domain: "127.0.0.1",
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
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
