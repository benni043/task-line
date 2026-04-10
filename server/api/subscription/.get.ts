import type { PushSubscriptionJSON } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (_event, userId): Promise<PushSubscriptionJSON[]> => {
		return await Subscriptions.getAll(userId);
	},
);
