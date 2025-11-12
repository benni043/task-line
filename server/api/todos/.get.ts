import type { Todo } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, session): Promise<Todo[]> => {
		return await Todos.getAll(session.userId);
	},
);
