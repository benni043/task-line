export default defineAuthenticatedEventHandler(async (event, session) => {
	const eventStream = createEventStream(event);
	TagEventStream.addStream(session.userId, eventStream);

	return eventStream.send();
});
