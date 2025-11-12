export default defineAuthenticatedEventHandler(async (event, session) => {
	const eventStream = createEventStream(event);
	CategorieEventStream.addStream(session.userId, eventStream);

	return eventStream.send();
});
