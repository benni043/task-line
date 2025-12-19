import type { Session } from "better-auth";
import type { EventHandlerRequest, H3Event } from "h3";
import { H3Error } from "h3";
import { auth } from "./auth";

export function defineAuthenticatedEventHandler<T>(
	handler: (
		event: H3Event<EventHandlerRequest>,
		session: Session,
	) => T | Promise<T>,
) {
	return defineEventHandler(async (event): Promise<T> => {
		const session = await AuthApi.getOrThrow(event);
		return handler(event, session);
	});
}

export const AuthApi = {
	async get(event: H3Event): Promise<Session | H3Error> {
		const result = await auth.api.getSession(event);

		if (!result) {
			return createError({ statusCode: 400, statusMessage: "No Session set" });
		}

		return result.session;
	},

	async getOrThrow(event: H3Event): Promise<Session> {
		const session = await AuthApi.get(event);

		if (session instanceof H3Error) {
			throw session;
		}

		return session;
	},
};
