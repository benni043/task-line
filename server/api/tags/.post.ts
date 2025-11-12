import { H3Error } from "h3";
import { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, session): Promise<Label> => {
		const newTag = await readValidatedBody<Label>(event, (data) => {
			return Label.parse(data);
		});

		const tag = await Tags.updateOrAdd(session.userId, newTag);
		if (tag instanceof H3Error) throw tag;

		TagEventStream.sendUpdate(session.userId);
		return tag;
	},
);
