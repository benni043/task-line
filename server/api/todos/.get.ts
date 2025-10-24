import type { Todo } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, token): Promise<Todo[]> => {
		return await Todos.getAll(token.sub);
	},
);
