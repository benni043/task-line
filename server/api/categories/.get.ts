import type { Category } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, session): Promise<Category[]> => {
		return await Categories.getAll(session.userId);
	},
);
