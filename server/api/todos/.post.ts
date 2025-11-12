import { H3Error } from "h3";
import z from "zod";
import { Todo } from "~~/shared/types";

export const Body = z.object({
	data: Todo,
	position: z.literal(["top", "bottom"]).optional(),
	previousId: z.uuid().optional(),
});

export default defineAuthenticatedEventHandler(
	async (event, session): Promise<Todo> => {
		const body = await readValidatedBody(event, (data) => {
			return Body.parse(data);
		});

		const todo = await Todos.updateOrAdd(
			session.userId,
			body.data,
			body.position,
			body.previousId,
		);
		if (todo instanceof H3Error) throw todo;

		TodoEventStream.sendUpdate(session.userId);
		return todo;
	},
);
