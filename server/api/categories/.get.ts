import type { Category } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, token): Promise<Category[]> => {
		return await Categories.getAll(token.sub);
	},
);
