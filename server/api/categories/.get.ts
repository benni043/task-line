import type { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, token): Promise<Label[]> => {
		return await Categories.getAll(token.sub);
	},
);
