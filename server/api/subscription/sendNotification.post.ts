export default defineAuthenticatedEventHandler(
  async (event, userId) => {
    await Subscriptions.sendNotification(userId);
	},
);
