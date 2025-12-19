import type { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, userId): Promise<Label[]> => {
		return await Tags.getAll(userId);
	},
);
