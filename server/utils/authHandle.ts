import type { EventHandlerRequest, H3Event } from "h3";
import { getCookie, H3Error } from "h3";
import jwt from "jsonwebtoken";
import { Auth } from "~~/shared/auth";
import type { JwtPayload } from "~~/shared/types";

export function defineAuthenticatedEventHandler<T>(
	handler: (
		event: H3Event<EventHandlerRequest>,
		user: JwtPayload,
	) => T | Promise<T>,
) {
	return defineEventHandler((event): T | Promise<T> => {
		const token = AuthApi.getOrThrow(event);
		return handler(event, token);
	});
}

export const AuthApi = {
	create(id: string, email: string, picture: string): string {
		const runtimeConfig = useRuntimeConfig();

		return Auth.createRaw(
			id,
			email,
			picture,
			`${runtimeConfig.public.jwtTTL}s` as `${number}s`,
			runtimeConfig.jwtSecret,
		);
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
		const token = AuthApi.get(event);

		if (!token) {
			return createError({
				statusCode: 401,
				statusMessage: "Invalid JwtToken",
			});
		}

		return token;
	},

	getOrThrow(event: H3Event): JwtPayload {
		const token = AuthApi.getOrError(event);

		if (token instanceof H3Error) {
			throw token;
		}

		return token;
	},
};
