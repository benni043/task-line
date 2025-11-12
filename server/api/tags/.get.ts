import type { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, session): Promise<Label[]> => {
		return await Tags.getAll(session.userId);
	},
);
