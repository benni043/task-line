import type { EventHandlerRequest, H3Event } from "h3";
import type { NuxtError } from "nuxt/app";
import { auth } from "./auth";

export function defineAuthenticatedEventHandler<T>(
	handler: (
		event: H3Event<EventHandlerRequest>,
		userId: string,
	) => T | Promise<T>,
) {
	return defineEventHandler(async (event): Promise<T> => {
		const userId = await AuthApi.getUserIdOrThrow(event);
		return handler(event, userId);
	});
}

export const AuthApi = {
	async getUserId(event: H3Event): Promise<string | NuxtError> {
		const token = event.headers.get("Authorization")?.split(" ")[1];

		if (token) {
			const data = await auth.api.verifyApiKey({ body: { key: token } });

			if (!data.key?.referenceId) {
				console.warn(data.error, token);
				return createError({
					statusCode: 400,
					statusMessage: "Invalid API Key",
				});
			}

			return data.key.referenceId;
		} else {
			const result = await auth.api.getSession(event);

			if (!result) {
				return createError({
					statusCode: 400,
					statusMessage: "No Session set",
				});
			}

			return result.session.userId;
		}
	},

	async getUserIdOrThrow(event: H3Event): Promise<string> {
		const session = await AuthApi.getUserId(event);

		if (session instanceof Error) {
			throw session;
		}

		return session;
	},
};
