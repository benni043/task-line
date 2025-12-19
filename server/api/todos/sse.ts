export default defineAuthenticatedEventHandler(async (event, userId) => {
	const eventStream = createEventStream(event);
	TodoEventStream.addStream(userId, eventStream);

	return eventStream.send();
});
