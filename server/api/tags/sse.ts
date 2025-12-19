export default defineAuthenticatedEventHandler(async (event, userId) => {
	const eventStream = createEventStream(event);
	TagEventStream.addStream(userId, eventStream);

	return eventStream.send();
});
