import type { Todo, UUID } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<Todo> => {
		const uuid: UUID | undefined = getRouterParam(event, "uuid");

		if (!uuid)
			throw createError({
				status: 400,
				statusMessage: "Bad Request",
				message: `no uuid set - uuid:'${uuid}'`,
			});

		const todo = await Todos.delete(userId, uuid);
		if (todo instanceof Error) throw todo;

		TodoEventStream.sendUpdate(userId);
		return todo;
	},
);
