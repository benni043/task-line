export default defineAuthenticatedEventHandler(async (event, session) => {
	const eventStream = createEventStream(event);
	TodoEventStream.addStream(session.userId, eventStream);

	return eventStream.send();
});
