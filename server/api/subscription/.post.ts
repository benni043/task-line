import { SubscriptionEventStream } from "~~/server/utils/sse";
import { PushSubscriptionJSON } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<PushSubscriptionJSON> => {
		const body = await readValidatedBody(event, PushSubscriptionJSON.parse);

		const subscription = await Subscriptions.updateOrAdd(userId, body);
		if (subscription instanceof Error) throw subscription;

		SubscriptionEventStream.sendUpdate(userId);
		return subscription;
	},
);
