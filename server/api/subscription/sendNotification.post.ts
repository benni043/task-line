export default defineAuthenticatedEventHandler(async (_event, userId) => {
	await Subscriptions.sendNotification(userId);
});
