import { H3Error } from "h3";
import type { H3Event } from "h3";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "~~/shared/types";

export const Auth = {
  create(id: string, email: string, picture: string): string {
    const runtimeConfig = useRuntimeConfig();

    return Auth.createRaw(
      id,
      email,
      picture,
      (runtimeConfig.public.jwtTTL + "s") as `${number}s`,
      runtimeConfig.jwtSecret,
    );
  },

  createRaw(
    id: string,
    email: string,
    picture: string,
    ttl: `${number}s`,
    secret: string,
  ): string {
    return jwt.sign({ sub: id, email, picture } as JwtPayload, secret, {
      expiresIn: ttl,
    });
  },

  get(event: H3Event): undefined | JwtPayload | H3Error {
    const token = getCookie(event, "token");

    if (!token) {
      return createError({ statusCode: 400, statusMessage: "No JwtToken set" });
    }

    try {
      const runtimeConfig = useRuntimeConfig();

      return jwt.verify(token, runtimeConfig.jwtSecret) as JwtPayload;
    } catch {
      return undefined;
    }
  },

  getOrError(event: H3Event): JwtPayload | H3Error {
    const token = Auth.get(event);

    if (!token) {
      return createError({
        statusCode: 401,
        statusMessage: "Invalid JwtToken",
      });
    }

    return token;
  },

  getOrThrow(event: H3Event): JwtPayload {
    const token = Auth.getOrError(event);

    if (token instanceof H3Error) {
      throw token;
    }

    return token;
  },
};
