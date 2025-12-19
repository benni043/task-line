import type { Category } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, userId): Promise<Category[]> => {
		return await Categories.getAll(userId);
	},
);
