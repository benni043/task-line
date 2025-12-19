import type { Todo } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, userId): Promise<Todo[]> => {
		return await Todos.getAll(userId);
	},
);
