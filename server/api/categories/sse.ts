export default defineAuthenticatedEventHandler(async (event, userId) => {
	const eventStream = createEventStream(event);
	CategorieEventStream.addStream(userId, eventStream);

	return eventStream.send();
});
