import type { Page } from "@playwright/test";
import { v4 } from "uuid";
import { Auth } from "~~/shared/auth";

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
