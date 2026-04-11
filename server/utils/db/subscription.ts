import type { NuxtError } from "nuxt/app";
import webpush from "web-push";
import type { PushSubscriptionJSON } from "~~/shared/types";

function getKey(userId: string): string {
	return `subscriptions:${userId}`;
}

webpush.setVapidDetails(
	"mailto:you@example.com",
	"BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY",
	"wGiryLM_sL1fRZfWhcYeJ_ZgSucqtOn1S_A60lBThnc",
);

export const Subscriptions = {
	async getAll(userId: string): Promise<PushSubscriptionJSON[]> {
		const storage = useStorage();
		return (await storage.get<PushSubscriptionJSON[]>(getKey(userId))) ?? [];
	},
	async updateOrAdd(
		userId: string,
		subscription: PushSubscriptionJSON,
	): Promise<PushSubscriptionJSON | NuxtError> {
		const storage = useStorage();
		const subscriptions = await Subscriptions.getAll(userId);

		const exists = subscriptions.find(
			(s) =>
				s.endpoint === subscription.endpoint ||
				(s.keys.p256dh === subscription.keys.p256dh &&
					s.keys.auth === subscription.keys.auth),
		);

		if (!exists) {
			subscriptions.push(subscription);
			await storage.set(getKey(userId), subscriptions);
			return subscription;
		}

		return createError({
			status: 409,
			statusMessage: "Conflict",
			message: `Subscription already exists`,
		});
	},
	async sendNotification(userId: string) {
		const subscriptions = await Subscriptions.getAll(userId);

		const payload = JSON.stringify({
			title: "Erinnerung",
			body: "Zeit für XYZ",
		});

		for (const sub of subscriptions) {
			try {
				await webpush.sendNotification(sub, payload);
			} catch (err) {
				console.error("Push failed", err);
			}
		}
	},
};
